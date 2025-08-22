<script setup lang="ts">
import { defineEmits, ref } from 'vue';

const emit = defineEmits<{
  (e: 'update:rating', value: number): void
}>();

const ratingFilterItems = [
  { title: `all restaurants`, value: 0 },
  { title: `5 stars`, value: 5 },
  { title: `4 stars or more`, value: 4 },
  { title: `3 stars or more`, value: 3 },
  { title: `2 stars or more`, value: 2 },
  { title: `1 star or more`, value: 1 },
];

const selected = ref(0);
// Émettre la valeur sélectionnée à chaque changement
function onChange(value: number) {
  selected.value = value;
  emit(`update:rating`, value);
}
</script>

<template>
  <VCard variant="outlined">
    <VCardText>
      <div class="flex flex-wrap items-center justify-between gap-8">
        <strong>Filtrer les restaurants par note</strong>
        <VSelect
          v-model="selected"
          :items="ratingFilterItems"
          item-title="title"
          item-value="value"
          variant="solo"
          hide-details="auto"
          placeholder="all restaurants"
          @update:model-value="onChange"
        />
      </div>
    </VCardText>
  </VCard>
</template>
