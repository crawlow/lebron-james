<script lang="ts" setup>
import { PropType, computed } from 'vue';
import type { RouteLocationRaw } from "vue-router"

type Props = {
	to: RouteLocationRaw | string,
	disabled?: boolean,
	decoration?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	decoration: true,
	disabled: false
})

const externalLinkRegex = /^(https?:\/\/)?(www\.)?\S+\.\S+/i;
const isExternalLink = computed(() => typeof props.to === 'string' && externalLinkRegex.test(props.to))
const externalLink = computed(() => isExternalLink ? (props.to as string) : '/');
</script>

<template>
	<span class="ui-link" :class="[{ disabled: disabled }, { 'no-decoration': !decoration }]">
		<a v-if="isExternalLink" :href="externalLink" target="_blank">
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

	&.no-decoration {
		a {
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