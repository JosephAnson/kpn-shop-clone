<template>
  <div class="collapse border-b-1 mb-3">
    <div
      class="collapse-label mb-2 flex justify-between py-2"
      :class="{ 'text-secondary-600': open }"
      @click="open = !open"
    >
      <span>{{ label }}</span>
      <span class="material-icons" v-text="open ? 'expand_more' : 'expand_less'"></span>
    </div>
    <div v-show="open">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollapseComponent',
  props: {
    label: { type: String, required: true }
  },
  data() {
    return {
      open: false
    };
  }
};
</script>
