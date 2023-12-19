<script lang="ts" setup>
import { UiButton, UiCheckbox, UiInput, UiLink } from "@/shared"
import { AuthModel } from "@/entities";
import { ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

const emit = defineEmits<{
	(eventName: "signIn", value: AuthModel): void;
}>();

const data = ref(new AuthModel());
const rules = {
	data: {
		login: { required },
		password: { required, minLengthValue: minLength(8) },
	},
}
const v$ = useVuelidate<any>(
	rules,
	{ data }
)
const signIn = () => {
	v$.value.data.$touch();
	if (v$.value.$invalid) {
		return;
	}
	emit('signIn', data.value);
}

</script>

<template>
	<form class="sign-in__form">
		<UiInput v-model="data.login" :v="v$.data.login" label="Login" />
		<UiInput v-model="data.password" :v="v$.data.password" label="Password" type="password" />
		<UiButton @click.prevent="signIn">Sign In</UiButton>
		<div class="sign-in__register">
			Not a member yet?
			<UiLink :to="{ name: 'signUp' }">Sign Up</UiLink>
		</div>
	</form>
</template>

<style lang="scss" scoped>
.sign-in {
	&__form {
		display: flex;
		flex-direction: column;
		gap: 24px;
		width: 100%;

	}

	&__register {
		text-align: center;
		font-size: 15px;
		line-height: 24px;
		font-weight: 500;
		color: $gray;
	}
}
</style>