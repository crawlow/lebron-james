<script lang="ts" setup>
import { PlayerModel, useTeamsStore } from '@/entities';
import { storeToRefs } from 'pinia';
import Person from '@/shared/assets/img/icons/person.svg';
import { computed } from 'vue';


const props = defineProps({
	player: {
		type: PlayerModel,
		default: new PlayerModel()
	}
})

const { allTeams } = storeToRefs(useTeamsStore());

const teamName = computed(() => {
	if (allTeams.value) {
		const findTeam = allTeams.value.teams.find(x => x.id == props.player.team);
		if (findTeam) {
			return findTeam.name;
		}
	}
	return 'No team';
})

const calculateAge = (birthdate: string): number => {
	const date = new Date(birthdate);
	const currentDate = new Date();
	const age =
		currentDate.getFullYear() -
		date.getFullYear() -
		(currentDate < new Date(currentDate.getFullYear(), date.getMonth(), date.getDate()) ? 1 : 0);
	return age;
};

</script>


<template>
	<div class="player-info">
		<div class="player-info__avatar">
			<img :class="{ 'no-avatar': !player.avatarUrl }" :src="player.avatarUrl || Person" />
		</div>
		<div class="player-info__description">
			<div class="player-info__title">
				{{ player.name }} <span class="player-info__title-number">#{{ player.number }}</span>
			</div>
			<div class="player-info__fields">
				<div class="player-info__field">
					<div class="field-label">Position</div>
					<div class="field-value">{{ player.position }}</div>
				</div>
				<div class="player-info__field">
					<div class="field-label">Team</div>
					<div class="field-value">{{ teamName }}</div>
				</div>
				<div class="player-info__field">
					<div class="field-label">Height</div>
					<div class="field-value">{{ player.height }}</div>
				</div>
				<div class="player-info__field">
					<div class="field-label">Weight</div>
					<div class="field-value">{{ player.weight }}</div>
				</div>
				<div class="player-info__field">
					<div class="field-label">Age</div>
					<div class="field-value">{{ calculateAge(player.birthday) }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.player-info {
	display: flex;
	background: linear-gradient(276deg, $gray 0%, #393939 100.28%);
	border-radius: 0px 0px 10px 10px;
	color: #fff;
	gap: 56px;

	&__description {
		flex-grow: 1;
		padding: 66px 48px 66px 0;
	}

	&__avatar {
		display: flex;
		width: 531px;
		max-width: 100%;
		justify-content: center;
		align-items: flex-end;

		img {
			width: 100%;
		}
	}

	&__title {
		font-size: 36px;
		font-weight: 800;
		line-height: 50px;

		&-number {
			color: $light-red;
			font-weight: 800;
		}
	}

	&__fields {
		margin-top: 40px;
		column-gap: 32px;
		row-gap: 54px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		flex-wrap: wrap;
	}

	&__field {
		display: flex;
		flex-direction: column;
		gap: 8px;

		.field-label {
			font-weight: 800;
			font-size: 24px;
			line-height: 32px;
		}

		.field-value {
			font-size: 18px;
			font-weight: 500;
			line-height: 25px;
		}
	}

	@include media('<desktop') {
		display: flex;
		flex-direction: column;

		&__description {
			padding: 0 0 48px 0;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		&__avatar {
			width: 100%;
			justify-content: center;
			padding-top: 24px;

			img {
				width: auto;
				max-width: 100%;

				&.no-avatar {
					width: 150px;
					height: 150px;
				}
			}
		}

		&__fields {
			display: grid;
			row-gap: 32px;
			column-gap: auto;
			grid-template-columns: 1fr;
			align-items: center;
		}

		&__title {
			text-align: center;
		}

		&__field {
			align-items: center;
		}
	}

	@include media('<tablet') {
		display: grid;
		grid-template-columns: 1fr;
		gap: 48px;

		&__title {
			text-align: center;
			font-size: 17px;
			line-height: 32px;
		}

		&__field {
			align-items: center;
			font-size: 17px;

			.field-label {
				font-size: 17px;
			}

			.field-value {
				font-size: 15px;
			}
		}

		border-radius: 0;
	}
}
</style>