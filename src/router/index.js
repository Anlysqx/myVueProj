import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/components/Login";
import Home from "@/components/Home";

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 挂载路由导航守卫
router.beforeEach((to,from,next) => {
  // to 将要访问的路径
  // from 代表从哪个路径来
  // next 是一个函数表示放行
  if(to.path === '/login') return next()
  //获取token
  const token = window.sessionStorage.getItem("token")
  if (!token) return next('/login')
  next()
})

export default router
