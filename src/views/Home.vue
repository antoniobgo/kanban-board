<template lang="pug">
v-container.pa-4#overflow(v-if="kanbanSteps" fluid)
  .d-flex
    .d-flex.flex-column(v-for="step in kanbanSteps" :key="step.name")
      kanban-step(:step="step").mr-5
    .d-flex.flex-column
      v-card(width="250" color="grey")
        v-card-title.pa-2
          v-row.pl-2#cursor(@click="changeNewStepState" justify="start")
            v-icon mdi-plus
            h5 Adicionar uma nova coluna
        v-divider
        v-card-text(v-if="addingNewStepState")
          v-text-field(v-model="stepName" autofocus @keypress.enter="onConfirmStepAddClick" dense outlined label="Nome da coluna")
          v-row(dense)
            v-btn(@click="onConfirmStepAddClick" :disabled="stepName.length == 0" outlined) confirmar
            v-btn(@click="changeNewStepState" icon)
              v-icon mdi-close
</template>

<script>
import { mapState } from "vuex";
import KanbanStep from "@/components/KanbanStep";
export default {
  name: "Home",
  components: { KanbanStep },
  data() {
    return {
      addingNewStepState: false,
      stepName: ""
    };
  },
  computed: {
    ...mapState(["kanbanSteps"])
  },
  methods: {
    changeNewStepState() {
      this.addingNewStepState = !this.addingNewStepState;
    },
    onConfirmStepAddClick() {
      if (this.stepName.length > 0) {
        this.$store.commit("addStep", this.stepName);
        this.stepName = "";
      }
    }
  }
};
</script>

<style>
#cursor {
  cursor: pointer;
}
#overflow {
  overflow: auto;
  height: 93vh;
}
</style>
