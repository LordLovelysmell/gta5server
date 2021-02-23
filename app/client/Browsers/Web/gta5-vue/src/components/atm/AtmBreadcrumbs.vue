<template>
  <div>
    <router-link
      v-for="(link, index) in breadcrumbs"
      :key="index"
      :to="link.to"
    >
      {{ link.name }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "AtmBreadcrumbs",
  computed: {
    breadcrumbs() {
      return this.$route.meta.breadcrumbs;
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  font-size: 18px;
  line-height: 21px;
  color: #000;
  text-decoration: none;

  &:not(.router-link-active) {
    &::after {
      content: " > ";
    }
  }
}
.router-link-active {
  color: #9e9e9e;
  &:hover {
    text-decoration: none;
  }
}
</style>
