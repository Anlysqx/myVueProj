import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/components/Login";
import Home from "@/components/Home";
import AutomaticGenerationWorkspace from "@/components/AutomaticGenerationWorkspace";
import NewCase from "@/components/baseUtils/NewCase";
import ClassifyComponent from "@/components/functionalComponents/ClassifyComponent";
import InfoExtractComponent from "@/components/functionalComponents/InfoExtractComponent";
import CodeGenerationComponent from "@/components/functionalComponents/CodeGenerationComponent";
import GenerFlowComponent from "@/components/functionalComponents/GenerFlowComponent";
import UseCaseSearch from "@/components/functionalComponents/UseCaseSearch";

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
  },
  {
    path:'/workspace',
    component: AutomaticGenerationWorkspace,
    children:[
      {path:'/newcase',component:NewCase},
      {path:'/usecase_search',component:UseCaseSearch},
      {path:'/info_classify',component:ClassifyComponent},
      {path:'/info_extraction',component:InfoExtractComponent},
      {path:'/code_generation',component:CodeGenerationComponent},
      {path:'/generation_flow',component:GenerFlowComponent},
    ]
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
