<script lang="ts" setup>
import { useUserStore } from '@/entities';
import { storeToRefs } from 'pinia';
import ProfilePlaceholder from "@/shared/assets/img/icons/profile_placeholder.svg"
import { computed } from 'vue';

const { currentUser } = storeToRefs(useUserStore());
const avatarUrl = computed(() => currentUser.value?.avatarUrl || ProfilePlaceholder)

</script>

<template>
	<div class="user-info">
		<div class="user-info__name">{{ currentUser?.name }}</div>
		<img :src="avatarUrl" />
	</div>
</template>

<style lang="scss" scoped>
.user-info {
	display: flex;
	align-items: center;
	gap: 16px;

	&__name {
		font-size: 14px;
		font-weight: 500;
		line-height: 24px;
		color: $dark-gray;
	}

	@include media('<desktop') {
		font-size: 15px;
	}
}
</style>