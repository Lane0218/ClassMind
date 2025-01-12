<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix" style="height: 30px;">
                <span>课程管理</span>

                <el-button style="float: right; padding: 3px 15px; margin-right: 10px;height: 40px;" type="primary"
                    @click="openAddDialog">添加课程</el-button>

                <el-button style="float: right; padding: 3px 10px; height: 40px;margin-right: 40px;"
                    @click="fetchCourses">筛选</el-button>
                <el-input v-model="filterValue" placeholder="请输入筛选值"
                    style="float: right; margin-right: 0px; width: 125px; height: 10px;"></el-input>
                <el-select v-model="filterField" placeholder="请选择筛选字段"
                    style="float: right; margin-right: 10px; width: 145px;">
                    <el-option label="课程编号" value="id"></el-option>
                    <el-option label="课程名称" value="name"></el-option>
                    <el-option label="教师姓名" value="t_name"></el-option>
                </el-select>
            </div>
            <el-table :data="courses" style="width: 100%" :row-style="{ height: '0' }" :cell-style="{ padding: '0' }">
                <el-table-column prop="id" label="课程编号"></el-table-column>
                <el-table-column prop="name" label="课程名称" width="120px"></el-table-column>
                <el-table-column prop="t_id" label="教师统一认证帐号" width="150px"></el-table-column>
                <el-table-column prop="t_name" label="教师姓名"></el-table-column>
                <el-table-column label="阅读率" width="62px">
                    <template slot-scope="scope">
                        {{ scope.row.readingRate }}%
                    </template>
                </el-table-column>
                <el-table-column label="举手率" width="62px">
                    <template slot-scope="scope">
                        {{ scope.row.handsUpRate }}%
                    </template>
                </el-table-column>
                <el-table-column label="写字率" width="62px">
                    <template slot-scope="scope">
                        {{ scope.row.writingRate }}%
                    </template>
                </el-table-column>
                <el-table-column prop="score" label="课堂评分"></el-table-column>
                <el-table-column label="操作" width="100px">
                    <template slot-scope="scope">
                        <el-button type="text" @click="editCourse(scope.row.id)">编辑</el-button>
                        <el-button type="text" @click="deleteCourse(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[8, 15, 30]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total" style="margin-top: 30px;">
            </el-pagination>
        </el-card>

        <!-- 添加课程对话框 -->
        <el-dialog title="添加课程信息" :visible.sync="showAddDialog">
            <el-form ref="newCourse" :model="newCourse" label-width="140px">
                <el-form-item label="课程编号">
                    <el-input v-model="newCourse.id" placeholder="请输入课程编号" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="课程名称">
                    <el-input v-model="newCourse.name" placeholder="请输入课程名称" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="教师统一认证帐号">
                    <el-input v-model="newCourse.t_id" placeholder="请输入教师统一认证帐号" style="width: 80%;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeAddDialog">取消</el-button>
                <el-button type="primary" @click="addCourse">添加</el-button>
            </div>
        </el-dialog>

        <!-- 编辑课程对话框 -->
        <el-dialog title="编辑课程信息" :visible.sync="showEditDialog">
            <el-form ref="editCourseData" :model="editCourseData" label-width="140px">
                <el-form-item label="课程名称">
                    <el-input v-model="editCourseData.name" placeholder="请输入课程名称" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="教师统一认证帐号">
                    <el-input v-model="editCourseData.t_id" placeholder="请输入教师统一认证帐号" style="width: 80%;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeEditDialog">取消</el-button>
                <el-button type="primary" @click="updateCourse">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            courses: [],
            newCourse: {
                id: '',
                name: '',
                t_id: ''
            },
            editCourseData: {
                id: '',
                name: '',
                t_id: ''
            },
            showAddDialog: false,
            showEditDialog: false,
            currentPage: 1,
            pageSize: 8,
            total: 0,
            filterField: '',
            filterValue: ''
        };
    },
    methods: {
        fetchCourses() {
            const { currentPage, pageSize, filterField, filterValue } = this;
            let url = `http://127.0.0.1:5000/courses?page=${currentPage}&size=${pageSize}`;
            if (filterField && filterValue) {
                url += `&filterField=${filterField}&filterValue=${filterValue}`;
            }
            this.$axios.get(url)
                .then(response => {
                    this.courses = response.data.data;
                    this.total = response.data.total;
                })
                .catch(error => {
                    console.error(error);
                    this.$message.error('获取课程列表失败');
                });
        },
        addCourse() {
            if (!this.newCourse.id || !this.newCourse.name || !this.newCourse.t_id) {
                this.$message.error('请填写完整的课程信息');
                return;
            }
            this.$axios.post('http://127.0.0.1:5000/courses', this.newCourse)
                .then(response => {
                    this.$message.success(response.data.message);
                    this.fetchCourses();
                    this.closeAddDialog();
                })
                .catch(error => {
                    console.error(error);
                    if (error.response) {
                        this.$message.error(error.response.data.message);
                    }
                })
        },
        openAddDialog() {
            this.showAddDialog = true;
        },
        closeAddDialog() {
            this.showAddDialog = false;
            this.newCourse.id = '';
            this.newCourse.name = '';
            this.newCourse.t_id = '';
        },
        editCourse(courseId) {
            this.$axios.get(`http://127.0.0.1:5000/courses/${courseId}`)
                .then(response => {
                    this.editCourseData = response.data;
                    this.showEditDialog = true;
                })
                .catch(error => {
                    console.error(error);
                    this.$message.error('获取课程信息失败');
                });
        },
        updateCourse() {
            if (!this.editCourseData.name || !this.editCourseData.t_id) {
                this.$message.error('请填写完整的课程信息');
                return;
            }
            this.$axios.put(`http://127.0.0.1:5000/courses/${this.editCourseData.id}`, this.editCourseData)
                .then(response => {
                    this.$message.success(response.data.message);
                    this.fetchCourses();
                    this.closeEditDialog();
                })
                .catch(error => {
                    console.error(error);
                    if (error.response) {
                        this.$message.error(error.response.data.message);
                    }
                })
        },
        closeEditDialog() {
            this.showEditDialog = false;
            this.editCourseData.id = '';
            this.editCourseData.name = '';
            this.editCourseData.t_id = '';
        },
        deleteCourse(courseId) {
            this.$confirm('确定要删除这个课程吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete(`http://127.0.0.1:5000/courses/${courseId}`)
                    .then(response => {
                        this.$message.success(response.data.message);
                        this.fetchCourses();
                    })
                    .catch(error => {
                        console.error(error);
                        this.$message.error('删除课程失败');
                    });
            }).catch(() => {
                this.$message.info('已取消删除');
            });
        },
        handleSizeChange(newSize) {
            this.pageSize = newSize;
            this.fetchCourses();
        },
        handleCurrentChange(newPage) {
            this.currentPage = newPage;
            this.fetchCourses();
        }
    },
    created() {
        this.fetchCourses();
    }
};
</script>

<style>
.box-card {
    margin: 0px;
}
</style>