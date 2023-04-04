<template>
<v-progress-circular indeterminate color="#7823DC"  :size="70" :width="7" style="position: fixed;left: 50%;top: 35%;z-index: 1000;" v-if="isLoading"/>
<v-container v-else>
    <v-row>
        <v-col cols="12" sm="6">
            <v-img src="../assets/login-page.webp"/>
        </v-col>
        <v-col cols="12" sm="6" class="p-12">
            <h1 class="text-center">CLIENT ONBOARDING</h1>
            <h5 class="text-center">Sign in for client onboarding</h5>
            <div class="text-center pt-15">
                <p>Client onboarding is the process of integrating new clients into a business and establishing a strong and productive working relationship. 
                It is a crucial step in the client-business relationship as it sets the tone for future interactions and helps build trust and mutual understanding</p>
                <p class="mt-10">Welcoming new clients into your business, addressing their questions and concerns, and ensuring they understand the services available to them.</p>
                <p class="mt-10">One of the most obvious benefits of a successful client onboarding process is continued service from your client. When you lose a client it means that all the time spent on marketing, developing the relationship, drafting proposals, and investing your time to meet with them has all gone to waste.</p>
            </div>
            <div class="text-center pt-15 mt-15">
                <v-btn size="x-large" color="success" @click="signinClicked">SIGN IN</v-btn>
            </div>
        </v-col>
    </v-row>
</v-container>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
        isLoading:false
    }
  },
  methods:{
    signinClicked() {
        setTimeout(() => {
            this.isLoading = true
            this.$router.push('/home')
        },2000)
    }
  }
}
</script>
<style>
</style>