<script>
import _ from 'lodash';
import ButtonComponent from '../UI/ButtonComponent.vue';
import fetchOnboardingHistory from '@/api/fetchOnboardingHistory';

export default {
  name: 'ClientOnboardingHistory',
  components: {
    ButtonComponent,
  },
  data() {
    return {
      isFetching: true,
      error: null,
      apiData: {},
    };
  },
  emits: ['showForm'],
  methods: {
    async fetchData() {
      this.isFetching = true;
      this.error = null;
      try {
        const response = await fetchOnboardingHistory();
        this.apiData = _.get(response, 'data');

        if (
          response?.status === 'error' ||
          _.size(_.get(this.apiData, 'headers')) === 0
        ) {
          throw new Error('Data is not available!');
        }
      } catch (e) {
        this.error = e;
      }
      this.isFetching = false;
    },
    refreshDataHandler() {
      this.fetchData();
    },
    getStatusStyle(index, cellValue) {
      let style = `tw-text-sm tw-text-center`;
      if (index > 1) {
        if (!cellValue) {
          style += ` tw-text-black`;
        } else if (cellValue === 'pending') {
          style += ` tw-text-brand-yellow-1`;
        } else if (cellValue === 'processing') {
          style += ` tw-text-brand-red-1`;
        } else {
          style += ` tw-text-brand-green-1`;
        }
      } else {
        style += ` tw-text-black`;
      }
      return style;
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
      return _.size(_.get(this.apiData, 'headers')) > 0;
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
<template>
  <div class="tw-w-full tw-h-full tw-py-5">
    <div class="tw-bg-white tw-px-6 tw-min-h-[80vh]">
      <div
        class="tw-w-full tw-flex tw-items-center tw-py-4 tw-border-b tw-border-solid tw-border-brand-gray-2"
      >
        <span class="tw-text-xl tw-font-bold tw-text-black"> Clients </span>
        <div class="tw-ml-auto tw-flex tw-gap-x-4">
          <button
            class="tw-px-2 tw-py-1 tw-border tw-border-solid tw-border-brand-primary"
            @click="refreshDataHandler"
          >
            <span class="tw-text-base tw-text-brand-primary">
              Refresh Client Listing
            </span>
          </button>
          <ButtonComponent
            label="Add New Client"
            type="primary"
            @click="$emit('showForm')"
          />
        </div>
      </div>
      <div
        class="tw-w-full tw-h-[60vh] tw-flex tw-justify-center tw-items-center"
        v-if="isFetching"
      >
        <v-progress-circular
          indeterminate
          color="#7823DC"
          :size="80"
          :width="10"
        />
      </div>
      <div v-if="!isFetching && isApiDataAvailable" class="tw-py-6">
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
        <div
          v-if="!tableRows?.length"
          class="tw-flex tw-justify-center tw-py-3"
        >
          <span class="tw-text-base tw-font-medium tw-text-black">
            No Records to display
          </span>
        </div>
        <ul
          v-if="!!tableRows?.length"
          class="tw-max-h-[60vh] tw-overflow-scroll"
        >
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
              <span :class="getStatusStyle(index, cellValue)">{{
                cellValue || 'N/A'
              }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="!isFetching && error" class="tw-py-6">
        <v-alert type="error" :text="error.toString()"></v-alert>
      </div>
    </div>
  </div>
</template>
