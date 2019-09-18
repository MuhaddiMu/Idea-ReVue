<template>
  <v-container>
    <vue-headful title="My Ideas | Idea Re-Vue" />

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" fab depressed>
          <v-icon>filter_list</v-icon>
        </v-btn>
      </template>
      <span>Sort by Completed</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" fab depressed>
          <v-icon>calendar_today</v-icon>
        </v-btn>
      </template>
      <span>Sort by Completed</span>
    </v-tooltip>

    <v-row class="justify-center">
      <v-flex v-for="x in 3" xs3 :key="x">
        <vue-content-loading :width="300" :height="130">
          <rect x="70" y="15" rx="4" ry="4" width="117" height="6.4" />
          <rect x="70" y="35" rx="3" ry="3" width="85" height="6.4" />
          <rect x="0" y="80" rx="3" ry="3" width="350" height="6.4" />
          <rect x="0" y="100" rx="3" ry="3" width="380" height="6.4" />
          <rect x="0" y="120" rx="3" ry="3" width="201" height="6.4" />
          <circle cx="30" cy="30" r="30" />
        </vue-content-loading>
      </v-flex>
    </v-row>

    <v-row class="justify-center">
      <v-layout
        v-masonry
        transition-duration="1s"
        item-selector=".item"
        class="masonry-container"
        justify-center
      >
        <v-flex
          align="center"
          justify="center"
          class="item ma-2 align-center justify-center"
          v-masonry-tile
          v-for="Idea in Ideas"
          :key="Idea.DocID"
          xs12
          md4
        >
          <v-card hover width="320" class="mx-auto">
            <v-card-Title class="title">
              {{ Idea.Title}}
              <v-spacer></v-spacer>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" v-if="Idea.Completed" class="green--text" small>done_all</v-icon>
                  <v-icon v-on="on" v-else class="orange--text text--lighten-2" small>update</v-icon>
                </template>
                <span>{{Idea.Completed ? "Completed" : "Pending"}}</span>
              </v-tooltip>
            </v-card-Title>
            <v-card-text>{{ Idea.Description }}</v-card-text>

            <v-card-actions class="caption grey--text text--darken-3">
              Added on: {{ Idea.Added }}
              <br />
              Visibility: {{ Idea.Visibility }}
              <v-spacer></v-spacer>
              <v-menu nudge-top="6" top offset-x>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="(Option, i) in Options" :key="i">
                    <v-list-item-title>{{ Option.Title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-row>
  </v-container>
</template>
IDEARE
<script>
import firebase from "../firebase";
import store from "../store";
import VueContentLoading from 'vue-content-loading';

export default {
  components: {
    VueContentLoading,
  },

  data() {
    return {
      Ideas: [],

      Options: [
        { Title: "Edit" },
        { Title: "Mark as Completed" },
        { Title: "Delete" }
      ]
    };
  },
  methods: {
    GetIdeas() {
      let self = this;
      firebase.firebase
        .firestore()
        .collection("Ideas")
        .where("AddedBy", "==", this.$store.getters.getUser.uid)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            var DocData = doc.data()
            DocData.DocID = doc.id
            self.Ideas.push(DocData)
          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error)
        });
    }
  },
  created() {
    this.GetIdeas();
  }
}
</script>

<style>
v-card {
  color: aqua;
}
</style>
