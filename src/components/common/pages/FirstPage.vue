<!-- 首页 -->
<template>
    <div class="firstpage">
        <el-row>
            <el-col>
                <!-- 学校基本信息一览 -->
                <el-card class="box-card">
                    <!-- <div class="school">
                        <img class="school-picture" src="@/assets/images/school.png">
                    </div> -->
                    <div class="information">
                        <div v-for="(item, index) in schoolData" :key="item.name">
                            <div v-if="index % 2 === 0" class="row">
                                <p>{{ item.name }} {{ item.number }}</p>
                                <p v-if="index + 1 < schoolData.length">{{ schoolData[index + 1].name }} {{
                                    schoolData[index
                                        + 1].number }}</p>
                            </div>
                        </div>
                    </div>
                </el-card>
                <!-- 学员基本信息（节选）一览 -->
                <el-card class="box-card" style="margin-top: 20px;">
                    <el-table :data="courseData" border style="width: 100%">
                        <el-table-column prop="course" label="课程" width="auto">
                        </el-table-column>
                        <el-table-column prop="teacher" label="教师" width="auto">
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
import Scatter from './first/Scatter.vue';
// import Map from './first/Map.vue';
export default {
    name: 'firstpage',
    // components: {
    //     Scatter,
    //     Map
    // },
    data() {
        return {
            //数量信息待传参
            schoolData: [{
                name: '学生总数',
                number: 1000
            },
            {
                name: '教师总数',
                number: 10086
            },
            {
                name: '课程总数',
                number: 10
            },
            {
                name: '视频总时长',
                number: 3
            }],
            //待传参
            courseData: [{
                course: '高等数学',
                teacher: '张春梅',
                readingRate: '25%',
                handsUpRate: '37%',
                writingRate: '26%',
                score: '90'
            },
            {
                course: '离散数学',
                teacher: '李暾',
                readingRate: '39%',
                handsUpRate: '37%',
                writingRate: '26%',
                score: '95'
            },
            {
                course: '软件工程',
                teacher: '董威',
                readingRate: '10%',
                handsUpRate: '0%',
                writingRate: '0%',
                score: '30'
            },
            {
                course: '人工智能',
                teacher: '祝恩',
                readingRate: '10%',
                handsUpRate: '0%',
                writingRate: '5%',
                score: '38'
            },
            {
                course: '操作系统',
                teacher: '文艳军',
                readingRate: '20%',
                handsUpRate: '10%',
                writingRate: '15%',
                score: '60'
            }]
        };
    }
}
</script>

<style lang="less" scoped>
.firstpage {

    .el-card {
        .school {
            margin: 0%;
            padding: 0%;
            // border-bottom: 2px solid #999;

            // .school-picture {
            //     width: 100%;
            //     height: 100%;
            // }
        }

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