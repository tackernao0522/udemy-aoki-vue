<template>
  <div>
    <p>本の詳細</p>
    <p>タイトル：{{ title }}</p>
    <p>本の内容：{{ content }}</p>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    title: String,
    content: String,
  },
};
</script>

<style>
</style>
