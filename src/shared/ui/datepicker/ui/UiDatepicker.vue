<script lang="ts" setup>
import { computed, ref } from 'vue';
import Datepicker from 'vue3-datepicker'
const props = defineProps({
	modelValue: {
		type: Date,
		default: null
	}
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
		<Datepicker ref="$datepicker" inputFormat="dd.MM.yyyy" v-model="value" />
	</div>
</template>

<style lang="scss">
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
			background-color: #fff;
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
}
</style>