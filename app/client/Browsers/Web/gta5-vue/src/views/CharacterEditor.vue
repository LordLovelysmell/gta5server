<template>
  <div class="character-editor position-absolute">
    <div class="wrapper position-relative overflow-hidden rounded bg-white">
      <div class="header-wrapper bg-primary">
        <div
          class="header-top d-flex align-items-center justify-content-center"
        >
          <span class="headline text-white font-weight-bold"
            >Редактор персонажа</span
          >
        </div>
        <div class="subtitle-wrapper d-flex align-items-center bg-white">
          <span class="subtitle text-primary">{{
            stepNames[currentStep]
          }}</span>
        </div>
      </div>
      <div class="main-wrapper mb15">
        <div class="step-wrapper" v-show="currentStep === 0">
          <base-selector
            class="mb5"
            name="Пол"
            :options="genderOptions"
            :fix-option-name-width="true"
            @option-change="onOptionChange"
          />
          <div
            class="subtitle-wrapper subtitle-wrapper--inner d-flex align-items-center bg-white"
          >
            <span class="subtitle text-primary">Наследственность</span>
          </div>
          <inheritance class="mb5" @option-change="onOptionChange" />
          <base-range-selector
            class="mb5"
            name="Сходство"
            :options="{ min: 1, max: 100, type: 'shapeMix' }"
            @option-change="onOptionChange"
          />
          <base-range-selector
            name="Тон кожи"
            :options="{ min: 1, max: 100, type: 'skinMix' }"
            @option-change="onOptionChange"
          />
        </div>
        <div class="step-wrapper" v-show="currentStep === 1">
          <div
            v-for="(feature, index) in faceFeaturesList"
            :key="index"
            class="mb15"
          >
            <div
              class="subtitle-wrapper subtitle-wrapper--inner d-flex align-items-center bg-white mb5"
            >
              <span class="subtitle text-primary">{{ feature.blockName }}</span>
            </div>
            <base-range-selector
              v-for="blockSelector in feature.blockSelectors"
              :key="blockSelector.index"
              class="mb5"
              :name="blockSelector.name"
              :options="{
                min: '-1',
                max: '1',
                step: '0.05',
                type: 'faceFeature',
                index: blockSelector.index,
              }"
              :indexed-return="true"
              @option-change="onOptionChange"
            />
          </div>
        </div>
      </div>
      <div class="px35 d-flex align-items-center justify-content-between">
        <span
          class="back"
          :class="
            currentStep === 0 ? 'text-secondary' : 'text-tertiary pointer'
          "
          @click="goToPrevStep"
          >Назад</span
        >
        <base-button :is-disabled="currentStep >= 1" @click="gotToNextStep"
          >Далее</base-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import BaseSelector from "@/components/BaseSelector.vue";
import BaseRangeSelector from "@/components/BaseRangeSelector.vue";
import BaseButton from "@/components/BaseButton.vue";
import Inheritance from "@/components/character-editor/Inheritance.vue";
import faceFeaturesList from "@/assets/data/faceFeatures.json";

export default {
  name: "CharacterEditor",
  components: {
    BaseSelector,
    BaseRangeSelector,
    BaseButton,
    Inheritance,
  },
  data: function () {
    return {
      stepNames: ["Общее", "Лицо"],
      currentStep: 0,
      character: {
        gender: 0,
        fatherId: 0,
        motherId: 21,
        skinMix: 0.5,
        shapeMix: 0.5,
        faceFeatures: [],
      },
      genderOptions: [
        {
          id: 0,
          type: "gender",
          name: "Мужской",
        },
        {
          id: 1,
          type: "gender",
          name: "Женский",
        },
      ],
    };
  },
  computed: {
    faceFeaturesList() {
      return faceFeaturesList;
    },
  },
  mounted() {
    if (!this.$appConfig.isDev) {
      // eslint-disable-next-line
      // TODO: Client кидает ошибку при вызове триггера здесь
      // mp.trigger("cCharacterEditor-updateCharacter", this.character);
    }
  },
  methods: {
    onOptionChange(option) {
      if (option.type === "faceFeature") {
        // Надо переписать
        this.character.faceFeatures[option.index] = option.value;
      } else {
        this.character = Object.assign({}, this.character, {
          [option.type]:
            typeof option.id === "undefined" ? option.value : option.id,
        });
      }
      if (!this.$appConfig.isDev) {
        // eslint-disable-next-line
        mp.trigger(
          "cCharacterEditor-updateCharacter",
          JSON.stringify(this.character)
        );
      }
    },
    goToPrevStep() {
      if (this.currentStep === 0) {
        return;
      }
      this.currentStep--;
    },
    gotToNextStep() {
      if (this.currentStep === this.stepNames.length - 1) {
        return;
      }
      this.currentStep++;
    },
  },
};
</script>

<style lang="scss" scoped>
.character-editor {
  width: 430px;
  height: 725px;

  .wrapper {
    padding-bottom: 20px;
  }

  .step-wrapper {
    max-height: 560px;
    overflow: auto;
  }

  .header-wrapper {
    margin-bottom: 5px;

    .header-top {
      height: 59px;

      .headline {
        font-size: 32px;
        line-height: 37.5px;
      }
    }
  }
  .subtitle-wrapper {
    height: 40px;

    .subtitle {
      padding-left: 35px;
      font-size: 24px;
      line-height: 28px;
    }

    &--inner {
      .subtitle {
        padding-left: 20px;
      }
    }
  }
  .main-wrapper {
    padding: 0 15px;
  }
  .mb5 {
    margin-bottom: 5px;
  }
  .mb15 {
    margin-bottom: 15px;
  }
  .px35 {
    padding: 0 35px;
  }
  .pointer {
    cursor: pointer;
  }
  .back {
    font-size: 24px;
  }
}
</style>
