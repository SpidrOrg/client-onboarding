<script>
import _ from 'lodash';
import submitNewTenantForm from "@/api/newTenantSubmit/submitNewTenantForm";

const MODELS = ['rf', 'svr'];
const ALL_OPTION = 'All';

export default {
  name: 'ClientOnboardingForm',
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

          return 'Admin Email is required';
        },
      ],
      frequencyRule: [
        (value) => {
          if (isNaN(value)) {
            return 'Frequency should be a number';
          }
          if (value) return true;

          return 'Frequency is required.';
        },
      ],
      hostRule: [
        (value) => {
          if (value) return true;

          return 'Host is required.';
        },
      ],
      nameRule: [
        (value) => {
          if (value) return true;

          return 'Name is required.';
        },
      ],
      phoneRule: [
        (value) => {
          if (value) return true;

          return 'Phone number is required.';
        },
      ],
      chosenModelRule: [
        (value) => {
          if (_.size(value) < 1) return 'At least 1 model must be selected';

          return true;
        },
      ],
      categoriesRule: [
        (value) => {
          if (value) return true;

          return 'categories are required.';
        },
      ],
      selectedDataSourcesRule: [
        (value) => {
          if (!_.includes(value, 'IHS')) return "'IHS' must be selected";
          if (_.size(value) < 2) return 'At least 2 sources must be selected';

          return true;
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
    };
  },
  methods: {
    async submitHandler() {
      this.isLoading = true;
      const response = await submitNewTenantForm(this.formData);
      console.log(response);
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
            :rules="nameRule"
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
            :rules="phoneRule"
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
            :rules="chosenModelRule"
            multiple
          />
        </v-col>
        <v-col cols="12" sm="4">
          <label for="frequency" class="tw-text-base">Frequency</label>
          <v-text-field
            id="frequency"
            v-model="formData.frequency"
            type="number"
            :rules="frequencyRule"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <label for="host" class="tw-text-base">Host</label>
          <v-text-field
            id="host"
            v-model="formData.host"
            :rules="hostRule"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
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
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <label for="categories" class="tw-text-base"
            >Categories (Comma Separated Values)</label
          >
          <v-text-field
            id="categories"
            v-model="formData.categories"
            :rules="categoriesRule"
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
