<script lang="ts" setup>
import { PlayerModel, useTeamsStore } from '@/entities';
import { storeToRefs } from 'pinia';
import { PropType, computed } from 'vue';
import Person from '@/shared/assets/img/icons/person.svg';


const props = defineProps({
	card: {
		type: Object as PropType<PlayerModel>
	}
})

const { allTeams } = storeToRefs(useTeamsStore());

const teamName = computed(() => {
	if (allTeams.value) {
		const findTeam = allTeams.value.teams.find(x => x.id == props.card.team);
		if (findTeam) {
			return findTeam.name;
		}
	}
	return 'No team';
})

</script>

<template>
	<div class="player-card">
		<div class="player-card__image">
			<img :src="card.avatarUrl || Person" />
		</div>
		<div class="player-card__info">
			<div class="team-name">{{ card.name }} <span class="team-name__number">#{{ card.number }}</span></div>
			<div class="team-year">{{ teamName }}</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.player-card {
	border-radius: 4px;
	background: linear-gradient(122deg, $gray 1.62%, $dark-gray 81.02%);
	aspect-ratio: 0.958;
	width: 100%;
	display: flex;
	flex-direction: column;
	transition: 0.15s ease-in-out;

	&__image {
		max-width: 100%;
		margin: 0 44px;
		flex-grow: 1;
		display: flex;
		align-items: flex-end;

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

			&__number {
				color: $light-red;
			}
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
			margin: 0 24px;
		}

		&__info {
			text-align: center;
			height: 76px;

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