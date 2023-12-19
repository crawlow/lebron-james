<template>
	<teleport to="#app">
		<transition name="modal_visible">
			<div v-if="modelValue" class="modal is-open" :class="modalClasses" @click.self="emit('update:modelValue', false)">
				<div class="modal-dialog" :class="dialogClasses">
					<div class="modal-header" v-if="title">
						<h3 class="modal-title">{{ title }}</h3>
						<div class="close" @click="emit('update:modelValue', false)">
							<img :src="Close" />
						</div>
					</div>
					<UiButton v-else class="close-auth" @click="emit('update:modelValue', false)">&times;</UiButton>
					<slot />
				</div>
			</div>
		</transition>
	</teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { UiButton } from "./../../button"
import Close from "@/shared/assets/img/icons/close_24px.svg"

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		default: ''
	},
	modalClasses: {
		type: String,
		default: ''
	},
	dialogClasses: {
		type: String,
		default: ''
	}
});
const emit = defineEmits(['close', 'open', 'update:modelValue']);
/**Ослеживать видимость */
watch(() => props.modelValue, () => {
	if (props.modelValue) {
		emit('update:modelValue', true);
		emit('open');
	} else {
		emit('update:modelValue', false);
		emit('close')
	}
});
</script>

<style lang="scss" scoped>
.modal {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(65, 65, 65, 0.6);
	display: none;
	z-index: 999;
	font-family: 'Avenir';
	color: $dark-gray;

	&.is-open {
		display: flex;
	}

	.modal-dialog {
		max-width: 360px;
		width: 100%;
		background: #ffffff;
		border-radius: 5px;
		margin: auto;
		padding: 32px;
		position: relative;

		.modal-header {
			margin-top: 8px;
			margin-bottom: 24px;
		}

		.close {
			position: absolute;
			top: 12px;
			right: 12px;
			width: 24px;
			height: 24px;

			img {
				width: 100%;
				height: 100%;
				transition: 0.15s ease-in-out;
				cursor: pointer;

				&:hover {
					filter: brightness(0.5);
				}
			}
		}
	}

}

.modal_visible-enter-active,
.modal_visible-leave-active {
	z-index: 10000;
	transition-duration: 0.15s;
	transition-timing-function: ease-in-out;
	transition-property: opacity;
}

.modal_visible-enter-from,
.modal_visible-leave-to {
	z-index: 10000;
	opacity: 0;
}
</style>