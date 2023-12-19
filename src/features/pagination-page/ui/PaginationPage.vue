<script lang="ts" setup>
import { UiSelect, UiPagination, SelectOptionModel } from "@/shared";
import { PaginationModel } from "./../models"
import { computed, nextTick, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
	count: {
		type: Number,
		default: 1
	},
	page: {
		type: Number,
		default: 1
	}
})

const innerPage = computed({
	get: () => props.page,
	set: (value) => {
		emit('update:page', value);
	}
})

const updateHandler = async (val: number) => {
	innerPage.value = val;
	await nextTick();
	updateQuery();
}

const selectTwo = ref(new SelectOptionModel({ name: '6', value: 6 }))
const selectOptionsTwo = ref([
	new SelectOptionModel({ name: '6', value: 6 }),
	new SelectOptionModel({ name: '12', value: 12 }),
	new SelectOptionModel({ name: '24', value: 24 }),
])

const route = useRoute();
const router = useRouter();
const emit = defineEmits(['update', 'update:page']);

const updateQuery = () => {
	emit('update', new PaginationModel({
		page: innerPage.value,
		size: selectTwo.value.value,
	}))


	router.push({
		query: {
			page: innerPage.value + '',
			size: selectTwo.value.name,
		}
	})
}

const onSelect = async () => {
	innerPage.value = 1;
	await nextTick();
	updateQuery();
}

onMounted(async () => {
	if (route.query?.page && typeof route.query?.page === 'string') {
		innerPage.value = +route.query.page
	}
	if (route.query?.size && typeof route.query?.size === 'string') {
		selectTwo.value.name = route.query.size
		selectTwo.value.value = +route.query.size
	}
	await nextTick();
	updateQuery();
})

</script>

<template>
	<div class="pagination-page">
		<UiPagination v-model="innerPage" :pages="count" :range-size="1" @update:modelValue="updateHandler"></UiPagination>
		<UiSelect :clearable="false" @update:model-value="onSelect" v-model="selectTwo" :options="selectOptionsTwo"></UiSelect>
	</div>
</template>

<style lang="scss" scoped>
.pagination-page {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 12px;
}
</style>