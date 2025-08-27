<script setup lang="ts">
import { computed, ref } from 'vue';
import { useFetchRestaurants } from '~/composables/restaurants';

const { data: restaurants, isError } = useFetchRestaurants();
const selectedRating = ref(0);

// Filter restaurants by the currently selected rating
const filteredRestaurants = computed(() =>
  !restaurants.value
    ? []
    : selectedRating.value === 0
      ? restaurants.value
      : restaurants.value.filter(r =>
        r.reviews?.length
          && (r.reviews.reduce((sum, review) => sum + review.rating, 0) / r.reviews.length) >= selectedRating.value,
      ),
);
</script>

<template>
  <div>
    <RatingFilter @update:rating="selectedRating = $event" />
    <LoadingError v-if="isError" />
    <div
      v-else-if="restaurants"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6"
    >
      <RestaurantCard
        v-for="restaurant of filteredRestaurants"
        :key="restaurant.id"
        :restaurant="restaurant"
      />
    </div>
  </div>
</template>
