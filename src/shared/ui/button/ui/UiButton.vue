<script lang="ts" setup>
const props = defineProps({
	type: {
		type: String,
		default: 'primary'
	},
	disabled: {
		type: Boolean,
		default: false
	},
	imageIcon: {
		type: String,
		default: ''
	}
})
</script>

<template>
	<button :disabled="disabled" class="ui-button" :class="[type]">
		<div>
			<slot name="left" />
		</div>
		<div>
			<slot />
		</div>
		<div>
			<slot name="right" />
		</div>
		<img v-if="imageIcon" class="ui-button__image-icon" :src="imageIcon" />
	</button>
</template>

<style lang="scss" scoped>
.ui-button {
	display: inline-flex;
	gap: 8px;
	border-radius: 4px;
	height: 40px;
	justify-content: center;
	align-items: center;
	font-size: 15px;
	line-height: 24px;
	font-family: 'Avenir';
	transition: 0.15s ease-in-out;
	padding: 0 24px;

	&.primary {
		color: $white;
		background-color: $red;
		border: 1px solid $red;

		&:hover {
			background-color: $light-red;
			border-color: $light-red;
		}

		&:active {
			background-color: $dark-red;
			border-color: $dark-red;
		}

		&:disabled,
		&[disabled] {
			background-color: $superlight-gray;
			border-color: $superlight-gray;
			color: $lightest-gray;
		}
	}

	&.secondary {
		background-color: $white;
		color: $light-gray;
		border: 1px solid $light-gray;

		&:hover {
			background-color: $lightest-gray;
		}

		&:active {
			background-color: $light-gray;
			border-color: $gray;
			color: $gray;
		}

		&:disabled,
		&[disabled] {
			background-color: $superlight-gray;
			border-color: $light-gray;
			color: $lightest-gray;
		}
	}
}
</style>