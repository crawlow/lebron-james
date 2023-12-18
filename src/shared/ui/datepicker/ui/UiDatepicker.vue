<script lang="ts" setup>
import { computed, ref } from 'vue';
import Datepicker from 'vue3-datepicker'
import { ErrorMessage } from '../../error-message';
const props = defineProps({
	modelValue: {
		type: Date,
		default: null
	},
	label: {
		type: String,
		default: ''
	},
	v: {
		type: Object,
		default: {
			$error: null
		}
	},
});
const emit = defineEmits<{
	(eventName: "update:modelValue", value: Date): void;
}>();
const $datepicker = ref();
const value = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value)
		blur()
	}
})
const blur = async () => {
	$datepicker.value?.inputRef?.blur()
}
</script>

<template>
	<div class="ui-datepicker">
		<label v-if="label" class="ui-datepicker__label">{{ label }}</label>
		<Datepicker :class="{ error: v.$error }" ref="$datepicker" inputFormat="dd.MM.yyyy" v-model="value" />
		<ErrorMessage v-if="v.$error" :v="v" />
	</div>
</template>

<style lang="scss">
.ui-datepicker {
	&__label {
		font-size: 14px;
		margin-bottom: 6px;
		display: inline-block;
	}
}
.v3dp__datepicker {
	--elem-hover-bg-color: #FF768E;
	--elem-selected-bg-color: #C60E2E;
	position: relative;

	.v3dp__input_wrapper {
		input {
			padding: 7px 12px;
			font-size: 14px;
			color: $dark-gray;
			line-height: 24px;
			border-radius: 4px;
			background-color: $superlight-gray;
			border: 1px solid $superlight-gray;
			transition: all 0.15s ease-in-out;
			outline: 0;
			font-family: 'Avenir';
			font-weight: 500;
			width: 100%;
			background-image: url('@/shared/assets/img/icons/calendar-blank.svg');
			background-position: right 12px center;
			background-repeat: no-repeat;

			&:focus {
				box-shadow: 0px 0px 5px 0px #D9D9D9;
			}

			&.disabled {
				color: $gray;
			}

			&.error {
				border-color: $lightest-red;
			}

			&:hover {
				background-color: $lightest-gray;
				border-color: $lightest-gray;
				background-image: url('@/shared/assets/img/icons/calendar-blank-dark.svg');
			}
		}
	}
	&.error {
		.v3dp__input_wrapper {
			input {
				border-color: $lightest-red;
			}
		}
	}
}
</style>