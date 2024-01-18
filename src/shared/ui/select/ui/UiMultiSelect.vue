<script setup lang="ts">
import { PropType, computed, onMounted, ref } from "vue";
import { SelectOptionModel } from "./../models";
import { UiScroll } from "@/shared/ui/scroll"
import debounce from 'lodash.debounce';
const props = defineProps({
	modelValue: {
		type: Object as PropType<Array<SelectOptionModel>>
	},
	options: {
		type: Array as PropType<Array<SelectOptionModel>>,
	},
	placeholder: {
		type: String,
		default: 'Select...'
	},
	clearable: {
		type: Boolean,
		default: true
	},
	countVisibleOptions: {
		type: Number,
		default: 5
	}
});

const emit = defineEmits(['update:modelValue', 'change']);
const value = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value)
	}
})
const maxHeight = computed(() => {
	let optionHeight = 36;
	return props.countVisibleOptions * optionHeight + 1;
});

const $selectedOptions = ref<HTMLElement>();

const hiddenSelectedOptions = ref(0);

const isShowOptions = ref(false);
const isOpenTop = ref(false);

const $select = ref<HTMLElement>();

const onRecalc = () => {
	let count = 0;
	if ($selectedOptions.value && value.value) {
		const listChildren = [...$selectedOptions.value.children].filter(x => !x.className.includes('more')) as HTMLElement[];
		for (let i = 0; i < listChildren.length; i++) {
			const element = listChildren[i];
			const parent = (element.offsetParent as HTMLElement)
			const distanceToRight = parent.offsetWidth - 60 - (element.offsetLeft + element.offsetWidth);
			if (distanceToRight < 0) {
				count += 1;
			}
		}
		hiddenSelectedOptions.value += count;
	}
}

const toggleOptions = () => {
	const positionEl = $select.value?.getBoundingClientRect().bottom;
	const positionDoc = document.documentElement.clientHeight;
	isOpenTop.value = (positionEl + maxHeight.value) < positionDoc;
	isShowOptions.value = !isShowOptions.value;
	if (!isShowOptions.value) {
		emit('change');
	}
}

const onClickOption = (option: SelectOptionModel) => {
	const findIndex = value.value?.findIndex(o => o.value == option.value)
	if (findIndex !== -1) {
		value.value.splice(findIndex, 1)
		hiddenSelectedOptions.value = hiddenSelectedOptions.value ? hiddenSelectedOptions.value - 1 : 0
	} else {
		value.value.push(option)
	}
	debounceRecalc();
}

const innerSelectedValue = computed(() => hiddenSelectedOptions.value ? [...value.value].slice(0, - hiddenSelectedOptions.value) : [...value.value])

const isActiveOption = (id: number) => {
	return value.value.find(x => x.value == id)
}

const clearValue = () => {
	hiddenSelectedOptions.value = 0;
	value.value = [];
}

/**
 * Вызывается при ресайзе, но с задержкой
 */
const debounceRecalc = debounce(onRecalc);

/**
 * Вызывается при мутации
 */
const onObserve = (mutations: MutationRecord[], observer: MutationObserver) => {
	debounceRecalc();
};
/**
 * Вызывается при изменении размера родительского элемента
 */
const onResizeObserve = () => {
	debounceRecalc();
};

/**
 * Отслеживатель изменения размера
 */
const resizeObserver: ResizeObserver = new ResizeObserver(onResizeObserve);

/**
 * Отслеживатель мутаций
 */
const observer: MutationObserver = new MutationObserver(onObserve);

onMounted(() => {
	debounceRecalc();
	if ($selectedOptions && $selectedOptions.value) {
		observer.observe($selectedOptions.value, {
			childList: true,
			subtree: true,
			attributes: true,
		});
		resizeObserver.observe($selectedOptions.value);
	}
})

</script>

<template>
	<div class="ui-select" ref="$select" :class="{ default: !clearable }">
		<div class="ui-select__container" :class="{ active: isShowOptions }" @click.stop="toggleOptions">
			<div class="ui-select__selected" ref="$selectedOptions" v-if="innerSelectedValue && innerSelectedValue.length">
				<div class="ui-select__selected-option" v-for="(option, index) in innerSelectedValue" :key="option.value">
					<div class="ui-select__selected-option-text">
						{{ option.name }}
					</div>
					<div class="ui-select__selected-option-close" @click="onClickOption(option)"></div>
				</div>
				<div class="ui-select__selected-option more" v-if="hiddenSelectedOptions">...</div>
			</div>
			<div class="ui-select__placeholder" v-else>{{ placeholder }}</div>
			<div class="ui-select__clear" v-if="clearable && value?.length" @click.stop="clearValue"></div>
			<div class="ui-select__separator"></div>
			<div class="ui-select__arrow" :class="{ 'show': isShowOptions }"></div>
		</div>
		<Transition name="ui-select__animation">
			<div class="ui-select__options" :class="{ top: !isOpenTop }" v-if="isShowOptions" v-click-outside="toggleOptions">
				<UiScroll v-if="options && options.length" :style="{
					maxHeight: maxHeight + 'px',
				}">
					<div class="ui-select__option" :class="{ active: isActiveOption(option.value) }" @click="onClickOption(option)" v-for="(option, i) in options" :key="option.value">{{ option.name }}</div>
				</UiScroll>
				<div class="empty-options" v-else>
					Options not found
				</div>
			</div>
		</Transition>
	</div>
