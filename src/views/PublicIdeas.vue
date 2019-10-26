<template>
  <v-container grid-list-md>
    <vue-headful title="Public Ideas | Idea Re-Vue" />
    <v-flex row class="search align-center justify-center">
        <div :class="{'show' : search}" >
            <input class="searchBar" v-model="searchTerm" type="text" />
            <v-icon>search</v-icon>
        </div>
    </v-flex>
    <v-flex row class="item align-center justify-center">
      <v-tooltip bottom>
        <template v-if="allIdeas" v-slot:activator="{ on }">
          <v-btn @click="SortByComp" small v-on="on" fab depressed>
            <v-icon>filter_list</v-icon>
          </v-btn>
        </template>
        <span>Sort by Completed</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-if="allIdeas" @click="SortByDate" small v-on="on" fab depressed>
            <v-icon>calendar_today</v-icon>
          </v-btn>
        </template>
        <span>Sort by Date</span>
      </v-tooltip>

      <v-tooltip v-if="allIdeas" bottom>
        <template v-slot:activator="{ on }">
          <v-btn :loading="Loading" @click="GetIdeas" small v-on="on" fab depressed>
            <v-icon>refresh</v-icon>
          </v-btn>
        </template>
        <span>Refresh</span>
      </v-tooltip>

      <v-tooltip v-if="allIdeas" bottom>
        <template v-slot:activator="{ on }">
          <v-btn @click="toggleSearch" small v-on="on" fab depressed>
            <v-icon>search</v-icon>
          </v-btn>
        </template>
        <span>Search</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-if="allIdeas" v-slot:activator="{ on }">
          <v-btn @click="showFavorites" small v-on="on" fab depressed>
            <v-icon :color="favorites ? 'red' : 'grey'">favorite</v-icon>
          </v-btn>
        </template>
        <span>Show Favorites</span>
      </v-tooltip>
    </v-flex>

    <v-layout v-if="!allIdeas" class="align-center justify-center" justify-center row align-center>
      <v-flex
        align="center"
        justify="center"
        class="align-center justify-center"
        v-for="x in 3"
        :key="x"
        xs12
        md3
      >
        <v-card hover width="320" class="mx-auto">
          <vue-content-loading primary="#f3f3f3" secondary="#ecebeb" :width="300" :height="130">
            <rect x="6.72" y="8" rx="4" ry="4" width="243.73" height="13.02" />
            <rect x="361" y="95" rx="3" ry="3" width="141.95" height="10.02" />
            <rect x="10" y="36" rx="3" ry="3" width="270" height="6" />
            <rect x="10" y="53" rx="3" ry="3" width="270" height="6" />
            <rect x="5" y="99" rx="3" ry="3" width="230" height="6.84" />
            <rect x="10" y="70" rx="3" ry="3" width="270" height="6" />
            <rect x="5" y="115" rx="3" ry="3" width="180" height="6" />
            <circle cx="284.48" cy="110.92" r="12.25" />
            <circle cx="283.48" cy="14.92" r="12.25" />
          </vue-content-loading>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout
      v-masonry
      transition-duration="1s"
      item-selector=".item"
      class="masonry-container"
      justify-center
      row
      align-center
    >
      <v-flex
        align="center"
        justify="center"
        class="item align-center justify-center"
        v-masonry-tile
        v-for="Idea in filteredIdeas"
        :key="Idea.DocID"
        xs12
        md3
      >
        <v-card hover width="320" class="mx-auto">
          <v-row no-gutters align="center" class="grey lighten-3">
            <v-col cols="8" class="title ml-1">
              {{ Idea.Title }}
            </v-col>
            <v-col cols="3" class="text-right">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" v-if="Idea.Completed" class="green--text" small>done_all</v-icon>
                  <v-icon v-on="on" v-else class="orange--text text--lighten-2" small>update</v-icon>
                </template>
                <span>{{ Idea.Completed ? "Completed" : "Pending" }}</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <span>{{Idea.FavoritesCount.length === 0 ? '' : Idea.FavoritesCount.length}}</span>
                  <v-icon v-on="on" small right :color="checkFavorite(Idea.DocID) ? 'red' : 'grey lighten-1'" @click="setFavorite(Idea)">favorite</v-icon>
                </template>
                <span>Add to your favorites</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <!-- <v-divider class="ml-1 mr-1"></v-divider> -->
          <v-card-text>
            <div class="grey--text text--darken-3 mb-1 subtitle-1">By {{Idea.UserName}}</div>
            {{ Idea.Description }}
          </v-card-text>

          <v-card-actions class="caption grey--text text--darken-3">
            Added on: {{ Idea.Added }}
            <br />
            Visibility: {{ Idea.Visibility }}
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import firebase from '../firebase'
import VueContentLoading from 'vue-content-loading'
import moment from 'moment'

