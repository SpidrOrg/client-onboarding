<script>
import _ from 'lodash';
import fetchOnboardingHistory from '@/api/fetchOnboardingHistory';

export default {
  name: 'OnboardingHistory',
  data() {
    return {
      isFetching: true,
      error: null,
      apiData: {},
    };
  },
  emits: ['close'],
  methods: {
    async fetchData() {
      this.isFetching = true;
      this.error = null;
      try {
        const response = await fetchOnboardingHistory();
        this.apiData = _.get(response, 'data');
        console.log(response);
      } catch (e) {
        this.error = e;
      }
      this.isFetching = false;
    },
    refreshDataHandler() {
      this.fetchData();
    },
  },
  computed: {
    tableHeaders() {
      return _.get(this.apiData, 'headers') || [];
    },
    tableRows() {
      return _.get(this.apiData, 'data') || [];
    },
    isApiDataAvailable() {
      return _.size(_.get(this.apiData, 'data')) > 0;
    },
    maxCellWidth() {
      return `${100 / _.size(this.tableHeaders)}%`;
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
<template>
  <div class="tw-w-full tw-max-h-[80vh] tw-min-h-[60vh] tw-bg-white tw-px-6">
    <div class="tw-flex tw-justify-center tw-mb-4">
      <span class="tw-text-2xl tw-font-medium tw-text-black">
        Client Onboarding History
      </span>
    </div>
    <div
      class="tw-w-full tw-my-40 tw-flex tw-justify-center tw-items-center"
      v-if="isFetching"
    >
      <v-progress-circular
        indeterminate
        color="#7823DC"
        :size="80"
        :width="10"
      />
    </div>
    <div
      v-if="!isFetching && isApiDataAvailable"
      class="tw-my-4 tw-border-2 tw-border-solid tw-border-black"
    >
      <div
        :class="`tw-grid tw-grid-cols-${tableHeaders.length} tw-grid-flow-col tw-gap-x-3 tw-items-center tw-py-3 tw-bg-brand-gray-1`"
      >
        <span
          v-for="header in tableHeaders"
          :key="header"
          class="tw-flex tw-justify-center"
        >
          <span
            class="tw-text-base tw-font-medium tw-text-black tw-text-center"
            >{{ header }}</span
          >
        </span>
      </div>
      <ul class="tw-max-h-[60vh] tw-overflow-scroll">
        <li
          v-for="(rowData, index) in tableRows"
          :key="rowData[0]"
          :class="`tw-grid tw-grid-cols-${
            tableHeaders.length
          } tw-grid-flow-col tw-gap-x-3 tw-items-center tw-py-3 ${
            index % 2 === 0 ? 'tw-bg-white' : 'tw-bg-brand-gray-1'
          }`"
        >
          <div
            v-for="(cellValue, index) in rowData"
            :key="`${cellValue}-${index}`"
            class="tw-col-span-1 tw-flex tw-justify-center"
          >
            <span class="tw-text-sm tw-text-black tw-text-center">{{
              cellValue || '-'
            }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="tw-flex tw-justify-center tw-gap-x-5">
      <v-btn @click="$emit('close')" color="grey-lighten-2">Go Back</v-btn>
      <v-btn @click="refreshDataHandler" color="grey-lighten-2">Refresh</v-btn>
    </div>
  </div>
</template>
