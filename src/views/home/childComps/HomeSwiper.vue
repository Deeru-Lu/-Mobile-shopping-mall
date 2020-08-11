<template>
  <div>
    <swiper  ref="swiper">
      <swiper-item v-for="item in banners" :key="item.image">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  //轮播图总框架
  /*import Swiper from "components/common/swiper/Swiper";
  //轮播图单页面
  import SwiperItem from "components/common/swiper/SwiperItem";*/
  //因为封装的swiper中封装index.js,把集体导出
  import {Swiper, SwiperItem} from 'components/common/swiper';
  export default {
    name: "HomeSwiper",
    props:{
      banners:{
        type:Array,
        default() {
          return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    methods: {
      stopTimer() {
        this.$refs.swiper.stopTimer()
      },
      startTimer() {
        if (this.$refs.swiper) {
          this.$refs.swiper.startTimer()
        }
      }
    }
  }
</script>

<style scoped>

</style>
