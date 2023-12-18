<script lang="ts" setup>
import router from '@/app/router';
import { TeamModel } from '@/entities';
import { useTeamsStore } from '@/entities';
import { TeamForm } from '@/features';
import { Breadcrumbs, BreadcrumbsModel, PageTemplateEdit } from '@/shared';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const { addTeam, updateTeam, getTeam } = useTeamsStore();

const currentTeam = ref(new TeamModel())

const route = useRoute();

const breadcrumbs = ref<Array<BreadcrumbsModel>>([new BreadcrumbsModel({ text: 'Teams', to: '/teams' })]);

const onSave = async () => {
	try {
		const res = currentTeam.value.id ? await updateTeam(currentTeam.value) : await addTeam(currentTeam.value);
		if (res) {
			router.push({ name: 'teams' });
		}
	} catch (e) {
		console.log('e', e);
	}
}

const getTeamById = async (id: number) => {
	try {
		const res = await getTeam(id);
		if (res) {
			currentTeam.value = res;
		}
	} catch (e) {
		console.log('e', e);
	}
}

onMounted(async () => {
	if (route.params.id) {
		await getTeamById(+route.params.id)
		breadcrumbs.value.push({ text: currentTeam.value.name })
	} else {
		breadcrumbs.value.push({ text: 'Add new team' })
	}
})

</script>
<template>
	<PageTemplateEdit>
		<template #header>
			<Breadcrumbs :breadcrumbs="breadcrumbs" />
		</template>
		<TeamForm v-model="currentTeam" @save="onSave" />
	</PageTemplateEdit>
</template>

<style lang="scss" scoped></style>