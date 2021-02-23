<template>
  <div>
    <atm-breadcrumbs class="breadcrumbs" />
    <atm-input class="atm-input" :text="amount" />
    <div v-if="$route.name === 'atm:withdrawal'" class="comission-wrapper">
      <div class="d-flex justify-content-between align-items-end">
        <span class="d-block">Комиссия</span>
        <span class="d-block">{{ comissionAmount }} $</span>
      </div>
    </div>
    <info-footer class="info-footer" />
  </div>
</template>

<script>
import AtmBreadcrumbs from "@/components/atm/AtmBreadcrumbs";
import AtmInput from "@/components/atm/AtmInput.vue";
import InfoFooter from "@/components/atm/InfoFooter.vue";
import { mapGetters } from "vuex";

export default {
  name: "DepositWithdrawal",
  components: {
    AtmBreadcrumbs,
    AtmInput,
    InfoFooter,
  },
  computed: {
    ...mapGetters({
      currentNumpadInput: "atm/currentNumpadInput",
    }),
    amount() {
      if (Number(this.currentNumpadInput) > 10000) {
        this.$store.commit("atm/setFinalNumberToNumpadInput", "10000");
      }
      return this.currentNumpadInput;
    },
    comissionAmount() {
      return (Number(this.amount) * 0.005).toFixed(2);
    },
  },
  beforeMount() {
    this.$store.commit("atm/clearNumpadInput");
  },
};
</script>

<style lang="scss" scoped>
.breadcrumbs {
  margin-bottom: 75px;
}
.atm-input {
  margin: 0 auto 20px;
}
.comission-wrapper {
  position: relative;
  width: 300px;
  margin: 0 auto;
  background: #f9f9f9;

  &:after {
    content: " ";
    position: absolute;
    bottom: 8px;
    left: 0;
    background: url("~@/assets/svg/atm/comission_line.svg") repeat-x;
    width: 100%;
    height: 2px;
    z-index: 1;
  }

  span {
    position: relative;
    color: #9e9e9e;
    font-size: 14px;
    line-height: 16px;
    background: #f9f9f9;
    z-index: 2;
    padding: 5px;
  }
}
.info-footer {
  position: absolute;
  bottom: 35px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
