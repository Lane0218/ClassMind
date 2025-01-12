<template>
    <div class="analysis-report">
        <el-row>
            <el-col :span="24" class="header">
                <h1>大模型分析报告</h1>
                <el-button type="primary" @click="exportReport">导出报告</el-button>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12" class="left-panel">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>视频信息</span>
                    </div>
                    <div>
                        <p>视频编号: {{ this.videoId }}</p>
                        <p>视频名称: {{ data['url'] }}</p>
                        <p>课程编号: {{ data['c_id'] }}</p>
                        <p>课程名称: {{ data['c_name'] }}</p>
                        <!-- <p>上传时间: {{ formatDate(data.upload_time) }}</p> -->
                        <p>视频时长: {{ formatDuration(data.duration) }}</p>
                        <p>视频大小: {{ data['size'] }} MB</p>
                        <p>课堂评分: {{ data['score'] }}</p>
                    </div>
                </el-card>

                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>分析结果</span>
                    </div>
                    <div ref="chart" style="width: 100%; height: 300px;"></div>
                </el-card>
            </el-col>
            <el-col :span="16" class="right-panel">
                <!-- <video ref="videoPlayer" class="video-js" controls preload="auto" width="640" height="360">
                    <source :src="playerOptions.sources[0].src" type="video/mp4">
                </video> -->
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
                    src: '/short.mp4',
                    type: 'video/mp4'
                }]
            },
        };
    },
    created() {
        this.videoId = this.$route.params.videoId;
        // this.fetchData();
    },
    mounted() {
        this.fetchData();
        this.initChart();
        // this.initPlayer();
    },
    methods: {
        fetchData() {
            // this.$message(this.videoId);
            this.$axios.get(`http://127.0.0.1:5000/fetchData/${this.videoId}`)
                .then(response => {
                    this.data = response.data;
                })
                .catch(error => {
                    console.error(error);
                    this.$message.error('获取视频列表失败');
                });
        },
        initChart() {
            // 延迟 1000 毫秒（1 秒）后初始化图表
            setTimeout(() => {
                const chart = echarts.init(this.$refs.chart);

                console.log(this.data);
                chart.setOption({
                    // title: {
                    //     text: '分析结果'
                    // },
                    tooltip: {},
                    xAxis: {
                        data: ['阅读率', '举手率', '书写率']
                    },
                    yAxis: {},
                    series: [{
                        // name: '率',
                        type: 'bar',
                        // data: [10, 20, 30]
                        data: [this.data['readingRate'], this.data['handsUpRate'], this.data['writingRate']]
                    }]
                });
            }, 3000); // 延迟 1000 毫秒（1 秒）
        },
        initPlayer() {
            if (this.player) {
                this.player.dispose();
            }
            this.player = videojs(this.$refs.videoPlayer, {
                controls: true,
                preload: 'auto',
                width: 640,
                height: 360
            });
        },
        exportReport() {
            // 文件的 URL
            const fileUrl = '/behavior_report.docx';
            // 创建一个 a 标签
            const a = document.createElement('a');
            // 设置 a 标签的 href 属性为文件 URL
            a.href = fileUrl;
            // 设置 a 标签的 download 属性为文件名
            a.download = 'behavior_report.docx';
            // 使用 JavaScript 触发点击事件
            document.body.appendChild(a);
            a.click();
            // 移除 a 标签
            document.body.removeChild(a);
        },
        formatDate(dateString) {
            const date = new Date(dateString);
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
    width: 100%;
    height: 400px;
}
</style>