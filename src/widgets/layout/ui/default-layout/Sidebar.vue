<script lang="ts" setup>
import { useAuthStore } from '@/entities';
import { UserInfo } from '@/features';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(['update:modelValue'])

const value = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value);
	}
})

const onClickOutside = () => {
	if (value.value)
		value.value = !value.value;
}

const onSignOut = async () => {
	const { signOut } = useAuthStore();
	const res = await signOut();
	if (res) {
		router.push('/');
	}
}

</script>

<template>
	<nav class="sidebar" :class="{ active: value }">
		<ul>
			<li class="menu-item">
				<span class="sidebar__user">
					<UserInfo />
				</span>
			</li>
			<li class="menu-item">
				<RouterLink :to="{ name: 'teams' }" @click.native="onClickOutside">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M10.9899 8C10.9899 9.66 9.65989 11 7.99989 11C6.33989 11 4.99989 9.66 4.99989 8C4.99989 6.34 6.33989 5 7.99989 5C9.65989 5 10.9899 6.34 10.9899 8ZM18.99 8C18.99 9.66 17.66 11 16 11C14.34 11 13 9.66 13 8C13 6.34 14.34 5 16 5C17.66 5 18.99 6.34 18.99 8ZM7.99997 13C5.66997 13 0.999969 14.17 0.999969 16.5V18C0.999969 18.55 1.44997 19 1.99997 19H14C14.55 19 15 18.55 15 18V16.5C15 14.17 10.33 13 7.99997 13ZM15.0301 13.05C15.3801 13.02 15.7101 13 16.0001 13C18.33 13 23 14.17 23 16.5V18C23 18.55 22.55 19 22 19H16.8201C16.93 18.69 17 18.35 17 18V16.5C17 15.03 16.2101 13.92 15.0701 13.09C15.067 13.0869 15.064 13.083 15.0607 13.0787C15.0531 13.0688 15.044 13.0569 15.0301 13.05Z"
							fill="#9C9C9C" />
					</svg>
					<span class="menu-item__name">Teams</span>
				</RouterLink>
			</li>
			<li class="menu-item">
				<RouterLink :to="{ name: 'players' }" @click.native="onClickOutside">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M15.9999 8C15.9999 10.21 14.2099 12 11.9999 12C9.78989 12 7.99989 10.21 7.99989 8C7.99989 5.79 9.78989 4 11.9999 4C14.2099 4 15.9999 5.79 15.9999 8ZM3.99997 18C3.99997 15.34 9.32997 14 12 14C14.67 14 20 15.34 20 18V19C20 19.55 19.55 20 19 20H4.99997C4.44997 20 3.99997 19.55 3.99997 19V18Z"
							fill="#9C9C9C" />
					</svg>
					<span class="menu-item__name">Players</span>
				</RouterLink>
			</li>
			<li class="menu-item logout" @click="onSignOut">
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M2.99991 3.00977H20.9999C22.0999 3.00977 22.9999 3.90977 22.9999 5.00977V18.9898C22.9999 20.0898 22.0999 20.9898 20.9999 20.9898H2.97991C1.88991 20.9898 0.999908 20.0998 0.999908 19.0098V15.9998C0.999908 15.4498 1.44991 14.9998 1.99991 14.9998C2.54991 14.9998 2.99991 15.4498 2.99991 15.9998V18.0198C2.99991 18.5698 3.44991 19.0198 3.99991 19.0198H19.9999C20.5499 19.0198 20.9999 18.5698 20.9999 18.0198V5.98977C20.9999 5.43977 20.5499 4.98977 19.9999 4.98977H3.99991C3.44991 4.98977 2.99991 5.43977 2.99991 5.98977V7.99977C2.99991 8.54977 2.54991 8.99977 1.99991 8.99977C1.44991 8.99977 0.999908 8.54977 0.999908 7.99977V5.00977C0.999908 3.90977 1.89991 3.00977 2.99991 3.00977ZM14.6399 12.3598L11.8499 15.1498C11.5399 15.4598 10.9999 15.2398 10.9999 14.7898V12.9998H1.99991C1.44991 12.9998 0.999908 12.5498 0.999908 11.9998C0.999908 11.4498 1.44991 10.9998 1.99991 10.9998H10.9999V9.20981C10.9999 8.75981 11.5399 8.53981 11.8499 8.85981L14.6399 11.6498C14.8399 11.8498 14.8399 12.1598 14.6399 12.3598Z"
							fill="#9C9C9C" />
					</svg>
					<span class="menu-item__name">Sign Out</span>
				</span>
			</li>
		</ul>
		<Transition name="fade">
			<div class="sidebar__overlay" v-if="value" @click="onClickOutside"></div>
		</Transition>
	</nav>
</template>

<style lang="scss" scoped>
.sidebar {
	position: fixed;
	width: 140px;
	height: 100%;
	background-color: #fff;
	display: flex;
	padding-top: 80px;

	&__user {
		display: none;
	}

	ul {
		padding: 32px 0;
		display: flex;
		flex-direction: column;
		gap: 36px;
		flex-grow: 1;

		.menu-item {
			display: flex;
			justify-content: center;

			&.logout {
				margin-top: auto;
				cursor: pointer;
			}

			a,
			>span {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-decoration: none;
				transition: 0.15s ease-in-out;
				color: $light-gray;
				gap: 4px;

				svg {
					path {
						transition: 0.15s ease-in-out;
					}
				}

				&.router-link-active {
					color: $red;

					svg {
						path {
							fill: $red;
						}
					}
				}
			}

			&:hover {

				a,
				>span {
					color: $light-red;
				}

				svg {
					path {
						fill: $light-red;
					}
				}
			}
		}
	}

	@include media('<desktop') {
		width: 200px;
		left: -200px;
		transition: 0.25s ease-in-out;
		padding-top: 62px;

		&__user {
			display: block;
		}



		.fade-enter-active,
		.fade-leave-active {
			transition: 0.25s ease-in-out;
		}

		.fade-enter-from,
		.fade-leave-to {
			opacity: 0;
		}

		&__overlay {
			position: fixed;
			top: 62px;
			left: 0;
			right: 0;
			bottom: 0;
			background: #414141;
			opacity: 0.6;
		}

		&.active {
			left: 0;

			ul {
				position: relative;
				z-index: 1;
				background-color: #fff;
				align-items: start;
				padding: 16px 0 24px;
				gap: 24px;

				.menu-item {
					padding-left: 20px;

					&:first-child {
						padding-left: 16px;
						border-bottom: 1px solid $gray;
						width: 100%;
						justify-content: flex-start;
						padding-bottom: 16px;
					}

					a,
					span {
						flex-direction: row;
						gap: 8px;

						&.router-link-active {
							color: $red;
						}
					}

					.sidebar__user {

						.user-info {
							flex-direction: row-reverse;
						}
					}
				}
			}
		}

	}
}
</style>
