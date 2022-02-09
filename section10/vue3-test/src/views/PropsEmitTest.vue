<template>
  <div>PropsEmitTest</div>
  <div>{{ setupBooks }}</div>
  <ul>
    <li v-for="book in setupBooks" :key="book">
      {{ book.title }}
    </li>
  </ul>
  <div>{{ dataBooks }}</div>
</template>

<script>
export default {
  props: {
    setupBooks: Array,
    dataBooks: Array,
  },
  setup(props) {
    console.log(props.setupBooks)
    console.log(props.setupBooks[0].title)
    console.log(props.dataBooks)
  }
};
</script>

<style>
</style>
