<template>
  <div class="relative">
    <button @click="modalOpen = true">モーダル</button>
    <teleport to="body">
      <div v-if="modalOpen" class="modal">
        <div>
          <p>モーダルウィンドウ</p>
          <button @click="modalOpen = false">閉じる</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalOpen: false,
    }
  }
};
</script>

<style scoped>
.relative {
  position: relative;
}

.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 300px;
  padding: 5px;
}
</style>
