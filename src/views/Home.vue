<template lang="pug">
v-container(fluid)
  div(v-if="kanbanSteps").pa-4
    v-row
      v-col(v-for="step in kanbanSteps" :key="step.name" cols="2")
        kanban-step(:step="step").mr-5
</template>

<script>
import { mapState } from "vuex";
import KanbanStep from "@/components/KanbanStep";
export default {
  name: "Home",
  components: { KanbanStep },
  data() {
    return {};
  },
  computed: {
    ...mapState(["kanbanSteps"])
  }
};
</script>

<style></style>
