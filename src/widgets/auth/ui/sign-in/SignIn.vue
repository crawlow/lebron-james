<script lang="ts" setup>
import { AuthModel, useAuthStore } from "@/entities";
import { SignInForm } from "@/features";
import { useRouter } from "vue-router";

const { signIn } = useAuthStore();
const router = useRouter();

const onSignIn = async (data: AuthModel) => {
	try {
		const res = await signIn(data);
		if (res) {
			router.push({ name: 'teams' });
		}
	} catch(e) {
		console.log('e', e);		
	}
}

</script>

<template>
	<SignInForm @sign-in="onSignIn" />
</template>