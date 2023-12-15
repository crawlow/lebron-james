<script lang="ts" setup>

const props = defineProps({
	img: {
		type: String,
		default: ''
	},
	title: {
		type: String,
		default: ''
	}
})

</script>

<template>
	<div class="auth">
		<div class="auth__actions">
			<div class="auth__actions-wrap">
				<h1 class="auth__actions-title" v-if="title">{{ title }}</h1>
				<slot />
			</div>
		</div>
		<div class="auth__placeholder" v-if="img">
			<img class="auth__placeholder-image" :src="img" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.auth {
	display: flex;
	height: 100vh;
	align-items: center;
	background-color: $light-blue;

	&__actions {
		width: 606px;
		display: flex;
		justify-content: center;
		background-color: #fff;
		height: 100%;
		align-items: center;
		flex-direction: column;

		&-wrap {
			max-width: 336px;
			width: 100%;
		}

		&-title {
			font-size: 36px;
			font-weight: 400;
			line-height: 50px;
			color: $blue;
		}
	}

	&__placeholder {
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 64px;

		img {
			max-width: 100%;
		}
	}

	@include media('<desktop') {
		&__placeholder {
			display: none;
		}

		&__actions {
			flex-grow: 1;
			width: auto;
			padding: 0 16px;

			&-title {
				text-align: center;
			}
		}
	}
}
</style>