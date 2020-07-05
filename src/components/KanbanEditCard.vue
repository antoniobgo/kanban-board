<template lang="pug">
  v-card
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
          v-row
            h3.ml-3.mb-2 Mover card
          v-select( v-model="selectedStep" :items="kanbanSteps" item-text="name" filled return-object prepend-icon="mdi-cursor-move")
        v-spacer
        v-col(cols="4")
          v-row
          v-menu(
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px")
            template(v-slot:activator="{on, attrs}")
              v-text-field.mt-6(
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
      v-divider.my-3
      v-card-actions
        v-btn(@click="onCancelUpdate") cancelar
        v-spacer
        v-btn(@click="onConfirmUpdate" :disabled="confirmButtomDisabledRules()") confirmar
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    card: {
      type: Object,
      required: true
    },
    step: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newTitle: this.card.title,
      newDescription: this.card.newDescription,
      datePicker: this.card.dueAt,
      selectedStep: this.step,
      menu1: false
    };
  },
  computed: {
    ...mapState(["kanbanSteps"])
  },
  methods: {
    onConfirmUpdate() {
      this.$store.commit("updateCard", {
        card: this.card,
        updateData: {
          title: this.newTitle,
          description: this.newDescription,
          dueAt: this.datePicker
        }
      });
      if (this.step != this.selectedStep) {
        this.$store.commit("updateSteps", {
          card: this.card,
          oldStep: this.step,
          newStep: this.selectedStep
        });
      }
      this.$emit("closeDialog");
    },
    onCancelUpdate() {
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
    }
  }
};
</script>
