<script>
import axios from 'axios';
import { logout } from '../idpUtils';

  export default {
  name: "LandingPage",
  data(){
    return {
      isLoading:false,
      clientOnboarding:false,
      addressrule: [
        value => {
          if (value) return true

          return 'Address is required field'
        },
      ],
      admin_emailrule: [
        value => {
          var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

          if (!value.match(validRegex)) {
            return 'THe value should be an email'
          }
          if (value) return true

          return 'Admin Email is required field'
        },
      ],
      asset_pathrule: [
        value => {
          if (value) return true

          return 'Asset Path is required field'
        },
      ],
      config_pathrule: [
        value => {
          if (value) return true

          return 'Config path is required field.'
        },
      ],
      frequencyrule: [
        value => {
          if(isNaN(value)){
            return 'Frequency should be a number'
          }
          if (value) return true

          return 'Frequency is required field.'
        },
      ],
      choosen_modelrule:[
        value => {
          if (value) return true

          return 'Model is required field.'
        },
      ],
      hostrule: [
        value => {
          if (value) return true

          return 'Host is required field.'
        },
      ],
      lookbackrule: [
        value => {
          if(isNaN(value)){
            return 'Lookback should be a number'
          }
          if (value) return true

          return 'Lookback is required field.'
        },
      ],
      namerule: [
        value => {
          if (value) return true

          return 'Name is required field.'
        },
      ],
      phonerule: [
        value => {
          if (value) return true

          return 'Phone is required field.'
        },
      ],
      formData:{
        "address":'',
        "admin_email":'',
        "asset_path":'',
        "choosen_model":'',
        "config_path":'',
        "frequency":'',
        "host":'',
        "lookback":'',
        "name":'',
        "phone":''
      }
    }
  },
  methods:{
    clientOnboardingFunc() {
      this.isLoading = true
      setTimeout(() => {
        this.clientOnboarding = true
        this.isLoading = false
      },1500)
    },
    handleLogout(){
      logout()
    },
    async submit (event) {
      let vm = this;
      const { valid } = await this.$refs.form.validate()

        if (!valid) return;
         axios.post('http://localhost:3000/clientdata', this.formData)
        .then(function (response) {
          console.log(response);
          setTimeout(() => {
            vm.isLoading = true
            vm.clientOnboarding = false
            vm.isLoading = false
            alert('Your response is submitted !');
            console.log(response);
            this.formData = {
                              "address":'',
                              "admin_email":'',
                              "asset_path":'',
                              "choosen_model":'',
                              "config_path":'',
                              "frequency":'',
                              "host":'',
                              "lookback":'',
                              "name":'',
                              "phone":''
                            }
          },1500);
        })
        .catch(function (error) {
          console.log(error);
        });

      },
      async checkApi (data) {
        console.log(data);
        return new Promise(resolve => {
          clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            // if (!userName) return resolve('Please enter a user name.')
            // if (!userName) return resolve('Please enter a user name.')
            // if (!userName) return resolve('Please enter a user name.')
            // if (!userName) return resolve('Please enter a user name.')
            // if (!userName) return resolve('Please enter a user name.')
            // if (!userName) return resolve('Please enter a user name.')
            // if (!userName) return resolve('Please enter a user name.')
            // if (!userName) return resolve('Please enter a user name.')
            // if (!userName) return resolve('Please enter a user name.')
            // if (!userName) return resolve('Please enter a user name.')
            // if (!userName) return resolve('Please enter a user name.')
            // if (userName === 'johnleider') return resolve('User name already taken. Please try another one.')

            return resolve(true)
          }, 1000)
        })
      },
  }
}
</script>
<template>
  <v-btn class="float-right mr-2" @click="handleLogout" color="red">Logout</v-btn>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-progress-circular indeterminate color="#7823DC"  :size="70" :width="7" style="position: fixed;left: 50%;top: 35%;z-index: 1000;" v-if="isLoading"/>
      <div v-if="!clientOnboarding">
        <v-btn density="comfortable" color="primary" class="mr-2" size="x-large" @click="clientOnboardingFunc">CLIENT ONBOARDING</v-btn>
        <v-btn density="comfortable" color="warning" size="x-large">SHOW HISTORY</v-btn>
      </div>
      <div v-else-if="clientOnboarding">
        <v-sheet class="mx-auto">
          <h1 class="mb-2">CLIENT ONBOARDING</h1>
          <v-form validate-on="submit" @submit.prevent="submit" ref="form">
            <v-text-field
              v-model="formData.address"
              :rules="addressrule"
              label="Address"
            ></v-text-field>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="formData.admin_email"
                  :rules="admin_emailrule"
                  label="Admin Email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="formData.choosen_model"
                  label="Select Model"
                  :items="['Item1','Item2','Item3']"
                  multiple
                  :rules="choosen_modelrule"
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="formData.asset_path"
                  :rules="asset_pathrule"
                  label="Asset Path"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="formData.config_path"
                  :rules="config_pathrule"
                  label="Config Path"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="formData.frequency"
                  :rules="frequencyrule"
                  label="Frequency"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="formData.host"
                  :rules="hostrule"
                  label="Host"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="formData.lookback"
                  :rules="lookbackrule"
                  label="LookBack"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="formData.name"
                  :rules="namerule"
                  label="Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="formData.phone"
                  :rules="phonerule"
                  label="Phone"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn type="submit"  class="mt-2" color="success">Submit</v-btn>
          </v-form>
        </v-sheet>
      </div>
    </v-responsive>
  </v-container>
</template>
