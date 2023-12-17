<script lang="ts" setup>
import { FilterTeamsModel, TeamModel } from "@/entities";
import { FilterTeams, PaginationModel, PaginationPage, TeamCard } from "@/features"
import { Error, ErrorModel } from "@/widgets";
import Dank from "@/shared/assets/img/illlustrations/dank.svg";
import { ref } from "vue";
import { useTeamsStore } from "@/entities";
import { useRouter } from "vue-router";

const { getTeams } = useTeamsStore();
const router = useRouter();
const teamsList = ref<Array<TeamModel>>()
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
const onSearch = async (val: string) => {
	console.log('search', val);
	search.value = val;
	page.value.page = 1;
	const res = await getTeams(new FilterTeamsModel({
		search: search.value,
		page: page.value
	}));
	teamsList.value = res
}

const onPagination = async (val: PaginationModel) => {
	page.value.page = val.page;
	page.value.size = val.size;
	const res = await getTeams(new FilterTeamsModel({
		search: search.value,
		page: page.value
	}));
	console.log('getTeams res', res);

	teamsList.value = res
}

const onDetail = (id: number) => {
	router.push({ name: 'team-detail', params: { id: id } });
}

</script>
<template>
	<FilterTeams @search="onSearch" />
	<div class="list-wrapper">
		<div class="teams-list" v-if="teamsList && teamsList.length">
			<TeamCard :card="card" v-for="card in teamsList" @click="onDetail(card.id)" />
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

	.teams-list {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 24px;

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