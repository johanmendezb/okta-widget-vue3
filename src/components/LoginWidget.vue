<script setup lang="ts">
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { onMounted, onUnmounted } from 'vue';
import { ref } from '@vue/reactivity';
import { Tokens } from '@okta/okta-auth-js';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import OktaSignIn from '@okta/okta-signin-widget';
import oktaAuth from '../utils/okta';

const widget = ref<HTMLElement | null >(null);
const signInWidget = ref<any | null>(null);
const store = useStore();
const router = useRouter();

const CLIENT_ID = '0oa3du6gwnuCLHEqW5d7';
const ISSUER = 'https://dev-22944439.okta.com/oauth2/default';

const BASENAME = process.env.NODE_ENV === 'production' ? '/custom-login' : '';
const REDIRECT_URI = `${window.location.origin}${BASENAME}/login/callback`;

const signInWidgetConfig = {
  // Docs: https://github.com/okta/okta-signin-widget#okta-sign-in-widget
  logo: 'https://i.ibb.co/bQm76kM/logo.png',
  language: 'en',
  i18n: {
    en: {
      'primaryauth.title': 'Log In',
      'primaryauth.submit': 'LOGIN',
      'primaryauth.username.placeholder': 'EMAIL ADDRESS',
      'primaryauth.password.placeholder': 'PASSWORD',
      needhelp: 'need help',
      'registration.signup.label': 'New customer?',
      'registration.signup.text': 'Create an account',
      // https://github.com/okta/okta-signin-widget/blob/master/packages/%40okta/i18n/src/properties/login.properties
    },
  },
  // Changes to widget functionality
  features: {
    // Enable self-service registration flow
    registration: true,

    // Setting to false will remove the checkbox to save username
    rememberMe: true,

    // Allow users to enroll in multiple optional factors before finishing the authentication flow.
    multiOptionalFactorEnroll: false,

    // Will enable unlock in addition to forgotten password
    selfServiceUnlock: true,

    // Enable SMS-based account recovery
    smsRecovery: true,

    // Enable voice call-based account recovery
    callRecovery: true,

    // Allow the control of the route by Okta`s widget,
    // this will help to show the register screen if their routes matches with ours.
    router: true,

    // To show/hide password
    showPasswordToggleOnSignInPage: true,
  },
  useInteractionCodeFlow: false,
  baseUrl: ISSUER.split('/oauth2')[0],
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    scopes: ['openid', 'email', 'profile', 'address', 'phone'],
    pkce: true,
  },
  app: {
    basename: BASENAME,
  },
};

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
  signInWidget.value = new OktaSignIn(signInWidgetConfig);

  try {
    // Render Widget and assign callback events.
    signInWidget.value.showSignInToGetTokens({
      el: widget.value,
      scopes: signInWidgetConfig.oidc.scopes,
    })
      .then(widgetSuccessCallback)
      .catch(widgetErrorCallback);

    // Listen to any event related to the widget
    signInWidget.value.on('afterRender', (context: { controller: string }) => {
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
  signInWidget.value.off();
  signInWidget.value.remove();
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
