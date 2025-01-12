import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import * as echarts from 'echarts';
// import 'video.js/dist/video-js.css';
// import 'videojs-contrib-hls';
// import videojs from 'video.js';

import VideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';

Vue.use(VideoPlayer);

Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
