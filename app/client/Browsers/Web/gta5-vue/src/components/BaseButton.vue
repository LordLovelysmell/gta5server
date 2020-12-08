<template>
  <div>
    <span
      class="btn btn-main d-flex align-items-center justify-content-center"
      :class="{ disabled: isDisabled }"
    >
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    isDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-main {
  background: #df7495;
  color: #fff;
  font-size: 24px;
  width: 175px;
  height: 45px;
  line-height: 45px;

  &.disabled {
    pointer-events: none;
  }
}
</style>
