import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import router from "./router";

import TweetBody from "./components/TweetBody.vue";
import Tweet from "./components/Tweet.vue";
import TweetColumn from "./components/TweetColumn.vue";

import EditColumn from "./components/EditColumn.vue";
import EditLayout from "./components/EditLayout.vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCogs,
  faReply,
  faRetweet,
  faSync,
  faArrowLeft,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCogs, faReply, faRetweet, faSync, faArrowLeft, faArrowRight);

Vue.component("fa-icon", FontAwesomeIcon);
Vue.component("edit-column", EditColumn);
Vue.component("edit-layout", EditLayout);
Vue.component("tweet-body", TweetBody);
Vue.component("tweet", Tweet);
Vue.component("tweet-column", TweetColumn);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
