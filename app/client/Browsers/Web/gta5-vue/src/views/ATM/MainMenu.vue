<template>
  <div>
    <atm-breadcrumbs class="breadcrumbs" />
    <div class="buttons d-flex justify-content-between">
      <div class="withdraw-wrapper">
        <router-link
          class="button main-btn icon-btn-wrapper d-flex"
          :to="{ name: 'atm:withdrawal' }"
        >
          <div>
            <span class="withdraw-title">Снять</span>
            <span class="description">До 10 000 $</span>
          </div>
        </router-link>
        <button class="button justify-content-center align-items-center">
          <span class="description">1000</span>
        </button>
        <button class="button justify-content-center align-items-center">
          <span class="description">500</span>
        </button>
      </div>
      <router-link
        class="button outline-btn icon-btn-wrapper icon-btn-wrapper--deposit"
        :to="{ name: 'atm:deposit' }"
      >
        <span>Внести</span>
      </router-link>
      <button class="button outline-btn">
        <span>Все операции</span>
      </button>
    </div>
    <div class="banner">
      <div class="d-flex justify-content-between">
        <div class="text-wrapper">
          <span class="d-block banner-title"
            >Получите скидку в автосалонах Los Santos Customs!</span
          >
          <atm-link
            class="text-center"
            :to="{ name: 'atm:biometric-access-info' }"
            >Подробнее</atm-link
          >
        </div>
        <img
          src="@/assets/img/atm/los_santos_customs_logotype.png"
          alt="Los Santos Customs"
        />
      </div>
    </div>
    <info-footer />
  </div>
</template>

<script>
import AtmBreadcrumbs from "@/components/atm/AtmBreadcrumbs";
import AtmLink from "@/components/atm/AtmLink.vue";
import InfoFooter from "@/components/atm/InfoFooter.vue";

export default {
  name: "MainMenu",
  components: {
    AtmBreadcrumbs,
    AtmLink,
    InfoFooter,
  },
};
</script>

<style lang="scss" scoped>
.breadcrumbs {
  margin-bottom: 39px;
}
.buttons {
  margin-bottom: 35px;
}
.withdraw-wrapper {
  display: grid;
  grid-template-columns: 190px 94px;
  grid-template-rows: 46px 46px;
  grid-gap: 10px;

  .main-btn {
    grid-row-start: 1;
    grid-row-end: span 2;
    text-align: left;
    padding: 10px 15px;

    .withdraw-title {
      display: block;
      margin-bottom: 5px;
      font-size: 24px;
      line-height: 28px;
    }

    .description {
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
    }
  }
}
.button {
  display: flex;
  background: #27903a;
  border-radius: 5px;
  outline: none;
  color: #ffffff;
  border: 0;
  font-size: 18px;
  line-height: 21px;
  font-weight: 600;
  text-decoration: none;

  &.outline-btn {
    background: #ffffff;
    border: 2px solid #27903a;
    color: #27903a;
    width: 133px;
    padding: 10px 15px;
    text-align: left;
  }
}

.icon-btn-wrapper {
  position: relative;

  &::after {
    content: " ";
    position: absolute;
    right: 10px;
    bottom: 10px;
    background: url("~@/assets/svg/atm/withdraw_icon.svg");
    width: 31px;
    height: 31px;
  }

  &--deposit {
    &::after {
      background: url("~@/assets/svg/atm/deposit_icon.svg");
    }
  }
}
.banner {
  margin: 0 -50px 25px;
  padding: 12px 50px 11px;
  background: #ffffff;
  min-height: 137px;

  .text-wrapper {
    padding-top: 30px;
  }

  .banner-title {
    max-width: 300px;
    font-size: 18px;
    line-height: 21px;
    font-weight: 600;
    margin-bottom: 5px;
  }
}
</style>
