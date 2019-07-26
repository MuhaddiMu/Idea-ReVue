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
          <p class="black--text subheading mt-1">{{UserName}}</p>
          
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
        <v-list-tile @click="ShowIdeaModal" v-ripple>
          <v-list-tile-action>
            <svg colo style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#00000" fill-opacity="0.5" d="M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63Z" />
            </svg>
          </v-list-tile-action>
          <v-list-tile-content class="grey--text">
           Got an Idea?
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="MyIdeas" v-ripple>
          <v-list-tile-action>
            <v-icon>stars</v-icon>
          </v-list-tile-action>
          <v-list-tile-content class="grey--text">
           My Ideas
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
  </v-navigation-drawer>
  <v-snackbar v-model="LogSuccess" top>Success! Welcome to Dashboard<v-btn color="pink" flat @click="LogSuccess = false" > Close</v-btn></v-snackbar>

  <Account ref="Account"></Account>
  <Idea ref="Idea"></Idea>


</nav>
</template>

<script>
import firebase from '../firebase';
import store from '../store';
import Account from './Account';
import Idea from './Idea';
export default {

  components: {
    Account,
    Idea,
  },

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
    ShowModal(){
      this.$refs.Account.ShowModal();
    },
    
    ShowIdeaModal(){
      this.$refs.Idea.ShowModal();
    },

    LoveUpdate(){
      this.$store.dispatch('UpdateLoveCount');
    }
  },
  computed: {

    LoveCount(){
      return this.$store.state.LoveCount;
    },
    
    UserName(){
      return this.$store.getters.GetUserName;
    },

    Email(){
      return this.$store.getters.getUser.email
    }

  },

created(){

    this.$store.dispatch('SetLoveCount');

    if(this.$store.getters.getUser){
      this.Navbar = true;
    }
    setTimeout(() => {
      this.LogSuccess = true
    }, 2000);
  },
  

}
</script>