</template>

<style lang="scss" scoped>
.ui-select {
	position: relative;
	color: $gray;

	&:hover {
		.ui-select__container {
			background-color: $white;
			border-color: $lightest-gray;
		}

		.ui-select__separator,
		.ui-select__arrow,
		.ui-select__clear {
			filter: brightness(0.5);
		}
	}

	&__container {
		background-color: $white;
		border: 1px solid $lightest-gray;
		display: flex;
		align-items: center;
		height: 40px;
		padding: 8px 12px;
		transition: 0.15s ease-in-out;
		border-radius: 4px;
		cursor: pointer;

		&.active {
			box-shadow: 0px 0px 5px 0px #D9D9D9;
		}

		&.disabled {
			color: $gray;
		}

		&.error {
			border-color: $lightest-red;
		}
	}

	&__options {
		position: absolute;
		width: 100%;
		display: flex;
		flex-direction: column;
		transform: translateY(6px);
		z-index: 10;
		background-color: $white;

		&.top {
			bottom: 52px;
		}

		.empty-options {
			height: 48px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	&__option {
		padding: 6px 12px;
		border: 1px solid $lightest-gray;
		border-top: none;
		height: 36px;
		display: flex;
		align-items: center;
		transition: all 0.15s ease-in-out;

		&:hover {
			background-color: $lightest-red;
			color: $white;
			cursor: pointer;
		}

		&:first-child {
			border-top: 1px solid $lightest-gray;
			border-top-left-radius: 4px;
			border-top-right-radius: 4px;
		}

		&:last-child {
			border-bottom-left-radius: 4px;
			border-bottom-right-radius: 4px;
		}

		&.active {
			background-color: $dark-red;
			color: $white;
			border-color: $dark-red;
		}
	}

	&__selected,
	&__placeholder {
		transition: 0.15s ease-in-out;
		flex-grow: 1;
	}

	&__selected {
		display: flex;
		gap: 4px;

		&-option {
			background-color: $red;
			display: flex;
			gap: 4px;
			font-weight: 400;
			padding: 4px;
			border-radius: 4px;
			line-height: 16px;
			align-items: center;
			color: $white;
			white-space: nowrap;

			&.active {
				background-color: $dark-red;
			}

			&-close {
				background-image: url('@/shared/assets/img/icons/close_white.svg');
				background-repeat: no-repeat;
				background-position: center center;
				width: 16px;
				height: 16px;
				border-radius: 4px;
				transition: 0.15s ease-in-out;

				&:hover {
					background-color: $dark-red;
				}
			}
		}
	}

	&__separator {
		width: 1px;
		height: 100%;
		margin: 0 12px;
		background-color: $lightest-gray;
	}

	&__arrow {
		background-image: url('@/shared/assets/img/icons/expand_more_16px.svg');
		background-repeat: no-repeat;
		background-position: center center;
		width: 16px;
		height: 16px;
		transition: 0.15s ease-in-out;

		&.show {
			transform: rotate(180deg);
		}
	}

	&__clear {
		background-image: url('@/shared/assets/img/icons/close_24px.svg');
		background-repeat: no-repeat;
		background-position: center center;
		width: 16px;
		height: 16px;
	}

	&__animation-enter-active,
	&__animation-leave-active {
		transition: all 0.15s ease-in-out;
	}

	&__animation-enter-from,
	&__animation-leave-to {
		transform: translateY(0px);
		opacity: 0;
	}

}

.default {
	&:hover {
		.ui-select__container {
			background-color: $white;
		}
	}

	.ui-select {

		&__container {
			background-color: $white;
			border: 0.5px solid $lightest-gray;

			&:hover {
				background-color: $white;
			}
		}

		&__selected {
			color: $dark-gray;
		}

		&__arrow {
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 24px;
		}

		&__options {
			color: $light-gray;
			border-radius: 4px;
		}
	}
}
</style>