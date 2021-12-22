<script setup lang="ts">
import LoginWidget from '../components/LoginWidget.vue';

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
  <div class="login">
    <h1>Login page</h1>
    <LoginWidget />
  </div>
</template>
