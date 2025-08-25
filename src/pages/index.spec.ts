import { flushPromises, mount } from '@vue/test-utils';

import PageHome from './index.vue';
import restaurantsResponse from '@/mock/restaurants.json';
import * as apiService from '~/services/api';
import LoadingError from '~/components/loading-error.vue';
import RestaurantCard from '~/components/restaurant/card.vue';
import RatingFilter from '~/components/rating-filter.vue';
import type { Restaurant, Review } from '~/composables/restaurants';

vi.spyOn(apiService, `api`)
  .mockImplementationOnce(() => ({ json: vi.fn().mockResolvedValue(restaurantsResponse) } as any))
  .mockImplementationOnce(() => ({ json: vi.fn().mockRejectedValueOnce(new Error(`something went wrong`)) } as any));

describe(`page-home`, () => {
  beforeEach(async (context) => {
    context.router.push(`/`);
    await context.router.isReady();
  });

  it(`displays the list of restaurants`, async (context) => {
    // Mount the home page and wait for the first successful fetch
    const wrapper = mount(PageHome, {
      global: { plugins: [context.router] },
    });
    await flushPromises();
    // Validate API call and that no error component is shown
    expect(apiService.api).toHaveBeenCalled();
    expect(apiService.api).toHaveBeenCalledWith(`restaurants`);
    expect(wrapper.findComponent(LoadingError).exists()).toBe(false);
    // The number of cards should match the dataset length
    expect(wrapper.findAllComponents(RestaurantCard).length).toBe(restaurantsResponse.length);
  });

  it(`filters the list by the selected rating`, async (context) => {
    // Reset the mock to a successful response for this call
    (apiService.api as any).mockReset();
    (apiService.api as any)
      .mockImplementationOnce(() => ({ json: vi.fn().mockResolvedValue(restaurantsResponse) } as any));

    // Mount page and ensure data is loaded
    const wrapper = mount(PageHome, {
      global: { plugins: [context.router] },
    });
    await flushPromises();

    // Simulate selecting a rating from RatingFilter and wait for recompute
    const ratingFilter = wrapper.findComponent(RatingFilter);
    ratingFilter.vm.$emit(`update:rating`, 5);
    await flushPromises();

    // Compute how many restaurants have an exact average of 5
    const exactlyFive = (restaurantsResponse as Restaurant[]).filter((r) => {
      const ratings = (r.reviews || []).map((x: Review) => x.rating);
      if (!ratings.length) return false;
      const avg = ratings.reduce((s: number, x: number) => s + x, 0) / ratings.length;
      return avg === 5;
    }).length;

    // The rendered list should contain only restaurants whose average equals 5
    expect(wrapper.findAllComponents(RestaurantCard).length).toBe(exactlyFive);
  });

  it(`handles fetch error`, async (context) => {
    // Reset the mock and force an error for this test
    (apiService.api as any).mockReset();
    (apiService.api as any)
      .mockImplementationOnce(() => ({ json: vi.fn().mockRejectedValueOnce(new Error(`something went wrong`)) } as any));

    // When the API errors out, the LoadingError component should be visible
    const wrapper = mount(PageHome, {
      global: { plugins: [context.router] },
    });
    await flushPromises();
    expect(wrapper.findComponent(LoadingError).exists()).toBe(true);
  });
});
