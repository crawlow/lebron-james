<script lang="ts" setup>
import { ref } from 'vue';
import HeaderLayout from './HeaderLayout.vue';
import Sidebar from './Sidebar.vue';

const showHamburger = ref(false);

</script>

<template>
	<div class="default-layout">
		<HeaderLayout v-model="showHamburger" />
		<div class="default-layout__wrapper">
			<main class="main-container">
				<RouterView />
			</main>
		</div>
		<Sidebar v-model="showHamburger" />
	</div>
</template>

<style lang="scss" scoped>
.default-layout {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	background-color: $superlight-gray;

	&__wrapper {
		padding-top: 80px;
		padding-left: 140px;
		display: flex;
		flex-direction: column;
		flex-grow: 1;

		.main-container {
			flex-grow: 1;
			padding: 32px 80px;
			display: flex;
			flex-direction: column;
		}
	}

	@include media('<desktop') {
		&__wrapper {
			padding-left: 0;
			padding-top: 62px;

			.main-container {
				padding: 32px;
			}
		}
	}

	@include media('<tablet') {
		&__wrapper {

			.main-container {
				padding: 16px 12px;
			}
		}
	}
}

.test {
	color: $blue;

	@include media(">large-desktop") {
		color: blue;
	}
}
</style>