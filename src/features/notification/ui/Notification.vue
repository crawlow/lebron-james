<script lang="ts" setup>
import { PropType } from 'vue'
import { UiToast } from '@/shared'

/**Параметры компонента */
defineProps({
	/**Уникальный идентификатор группы сообщения */
	group: { type: String, default: null },
	/**Позиция выводимого сообщения */
	position: { type: String as PropType<'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center'>, default: 'bottom-left' },
	/**z-index сообщения */
	zIndex: { type: Number, default: 0 },
})
</script>

<template>
	<UiToast :group="group" :position="position" :zIndex="zIndex" />
</template>