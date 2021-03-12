<template>
  <div class="home">
    <!-- header头部 -->
    <section>
      <van-icon name="arrow-left" />
      <van-search v-model="value" placeholder="请输入搜索关键词" background="#00c5c3" />
      <div class="div_beiji" @click="go">
        北京
        <span>▲</span>
      </div>
    </section>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,key) in state.List" :key="key.id">
        <img :src="item.imgUrl" alt />
      </van-swipe-item>
    </van-swipe>
    <!-- 宫格 -->
    <div class="img">
      <van-swipe>
        <van-swipe-item>
          <ul>
            <li v-for="(item,key) in state.Img" :key="key.id">
              <div v-if="item.id !=='0009'">
                <img :src="item.imgUrl" alt class="url" />
                <p>{{item.desc}}</p>
              </div>
            </li>
          </ul>
        </van-swipe-item>
        <van-swipe-item>
          <ul class="ulList">
            <li v-for="(item,key) in state.Img" :key="key.id">
              <div v-if="item.id ==='0009'">
                <img :src="item.imgUrl" alt class="url" />
                <p>{{item.desc}}</p>
              </div>
            </li>
          </ul>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--  -->
    <nav>热销推荐</nav>
    <!-- <button @click="aaa">按钮</button> -->
    <dl v-for="item in state.dl" :key="item.id" class="Dl">
      <dt>
        <img :src="item.imgUrl" alt class="ImgDl" />
      </dt>
      <dd>
        <h6>{{item.title}}</h6>
        <p>{{item.desc}}</p>
        <span @click="edt(item.id)">查看详情</span>
      </dd>
    </dl>
    <nav>周末去哪儿</nav>
    <dl v-for="item in state.dlList" :key="item.id" class="DlTwo">
      <dt>
        <img :src="item.imgUrl" alt class="ImgDl" />
      </dt>
      <dd>
        <h6>{{item.title}}</h6>
        <p>{{item.desc}}</p>
      </dd>
    </dl>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, reactive } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const state = reactive({
      value: "",
      List: [],
      Img: [],
      dl: [],
      dlList: []
    });

    const { ctx } = getCurrentInstance();

    console.log(ctx);

    // const aaa = () => {
    //   ctx.$axios
    //     .get("https://www.liulongbin.top:8888/api/private/v1/login")
    //     .then(res => {
    //       console.log(res);
    //     });
    // };
    //页面跳转
    const router = useRouter();
    function go() {
      router.push("/deil");
    }

    //轮播图//宫格
    ctx.$axios.get("/index.json").then(res => {
      console.log(res);
      ctx.$nextTick(() => {
        state.List = res.data.data.swiperList;
        state.Img = res.data.data.iconList;
        state.dl = res.data.data.recommendList;
        state.dlList = res.data.data.weekendList;
      });
    });

    const edt = id => {
      console.log(id);
      router.push(`/about?id=${id}`);
    };
    return {
      state,
      go,
      edt
    };
  }
});
</script>


<style lang="scss" scoped>
section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background: #00c5c3;
  height: 40px;
  .van-icon {
    font-size: 24px;
  }
  .van-search {
    height: 40px;
  }
  .div_beiji {
    background: #00c5c3;
    border: none;
    font-size: 18px;
    color: #fff;
    height: 40px;
    line-height: 40px;
  }
}
// 轮播图
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
}
.my-swipe {
  width: 100%;
  height: 160px;
  img {
    width: 100%;
    height: 100%;
  }
}

//宫格
.custom-indicator {
  height: 200px;
  position: absolute;
  top: 20px;
}
ul {
  height: 170px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  margin: 1%;
  li {
    width: 22%;
    padding: 2%;
    box-sizing: border-box;
    text-align: center;
  }
}
.url {
  width: 50px;
  height: 50px;
}
nav {
  height: 40px;
  background: #ddd;
  line-height: 40px;
  text-indent: 20px;
  font-size: 18px;
}
.Dl {
  display: flex;
  padding: 1%;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  .ImgDl {
    width: 80px;
    height: 80px;
  }
  dd {
    margin-left: 10px;
    h6 {
      font-size: 20px;
      margin-bottom: 6px;
    }
    p {
      color: #ccc;
      margin-bottom: 6px;
    }
    span {
      display: block;
      width: 60px;
      height: 25px;
      line-height: 25px;
      background: rgb(218, 181, 20);
      border-radius: 4px;
      text-align: center;
      color: #fff;
      font-size: 15px;
    }
  }
}

.DlTwo {
  width: 100%;
  height: 210px;
  dt {
    img {
      width: 100%;
      height: 140px;
    }
  }
  dd {
    h6 {
      text-indent: 10px;
      font-size: 20px;
      margin-bottom: 6px;
    }
    p {
      color: #ccc;
      font-size: 16px;
      text-indent: 10px;
    }
  }
}

.ulList {
  margin: -78px -138px;
  padding: 0px;
}
</style>
