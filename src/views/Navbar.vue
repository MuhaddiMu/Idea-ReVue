<template>
  <nav>
    <v-snackbar top right v-model="Snackbar" color="success" :timeout="5000">
      <span>Wohoooo Idea Created!!</span>
      <v-btn flat color="white" @click="Snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-toolbar app>
      <v-toolbar-side-icon
        class="grey--text"
        @click="Sidebar = !Sidebar"
      ></v-toolbar-side-icon>
      <v-toolbar-title class="grey--text text-uppercase">
        <span class="font-weight-light">Idea</span>
        <span>Re-Vue</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on }"
          ><v-btn color="grey" flat v-on="on"
            ><v-icon left>expand_more</v-icon><span>Menu</span></v-btn
          ></template>
        <v-list>
          <v-list-tile
            v-for="Link in Links"
            :key="Link.name"
            router
            :to="Link.route"
            v-ripple
          >
            <v-list-tile-title>{{ Link.name }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn flat color="grey">Log Out <v-icon>exit_to_app</v-icon></v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="Sidebar" app>
      <v-layout align-center justify-center column text-xs-center>
        <v-flex mt-3>
          <v-avatar size="100">
            <img
              src="https://www.muhaddis.info/wp-content/uploads/2016/08/Favicon-1.png"
            />
          </v-avatar>
          <p class="black--text subheading mt-1">Muhammad Muhaddis</p>
        </v-flex>
      </v-layout>
      <v-flex class="mt-4 mb-3">
        <Popup @Ideated="Snackbar = true" />
      </v-flex>
      <v-list>
        <v-list-tile
          v-for="Link in Links"
          :key="Link.route"
          router
          :to="Link.route"
          v-ripple
        >
          <v-list-tile-action>
            <v-icon>{{ Link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content class="grey--text">
            {{ Link.name }}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from "./Popup";
export default {
  components: {
    Popup
  },
  data() {
    return {
      Sidebar: false,
      Snackbar: false,
      Links: [
        { icon: "dashboard", name: "Dashboard", route: "/" },
        { icon: "highlight", name: "Ideas", route: "/Ideas" },
        { icon: "wb_incandescent", name: "New Idea", route: "/New" }
      ]
    };
  }
};
</script>

<style></style>
