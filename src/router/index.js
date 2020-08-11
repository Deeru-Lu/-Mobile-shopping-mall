import Vue from 'vue';
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Profile = () => import('views/profile/Profile')
const ShopCart = () => import('views/shopcart/ShopCart')

//1.安装插件
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:''
  },
  {
    path: '/home',
    name:'Home',
    component:Home
  },
  {
    path: '/category',
    name:'Category',
    component:Category
  },
  {
    path: '/shopcart',
    name:'ShopCart',
    component:ShopCart
  },
  {
    path: '/profile',
    name:'Profile',
    component:Profile
  }
]

//2.创建router
const router = new VueRouter({
  routes,
  mode:'history'
})

//3.导出
export default router
