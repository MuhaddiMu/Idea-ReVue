<template>
	<v-layout row justify-center>
		<v-snackbar v-model="Snackbar" top>{{SnackbarMsg}}
			<v-btn color="pink" flat @click="Snackbar = false"> Close</v-btn>
		</v-snackbar>
		
		<v-dialog v-model="dialog" dark persistent max-width="500px">
			<v-card>
				<v-form ref="Form">
					<v-card-title>
						<span class="headline">Wohoo! You Got An Idea...</span>
					</v-card-title>
					<v-container grid-list-md>
					<v-flex xs12><blockquote><span class="LeftBorder">I write down so many ideas that it hurts my head to come up with one more. Then I try to write down five more.</span><cite> – James Altucher</cite></blockquote></v-flex>
					</v-container>
					<v-card-text>
							<v-layout wrap>
								<v-flex xs12>
									<v-text-field prepend-inner-icon="edit" v-model="Title" :rules="[Rules.Title]" label="Title" box></v-text-field>
								</v-flex>
								<v-flex xs12>
									<v-text-field prepend-inner-icon="format_align_left" v-model="Description" label="Description" append-icon="star" box></v-text-field>
								</v-flex>
								<v-flex>
									<v-menu dark
										v-model="DateBox"
										:close-on-content-click="false"
										full-width
										max-width="290"
										>
										<template v-slot:activator="{ on }">
											<v-text-field
											prepend-inner-icon="date_range"
											:value="computedDateFormattedMomentjs"
											box
											label="Expected Date to Complete"
											readonly
											v-on="on"
											></v-text-field>
										</template>
										<v-date-picker
											v-model="date"
											@change="DateBox = false"
										></v-date-picker>
										</v-menu>
								</v-flex>
							</v-layout>
					</v-card-text>
					<v-card-actions>
					<v-spacer></v-spacer>
						<v-btn flat @click="dialog = false">Close</v-btn>
						<v-btn @click="SaveIdea" class="primary" :loading="Loading" flat >Save</v-btn>
					</v-card-actions>
				</v-form>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
import firebase from '../firebase'
import store from '../store';
import moment from 'moment';
export default {
	data() {
		return {
			date: '',
      		DateBox: false,
			dialog: false,
			Snackbar: false,
			SnackbarMsg: '',
			Loading: false,
			ToBeCompleted: '',
			Title: '',
			Description: '',
			Rules: {
				Title: value => !!value || 'Required.',
				ToBeCompleted: value => !!value || 'Required.',
			}
		}
	},

	methods: {
		ShowModal() {
			this.dialog = true;
		},

		SaveIdea(){
			let self = this
			if (this.$refs.Form.validate()) {
				this.Loading = true;
				firebase.firebase.firestore().collection("Ideas").doc().set({
					Title: this.Title,
					Description: this.Description,
					Completed: false,
					ToBeCompleted: this.computedDateFormattedMomentjs,
					Added: moment().format('Do MMMM YYYY')
				}).then(function(Idea) {
					self.Loading = false
					self.dialog = false
					self.SnackbarMsg = 'Ideated Successfully!'
					self.Snackbar = true
				})
				.catch(function(error) {
					
				});
			}
		}
	},

computed: {
	computedDateFormattedMomentjs () {
    	return this.date ? moment(this.date).format('Do MMMM YYYY') : ''
      },
	},
}
</script>

<style scoped>

  .LeftBorder:before, .LeftBorder:after {
      content: '\201C';
      color: lighten(hsl(200, 40, 10), 40%);
   }
   .LeftBorder:after {
      content: '\201D';
   }

</style>