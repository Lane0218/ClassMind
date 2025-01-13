<!-- 头部栏 -->
<template>
    <div class="header-container">
        <div class="r-content">
            <span class="button">
                <el-button type="text" @click="toLogin" style="margin-left: 850px; height: 100px; ">退出</el-button>
            </span>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Header',
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
            margin-top: 50px;
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

<script>
export default {
    methods: {
        toLogin() {
            this.$router.push('/Login');
        }
    }
}
</script>