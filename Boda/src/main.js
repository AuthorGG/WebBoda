import { createApp } from "vue";
import App from "./App.vue";
import "./styles/base.css";
import "./styles/tokens.css";
import Countdown from "vue3-flip-countdown";
createApp(App).use(Countdown).mount("#app");
