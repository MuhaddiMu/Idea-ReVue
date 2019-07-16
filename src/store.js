import Vue from "vue";
import Vuex from "vuex";
import firebase from "./firebase"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    LoveCount: null,
    UserName: null,
  },

  getters: {
    getUser: state => {
      return state.user;
    },

    GetLoveCount: state => {
      return state.LoveCount;
    },

    GetUserName: state => {
      return state.UserName;
    }
    
  },

  mutations: {
    setUser: state => {
      state.user = firebase.firebase.auth().currentUser;
    },

    SetLoveCount: state => {
      var LoveCount = firebase.firebase.firestore().collection("Love").doc("Counter");
      LoveCount.get().then(function(doc) {
        if (doc.exists) {
          var Data = doc.data();
          state.LoveCount = Data.Count;
        }
      });
    },

    UserName: state => {
      var docRef = firebase.firebase.firestore().collection("Users").doc(state.user.uid);
      docRef.get().then(function(doc) {
      if (doc.exists) {
          state.UserName = doc.data().Name;
      } else {
          console.log("No such document!");
      }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
      }

  },


  actions: {
    setUser: context => {
      context.commit('setUser');
    },

    SetLoveCount: context => {
      context.commit('SetLoveCount');
    },

    UserName: context => {
      context.commit('UserName');
    }
  }
});