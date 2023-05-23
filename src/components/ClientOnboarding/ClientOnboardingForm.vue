<script>
import _ from 'lodash';
import {
  format as formatFn,
  endOfMonth,
  subMonths,
  addMonths,
  differenceInCalendarMonths,
} from 'date-fns';
import submitNewTenantForm from '@/api/newTenantSubmit/submitNewTenantForm';
import {
  MODELS,
  EXTERNAL_DATA_SOURCES,
  CLIENT_SPECIFIC_DATA_SOURCES,
  EMAIL_REGEX,
  ID_REGEX,
} from './constants';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: 'ClientOnboardingForm',
  components: {
    VueDatePicker,
  },
  emits: ['closeForm'],
  data() {
    return {
      isLoading: false,
      error: null,
      success: false,
      startDateError: null,
      selectedDataSourcesError: null,
      availableModels: MODELS,
      availableDataSources: EXTERNAL_DATA_SOURCES,
      availableClientDataSources: CLIENT_SPECIFIC_DATA_SOURCES,
      tenantIdRules: [
        (value) => {
          if (!value) return true; // Optional field
          if (value.match(ID_REGEX)) {
            return true;
          }
          return 'The value should be a 10 Digit Number';
        },
      ],
      adminEmailRule: [
        (value) => {
          if (!value.match(EMAIL_REGEX)) {
            return 'The value should be an email';
          }
          if (value) return true;
          return 'This field is required';
        },
      ],
      chosenModelRules: [
        (value) => {
          if (_.size(value) < 1) return 'At least 1 model must be selected';
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
        tenantId: null,
        adminEmail: '',
        categories: '',
        chosenModel: [],
        frequency: null,
        host: null,
        name: '',
        phone: null,
        selectedDataSources: [],
        selectedClientDataSources: [],
        startDate: null,
        endDate: null,
      },
      formInputsValidity: {
        tenantId: true,
        adminEmail: true,
        categories: true,
        chosenModel: true,
        frequency: true,
        host: true,
        name: true,
        phone: true,
        selectedDataSources: true,
        selectedClientDataSources: true,
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
    validateTenantId() {
      const value = this.formData.tenantId;
      if (!value) return true; // Optional field
      return !!value.match(ID_REGEX);
    },
    validateAdminEmail(value) {
      if (_.isEmpty(value)) return false;
      return !!value.match(EMAIL_REGEX);
    },
    validateSelectedDataSources(value) {
      this.selectedDataSourcesError = null;
      const numOfClientDataSources = _.size(
        this.formData.selectedClientDataSources
      );
      if (numOfClientDataSources > 0) {
        for (let i = 0; i < numOfClientDataSources; i++) {
          if (_.includes(value, this.formData.selectedClientDataSources[i])) {
            this.selectedDataSourcesError =
              'External and client specific data sources cannot be common';
            return false;
          }
        }
        return true;
      }

      if (_.size(value) < 2) {
        this.selectedDataSourcesError = 'At least 2 sources must be selected';
        return false;
      }

      if (_.includes(value, 'Moodys') && _.includes(value, 'Moodys_188')) {
        this.selectedDataSourcesError =
          "Cannot select both 'Moodys' and 'Moodys_188'";
        return false;
      }

      return true;
    },
    validateStartDate() {
      this.startDateError = null;
      if (!this.formData.startDate) return false;
      if (!this.formData.endDate) {
        this.startDateError =
          'Start Date must be at least 1 month prior to End Date';
        return false;
      }

      const startDateObj = new Date(
        _.get(this.formData.startDate, 'year'),
        _.get(this.formData.startDate, 'month')
      );
      const endDateObj = new Date(
        _.get(this.formData.endDate, 'year'),
        _.get(this.formData.endDate, 'month')
      );

      if (differenceInCalendarMonths(endDateObj, startDateObj) < 1) {
        this.startDateError =
          'Start Date must be at least 1 month prior to End Date';
        return false;
      }

      if (differenceInCalendarMonths(endDateObj, startDateObj) > 60) {
        this.startDateError = 'Date range cannot exceed 60 months';
        return false;
      }

      return true;
    },
    validateFormInputs() {
      const enteredTenantIdIsValid = this.validateTenantId();
      const enteredStartDateIsValid = this.validateStartDate();
      const enteredEndDateIsValid = !_.isEmpty(this.formData.endDate);
      const enteredNameIsValid = !_.isEmpty(this.formData.name);
      const enteredPhoneIsValid = !_.isEmpty(this.formData.phone);
      const enteredModelIsValid = !_.isEmpty(this.formData.chosenModel);
      const enteredCategoriesAreValid = !_.isEmpty(this.formData.categories);
      const enteredFrequencyIsValid = !_.isEmpty(this.formData.frequency);
      const enteredAdminEmailIsValid = this.validateAdminEmail(
        this.formData.adminEmail
      );
      const enteredHostIsValid = !_.isEmpty(this.formData.host);
      const enteredDataSourcesAreValid = this.validateSelectedDataSources(
        this.formData.selectedDataSources
      );

      this.formInputsValidity = {
        ...this.formInputsValidity,
        tenantId: enteredTenantIdIsValid,
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
      this.error = null;
      this.success = false;

      this.validateFormInputs();

      const formIsValid = _.every(
        _.values(this.formInputsValidity),
        (l) => !!l
      );

      if (!formIsValid) {
        return;
      }

      this.isLoading = true;
      try {
        const response = await submitNewTenantForm(this.formData);

        if (response?.status === 'success') {
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 5000);
        }

        if (response?.status === 'fail') {
          this.error = `Form submission failed ${
            response?.message ? `- ${response?.message}` : ''
          }`;
        }
      } catch (e) {
        this.error = e;
      }
      this.isLoading = false;
    },
  },
};
</script>

<template>
  <div class="tw-w-full tw-h-full tw-py-5">
    <div class="tw-bg-white tw-px-6">
      <div
        class="tw-w-full tw-flex tw-items-center tw-py-4 tw-border-b tw-border-solid tw-border-brand-gray-2"
      >
        <span class="tw-text-xl tw-font-bold tw-text-black">
          ADD NEW CLIENT
        </span>
        <div class="tw-ml-auto tw-flex tw-gap-x-4">
          <button
            class="tw-px-10 tw-py-2 tw-border tw-border-solid tw-border-brand-primary"
            @click="$emit('closeForm')"
          >
            <span class="tw-text-base tw-text-brand-primary"> Back </span>
          </button>
        </div>
      </div>
      <div
        class="tw-w-full tw-h-[60vh] tw-flex tw-justify-center tw-items-center"
        v-if="isLoading"
      >
        <v-progress-circular
          indeterminate
          color="#7823DC"
          :size="80"
          :width="10"
        />
      </div>
      <div class="tw-py-4">
        <v-form
          v-if="!isLoading"
          validate-on="submit"
          @submit.prevent="submitHandler"
          ref="form"
        >
          <div class="tw-flex tw-flex-col tw-gap-2 tw-pb-4">
            <div
              class="tw-w-full tw-text-lg tw-font-bold tw-text-brand-secondary-70"
            >
              Basic Information
            </div>
            <v-row>
              <v-col cols="12" sm="6">
                <label for="tenantId" class="tw-text-sm">
                  Client ID (Optional)
                </label>
                <v-text-field
                  id="tenantId"
                  v-model="formData.tenantId"
                  :rules="tenantIdRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <label for="name" class="tw-text-sm">Client Name</label>
                <v-text-field
                  id="name"
                  v-model="formData.name"
                  :rules="generalRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <label for="phone" class="tw-text-sm">Contact Number</label>
                <v-text-field
                  id="phone"
                  v-model="formData.phone"
                  :rules="generalRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <label for="adminEmail" class="tw-text-sm">Email Address</label>
                <v-text-field
                  id="adminEmail"
                  v-model="formData.adminEmail"
                  :rules="adminEmailRule"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <div class="tw-flex tw-flex-col tw-gap-2 tw-pb-4">
            <div
              class="tw-w-full tw-text-lg tw-font-bold tw-text-brand-secondary-70"
            >
              Account Set-up Details
            </div>
            <div>
              <v-row>
                <v-col cols="12" sm="4">
                  <label for="chosenModel" class="tw-text-sm">Model</label>
                  <v-select
                    id="chosenModel"
                    :items="availableModels"
                    v-model="formData.chosenModel"
                    multiple
                    :rules="chosenModelRules"
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <label for="frequency" class="tw-text-sm">Frequency</label>
                  <v-text-field
                    id="frequency"
                    v-model="formData.frequency"
                    type="number"
                    :rules="generalRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <label for="host" class="tw-text-sm">Host</label>
                  <v-text-field
                    id="host"
                    v-model="formData.host"
                    :rules="generalRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <label for="selectedClientDataSources" class="tw-text-sm">
                    Client Specific Data Sources
                  </label>
                  <v-select
                    id="selectedClientDataSources"
                    :items="availableClientDataSources"
                    v-model="formData.selectedClientDataSources"
                    multiple
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <label for="selectedDataSources" class="tw-text-sm">
                    External Data Sources
                  </label>
                  <v-select
                    id="selectedDataSources"
                    :items="availableDataSources"
                    v-model="formData.selectedDataSources"
                    :error-messages="
                      formInputsValidity.selectedDataSources
                        ? ''
                        : selectedDataSourcesError
                    "
                    multiple
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <label for="categories" class="tw-text-sm"
                    >Categories (Enter values separated by commas)</label
                  >
                  <v-text-field
                    id="categories"
                    v-model="formData.categories"
                    :rules="generalRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <label for="start-date-picker" class="tw-text-sm">
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
                    {{ startDateError || 'Start Date is required' }}
                  </span>
                </v-col>
                <v-col cols="12" sm="3">
                  <label for="end-date-picker" class="tw-text-sm">
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
            </div>
          </div>
          <div class="tw-flex tw-justify-between tw-gap-x-6 tw-pb-4">
            <div class="tw-w-full">
              <v-alert
                v-if="error"
                type="error"
                :text="error.toString()"
                density="compact"
                closable
              ></v-alert>
              <v-alert
                v-if="success"
                type="success"
                text="New client record added successfully"
                density="compact"
                closable
              ></v-alert>
            </div>
            <button
              type="submit"
              class="tw-px-20 tw-py-2 tw-text-white tw-bg-brand-primary"
            >
              Submit
            </button>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<style>
.dp-custom-menu {
  background: #ffffff;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  padding: 8px;
}
</style>
