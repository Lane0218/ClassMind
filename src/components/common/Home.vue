<!-- 主页面 -->
<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <!-- <CommonTab></CommonTab> -->
        <el-main>
          <!-- 路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import router from '@/router';
import Aside from './Aside.vue';
import Header from './Header.vue';
import CommonTab from './CommonTab.vue';
export default {
  name: 'Home',
  components: {
    Aside,
    Header,
    CommonTab
  }
}
</script>

<style scoped>
.el-header {
  margin: 0;
  padding: 0;
}
</style>
