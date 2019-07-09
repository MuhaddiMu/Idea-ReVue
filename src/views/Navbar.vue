<template>
<nav v-show="Navbar">
  <v-snackbar v-model="LogSuccess" top>Success! Welcome to Dashboard<v-btn color="pink" flat @click="Snackbar = false" > Close</v-btn></v-snackbar>
  <v-toolbar app>
    <v-toolbar-side-icon class="grey--text" @click="Sidebar = !Sidebar"></v-toolbar-side-icon>
    <v-toolbar-title class="grey--text text-uppercase">
		<span class="subheading">Idea</span><span class="">Re-Vue</span>
		</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
	  <v-tooltip left><template v-slot:activator="{ on }">
		 <v-btn v-on="on" fab flat><v-icon large color="indigo">favorite</v-icon></v-btn>
      </template><span>Show Love By Tapping</span></v-tooltip>


      <v-btn flat>LEADER</v-btn>
      <v-btn @click="LogOut" flat>Log Out<v-icon right>exit_to_app</v-icon></v-btn>
    </v-toolbar-items>
  </v-toolbar>

    <v-navigation-drawer v-model="Sidebar" app>
      <v-layout align-center justify-center column text-xs-center>
        <v-flex mt-3>
          <v-avatar size="100">
            <img
              src="https://www.muhaddis.info/wp-content/uploads/2016/08/Favicon-1.png"/>
          </v-avatar>
          <p class="black--text subheading mt-1">Muhammad Muhaddis</p>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-tile v-ripple>
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content class="grey--text">
           Muhaddis
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
  </v-navigation-drawer>
</nav>
</template>

<script>
import firebase from '../firebase';
import EventBus from '../EventBus';
export default {

	data(){
		return {
      Sidebar: false,
      Navbar: false,
      LogSuccess: false,
		}
  },
  methods: {
     LogOut(){
      const AUTH  = firebase.firebase.auth()
      AUTH.signOut().then(() => {
        this.$router.replace('/Auth');
      });
    },
    ShowLoggedInMessage(){
      EventBus.$on("LoggedInSuccess", function () {
        //Show Snackbar
      }
    )}
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },

	created(){
    this.ShowLoggedInMessage();
	
    if(this.$store.getters.getUser){
      this.Navbar = true;
    }
  },
}
</script>

<style>

</style>
