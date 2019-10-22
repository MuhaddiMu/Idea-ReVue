import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    Favorites: [],
    LoveCount: null,
    UserName: null,
    UserEmail: null
  },

  getters: {
    getUser: state => {
      return state.user
    },
    getFavorites: state => {
      return state.Favorites
    },
    GetLoveCount: state => {
      return state.LoveCount
    },

    GetUserName: state => {
      return state.UserName
    },

    GetEmail: state => {
      return state.UserEmail
    }
  },

  mutations: {
    setUser: state => {
      state.user = firebase.firebase.auth().currentUser
    },
    setFavorite(state, payload) {
      let favs = state.Favorites
      if (favs.includes(payload)){
        let itemToRemove = favs.indexOf(payload)
        favs.splice(itemToRemove)
      }
      else {
        favs.push(payload)
      }
      firebase.firebase.firestore().collection('Users').doc(state.user.uid).update({
        Favorites: favs
      })
      .then(() => console.log("Success!"))
      .catch(() => console.log("Error :("))
    },
    SetLoveCount: state => {
      var LoveCount = firebase.firebase
        .firestore()
        .collection('Love')
        .doc('Counter')
      LoveCount.get().then(function (doc) {
        if (doc.exists) {
          var Data = doc.data()
          state.LoveCount = Data.Count
        }
      })
    },

    UpdateLoveCount: state => {
      state.LoveCount++
      firebase.firebase
        .firestore()
        .collection('Love')
        .doc('Counter')
        .set({
          Count: state.LoveCount
        })
        .then(function () {
          // DONE
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },

    UserName: state => {
      var docRef = firebase.firebase
        .firestore()
        .collection('Users')
        .doc(state.user.uid)
      docRef.get().then(function (doc) {
        if (doc.exists) {
          state.UserName = doc.data().Name
          //ADDING THE USER'S FAVORITES WHILE WE'RE HERE
          if (doc.data().Favorites){
            state.Favorites = doc.data().Favorites
          }
        } else {
          console.log('No User Name')
        }
      })
    },

    UserEmail: state => {
      state.UserEmail = firebase.firebase.auth().currentUser.email // User Login State
    },

    UpdateUsername (state, Username) {
      firebase.firebase
        .firestore()
        .collection('Users')
        .doc(state.user.uid)
        .update({
          Name: Username
        })
        .then(function () {
          state.UserName = Username
        })
    },

    UpdateEmail (state, Email) {
      state.UserEmail = Email
    }
  },

  actions: {
    setUser: context => {
      context.commit('setUser')
    },
    setFavorite({commit}, payload){
      commit('setFavorite', payload)
    },
    SetLoveCount: context => {
      context.commit('SetLoveCount')
    },

    UpdateLoveCount: context => {
      context.commit('UpdateLoveCount')
    },

    UserName: context => {
      context.commit('UserName')
    },
    UserEmail: context => {
      context.commit('UserEmail')
    }
  }
})
