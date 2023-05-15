<script>
import _ from 'lodash';
import submitNewTenantForm from "@/api/newTenantSubmit/submitNewTenantForm";
import { format as formatFn, endOfMonth, subMonths, addMonths } from 'date-fns';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const MODELS = ['rf', 'svr'];
const ALL_OPTION = 'All';

export default {
  name: 'ClientOnboardingForm',
  components: {
    VueDatePicker,
  },
  props: {},
  emits: ['closeForm'],
  data() {
    return {
      isLoading: false,
      availableModels: [...MODELS],
      availableDataSources: [
        'Covid',
        'Federal reserve data',
        'Google Trends',
        'IHS',
        'Meteostat',
        'Moodys_188',
        'SimilarWeb',
        'Yahoo Finance',
      ],
      adminEmailRule: [
        (value) => {
          var validRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

          if (!value.match(validRegex)) {
            return 'The value should be an email';
          }
          if (value) return true;

          return 'This field is required';
        },
      ],
      selectedDataSourcesRule: [
        (value) => {
          if (!_.includes(value, 'IHS')) return "'IHS' must be selected";
          if (_.size(value) < 2) return 'At least 2 sources must be selected';

          return true;
        },
      ],
      generalRules: [
        (value) => {
          if (value) return true;

          return 'This field is required';
        },
      ],
      formData: {
        adminEmail: '',
        categories: '',
        chosenModel: [],
        frequency: null,
        host: null,
        name: '',
        phone: null,
        selectedDataSources: ['IHS'],
        startDate: null,
        endDate: null,
      },
      formInputsValidity: {
        adminEmail: true,
        categories: true,
        chosenModel: true,
        frequency: true,
        host: true,
        name: true,
        phone: true,
        selectedDataSources: true,
        startDate: true,
        endDate: true,
      },
    };
  },
  computed: {
    minStartDate() {
      if (!this.formData.endDate) return null;
      const year = _.get(this.formData.endDate, 'year');
      const monthIndex = _.get(this.formData.endDate, 'month');
      return subMonths(new Date(year, monthIndex), 60);
    },
    maxStartDate() {
      if (!this.formData.endDate) return endOfMonth(subMonths(new Date(), 1));
      const year = _.get(this.formData.endDate, 'year');
      const monthIndex = _.get(this.formData.endDate, 'month');
      return endOfMonth(subMonths(new Date(year, monthIndex), 1));
    },
    minEndDate() {
      if (!this.formData.startDate) return null;
      const year = _.get(this.formData.startDate, 'year');
      const monthIndex = _.get(this.formData.startDate, 'month');
      return addMonths(new Date(year, monthIndex), 1);
    },
    maxEndDate() {
      return endOfMonth(new Date());
    },
  },
  methods: {
    formatDatePickerValue(date) {
      return formatFn(date, 'MMM yyyy');
    },
    validateAdminEmail(value) {
      if (_.isEmpty(value)) return false;
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      return !!value.match(validRegex);
    },
    validateSelectedDataSources(value) {
      if (!_.includes(value, 'IHS')) return false;
      if (_.size(value) < 2) return false;

      return true;
    },
    validateFormInputs() {
      const enteredStartDateIsValid = !_.isEmpty(this.formData.startDate);
      const enteredEndDateIsValid = !_.isEmpty(this.formData.endDate);
      const enteredNameIsValid = !_.isEmpty(this.formData.name);
      const enteredPhoneIsValid = !_.isEmpty(this.formData.phone);
      const enteredModelIsValid = !_.isEmpty(this.formData.chosenModel);
      const enteredCategoriesAreValid = !_.isEmpty(this.formData.categories);
      const enteredFrequencyIsValid = !_.isEmpty(this.formData.frequency);
      const enteredAdminEmailIsValid = this.validateAdminEmail(this.formData.adminEmail);
      const enteredHostIsValid = !_.isEmpty(this.formData.host);
      const enteredDataSourcesAreValid = this.validateSelectedDataSources(this.formData.selectedDataSources);

      this.formInputsValidity = {
        adminEmail: enteredAdminEmailIsValid,
        categories: enteredCategoriesAreValid,
        chosenModel: enteredModelIsValid,
        frequency: enteredFrequencyIsValid,
        host: enteredHostIsValid,
        name: enteredNameIsValid,
        phone: enteredPhoneIsValid,
        selectedDataSources: enteredDataSourcesAreValid,
        startDate: enteredStartDateIsValid,
        endDate: enteredEndDateIsValid,
      };
    },
    async submitHandler() {
      this.isLoading = true;
      this.validateFormInputs();

      const formIsValid = _.every(_.values(this.formInputsValidity), (l)=>!!l);

      if (!formIsValid) {
        return;
      }
      const response = await submitNewTenantForm(this.formData);
      console.log(response);
      this.isLoading = false;
    },
  },
};
</script>

