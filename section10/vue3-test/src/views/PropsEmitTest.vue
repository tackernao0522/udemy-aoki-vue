<template>
  <div>PropsEmitTest</div>
  <div>{{ setupBooks }}</div>
  <ul>
    <li v-for="book in setupBooks" :key="book">
      {{ book.title }}
    </li>
  </ul>
  <div>{{ dataBooks }}</div>
  <button @click="emitTest">emitテスト</button>
</template>

<script>
export default {
  props: {
    setupBooks: Array,
    dataBooks: Array,
  },
  setup(props, { emit }) {
    console.log(props.setupBooks);
    console.log(props.setupBooks[0].title);
    console.log(props.dataBooks);

    const emitTest = () => {
      emit("custom-event", "子の値");
    };

    return {
      emitTest,
    };
  },
};
</script>

<style>
</style>
