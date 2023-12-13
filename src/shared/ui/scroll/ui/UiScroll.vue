<!-- @format -->

<template>
	<div class="tir-scroll" ref="$el">
		<div class="hide-scroll" @scroll="onScroll" @transitionend="onTransitionend" ref="$scroll" :class="{
			'is-hidden': horizontalScrollbar.IsDrag || verticalScrollbar.IsDrag,
			'vertical-line': verticalScrollbar.Visible,
			'horizontal-line': horizontalScrollbar.Visible
		}">
			<slot />
		</div>

		<transition name="scroll-visible">
			<div class="vertical line" v-if="verticalScrollbar.Visible">
				<div class="scrollbar" :style="verticalScrollbar.Styles" @mousedown="verticalScrollbar.onStartDrag"></div>
			</div>
		</transition>

		<transition name="scroll-visible">
			<div class="horizontal line" v-if="horizontalScrollbar.Visible">
				<div class="scrollbar" :style="horizontalScrollbar.Styles" @mousedown="horizontalScrollbar.onStartDrag"></div>
			</div>
		</transition>
	</div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, onMounted, onUnmounted, watch } from 'vue';
import { VerticalScrollbarModel, HorizontalScrollbarModel } from './../models';
import debounce from 'lodash.debounce';
/**
 * Данные от родителя
 */
const props = defineProps({
	/**
	 * Скролл по Y
	 */
	y: { type: Number, default: null },
	/**
	 * Скролл по X
	 */
	x: { type: Number, default: null },
});
/**
 * Генерация событий
 */
const emit = defineEmits(['onScroll', 'update:y', 'update:x']);
/**
 * Элемент
 */
const $el = ref<HTMLElement>();
/**
 * Элемент со скролом
 */
const $scroll = ref<HTMLElement>();
/**
 * Модели ползунков
 */
const verticalScrollbar = reactive(new VerticalScrollbarModel());
const horizontalScrollbar = reactive(new HorizontalScrollbarModel());
/**
 * Вызывается при скролле
 */
const onScroll = (e?: Event) => {
	verticalScrollbar.setStyles($scroll.value);
	horizontalScrollbar.setStyles($scroll.value);
	if (e) emit('onScroll', e);
};
/**
 * Вызывается при ресайзе, но с задержкой
 */
const debounceOnScroll = debounce(onScroll);
/**
 * Вызывается при анимации внутри блока
 */
const onTransitionend = (e?: TransitionEvent) => {
	if (
		e &&
		e.propertyName &&
		(e.propertyName == 'width' ||
			e.propertyName == 'height' ||
			e.propertyName == 'max-width' ||
			e.propertyName == 'max-height' ||
			e.propertyName == 'min-width' ||
			e.propertyName == 'min-height')
	)
		debounceOnScroll();
};
/**
 * Вызывается при мутации
 */
const onObserve = (mutations: MutationRecord[], observer: MutationObserver) => {
	debounceOnScroll();
};
/**
 * Вызывается при изменении размера родительского элемента
 */
const onResizeObserve = () => {
	debounceOnScroll();
};
/**
 * Вызывается при ресайзе
 */
const onResize = () => {
	debounceOnScroll();
};
/**
 * Отслеживатель мутаций
 */
const observer: MutationObserver = new MutationObserver(onObserve);
/**
 * Отслеживатель изменения размера
 */
const resizeObserver: ResizeObserver = new ResizeObserver(onResizeObserve);
/**
 * Вызывается при движении мыши
 */
const onMousemove = (e: MouseEvent) => {
	verticalScrollbar.onDrag(e, $scroll.value);
	horizontalScrollbar.onDrag(e, $scroll.value);
};
/**
 * Вызывается при поднятии кнопки мыши
 */
const onMouseup = () => {
	verticalScrollbar.onStopDrag();
	horizontalScrollbar.onStopDrag();
};
/**
 * Скролл по Y
 */
const y = computed(() => props.y);
/**
 * Установка скролла по Y
 */
const onY = () => {
	if (y.value || y.value == 0)
		verticalScrollbar.scrollTo(y.value, $scroll.value);
};
/**
 * Отслеживатель изменений Y
 */
watch(y, onY);
/**
 * Скролл по X
 */
const x = computed(() => props.x);
/**
 * Установка скролла по X
 */
const onX = () => {
	if (x.value || x.value == 0)
		horizontalScrollbar.scrollTo(x.value, $scroll.value);
};
/**
 * Отслеживатель изменений X
 */
watch(x, onX);
/**
 * При загрузке DOM
 */
onMounted(() => {
	onY();
	onX();
	debounceOnScroll();
	/**
	 * Добавление слушателей
	 */
	window.addEventListener('resize', onResize);
	window.addEventListener('mousemove', onMousemove);
	window.addEventListener('mouseup', onMouseup);
	if ($el && $el.value) {
		observer.observe($el.value, {
			childList: true,
			subtree: true,
			attributes: true,
		});
		resizeObserver.observe($el.value);
	}
});
/**
 * Перед исчезновением компонента
 */
onUnmounted(() => {
	/**
	 * Удаление слушателей
	 */
	window.removeEventListener('resize', onResize);
	window.removeEventListener('mousemove', onMousemove);
	window.removeEventListener('mouseup', onMouseup);
	observer.disconnect();
	resizeObserver.disconnect();
});
/** Передача наверх */
defineExpose({
	$scroll,
});
</script>

<style lang="scss" scoped>
.scroll-visible-enter-active,
.scroll-visible-leave-active {
	transition-duration: 0.15s;
	transition-timing-function: ease-in-out;
	transition-property: opacity;
}

.scroll-visible-enter-from,
.scroll-visible-leave-to {
	opacity: 0;
}

.tir-scroll {
	position: relative;
	overflow: hidden;

	.hide-scroll {
		width: 100%;
		overflow: auto;
		max-height: inherit;
		max-width: inherit;
		z-index: 0;
		scrollbar-color: none;
		scrollbar-width: none;
		// user-select: none;

		&::-webkit-scrollbar {
			display: none;
		}

		&.is-hidden {
			overflow: hidden;
		}
	}

	.line {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		overflow: hidden;
		z-index: 2;
		background-color: #f5f5fa;
		border-radius: 2px;

		.scrollbar {
			cursor: pointer;
			transition-property: height, width, filter;
			transition-duration: 0.15s;
			transition-timing-function: ease-in-out;
			background-color: #b8b8cc;
			border-radius: 2px;

			&:hover {
				background-color: #ccccd9;
			}

			&:active {
				background-color: #acacbf;
			}
		}

		&.vertical {
			top: 6px;
			bottom: 6px;
			right: 0;
			min-width: 4px;
			max-width: 4px;
			margin-right: 4px;

			.scrollbar {
				position: absolute;
				min-width: 4px;
				max-width: 4px;
			}
		}

		&.horizontal {
			left: 0;
			right: 0;
			bottom: 0;
			min-height: 4px;
			max-height: 4px;
			margin-bottom: 4px;

			.scrollbar {
				position: absolute;
				min-height: 4px;
				max-height: 4px;
			}
		}
	}
}
</style>
