<script lang="ts" setup>
import { RegisterModel, useAuthStore } from "@/entities";
import { SignUpForm } from "@/features";
import { useRouter } from "vue-router";

const { signUp } = useAuthStore()
const router = useRouter();

const onSignUp = async (data: RegisterModel) => {
	const res = await signUp(data);
	if (res) {
		router.push({ name: 'teams' });
	}
}

</script>

<template>
	<SignUpForm @sign-up="onSignUp" />
</template>