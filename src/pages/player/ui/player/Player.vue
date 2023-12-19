<script lang="ts" setup>
import router from '@/app/router';
import { PlayerModel } from '@/entities';
import { usePlayerStore } from '@/entities';
import { PlayerForm } from '@/features';
import { Breadcrumbs, BreadcrumbsModel, PageTemplateEdit } from '@/shared';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const { addPlayer, updatePlayer, getPlayer } = usePlayerStore();

const currentPlayer = ref<PlayerModel>(new PlayerModel())

const route = useRoute();

const breadcrumbs = ref<Array<BreadcrumbsModel>>([new BreadcrumbsModel({ text: 'Players', to: '/players' })]);

const onSave = async () => {
	const res = currentPlayer.value.id ? await updatePlayer(currentPlayer.value) : await addPlayer(currentPlayer.value);
	if (res) {
		router.push({ name: 'players' });
	}
}

const getPlayerById = async (id: number) => {
	const res = await getPlayer(id);
	if (res) {
		currentPlayer.value = res;
	}
}

onMounted(async () => {
	if (route.params.id) {
		await getPlayerById(+route.params.id)
		breadcrumbs.value.push({ text: currentPlayer.value.name })
	} else {
		breadcrumbs.value.push({ text: 'Add new player' })
	}
})

</script>
<template>
	<PageTemplateEdit>
		<template #header>
			<Breadcrumbs :breadcrumbs="breadcrumbs" />
		</template>
		<PlayerForm v-model="currentPlayer" @save="onSave" />
	</PageTemplateEdit>
</template>

<style lang="scss" scoped></style>