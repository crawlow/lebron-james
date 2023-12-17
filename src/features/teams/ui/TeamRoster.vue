<script lang="ts" setup>
import { PlayerModel } from '@/entities';
import { onMounted, ref } from 'vue';
import { BolBol1, BolBol2, BolBol3, BolBol4, BolBol5, BolBol6, BolBol7 } from "@/shared/assets/img/roster"


const props = defineProps({
	teamId: {
		type: Number,
		required: true
	}
});

const roster = ref<Array<PlayerModel>>([])

const initRoster = async () => {
	roster.value.push(new PlayerModel({
		avatarUrl: BolBol1,
		birthday: new Date('01.01.2022'),
		height: 218,
		id: 1521,
		name: 'Bol Bol',
		number: 10,
		position: 'Centerforward',
		team: 551,
		teamName: 'Denver Nuggets',
		weight: 100
	}));
	roster.value.push(new PlayerModel({
		avatarUrl: BolBol2,
		birthday: new Date('01.01.2022'),
		height: 218,
		id: 1521,
		name: 'Bol Bol',
		number: 10,
		position: 'Centerforward',
		team: 551,
		teamName: 'Denver Nuggets',
		weight: 100
	}));
	roster.value.push(new PlayerModel({
		avatarUrl: BolBol3,
		birthday: new Date('01.01.2022'),
		height: 218,
		id: 1521,
		name: 'Bol Bol',
		number: 10,
		position: 'Centerforward',
		team: 551,
		teamName: 'Denver Nuggets',
		weight: 100
	}));
	roster.value.push(new PlayerModel({
		avatarUrl: BolBol4,
		birthday: new Date('01.01.2022'),
		height: 218,
		id: 1521,
		name: 'Bol Bol',
		number: 10,
		position: 'Centerforward',
		team: 551,
		teamName: 'Denver Nuggets',
		weight: 100
	}));
	roster.value.push(new PlayerModel({
		avatarUrl: BolBol5,
		birthday: new Date('01.01.2022'),
		height: 218,
		id: 1521,
		name: 'Bol Bol',
		number: 10,
		position: 'Centerforward',
		team: 551,
		teamName: 'Denver Nuggets',
		weight: 100
	}));
	roster.value.push(new PlayerModel({
		avatarUrl: BolBol6,
		birthday: new Date('01.01.2022'),
		height: 218,
		id: 1521,
		name: 'Bol Bol',
		number: 10,
		position: 'Centerforward',
		team: 551,
		teamName: 'Denver Nuggets',
		weight: 100
	}));
}

const calculateAge = (birthdate: Date): number => {
	const currentDate = new Date();
	const age =
		currentDate.getFullYear() -
		birthdate.getFullYear() -
		(currentDate < new Date(currentDate.getFullYear(), birthdate.getMonth(), birthdate.getDate()) ? 1 : 0);
	return age;
};

onMounted(async () => {
	// GET PLAYERS
	await initRoster();
})

</script>

<template>
	<div class="team-roster">
		<div class="team-roster-header">Roster</div>
		<div class="team-roster-table table">
			<div class="table-header">
				<div class="table-row">
					<div class="table-col">#</div>
					<div class="table-col">Player</div>
					<div class="table-col">Height</div>
					<div class="table-col">Weight</div>
					<div class="table-col">Age</div>
				</div>
			</div>
			<div class="table-body">
				<div class="table-row" v-for="player in roster">
					<div class="table-col">{{ player.number }}</div>
					<div class="table-col">
						<div class="player">
							<img :src="player.avatarUrl" />
							<div class="player-info">
								<div class="player-info__name">{{ player.name }}</div>
								<div class="player-info__position">{{ player.position }}</div>
							</div>
						</div>
					</div>
					<div class="table-col">{{ player.height }} cm</div>
					<div class="table-col">{{ player.weight }} kg</div>
					<div class="table-col">{{ calculateAge(player.birthday) }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.team-roster {
	background-color: #fff;
	border: 0.5px solid $light-gray;
	color: $gray;
	border-radius: 10px;
	margin-top: 24px;

	.team-roster-header {
		padding: 14px 32px;
		font-size: 18px;
		font-weight: 500;
	}

	.team-roster-table {
		.table {
			&-header {

				.table-row {
					padding: 10px 32px;
				}
			}

			&-row {
				display: grid;
				grid-template-columns: 60px 1fr 128px 120px 28px;
				border-top: 0.5px solid $light-gray;
				padding: 0 32px;
			}

			&-col {
				display: flex;
				align-items: center;
			}
		}

		.player {
			display: flex;
			align-items: center;
			gap: 10px;
			padding: 7px 0;

			&-info {
				display: flex;
				flex-direction: column;
				line-height: 21px;

				&__name {
					font-size: 14px;
				}

				&__position {
					font-size: 12px;
					color: $light-gray;
				}
			}
		}
	}
}
</style>