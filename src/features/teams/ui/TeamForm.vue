<script lang="ts" setup>
import { TeamModel, loadFile } from '@/entities';
import { UiAvatar, UiButton, UiInput } from '@/shared';
import useVuelidate from '@vuelidate/core';
import { PropType, computed } from 'vue';
import { useRouter } from 'vue-router';
import { required } from "@vuelidate/validators";

const router = useRouter();

const props = defineProps({
	modelValue: {
		type: Object as PropType<TeamModel>
	}
});

const emit = defineEmits(['update:modelValue', 'save']);

const value = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value);
	}
});

/**
 * 
 * name: string;
	foundationYear: number;
	division: string;
	conference: string;
	imageUrl: string;
 * 
 */

const rules = {
	value: {
		name: { required },
		foundationYear: { required },
		division: { required },
		conference: { required }
	}
}
const v$ = useVuelidate<any>(
	rules,
	{ value }
)

const onCancel = () => {
	router.push({ name: 'teams' });
}

const onSave = () => {
	console.log('saveForm');
	v$.value.$touch();
	if (v$.value.$invalid) return;
	emit('save');
}

const loadImage = async (data: FormData) => {
	const res = await loadFile(data);
	if (res) {
		value.value.imageUrl = res;
	}
}

</script>

<template>
	<form class="team-form">
		<div class="team-form__aside">
			<UiAvatar :url="value.imageUrl" @update="loadImage" />
		</div>
		<div class="team-form__bside">
			<UiInput label="Name" :v="v$.value?.name" v-model="value.name" />
			<UiInput label="Division" :v="v$.value?.division" v-model="value.division" />
			<UiInput label="Conference" :v="v$.value?.conference" v-model="value.conference" />
			<UiInput label="Year of foundation" :v="v$.value?.foundationYear" v-model.number="value.foundationYear" />
			<div class="team-form__actions">
				<UiButton type="secondary" @click.prevent="onCancel">Cancel</UiButton>
				<UiButton @click.prevent="onSave">Save</UiButton>
			</div>
		</div>
	</form>
</template>

<style lang="scss" setup>
.team-form {
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