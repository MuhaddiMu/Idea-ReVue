import Vue from "vue";
import Vuex from "vuex";
import firebase from "./firebase"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    getUser: state => {
      return state.user;
    }
  },
  mutations: {
    setUser: state => {
      state.user = firebase.firebase.auth().currentUser;
    }
  },
  actions: {
    setUser: context => {
      context.commit('setUser');
    }
  }
});