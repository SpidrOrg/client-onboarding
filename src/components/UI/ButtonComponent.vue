<script>
export default {
  name: 'ButtonComponent',
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'primary',
      required: false,
      validator(value) {
        const acceptedValues = ['primary', 'secondary'];
        return acceptedValues.indexOf(value) >= 0;
      },
    },
  },
  computed: {
    buttonClasses() {
      let styles = 'tw-px-4 tw-py-2 tw-text-white';

      switch (this.type) {
        case 'primary':
          styles += ' tw-bg-brand-primary';
          break;
        case 'secondary':
          styles += ' tw-bg-brand-secondary';
          break;
        default:
      }

      return styles;
    },
  },
};
</script>

<template>
  <button :class="buttonClasses">
    {{ label }}
  </button>
</template>
