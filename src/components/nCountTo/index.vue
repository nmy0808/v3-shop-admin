<template>
  <div>{{countCalc}}</div>
</template>

<script setup>
import { computed, reactive, watch } from "vue";
import gsap from "gsap";
const props = defineProps({
  value: {
    type: [String, Number],
    default: 0,
  },
	fixed: {
		type: Number,
		default : 2
	},
	duration: {
		type: Number,
		default : 0.8
	}
});

const state = reactive({
	count: 0
});

const countCalc = computed(()=>parseInt(state.count).toFixed(props.fixed))

watch(
  () => props.value,
  () => {
    gsap.to(state, {
      count:parseInt(props.value),
      duration: props.duration
    });
  },
  { immediate: true }
);
</script>

<style scoped lang="scss"></style>
