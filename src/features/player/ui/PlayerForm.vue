<script lang="ts" setup>
import { PlayerModel, loadFile, useTeamsStore } from '@/entities';
import { SelectOptionModel, UiAvatar, UiButton, UiDatepicker, UiInput, UiSelect } from '@/shared';
import useVuelidate from '@vuelidate/core';
import { PropType, computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { required, numeric } from "@vuelidate/validators";
import { usePlayerStore } from '@/entities';
import { storeToRefs } from 'pinia';

const router = useRouter();

const props = defineProps({
    modelValue: {
        type: Object as PropType<PlayerModel>
    }
});

const emit = defineEmits(['update:modelValue', 'save']);

const value = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value);
    }
});

const { getPositions } = usePlayerStore();
const { getTeams } = useTeamsStore();

const teamOptions = ref<Array<SelectOptionModel>>([]);
const positionOptions = ref<Array<SelectOptionModel>>([]);
const position = ref<SelectOptionModel>()
const team = ref<SelectOptionModel>()

const date = computed({
    get:() => {
        return new Date(value.value.birthday);
    },
    set(newValue) {
        value.value.birthday = newValue.toString();
        date.value = newValue;
    }
})

const rules = {
    value: {
        name: { required },
        position: { required },
        player: { required },
        height: { required, numeric },
        weight: { required, numeric },
        birthday: { required },
        number: { required, numeric },
    }
}
const v$ = useVuelidate<any>(
    rules,
    { value }
)

const onCancel = () => {
    router.push({ name: 'players' });
}

const initForm = async () => {
    const posList = await getPositions();
    if(posList) {
        positionOptions.value = posList.map((x, i) => new SelectOptionModel({
            name: x,
            value: i
        }));
        const findPos = positionOptions.value.find(x => x.name == value.value.position);
        if(findPos) {
            position.value = new SelectOptionModel(findPos)
        }
    }
    const res = await getTeams()
    if (res) {
        teamOptions.value = res.map(x => new SelectOptionModel({ name: x.name, value: x.id }));
        const findTeam = teamOptions.value.find(x => x.value == value.value.team);
        if (findTeam) {
            team.value = new SelectOptionModel(findTeam)
        }
    }
}

const onSave = () => {
    v$.value.$touch();
    if (v$.value.$invalid) return;
    emit('save');
}

const loadImage = async (data: FormData) => {
    const res = await loadFile(data);
    if (res) {
        value.value.avatarUrl = res;
    }
}

const onSelectPostion = (val: SelectOptionModel) => {
    value.value.position = val?.name || '';
}

const onSelectTeam = (val: SelectOptionModel) => {
    value.value.team = val?.value;
}

onMounted(() => {    
    initForm()
})

</script>

<template>
    <form class="player-form">
        <div class="player-form__aside">
            <UiAvatar :url="value.avatarUrl" @update="loadImage" />
        </div>
        <div class="player-form__bside">
            <UiInput label="Name" :v="v$.value?.name" v-model="value.name" />
            <UiSelect label="Position" :v="v$.value?.position" v-model="position" :options="positionOptions" @update:model-value="onSelectPostion" />
            <UiSelect label="Team" :v="v$.value?.player" v-model="team" :options="teamOptions" @update:model-value="onSelectTeam" />
            <div class="bside bside__double">
                <UiInput label="Height (cm)" :v="v$.value?.height" v-model="value.height" />
                <UiInput label="Weight (kg)" :v="v$.value?.weight" v-model.number="value.weight" />
            </div>
            <div class="bside bside__double">
                <UiDatepicker label="Birthday" :v="v$.value?.birthday" v-model="date" />
                <UiInput label="Number" :v="v$.value?.number" v-model.number="value.number" />
            </div>
            <div class="player-form__actions">
                <UiButton type="secondary" @click.prevent="onCancel">Cancel</UiButton>
                <UiButton @click.prevent="onSave">Save</UiButton>
            </div>
        </div>
    </form>
</template>

<style lang="scss" scoped>
.player-form {
    display: flex;
    width: 100%;
    padding: 48px 73px;
    flex-wrap: wrap;

    &__aside {
        min-width: 336px;
    }

    &__bside {
        display: flex;
        flex-direction: column;
        gap: 24px;
        margin: 0 136px;
        flex-grow: 1;
    }

    .bside {
        &__double {
            flex-grow: 1;
            display: flex;
            gap: 24px;
            .ui-input,
            .ui-datepicker {
                width: 100%;
            }
        }
    }

    &__actions {
        flex-grow: 1;
        display: flex;
        width: 100%;
        gap: 24px;

        .ui-button {
            width: 100%;
        }
    }
}
</style>