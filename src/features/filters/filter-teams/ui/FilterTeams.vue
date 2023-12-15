<script lang="ts" setup>
import { UiButton, UiInput } from '@/shared';
import { ref } from 'vue';

const search = ref('');
</script>

<template>
	<div class="filter-teams">
		<div class="filter-teams__item">
			<UiInput is-search v-model="search" />
		</div>
		<div class="filter-teams__item"></div>
		<div class="filter-teams__item">
			<div class="add-btn">
				<UiButton>Add <template #right>+</template></UiButton>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.filter-teams {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 32px;

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
}
</style>