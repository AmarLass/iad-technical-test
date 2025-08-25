<script setup lang="ts">
import { useFetchRestaurant } from '~/composables/restaurants';

const { params } = useRoute();
const { data: restaurant, isError } = useFetchRestaurant({ restaurantId: params.restaurantId });

// Calcul de la note moyenne
const averageRating = computed(() =>
  restaurant.value?.reviews?.length
    ? restaurant.value.reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / restaurant.value.reviews.length
    : 0,
);
</script>

<template>
  <VAlert v-if="isError" type="warning" class="mt-4">
    Une erreur est survenue lors de la récupération du restaurant.
  </VAlert>
  <div
    v-else
    class="grid grid-cols-1 md:grid-cols-[minmax(0,_1fr)_16rem] gap-6"
  >
    <VCard v-if="restaurant">
      <VImg
        v-for="photo in restaurant.photos"
        :key="photo"
        :src="restaurant.photos[0]"
        height="250"
        cover
        gradient="to top, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      >
        <VCardTitle class="!text-4xl text-white">
          {{ restaurant.name }}
        </VCardTitle>
        <div class="mx-4 w-1/2 flex items-center gap-2">
          <VRating
            :model-value="averageRating"
            color="amber"
            half-increments
            readonly
            size="30"
          />
          <span class="text-sm text-white">({{ averageRating.toFixed(1) }})</span>
        </div>
      </VImg>
      <VCardText>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RestaurantLocation :location="restaurant.location" />
          <KeyValue icon="mdi-phone">
            <p class="text-body-1">
              {{ restaurant.display_phone || restaurant.phone }}
            </p>
          </KeyValue>
        </div>
      </VCardText>
    </VCard>
    <aside class="md:col-span-1 md:row-span-1 mt-6 md:mt-0">
      <ul class="pa-0">
        <RestaurantReview
          v-for="review in restaurant?.reviews"
          :key="review.id"
          :review="review"
        />
      </ul>
    </aside>
  </div>
</template>
