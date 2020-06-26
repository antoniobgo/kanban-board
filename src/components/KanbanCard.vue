<template lang="pug">
  v-card
    v-card-title.pb-5(
      primary-title
      class="headline grey lighten-2"
    )
      | Editar Card
    v-card-text.pl-3
      v-text-field(v-model="newTitle" label="Título" prepend-icon="mdi-card-text-outline")
      v-textarea.mt-3(v-model="newDescription" rows="2" label="Descrição" prepend-icon="mdi-card-text-outline")
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
      required: true,
    },
  },
  data() {
    return {
      newTitle: this.card.title,
      newDescription: this.card.newDescription,
    };
  },
  methods: {
    onConfirmUpdate() {
      this.$store.commit("updateCard", {
        card: this.card,
        updateData: { title: this.newTitle, description: this.newDescription },
      });
      this.$emit("closeDialog");
    },
  },
};
</script>
