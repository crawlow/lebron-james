<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
	url: {
		type: String
	}
})

const emit = defineEmits<{
	(eventName: "update", value: FormData): void;
}>();

const $file = ref<HTMLInputElement>()

const onClickLoad = () => {
	$file.value?.click()
}

const uploadFile = (e: Event) => {
	const file = (e.target as HTMLInputElement).files[0]
	if (!file) return false
	const form = new FormData()
	form.append('image', file)
	console.log(form);
	$file.value.value = null;
	emit('update', form);
}

</script>

<template>
	<div class="ui-avatar" @click.stop="onClickLoad">
		<div class="ui-avatar-wrapper">
			<img v-if="url" :src="url" class="ui-avatar__img" />
			<div class="ui-avatar__placeholder" v-else></div>
			<input @change="uploadFile($event)" type="file" ref="$file" accept="image/*" hidden />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.ui-avatar {
	background-color: $light-gray;
	aspect-ratio: 1.2874;
	border-radius: 10px;
	max-width: 336px;
	transition: 0.15s ease-in-out;
	position: relative;
	cursor: pointer;

	&-wrapper {
		display: flex;
		height: 100%;
		width: 100%;
		align-items: center;
		justify-content: center;
	}

	&__img {
		max-width: 100%;
		max-height: 100%;
	}

	&__placeholder {
		background-image: url('@/shared/assets/img/icons/add_a_photo_24px.svg');
		width: 75px;
		height: 75px;
	}

	&:hover {
		opacity: 0.5;

		&:after {
			content: "";
			background-image: url('@/shared/assets/img/icons/add_a_photo_24px.svg');
			background-position: center center;
			background-repeat: no-repeat;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
		}
	}
}
</style>