<template lang="pug">
  v-card(width="250" color="grey")
    v-card-title.pa-2.pb-0 {{ step.name }}
    v-divider
    v-card-text.pb-2
      v-card(v-for="(card,index) in step.cards")
        v-row.mt-2(dense no-gutters)
          v-col(cols="10")
            v-dialog#teste(v-model="displayShowCard[index]" width="700" height="700")
              template(v-slot:activator="{on}")
                v-card-text#cursor.pa-1.pl-2.pt-1(v-on="on")
                  h4 {{ card.title }}
                  v-row.pt-1(v-if="card.dueAt && card.dueAt.length > 0" dense)
                    v-icon.pr-1(small) mdi-clock-time-five-outline
                    h5 {{ card.dueAt }}
              kanban-show-card(@closeDialog="displayShowCard[index] = false" @changeToEditCard="changeToEditCard(index)" :card="card" :step="step")
          v-col(cols="2")
            v-dialog#teste(v-model="displayEditCard[index]" width="700" height="700" persistent)
              template(v-slot:activator="{on}")
                v-btn#alou(v-on="on" icon)
                  v-icon mdi-pencil-outline
              kanban-edit-card(@closeDialog="displayEditCard[index] = false" :card="card" :step="step")
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
import KanbanEditCard from "@/components/KanbanEditCard";
import KanbanShowCard from "@/components/KanbanShowCard";

export default {
  components: {
    KanbanEditCard,
    KanbanShowCard
  },
  props: {
    step: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      waitingToAddCardState: true,
      newCardTitle: "",
      displayEditCard: {},
      displayShowCard: {}
    };
  },
  methods: {
    addCardToStep() {
      if (this.newCardTitle.length > 0) {
        this.$store.commit("addCardToStep", {
          step: this.step,
          card: {
            title: this.newCardTitle,
            description: "",
            dueAt: undefined
          }
        });
        this.newCardTitle = "";
        this.waitingToAddCardState = true;
      }
    },
    changeWaitingToAddCardState() {
      this.waitingToAddCardState = !this.waitingToAddCardState;
    },
    changeToEditCard(index) {
      this.displayShowCard[index] = false;
      this.displayEditCard[index] = true;
    }
  }
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
#teste {
  height: 700px;
}
</style>
