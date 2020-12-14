<template>
  <div
    class="selector-wrapper bg-secondary d-flex justify-content-between align-items-center"
  >
    <span class="text" :class="{ 'fix-width': fixOptionNameWidth }">{{
      name
    }}</span>
    <div class="d-flex">
      <div class="arrow d-flex align-items-center" @click="choosePrevOption">
        <svg
          width="10"
          height="17"
          viewBox="0 0 10 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.210982 8.96648L8.77524 16.8077C9.05583 17.0645 9.51013 17.0641 9.79026 16.8064C10.0702 16.5488 10.0694 16.1314 9.78881 15.8745L1.73433 8.49994L9.7891 1.12542C10.0697 0.868431 10.0704 0.451368 9.79055 0.193714C9.65012 0.0645542 9.46615 -2.67029e-05 9.28219 -2.67029e-05C9.09869 -2.67029e-05 8.91544 0.0641212 8.77527 0.192385L0.210982 8.03344C0.0758371 8.15689 0 8.32489 0 8.49994C0 8.67499 0.0760546 8.84279 0.210982 8.96648Z"
            fill="#181818"
          />
        </svg>
      </div>
      <span
        class="text text-center"
        :class="{ 'fix-width': fixOptionNameWidth }"
        >{{ currentOption.name || currentOption }}</span
      >
      <div class="arrow d-flex align-items-center" @click="chooseNextOption">
        <svg
          width="10"
          height="17"
          viewBox="0 0 10 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.78902 8.03349L1.22476 0.192242C0.944166 -0.064517 0.489872 -0.0640854 0.209744 0.19357C-0.0701666 0.451192 -0.0694433 0.86852 0.211191 1.12548L8.26567 8.50003L0.210901 15.8745C-0.0696966 16.1315 -0.0704199 16.5486 0.209455 16.8063C0.34988 16.9354 0.533847 17 0.717815 17C0.901312 17 1.08456 16.9358 1.22473 16.8076L9.78902 8.96653C9.92416 8.84308 10 8.67508 10 8.50003C10 8.32498 9.92395 8.15718 9.78902 8.03349Z"
            fill="#181818"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseSelector",
  data: function () {
    return {
      currentOption: {},
      currentOptionIndex: 0,
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    fixOptionNameWidth: {
      type: Boolean,
      required: false,
      default: false,
    },
    id: {
      type: Number,
      required: false,
      default: -1,
    },
  },
  mounted() {
    this.currentOption = this.options[this.currentOptionIndex];
  },
  methods: {
    choosePrevOption() {
      if (this.currentOptionIndex === 0) {
        this.currentOptionIndex = this.options.length - 1;
      } else {
        this.currentOptionIndex--;
      }
      this.currentOption = this.options[this.currentOptionIndex];

      const currentOption = this.processCurrentOption();

      this.$emit("option-change", currentOption);
    },
    chooseNextOption() {
      if (this.currentOptionIndex === this.options.length - 1) {
        this.currentOptionIndex = 0;
      } else {
        this.currentOptionIndex++;
      }
      this.currentOption = this.options[this.currentOptionIndex];

      const currentOption = this.processCurrentOption();

      this.$emit("option-change", currentOption);
    },
    processCurrentOption() {
      if (this.id === -1) {
        return this.currentOption;
      }
      debugger;
      return {
        id: this.id,
        chosenOption: this.currentOption,
        type: this.currentOption.type || "selector",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.selector-wrapper {
  padding: 0 5px 0 20px;
  height: 55px;
}
.text {
  font-size: 24px;
  line-height: 45px;
}
.fix-width {
  width: 120px;
}
.arrow {
  cursor: pointer;
  padding: 15px;
}
</style>
