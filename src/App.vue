<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { oktaAuth, signInWidget } from './utils/okta';

const store = useStore();
const router = useRouter();

const logOut = async () => {
  console.log('oktaAuth. ', oktaAuth);
  // Maybe add logout commit as signOut callback
  store.commit('logout');

  await oktaAuth.signOut();
};

onMounted(() => {
  // Check for an existing authClient transaction
  signInWidget.authClient.session.exists()
    .then((exists: boolean) => {
      if (exists) {
        store.commit('login');
        router.push('/dashboard');
        console.log('A session exists!', signInWidget.authClient);
      } else {
        store.commit('logout');
        console.log('A session does not exist.', signInWidget.authClient.session);
      }
    });
});

console.log('loggedIn?: ', store.state.loggedIn);

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
