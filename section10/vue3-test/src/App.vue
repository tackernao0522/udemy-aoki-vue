<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/children">Children</router-link> |
    <router-link to="/teleport-test">Teleport</router-link> |
    <router-link to="/composition-test">Composition</router-link> |
    <router-link to="/props-emit-test">PropsEmit</router-link> |
    <router-link to="/function-test">Function</router-link> |
    <router-link to="/router-test">Router</router-link>
  </div>
  <router-view
    :setupBooks="setupBooks"
    :dataBooks="dataBooks"
    @custom-event="parentMethod"
  />
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    const setupBooks = reactive([
      {
        title: "setupタイトル1",
        author: "setup著者1",
      },
      {
        title: "setupタイトル2",
        author: "setup著者2",
      },
    ]);

    return {
      setupBooks,
    };
  },
  data() {
    return {
      dataBooks: [
        {
          title: "dataタイトル1",
          author: "data著者1",
        },
        {
          title: "dataタイトル2",
          author: "data著者2",
        },
      ],
    };
  },
  methods: {
    parentMethod(e) {
      console.log(e);
    },
  },
  provide() {
    return {
      userName: "親で設定した値",
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
