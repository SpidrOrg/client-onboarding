<script>
import { logout } from '../idpUtils';

import ClientOnboardingForm from './ClientOnboardingForm.vue';

export default {
  name: 'LandingPage',
  components: {
    ClientOnboardingForm,
  },
  data() {
    return {
      isLoading: false,
      clientOnboardingFormIsShown: false,
    };
  },
  methods: {
    clientOnboardingFunc() {
      this.isLoading = true;
      setTimeout(() => {
        this.clientOnboardingFormIsShown = true;
        this.isLoading = false;
      }, 1500);
    },
    hideFormHandler() {
      this.clientOnboardingFormIsShown = false;
    },
    handleLogout() {
      logout();
    },
  },
};
</script>
<template>
  <div class="tw-h-screen tw-w-screen tw-p-6">
    <div class="tw-w-full tw-flex tw-justify-end tw-px-6">
      <v-btn @click="handleLogout" color="red">Logout</v-btn>
    </div>
    <div
      class="tw-w-full tw-h-full tw-flex tw-justify-center tw-mt-40"
      v-if="isLoading"
    >
      <v-progress-circular
        indeterminate
        color="#7823DC"
        :size="80"
        :width="10"
      />
    </div>
    <v-responsive
      class="tw-h-full tw-w-full tw-flex tw-justify-center tw-mt-20"
      v-if="!isLoading"
    >
      <div
        v-if="!clientOnboardingFormIsShown"
        class="tw-flex tw-justify-center tw-items-center tw-gap-x-5 tw-mt-20"
      >
        <v-btn
          density="comfortable"
          color="primary"
          size="x-large"
          @click="clientOnboardingFunc"
        >
          CLIENT ONBOARDING
        </v-btn>
        <v-btn density="comfortable" color="warning" size="x-large">
          SHOW HISTORY
        </v-btn>
      </div>
      <ClientOnboardingForm
        v-if="clientOnboardingFormIsShown"
        @close-form="hideFormHandler"
      />
    </v-responsive>
  </div>
</template>
