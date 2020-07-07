<template lang="pug">
  v-app
    v-app-bar(app)
      v-btn(icon)
        v-app-bar-nav-icon
      v-toolbar-title Kanban Board
    v-content
      router-view
</template>

<script>
import Home from "@/views/Home";
export default {
  name: "App",

  components: {
    Home,
  },

  data: () => ({
    //
  }),
};
</script>
