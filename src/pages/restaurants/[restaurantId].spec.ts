import { flushPromises, mount } from '@vue/test-utils';

import PageRestaurant from './[restaurantId].vue';
import restaurantsResponse from '@/mock/restaurants.json';
import * as apiService from '~/services/api';
import type { Restaurant } from '~/composables/restaurants';

const restaurant = restaurantsResponse[0];

vi.spyOn(apiService, `api`)
  .mockImplementationOnce(() => ({ json: vi.fn().mockResolvedValue(restaurant) } as any))
  .mockImplementationOnce(() => ({ json: vi.fn().mockRejectedValueOnce(new Error(`something went wrong`)) } as any));

describe(`page-restaurant`, () => {
  beforeEach(async (context) => {
    context.router.push(`/restaurants/${restaurant.id}`);
    await context.router.isReady();
  });

  it(`displays the list of restaurants`, async (context) => {
    // Mount the restaurant page with a successful API response
    const wrapper = mount(PageRestaurant, {
      global: { plugins: [context.router] },
    });
    await flushPromises();
    expect(apiService.api).toHaveBeenCalled();
    expect(apiService.api).toHaveBeenCalledWith(`restaurants/${restaurant.id}`);
    // Snapshot should reflect the full restaurant view
    expect(wrapper.html()).toMatchSnapshot();
  });

  it(`handles fetch error`, async (context) => {
    // Second mocked call rejects; ensure error UI snapshot remains stable
    const wrapper = mount(PageRestaurant, {
      global: { plugins: [context.router] },
    });
    await flushPromises();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it(`shows 0 when there are no reviews`, async (context) => {
    // Prepare a response without reviews
    const restaurantNoReviews = { ...restaurant, reviews: [] } as Restaurant;
    (apiService.api as any)
      .mockImplementationOnce(() => ({ json: vi.fn().mockResolvedValue(restaurantNoReviews) } as any));

    // Stub VImg to render its default slot so we can assert its inner text
    const wrapper = mount(PageRestaurant, {
      global: {
        plugins: [context.router],
        stubs: {
          // Force rendering of VImg content to access the span with the rating
          VImg: { template: `<div><slot /></div>` },
        },
      },
    });
    await flushPromises();

    // Check the rendered text of the average rating (0.0)
    expect(wrapper.text()).toContain(`0.0`);
  });
});
