<script setup lang="ts">
import { useStore } from 'vuex';
// eslint-disable-next-line import/extensions
import oktaAuth from './utils/okta';

const store = useStore();

const logIn = async () => {
  await oktaAuth.signInWithRedirect();
  // Maybe add logout commit as signInWithRedirect callback
  store.commit('login');
};

const logOut = async () => {
  await oktaAuth.signOut();
  // Maybe add logout commit as signOut callback
  store.commit('logout');
};

console.log('store.state.loggedIn: ', store.state.loggedIn);

</script>

<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link v-if="!store.state.loggedIn" to="/login"> Login</router-link> |
    <router-link v-if="!store.state.loggedIn" to="/signin/register">register</router-link> |
    <router-link v-if="store.state.loggedIn" to="/dashboard">dashboard</router-link> |
    <button @click="logOut" v-if="store.state.loggedIn">logout</button> |
  </div>
  <router-view/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

#app {
  font-family: 'Poppins', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
