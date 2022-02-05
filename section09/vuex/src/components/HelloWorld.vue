<template>
  <div>
    <button @click="increment">+</button>
    <button @click="addCount">+10</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    increment() {
      this.$store.commit("increment"); // mutationsの中のincrementメソッドを呼び出す
    },
    addCount() {
      this.$store.commit("addCount", {
        value: 10,
      }); // mutationsの中のaddCountメソッドを呼び出す
    },
  },
};
</script>
