import { mount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App.vue', () => {
  it('renders plus button', () => {
    const wrapper = mount(App, {});
    expect(wrapper.find('[data-test="plus"]').exists()).toBe(true);
  });
  it('creates one more input on button click', async () => {
    const wrapper = mount(App, {});
    const button = wrapper.find('[data-test="plus"]');
    expect(wrapper.findAll('input')).toHaveLength(0);
    await button.trigger('click');
    expect(wrapper.findAll('input')).toHaveLength(1);
    await button.trigger('click');
    await button.trigger('click');
    expect(wrapper.findAll('input')).toHaveLength(3);
  });
});
