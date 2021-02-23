<template>
  <div id="app">
    <layout>
      <router-view />
    </layout>
  </div>
</template>

<style lang="scss" scoped>
.route-enter-from,
.route-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>

<style lang="scss">
@import "@/assets/scss/vendor/bootstrap/bootstrap.scss";
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

/* width */
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #d8d8d8;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ffb5cc;
  border-radius: 2px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #df7495;
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
</style> 
