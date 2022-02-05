<template>
  <div>
    <button @click="addCount">+</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    addCount() {
      this.$store.commit('increment') // mutationsの中のincrementメソッドを呼び出す
    }
  }
};
</script>
