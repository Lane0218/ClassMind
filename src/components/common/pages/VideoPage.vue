<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix" style="height: 30px;">
                <span>视频管理</span>
                <el-button style="float: right; padding: 3px 10px; height: 40px; margin-right: 10px;"
                    @click="fetchVideos">刷新</el-button>
                <el-button style="float: right; padding: 3px 15px; margin-right: 10px; height: 40px;" type="primary"
                    @click="openUploadDialog">上传视频</el-button>
            </div>
            <el-table :data="videos" style="width: 100%">
                <el-table-column prop="id" label="视频编号" width="100"></el-table-column>
                <el-table-column prop="url" label="视频名称" width="100"></el-table-column>
                <el-table-column label="视频时长" width="80">
                    <template slot-scope="scope">
                        {{ formatDuration(scope.row.duration) }}
                    </template>
                </el-table-column>
                <el-table-column prop="size" label="视频大小" width="80">
                    <template slot-scope="scope">
                        {{ formatSize(scope.row.size) }}
                    </template>
                </el-table-column>
                <el-table-column prop="c_id" label="课程编号" width="80"></el-table-column>
                <el-table-column prop="c_name" label="课程名称" width="100"></el-table-column>
                <el-table-column label="上传时间" width="150">
                    <template slot-scope="scope">
                        {{ formatDate(scope.row.upload_time) }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <div>
                            <el-button type="text" @click="deleteVideo(scope.row.id)"
                                style="height: 10px;">删除</el-button>
                        </div>
                        <div>
                            <el-button type="text" @click="startAnalysis(scope.row)"
                                style="height: 10px;">大模型分析</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 上传视频对话框 -->
        <el-dialog title="上传视频" :visible.sync="showUploadDialog" width="400px">
            <el-upload class="upload-demo" drag action="http://127.0.0.1:5000/upload_video" multiple
                :on-change="handleFileChange" :auto-upload="false">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传mp4文件，且不超过500MB，一次只能上传一个视频</div>
            </el-upload>
            <el-input v-model="courseId" placeholder="请输入课程编号" style="margin-top: 20px; width: 100%;"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeUploadDialog">取消</el-button>
                <el-button type="primary" @click="submitUpload">上传</el-button>
            </div>
        </el-dialog>

        <!-- 分析进度对话框 -->
        <el-dialog title="正在使用大模型分析，请稍候" :visible.sync="showAnalysisDialog" width="30%">
            <el-progress :percentage="Math.round(analysisProgress)"></el-progress>
            <!-- <div style="margin-top: 40px;"> -->
            <div v-if="analysisComplete" style="margin-top: 40px;">
                <el-button type="primary" @click="reanalyzeVideo" style="margin-left: 20px;">重新分析</el-button>
                <el-button type="success" @click="showResults" style="margin-left: 40px;">显示结果</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            videos: [],
            courseId: '',
            uploadedFile: [],
            showUploadDialog: false,
            showAnalysisDialog: false,
            analysisProgress: 0,
            analysisComplete: false,
            currentVideoId: null
        };
    },
    methods: {
        fetchVideos() {
            this.$axios.get('http://127.0.0.1:5000/videos')
                .then(response => {
                    this.videos = response.data;
                })
                .catch(error => {
                    console.error(error);
                    this.$message.error('获取视频列表失败');
                });
        },
        handleFileChange(file, fileList) {
            this.uploadedFile.push({
                file: file.raw,
                name: file.name,
                url: `${file.name}`,
                size: file.size / 1024 / 1024
            });
        },
        submitUpload() {
            if (!this.courseId) {
                this.$message.error('请输入课程ID');
                return;
            }
            if (this.uploadedFile.length === 0) {
                this.$message.error('请先选择视频文件');
                return;
            }
            if (this.uploadedFile.length > 1) {
                this.$message.error('一次只能上传一个视频文件');
                return;
            }
            const isMP4 = this.uploadedFile[0].file.type === 'video/mp4';
            const isLt500M = this.uploadedFile[0].size < 500;
            if (!isMP4) {
                this.$message.error('只能上传mp4文件');
                return;
            }
            if (!isLt500M) {
                this.$message.error('文件大小不能超过500MB，你上传的视频大小为' + (this.uploadedFile[0].file.size / 1024 / 1024).toFixed(1) + 'MB');
                return;
            }
            const formData = new FormData();
            formData.append('file', this.uploadedFile[0].file);
            this.$axios.post('http://127.0.0.1:5000/upload_video', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    this.$message.success('视频上传成功');
                    // 添加视频信息
                    this.$axios.post('http://127.0.0.1:5000/add_video', {
                        videos: this.uploadedFile.map(file => ({
                            // url: response.data.url,
                            url: file.url,
                            c_id: this.courseId,
                            size: file.size
                        }))
                    })
                        .then(response => {
                            this.$message.success('视频信息添加成功');
                            this.uploadedFile = [];
                            this.courseId = '';
                            this.closeUploadDialog();
                            this.fetchVideos();
                        })
                        .catch(error => {
                            console.error(error);
                            this.$message.error('视频信息添加失败');
                        });
                })
                .catch(error => {
                    console.error(error);
                    this.$message.error('视频上传失败');
                });
        },
        openUploadDialog() {
            this.showUploadDialog = true;
        },
        closeUploadDialog() {
            this.showUploadDialog = false;
            this.uploadedFile = [];
            this.courseId = '';
        },
        deleteVideo(videoId) {
            this.$confirm('确定要删除这个视频吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete(`http://127.0.0.1:5000/videos/${videoId}`)
                    .then(response => {
                        this.$message.success(response.data.message);
                        this.fetchVideos();
                    })
                    .catch(error => {
                        console.error(error);
                        this.$message.error('删除视频失败');
                    });
            }).catch(() => {
                this.$message.info('已取消删除');
            });
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toISOString().replace('T', ' ').substring(0, 19);
        },
        formatDuration(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs.toString().padStart(2, '0')}`;
        },
        formatSize(size) {
            return `${size}MB`;
        },
        startAnalysis(video) {
            this.showAnalysisDialog = true;
            this.currentVideoId = video.id;
            this.analysisProgress = 0;
            this.analysisComplete = false;
            this.callBackendAnalysis(video.id, video.duration);
        },
        callBackendAnalysis(videoId, duration) {
            this.$axios.post('http://127.0.0.1:5000/analyze_video', { videoId })
                .then(response => {
                    console.log('分析开始', response.data);
                    this.startProgress(videoId, duration);
                })
                .catch(error => {
                    console.error(error);
                    this.$message.error(response.data);
                    this.showAnalysisDialog = false;
                });
        },
        startProgress(videoId, duration) {
            const totalDuration = duration * 10;
            this.analysisInterval = setInterval(() => {
                if (this.analysisProgress + (200 / totalDuration) <= 50) {
                    this.analysisProgress += (200 / totalDuration);
                }
                else if (this.analysisProgress + (200 / totalDuration * 1.5) <= 70) {
                    this.analysisProgress += (200 / totalDuration * 1.5);
                }
                else if (this.analysisProgress + (200 / totalDuration / 2) <= 98) {
                    this.analysisProgress += (200 / totalDuration / 2);
                }
            }, 2000);
            this.checkAnalysisStatus(videoId);
        },
        checkAnalysisStatus(videoId) {
            const checkInterval = setInterval(() => {
                this.$axios.get(`http://127.0.0.1:5000/analysis_status/${videoId}`)
                    .then(response => {
                        if (response.data.complete) {
                            this.analysisProgress = 100;
                            clearInterval(checkInterval);
                            this.analysisComplete = true;
                            this.$message.success('分析完成');
                        }
                        // else {
                        //     this.$message.info('分析正在进行');
                        // }
                    })
                    .catch(error => {
                        console.error(error);
                        this.$message.error('分析状态查询失败');
                    });
            }, 10000); // 每10秒检查一次分析状态
        },
        reanalyzeVideo() {
            const video = this.videos.find(v => v.id === this.currentVideoId);
            if (video) {
                this.startAnalysis(video);
            }
        },
        showResults() {
            this.$router.push({ name: 'AnalysisResults', params: { videoId: this.currentVideoId } });
        },
        // ... 其他方法 ...
    },
    created() {
        this.fetchVideos();
    },
    beforeDestroy() {
        if (this.analysisInterval) {
            clearInterval(this.analysisInterval);
        }
    }
};
</script>

<style>
.box-card {
    margin: 20px;
}
</style>