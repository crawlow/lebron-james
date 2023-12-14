<template>
	<ul class="ui-pagination">
		<li v-if="!hideFirstButton" class="pagination-control">
			<img src="@/shared/assets/img/icons/pagination/page-first.svg" class="control" :class="{ 'active': isPrevControlsActive }" @click="goToFirst" />
		</li>
		<li class="pagination-control" @click="goToPrev">
			<img src="@/shared/assets/img/icons/chevron_right_24px.svg" class="control left" :class="{ 'active': isPrevControlsActive }" />
		</li>
		<PaginationItem v-for="page in pagination" :key="`pagination-page-${page}`" :page="page" :current="modelValue" @update="updatePageHandler" />
		<li class="pagination-control" @click="goToNext">
			<img src="@/shared/assets/img/icons/chevron_right_24px.svg" class="control" :class="{ 'active': isNextControlsActive }" />
		</li>
		<li v-if="!hideLastButton" class="pagination-control">
			<img src="@/shared/assets/img/icons/pagination/page-last.svg" class="control" :class="{ 'active': isNextControlsActive }" @click="goToLast" />
		</li>
	</ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import PaginationItem from './PaginationItem.vue';

const props = defineProps({
	pages: {
		type: Number,
		default: 0,
	},
	rangeSize: {
		type: Number,
		default: 1,
	},
	modelValue: {
		type: Number,
		default: 0,
	},
	hideFirstButton: {
		type: Boolean,
		default: true,
	},
	hideLastButton: {
		type: Boolean,
		default: true,
	},
})
const emit = defineEmits(['update:modelValue'])

const pagination = computed((): (number | null)[] => {
	const res = [];
	const minPaginationElems = 4 + props.rangeSize * 2;

	let rangeStart = props.pages <= minPaginationElems ? 1 : props.modelValue - props.rangeSize;
	let rangeEnd =
		props.pages <= minPaginationElems ? props.pages : props.modelValue + props.rangeSize;

	rangeEnd = rangeEnd > props.pages ? props.pages : rangeEnd;
	rangeStart = rangeStart < 1 ? 1 : rangeStart;

	if (props.pages > minPaginationElems) {
		const isStartBoundaryReached = rangeStart - 1 < 3;
		const isEndBoundaryReached = props.pages - rangeEnd < 3;

		if (isStartBoundaryReached) {
			rangeEnd = minPaginationElems - 2;
			for (let i = 1; i < rangeStart; i++) {
				res.push(i);
			}
		} else {
			res.push(1);
			res.push(null);
		}

		if (isEndBoundaryReached) {
			rangeStart = props.pages - (minPaginationElems - 3);
			for (let i = rangeStart; i <= props.pages; i++) {
				res.push(i);
			}
		} else {
			for (let i = rangeStart; i <= rangeEnd; i++) {
				res.push(i);
			}
			res.push(null);
			res.push(props.pages);
		}
	} else {
		for (let i = rangeStart; i <= rangeEnd; i++) {
			res.push(i);
		}
	}

	return res;
});

const updatePageHandler = (params: number) => {
	emit('update:modelValue', params);
}

const isPrevControlsActive = computed((): boolean => {
	return props.modelValue > 1;
});
const isNextControlsActive = computed((): boolean => {
	return props.modelValue < props.pages;
});

const goToFirst = () => {
	if (isPrevControlsActive.value) {
		emit('update:modelValue', 1);
	}
}
const goToPrev = () => {
	if (isPrevControlsActive.value) {
		emit('update:modelValue', props.modelValue - 1);
	}
}

const goToLast = () => {
	if (isNextControlsActive.value) {
		emit('update:modelValue', props.pages);
	}
}
const goToNext = () => {
	if (isNextControlsActive.value) {
		emit('update:modelValue', props.modelValue + 1);
	}
}
</script>

<style scoped lang="scss">
.ui-pagination {
	display: flex;
	flex-flow: row;
	flex-wrap: wrap;
	align-items: center;
	margin: 0;
	padding: 0;
	list-style-type: none;
	gap: 16px;

	.pagination-control {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		cursor: pointer;
		background-color: #fff;
		border-radius: 4px;

		&:hover {
			border: 1px solid $lightest-gray;
		}
	}

	.control {
		position: relative;
		display: block;
		width: 18px;
		height: 18px;
		user-select: none;

		&.left {
			transform: rotate(180deg);
		}
	}
}
</style>