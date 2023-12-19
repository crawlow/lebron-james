<template>
	<li>
		<span v-if="page === null" class="dots-holder">
			...
		</span>
		<button v-else class="page" type="button" :class="{ 'active': isActive }" @click="clickHandler">
			{{ page }}
		</button>
	</li>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
const props = defineProps({
	page: {
		type: Number,
		default: null,
	},
	current: {
		type: Number,
		default: 0,
	},
})
const emit = defineEmits(['update'])

const isActive = computed(() => {
	return props.page === props.current;
});

const clickHandler = () => {
	emit('update', props.page);
}
</script>

<style scoped lang="scss">
.dots-holder {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	box-sizing: border-box;

	@include media('<tablet') {
		width: 28px;
		height: 28px;
	}
}

.page {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	color: $gray;
	font-size: 14px;
	border-radius: 4px;
	box-sizing: border-box;
	border-color: transparent;
	cursor: pointer;
	outline: 0;
	user-select: none;
	transition: 0.15 ease-in-out;

	&:hover {
		border: 1px solid $lightest-gray;
	}

	&.active {
		color: $white;
		background-color: $red;
		border-color: $red;
	}

	@include media('<tablet') {
		width: 28px;
		height: 28px;
	}
}
</style>