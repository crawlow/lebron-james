<script lang="ts" setup></script>

<template>
	<span class="test">12345</span>
	<p>
		<router-link :to="{ name: 'teams' }">Go to Teams</router-link>
		<router-link :to="{ name: 'players' }">Go to Players</router-link>
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