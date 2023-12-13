<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
	to: {
		default: '/'
	},
	disabled: {
		type: Boolean,
		default: false
	}
})
const externalLinkRegex = /^(https?:\/\/)?(www\.)?\S+\.\S+/i;
const isExternalLink = computed(() => typeof props.to === 'string' && externalLinkRegex.test(props.to))
</script>

<template>
	<span class="ui-link" :class="{ disabled: disabled }">
		<a v-if="isExternalLink" :href="to" target="_blank">
			<slot />
		</a>
		<RouterLink v-else :to="to">
			<slot />
		</RouterLink>
	</span>
</template>

<style lang="scss" scoped>
.ui-link {

	a {
		font-size: 14px;
		font-weight: 500;
		color: $red;
		text-decoration: underline;

		&:hover {
			text-decoration: none;
		}
	}

	&.disabled {
		pointer-events: none;

		a {
			color: $lightest-gray;
		}
	}
}
</style>