<template>
  <div class="wrapper">
    <div class="numpad-buttons">
      <button class="numpad-button" @click="onNumericButtonPress(1)">1</button>
      <button class="numpad-button" @click="onNumericButtonPress(2)">2</button>
      <button class="numpad-button" @click="onNumericButtonPress(3)">3</button>
      <button class="numpad-button action cancel" @click="onCancelButtonPress">
        Cancel
      </button>

      <button class="numpad-button" @click="onNumericButtonPress(4)">4</button>
      <button class="numpad-button" @click="onNumericButtonPress(5)">5</button>
      <button class="numpad-button" @click="onNumericButtonPress(6)">6</button>
      <button class="numpad-button action clear" @click="onClearButtonPress">
        Clear
      </button>

      <button class="numpad-button" @click="onNumericButtonPress(7)">7</button>
      <button class="numpad-button" @click="onNumericButtonPress(8)">8</button>
      <button class="numpad-button" @click="onNumericButtonPress(9)">9</button>
      <button class="numpad-button action enter" @click="onEnterButtonPress">
        Enter
      </button>

      <button class="numpad-button"></button>
      <button class="numpad-button" @click="onNumericButtonPress(0)">0</button>
      <button class="numpad-button"></button>
      <button class="numpad-button action"></button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AtmNumpad",
  computed: {
    ...mapGetters({
      currentNumpadInput: "atm/currentNumpadInput",
    }),
  },
  methods: {
    onNumericButtonPress(number) {
      this.$store.commit("atm/setAdditionalNumberToNumpadInput", number);
    },
    onCancelButtonPress() {
      this.$emit("cancel-button-pressed");
    },
    onClearButtonPress() {
      this.$store.commit("atm/clearNumpadInput");
    },
    onEnterButtonPress() {
      if (this.$route.name === "atm:login") {
        if (!this.$appConfig.isDev) {
          // eslint-disable-next-line
          mp.trigger(
            "callServerEvent",
            "server/basic/ATM/login",
            JSON.stringify({
              pin: this.currentNumpadInput,
            })
          );
        } else {
          this.$router.push({ name: "atm:main-menu" });
        }
      }

      if (this.$route.name === "atm:withdrawal") {
        if (!this.$appConfig.isDev) {
          // eslint-disable-next-line
          mp.trigger(
            "callServerEvent",
            "server/basic/ATM/withdraw",
            JSON.stringify({
              amount: this.currentNumpadInput,
            })
          );
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 275px;
  background: #c4c4c4;
  padding: 10px;
  border-radius: 5px;
}

.numpad-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
}

.numpad-button {
  display: flex;
  justify-content: center;
  width: 50px;
  height: 50px;
  align-items: center;
  background: #fff;
  border-radius: 5px;
  font-size: 24px;
  line-height: 28px;
  border: 0;
  outline: 0;
  transition: all 0.05s ease-in-out;
  pointer-events: all;

  &:hover {
    background: #e2e2e2;
  }

  &:active {
    background: #e2e2e2;
  }

  &.action {
    position: relative;
    width: 75px;
    font-size: 14px;
    line-height: 16px;
    text-transform: uppercase;

    &::before {
      content: "";
      position: absolute;
      width: 55px;
      height: 2px;
      top: 15px;
    }

    &.cancel::before {
      background: #ee2a2a;
    }

    &.clear::before {
      background: #f9ef13;
    }

    &.enter::before {
      background: #7dd160;
    }
  }
}
</style>
