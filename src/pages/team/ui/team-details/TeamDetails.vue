<script lang="ts" setup>
import { TeamModel } from '@/entities';
import { computed, onMounted, ref } from "vue";
import { Breadcrumbs, BreadcrumbsModel, ModalWindow, PageTemplateEdit, UiButton } from '@/shared';
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
	const res = await getTeam(id);
	if (res) {
		currentTeam.value = new TeamModel(res);
		breadcrumbs.value.push({ text: res.name })
	}
}

const onEdit = () => {
	router.push({ name: 'team', params: { id: currentTeam.value.id } });
}

const deleteTeamById = async () => {
	const res = await deleteTeam(currentTeam.value.id)
	if (res) {
		router.push({ name: 'teams' });
	}

	router.push({ name: 'teams' });
}

onMounted(async () => {
	if (route.params.id) {
		getTeamById(+route.params.id)
	} else {
		router.push({ name: 'teams' });
	}
})

const isShowConfirmation = ref(false);
const modalTitle = computed(() => `Delete team - ${currentTeam.value.name}?`)

</script>
<template>
	<PageTemplateEdit>
		<template #header>
			<Breadcrumbs :breadcrumbs="breadcrumbs" />
			<HeaderActions @edit="onEdit" @delete="isShowConfirmation = true" />
		</template>
		<TeamInfo :team="currentTeam" />
	</PageTemplateEdit>
	<template v-if="currentTeam.id">
		<TeamRoster :team-id="currentTeam.id" />
	</template>
	<ModalWindow dialog-classes="modal-dialog-auth" :title="modalTitle" v-model="isShowConfirmation">
		<div class="footer-actions">
			<UiButton @click="isShowConfirmation = false" type="secondary">Cancel</UiButton>
			<UiButton @click="deleteTeamById">Delete</UiButton>
		</div>
	</ModalWindow>
</template>

<style lang="scss" scoped>
.footer-actions {
	display: flex;
	gap: 24px;

	.ui-button {
		width: 100%;
	}
}
</style>