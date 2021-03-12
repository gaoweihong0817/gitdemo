<template>
  <div class="about">
    <p class="p">
    <van-icon name="arrow-left" @click="left"/>
      <img :src="state.bannerImg" alt  @click="banner"/>
     <section>
       <nav>{{state.sightName}}</nav>
     <span>图2</span>
     </section>
    </p>
    <dl v-for="(item,key) in state.categoryList" :key="key">
      <dt class="iconfont icon-weibiaoti--"></dt>
      <dd>
        {{item.title}}
        <dl v-for="(it,key) in item.children" :key="key" class="dl">
          <dt class="iconfont icon-weibiaoti--"></dt>
          <dd>
            {{it.title}}
            <dl v-for="(itm,key) in it.children" :key="key">
          <dt class="iconfont icon-weibiaoti--"></dt>
          <dd> {{itm.title}}</dd>
        </dl>
          </dd>
        </dl>
      </dd>
    </dl>
    <ul>
      <li>

      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, getCurrentInstance } from "vue";
import { useRoute,useRouter } from "vue-router";
import {  ImagePreview } from "vant";
export default {
  setup() {
    //接受路由
    const route = useRoute();
    const id = route.query.id;
    console.log(id);
    //跳转路由
    const router = useRouter();
    const left=()=>{
      router.push('/')
    }
    const state = reactive({
      bannerImg:'',
      sightName:"",
      list: [],
      gallaryImgs:[],
      categoryList:[]
    });
    const { ctx } = getCurrentInstance();
    console.log(ctx);
  
    ctx.$axios.get("/detail.json?id=" + id).then(res => {
      console.log(res);
      state.bannerImg=res.data.data.bannerImg
      state.sightName=res.data.data.sightName
      state.list = res.data.data.categoryList;
      state.gallaryImgs = res.data.data.gallaryImgs;
      state.categoryList = res.data.data.categoryList;
    });

  //图片放大
  const banner=()=>{
    ImagePreview([
      state.gallaryImgs[0], state.gallaryImgs[1]
    ]);
  }
    return {
      state,
      id,
      left,
      banner
    };
  }
};
</script>
<style lang="scss" scoped>
.p{
  width: 100%;
  height: 200px;
  position: relative;
  img{
     width: 100%;
    height: 100%;
  }
  .van-icon{
    width: 50px;
    height: 50px;
    background: rgba(0,0,0,.8);
    border-radius: 50%;
    text-align: center;
    line-height: 50px;
    font-size: 24px;
    color: #fff;
    position: absolute;
    top: 10px;
    left: 20px;
  }
  section{
    height: 20px;
    width: 100%;
    position: absolute;
    bottom: 0;
    background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
  }
  nav{
    position: absolute;
    bottom: 4px;
    font-size: 16px;
    color: #fff;
    text-indent: 10px;
  }
  span{
    display: inline-block;
    position: absolute;
    bottom: 4px;
    right: 20px;
    background: #ccc;
    width: 50px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px 10px;
    text-align: center;
    color: #fff;
    font-size: 10px;
    line-height: 20px;
  }
}
dl{
  width: 100%;
  display: flex;
  // border-bottom: 1px solid #ccc;
  padding: 6px;
    box-sizing: border-box;
    margin-top:8px;
 dd{
  //  height: 40px;
   width: 100%;
    
    font-size: 14px;
    vertical-align: middle;
    margin-left: 6px;

 }
 dt{
   width: 20px;
   height: 20px;
   background: rgb(5, 208, 223);
   border-radius: 50%;
 }
}

</style>
