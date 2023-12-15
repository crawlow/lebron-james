<script lang="ts" setup>
import { AuthLayout } from '@/shared';
import { SignIn } from '@/widgets';
import Dank from "@/shared/assets/img/illlustrations/dank.svg";
</script>

<template>
	<div class="page-sign-in">
		<AuthLayout :img="Dank" title="Sign In">
			<SignIn />
		</AuthLayout>
	</div>
</template>

<style lang="scss" scoped></style>