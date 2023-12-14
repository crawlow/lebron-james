<script lang="ts" setup>
import { UiButton, UiInput } from "@/shared"
import { AuthModel } from "@/entities";
import { ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
const data = ref(new AuthModel());
const rules = {
	data: {
		login: { required },
		password: { required, minLengthValue: minLength(8) },
	}
}
const validate = useVuelidate<any>(
	rules,
	{ data }
)
const signIn = () => {
	validate.value.$touch()
	console.log('v$.value', validate.value)

	// TODO send login
	console.log('send login');
}

</script>

<template>
	<form class="sign-in__form">
		<UiInput v-model="data.login" :v="validate.data.login" label="Login" />
		<UiInput v-model="data.password" :v="validate.data.password" label="Password" type="password" />
		<UiButton @click.prevent="signIn">Sign In</UiButton>
	</form>
</template>

<style lang="scss" scoped>
.sign-in__form {
	display: flex;
	flex-direction: column;
	gap: 24px;
	width: 100%;
	max-width: 336px;
}
</style>