import { mount } from '@vue/test-utils';
import RestaurantReview from './review.vue';

describe(`restaurant-review`, () => {
  it(`renders a review`, () => {
    const wrapper = mount(RestaurantReview, {
      props: {
        review: {
          rating: 4.5,
          text: `Super restaurant, service impeccable !`,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it(`renders correctly with minimal review`, () => {
    const wrapper = mount(RestaurantReview, {
      props: {
        review: {
          rating: 0,
          text: ``,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
