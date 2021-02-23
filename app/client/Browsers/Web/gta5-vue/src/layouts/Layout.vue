<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import Default from "./Default";
export default {
  name: "AppLayout",
  data: () => ({
    layout: Default,
  }),
  watch: {
    $route: {
      immediate: true,
      async handler(route) {
        try {
          const component = await import(`@/layouts/${route.meta.layout}.vue`);
          this.layout = component?.default || Default;
        } catch (e) {
          this.layout = Default;
        }
      },
    },
  },
};
</script>
