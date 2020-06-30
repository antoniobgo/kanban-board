<template lang="pug">
  v-card
    v-card-title(
      primary-title
      class="headline grey lighten-2"
    )
      | Editar Card
    v-card-text.pl-3.pt-1
      v-text-field(v-model="newTitle" label="Título" prepend-icon="mdi-card-text-outline")
      v-textarea.mt-3(v-model="newDescription" rows="2" label="Descrição" prepend-icon="mdi-card-text-outline")
      v-menu(
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px")
        template(v-slot:activator="{on, attrs}")
          v-text-field(
              v-model="datePicker"
              label="Data"
              hint="MM/DD/YYYY"
              persistent-hint
              prepend-icon="mdi-calendar-outline"
              v-bind="attrs"
              v-on="on"
          )
        v-date-picker(v-model="datePicker" @input="menu1 = false")
      v-divider
      v-card-actions
        v-spacer
        v-btn(@click="onConfirmUpdate") confirmar
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newTitle: this.card.title,
      newDescription: this.card.newDescription,
      datePicker: this.card.dueAt || new Date().toISOString().substr(0, 10),
      menu1: false
    };
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
      this.$emit("closeDialog");
    }
  }
};
</script>
