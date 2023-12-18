<script lang="ts" setup>
import { FilterPlayers, FilterPlayersModel, PaginationModel, PaginationPage } from '@/features';
import { PlayerModel, RequestPlayerModel, usePlayerStore } from '@/entities'
import Dribbling from "@/shared/assets/img/illlustrations/dribbling.svg";

import { useRouter } from "vue-router";
import { ref } from 'vue';
import { Error, ErrorModel } from '@/widgets';
import PlayerCard from '@/features/player/ui/PlayerCard.vue';

const { getPlayers } = usePlayerStore();
const router = useRouter();
const playerList = ref<Array<PlayerModel>>()
const notFound = ref<ErrorModel>(new ErrorModel({
	description: 'Add new players to continue',
	img: Dribbling
}))
const page = ref(new PaginationModel({
	count: 1,
	page: 1,
	size: 6
}))
const search = ref('')
const teamIds = ref<Array<number>>([])
const onSearch = async (val: FilterPlayersModel) => {
	search.value = val.name;
	teamIds.value = val.teamIds;
	page.value.page = 1;
	const res = await getPlayers(new RequestPlayerModel({
		name: search.value,
		page: page.value.page,
		pageSize: page.value.size,
		teamIds: teamIds.value
	}));
	playerList.value = res
}

const onAddPlayer = () => {
	router.push({name: 'player' });
}

const onPagination = async (val: PaginationModel) => {
	page.value.page = val.page;
	page.value.size = val.size;
	const res = await getPlayers(new RequestPlayerModel({
		name: search.value,
		page: page.value.page,
		pageSize: page.value.size,
		teamIds: teamIds.value
	}));
	playerList.value = res
}

const onDetail = (id: number) => {
	router.push({ name: 'player-detail', params: { id: id } });
}
</script>
<template>
	<FilterPlayers @search="onSearch" @add="onAddPlayer" />
	<div class="list-wrapper">
		<div class="players-list" v-if="playerList && playerList.length">
			<PlayerCard v-for="card in playerList" :card="card" @click="onDetail(card.id)" />
		</div>
		<Error v-else :error="notFound" />
	</div>
	<PaginationPage @update="onPagination" />
</template>

<style lang="scss" scoped>
.list-wrapper {
	flex-grow: 1;
	display: flex;
	padding: 32px 0;

	.players-list {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 24px;
		flex-grow: 1;

		@include media('>large-desktop') {
			gap: 48px;
		}

	}

	@include media('<tablet') {
		padding: 16px 0;

		.players-list {
			grid-template-columns: 1fr 1fr;
			gap: 12px;
		}
	}
}
</style>