<template>
  <div class="tw-w-full tw-px-6">
    <h1 class="tw-text-2xl tw-font-semibold tw-text-center tw-mb-10">
      CLIENT ONBOARDING
    </h1>
    <v-form validate-on="submit" @submit.prevent="submitHandler" ref="form">
      <v-row>
        <v-col cols="12" sm="4">
          <label for="name" class="tw-text-base">Name</label>
          <v-text-field
            id="name"
            v-model="formData.name"
            :rules="generalRules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <label for="adminEmail" class="tw-text-base">Admin Email</label>
          <v-text-field
            id="adminEmail"
            v-model="formData.adminEmail"
            :rules="adminEmailRule"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <label for="phone" class="tw-text-base">Phone</label>
          <v-text-field
            id="phone"
            v-model="formData.phone"
            :rules="generalRules"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <label for="chosenModel" class="tw-text-base">Model</label>
          <v-select
            id="chosenModel"
            :items="availableModels"
            v-model="formData.chosenModel"
            multiple
            :rules="generalRules"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <label for="frequency" class="tw-text-base">Frequency</label>
          <v-text-field
            id="frequency"
            v-model="formData.frequency"
            type="number"
            :rules="generalRules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <label for="host" class="tw-text-base">Host</label>
          <v-text-field
            id="host"
            v-model="formData.host"
            :rules="generalRules"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <label for="selectedDataSources" class="tw-text-base">
            Data Sources
          </label>
          <v-select
            id="selectedDataSources"
            :items="availableDataSources"
            v-model="formData.selectedDataSources"
            multiple
            :rules="selectedDataSourcesRule"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <label for="start-date-picker" class="tw-text-base">
            Start Date (Month & Year)
          </label>
          <VueDatePicker
            id="start-date-picker"
            v-model="formData.startDate"
            month-picker
            :format="formatDatePickerValue"
            :min-date="minStartDate"
            :max-date="maxStartDate"
            :clearable="false"
            :disabled="isLoading"
            auto-apply
            menu-class-name="dp-custom-menu"
          >
            <template #dp-input="{ value }">
              <div
                :class="`tw-flex tw-items-center tw-justify-between tw-p-3 tw-bg-brand-gray-1
            ${isLoading ? 'tw-opacity-40' : 'tw-cursor-pointer'}`"
              >
                <span class="tw-text-base">{{ value }}</span>
                <v-icon icon="mdi-calendar-month" :size="32" />
              </div>
            </template>
          </VueDatePicker>
          <span
            v-if="!formInputsValidity.startDate"
            class="tw-text-sm tw-text-red-500 tw-ml-3"
          >
            Start Date is required
          </span>
        </v-col>
        <v-col cols="12" sm="4">
          <label for="end-date-picker" class="tw-text-base">
            End Date (Month & Year)
          </label>
          <VueDatePicker
            id="end-date-picker"
            v-model="formData.endDate"
            month-picker
            :format="formatDatePickerValue"
            :min-date="minEndDate"
            :max-date="maxEndDate"
            :clearable="false"
            :disabled="isLoading"
            auto-apply
            menu-class-name="dp-custom-menu"
          >
            <template #dp-input="{ value }">
              <div
                :class="`tw-flex tw-items-center tw-justify-between tw-p-3 tw-bg-brand-gray-1
            ${isLoading ? 'tw-opacity-40' : 'tw-cursor-pointer'}`"
              >
                <span class="tw-text-base">{{ value }}</span>
                <v-icon icon="mdi-calendar-month" :size="32" />
              </div>
            </template>
          </VueDatePicker>
          <span
            v-if="!formInputsValidity.endDate"
            class="tw-text-sm tw-text-red-500 tw-ml-3"
          >
            End Date is required
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <label for="categories" class="tw-text-base"
            >Categories (Comma Separated Values)</label
          >
          <v-text-field
            id="categories"
            v-model="formData.categories"
            :rules="generalRules"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="tw-flex tw-justify-center tw-gap-x-5">
        <v-btn @click="$emit('closeForm')" color="#EDEDED">Back</v-btn>
        <v-btn type="submit" color="success">Submit</v-btn>
      </div>
    </v-form>
  </div>
</template>

<style>
.dp-custom-menu {
  background: #ffffff;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  padding: 8px;
}
.dp__theme_light {
  --dp-background-color: #ffffff;
  --dp-text-color: #212121;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #7823dc;
  --dp-primary-disabled-color: rgb(120 35 220 / 30%);
  --dp-primary-text-color: #ffffff;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-highlight-color: rgba(25, 118, 210, 0.1);
}
</style>
