<template>
	<v-layout row justify-center>
		<v-snackbar v-model="Snackbar" top>{{SnackbarMsg}}
			<v-btn color="pink" flat @click="Snackbar = false"> Close</v-btn>
		</v-snackbar>
		
		<v-dialog v-model="dialog" persistent max-width="600px">
			<v-card>
				<v-form ref="Form">
					<v-card-title>
						<span class="headline">Wohoo! You Got An Idea...</span>
					</v-card-title>

					<v-card-text>
						<v-container grid-list-md>
							<v-layout wrap>
								<v-flex xs12>
									<v-text-field prepend-inner-icon="edit" :rules="[Rules.Title]" label="Title" box></v-text-field>
								</v-flex>
								<v-flex xs12>
									<v-text-field prepend-inner-icon="format_align_left"  label="Description" append-icon="star" box></v-text-field>
								</v-flex>
							</v-layout>
						</v-container>
					</v-card-text>
					<v-card-actions>
					<v-spacer></v-spacer>
						<v-btn flat @click="dialog = false">Close</v-btn>
						<v-btn class="primary" :loading="Loading" flat >Save</v-btn>
					</v-card-actions>
				</v-form>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
import firebase from '../firebase'
import store from '../store';
export default {
	data() {
		return {
			dialog: false,
			Snackbar: false,
			SnackbarMsg: '',
			Loading: false,
			Rules: {
				Title: value => !!value || 'Required.',
			}
		}
	},

	methods: {
		ShowModal() {
			this.dialog = true;
		},

	},
}
</script>

<style>

</style>