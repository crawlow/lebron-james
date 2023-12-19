<script lang="ts" setup>
import { TeamModel } from '@/entities';
import { PropType } from 'vue';
import GroupPerson from '@/shared/assets/img/icons/group_person.svg';

const props = defineProps({
	card: {
		type: Object as PropType<TeamModel>
	}
})

</script>

<template>
	<div class="teams-card">
		<div class="teams-card__image">
			<img :src="card.imageUrl || GroupPerson" />
		</div>
		<div class="teams-card__info">
			<div class="team-name">{{ card.name }}</div>
			<div class="team-year">Year of foundation: {{ card.foundationYear }}</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.teams-card {
	border-radius: 4px;
	background: linear-gradient(122deg, $gray 1.62%, $dark-gray 81.02%);
	aspect-ratio: 0.958;
	width: 100%;
	display: flex;
	flex-direction: column;
	transition: 0.15s ease-in-out;

	&__image {
		max-width: 42%;
		aspect-ratio: 1;
		margin: auto;
		flex-grow: 1;
		display: flex;
		align-items: center;

		img {
			width: 100%;
		}
	}

	&__info {
		height: 100px;
		background-color: $dark-gray;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		margin-top: auto;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		line-height: 24px;

		.team-name {
			font-size: 18px;
			font-weight: 500;
			color: #fff;
			margin-bottom: 8px;
		}

		.team-year {
			font-size: 14px;
			color: $light-gray;
		}
	}

	&:hover {
		transform: scale(1.03);
		filter: brightness(1.25);
	}

	@include media('<tablet') {
		aspect-ratio: 0.94;

		&__image {
			max-width: 30%;
		}

		&__info {
			text-align: center;
			height: 94px;

			.team-name {
				font-size: 15px;
			}

			.team-year {
				font-size: 13px;
			}
		}
	}

	@media (max-width: 480px) {
		aspect-ratio: 0.84;
	}
}
</style>