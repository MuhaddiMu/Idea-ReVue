<template>
	<v-container>
		<vue-headful title="My Ideas | Idea Re-Vue"/>
		<v-layout row wrap>
			
			<v-flex class="ml-2" xs6 md3>
				<v-card hover max-width="320" class="mx-auto">
					<v-card-title class="title">My Card Title</v-card-title>
					<v-card-text>Card Description Goes Here...Card Description Goes Here...Card Description Goes Here...Card Description Goes Here...</v-card-text>
					<v-card-actions class="caption grey--text text--darken-3">
						Added on: 4th September 2019<v-spacer></v-spacer>
            		<v-btn icon><v-icon>more_vert</v-icon></v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
			<v-flex class="ml-2" xs6 md3>
				<v-card hover max-width="320" class="mx-auto">
					<v-card-title class="title">My Card Title</v-card-title>
					<v-card-text>Card Description Goes Here...Card Description Goes Here...Card Description Goes Here...Card Description Goes Here...</v-card-text>
					<v-card-actions class="caption grey--text text--darken-3">
						Added on: 4th September 2019<v-spacer></v-spacer>
            		<v-btn icon><v-icon>more_vert</v-icon></v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>

				<v-menu offset-y>
			<template v-slot:activator="{ on }">
				<v-btn
				color="primary"
				dark
				v-on="on"
				>
				Dropdown
				</v-btn>
			</template>
			<v-list>
				<v-list-item>
				<v-list-item-title>Muhaddis</v-list-item-title>
				</v-list-item>
			</v-list>
			</v-menu>

		</v-layout>
	</v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
