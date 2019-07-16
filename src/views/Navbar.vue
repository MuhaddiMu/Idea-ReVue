<template>
<nav v-show="Navbar">
  <v-toolbar app>
    <v-toolbar-side-icon class="grey--text" @click="Sidebar = !Sidebar"></v-toolbar-side-icon>
    <v-toolbar-title class="grey--text text-uppercase">
		<span class="subheading">Idea</span><span class="">Re-Vue</span>
		</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
	  <v-tooltip left><template v-slot:activator="{ on }">
		 <v-btn left v-on="on" fab flat><v-icon @click="LoveUpdate" large color="pink">favorite</v-icon></v-btn>
      </template><span>Show Love By Tapping</span></v-tooltip>
      <v-btn :ripple="false" class="TotalCount" font-weight-bold left flat><kbd class="body-2"><b>{{LoveCount}}</b> <v-icon class="ml-1" small>favorite</v-icon></kbd></v-btn>
      <v-btn @click="LogOut" flat>Log Out<v-icon right>exit_to_app</v-icon></v-btn>
    </v-toolbar-items>
  </v-toolbar>

    <v-navigation-drawer v-model="Sidebar" app>
      <v-layout align-center justify-center column text-xs-center>
        <v-flex mt-3>
          <v-avatar size="100">
            <v-gravatar :email="Email" :size="400"/>
          </v-avatar>
          <p class="black--text subheading mt-1">:Username</p>
          
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-tile @click="ShowModal" v-ripple>
          <v-list-tile-action>
            <v-icon>edit</v-icon>
          </v-list-tile-action>
          <v-list-tile-content class="grey--text">
           Update Account
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
  </v-navigation-drawer>
  <v-snackbar v-model="LogSuccess" top>Success! Welcome to Dashboard<v-btn color="pink" flat @click="LogSuccess = false" > Close</v-btn></v-snackbar>

  <Account ref="Account"></Account>


</nav>
</template>

<script>
import firebase from '../firebase';
import store from '../store';
import Account from './Account';
export default {

  components: {
    Account,
  },

	data(){
		return {
      Sidebar: false,
      Navbar: false,
      LogSuccess: false, 
      Email: this.$store.getters.getUser.email,
		}
  },
  methods: {
     LogOut(){
      const AUTH  = firebase.firebase.auth()
      AUTH.signOut().then(() => {
        this.$router.replace('/Auth');
      });
    },
    ShowModal(){
      this.$refs.Account.ShowModal();
    },

    LoveUpdate(){

    firebase.firebase.firestore().collection("Love").doc("Counter").set({
        Count: store.state.LoveCount + 1,
      }).then(function() {
          store.dispatch('SetLoveCount');
      }).catch(function(error) {
          console.error("Error writing document: ", error);
      });
    }
  },
  computed: {

    LoveCount(){
      return this.$store.state.LoveCount;
    },
  },

created(){
    if(this.$store.getters.getUser){
      this.Navbar = true;
    }
    setTimeout(() => {
      this.LogSuccess = true
    }, 2000);
  
  },
}
</script>