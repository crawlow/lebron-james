<script lang="ts" setup></script>

<template>
	<RouterLink class="logo-link" to="/">
		<img class="logo" src="@/shared/assets/img/logo/logo.svg" />
	</RouterLink>
</template>

<style lang="scss" scoped>
.logo-link {
	display: flex;
	
}
.logo {
	max-width: 191px;

	@include media('<desktop') {
		max-width: 137px;
	}
}
</style>