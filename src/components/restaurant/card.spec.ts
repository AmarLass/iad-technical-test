import { mount } from '@vue/test-utils';

import RestaurantCard from './card.vue';
import restaurantsResponse from '@/mock/restaurants.json';

const restaurant = restaurantsResponse[0];

describe(`restaurant-card`, () => {
  // Ensures the RestaurantCard renders a single restaurant consistently
  it(`renders correctly a restaurant`, (context) => {
    const wrapper = mount(RestaurantCard, {
      global: { plugins: [context.router] },
      props: { restaurant },
    });
    // Snapshot includes structure and key content of the card
    expect(wrapper.html()).toMatchSnapshot();
  });
});
