import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    kanbanSteps: [
      { name: "To Do", cards: [] },
      { name: "Doing", cards: [] },
      {
        name: "Done",
        cards: [],
      },
    ],
  },
  mutations: {
    addCardToStep(state, data) {
      data.step.cards.push(data.card);
    },
  },
  actions: {},
  modules: {},
});
