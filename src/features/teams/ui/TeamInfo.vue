<script lang="ts" setup>
import { TeamModel } from '@/entities';


const props = defineProps({
	team: {
		type: TeamModel,
		default: new TeamModel()
	}
})

</script>


<template>
	<div class="team-info">
		<div class="team-info__avatar">
			<img :src="team.imageUrl" />
		</div>
		<div class="team-info__description">
			<div class="team-info__title">
				{{ team.name }}
			</div>
			<div class="team-info__fields">
				<div class="team-info__field">
					<div class="field-label">Year of foundation</div>
					<div class="field-value">{{ team.foundationYear }}</div>
				</div>
				<div class="team-info__field">
					<div class="field-label">Division</div>
					<div class="field-value">{{ team.division }}</div>
				</div>
				<div class="team-info__field">
					<div class="field-label">Conference</div>
					<div class="field-value">{{ team.conference }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.team-info {
	display: flex;
	background: linear-gradient(276deg, #707070 0%, #393939 100.28%);
	border-radius: 0px 0px 10px 10px;
	color: #fff;
	padding: 65px 46px 65px 0;

	&__avatar {
		display: flex;
		padding: 0 146px;
		justify-content: center;
		align-items: center;
	}

	&__title {
		font-size: 36px;
		font-weight: 800;
		line-height: 50px;
	}

	&__fields {
		margin-top: 40px;
		column-gap: 84px;
		row-gap: 54px;
		display: flex;
		flex-wrap: wrap;
	}

	&__field {
		display: flex;
		flex-direction: column;

		.field-label {
			font-weight: 800;
			font-size: 24px;
			line-height: 32px;
		}

		.field-value {
			font-size: 18px;
			font-weight: 500;
		}
	}

	img {
		max-width: 210px;
		max-height: 210px;
	}
}
</style>