import { createApp } from 'vue';
import OktaVue from '@okta/okta-vue';
import router from './router';
import store from './store';
import App from './App.vue';
// eslint-disable-next-line import/extensions
import { oktaAuth } from './utils/okta';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

createApp(App)
  .use(store)
  .use(router)
  .use(OktaVue, {
    oktaAuth,
    onAuthRequired: () => {
      router.push('/login');
    },
    onAuthResume: () => {
      router.push('/login');
    },
  })
  .mount('#app');
