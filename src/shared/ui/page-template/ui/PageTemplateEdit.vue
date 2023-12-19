<script lang="ts" setup>

</script>

<template>
	<div class="page-template-edit">
		<div class="page-template-edit__header">
			<slot name="header" />
		</div>
		<div class="page-template-edit__container">
			<slot />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.page-template-edit {
	display: flex;
	flex-direction: column;
	background-color: #fff;
	border-radius: 10px;

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24px 32px;
	}

	@include media('<tablet') {
		border-radius: 0;
		margin: 0 -16px;

		&__header {
			padding: 16px;
		}
	}
}
</style>