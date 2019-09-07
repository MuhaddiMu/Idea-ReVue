<template>
    <v-container>
        <vue-headful title="My Ideas | Idea Re-Vue" />
        <v-layout row wrap>
            <v-flex v-for="Idea in Ideas" :key="Idea.DocID" class="justify-center ma-2" xs6 md3>
                <v-card hover max-width="320" class="mx-auto">
                    <v-card-Title class="title">{{ Idea.Title}}
                        <v-spacer></v-spacer>
                        <v-tooltip right>
                            <template v-slot:activator="{ on }">
                                <v-icon v-on="on" v-if="Idea.Completed" class="green--text" small>done_all</v-icon>
                                <v-icon v-on="on" v-else class="orange--text text--lighten-2" small>update</v-icon>
                            </template>
                            <span>Tooltip</span>
                        </v-tooltip>

                    </v-card-Title>
                    <v-card-text>{{ Idea.Description }}</v-card-text>


                    <v-card-actions class="caption grey--text text--darken-3">
                        Added on: {{ Idea.Added }} Visibility: {{ Idea.Visibility }}
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
    </v-container>
</template>

<script>
import firebase from "../firebase";
import store from "../store";

export default {
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
};
</script>

<style>
</style>
