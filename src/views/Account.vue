<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="UserName" prepend-icon="person" label="Full Name" required></v-text-field>
              </v-flex>
			  <v-flex xs12>
                <v-text-field v-model="UserEmail" prepend-icon="email" label="Email" required :rules="[rules.EmailRequired, rules.EmailValid]"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field prepend-icon="lock" label="Password" required v-model="RegPass" :append-icon="Pass ? 'visibility' : 'visibility_off'" :rules="[rules.PassRequired, rules.PassMin]" :type="Pass ? 'text' : 'password'" hint="At least 8 characters" counter @click:append="Pass = !Pass" ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import firebase from '../firebase'
export default {
	data(){
		return{
      dialog: false,
      Pass: false,
      RegPass: '',
      rules: {
				PassRequired: value => !!value || 'Required.',
				PassMin: v => v.length >= 8 || 'Min 8 characters',
				EmailRequired: v => !!v || 'E-mail is required',
				EmailValid: v => /.+@.+/.test(v) || 'E-mail must be valid'
			},
		}
  },
  
  methods: {
    ShowModal(){
      this.dialog = true;
    }

  },
  computed: {
    UserName(){
      return this.$store.state.UserName;
    },

    UserEmail(){
      return this.$store.state.user.email;
    }
  },
  created(){
    this.$store.dispatch('UserName');
  }
}
</script>

<style>

</style>
