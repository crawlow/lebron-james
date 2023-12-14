<script lang="ts" setup>
import { UiInput, UiButton, UiCheckbox, SelectOptionModel, UiSelect, UiMultiSelect, Logo, UiLink, UiPagination, UiAvatar, UiDatepicker } from "@/shared";
import { computed, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';
import Add24px from "@/shared/assets/img/icons/add_24px.svg";
import { NotificationBus, NotificationMessage } from "@/features";
/**Управление уведомлениями */
const notification = new NotificationBus()
const login = ref('');
const password = ref('');
const search = ref('');
const testCheck = ref(false);
const v$ = useVuelidate(
	{
		login: { required, email },
		password: { required },
		testCheck: { sameAs: sameAs(true) },
	},
	{ login, password, testCheck }
)
const signIn = () => {
	// v$.value.$touch();
	// console.log(v$.value);
	notification.Show(NotificationMessage.Error('User with the specified username / password was not found.'))
}

const select = ref(new SelectOptionModel({ name: 'first', value: 1 }))
const selectOptions = ref([
	new SelectOptionModel({ name: 'first', value: 1 }),
	new SelectOptionModel({ name: 'second', value: 2 }),
	new SelectOptionModel({ name: 'third', value: 3 }),
	new SelectOptionModel({ name: 'four', value: 4 }),
	new SelectOptionModel({ name: 'five', value: 5 }),
	new SelectOptionModel({ name: 'six', value: 6 }),
	new SelectOptionModel({ name: 'seven', value: 7 }),
])

const selectTwo = ref(new SelectOptionModel({ name: '6', value: 6 }))
const selectOptionsTwo = ref([
	new SelectOptionModel({ name: '6', value: 6 }),
	new SelectOptionModel({ name: '12', value: 12 }),
	new SelectOptionModel({ name: '24', value: 24 }),
])

const multiSelect = ref([new SelectOptionModel({ name: 'first', value: 1 })])

const page = ref(1);

const updateHandler = (val: any) => {
	console.log('updateHandler', val);

}

const testDatepicker = ref()

</script>

<template>
	<div class="page-sign-in">
		<div style="margin-bottom: 16px">
			SignIn {{ login }}
		</div>
		<Logo />
		<div style="display: flex; gap: 16px; flex-direction: column;">
			<UiDatepicker v-model="testDatepicker" />
			<UiAvatar url="https://static.tildacdn.com/tild6639-3830-4162-b066-363135316639/Emoji_Teacher.png" />
			<!-- <UiInput @keyup.enter="signIn" is-search v-model="search" />
			<UiInput @keyup.enter="signIn" label="Login" :v="v$.login" v-model="login" />
			<UiInput @keyup.enter="signIn" label="Password" :v="v$.password" type="password" v-model="password" />
			<UiButton disabled @click="signIn">Sign In<template #right>+</template></UiButton>
			<UiButton type="secondary" @click="signIn">Sign In<template #right>+</template></UiButton>
			<UiCheckbox :v="v$.testCheck" v-model="testCheck">test</UiCheckbox>
			<UiPagination v-model="page" :pages="10" :range-size="1" @update:modelValue="updateHandler" />
			<UiSelect v-model="select" :options="selectOptions" />
			<div class="page-miltiselect-wrapper">
				<UiMultiSelect v-model="multiSelect" :options="selectOptions" />
			</div>
			<div class="page-select-wrapper">
				<UiSelect :clearable="false" v-model="selectTwo" :options="selectOptionsTwo" />
			</div>
			<UiLink disabled to="https://google.com">test</UiLink>
			<UiLink to="/signup">signup</UiLink> -->
		</div>
	</div>
</template>

<style lang="scss" scoped>
.page-sign-in {
	padding: 24px;

	.page-select-wrapper {
		max-width: 88px;
	}

	.page-miltiselect-wrapper {
		max-width: 360px;
	}
}
</style>