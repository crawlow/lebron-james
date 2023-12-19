<script lang="ts" setup>
import { TeamModel } from '@/entities';
import GroupPerson from '@/shared/assets/img/icons/group_person.svg';


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
			<img :class="{ 'no-image': !team.imageUrl }" :src="team.imageUrl || GroupPerson" />
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
	background: linear-gradient(276deg, $gray 0%, #393939 100.28%);
	border-radius: 0px 0px 10px 10px;
	color: #fff;
	gap: 56px;

	&__description {
		flex-grow: 1;
		padding: 66px 48px 66px 0;
	}

	&__avatar {
		display: flex;
		max-width: 100%;
		justify-content: center;
		align-items: center;
		width: 502px;

		img {
			width: 210px;
			max-height: 210px;

			&.no-image {
				width: 210px;
				height: 210px;
			}
		}
	}

	&__title {
		font-size: 36px;
		font-weight: 800;
		line-height: 50px;

		&-number {
			color: $light-red;
			font-weight: 800;
		}
	}

	&__fields {
		margin-top: 40px;
		column-gap: 32px;
		row-gap: 54px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		flex-wrap: wrap;
	}

	&__field {
		display: flex;
		flex-direction: column;
		gap: 8px;

		.field-label {
			font-weight: 800;
			font-size: 24px;
			line-height: 32px;
		}

		.field-value {
			font-size: 18px;
			font-weight: 500;
			line-height: 25px;
		}
	}

	@include media('<desktop') {
		display: flex;
		flex-direction: column;

		&__description {
			padding: 0 0 48px 0;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		&__avatar {
			width: 100%;
			justify-content: center;
			padding-top: 48px;

			img {
				width: auto;
				max-width: 100%;

				&.no-image {
					width: 155px;
					max-height: 155px;
				}
			}
		}

		&__fields {
			display: grid;
			row-gap: 32px;
			column-gap: auto;
			grid-template-columns: 1fr;
			align-items: center;
		}

		&__title {
			text-align: center;
		}

		&__field {
			align-items: center;
		}
	}

	@include media('<tablet') {
		display: grid;
		grid-template-columns: 1fr;
		gap: 48px;

		&__title {
			text-align: center;
			font-size: 17px;
			line-height: 32px;
		}

		&__field {
			align-items: center;
			font-size: 17px;

			.field-label {
				font-size: 17px;
			}

			.field-value {
				font-size: 15px;
			}
		}

		border-radius: 0;
	}
}
</style>