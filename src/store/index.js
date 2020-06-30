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
    updateCard(state, data) {
      data.card.title = data.updateData.title;
      data.card.description = data.updateData.description;
      data.card.dueAt = data.updateData.dueAt;
    },
  },
  actions: {},
  modules: {},
});
