<template lang="pug">
  v-card
    v-card-title.pb-5(
      primary-title
      class="headline grey lighten-2"
    )
      | {{ card.name }}
    h4.ml-6.mt-2 Edite seu card
    v-card-text.pl-3
      v-textarea.mt-3(rows="1" row-height="15" label="Descrição" prepend-icon="mdi-card-text-outline")
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
};
</script>
