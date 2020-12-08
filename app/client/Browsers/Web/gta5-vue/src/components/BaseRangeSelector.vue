<template>
  <div
    class="slider-container bg-secondary d-flex justify-content-between align-items-center"
  >
    <span class="text text-center">{{ name }}</span>
    <input
      v-model="value"
      type="range"
      :min="options.min"
      :max="options.max"
      :step="options.step || '1'"
      class="slider"
      @change="onChange"
    />
  </div>
</template>

<script>
export default {
  name: "BaseRangeSlider",
  props: {
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
    indexedReturn: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: function () {
    return {
      value: 0,
    };
  },
  watch: {
    value: function () {
      this.onChange();
    },
  },
  mounted() {
    this.value = this.options.max / 2;
  },
  methods: {
    onChange() {
      let eventObject = {
        type: this.options.type,
        value: this.value,
      };
      if (this.indexedReturn) {
        eventObject = Object.assign({}, eventObject, {
          index: this.options.index,
        });
      }
      this.$emit("option-change", eventObject);
    },
  },
};
</script>

<style lang="scss" scoped>
.slider-container {
  padding: 0 20px;
  height: 50px;
}
.slider {
  -webkit-appearance: none;
  width: 150px;
  height: 2px;
  border-radius: 2px;
  background: #181818;
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider::-webkit-slider-thumb {
  position: relative;
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: url("~@/assets/svg/range_button.svg");
  cursor: pointer;
}

.text {
  font-size: 24px;
  line-height: 14px;
}
</style>
