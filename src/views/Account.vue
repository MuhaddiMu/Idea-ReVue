<template>
	<v-layout row justify-center>
		<v-snackbar v-model="Snackbar" top>{{SnackbarMsg}}
			<v-btn color="pink" flat @click="Snackbar = false"> Close</v-btn>
		</v-snackbar>
		<v-dialog v-model="dialog" persistent max-width="600px">
			<v-card v-if="!PassDialogue">
				<v-form ref="Form">
					<v-card-title>
						<span class="headline">User Profile</span>
					</v-card-title>
					<v-card-text>
						<v-container grid-list-md>
							<v-layout wrap>
								<v-flex xs12>
									<v-text-field v-model="UserName" prepend-icon="person" label="Full Name" required :rules="[rules.NameReq]"></v-text-field>
								</v-flex>
								<v-flex xs12>
									<v-text-field v-model="UserEmail" prepend-icon="email" label="New Email" required :rules="[rules.EmailRequired, rules.EmailValid]"></v-text-field>
								</v-flex>
							</v-layout>
							<v-divider light></v-divider>
							<v-layout wrap>
								<v-flex xs6>
									<v-text-field v-model="CurrentEmail" prepend-icon="email" label="Current Email" required :rules="[rules.EmailRequired, rules.EmailValid]"></v-text-field>
								</v-flex>
								<v-flex xs6>
									<v-text-field @keyup.enter="UpdateProfile()" prepend-icon="lock" label="Current Password" required v-model="CurPass" :append-icon="Pass ? 'visibility' : 'visibility_off'" :rules="[rules.PassRequired, rules.PassMin]" :type="Pass ? 'text' : 'password'" hint="At least 8 characters" counter @click:append="Pass = !Pass"></v-text-field>
								</v-flex>
							</v-layout>
						</v-container>
					</v-card-text>
					<v-card-actions>
						<v-btn flat @click="PassDialogue = !PassDialogue">Change Password</v-btn>
						<v-spacer></v-spacer>
						<v-btn flat @click="dialog = false">Close</v-btn>
						<v-btn :loading="Loading" flat @click="UpdateProfile">Save</v-btn>
					</v-card-actions>
				</v-form>
			</v-card>


			<v-card v-else>
				<v-form ref="Form">
					<v-card-title>
						<span class="headline">User Password</span>
					</v-card-title>
					<v-card-text>
						<v-container grid-list-md>
							<v-layout wrap>
								<v-flex xs12>
									<v-text-field prepend-icon="lock" label="New Password" required v-model="RegPass" :append-icon="Pass ? 'visibility' : 'visibility_off'" :rules="[rules.PassRequired, rules.PassMin]" :type="Pass ? 'text' : 'password'" hint="At least 8 characters" counter @click:append="Pass = !Pass"></v-text-field>
								</v-flex>
							</v-layout>
						</v-container>
					</v-card-text>
					<v-card-actions>
						<v-btn flat @click="PassDialogue = !PassDialogue">Edit Profile</v-btn>

						<v-spacer></v-spacer>
						<v-btn flat @click="dialog = false">Close</v-btn>
						<v-btn flat @click="UpdateProfile">Save</v-btn>
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
			Pass: false,
			Snackbar: false,
			SnackbarMsg: '',
			CurPass: '',
			CurrentEmail: '',
			PassDialogue: false,
			Loading: false,

			rules: {
				NameReq: value => !!value || 'Required.',
				PassRequired: value => !!value || 'Required.',
				PassMin: v => v.length >= 8 || 'Min 8 characters',
				EmailRequired: v => !!v || 'E-mail is required',
				EmailValid: v => /.+@.+/.test(v) || 'E-mail must be valid'
			},
		}
	},

	methods: {
		ShowModal() {
			this.dialog = true;
		},

		UpdateProfile() {
			let self = this
			var Email = this.$store.state.UserEmail;
			if (this.$refs.Form.validate()) {
				this.Loading = true;
				firebase.firebase.auth().signInWithEmailAndPassword(this.CurrentEmail, this.CurPass).then(function(User) {
					User.user.updateEmail(Email).then(function() {
						self.Loading = false
						self.dialog = false
						self.Snackbar = true
						self.SnackbarMsg = "Profile Updated"
						self.CurPass = self.CurrentEmail = ''
						self.$refs.Form.resetValidation()
					}).catch(function(error) {
						self.Loading = false
						self.Snackbar = true
						self.SnackbarMsg = error.message
					});
				}).catch(function(error) {
					self.Loading = false
					self.Snackbar = true
					self.SnackbarMsg = error.message
				});
			}
		}

	},
	computed: {
		UserName: {
			get() {
				return this.$store.getters.GetUserName;
			},

			set(value) {
				this.$store.commit('UpdateUsername', value)
			}
		},

		UserEmail: {
			get() {
				return this.$store.state.UserEmail;
			},

			set(value) {
				this.$store.commit('UpdateEmail', value)
			}

		}
	},
	created() {
		this.$store.dispatch('UserName');
		this.$store.dispatch('UserEmail');
	}
}
</script>

<style>

</style>