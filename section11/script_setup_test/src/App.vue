<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <ScriptSetupTest
    title="ここにタイトルが入ります"
    @custom-event="parentMethod"
  />
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import ScriptSetupTest from "./components/ScriptSetupTest.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    ScriptSetupTest,
  },
  methods: {
    parentMethod(e) {
      console.log("Emit実行されました", e);
    },
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
  margin-top: 60px;
}
</style>
