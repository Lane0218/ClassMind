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
                <el-table-column prop="id" label="视频编号" width="180"></el-table-column>
                <el-table-column prop="url" label="视频名称" width="130"></el-table-column>
                <el-table-column prop="c_id" label="课程编号" width="100"></el-table-column>
                <el-table-column prop="c_name" label="课程名称" width="120"></el-table-column>
                <el-table-column label="上传时间" width="180">
                    <template slot-scope="scope">
                        {{ formatDate(scope.row.upload_time) }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" @click="deleteVideo(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 上传视频对话框 -->
        <el-dialog title="上传视频" :visible.sync="showUploadDialog">
            <el-upload class="upload-demo" drag action="http://127.0.0.1:5000/upload_video" multiple
                :on-change="handleFileChange" :auto-upload="false">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传mp4文件，且不超过500MB</div>
            </el-upload>
            <el-input v-model="courseId" placeholder="请输入课程ID" style="margin-top: 20px;"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeUploadDialog">取消</el-button>
                <el-button type="primary" @click="submitUpload">上传</el-button>
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
            showUploadDialog: false
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
                url: `${file.name}`
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
            const isLt500M = this.uploadedFile[0].file.size / 1024 / 1024 < 500;
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
                            c_id: this.courseId
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
    },
    created() {
        this.fetchVideos();
    }
};
</script>

<style>
.box-card {
    margin: 20px;
}
</style>