// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import router from "./router";

import App from "./App.vue";
import store from "./store/index";

new Vue({
  el: "#app",
  router,
  store: store,
  template: "<App/>",
  components: { App },
});
