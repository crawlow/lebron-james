<script lang="ts" setup>
import { UiButton, UiCheckbox, UiInput, UiLink } from "@/shared"
import { RegisterModel } from "@/entities";
import { computed, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, sameAs, helpers } from "@vuelidate/validators";

const emit = defineEmits<{
	(eventName: "signUp", value: RegisterModel): void;
}>();
const confirmPassword = ref('')
const isAgreement = ref(false);
const data = ref(new RegisterModel());
const rules = {
	data: {
		userName: { required },
		login: { required },
		password: { required, minLengthValue: minLength(8) },
	},
	confirmPassword: {
		required,
		sameAsPassword: sameAs(computed(() => data.value.password))
	},
	isAgreement: {
		sameAs: helpers.withMessage(
			() => `Agreements must be accepted`, sameAs(true))
	}
}
const v$ = useVuelidate<any>(
	rules,
	{ data, confirmPassword, isAgreement }
)
const signUp = () => {
	v$.value.$touch();
	if (v$.value.$invalid) {
		return;
	}
	emit('signUp', data.value);
}

</script>

<template>
	<form class="sign-in__form">
		<UiInput v-model="data.userName" :v="v$.data.name" label="Name" />
		<UiInput v-model="data.login" :v="v$.data.login" label="Login" />
		<UiInput v-model="data.password" :v="v$.data.password" label="Password" type="password" />
		<UiInput v-model="confirmPassword" :v="v$.confirmPassword" label="Enter your password again" type="password" />
		<UiCheckbox :v="v$.isAgreement" v-model="isAgreement">I accept the agreement</UiCheckbox>
		<UiButton @click.prevent="signUp">Sign Up</UiButton>
		<div class="sign-in__register">
			Allready a member?
			<UiLink :to="{ name: 'signIn' }">Sign In</UiLink>
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