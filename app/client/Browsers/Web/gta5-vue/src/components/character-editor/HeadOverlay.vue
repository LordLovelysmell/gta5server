<template>
  <div>
    <div v-for="(overlay, index) in overlays" :key="index" class="mb15">
      <base-selector
        class="mb5"
        :name="overlay.name"
        :options="overlay.options"
        :id="index"
        @option-change="onOptionChange"
      />
      <base-range-selector
        v-if="overlay.requireOpacityRangeSlider"
        name="Заметность"
        :options="{
          min: '0',
          max: '1',
          step: '0.05',
          type: 'opacity',
          index,
        }"
        :indexed-return="true"
        @option-change="onOptionChange"
      />
    </div>
  </div>
</template>
<script>
import BaseSelector from "@/components/BaseSelector.vue";
import BaseRangeSelector from "@/components/BaseRangeSelector.vue";

export default {
  name: "HeadOverlay",
  components: {
    BaseSelector,
    BaseRangeSelector,
  },
  data() {
    return {
      headOverlayData: [],
      overlays: [
        {
          name: "Недостатки",
          options: Array(24)
            .fill(null)
            .map((u, i) => i),
          requireOpacityRangeSlider: true,
        },
        {
          name: "Волосы на лице",
          options: Array(29)
            .fill(null)
            .map((u, i) => i),
          requireOpacityRangeSlider: false,
        },
        {
          name: "Брови",
          options: Array(34)
            .fill(null)
            .map((u, i) => i),
          requireOpacityRangeSlider: false,
        },
        {
          name: "Старение",
          options: Array(15)
            .fill(null)
            .map((u, i) => i),
          requireOpacityRangeSlider: true,
        },
        {
          name: "Макияж",
          options: Array(75)
            .fill(null)
            .map((u, i) => i),
          requireOpacityRangeSlider: false,
        },
        {
          name: "Румянец",
          options: Array(33)
            .fill(null)
            .map((u, i) => i),
          requireOpacityRangeSlider: false,
        },
        {
          name: "Цвет лица",
          options: Array(12)
            .fill(null)
            .map((u, i) => i),
          requireOpacityRangeSlider: false,
        },
        {
          name: "Солнечные ожоги",
          options: Array(11)
            .fill(null)
            .map((u, i) => i),
          requireOpacityRangeSlider: false,
        },
        {
          name: "Помада",
          options: Array(10)
            .fill(null)
            .map((u, i) => i),
          requireOpacityRangeSlider: false,
        },
        {
          name: "Родинки и веснушки",
          options: Array(18)
            .fill(null)
            .map((u, i) => i),
          requireOpacityRangeSlider: false,
        },
        {
          name: "Волосы на груди",
          options: Array(17)
            .fill(null)
            .map((u, i) => i),
          requireOpacityRangeSlider: false,
        },
        {
          name: "Пятна на теле",
          options: Array(12)
            .fill(null)
            .map((u, i) => i),
          requireOpacityRangeSlider: false,
        },
        {
          name: "Добавить пятна на теле",
          options: Array(2)
            .fill(null)
            .map((u, i) => i),
          requireOpacityRangeSlider: false,
        },
      ],
    };
  },
  mounted() {
    this.headOverlayData = Array(13)
      .fill(null)
      .map((u, i) => {
        return {
          overlayId: i,
          index: 0,
        };
      });
  },
  methods: {
    onOptionChange(option) {
      if (option.type === "selector") {
        this.headOverlayData[option.id] = Object.assign(
          {},
          this.headOverlayData[option.id],
          {
            overlayId: option.id,
            index: option.chosenOption,
          }
        );
      }
      if (option.type === "opacity") {
        this.headOverlayData[option.index] = Object.assign(
          {},
          this.headOverlayData[option.index],
          {
            opacity: option.value,
          }
        );
      }

      this.$emit("head-overlay-data-set", {
        data: this.headOverlayData,
        type: "headOverlayData",
      });
    },
  },
};
</script>
