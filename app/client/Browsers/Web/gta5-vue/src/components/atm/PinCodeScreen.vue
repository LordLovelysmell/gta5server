<template>
  <div>
    <p class="headline text-center">Пожалуйста, введите пин-код</p>
    <atm-input class="atm-input" :text="currentInput" :isPinCode="true" />
    <p class="extra-info text-center">
      Вы также можете оформить биометрический доступ в отделении нашего банка
    </p>
    <div class="link-wrapper d-flex justify-content-center">
      <atm-link
        class="text-center"
        @click="$emit('link-click', 'BiometricAccessInfo')"
        >Подробнее</atm-link
      >
    </div>
    <p class="cancel-info text-center">
      Для отказа от операции нажмите кнопку ОТМЕНА / CANCEL на клавиатуре
      устройства
    </p>
  </div>
</template>

<script>
import AtmInput from "@/components/atm/AtmInput.vue";
import AtmLink from "@/components/atm/AtmLink.vue";

export default {
  name: "PinCodeScreen",
  components: {
    AtmInput,
    AtmLink,
  },
  props: {
    currentInput: {
      type: String,
      required: true,
    },
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
  margin-bottom: 15px;
  line-height: 16px;
}

.link-wrapper {
  margin-bottom: 125px;
}

.cancel-info {
  color: #9e9e9e;
  font-size: 18px;
  width: 300px;
  margin: 0 auto;
  line-height: 21px;
}
</style>
