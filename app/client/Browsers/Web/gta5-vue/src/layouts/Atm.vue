<template>
  <div class="general-wrapper">
    <div class="atm-wrapper">
      <header class="header">
        <img src="@/assets/img/atm/fleeca_logotype.png" alt="" />
      </header>
      <div class="content">
        <slot />
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
import { mapGetters } from "vuex";
import AtmNumpad from "@/components/atm/AtmNumpad.vue";

export default {
  name: "ATM",
  components: {
    AtmNumpad,
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
  width: 700px;
  height: 550px;
  background: #f9f9f9;
  border-radius: 10px;
  box-sizing: border-box;
  margin-right: 20px;
}

.content {
  padding: 30px 120px 35px;
}

.header {
  height: 60px;
  padding: 15px 25px;
  background: #e3e3e3;
}
</style>
