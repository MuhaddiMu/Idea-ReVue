import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    LoveCount: null,
    UserName: null,
    UserEmail: null
  },

  getters: {
    getUser: state => {
      return state.user
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
        } else {
          console.log('No User Name')
        }
      })
    },

    UserEmail: state => {
      state.UserEmail = firebase.firebase.auth().currentUser.email // User Login State
    },

    UpdateUsername (state, Username) {
      state.UserName = Username
    },

    UpdateEmail (state, Email) {
      state.UserEmail = Email
    }
  },

  actions: {
    setUser: context => {
      context.commit('setUser')
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
