<script>
import ClientOnboardingHistory from './ClientOnboardingHistory.vue';
import ClientOnboardingForm from './ClientOnboardingForm.vue';

export default {
  name: 'ClientOnboarding',
  components: {
    ClientOnboardingHistory,
    ClientOnboardingForm,
  },
  data() {
    return {
      clientOnboardingFormIsShown: false,
    };
  },
  methods: {
    showFormHandler() {
      this.clientOnboardingFormIsShown = true;
    },
    hideFormHandler() {
      this.clientOnboardingFormIsShown = false;
    },
  },
};
</script>
<template>
  <ClientOnboardingHistory
    v-if="!clientOnboardingFormIsShown"
    @show-form="showFormHandler"
  />
  <ClientOnboardingForm
    v-if="clientOnboardingFormIsShown"
    @close-form="hideFormHandler"
  />
</template>
