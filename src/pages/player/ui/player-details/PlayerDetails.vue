<script lang="ts" setup>
import { PlayerModel, useTeamsStore } from '@/entities';
import { computed, onMounted, ref } from "vue";
import { Breadcrumbs, BreadcrumbsModel, ModalWindow, PageTemplateEdit, UiButton } from '@/shared';
import { usePlayerStore } from '@/entities';
import { useRoute, useRouter } from 'vue-router';
import HeaderActions from '@/shared/ui/page-template/ui/HeaderActions.vue';
import { PlayerInfo } from '@/features';
const currentPlayer = ref<PlayerModel>(new PlayerModel())
const breadcrumbs = ref<Array<BreadcrumbsModel>>([new BreadcrumbsModel({ text: 'Players', to: '/players' })]);
const { getPlayer, deletePlayer } = usePlayerStore();
const { getTeams } = useTeamsStore();
const route = useRoute();
const router = useRouter();

const getPlayerById = async (id: number) => {
	const res = await getPlayer(id);
	getTeams();
	if (res) {
		currentPlayer.value = new PlayerModel(res);
		breadcrumbs.value.push({ text: res.name })
	}
}

const onEdit = () => {
	router.push({ name: 'player', params: { id: currentPlayer.value.id } });
}

const deletePlayerById = async () => {
	await deletePlayer(currentPlayer.value.id)
	router.push({ name: 'players' });
}

const isShowConfirmation = ref(false);
const modalTitle = computed(() => `Delete player - ${currentPlayer.value.name}?`)

onMounted(async () => {
	if (route.params.id) {
		getPlayerById(+route.params.id)
	} else {
		router.push({ name: 'players' });
	}
})
</script>
<template>
	<PageTemplateEdit>
		<template #header>
			<Breadcrumbs :breadcrumbs="breadcrumbs" />
			<div class="">
				<HeaderActions @edit="onEdit" @delete="isShowConfirmation = true" />
			</div>
		</template>
		<PlayerInfo :player="currentPlayer" />
	</PageTemplateEdit>
	<ModalWindow dialog-classes="modal-dialog-auth" modal-classes="modal-auth" :title="modalTitle" v-model="isShowConfirmation">
		<div class="footer-actions">
			<UiButton @click="isShowConfirmation = false" type="secondary">Cancel</UiButton>
			<UiButton @click="deletePlayerById">Delete</UiButton>
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