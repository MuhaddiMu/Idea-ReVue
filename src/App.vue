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
      this.$store.dispatch('SetLoveCount');
      this.$store.dispatch('setUser');
    },
  },
    created() {
    this.setUser();
  }
};
</script>

<style>
</style>

