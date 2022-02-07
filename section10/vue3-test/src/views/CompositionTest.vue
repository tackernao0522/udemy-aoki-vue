<template>
  <div>
    CompositionTest
    <p>{{ name }}</p>
    <p>{{ age }}</p>
    <p>ref: {{ nameRef }}</p>
    <p>reactive: {{ book.title }}</p>
    <p>reactive: {{ book.author[0] }}</p>
  </div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    let name = "大谷";
    const age = 30;
    const nameRef = ref("錦織");

    const book = reactive({
      title: "タイトル",
      author: ["大谷", "伊藤"],
    });

    console.log("setup");
    console.log(this); // undefinedになる
    console.log(nameRef);
    console.log(nameRef.value);
    return {
      name, // keyとvalueが同じであれば一つでOK
      age,
      nameRef,
      book,
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
