<script>
import { doFederatedSignIn } from '@/idpUtils';

export default {
  name: "Login",
  data() {
    return {
        isLoading:false
    }
  },
  methods: {
    handleLoginIn() {
      doFederatedSignIn();
    },
  },
}
</script>
<template>
  <v-progress-circular indeterminate color="#7823DC"  :size="70" :width="7" style="position: fixed;left: 50%;top: 35%;z-index: 1000;" v-if="isLoading"/>
  <v-container v-else>
    <v-row>
      <v-col cols="12" sm="6">
        <v-img src="../assets/login-page.webp"/>
      </v-col>
      <v-col cols="12" sm="6" class="p-12">
        <h1 class="text-center">Kearny Sensing & Pivot Admin</h1>
        <h5 class="text-center">Sign in for client onboarding</h5>
        <div class="text-center pt-15">

        </div>
        <div class="text-center pt-15 mt-15">
          <v-btn size="x-large" color="success" @click="handleLoginIn">SIGN IN</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
</style>
