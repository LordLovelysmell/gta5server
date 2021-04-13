<template>
  <div class="main position-relative">
    <div class="logo position-absolute">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Main",
};
</script>

<style lang="scss" scoped>
.main {
  padding: 20px;
  height: 100vh;
}
.logo {
  top: 15px;
  right: 30px;
  max-width: 100px;
  pointer-events: none;

  img {
    width: 100%;
    height: auto;
  }
}
</style>
