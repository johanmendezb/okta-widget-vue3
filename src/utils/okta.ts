import { OktaAuth } from '@okta/okta-auth-js';
// TODO: findout about aliases and okta imports
import OktaSignIn from '@okta/okta-signin-widget';

const CLIENT_ID = '0oa3du6gwnuCLHEqW5d7';
const ISSUER = 'https://dev-22944439.okta.com/oauth2/default';

const REDIRECT_URI = `${window.location.origin}/login/callback`;

console.log('REDIRECT_URI: ', REDIRECT_URI);

export const signInWidgetConfig = {
  // Docs: https://github.com/okta/okta-signin-widget#okta-sign-in-widget
  logo: 'https://i.ibb.co/bQm76kM/logo.png',
  language: 'en',
  i18n: {
    en: {
      'primaryauth.title': 'Log In',
      'primaryauth.submit': 'Log In',
      'primaryauth.username.placeholder': 'Email Address',
      'primaryauth.password.placeholder': 'Password',
      needhelp: 'Log In Help',
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
};

export const oktaAuth = new OktaAuth({
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
  scopes: ['openid', 'email', 'profile', 'address', 'phone'],
});

export const signInWidget = new OktaSignIn(signInWidgetConfig);
