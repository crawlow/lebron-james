<script lang="ts" setup>
import { RequestTeamsModel, TeamListModel } from "@/entities";
import { FilterList, PaginationModel, PaginationPage, TeamCard } from "@/features"
import { Error, ErrorModel } from "@/widgets";
import Dank from "@/shared/assets/img/illlustrations/dank.svg";
import { computed, ref } from "vue";
import { useTeamsStore } from "@/entities";
import { useRouter } from "vue-router";

const { getTeams } = useTeamsStore();
const router = useRouter();
const teamsList = ref<TeamListModel>()
const notFound = ref<ErrorModel>(new ErrorModel({
	description: 'Add new teams to continue',
	img: Dank
}))
const page = ref(new PaginationModel({
	count: 1,
	page: 1,
	size: 6
}))
const search = ref('')

const count = computed(() => Math.ceil((teamsList.value?.count || 1) / page.value.size))

const onSearch = async (val: string) => {
	search.value = val;
	page.value.page = 1;
	const res = await getTeams(new RequestTeamsModel({
		search: search.value,
		page: page.value
	}));
	teamsList.value = res
}

const onPagination = async (val: PaginationModel) => {
	page.value.page = val.page;
	page.value.size = val.size;
	const res = await getTeams(new RequestTeamsModel({
		search: search.value,
		page: page.value
	}));
	teamsList.value = res
}

const onDetail = (id: number) => {
	router.push({ name: 'team-detail', params: { id: id } });
}

const onAddTeam = () => {
	router.push({ name: 'team' });
}

</script>
<template>
	<FilterList @search="onSearch" @add="onAddTeam" />
	<div class="list-wrapper">
		<div class="teams-list" v-if="teamsList && teamsList.teams && teamsList.teams.length">
			<TeamCard :card="card" v-for="card in teamsList.teams" @click="onDetail(card.id)" />
		</div>
		<Error v-else :error="notFound" />
	</div>
	<PaginationPage v-model:page="page.page" :count="count" @update="onPagination" />
</template>

<style lang="scss" scoped>
.list-wrapper {
	flex-grow: 1;
	display: flex;
	padding: 32px 0;

	.teams-list {
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

		.teams-list {
			grid-template-columns: 1fr 1fr;
			gap: 12px;
		}
	}
}
</style>