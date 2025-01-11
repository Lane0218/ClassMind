<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix" style="height: 30px;">
                <span>学生管理</span>

                <el-button style="float: right; padding: 3px 15px; margin-right: 10px;height: 40px;" type="primary"
                    @click="openAddDialog">添加学生</el-button>

                <el-button style="float: right; padding: 3px 10px; height: 40px;margin-right: 40px;"
                    @click="fetchStudents">筛选</el-button>
                <el-input v-model="filterValue" placeholder="请输入筛选值"
                    style="float: right; margin-right: 0px; width: 125px; height: 10px;"></el-input>
                <el-select v-model="filterField" placeholder="请选择筛选字段"
                    style="float: right; margin-right: 10px; width: 145px;">
                    <el-option label="学号" value="id"></el-option>
                    <el-option label="姓名" value="name"></el-option>
                    <el-option label="专业" value="major"></el-option>
                </el-select>
            </div>
            <el-table :data="students" style="width: 100%" :row-style="{ height: '0' }" :cell-style="{ padding: '0' }">
                <el-table-column prop="id" label="学号" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="major" label="专业"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button type="text" @click="editStudent(scope.row.id)">编辑</el-button>
                        <el-button type="text" @click="deleteStudent(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[10, 20, 50]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total" style="margin-top: 30px;">
            </el-pagination>
        </el-card>

        <!-- 添加学生对话框 -->
        <el-dialog title="添加学生信息" :visible.sync="showAddDialog">
            <el-form ref="newStudent" :model="newStudent" label-width="50px">
                <el-form-item label="学号">
                    <el-input v-model="newStudent.id" placeholder="请输入学号" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="newStudent.name" placeholder="请输入姓名" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="专业">
                    <el-select v-model="newStudent.major" filterable allow-create default-first-option
                        placeholder="请选择专业（也可输入其他专业）" style="width: 80%;">
                        <el-option v-for="item in majors" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeAddDialog">取消</el-button>
                <el-button type="primary" @click="addStudent">添加</el-button>
            </div>
        </el-dialog>

        <!-- 编辑学生对话框 -->
        <el-dialog title="编辑学生信息" :visible.sync="showEditDialog">
            <el-form ref="editStudentData" :model="editStudentData" label-width="50px">
                <el-form-item label="姓名">
                    <el-input v-model="editStudentData.name" placeholder="请修改姓名" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="专业">
                    <el-select v-model="editStudentData.major" filterable allow-create default-first-option
                        placeholder="请修改专业（也可输入其他专业）" style="width: 80%;">
                        <el-option v-for="item in majors" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeEditDialog">取消</el-button>
                <el-button type="primary" @click="updateStudent">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            students: [],
            newStudent: {
                id: '',
                name: '',
                major: ''
            },
            editStudentData: {
                id: '',
                name: '',
                major: ''
            },
            showAddDialog: false,
            showEditDialog: false,
            currentPage: 1,
            pageSize: 10,
            total: 0,
            filterField: '',
            filterValue: '',
            majors: [
                { value: '计算机类（软件工程）', label: '计算机类（软件工程）' },
                { value: '计算机类（人工智能与大数据）', label: '计算机类（人工智能与大数据）' },
                { value: '计算机类（网络工程）', label: '计算机类（网络工程）' },
                { value: '计算机类（信息安全）', label: '计算机类（信息安全）' },
                { value: '计算机类（计算机系统）', label: '计算机类（计算机系统）' },
                { value: '计算机科学与技术（天河拔尖班）', label: '计算机科学与技术（天河拔尖班）' },
                { value: '临床医学', label: '临床医学' },
                { value: '口腔医学', label: '口腔医学' },
                { value: '基础医学', label: '基础医学' }
            ]
        };
    },
    methods: {
        fetchStudents() {
            const { currentPage, pageSize, filterField, filterValue } = this;
            let url = `http://127.0.0.1:5000/students?page=${currentPage}&size=${pageSize}`;
            if (filterField && filterValue) {
                url += `&filterField=${filterField}&filterValue=${filterValue}`;
            }
            this.$axios.get(url)
                .then(response => {
                    this.students = response.data.data;
                    this.total = response.data.total;
                })
                .catch(error => {
                    console.error(error);
                    this.$message.error('获取学生列表失败');
                });
        },
        addStudent() {
            if (!this.newStudent.id || !this.newStudent.name || !this.newStudent.major) {
                this.$message.error('请填写完整的学生信息');
                return;
            }
            this.$axios.post('http://127.0.0.1:5000/students', this.newStudent)
                .then(response => {
                    this.$message.success(response.data.message);
                    this.fetchStudents();
                    this.closeAddDialog();
                })
                .catch(error => {
                    console.error(error);
                    this.$message.error('添加学生失败');
                });
        },
        openAddDialog() {
            this.showAddDialog = true;
        },
        closeAddDialog() {
            this.showAddDialog = false;
            this.newStudent.id = '';
            this.newStudent.name = '';
            this.newStudent.major = '';
        },
        editStudent(studentId) {
            this.$axios.get(`http://127.0.0.1:5000/students/${studentId}`)
                .then(response => {
                    this.editStudentData = response.data;
                    this.showEditDialog = true;
                })
                .catch(error => {
                    console.error(error);
                    this.$message.error('获取学生信息失败');
                });
        },
        updateStudent() {
            if (!this.editStudentData.name || !this.editStudentData.major) {
                this.$message.error('请填写完整的学生信息');
                return;
            }
            this.$axios.put(`http://127.0.0.1:5000/students/${this.editStudentData.id}`, this.editStudentData)
                .then(response => {
                    this.$message.success(response.data.message);
                    this.fetchStudents();
                    this.closeEditDialog();
                })
                .catch(error => {
                    console.error(error);
                    this.$message.error('更新学生信息失败');
                });
        },
        closeEditDialog() {
            this.showEditDialog = false;
            this.editStudentData.id = '';
            this.editStudentData.name = '';
            this.editStudentData.major = '';
        },
        deleteStudent(studentId) {
            this.$confirm('确定要删除这个学生吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete(`http://127.0.0.1:5000/students/${studentId}`)
                    .then(response => {
                        this.$message.success(response.data.message);
                        this.fetchStudents();
                    })
                    .catch(error => {
                        console.error(error);
                        this.$message.error('删除学生失败');
                    });
            }).catch(() => {
                this.$message.info('已取消删除');
            });
        },
        handleSizeChange(newSize) {
            this.pageSize = newSize;
            this.fetchStudents();
        },
        handleCurrentChange(newPage) {
            this.currentPage = newPage;
            this.fetchStudents();
        }
    },
    created() {
        this.fetchStudents();
    }
};
</script>

<style>
.box-card {
    margin: 0px;
}
</style>