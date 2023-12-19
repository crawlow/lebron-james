<script lang="ts" setup>
import { Error, ErrorModel } from "@/shared"
import { Error404 } from "@/shared/assets/img"
import { ref } from "vue";
const error = ref(new ErrorModel({
	img: Error404,
	title: 'Page not found',
	description: 'Sorry, we can’t find what you’re looking for'
}))
</script>

<template>
	<div class="page-error">
		<Error :error="error" />
	</div>
</template>

<style lang="scss" scoped>
.page-error {
	min-height: 100vh;
	max-width: 100%;
	padding: 0 16px;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>