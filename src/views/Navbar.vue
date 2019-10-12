<template>
  <nav v-show="Navbar">
    <v-app-bar app>
      <v-snackbar v-model="LogSuccess" top>
        Success! Welcome to Dashboard
        <v-btn color="pink" text @click="LogSuccess = false">Close</v-btn>
      </v-snackbar>

      <v-icon class="grey--text mr-2" @click="Sidebar = !Sidebar">menu</v-icon>
      <v-toolbar-title class="grey--text text-uppercase">
        <span class="title">Idea</span>
        <span class="subtitle-2 font-weight-bold">Re-Vue</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-tooltip left class="d-none d-sm-flex">
          <template v-slot:activator="{ on }">
            <v-btn @click="LoveUpdate" v-on="on" fab text class="d-none d-sm-flex">
              <v-icon large color="pink">favorite</v-icon>
            </v-btn>
          </template>
          <span>Show Love By Tapping</span>
        </v-tooltip>
        <v-btn :ripple="false" class="TotalCount d-none d-sm-flex" font-weight-bold text>
          <kbd class="body-2">
            <b>{{LoveCount}}</b>
            <v-icon small>favorite</v-icon>
          </kbd>
        </v-btn>
        <v-btn @click="LogOut" fab text class="d-sm-block">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer v-model="Sidebar" app>
      <v-layout align-center justify-center column text-center>
        <v-flex mt-3>
          <v-avatar size="100">
            <v-gravatar :email="Email" :size="400" />
          </v-avatar>
          <p class="black--text subheading mt-1">{{UserName}}</p>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-item to="/" v-ripple>
          <v-list-item-icon>
            <v-icon>dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="grey--text">
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to @click="ShowIdeaModal" v-ripple>
          <v-list-item-icon>
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path
                fill="#00000"
                fill-opacity="0.5"
                d="M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63Z"
              />
            </svg>
          </v-list-item-icon>
          <v-list-item-content class="grey--text">Got an Idea?</v-list-item-content>
        </v-list-item>

        <v-list-item to="Ideas" v-ripple>
          <v-list-item-icon>
            <v-icon>stars</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="grey--text">My Ideas</v-list-item-content>
        </v-list-item>

        <v-list-item to="Public" v-ripple>
          <v-list-item-icon>
            <v-icon>public</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="grey--text">Public Ideas</v-list-item-content>
        </v-list-item>

        <v-list-item @click="ShowModal" v-ripple>
          <v-list-item-icon>
            <v-icon>edit</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="grey--text">Update Account</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <Account ref="Account"></Account>
    <Idea ref="Idea"></Idea>
  </nav>
</template>

<script>
import firebase from '../firebase'
import store from '../store'
import Account from './Account'
import Idea from './Idea'
export default {

  components: {
    Account,
    Idea
  },

  data () {
    return {
      Sidebar: false,
      Navbar: false,
      LogSuccess: false
    }
  },
  methods: {
    LogOut () {
      const AUTH = firebase.firebase.auth()
      AUTH.signOut().then(() => {
        this.$router.replace('/Auth')
      })
    },
    ShowModal () {
      this.$refs.Account.ShowModal()
    },

    ShowIdeaModal () {
      this.$refs.Idea.ShowModal()
    },

    LoveUpdate () {
      this.$store.dispatch('UpdateLoveCount')
    }
  },
  computed: {

    LoveCount () {
      return this.$store.state.LoveCount
    },

    UserName () {
      return this.$store.getters.GetUserName
    },

    Email () {
      return this.$store.getters.getUser.email
    }

  },

  created () {
    this.$store.dispatch('SetLoveCount')

    if (this.$store.getters.getUser) {
      this.Navbar = true
    }
    setTimeout(() => {
      this.LogSuccess = true
    }, 2000)
  }

}
</script>
