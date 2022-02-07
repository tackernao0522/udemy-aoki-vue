<template>
  <div>
    CompositionTest
    <p>{{ name }}</p>
    <p>{{ age }}</p>
  </div>
</template>

<script>
export default {
  setup() {
    let name = "大谷";
    const age = 30;
    console.log("setup");
    console.log(this); // undefinedになる
    return {
      name, // keyとvalueが同じであれば一つでOK
      age,
    };
  },
  data() {
    return {
      number: 1,
      sports: "サッカー",
    };
  },
  created() {
    console.log("created");
    console.log(this); // 拾える
  },
  mounted() {
    console.log("mounted");
  },
};
</script>

<style>
</style>
