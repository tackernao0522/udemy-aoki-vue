<template>
  <div>RouterTest</div>
  <button @click="goHome">Homeに戻る</button>
  <button @click="checkRoutePath">ルート情報</button>
</template>

<script>
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    const goHome = () => {
      router.push("/");
    };

    const checkRoutePath = () => {
      console.log(route.path);
    };

    return {
      goHome,
      checkRoutePath,
    };
  },
};
</script>

<style>
</style>
