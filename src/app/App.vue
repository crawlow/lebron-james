<script lang="ts" setup>
import { Notification } from '@/features';
</script>

<template>
	<RouterView />
	<Notification group="app" :z-index="100" position="top-right" />
</template>

<style lang="scss">
* {
	padding: 0;
	margin: 0;
}
</style>