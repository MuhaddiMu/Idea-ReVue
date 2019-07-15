import Vue from "vue";
import Vuex from "vuex";
import firebase from "./firebase"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    LoveCount: null,
  },


  getters: {
    getUser: state => {
      return state.user;
    },

    GetLoveCount: state => {
      return state.LoveCount;
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
    }
  },


  actions: {
    setUser: context => {
      context.commit('setUser');
    },
    SetLoveCount: context => {
      context.commit('SetLoveCount');
    },
  }
});