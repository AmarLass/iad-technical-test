<script setup lang="ts">
import { type Restaurant } from '~/composables/restaurants';

const props = defineProps<{
  restaurant: Restaurant
}>();

// Compute the average rating for the restaurant
const averageRating = props.restaurant.reviews && props.restaurant.reviews.length
  ? props.restaurant.reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / props.restaurant.reviews.length
  : 0;
</script>

<template>
  <VCard>
    <VImg
      height="100"
      cover
      :src="restaurant?.photos?.[0]"
    />
    <VCardTitle>
      {{ restaurant?.name }}
    </VCardTitle>
    <div class="mx-4 w-1/2 flex items-center gap-2">
      <VRating
        :model-value="averageRating"
        color="amber"
        half-increments
        readonly
        size="30"
      />
      <span class="text-sm text-gray-600">({{ averageRating.toFixed(1) }})</span>
    </div>
    <VCardText>
      <RestaurantLocation :location="restaurant?.location" />
    </VCardText>
    <VCardActions class="mt-auto">
      <VBtn color="primary" variant="tonal" :to="`/restaurants/${restaurant?.id}`">
        see more
      </VBtn>
    </VCardActions>
  </VCard>
</template>
