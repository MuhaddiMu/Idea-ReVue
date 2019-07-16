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
                <v-text-field prepend-icon="person" label="Full Name" required></v-text-field>
              </v-flex>
			  <v-flex xs12>
                <v-text-field prepend-icon="email" label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field prepend-icon="lock" label="Password" type="password" required></v-text-field>
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
export default {
	data(){
		return{
			dialog: false,
		}
  },
  
  methods: {
    ShowModal(){
      this.dialog = true;
    }
  }
}
</script>

<style>

</style>
