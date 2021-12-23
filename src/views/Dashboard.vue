<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { ref } from '@vue/reactivity';
import { oktaAuth } from '../utils/okta';

const store = useStore();
const userData = ref<{ claim: string, value: string }[] | null>(null);

const isLoggedin = store.state.loggedIn;

onMounted(async () => {
  try {
    userData!.value = await Object.entries(
      await oktaAuth.getUser(),
    ).map((entry) => ({ claim: entry![0], value: entry![1] }));
  } catch (error) {
    console.warn('General widget catch Error', error);
  }
});
</script>

<template>
  <div class="dashboard">
    <p v-if="!isLoggedin" >Dashboard, you're not logged in</p>
    <h1 v-if="isLoggedin" >logged in, This is a Dashboard page</h1>

    <table class="ui table">
      <thead>
        <tr>
          <th>data</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(data, index) in userData"
          :key="index"
        >
          <td>{{data.claim}}</td>
          <td :id="'claim-' + data.claim">{{data.value}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
