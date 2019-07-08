<template>
  <div class="Ideas">
    <h1 class="display-1 grey--text mt-2">My Ideas</h1>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="Idea in Ideas" :key="Idea.ID">
          <v-card flat class="text-xs-center pa-3 ma-3">
            <v-responsive class="">
              <v-avatar class="grey lighten-4" size="100"
                ><img
                  src="https://www.muhaddis.info/wp-content/uploads/2016/08/Favicon-1.png"
                  alt=""
              /></v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ Idea.Name }}</div>
              <div class="grey--text">{{ Idea.Idea }}</div>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn flat color="grey"
                ><v-icon left>wb_incandescent</v-icon>Push Idea</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Ideas: [
        {
          ID: 0,
          Name: "Diving Into GraphQL",
          Idea: "GraphQL Learning",
          Date: "25th July 2019",
          Status: "Pending"
        },
        {
          ID: 1,
          Name: "Mongo DB",
          Idea: "MongoDB Learning",
          Date: "11th July 2019",
          Status: "Review"
        },
        {
          ID: 4,
          Name: "OAUth 2",
          Idea: "Passport Authentication",
          Date: "12th July 2019",
          Status: "Pending"
        },
        {
          ID: 2,
          Name: "Vuex",
          Idea: "Vuex State Management",
          Date: "4th July 2019",
          Status: "Completed"
        },
        {
          ID: 3,
          Name: "Vuetify",
          Idea: "Designing Via Vuetify",
          Date: "9th July 2019",
          Status: "Pending"
        }
      ]
    };
  }
};
</script>
