<template>
  <span class="link">
    <slot />
  </span>
</template>

<script>
export default {
  name: "AtmLink",
};
</script>

<style lang="scss" scoped>
.link {
  color: #27903a;
  text-decoration: underline;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;

  &:active {
    color: #5db36c;
  }
}
</style>
