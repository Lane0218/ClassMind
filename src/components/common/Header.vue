<!-- 头部栏 -->
<template>
    <div class="header-container">
        <div class="l-content">
            <el-button icon="el-icon-menu" size="medium" style="margin-left: 20px;" @click="handleMenu"></el-button>
            <el-breadcrumb separator="/" style="padding-left: 20px;">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" v-if="item.label != '首页'"
                    @click.native="handleBreadcrumbClick(item)">{{
                        item.label
                    }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon--right"></i>
                    <img class='photo' src="@/assets/images/logo.png" />
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>项目简介</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Header',
    // data() {
    //     return {
    //         authors: [
    //             {
    //                 name: '第三组'
    //             },
    //             {
    //                 name: 'csy'
    //             },
    //             {
    //                 name: 'chj'
    //             },
    //             {
    //                 name: 'qzx'
    //             }
    //         ]
    //     };
    // },
    methods: {
        //缩放菜单
        handleMenu() {
            this.$store.commit('collapseChange')
        },
        handleBreadcrumbClick(item) {
            // 检查目标路由是否与当前路由相同
            if (this.$route.path !== item.path) {
                // 使用编程式导航跳转到目标路由
                this.$router.push(item.path);
            }
            // 更新激活的菜单项
            this.$store.commit('updateActiveMenu', item.name);
            this.$store.commit('menuChange', item)
        }
    },
    computed: {
        ...mapState({
            tags: state => state.tabsList
        })
    }
}
</script>

<style lang="less" scoped>
.header-container {
    height: 60px;
    background-color: #f0f4f8;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .firstpage {
        color: #f0f8ff;
        font-size: 16px;
        margin-left: 10px;
        cursor: pointer;
    }

    .r-content {
        padding-right: 20px;

        .photo {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }

    .l-content {
        display: flex;
        align-items: center;

        /deep/.el-breadcrumb__item {
            cursor: pointer;

            .el-breadcrumb__inner {
                font-weight: normal;

                &.is-link {
                    color: #ffffffbd
                }
            }

            &:last-child {
                .el-breadcrumb__inner {
                    color: #5cb1fb;
                }
            }
        }

    }
}
</style>