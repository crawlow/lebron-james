<script lang="ts" setup>
import { computed, ref } from 'vue';
import { ErrorMessage } from "@/shared/ui/error-message"
import Search from "@/shared/assets/img/icons/search.svg"
import Close from "@/shared/assets/img/icons/close_24px.svg"
import Eye from "@/shared/assets/img/icons/eye.svg"
import CloseEye from "@/shared/assets/img/icons/close_eye.svg"

const props = defineProps({
	modelValue: {
		type: [String, Number],
		default: null,
	},
	label: {
		type: String,
		default: ''
	},
	type: {
		type: String,
		default: 'text'
	},
	placeholder: {
		type: String,
		default: ''
	},
	disabled: {
		type: Boolean,
		default: false
	},
	v: {
		type: Object,
		default: {
			$error: null
		}
	},
	isSearch: {
		type: Boolean,
		default: false
	}
});
const emit = defineEmits(['update:modelValue'])
const value = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value.toString())
	}
})
const inputId = computed(() => `input-${Math.random().toString(36).slice(2, 9)}`);
const isShowPassword = ref(false);
</script>

<template>
	<div class="ui-input" :class="[{ password: type == 'password' }, { 'is-search': isSearch }]">
		<label v-if="label" class="label" :for="inputId">{{ label }}</label>
		<div class="ui-input__wrapper">
			<input v-model="value" :id="inputId" :disabled="disabled" :placeholder="placeholder" :type="isShowPassword ? 'text' : type" class="ui-input__control" :class="[{
				disabled: disabled,
				error: v.$error
			}]" />
			<span v-if="type === 'password'" class="ui-input__password-toggle" :class="{ active: isShowPassword }" @click.prevent="isShowPassword = !isShowPassword">
				<img v-if="isShowPassword" :src="Eye" />
				<img v-else :src="CloseEye" />
			</span>
			<span v-if="isSearch" class="ui-input__search">
				<img v-if="value" :src="Close" @click="value = ''" />
				<img v-else class="i-search" @click="emit('update:modelValue')" :src="Search" />
			</span>
		</div>
		<ErrorMessage v-if="v.$error" :v="v" />
	</div>
</template>

<style lang="scss" scoped>
.ui-input {
	&:hover {
		.ui-input__control {
			background-color: $lightest-gray;
			border-color: $lightest-gray;
		}

		img {
			filter: brightness(0.5);
		}
	}

	&__wrapper {
		position: relative;
	}

	&__search,
	&__password-toggle {
		position: absolute;
		top: 10px;
		right: 10px;
		width: 20px;
		height: 20px;
		padding: 2px;

		img {
			max-width: 100%;
			max-height: 100%;
			transition: filter 0.15s ease-in-out;
			cursor: pointer;

			&.i-search {
				cursor: pointer;
			}

			&:hover {
				filter: brightness(0.3);
			}
		}
	}

	&__control {
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

	.label {
		font-size: 14px;
		margin-bottom: 6px;
		display: inline-block;
	}

	&.is-search {
		.ui-input__control {
			background-color: $white;
			border: 1px solid $lightest-gray;
		}
	}

}
</style>