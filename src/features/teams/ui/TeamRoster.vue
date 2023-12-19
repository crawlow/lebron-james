<script lang="ts" setup>
import router from '@/app/router';
import { PlayerModel, usePlayerStore } from '@/entities';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Person from '@/shared/assets/img/icons/person.svg'


const props = defineProps({
	teamId: {
		type: Number,
		required: true
	}
});

const roster = ref<Array<PlayerModel>>([])
const route = useRoute();
const { getPlayers } = usePlayerStore();

const initRoster = async () => {
	const teamId = route.params.id ? +route.params.id : undefined;
	if (teamId) {
		const res = await getPlayers({
			teamIds: [teamId]
		})
		if (res) {
			roster.value = res.players.filter(x => x.team == teamId);
		}
	}
}

const calculateAge = (birthdate: string): number => {
	const date = new Date(birthdate);
	const currentDate = new Date();
	const age =
		currentDate.getFullYear() -
		date.getFullYear() -
		(currentDate < new Date(currentDate.getFullYear(), date.getMonth(), date.getDate()) ? 1 : 0);
	return age;
};

const onClickPlayer = (id: number) => {
	router.push({ name: 'player-detail', params: { id: id } })
}

onMounted(async () => {
	initRoster();
})

</script>

<template>
	<div class="team-roster" v-if="roster && roster.length">
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
				<div class="table-row" @click="onClickPlayer(player.id)" v-for="player in roster">
					<div class="table-col">{{ player.number }}</div>
					<div class="table-col">
						<div class="player">
							<div class="player-avatar">
								<img :src="player.avatarUrl || Person" />
							</div>
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
	background-color: $white;
	border: 0.5px solid $light-gray;
	color: $gray;
	border-radius: 10px;
	margin-top: 24px;
	overflow: auto;

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

			&-body {
				.table-row {
					transition: 0.15s ease-in-out;

					&:hover {
						cursor: pointer;
						background-color: $superlight-gray;
					}
				}
			}

			&-row {
				display: grid;
				grid-template-columns: 60px minmax(224px, 1fr) 128px 120px 28px;
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


			&-avatar {
				display: flex;
				height: 38px;
				width: 50px;
				align-items: center;
				justify-content: center;

				img {
					max-width: 100%;
					max-height: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

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

	@include media('<tablet') {
		margin: 24px -16px 0;
		border-radius: 0;

		.team-roster-header {
			font-size: 15px;
			font-weight: 500;
			line-height: 24px;
			padding: 12px 16px;

		}


		.team-roster-table {
			.table-header {
				.table-row {
					padding: 10px 16px;
				}
			}

			.table {

				.table-row {
					padding: 10px 16px;
				}

				&-row {
					display: inline-grid;
					min-width: 100%;
					padding: 0 16px;
				}
			}
		}
	}
}
</style>