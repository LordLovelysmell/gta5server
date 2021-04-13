<template>
  <div class="dialogue-wrapper position-absolute">
    <div class="dialogue-box">
      {{ dialogues.dialogue_1.text }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dialogues",
  computed: {
    ...mapGetters({
      dialogues: "dialogue/dialogues",
    }),
  },
};
</script>

<style lang="scss" scoped>
.dialogue-wrapper {
  left: 50%;
  bottom: 150px;
  transform: translateX(-50%);
}
.dialogue-box {
  max-width: 377px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 15px;
  padding: 20px;
}
</style>
