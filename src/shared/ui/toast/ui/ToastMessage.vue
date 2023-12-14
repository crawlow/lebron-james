<template>
	<div class="ui-toast-message" :style="componentStyle">
		<div class="ui-toast-message_content">
			<div v-if="message.title" class="ui-toast-message_content_title" :style="titleStyle">
				{{ message.title }}
			</div>
			<div class="ui-toast-message_content_body">
				<div class="ui-toast-message_content_body_detail" :style="detailStyle">
					<div>
						{{ message.detail }}
					</div>
				</div>
			</div>
		</div>
		<div v-if="message.closable" class="ui-toast-message_close" @click="onCloseClick">
			<img src="@/shared/assets/img/icons/close_24px.svg">
		</div>
	</div>
</template>

<script lang="ts" setup>
import { PropType, computed, onMounted, onUnmounted, ref } from 'vue';
import { ToastMessageModel } from './../models';

const props = defineProps({
	message: { type: Object as PropType<ToastMessageModel>, default: null },
})
const emit = defineEmits(["close"]);

/**Таймер на закрытие компонента */
const closeTimeout = ref<any>(null);

/**Стиль компонента */
const componentStyle = computed(() => ({
	width: props.message.width,
	opacity: props.message.opacity,
	boxShadow: props.message.boxShadow,
	borderRadius: props.message.borderRadius,
}))
const titleStyle = computed(() => ({ color: props.message.titleColor }))
const detailStyle = computed(() => ({ color: props.message.detailColor }))

/**После рендера компонента */
onMounted(() => {
	if (props.message.life)
		closeTimeout.value = setTimeout(() => close({ message: props.message, type: 'life-end' }), props.message.life);
})
/**После удаления компонента */
onUnmounted(() => clearCloseTimeout());

/**Отправка события о закрытии компонента */
const close = (params: any) => emit('close', params);
/**Очистка таймера на закрытие сообщения */
const clearCloseTimeout = () => {
	if (!closeTimeout.value) return
	clearTimeout(closeTimeout.value);
	closeTimeout.value = null;
}
/**Клик по кнопке закрытия сообщения */
const onCloseClick = () => {
	clearCloseTimeout();
	close({ message: props.message, type: 'close' });
}
</script>
<style lang="scss">
.ui-toast-message {
	opacity: 0.9;
	position: relative;
	margin-bottom: 8px;
	background-color: $light-red;

	&_content {
		display: flex;
		flex-direction: column;
		padding: 8px 16px;

		&_title {
			font-size: 16px;
			font-weight: 500;
			margin-bottom: 12px;
			line-height: 18px;
		}

		&_body {
			display: flex;

			&_detail {
				display: flex;
				flex-direction: column;
				font-size: 14px;
				line-height: 24px;

				&_title {
					font-weight: 500;
				}
			}
		}
	}

	&_close {
		position: absolute;
		top: 8px;
		right: 14px;
		font-size: 16px;
		transition: .1s linear;
		cursor: pointer;

		&:hover {
			color: #fff !important;
		}
	}
}

/**Анимации */
.ui-toast-message-enter-from {
	opacity: 0;
	-webkit-transform: translateY(50%);
	-ms-transform: translateY(50%);
	transform: translateY(50%);
}

.ui-toast-message-leave-to {
	max-height: 0;
	opacity: 0;
	margin-bottom: 0;
	overflow: hidden;
}

.ui-toast-message-leave-from {
	max-height: 1000px;
}

.ui-toast-message-enter-active {
	-webkit-transition: transform 0.3s, opacity 0.3s;
	transition: transform 0.3s, opacity 0.3s;
}

.ui-toast-message-leave-active {
	-webkit-transition: max-height 0.45s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin-bottom 0.3s;
	transition: max-height 0.45s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin-bottom 0.3s;
}
</style>