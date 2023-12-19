<script lang="ts" setup>
import { TeamModel, loadFile } from '@/entities';
import { UiAvatar, UiButton, UiInput, NotificationBus, NotificationMessage } from '@/shared';
import useVuelidate from '@vuelidate/core';
import { PropType, computed } from 'vue';
import { useRouter } from 'vue-router';
import { required, numeric } from "@vuelidate/validators";

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

const rules = {
	value: {
		name: { required },
		foundationYear: { required, numeric },
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
	v$.value.$touch();
	if (v$.value.$invalid) return;
	emit('save');
}

const onFailedType = (fileName: string) => {
	const notice = new NotificationBus()
	notice.Show(NotificationMessage.Error(`${fileName} - is not a PNG, JPEG or JPG image.`))
	return;
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
			<UiAvatar :url="value.imageUrl" @update="loadImage" @failed-type="onFailedType" />
		</div>
		<div class="team-form__bside">
			<div class="team-form__bside-wrap">
				<UiInput label="Name" :v="v$.value?.name" v-model="value.name" />
				<UiInput label="Division" :v="v$.value?.division" v-model="value.division" />
				<UiInput label="Conference" :v="v$.value?.conference" v-model="value.conference" />
				<UiInput label="Year of foundation" :v="v$.value?.foundationYear" v-model.number="value.foundationYear" />
				<div class="team-form__actions">
					<UiButton type="secondary" @click.prevent="onCancel">Cancel</UiButton>
					<UiButton @click.prevent="onSave">Save</UiButton>
				</div>
			</div>
		</div>
	</form>
</template>

<style lang="scss" setup>
.team-form {
	display: flex;
	width: 100%;
	padding: 48px 73px;
	color: $gray;
	gap: 32px;

	&__aside {
		min-width: 336px;
	}

	&__bside {
		display: flex;
		flex-direction: column;
		gap: 24px;
		align-items: center;
		flex-grow: 1;
		width: 100%;

		&-wrap {
			display: flex;
			flex-direction: column;
			gap: 24px;
			max-width: 336px;
			width: 100%;
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

	@include media('<desktop') {
		&__aside {
			min-width: auto;
			max-width: 336px;
			width: 100%;

			.ui-avatar {
				img {
					max-width: 80%;
					max-height: 80%;
				}
			}

		}
	}

	@include media('<tablet') {
		flex-direction: column;
		align-items: center;
		padding: 48px 8px;

		&__bside {
			width: 100%;
		}
	}
}
</style>