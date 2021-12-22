<script setup lang="ts">
import { useStore } from 'vuex';

const store = useStore();

const isLoggedin = store.state.loggedIn;
</script>

<template>
  <div class="dashboard">
    <p v-if="!isLoggedin" >Dashboard, you're not logged in</p>
    <h1 v-if="isLoggedin" >logged in, This is a Dashboard page</h1>
  </div>
</template>
