<template>
  <div>RouterTest</div>
  <button @click="goHome">Homeに戻る</button>
  <button @click="checkRoutePath">ルート情報</button>
</template>

<script>
import {
  useRouter,
  useRoute,
  onBeforeRouteLeave,
} from "vue-router";

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

    onBeforeRouteLeave((to, from) => {
      console.log(`to: ${to}`);
      console.log(`from: ${from}`);
    });

    return {
      goHome,
      checkRoutePath,
    };
  },
};
</script>

<style>
</style>
