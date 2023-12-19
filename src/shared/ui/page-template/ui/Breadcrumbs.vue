<script lang="ts" setup>
import { PropType } from 'vue';
import { BreadcrumbsModel } from '../models';
import { UiLink } from '@/shared/ui/link';

const props = defineProps({
	breadcrumbs: {
		type: Array as PropType<Array<BreadcrumbsModel>>,
		default: []
	}
});

</script>

<template>
	<div class="breadcrumbs">
		<template v-for="item in breadcrumbs">
			<template v-if="item.to">
				<UiLink :decoration="false" :to="item.to">{{ item.text }}</UiLink>
				<span> / </span>
			</template>
			<span v-else>{{ item.text }}</span>
		</template>
	</div>
</template>

<style lang="scss" scoped>
.breadcrumbs {
	color: $red;
	font-weight: 500;
	font-size: 14px;
	line-height: 24px;

	@include media('<tablet') {
		line-height: 16px;
		font-size: 13px;
	}
}
</style>