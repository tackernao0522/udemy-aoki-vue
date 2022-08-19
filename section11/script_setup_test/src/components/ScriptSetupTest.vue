<script setup>
import { ref } from "vue";

const props = defineProps({
  title: String,
});

const count = ref(0);

const increment = () => {
  count.value++;
};

const decrement = () => {
  count.value--;
};
</script>

<template>
  <span>{{ props.title }}</span>
  <h1>{{ count }}</h1>
  <button @click="increment">Increment</button>
  <button @click="decrement">Decrement</button>
</template>
