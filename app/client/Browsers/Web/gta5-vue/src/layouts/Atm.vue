<template>
  <div class="general-wrapper">
    <div class="atm-wrapper">
      <header class="header">
        <img src="@/assets/img/atm/fleeca_logotype.png" alt="" />
      </header>
      <div class="content">
        <router-view />
      </div>
    </div>
    <atm-numpad
      class="numpad"
      @button-pressed="onNumericNumpadButtonPress"
      @clear-button-pressed="onClearNumpadButtonPress"
      @cancel-button-pressed="close"
      @enter-button-pressed="onEnterButtonPress"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import AtmNumpad from "@/components/atm/AtmNumpad.vue";

export default {
  name: "Atm",
  components: {
    AtmNumpad,
  },
  methods: {
    close() {
      this.$router.push({ name: "main" });

      if (!this.$appConfig.isDev) {
        // eslint-disable-next-line
        mp.trigger("hideCursor");
      }
    },
    onNumericNumpadButtonPress(number) {
      this.currentInput = `${this.currentInput}${number}`;
      if (this.currentComponent === "PinCodeScreen") {
        this.currentInput = this.currentInput.slice(0, 4);
      }
    },
    onClearNumpadButtonPress() {
      this.currentInput = "";
    },
    onLinkClick(component) {
      this.currentComponent = component;
    },
    onEnterButtonPress() {
      if (
        this.currentComponent === "PinCodeScreen" &&
        this.currentInput.length < 4
      ) {
        return false;
      }
      if (!this.$appConfig.isDev) {
        // eslint-disable-next-line
        mp.trigger(
          "callServerEvent",
          "sATM-topUp",
          JSON.stringify({
            currentInput: this.currentInput,
            currentComponent: this.currentComponent,
          })
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.general-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: flex-end;
}

.atm-wrapper {
  position: relative;
  width: 700px;
  height: 550px;
  background: #f9f9f9;
  border-radius: 10px;
  box-sizing: border-box;
  margin-right: 20px;
}

.content {
  padding: 30px 50px 35px;
}

.header {
  height: 60px;
  padding: 15px 25px;
  background: #e3e3e3;
}
</style>
