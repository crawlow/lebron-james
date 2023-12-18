<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { FilterList } from "./../../filter-list";
import { SelectOptionModel, UiMultiSelect } from '@/shared';
import { RequestTeamsModel, useTeamsStore } from "@/entities";
import { FilterPlayersModel } from "../models";
import { storeToRefs } from "pinia";

const teamOptions = ref(new Array<SelectOptionModel>());
const teams = ref(new Array<SelectOptionModel>());
const filterSearch = ref('');
const { allTeams } = storeToRefs(useTeamsStore());

const emit = defineEmits(['search', 'add']);

const {getTeams} = useTeamsStore();

const onSearch = (value: string) => {
    filterSearch.value = value;
    filtered();
}

const filtered = () => {
    emit('search', new FilterPlayersModel({
        name: filterSearch.value,
        teamIds: teams.value.map(x => x.value)
    }))
}

onMounted(async () => {
    const res = await getTeams()
    if(res) {
        teamOptions.value = res.map(x => new SelectOptionModel({name: x.name, value: x.id}));
    }
})

</script>

<template>
    <FilterList @keyup.enter="filtered" @search="onSearch" @add="emit('add')">
        <UiMultiSelect v-model="teams" @change="filtered" :options="teamOptions" />
    </FilterList>
</template>

<style lang="scss" scoped></style>