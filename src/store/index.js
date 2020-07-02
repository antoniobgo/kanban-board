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
    addStep(state, stepName) {
      state.kanbanSteps.push({ name: stepName, cards: [] });
    },
    updateCard(state, data) {
      data.card.title = data.updateData.title;
      data.card.description = data.updateData.description;
      data.card.dueAt = data.updateData.dueAt;
    },
    updateSteps(state, data) {
      data.oldStep.cards.splice(data.oldStep.cards.indexOf(data.card), 1);
      data.newStep.cards.push(data.card);
    },
  },
  actions: {},
  modules: {},
});
