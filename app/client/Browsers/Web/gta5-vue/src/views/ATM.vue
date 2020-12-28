<template>
  <div class="atm-wrapper">
    <div class="close-icon" @click="close" />
    <div class="content">
      <p class="balance">Текущий баланс: {{ atmData.balance }} $</p>
      <input
        class="input"
        v-model="sum"
        type="text"
        placeholder="Введите сумму"
      />
      <div class="buttons-wrapper">
        <p class="atm-button atm-button--green pointer" @click="topUp">
          Пополнить
        </p>
        <p class="atm-button atm-button--gray">Снять</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";

export default {
  name: "ATM",
  data: () => {
    return {
      sum: "",
    };
  },
  computed: {
    ...mapGetters({
      atmData: "atm/getATMData",
    }),
  },
  methods: {
    topUp() {
      if (!this.sum.length) return;

      // eslint-disable-next-line
      mp.trigger("callServerEvent", "sATM-topUp", this.sum);
    },
    close() {
      this.$router.push({ name: "main" });

      // eslint-disable-next-line
      mp.trigger("hideCursor");
    },
  },
};
</script>

<style lang="scss" scoped>
.atm-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  min-height: 350px;
  background: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 90px 100px 40px;
}
.close-icon {
  position: absolute;
  width: 44px;
  height: 44px;
  right: 15px;
  top: 15px;
  background: url("~@/assets/svg/atm/log-out.svg");
}
.balance {
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
}
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

.buttons-wrapper {
  display: flex;
}

.atm-button {
  width: 50%;
  text-align: center;
  padding: 15px;
  margin-bottom: 0;

  &--green {
    background-color: #85a62e;
    color: #fff;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  &--gray {
    background-color: #f3f3f3;
    color: #181818;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}
</style>
