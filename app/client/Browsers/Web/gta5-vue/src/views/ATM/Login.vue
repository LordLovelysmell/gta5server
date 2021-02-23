<template>
  <div>
    <p class="headline text-center">Пожалуйста, введите пин-код</p>
    <atm-input class="atm-input" :text="pinCode" :isPinCode="true" />
    <p class="extra-info text-center">
      Вы также можете оформить биометрический доступ в отделении нашего банка
    </p>
    <div class="link-wrapper d-flex justify-content-center">
      <atm-link class="text-center" :to="{ name: 'atm:biometric-access-info' }">
        Подробнее
      </atm-link>
    </div>
    <info-footer />
  </div>
</template>

<script>
import AtmInput from "@/components/atm/AtmInput.vue";
import AtmLink from "@/components/atm/AtmLink.vue";
import InfoFooter from "@/components/atm/InfoFooter.vue";
import { mapGetters } from "vuex";

export default {
  name: "PinCodeScreen",
  computed: {
    ...mapGetters({
      currentNumpadInput: "atm/currentNumpadInput",
    }),
    pinCode() {
      return this.currentNumpadInput.slice(0, 4);
    },
  },
  components: {
    AtmInput,
    AtmLink,
    InfoFooter,
  },
};
</script>

<style lang="scss" scoped>
.input {
  border: 0;
  padding: 15px 20px;
  width: 400px;
  border-radius: 10px;
  background-color: #f3f3f3;
  outline: none;
  margin-bottom: 90px;

  &::placeholder {
    color: #bdbdbd;
  }
}

.headline {
  font-size: 24px;
  margin-bottom: 35px;
  line-height: 28px;
}

.atm-input {
  margin: 0 auto 45px;
}

.extra-info {
  font-size: 14px;
  line-height: 16px;
  max-width: 460px;
  margin: 0 auto 15px;
}

.link-wrapper {
  margin-bottom: 125px;
}
</style>
