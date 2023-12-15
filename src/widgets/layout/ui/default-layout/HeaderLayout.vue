<script lang="ts" setup>
import { UserInfo } from '@/features';
import { Logo } from "@/shared";
import { computed } from 'vue';

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(['update:modelValue'])

const value = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value);
	}
})

const onClickMenu = () => {
	value.value = !value.value;
}

</script>

<template>
	<header class="header-layout">
		<div class="header-layout__hamburger" @click="onClickMenu"></div>
		<Logo />
		<span class="header-layout__user">
			<UserInfo />
		</span>
	</header>
</template>

<style lang="scss" scoped>
.header-layout {
	height: 80px;
	position: fixed;
	width: 100%;
	background-color: #fff;
	box-shadow: 0px 1px 10px 0px rgba(209, 209, 209, 0.50);
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 51px;
	top: 0;
	z-index: 1;

	&__hamburger {
		display: none;
	}

	@include media('<desktop') {
		height: 62px;
		justify-content: center;

		&__hamburger {
			display: block;
			position: absolute;
			top: 15px;
			left: 8px;
			width: 24px;
			height: 24px;
			padding: 4px;
			background-image: url('@/shared/assets/img/icons/menu_24px.svg');
			cursor: pointer;
		}

		&__user {
			display: none;
		}
	}
}
</style>