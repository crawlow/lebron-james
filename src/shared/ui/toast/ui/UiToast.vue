<template>
	<div ref="$container" :class="containerClass" v-bind="$attrs" :style="{ 'z-index': zIndex } as any">
		<TransitionGroup name="ui-toast-message">
			<ToastMessage v-for="msg of messages" :key="msg.id" :message="msg" :template="$slots.message" :z-index="zIndex" @close="remove($event)" />
		</TransitionGroup>
	</div>
</template>

<script lang="ts" setup>
import { ToastMessage } from '.';
import { PropType, computed, onMounted, onUnmounted, ref } from 'vue';
import { ToastEventBus } from "./../utils"

const props = defineProps({
	/**Уникальный идентификатор группы сообщения */
	group: { type: String, default: null },
	/**Позиция выводимого сообщения */
	position: { type: String as PropType<'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center'>, default: 'bottom-left' },
	/**z-index сообщения */
	zIndex: { type: Number, default: 0 },
})
const emit = defineEmits(['close', 'life-end']);

const messages = ref<any[]>([]);
const styleElement = ref<any>(null);
const $container = ref<any>(null);
const messageIdx = ref(0)

const containerClass = computed(() => (['ui-toast ui-toast-' + props.position]))


onMounted(() => {
	ToastEventBus.on('add', onAdd);
	ToastEventBus.on('remove-group', onRemoveGroup);
	ToastEventBus.on('remove-all-groups', onRemoveAllGroups);
})

onUnmounted(() => {
	destroyStyle();
	ToastEventBus.off('add', onAdd);
	ToastEventBus.off('remove-group', onRemoveGroup);
	ToastEventBus.off('remove-all-groups', onRemoveAllGroups);
})

const add = (message: any) => {
	if (message.id == null) message.id = messageIdx.value++;
	messages.value = [...messages.value, message];
}
const remove = (params: any) => {
	let index = -1;

	for (let i = 0; i < messages.value.length; i++) {
		if (messages.value[i] === params.message) {
			index = i;
			break;
		}
	}

	messages.value.splice(index, 1);
	emit(params.type, { message: params.message });
}
const onAdd = (message: any) => {
	if (props.group == message.group) add(message);
}
const onRemoveGroup = (group: any) => {
	if (props.group === group) messages.value = [];
}
const onRemoveAllGroups = () => { messages.value = [] };
const destroyStyle = () => {
	if (!styleElement.value) return
	document.head.removeChild(styleElement.value);
	styleElement.value = null;
}
</script>

<style lang="scss">
.ui-toast {
	position: fixed;
}

.ui-toast-top-right {
	top: 20px;
	right: 20px;
}

.ui-toast-top-left {
	top: 20px;
	left: 20px;
}

.ui-toast-bottom-left {
	bottom: 20px;
	left: 20px;
}

.ui-toast-bottom-right {
	bottom: 20px;
	right: 20px;
}

.ui-toast-top-center {
	top: 20px;
	left: 50%;
	transform: translateX(-50%);
}

.ui-toast-bottom-center {
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
}

.ui-toast-center {
	left: -50%;
	top: -50%;
	transform: translate(-50%, -50%);
}
</style>