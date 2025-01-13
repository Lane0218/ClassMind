<template>
    <div class="firstpage">
        <el-row>
            <el-col>
                <!-- 学校基本信息一览 -->
                <el-card class="box-card">
                    <div class="information">
                        <div v-for="(item, index) in schoolData" :key="item.name">
                            <div v-if="index % 2 === 0" class="row">
                                <p>{{ item.name }} {{ item.number }}</p>
                                <p v-if="index + 1 < schoolData.length">{{ schoolData[index + 1].name }} {{
                                    schoolData[index + 1].number }}</p>
                            </div>
                        </div>
                    </div>
                </el-card>
                <!-- 学员基本信息（节选）一览 -->
                <el-card class="box-card" style="margin-top: 20px;">
                    <div slot="header" class="clearfix">
                        <span>明星课程</span>
                    </div>
                    <el-table :data="courseData" border style="width: 100%">
                        <el-table-column prop="name" label="课程" width="auto">
                        </el-table-column>
                        <el-table-column prop="t_name" label="教师" width="auto">
                        </el-table-column>
                        <el-table-column prop="readingRate" label="阅读率" width="auto">
                        </el-table-column>
                        <el-table-column prop="handsUpRate" label="举手率" width="auto">
                        </el-table-column>
                        <el-table-column prop="writingRate" label="写字率" width="auto">
                        </el-table-column>
                        <el-table-column prop="score" label="课堂评分" width="auto">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'firstpage',
    data() {
        return {
            schoolData: [],
            courseData: []
        };
    },
    created() {
        this.fetchStats();
        this.fetchTopCourses();
    },
    methods: {
        fetchStats() {
            this.$axios.get('http://127.0.0.1:5000/stats')
                .then(response => {
                    this.schoolData = [
                        { name: '学生总数', number: response.data.student_total },
                        { name: '教师总数', number: response.data.teacher_total },
                        { name: '课程总数', number: response.data.course_total },
                        { name: '视频总数', number: response.data.video_total }
                    ];
                })
                .catch(error => {
                    console.error(error);
                    this.$message.error('获取统计数据失败');
                });
        },
        fetchTopCourses() {
            this.$axios.get('http://127.0.0.1:5000/top_courses')
                .then(response => {
                    this.courseData = response.data;
                })
                .catch(error => {
                    console.error(error);
                    this.$message.error('获取课程数据失败');
                });
        }
    }
}
</script>

<style lang="less" scoped>
.firstpage {
    .el-card {
        .information {
            align-items: center;

            .row {
                display: flex;
                justify-content: space-between;
            }

            .row p {
                flex: 1;
                /* 每个元素占据相等的空间 */
                margin-right: 50px;
                /* 元素之间的间隔 */
            }

            .row p:last-child {
                margin-right: 5px;
                /* 最后一个元素没有右边距 */
            }
        }
    }
}
</style>