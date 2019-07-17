<template>
	<v-container>
		<h1 class="text-xs-center display-3 blue--text Title">Idea Re-Vue</h1>
		<v-snackbar v-model="Snackbar" top>{{SnackbarMsg}}<v-btn color="pink" flat @click="Snackbar = false" > Close</v-btn></v-snackbar>
		<v-layout align-center justify-center row wrap>
			<v-flex xs12 md6>
				<v-card v-if="Login" justify-center color="grey lighten-4">
					<v-form ref="form">
						<vue-headful title="Account Login | Idea Re-Vue"/>

						<v-card-text class="headline text-xs-center px-0">Account Login</v-card-text>

						<v-flex align-self-center xs6 md8 offset-sm2>
							<v-text-field v-model="LoginEmail" key="LoginEmail" label="Email" prepend-icon="email" :rules="[rules.EmailRequired, rules.EmailValid]"></v-text-field>
						</v-flex>

						<v-flex align-self-center xs6 md8 offset-sm2>
							<v-text-field @keyup.enter="LogIn()" v-model="LoginPassword" key="LoginPassword" prepend-icon="lock" :append-icon="Pass ? 'visibility' : 'visibility_off'" :rules="[rules.PassRequired, rules.PassMin]" :type="Pass ? 'text' : 'password'" label="Password" hint="At least 8 characters" counter @click:append="Pass = !Pass" ></v-text-field>
						</v-flex>


						<v-flex align-self-center xs6 md8 offset-sm4>
							<v-btn @click="LogIn" flat :loading="Loading">Log In</v-btn>
							<v-btn @click="Login = !Login" flat>Register</v-btn>
						</v-flex>
					</v-form>
				</v-card>


				<v-card v-else justify-center color="grey lighten-4">
					<v-form ref="form">
						<vue-headful title="Account Registeration | Idea Re-Vue"/>

						<v-card-text class="headline text-xs-center px-0">Account Registeration</v-card-text>

						<v-flex align-self-center xs6 md8 offset-sm2>
							<v-text-field v-model="RegName" key="RegName" label="Full Name" prepend-icon="person" :rules="[rules.NameReq]"></v-text-field>
						</v-flex>

						<v-flex align-self-center xs6 md8 offset-sm2>
							<v-text-field v-model="RegEmail" key="RegEmail" label="Email" prepend-icon="email" :rules="[rules.EmailRequired, rules.EmailValid]"></v-text-field>
						</v-flex>

						<v-flex align-self-center xs6 md8 offset-sm2>
							<v-text-field @keyup.enter="Register()" key="RegPass" prepend-icon="lock" v-model="RegPass" :append-icon="Pass ? 'visibility' : 'visibility_off'" :rules="[rules.PassRequired, rules.PassMin]" :type="Pass ? 'text' : 'password'" label="Password" hint="At least 8 characters" counter @click:append="Pass = !Pass" ></v-text-field>
						</v-flex>


						<v-flex align-self-center xs6 md8 offset-sm4>
							<v-btn @click="Login = !Login" flat>Log In</v-btn>

							<v-btn @click="Register" flat :loading="Loading">Register</v-btn>
						</v-flex>
					</v-form>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import firebase from '../firebase';
import router from '../router'

export default {
	data(){
		return {
			Snackbar: false,
			SnackbarMsg: '',
			Loading: false,
			LoginEmail:	'',
			LoginPassword:	'',
			RegName:	'',
			RegEmail:	'',
			RegPass:	'',
			Pass: false,
			rules: {
				PassRequired: value => !!value || 'Required.',
				PassMin: v => v.length >= 8 || 'Min 8 characters',
				EmailRequired: v => !!v || 'E-mail is required',
				EmailValid: v => /.+@.+/.test(v) || 'E-mail must be valid',
				NameReq: value => !!value || 'Required.',
			},
			Login: true,
		}
	},

	methods: {
		Register(){
			if(this.$refs.form.validate()) {
				this.Loading = true
				const AUTH  = firebase.firebase.auth();
				AUTH.createUserWithEmailAndPassword(this.RegEmail, this.RegPass).then( user => {
					firebase.firebase.firestore().collection("Users").doc(user.user.uid).set({
							Name: this.RegName,
						}).then(() => {
							this.Loading = false
							this.$router.replace('/')
						});
						this.Loading = false
						this.$router.replace('/')
					}, 
				error => { 
					this.SnackbarMsg = error.message; 
					this.Loading = false
					this.Snackbar = true
				});
			}
		},

		LogIn(){
			if(this.$refs.form.validate()) {
				this.Loading = true
				const AUTH  = firebase.firebase.auth();
				AUTH.signInWithEmailAndPassword(this.LoginEmail, this.LoginPassword).then( user => {
				this.$router.replace('/')
				this.$eventBus.$emit('Sux');
				this.Loading = false
				},  error => { 
					this.SnackbarMsg = error.message; 
					this.Loading = false
					this.Snackbar = true
				});
			}
		},
	},

	created(){
		if(this.$store.getters.getUser){
			this.$router.replace('/')
    	}
	}
}
</script>
<style>
.Title {
	text-shadow: 0.07em 0.07em 0 rgba(0, 0, 0, 0.1);
}
</style>
