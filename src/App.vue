<script>
import _ from 'lodash';
import jwt_decode from 'jwt-decode';
import { setIdpData, getAuthDetails } from './idpUtils';
import Login from "./components/Login.vue";
import LandingPage from "@/components/LandingPage.vue";

export default {
  name: 'App',
  components: {
    Login,
    LandingPage
  },
  props: {
    idpConfig: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      isLoggedIn: false,
      loading: true,
      loggedInUserData: {},
    };
  },
  created() {
    setIdpData(this.idpConfig);
  },
  async mounted() {
    const { token, userPoolId } = await getAuthDetails();
    this.userHasAuthenticated(!!token, token, userPoolId);
  },
  methods: {
    userHasAuthenticated(autheticated, token, usrPoolId) {
      this.isLoggedIn = autheticated;
      this.loading = false;
      if (autheticated) {
        this.loggedInUserData.token = token;
        this.loggedInUserData.userPoolId = usrPoolId;
        const jwtDecoded = jwt_decode(token);
        this.loggedInUserData.deocdedJWT = jwtDecoded;
        this.loggedInUserData.isAdmin =
          _.filter(
            _.get(jwtDecoded, "['cognito:groups']", []),
            (v) => v === 'admin'
          ).length > 0;
        this.loggedInUserData.userName =
          _.get(jwtDecoded, 'name', null) ?? _.get(jwtDecoded, 'email', '---');
      } else {
        this.loggedInUserData.token = null;
        this.loggedInUserData.userPoolId = null;
      }
    },
  },
};
</script>

<template>
  <Login v-if="!isLoggedIn && !loading" />
  <LandingPage v-if="isLoggedIn && !loading" />
</template>
