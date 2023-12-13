<script lang="ts" setup></script>

<template>
	<span class="test">12345</span>
	<p>
		<RouterLink :to="{ name: 'teams' }">Go to Teams</RouterLink>
		<RouterLink :to="{ name: 'players' }">Go to Players</RouterLink>
	</p>
	<RouterView />
</template>

<style lang="scss" scoped>
.test {
	color: $blue;

	@include media(">large-desktop") {
		color: blue;
	}
}
</style>