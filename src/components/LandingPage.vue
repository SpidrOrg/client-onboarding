<script>
import { logout } from '../idpUtils';

import ClientOnboardingForm from './ClientOnboardingForm.vue';
import OnboardingHistory from './OnboardingHistory.vue';

export default {
  name: 'LandingPage',
  components: {
    ClientOnboardingForm,
    OnboardingHistory,
  },
  data() {
    return {
      isLoading: false,
      clientOnboardingFormIsShown: false,
      clientOnboardingHistoryIsShown: false,
    };
  },
  methods: {
    clientOnboardingFunc() {
      this.clientOnboardingFormIsShown = true;
    },
    hideFormHandler() {
      this.clientOnboardingFormIsShown = false;
    },
    showHistoryHandler() {
      this.clientOnboardingHistoryIsShown = true;
    },
    closeHistoryViewHandler() {
      this.clientOnboardingHistoryIsShown = false;
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
      <v-btn @click="handleLogout" color="grey-lighten-2">Logout</v-btn>
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
      class="tw-h-full tw-w-full tw-overflow-auto tw-flex tw-justify-center tw-mt-20"
      v-if="!isLoading"
    >
      <div
        v-if="!clientOnboardingFormIsShown && !clientOnboardingHistoryIsShown"
        class="tw-flex tw-justify-center tw-items-center tw-gap-x-5 tw-mt-20"
      >
        <v-btn
          density="comfortable"
          color="grey-lighten-2"
          size="x-large"
          @click="clientOnboardingFunc"
        >
          CLIENT ONBOARDING
        </v-btn>
        <v-btn
          density="comfortable"
          color="grey-lighten-2"
          size="x-large"
          @click="showHistoryHandler"
        >
          SHOW CLIENT ONBOARDING HISTORY
        </v-btn>
      </div>
      <ClientOnboardingForm
        v-if="clientOnboardingFormIsShown"
        @close-form="hideFormHandler"
      />
      <OnboardingHistory
        v-if="clientOnboardingHistoryIsShown"
        @close="closeHistoryViewHandler"
      />
    </v-responsive>
  </div>
</template>
