<script lang="ts" setup>
import { TeamModel } from '@/entities';
import { onMounted, ref } from "vue";
import { Breadcrumbs, BreadcrumbsModel, PageTemplateEdit } from '@/shared';
import { useTeamsStore } from '@/entities';
import { useRoute, useRouter } from 'vue-router';
import HeaderActions from '@/shared/ui/page-template/ui/HeaderActions.vue';
import { TeamInfo, TeamRoster } from '@/features';
const currentTeam = ref<TeamModel>(new TeamModel())
const breadcrumbs = ref<Array<BreadcrumbsModel>>([new BreadcrumbsModel({ text: 'Teams', to: '/teams' })]);
const { getTeam, deleteTeam } = useTeamsStore();
const route = useRoute();
const router = useRouter();

const getTeamById = async (id: number) => {
	try {
		const res = await getTeam(id);
		if (res) {
			currentTeam.value = new TeamModel(res);
			breadcrumbs.value.push({ text: res.name })
		}
	} catch (e) {
		console.log('e', e);
	}
}

const onEdit = () => {
	router.push({ name: 'team', params: { id: currentTeam.value.id } });
}

const deleteTeamById = async () => {
	// todo
	try {
		const res = await deleteTeam(currentTeam.value.id)
		if (res) {
			router.push({ name: 'teams' });
		}
	} catch (e) {
		console.log('e', e);
	}

	router.push({ name: 'teams' });
}

onMounted(async () => {
	if (route.params.id) {
		console.log('getById');
		getTeamById(+route.params.id)
	} else {
		router.push({ name: 'teams' });
	}
})
</script>
<template>
	<PageTemplateEdit>
		<template #header>
			<Breadcrumbs :breadcrumbs="breadcrumbs" />
			<div class="">
				<HeaderActions @edit="onEdit" @delete="deleteTeamById" />
			</div>
		</template>
		<TeamInfo :team="currentTeam" />
	</PageTemplateEdit>
	<template v-if="currentTeam.id">
		<TeamRoster :team-id="currentTeam.id" />
	</template>
</template>

<style lang="scss" scoped></style>