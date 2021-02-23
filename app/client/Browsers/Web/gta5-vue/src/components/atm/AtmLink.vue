<template>
  <router-link class="link" :to="to">
    <slot />
  </router-link>
</template>

<script>
export default {
  name: "AtmLink",
  props: {
    to: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  color: #27903a;
  text-decoration: underline;
  font-size: 14px;
  line-height: 16px;

  &:active {
    color: #5db36c;
  }
}
</style>
