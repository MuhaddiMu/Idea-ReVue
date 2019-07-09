<template>
  <v-app>
    <Navbar></Navbar>
    <v-content class="mx-4 mb-4" grey lighten-4>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./views/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
      ShowNav: false,
    };
  },
   methods: {
    setUser: function() {
      this.$store.dispatch('setUser');
    },
  },
    created() {
    // when the app is created run the set user method
    // this uses Vuex to check if a user is signed in
    // check out mutations in the store.js file
    this.setUser();
  }
};
</script>

<style>
</style>

