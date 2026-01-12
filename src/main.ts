import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";
import { seedDatabase } from "@/db/seed";
import App from "./App.vue";

import "./assets/styles/base.css";

async function bootstrap() {
  await seedDatabase();

  createApp(App).use(createPinia()).use(router).mount("#app");
}

bootstrap();