<script>
import fetchOnboardingHistory from '@/api/fetchOnboardingHistory';

export default {
  name: 'OnboardingHistory',
  data() {
    return {
      isFetching: true,
      error: null,
      apiData: [],
    };
  },
  methods: {
    async fetchData() {
      this.isFetching = true;
      this.error = null;
      try {
        const response = await fetchOnboardingHistory();
        this.apiData = response;
        console.log(this.apiData);
      } catch (e) {
        this.error = e;
      }
      this.isFetching = false;
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
<template>
  <div
    class="tw-w-full tw-max-h-[80vh] tw-min-h-[60vh] tw-bg-white tw-px-5 tw-py-4 tw-overflow-auto"
  >
    <div class="tw-flex tw-justify-center">
      <span class="tw-text-2xl tw-font-medium tw-text-black">
        Client Onboarding History
      </span>
    </div>
    <div
      class="tw-w-full tw-mt-32 tw-flex tw-justify-center tw-items-center"
      v-if="isFetching"
    >
      <v-progress-circular
        indeterminate
        color="#7823DC"
        :size="80"
        :width="10"
      />
    </div>
    <div v-if="!isFetching && lodSize(apiData) > 0" class="tw-py-4">
      <div
        class="tw-flex tw-justify-between tw-gap-x-3 tw-items-center tw-p-3 tw-bg-brand-gray-1"
      >
        <span class="tw-text-lg tw-font-medium tw-text-black">
          Data point(s)
        </span>
        <div class="tw-flex tw-gap-x-1">
          <span
            class="tw-text-lg tw-font-medium tw-text-black tw-text-left tw-w-44"
          >
            Source(s)
          </span>
          <span
            class="tw-text-lg tw-font-medium tw-text-black tw-text-right tw-w-24 tw-pr-1"
          >
            Value
          </span>
        </div>
      </div>
      <ul class="tw-max-h-[420px] tw-overflow-scroll">
        <li
          v-for="(item, index) in selectedDriverDetails"
          :key="item.dataPoint"
          :class="`tw-flex tw-justify-between tw-gap-x-3 tw-items-center tw-p-3 ${
            index % 2 === 0 ? 'tw-bg-white' : 'tw-bg-brand-gray-1'
          }`"
        >
          <span class="tw-text-base tw-text-black">
            {{ item.dataPoint }}
          </span>
          <div class="tw-flex tw-gap-x-1">
            <span class="tw-text-base tw-text-black tw-text-left tw-w-44">
              {{ item.source }}
            </span>
            <span
              class="tw-text-base tw-text-black tw-text-right tw-w-24 tw-pr-1"
              >{{ getPercentValue(item.value) }}</span
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
