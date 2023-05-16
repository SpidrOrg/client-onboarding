<script>
import { doFederatedSignIn } from '@/idpUtils';

export default {
  name: 'LoginPage',
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    handleLoginIn() {
      doFederatedSignIn();
    },
  },
};
</script>
<template>
  <v-progress-circular
    indeterminate
    color="#7823DC"
    :size="70"
    :width="7"
    style="position: fixed; left: 50%; top: 35%; z-index: 1000"
    v-if="isLoading"
  />
  <div v-if="!isLoading" class="tw-h-screen tw-w-screen tw-p-6">
    <v-row
      class="tw-h-full tw-w-full tw-flex tw-justify-center tw-items-center"
    >
      <v-col cols="12" sm="6">
        <div
          class="tw-h-full tw-w-full tw-flex tw-justify-center tw-items-center"
        >
          <v-img src="../assets/login-page.webp" />
        </div>
      </v-col>
      <v-col cols="12" sm="6">
        <div
          class="tw-h-full tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-center"
        >
          <div class="tw-flex tw-flex-col tw-gap-2">
            <h1 class="tw-text-4xl tw-font-semibold tw-text-center">
              Kearny Sensing & Pivot Admin
            </h1>
            <h3 class="tw-text-2xl tw-font-semibold tw-text-center">
              Sign in for Client Onboarding
            </h3>
          </div>
          <div class="tw-flex tw-justify-center tw-mt-10">
            <v-btn size="x-large" color="grey-lighten-2" @click="handleLoginIn">
              SIGN IN
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<style></style>
