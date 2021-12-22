import { OktaAuth } from '@okta/okta-auth-js';

const CLIENT_ID = '0oa3du6gwnuCLHEqW5d7';
const ISSUER = 'https://dev-22944439.okta.com/oauth2/default';

const BASENAME = process.env.NODE_ENV === 'production' ? '/custom-login' : '';
const REDIRECT_URI = `${window.location.origin}${BASENAME}/login/callback`;

const oktaAuth:any = new OktaAuth({
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
  scopes: ['openid', 'email', 'profile', 'address', 'phone'],
});

export default oktaAuth;
