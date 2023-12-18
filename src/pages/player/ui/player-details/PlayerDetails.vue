<script lang="ts" setup>
import { PlayerModel } from '@/entities';
import { onMounted, ref } from "vue";
import { Breadcrumbs, BreadcrumbsModel, PageTemplateEdit } from '@/shared';
import { usePlayerStore } from '@/entities';
import { useRoute, useRouter } from 'vue-router';
import HeaderActions from '@/shared/ui/page-template/ui/HeaderActions.vue';
import { PlayerInfo } from '@/features';
const currentPlayer = ref<PlayerModel>(new PlayerModel())
const breadcrumbs = ref<Array<BreadcrumbsModel>>([new BreadcrumbsModel({ text: 'Players', to: '/players' })]);
const { getPlayer, deletePlayer } = usePlayerStore();
const route = useRoute();
const router = useRouter();

const getPlayerById = async (id: number) => {
	try {
		const res = await getPlayer(id);
		if (res) {
			currentPlayer.value = new PlayerModel(res);
			breadcrumbs.value.push({ text: res.name })
		}
	} catch (e) {
		console.log('e', e);
	}
}

const onEdit = () => {
	router.push({ name: 'player', params: { id: currentPlayer.value.id } });
}

const deletePlayerById = async () => {
	// todo
	try {
		const res = await deletePlayer(currentPlayer.value.id)
		if (res) {
			router.push({ name: 'players' });
		}
	} catch (e) {
		console.log('e', e);
	}

	router.push({ name: 'players' });
}

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
				<HeaderActions @edit="onEdit" @delete="deletePlayerById" />
			</div>
		</template>
		<PlayerInfo :player="currentPlayer" />
	</PageTemplateEdit>
</template>

<style lang="scss" scoped></style>