<script setup lang="ts">
import { PropType, computed, ref } from "vue";
import { SelectOptionModel } from "./../models";
import { UiScroll } from "@/shared/ui/scroll"
const props = defineProps({
	modelValue: {
		type: Object as PropType<SelectOptionModel>
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

const emit = defineEmits(['update:modelValue']);
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

const isShowOptions = ref(false);
const isOpenTop = ref(false)

const $select = ref<HTMLElement>()

const toggleOptions = () => {
	const positionEl = $select.value?.getBoundingClientRect().bottom;
	const positionDoc = document.documentElement.clientHeight;
	isOpenTop.value = (positionEl + maxHeight.value) < positionDoc;
	isShowOptions.value = !isShowOptions.value;
}

const onClickOption = (option: SelectOptionModel) => {
	value.value = option
	toggleOptions()
}

const clearValue = () => {
	value.value = undefined;
}

</script>

<template>
	<div class="ui-select" ref="$select" :class="{ default: !clearable }">
		<div class="ui-select__container" @click.stop="toggleOptions">
			<div class="ui-select__selected" v-if="value">{{ value.name }}</div>
			<div class="ui-select__placeholder" v-else>{{ placeholder }}</div>
			<div class="ui-select__clear" v-if="clearable && value?.value" @click.stop="clearValue"></div>
			<div class="ui-select__separator"></div>
			<div class="ui-select__arrow" :class="{ 'show': isShowOptions }"></div>
		</div>
		<Transition name="ui-select__animation">
			<div class="ui-select__options" :class="{ top: !isOpenTop }" v-if="isShowOptions" v-click-outside="toggleOptions">
				<UiScroll :style="{
					maxHeight: maxHeight + 'px',
				}">
					<div class="ui-select__option" :class="{ active: option.value == value?.value }" @click="onClickOption(option)" v-for="(option, i) in options">{{ option.name }}</div>
				</UiScroll>
			</div>
		</Transition>
	</div>
</template>

<style lang="scss" scoped>
.ui-select {
	position: relative;

	&:hover {
		.ui-select__container {
			background-color: $lightest-gray;
			border-color: $lightest-gray;
		}

		.ui-select__separator,
		.ui-select__arrow,
		.ui-select__clear {
			filter: brightness(0.5);
		}
	}

	&__container {
		background-color: $superlight-gray;
		border: 1px solid $superlight-gray;
		display: flex;
		align-items: center;
		height: 40px;
		padding: 8px 12px;
		transition: 0.15s ease-in-out;
		border-radius: 4px;
		cursor: pointer;

		&:focus {
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
		background-color: #fff;

		&.top {
			bottom: 52px;
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
			color: #fff;
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
			color: #fff;
			border-color: $dark-red;
		}
	}

	&__selected,
	&__placeholder {
		transition: 0.15s ease-in-out;
		flex-grow: 1;
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
			background-color: #fff;
		}
	}

	.ui-select {

		&__container {
			background-color: #fff;
			border: 0.5px solid $lightest-gray;

			&:hover {
				background-color: #fff;
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

		@include media('<tablet') {
			&__container {
				height: 28px;
				padding: 2px 4px 2px;
			}

			&__arrow {
				background-size: 16px;
			}

			&__separator {
				margin: 0 4px 0 0;
			}

			&__selected {
				padding: 0 12px 0 8px;
			}
		}
	}
}
</style>