export default {
  components: {
    VueContentLoading
  },
  data() {
    return {
      allIdeas: null,
      favorites: false,
      filteredIdeas: null,
      Loading: false,
      search: false,
      searchTerm: "",
    }
  },
  watch:{
      searchTerm(to,from){
          setTimeout(() => {
              if(this.searchTerm == to){
                  this.searchIdea(to);
              }
          }, 500,to);
      }
  },
  methods: {
    checkFavorite(id){
      if (this.getFavorites.includes(id)){
        return true
      }
      else {
        return false
      }
    },
    GetIdeas() {
      this.favorites = false
      this.$store.dispatch('setLoading', true)
      firebase.firebase
        .firestore()
        .collection('Ideas')
        .where('Visibility', '==', 'Public')
        .get()
        .then(querySnapshot => {

          var IdeasWithUsersName = []

          querySnapshot.forEach(doc =>  {
            var DocData = doc.data()
            DocData.DocID = doc.id
            DocData.FavoritesCount = []
            let UserID = doc.data().AddedBy

            const User = firebase.firebase.firestore().collection('Users').doc(UserID)
            const AllUsers = firebase.firebase.firestore().collection('Users')

            AllUsers.get().then(querySnapshot => {
              querySnapshot.forEach(doc => {
                const UserFavoritesArray = doc.data().Favorites
                if(UserFavoritesArray){
                  UserFavoritesArray.find(favourite => {
                    if(favourite.includes(DocData.DocID)) {
                      DocData.FavoritesCount.push(favourite)
                    }}
                    )                  
                }
              })
            })
            User.get().then(UserDetails => {
              DocData.UserName = UserDetails.data().Name
              IdeasWithUsersName.push(DocData)
              this.allIdeas = IdeasWithUsersName
              this.filteredIdeas = this.allIdeas
            })
          })
          this.$store.dispatch('setLoading', false)
        })
        .catch(error => {
          this.$store.dispatch('setLoading', false)
          console.log('Error getting documents: ', error)
        })
    },
    setFavorite(idea){
      this.$store.dispatch('setFavorite', idea.DocID)
      this.GetIdeas()
    },
    showFavorites(){
      this.favorites = !this.favorites
      if(this.favorites == true){
        this.filteredIdeas = this.allIdeas.filter(idea => {
          return this.getFavorites.includes(idea.DocID)
        })
      }
      else {
        this.GetIdeas()
      }
    },
    SortByComp() {
      let UpdatedIdeas = this.filteredIdeas.sort((a, b) => {
        if (a.Completed > b.Completed) {
          return -1
        }
      })

      this.filteredIdeas = []

      setTimeout(() => {
        this.filteredIdeas = UpdatedIdeas
      }, 0.1)
    },
    SortByDate() {
      let UpdatedIdeas = this.filteredIdeas.sort((A, B) => {
        var C = new Date(moment(A.Added, 'Do MMMM YYYY').format('YYYY-MM-DD'))
        var D = new Date(moment(B.Added, 'Do MMMM YYYY').format('YYYY-MM-DD'))
        return D - C
      })

      this.filteredIdeas = []

      setTimeout(() => {
        this.filteredIdeas = UpdatedIdeas
      }, 0.1)
    },
    toggleSearch(){
        if(this.search)
            this.search = false;
        else
            this.search = true;
    },
    searchIdea(term){
        let tmpArr = [];
        this.allIdeas.forEach(element => {
            if(element.Title.includes(term) || element.Description.includes(term) || element.UserName.includes(term))
                tmpArr.push(element);
        });
        this.filteredIdeas = tmpArr;
    }
  },
  created() {
    this.GetIdeas()
  },
  computed: {
    getFavorites(){
      return this.$store.getters.getFavorites
    }
  }
}
</script>

<style lang="scss">
v-card {
  color: aqua;
}

.item{
    margin-bottom: 30px;
}


.search{
    div{
        margin:10px 0;
        opacity: 0;
        pointer-events: none;
        min-height: 0;
        max-height: 0;
        width: 50%;
        min-width: 300px;
        box-sizing: border-box;
        padding: 10px 30px;
        padding-right: 60px;
        background-color: #f9f9f9;
        border: 1px solid rgba($color: #f0f0f0, $alpha: .5);
        box-shadow: 0px 0px 8px 2px rgba($color: #000, $alpha: .2);
        transition: opacity .4s ease-in-out, min-height .4s ease-in-out;
        position: relative;
        &.show{
            opacity: 1;
            pointer-events: all;
            min-height: 60px;
            max-height: 0;
        }
        input{
            width: 100%;
            line-height: 40px;
        }
        i{
            position: absolute;
            top: 50%;
            right: 30px;
            transform: translateY(-50%);
        }
    }
}

</style>
