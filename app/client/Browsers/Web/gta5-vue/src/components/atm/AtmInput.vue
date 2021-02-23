<template>
  <div class="atm-input">
    <div
      class="pincode-wrapper d-flex align-items-center justify-content-center"
      v-if="isPinCode"
    >
      <span
        v-for="(symbol, index) in text.length"
        :key="index"
        class="circle"
      />
    </div>
    <div
      v-else
      class="text-wrapper d-flex justify-content-center align-items-center"
    >
      <span class="text">{{ textWithSpaces }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AtmInput",
  props: {
    text: {
      type: String,
      required: true,
    },
    isPinCode: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    textWithSpaces() {
      return this.text.replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
    },
  },
};
</script>

<style lang="scss" scoped>
$green: #27903a;

.atm-input {
  width: 300px;
  height: 66px;
  border: 2px solid $green;
  border-radius: 10px;
}

.pincode-wrapper {
  height: 100%;
}

.circle {
  display: block;
  width: 18px;
  height: 18px;
  background: $green;
  margin-right: 20px;
  border-radius: 50%;

  &:last-child {
    margin-right: 0;
  }
}
.text-wrapper {
  height: 100%;

  .text {
    font-size: 24px;
    line-height: 28px;
  }
}
</style>
