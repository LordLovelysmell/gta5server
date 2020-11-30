<template>
  <div class="main-modal-wrapper">
    <div class="main-modal">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
};
</script>

<style lang="scss" scoped>
// @import "@/assets/scss/vendor/bootstrap/_variables.scss";

.main-modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.main-modal {
  width: 600px;
  border-radius: 10px;
  padding: 60px 80px 40px;
  // background: #3a182e;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
}
</style>
