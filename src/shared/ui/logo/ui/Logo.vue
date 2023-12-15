<script lang="ts" setup></script>

<template>
	<RouterLink to="/">
		<img class="logo" src="@/shared/assets/img/logo/logo.svg" />
	</RouterLink>
</template>

<style lang="scss" scoped>
.logo {
	max-width: 191px;

	@include media('<desktop') {
		max-width: 137px;
	}
}
</style>