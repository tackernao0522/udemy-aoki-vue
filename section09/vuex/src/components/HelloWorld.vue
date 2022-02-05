<template>
  <div>
    <!-- <button @click="increment">+</button> -->
    <button @click="incrementAction">+</button>
    <button @click="addCount">+10</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    // increment() {
    //   this.$store.commit("increment"); // mutationsの中のincrementメソッドを呼び出す
    // },
    // addCountAction() {
    //   this.$store.dispatch('addCountAction')
    // },
    ...mapActions(["incrementAction", "addCountAction"]),
    // increment() {
    //   this.$store.dispatch("incrementAction");
    // },
    // addCount() {
    //   this.$store.dispatch("addCountAction", {
    //     value: 10,
    //   });
    // },
    addCount() {
      this.addCountAction({
        value: 10,
      });
    },
  },
};
</script>
