import Vue from "vue";
import Vuex from "vuex";
import firebase from "./firebase"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    LogSuccess: true
  },
  getters: {
    getUser: state => {
      return state.user;
    },
    LogSuccess: state => {
        return state.LogSuccess;
    },
  },
  mutations: {
    setUser: state => {
      state.user = firebase.firebase.auth().currentUser;
    },
    UpdateLogSuccess: state => {
      state.LogSuccess = false;
    }
  },
  actions: {
    setUser: context => {
      context.commit('setUser');
    }
  }
});