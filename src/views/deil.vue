<template>
  <div class="go">
    <section>
      <van-nav-bar title="城市选择" left-arrow @click="go"></van-nav-bar>
      <van-search v-model="value" placeholder="请输入搜索关键词" background="#00c5c3" />
    </section>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    function go() {
      router.push("/");
    }
    return {
      go
    };
  }
};
</script>

<style scoped lang="scss">
.go {
  section {
    height: 100px;
    background: #00c5c3;
    .van-nav-bar {
      background: #00c5c3;
    }
  }
}
</style>