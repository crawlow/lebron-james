<script lang="ts" setup>
import { AuthModel, useAuthStore } from "@/entities";
import { SignInForm } from "@/features";
import { useRouter } from "vue-router";

const { signIn } = useAuthStore();
const router = useRouter();

const onSignIn = async (data: AuthModel) => {
	const res = await signIn(data);
	if (res) {
		router.push({ name: 'teams' });
	}
}

</script>

<template>
	<SignInForm @sign-in="onSignIn" />
</template>