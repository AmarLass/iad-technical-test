import { flushPromises, mount } from '@vue/test-utils';

import RatingFilter from './rating-filter.vue';

describe(`rating-filter`, () => {
  it(`émet update:rating quand la valeur change`, async () => {
    // Mount the component without globals, as it is self-contained
    const wrapper = mount(RatingFilter);

    // Simulate a selection change via the VSelect event
    const vSelect = wrapper.findComponent({ name: `VSelect` });
    // Emit the Vuetify v-model update to trigger onChange and re-emit
    vSelect.vm.$emit(`update:modelValue`, 4);
    await flushPromises();

    // Assert that the component re-emits the normalized event with the value
    const emitted = wrapper.emitted() as Record<string, unknown[][]>;
    expect(emitted[`update:rating`]).toBeTruthy();
    expect(emitted[`update:rating`][0][0]).toBe(4);
  });
});
