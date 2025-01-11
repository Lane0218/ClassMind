<template>
    <div class="tabs">
        <el-tag v-for="item in tags" :key="item.label" :effect="isActive === item.name ? 'dark' : 'plain'"
            v-if ="item.label !== '首页'" @close="handleClose(item)" @click="changeMenu(item)" :closable=true>
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'commonTab',
    // data() {
    //     return {

    //     }
    // },
    methods: {
        ...mapMutations(['closeTag']),
        changeMenu(item) {
            if (this.$route.path != item.path) {
                this.$router.push(item.path);
            }
            // 更新激活的菜单项
            this.$store.commit('updateActiveMenu', item.name);
            //面包屑更新
            this.$store.commit('menuChange', item)
        },
        handleClose(item){
            this.closeTag(item)
            if(this.$route.name !== item.name){
                return
            }
            this.$router.push(this.tags[0])
        }
    },
    computed: {
        ...mapState({
            tags: state => state.tabsList
        }),
        isActive() {
            return this.$store.state.activeMenu
        }
    }
}
</script>

<style lang="less" scoped>
.tabs {
    position: relative;
    background: #fff;
    box-shadow: 0px 5px 10px #ddd;
    padding-bottom: 5px;
    padding-top: 5px;
    padding-left: 5px;

    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>