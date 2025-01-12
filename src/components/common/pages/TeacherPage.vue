<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix" style="height: 30px;">
                <span>教师管理</span>
                <el-button style="float: right; padding: 3px 15px; margin-right: 10px;height: 40px;" type="primary"
                    @click="openAddDialog">添加教师</el-button>

                <el-button style="float: right; padding: 3px 10px; height: 40px;margin-right: 40px;"
                    @click="fetchTeachers">筛选</el-button>
                <el-input v-model="filterValue" placeholder="请输入筛选值"
                    style="float: right; margin-right: 0px; width: 125px; height: 10px;"></el-input>
                <el-select v-model="filterField" placeholder="请选择筛选字段"
                    style="float: right; margin-right: 10px; width: 145px;">
                    <el-option label="统一认证帐号" value="id"></el-option>
                    <el-option label="姓名" value="name"></el-option>
                </el-select>
            </div>
            <el-table :data="teachers" style="width: 100%" :row-style="{ height: '0' }" :cell-style="{ padding: '0' }">
                <el-table-column prop="id" label="统一认证帐号" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button type="text" @click="editTeacher(scope.row.id)">编辑</el-button>
                        <el-button type="text" @click="deleteTeacher(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[8, 15, 30]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total" style="margin-top: 30px;">
            </el-pagination>
        </el-card>

        <!-- 添加教师对话框 -->
        <el-dialog title="添加教师信息" :visible.sync="showAddDialog">
            <el-form ref="newTeacher" :model="newTeacher" label-width="100px">
                <el-form-item label="统一认证帐号">
                    <el-input v-model="newTeacher.id" placeholder="请输入统一认证帐号" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="newTeacher.name" placeholder="请输入姓名" style="width: 80%;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeAddDialog">取消</el-button>
                <el-button type="primary" @click="addTeacher">添加</el-button>
            </div>
        </el-dialog>

        <!-- 编辑教师对话框 -->
        <el-dialog title="编辑教师信息" :visible.sync="showEditDialog">
            <el-form ref="editTeacherData" :model="editTeacherData" label-width="50px">
                <el-form-item label="姓名">
                    <el-input v-model="editTeacherData.name" placeholder="请修改姓名" style="width: 80%;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeEditDialog">取消</el-button>
                <el-button type="primary" @click="updateTeacher">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            teachers: [],
            newTeacher: {
                id: '',
                name: '',
            },
            editTeacherData: {
                id: '',
                name: '',
            },
            showAddDialog: false,
            showEditDialog: false,
            currentPage: 1,
            pageSize: 8,
            total: 0,
            filterField: '',
            filterValue: '',
        };
    },
    methods: {
        fetchTeachers() {
            const { currentPage, pageSize, filterField, filterValue } = this;
            let url = `http://127.0.0.1:5000/teachers?page=${currentPage}&size=${pageSize}`;
            if (filterField && filterValue) {
                url += `&filterField=${filterField}&filterValue=${filterValue}`;
            }
            this.$axios.get(url)
                .then(response => {
                    this.teachers = response.data.data;
                    this.total = response.data.total;
                })
                .catch(error => {
                    console.error(error);
                    this.$message.error('获取教师列表失败');
                });
        },
        addTeacher() {
            if (!this.newTeacher.id || !this.newTeacher.name) {
                this.$message.error('请填写完整的教师信息');
                return;
            }
            this.$axios.post('http://127.0.0.1:5000/teachers', this.newTeacher)
                .then(response => {
                    this.$message.success(response.data.message);
                    this.fetchTeachers();
                    this.closeAddDialog();
                })
                .catch(error => {
                    console.error(error);
                    this.$message.error('添加教师失败');
                });
        },
        openAddDialog() {
            this.showAddDialog = true;
        },
        closeAddDialog() {
            this.showAddDialog = false;
            this.newTeacher.id = '';
            this.newTeacher.name = '';
        },
        editTeacher(teacherId) {
            this.$axios.get(`http://127.0.0.1:5000/teachers/${teacherId}`)
                .then(response => {
                    this.editTeacherData = response.data;
                    this.showEditDialog = true;
                })
                .catch(error => {
                    console.error(error);
                    this.$message.error('获取教师信息失败');
                });
        },
        updateTeacher() {
            if (!this.editTeacherData.name) {
                this.$message.error('请填写完整的教师信息');
                return;
            }
            this.$axios.put(`http://127.0.0.1:5000/teachers/${this.editTeacherData.id}`, this.editTeacherData)
                .then(response => {
                    this.$message.success(response.data.message);
                    this.fetchTeachers();
                    this.closeEditDialog();
                })
                .catch(error => {
                    console.error(error);
                    this.$message.error('更新教师信息失败');
                });
        },
        closeEditDialog() {
            this.showEditDialog = false;
            this.editTeacherData.id = '';
            this.editTeacherData.name = '';
        },
        deleteTeacher(teacherId) {
            this.$confirm('确定要删除这个教师吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete(`http://127.0.0.1:5000/teachers/${teacherId}`)
                    .then(response => {
                        this.$message.success(response.data.message);
                        this.fetchTeachers();
                    })
                    .catch(error => {
                        console.error(error);
                        this.$message.error('删除教师失败');
                    });
            }).catch(() => {
                this.$message.info('已取消删除');
            });
        },
        handleSizeChange(newSize) {
            this.pageSize = newSize;
            this.fetchTeachers();
        },
        handleCurrentChange(newPage) {
            this.currentPage = newPage;
            this.fetchTeachers();
        }
    },
    created() {
        this.fetchTeachers();
    }
};
</script>

<style>
.box-card {
    margin: 0px;
}
</style>