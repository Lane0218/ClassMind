<!-- 页面菜单侧边栏 -->
<template>
    <div class="asideContainer">
        <!-- default-active默认菜单栏需要修改 -->
        <el-menu :default-active="isactiveMenu" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            :collapse="isCollapse" background-color="#f0f4f8" text-color="#333" active-text-color="#50a3ff">
            <h3>{{ isCollapse ? '' : 'ClassMind' }}</h3>
            <!-- 一级索引 -->
            <el-menu-item :key="noChildren[0].name" :index="noChildren[0].name" @click="clickMenu(noChildren[0])">
                <i :class="`el-icon-${noChildren[0].icon}`"></i>
                <span slot="title">{{ noChildren[0].label }}</span>
            </el-menu-item>

            <!-- 带有二级索引 -->
            <el-submenu v-for="item in hasChildren" :key="item.name" :index="item.name">
                <template slot="title">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{ item.label }}</span>
                </template>

                <el-menu-item-group v-for="subItem in item.children" :key="subItem.name">
                    <el-menu-item :index="subItem.name" @click="clickMenu(subItem)">{{ subItem.label }}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <!-- 一级索引 -->
            <el-menu-item v-for="item in noChildren.filter((_, index) => index !== 0)" :key="item.name"
                :index="item.name" @click="clickMenu(item)">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item>

        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //只需修改menuData以改变侧菜单栏，也可用于动态渲染
            menuData: [{
                //一级索引
                path: '/FirstPage',
                name: 'firstpage',
                label: '首页',
                icon: 's-home',
                // url: 'Home/Home'
            },
            {
                //一级索引
                name: 'account',
                label: '用户管理',
                icon: 'user',
                path: '/account',
                children: [
                    {
                        path: '/student',
                        name: 'student',
                        label: '学生管理',
                        // icon: 'setting',
                        url: '/student'
                    },
                    {
                        path: '/teacher',
                        name: 'teacher',
                        label: '教师管理',
                        // icon: 'setting',
                        url: '/teacher'
                    },
                ]
            },
            {
                label: '课程管理',
                icon: 'setting',
                name: 'course',
                path: '/course',
            },
            {
                label: '大模型分析',
                icon: 's-data',
                name: 'data',
                path: '/video',
            },

                // {
                //     label: '数据管理',
                //     icon: 's-data',
                //     name: 'data',
                //     children: [
                //         {
                //             path: '/video',
                //             name: 'video',
                //             label: '视频管理',
                //             // icon: 'setting',
                //             url: '/video'
                //         },
                //         {
                //             path: '/analysis',
                //             name: 'analysis',
                //             label: '数据分析',
                //             // icon: 'setting',
                //             url: '/analysis'
                //         },
                //     ]
                // }
            ]
        };
    },
    name: 'Aside',
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickMenu(item) {
            if (this.$route.path != item.path) {
                this.$router.push(item.path);
            }
            // 更新激活的菜单项
            this.$store.commit('updateActiveMenu', item.name);
            //面包屑更新
            this.$store.commit('menuChange', item)
        }
    },
    computed: {
        //过滤获取有二级菜单的数据
        hasChildren() {
            return this.menuData.filter(item => item.children)
        },
        //过滤获取只有一级菜单的数据
        noChildren() {
            return this.menuData.filter(item => !item.children)
        },
        isCollapse() {
            return this.$store.state.isCollapse
        },
        isactiveMenu() {
            return this.$store.state.activeMenu
        }
    }
}
</script>

<style lang="less" scoped>
.el-menu {
    height: 800px;
    width: 200px;
    display: flexbox;
    border-right: 0cap;

    h3 {
        color: blue;
        text-align: center;
        font-size: 22px;
        font-weight: 400;
        padding: 0 20px;
    }
}
</style>
