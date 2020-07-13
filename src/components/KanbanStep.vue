<template lang="pug">
  v-card(width="250" color="grey")
    v-card-title(v-if="showStepNameState").pa-2.pb-0 {{ step.name }}
      v-spacer
      v-menu(offset-y)
        template(v-slot:activator="{on}")
          v-btn(v-on="on" icon)
            v-icon mdi-dots-vertical
        v-list
          v-list-item(@click="onEditClick")
            v-list-item-title Editar
          v-list-item(@click="onDeleteClick")
            v-list-item-title Excluir
    v-card-title.pb-0(v-else)
      v-row(justify="space-between" dense)
        v-col(cols="7")
          v-text-field(v-model="newStepName" label="Novo nome" outlined autofocus dense)
        v-col.pl-5.pt-1(cols="5")
          v-row(dense)
            v-btn(@click="onConfirmEditName" icon)
              v-icon mdi-check
            v-btn(@click="onCancelEditName" icon)
              v-icon mdi-close
    v-divider
    v-card-text.pb-2
      v-card(v-for="(card,index) in step.cards")
        v-row.mt-2(dense no-gutters)
          v-col(cols="8")
            v-dialog#teste(v-model="displayCard[index]" width="700" height="700")
              template(v-slot:activator="{on}")
                v-card-text#cursor.pa-1.pl-2.pt-1(v-on="on" @click="setShowState")
                  h4 {{ card.title }}
                  v-tooltip(v-if="card.dueAt && card.dueAt.length > 0" top)
                    template(v-slot:activator="{on}")
                      v-row.pt-1(v-if="card.dueAt && card.dueAt.length > 0"
                                v-on="on"
                                dense
                                )
                        v-icon.pr-1.pl-1(:class="getDateColor(card)" small) mdi-clock-time-five-outline
                        h5.pr-1(:class="getDateColor(card)") {{ card.dueAt }}
                    span {{ dateTooltip(card) }}
              kanban-card(@closeDialog="displayCard[index] = false"
                              @changeToEditCard="changeToEditCard(index)" 
                              :card="card"
                              :step="step"
                              :isInitialStateEdit="editState"
                              )
          v-col(cols="2")
            v-dialog#teste(v-model="displayCard[index]" width="700" height="700" persistent)
              template(v-slot:activator="{on}")
                v-btn(@click="setEditState" small v-on="on" icon)
                  v-icon mdi-pencil-outline
              kanban-card(@closeDialog="displayCard[index] = false" :card="card" :step="step" :isInitialStateEdit="editState")
          v-col(cols="2")
            v-btn(@click="onClickDeleteCard(card)" small icon)
              v-icon mdi-close
      v-row(v-if="waitingToAddCardState" justify="center")
        v-btn.mt-4(@click="changeWaitingToAddCardState" outlined)
          | Adicionar card
      div(v-else)
        v-divider.mt-3
        v-row.pa-1.px-3.mt-2()
          v-text-field.pa-0(@keypress.enter="addCardToStep"
                            v-model="newCardTitle"
                            dense
                            label="Nome"
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
      showStepNameState: true,
      newCardTitle: "",
      displayCard: {},
      newStepName: undefined,
      editState: undefined
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
            dueAt: undefined,
            completed: false,
          },
        });
        this.newCardTitle = "";
        this.waitingToAddCardState = true;
      }
    },
    changeWaitingToAddCardState() {
      this.waitingToAddCardState = !this.waitingToAddCardState;
    },
    getDateColor(card) {
      if (card.completed) return "green";
      let dateParts = card.dueAt.split("-");
      let cardDueDate = new Date(
        dateParts[0],
        parseInt(dateParts[1]) - 1,
        dateParts[2]
      );
      return cardDueDate < new Date().setHours(0, 0, 0, 0) ? "red" : "";
    },
    dateTooltip(card) {
      let dateParts = card.dueAt.split("-");
      let cardDueDate = new Date(
        dateParts[0],
        parseInt(dateParts[1]) - 1,
        dateParts[2]
      );
      if (card.completed) return "Essa tarefa está concluída";
      else if (cardDueDate < new Date().setHours(0, 0, 0, 0))
        return "Essa tarefa está atrasada";
      return "Essa tarefa está em dia";
    },
    onEditClick() {
      this.showStepNameState = !this.showStepNameState;
    },
    onDeleteClick() {
      this.$store.commit("destroyStep", this.step);
    },
    onConfirmEditName() {
      this.$store.commit("updateStepName", {
        step: this.step,
        newStepName: this.newStepName,
      });
    },
    onCancelEditName() {
      this.showStepNameState = true;
      this.newStepName = undefined;
    },
    onClickDeleteCard(card) {
      this.$store.commit("deleteCard", { card: card, step: this.step} )
    },
    setShowState() {
      this.editState = false
    },
    setEditState() {
      this.editState = true
    }
  },
};
</script>

<style>
#cursor {
  cursor: pointer;
}
#teste {
  height: 700px;
}
</style>
