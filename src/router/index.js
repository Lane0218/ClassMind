import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/common/Home.vue'

import LoginPage from '@/components/common/pages/LoginPage.vue'
import RegisterPage from '@/components/common/pages/RegisterPage.vue'

import FirstPage from '@/components/common/pages/FirstPage.vue'

import CoursePage from '@/components/common/pages/CoursePage.vue'

import TeacherPage from '@/components/common/pages/TeacherPage.vue'
import StudentPage from '@/components/common/pages/StudentPage.vue'

import VideoPage from '@/components/common/pages/VideoPage.vue'
import AnalysisPage from '@/components/common/pages/AnalysisPage.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/Login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/Register',
    name: 'register',
    component: RegisterPage
  },

  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/login',
    children: [{
      path: '/firstPage',
      name: 'firstpage',
      component: FirstPage
    },
    {
      path: '/student',
      name: 'student',
      component: StudentPage
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: TeacherPage
    },
    {
      path: '/course',
      name: 'course',
      component: CoursePage
    },
    {
      path: '/video',
      name: 'video',
      component: VideoPage
    },
    {
      path: '/analysis',
      name: 'analysis',
      component: AnalysisPage
    }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router