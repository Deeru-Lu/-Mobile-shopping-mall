<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!--这里包裹一个div是因为slot会被替换将没有class,效果也会没有-->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'#1296DB',
      }

    },
    data(){
      return{

      }
    },
    computed:{
      isActive(){
        //indexO会对路径依次对比路径正确返回0,不对返回-1,与-1判断返回布尔值,再到上面取反
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
        return this.isActive ? {color:this.activeColor} :{}
      }
    },
    methods:{
      itemClick(){
        this.$router.push(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
   font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
