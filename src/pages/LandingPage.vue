<script>
import TheHeader from '@/components/TheHeader.vue';
import ClientOnboarding from '@/components/ClientOnboarding/ClientOnboarding.vue';

import kearneyOrgLogo from '@/assets/kearneyOrgLogo.svg';

export default {
  name: 'LandingPage',
  components: {
    TheHeader,
    ClientOnboarding,
  },
  props: {
    userdata: { type: Object, required: false },
  },
  data() {
    return {
      kearneyOrgLogo,
    };
  },
};
</script>
<template>
  <div id="screen" class="tw-h-screen tw-w-screen">
    <div class="tw-w-full tw-flex tw-p-5 tw-bg-brand-gray-1">
      <img :src="kearneyOrgLogo" alt="kearneyOrgLogo" />
      <TheHeader :userdata="userdata" />
    </div>
    <div
      class="tw-w-full tw-min-h-full tw-max-h-fit tw-px-5 tw-bg-brand-gray-1"
    >
      <ClientOnboarding />
    </div>
    <div class="tw-px-5 tw-bg-brand-gray-1">
      <footer
        class="tw-w-full tw-flex tw-p-4 tw-border-t tw-border-solid tw-border-brand-gray-2"
      >
        <div class="tw-ml-auto tw-flex tw-items-center">
          Copyright @ Kearney 2023
        </div>
      </footer>
    </div>
  </div>
</template>
