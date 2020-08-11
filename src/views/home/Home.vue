<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">鹿园巷</div></nav-bar>
    <!--@pullingUp="loadMore"-->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" >
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends" />
      <feature-view/>
      <tab-control :titles ="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" />
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top  @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";


  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return{
        //result:null
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        isShowBackTop:false
      }
    },
    created() {
      //1.请求多个首页封面数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')



    },
    mounted() {
      //3.监听item中图片加载完成
      this.$bus.$on('itemImageLoad',() =>{
        this.$refs.scroll.refresh()
      })
    },
    methods:{
      /**
       * 事件监听相关方法
       */
       tabClick(index){
         switch (index) {
           case 0:
             this.currentType = 'pop'
             break
           case 1:
             this.currentType = 'new'
             break
           case 2:
             this.currentType = 'sell'
             break
         }
      },
      backClick(){
         this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position) {
         this.isShowBackTop = (- position.y) > 1000
      },
      /*loadMore(){
        this.getHomeGoods(this.currentType)

        //重新计算图片高度
        this.$refs.scroll.scroll.refresh()
      },*/

      /**
       * 网络请求相关方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res =>{
          //console.log(res);
          //this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          //console.log(res)
          //数组合并,把加载来的数据全部合并在一个数组里面,遍历也可以实现
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          /*this.$refs.scroll.finishPullUp()*/
        })
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    }
  }

</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  /*这个是让导航栏滚动到顶部停止了,但是这个不兼容还是要使用粘性定位(粘性双定位)*/
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
  /*.content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 51px;
  }*/
</style>
