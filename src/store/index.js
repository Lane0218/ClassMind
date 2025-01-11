import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false, //菜单栏缩放控制器
    tabsList: [ //面包屑控制器
      {
        path: '/',
        name: 'firstpage',
        label: '首页',
        icon: 's-home',
        url: 'firstpage'
      }
    ],
    activeMenu: 'firstpage'
  },
  getters: {},
  mutations: {
    collapseChange(state) {
      state.isCollapse = !state.isCollapse
    },
    menuChange(state, val) {
      if (val.name != 'firstpage') {
        const index = state.tabsList.findIndex(item => item.name === val.name)
        if (index === -1) {
          state.tabsList.push(val)
        } else {
          state.tabsList.splice(index, 1)
          state.tabsList.push(val)
        }
      }
    },
    updateActiveMenu(state, name) {
      state.activeMenu = name;
    },
    closeTag(state, val) {
      const index = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(1,index)
    }
  },
  actions: {},
  modules: {}
})