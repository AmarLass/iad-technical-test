<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  review: {
    rating: number
    text: string
  }
}>();
</script>

<template>
  <VCard class="va-company-review mb-2" tag="li">
    <VCardText>
      <div class="flex items-center gap-2 mb-2">
        <VRating
          :model-value="review.rating"
          color="amber"
          half-increments
          readonly
          size="30"
        />
        <span class="text-sm text-gray-600">({{ review.rating.toFixed(1) }})</span>
      </div>
      <div class="whitespace-pre-line text-gray-800">
        {{ review.text }}
      </div>
    </VCardText>
  </VCard>
</template>
