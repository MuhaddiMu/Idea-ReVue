<template>
	<v-container>
		<vue-headful Title="My Ideas | Idea Re-Vue"/>
		<v-layout row wrap>
			<v-flex class="ml-2" xs6 md3>
				<v-card hover max-width="320" class="mx-auto">
					<v-card-Title class="Title">My Card Title</v-card-Title>
					<v-card-text>Card Description Goes Here...Card Description Goes Here...Card Description Goes Here...Card Description Goes Here...</v-card-text>
					<v-card-actions class="caption grey--text text--darken-3">
						Added on: 4th September 2019<v-spacer></v-spacer>
            		<v-menu top offset-x>
						<template v-slot:activator="{ on }">
						<v-btn icon v-on="on" >
							<v-icon>more_vert</v-icon>
						</v-btn>
						</template>

						<v-list>
						<v-list-item
							v-for="(Option, i) in Options" :key="i">
							<v-list-item-title>{{ Option.Title }}</v-list-item-title>
						</v-list-item>
						</v-list>
					</v-menu>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			Options: [
				{ Title: 'Click Me' },
				{ Title: 'Click Me' },
				{ Title: 'Click Me' },
				{ Title: 'Click Me 2' },
			],
		}
	},
}
</script>

<style>

</style>
