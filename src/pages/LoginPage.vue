<script>
import KearneyHomeLogo from '@/assets/kearneyHomeLogo.png';
import LoginButton from '@/components/UI/ButtonComponent.vue';
import { doFederatedSignIn } from '@/idpUtils';

export default {
  name: 'LoginPage',
  components: {
    LoginButton,
  },
  data() {
    return {
      KearneyHomeLogo,
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
  <section class="tw-flex tw-h-screen tw-flex-col">
    <div class="tw-grid tw-grid-cols-12 tw-my-auto">
      <div
        class="tw-col-span-6 tw-col-start-1 tw-self-center tw-justify-self-center"
      >
        <img
          class="tw-h-[500px] tw-w-[444px] tw-object-contain"
          :src="KearneyHomeLogo"
        />
      </div>
      <div
        class="tw-col-span-6 tw-col-start-7 tw-px-20 desktop:tw-px-10 small-laptop:tw-px-10"
      >
        <div class="tw-h-full tw-flex tw-flex-col tw-justify-center tw-gap-y-6">
          <h1
            class="tw-text-4xl desktop:tw-text-4xl small-laptop:tw-text-2xl tw-text-black tw-font-medium"
          >
            Kearney’s Sensing Solution - Admin
          </h1>
          <p
            class="tw-text-xl desktop:tw-text-xl small-laptop:tw-text-base tw-text-black tw-break-words"
          >
            Manage Client onboarding & account set-up for sensing solution
            application.
          </p>
          <div class="tw-pt-8 small-laptop:tw-pt-6">
            <LoginButton
              label="Proceed to Sign In"
              type="primary"
              @click="handleLoginIn"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="tw-px-5">
      <footer
        class="tw-w-full tw-flex tw-p-4 tw-border-t tw-border-solid tw-border-brand-gray-2"
      >
        <div class="tw-ml-auto tw-flex tw-items-center">
          Copyright @ Kearney 2023
        </div>
      </footer>
    </div>
  </section>
</template>
