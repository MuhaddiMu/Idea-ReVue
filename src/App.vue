<template>
  <v-app>
    <Navbar v-if="ShowNavbar"></Navbar>
    <v-content class="mx-4 mb-4" grey lighten-4>
      <keep-alive><router-view></router-view></keep-alive>
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
  },
  computed: {
    ShowNavbar(){
      if(this.$store.getters.getUser){
        return true;
      } else {
        return false;
      }
    }
  },
};
</script>