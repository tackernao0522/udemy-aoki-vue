<template>
  <div>CompositionTest</div>
</template>

<script>
export default {
  data() {},
  setup() {
    console.log("setup");
    console.log(this) // undefinedになる
  },
  created() {
    console.log("created");
    console.log(this) // 拾える
  },
  mounted() {
    console.log("mounted");
  },
};
</script>

<style>
</style>
