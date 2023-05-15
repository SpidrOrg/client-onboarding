<script>
import fetchOnboardingHistory from '@/api/fetchOnboardingHistory';

export default {
  name: 'OnboardingHistory',
  data() {
    return {
      isLoading: true,
      error: null,
      apiData: [],
    };
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetchOnboardingHistory();
        this.apiData = response;
        console.log(this.apiData);
      } catch (e) {
        this.error = e;
      }
      this.isLoading = false;
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
<template>
  <div />
</template>
