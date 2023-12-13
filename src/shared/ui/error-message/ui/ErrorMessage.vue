<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
	v: {
		type: Object
	}
})

const errorMessage = computed(() => props.v && props.v.$errors && props.v.$errors.length ? props.v.$errors[0].$message : '')

</script>

<template>
	<div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
</template>

<style lang="scss" scoped>
.error-message {
	display: inline-block;
	color: $lightest-red;
	font-size: 12px;
	line-height: 18px;
	margin-top: 2px;
}
</style>