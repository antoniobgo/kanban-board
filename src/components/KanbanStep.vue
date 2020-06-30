<template lang="pug">
  v-card(width="250" color="grey")
    v-card-title.pa-2.pb-0 {{ step.name }}
    v-divider
    v-card-text.pb-2
      v-card(v-for="(card,index) in step.cards")
        v-row.mt-2(dense no-gutters)
          v-col(cols="10")
            v-card-text#cursor.pa-1.pl-2.pt-1
              | {{ card.title }}
          v-col(cols="2")
            v-dialog#teste(v-model="display[index]" width="700" height="700" persistent)
              template(v-slot:activator="{on}")
                v-btn#alou(v-on="on" icon)
                  v-icon mdi-pencil-outline
              kanban-card(@closeDialog="display[index] = false" :card="card")
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
    KanbanCard
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
      display: {}
    };
  },
  methods: {
    addCardToStep() {
      if (this.newCardTitle.length > 0) {
        this.$store.commit("addCardToStep", {
          step: this.step,
          card: { title: this.newCardTitle, description: "", dueAt: undefined }
        });
        this.newCardTitle = "";
      }
    },
    changeWaitingToAddCardState() {
      this.waitingToAddCardState = !this.waitingToAddCardState;
    },
    addCard() {}
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
