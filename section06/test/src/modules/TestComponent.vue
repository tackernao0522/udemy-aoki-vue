<template>
  <div class="red-b">
    テストです
    {{ testData }}
  </div>
</template>

<script>
export default {
  name: "TestComponents",
  data() {
    return {
      testData: "テストdataです",
    };
  },
};
</script>

<style scoped>
.red-b {
  border: 1px red solid;
}
</style>
