<script lang="ts" setup>
import { AuthLayout } from '@/shared';
import { SignUp } from '@/widgets';
import Dribbling from "@/shared/assets/img/illlustrations/dribbling.svg";
</script>

<template>
	<div class="page-sign-Up">
		<AuthLayout :img="Dribbling" title="Sign Up">
			<SignUp />
		</AuthLayout>
	</div>
</template>

<style lang="scss" scoped></style>