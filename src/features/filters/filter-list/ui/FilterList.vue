<script lang="ts" setup>
import { UiButton, UiInput } from '@/shared';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import debounce from "lodash.debounce"

const router = useRouter();

const emit = defineEmits(['search', 'add']);

const search = ref('')

const onUpdateValue = (value: string) => {
	emit('search', value)
}

const debounceSearch = debounce(onUpdateValue, 1000)

const onAddTeam = () => {
	emit('add');
}

</script>

<template>
	<div class="filter-list">
		<div class="filter-list__item">
			<UiInput v-model="search" placeholder="Search..." is-search @update:model-value="debounceSearch" />
		</div>
		<div class="filter-list__item">
			<slot />
		</div>
		<div class="filter-list__item">
			<div class="add-btn">
				<UiButton @click="onAddTeam">Add <template #right>+</template></UiButton>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.filter-list {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 24px;

	&__item {
		.add-btn {
			display: flex;
			justify-content: flex-end;
			width: 100%;
		}
	}

	@include media('<desktop') {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 8px;

		&__item {
			.add-btn {
				display: flex;
				justify-content: flex-end;
				width: 100%;

				.ui-button {
					width: 100%;
				}
			}
		}
	}

	@include media('>large-desktop') {
		gap: 48px;
	}
}
</style>