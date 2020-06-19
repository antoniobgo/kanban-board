<template lang="pug">
  v-card(width="250" color="grey")
    v-card-title {{ step.name }}
    v-card-text.pb-2
      v-card(v-for="card in step.cards")
        v-card-text(@click="teste").pa-1.mt-2.pl-2
          | {{ card.name }}
      v-row(v-if="waitingToAddCardState" justify="center")
        v-btn.mt-4(@click="changeWaitingToAddCardState" outlined dense)
          | Adicionar card
      div(v-else)
        v-row.pa-1.px-3.mt-2()
          v-text-field.pa-0(@keypress.enter="addCardToStep"
                            v-model="newCardTitle"
                            dense
                            label="Adicione um titulo para esse card"
                            outlined
                            hide-details
                            )
        v-row(dense no-gutters)
          v-btn(@click="addCardToStep" outlined) adicionar
          v-btn(@click="changeWaitingToAddCardState" icon)
            v-icon mdi-close


</template>

<script>
export default {
  props: {
    step: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      waitingToAddCardState: true,
      newCardTitle: undefined,
    };
  },
  methods: {
    teste() {
      console.log("aasdsadsa");
    },
    addCardToStep() {
      this.$store.commit("addCardToStep", {
        step: this.step,
        card: { name: this.newCardTitle },
      });
      this.newCardTitle = undefined;
    },
    changeWaitingToAddCardState() {
      this.waitingToAddCardState = !this.waitingToAddCardState;
    },
    addCard() {},
  },
};
</script>

<style></style>
