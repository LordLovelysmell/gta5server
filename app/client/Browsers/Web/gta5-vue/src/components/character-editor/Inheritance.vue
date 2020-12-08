<template>
  <div class="selector-wrapper">
    <div class="selector-main-content">
      <img class="parent-image" :src="parentImageSrc" alt="" />
      <base-selector
        class="mb5"
        name="Мать"
        :options="mothers"
        :fix-option-name-width="true"
        @option-change="onOptionChange"
      />
      <base-selector
        name="Отец"
        :options="fathers"
        :fix-option-name-width="true"
        @option-change="onOptionChange"
      />
    </div>
  </div>
</template>

<script>
import parents from "@/assets/data/parents.json";
import BaseSelector from "@/components/BaseSelector.vue";

export default {
  name: "Inheritance",
  components: {
    BaseSelector,
  },
  data() {
    return {
      currentOption: {},
    };
  },
  computed: {
    mothers() {
      return parents.mothers.map((mother) =>
        Object.assign({}, mother, { type: "mother" })
      );
    },
    fathers() {
      return parents.fathers.map((father) =>
        Object.assign({}, father, { type: "father" })
      );
    },
    parentImageSrc() {
      if (
        !this.currentOption ||
        !this.currentOption.father ||
        !this.currentOption.mother
      ) {
        return;
      }
      return `parents_avatars/${this.currentOption.mother.name}-${this.currentOption.father.name}.jpg`;
    },
  },
  mounted() {
    this.currentOption = {
      mother: this.mothers[0],
      father: this.fathers[0],
    };
  },
  methods: {
    onOptionChange(option) {
      this.currentOption[option.type] = option;
      this.$emit(
        "option-change",
        Object.assign({}, option, { type: `${option.type}Id` })
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.mb5 {
  margin-bottom: 5px;
}
.parent-image {
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
