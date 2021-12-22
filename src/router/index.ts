import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { LoginCallback, navigationGuard } from '@okta/okta-vue';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/login/callback',
    component: LoginCallback,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/password-reset',
    name: 'PasswordReset',
    component: () => import('../views/PasswordReset.vue'),
  },
  {
    path: '/signin/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Due to navigation guards mixin issue in vue-router-next,
// navigation guard logic need to be added manually
router.beforeEach(navigationGuard);

export default router;
