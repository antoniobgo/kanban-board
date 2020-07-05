<template lang="pug">
  v-card
    v-card-title(
      primary-title
      class="headline grey lighten-2"
    )
      | {{ card.title }}
    v-card-text.pt-5
      h3 Descrição
      p(v-if="card.description && card.description.length > 0") {{ card.description }}
      p(v-else) Edite para adicionar descrição
      h3 Data de entrega
      p(v-if="card.dueAt && card.dueAt.length > 0") {{ card.dueAt }}
      p(v-else) Edite para adicionar data de entrega
      h3 Status
      p {{ step.name }}
      v-divider.my-3
      v-card-actions
        v-spacer
        v-btn(@click="$emit('closeDialog')") fechar
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
    return {};
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
    }
  }
};
</script>
