<template>
    <div class="analysis-report">
        <el-row>
            <el-col :span="24" class="header">
                <h1>大模型分析报告</h1>
                <el-button type="primary" style="margin-left: 420px;" @click="exportReport">导出报告</el-button>
                <el-button type="primary" @click="exportVideo" style="margin-right: 60px;">导出视频</el-button>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24" style="margin-left: 20px; margin-top: 30px;">
                <el-row>
                    <el-col :span="10" class="left-panel">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>视频信息</span>
                            </div>
                            <div>
                                <p>视频编号: {{ this.videoId }}</p>
                                <p>视频名称: {{ data['url'] }}</p>
                                <p>课程编号: {{ data['c_id'] }}</p>
                                <p>课程名称: {{ data['c_name'] }}</p>
                                <p>上传时间: {{ formatDate(data['upload_time']) }}</p>
                                <p>视频时长: {{ formatDuration(data['duration']) }}</p>
                                <p>视频大小: {{ data['size'] }} MB</p>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="12" class="right-panel" style="margin-left: 20px;">
                        <el-card class="box-card" style="height: 265px;">
                            <div slot="header" class="clearfix">
                                <el-row>
                                    <el-col :span="6">
                                        <span>分析结果</span>
                                    </el-col>
                                    <el-col :span="7" class="text-right" style="margin-left: 160px;">
                                        <span>课堂评分: {{ data['score'] }}</span>
                                    </el-col>
                                </el-row>
                            </div>

                            <div ref="chart" style="width: 90%; height: 250px; margin-top: -35px; margin-left: 25px;">
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="24" class="video-panel"
                style=" margin-top: 30px; display: flex; justify-content: center; align-items: center;">
                <video ref="videoPlayer" class="video-js" controls preload="auto">
                    <source :src="playerOptions.sources[0].src" type="video/mp4">
                </video>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default {
    data() {
        return {
            data: {
                url: '',
                c_id: '',
                c_name: '',
                upload_time: '',
                duration: 0,
                size: 0,
                readingRate: 0,
                handsUpRate: 0,
                writingRate: 0,
                score: 0
            },
            videoId: '',
            playerOptions: {
                autoplay: false,
                controls: true,
                sources: [{
                    src: '',
                    type: 'video/mp4'
                }]
            },
        };
    },
    created() {
        this.videoId = this.$route.params.videoId;
    },
    mounted() {
        this.fetchData()
            .then(() => {
                this.initChart();
                this.initPlayer();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },
    methods: {
        fetchData() {
            // 返回axios请求的Promise
            return this.$axios.get(`http://127.0.0.1:5000/fetchData/${this.videoId}`)
                .then(response => {
                    // 处理响应数据
                    this.data = response.data;
                    this.playerOptions.sources[0].src = 'http://localhost:5000/getOutput/' + this.data['url'];
                })
                .catch(error => {
                    // 处理错误
                    console.error(error);
                    this.$message.error('获取视频列表失败');
                    throw error; // 重新抛出错误，以便在外部捕获
                });
        },
        initChart() {
            // 延迟 1000 毫秒（1 秒）后初始化图表
            setTimeout(() => {
                const chart = echarts.init(this.$refs.chart);
                console.log(this.data);
                chart.setOption({
                    tooltip: {},
                    xAxis: {
                        data: ['阅读率', '举手率', '书写率']
                    },
                    yAxis: {},
                    series: [{
                        type: 'bar',
                        data: [this.data['readingRate'], this.data['handsUpRate'], this.data['writingRate']]
                    }]
                });
            }, 3000); // 延迟 1000 毫秒（1 秒）
        },
        initPlayer() {
            setTimeout(() => {
                this.player = videojs(this.$refs.videoPlayer, {
                    controls: true,
                    preload: 'auto',
                    width: 400,
                    height: 280
                });
            }, 5000); // 延迟 1000 毫秒（1 秒）
        },
        exportReport() {
            // 创建一个 a 标签
            const a = document.createElement('a');
            // 设置 a 标签的 href 属性为文件 URL
            a.href = `http://localhost:5000/exportReport`;
            // 设置 a 标签的 download 属性为文件名
            a.download = 'behavior_report.docx';
            // 使用 JavaScript 触发点击事件
            document.body.appendChild(a);
            a.click();
            // 移除 a 标签
            document.body.removeChild(a);
        },
        exportVideo() {
            // 创建一个 a 标签
            const a = document.createElement('a');
            // 设置 a 标签的 href 属性为文件 URL
            a.href = `http://localhost:5000/exportVideo/${this.data['url']}`;
            // 设置 a 标签的 download 属性为文件名
            a.download = this.data['url'];
            // 使用 JavaScript 触发点击事件
            document.body.appendChild(a);
            a.click();
            // 移除 a 标签
            document.body.removeChild(a);
        },

        formatDate(dateString) {
            // 验证日期字符串是否有效
            if (!dateString) {
                return ''; // 返回空字符串或默认值
            }

            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return ''; // 返回空字符串或默认值
            }

            return date.toISOString().replace('T', ' ').substring(0, 19);
        },
        formatDuration(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${minutes}:${secs.toString().padStart(2, '0')}`;
        }
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose();
        }
    }
};
</script>

<style scoped>
.analysis-report {
    padding: 10px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0px;
}

.left-panel,
.right-panel {
    padding: 0px;
    margin: -10px;
}

.video-js {
    width: 60%;
    height: 300px;
}
</style>