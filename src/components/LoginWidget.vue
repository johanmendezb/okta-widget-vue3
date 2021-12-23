<script setup lang="ts">
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { onMounted, onUnmounted } from 'vue';
import { ref } from '@vue/reactivity';
import { Tokens } from '@okta/okta-auth-js';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { oktaAuth, signInWidget, signInWidgetConfig } from '../utils/okta';

const widget = ref<HTMLElement | null >(null);
const store = useStore();
const router = useRouter();

const widgetSuccessCallback = async (token:Tokens) => {
  console.log('success: ', token);
  store.commit('login');
  oktaAuth.handleLoginRedirect(token);
  await router.push('/dashboard');
};

const widgetErrorCallback = (error:string) => {
  console.warn('Widget callback error: ', error);
};

onMounted(() => {
  try {
    // Render Widget and assign callback events.
    signInWidget.showSignInToGetTokens({
      el: widget.value,
      scopes: signInWidgetConfig.oidc.scopes,
    })
      .then(widgetSuccessCallback)
      .catch(widgetErrorCallback);

    // Listen to any event related to the widget
    signInWidget.on('afterRender', (context: { controller: string }) => {
      console.log('Widget view context: ', context);

      const titleElement = widget?.value?.getElementsByClassName('okta-form-title');
      const p = document.createElement('p');
      p.classList.add('text-center', 'py-2');

      // Add custom elements in widget
      if (context?.controller === 'registration') {
        p.innerText = 'Copy here about Registering in to your Advance America account';
        titleElement![0].after(p);

        return;
      }

      if (context?.controller === 'primary-auth') {
        p.innerText = 'Copy here about Login in to your Advance America account';
        titleElement![0].after(p);
      }
    });
  } catch (error) {
    console.warn('General catch Error', error);
  }
});

onUnmounted(() => {
  signInWidget.off();
  signInWidget.remove();
});

</script>

<style lang="scss">
  #okta-sign-in.auth-container {
    border: none;
    text-align: left;

    .okta-sign-in-header {
      border-bottom-color: transparent;
    }

    .okta-form-title {
      font-size: 24px;
      font-weight: 700;
    }

    .button {
      border-radius: 8px;
      background: #757679;
      border: none;
      font-weight: bold;
    }

    .registration-link {
      color: #072238;
      text-decoration: underline;
    }
  }
</style>

<template>
  <div class="okta-widget">
    <div ref="widget" aria-live="assertive"></div>
  </div>
</template>
