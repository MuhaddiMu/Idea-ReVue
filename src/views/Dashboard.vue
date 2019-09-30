<template>
  <v-container v-if="Total">
    <vue-headful title="Dashboard | Idea Re-Vue" />
    <v-layout align-center justify-center row wrap>
      <v-flex xs12 md12>
        <v-card class="ma-1" text justify-center dark>
          <v-card-text
            class="text-center display-1 TotalIdeas white--text"
          >You Have Total {{Total}} Ideas, Explore More...</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md3>
        <v-card class="VCard ma-1" text justify-center dark color="primary">
          <v-card-title class="display-1">Create New Idea</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="ShowIdeaModal" fab depressed text>
              <svg colo viewBox="0 0 24 24" style="width: 24px; height: 24px;">
                <path
                  fill="#ffffff"
                  d="M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63Z"
                />
              </svg>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md3>
        <v-card class="VCard ma-1" text justify-center dark color="primary">
          <v-card-title class="display-1">See Public Ideas</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="RedirectPublic" depressed text fab>
              <v-icon>public</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <Idea ref="Idea"></Idea>
  </v-container>
</template>

<script>
import Idea from './Idea'
import router from '../router'
import firebase from '../firebase'
export default {
  components: {
    Idea
  },

  data () {
    return {
      Total: ''
    }
  },
  methods: {

    TotalIdeas () {
      let self = this
      firebase.firebase
        .firestore()
        .collection('Ideas')
        .where('AddedBy', '==', this.$store.getters.getUser.uid)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.docs.length ? self.Total = querySnapshot.docs.length : self.Total = '0'
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
    },

    RedirectPublic () {
      this.$router.push('/Public')
    },

    ShowIdeaModal () {
      this.$refs.Idea.ShowModal()
    }
  },
  created () {
    this.TotalIdeas()
  }
}
</script>

<style scoped>
.TotalIdeas {
  background: linear-gradient(40deg, #45cafc, #303f9f) !important;
}

.VCard {
  background: linear-gradient(40deg, #45cafc, #303f9f) !important;
}
</style>
