<template lang="pug">
  v-card(width="250" color="grey")
    v-card-title {{ step.name }}
    v-divider
    v-card-text.pb-2
      v-card(v-for="(card,index) in step.cards")
        v-row.mt-2(dense no-gutters)
          v-col(cols="10")
            v-dialog(v-model="display[index]" width="400")
              template(v-slot:activator="{on}")
                v-card-text#cursor( v-on="on").pa-1.pl-2.pt-1
                  | {{ card.name }}
              kanban-card(:card="card")
          v-col(cols="2")
            v-btn#alou(icon)
              v-icon mdi-pencil-outline
      v-row(v-if="waitingToAddCardState" justify="center")
        v-btn.mt-4(@click="changeWaitingToAddCardState" outlined)
          | Adicionar card
      div(v-else)
        v-divider.mt-3
        v-row.pa-1.px-3.mt-2()
          v-text-field.pa-0(@keypress.enter="addCardToStep"
                            v-model="newCardTitle"
                            dense
                            label="Titulo"
                            outlined
                            hide-details
                            )
        v-row(dense no-gutters)
          v-btn(@click="addCardToStep" :disabled="newCardTitle.length == 0" outlined) confirmar
          v-btn(@click="changeWaitingToAddCardState" icon)
            v-icon mdi-close


</template>

<script>
import KanbanCard from "@/components/KanbanCard";
export default {
  components: {
    KanbanCard,
  },
  props: {
    step: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      waitingToAddCardState: true,
      newCardTitle: "",
      display: {},
    };
  },
  methods: {
    teste() {
      // this.cardDialog = true;
    },
    addCardToStep() {
      if (this.newCardTitle.length > 0) {
        this.$store.commit("addCardToStep", {
          step: this.step,
          card: { name: this.newCardTitle, description: "", dueAt: undefined },
        });
        this.newCardTitle = "";
      }
    },
    changeWaitingToAddCardState() {
      this.waitingToAddCardState = !this.waitingToAddCardState;
    },
    addCard() {},
  },
};
</script>

<style>
#cursor {
  cursor: pointer;
}
#alou {
  max-height: 30px;
  max-width: 30px;
}
</style>
