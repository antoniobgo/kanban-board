<template lang="pug">
  div
    v-card(v-if="onEditState")
      v-card-title(
        primary-title
        class="headline grey lighten-2"
      )
        | Editar
      v-card-text.pl-3.pt-1
        v-text-field(v-model="newTitle" label="Título" prepend-icon="mdi-card-text-outline" filled)
        v-textarea.mt-3(v-model="newDescription" rows="2" label="Descrição" prepend-icon="mdi-card-text-outline" filled)
        v-row
          v-col(cols="4")
            v-row(justify="center")
              h3 Alterar data
            v-menu(
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px")
              template(v-slot:activator="{on, attrs}")
                v-text-field.mt-2(
                    v-model="datePicker"
                    label="Data de entrega"
                    hint="MM/DD/YYYY"
                    persistent-hint
                    prepend-icon="mdi-calendar-outline"
                    v-bind="attrs"
                    v-on="on"
                    filled
                )
              v-date-picker(v-model="datePicker" @input="menu1 = false")
          v-col(cols="4")
            v-row(justify="center")
              h3.ml-3.mb-2 Mover card
            v-select( v-model="selectedStep" :items="kanbanSteps" item-text="name" filled return-object prepend-icon="mdi-cursor-move")
          v-col(cols="4")
            v-row.mt-5(justify="center")
              v-checkbox(v-model="isCardCompleted")
              h3.pt-5 Concluído
        v-divider.my-3
        v-card-actions
          v-btn(@click="onCancelUpdate") cancelar
          v-spacer
          v-btn(@click="onConfirmUpdate" :disabled="confirmButtomDisabledRules()") confirmar
    v-card(v-else)
      v-card-title(
        primary-title
        class="headline grey lighten-2"
      )
        | {{ card.title }}
        v-row(justify="end")
          v-btn(@click="onEditState = true" outlined) Editar
      v-card-text.pt-5
        h3 Descrição
        p(v-if="card.description && card.description.length > 0") {{ card.description }}
        p(v-else) Edite para adicionar descrição
        h3 Data de entrega
        p(v-if="card.dueAt && card.dueAt.length > 0") {{ card.dueAt }}
        p(v-else) Edite para adicionar data de entrega
        h3 Status
        p {{ step.name }}
        h4(v-if="card.completed") Marcado como concluido
        v-divider.my-3
        v-card-actions
          v-spacer
          v-btn(@click="closeShowCard") fechar
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
    step: {
      type: Object,
      required: true,
    },
    isInitialStateEdit: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      newTitle: this.card.title,
      newDescription: this.card.newDescription,
      datePicker: this.card.dueAt,
      selectedStep: this.step,
      isCardCompleted: this.card.completed,
      menu1: false,
      onEditState: undefined,
    };
  },
  watch: {
    isInitialStateEdit: {
      immediate: true,
      handler() {
        debugger
        this.onEditState = this.isInitialStateEdit;
      },
    },
  },
  computed: {
    ...mapState(["kanbanSteps"]),
  },
  methods: {
    onConfirmUpdate() {
      this.$store.commit("updateCard", {
        card: this.card,
        updateData: {
          title: this.newTitle,
          description: this.newDescription,
          dueAt: this.datePicker,
          completed: this.isCardCompleted,
        },
      });
      if (this.step != this.selectedStep) {
        this.$store.commit("updateSteps", {
          card: this.card,
          oldStep: this.step,
          newStep: this.selectedStep,
        });
      }
      // this.onEditState = undefined
      this.$emit("closeDialog");
    },
    onCancelUpdate() {
      // this.onEditState = undefined
      this.resetFields();
      this.$emit("closeDialog");
    },
    resetFields() {
      this.newTitle = this.card.title;
      this.newDescription = this.card.newDescription;
      this.datePicker = this.card.dueAt;
    },
    confirmButtomDisabledRules() {
      if (this.newTitle) return !this.newTitle.length > 0;
      return true;
    },
    closeShowCard() {
      this.$emit("closeDialog")
      // this.$forceUpdate()
    }
  },
};
</script>
