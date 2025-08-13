import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App', () => {
  it('renders AppHeader and router-view', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          'AppHeader': true,
          'router-view': true
        }
      }
    })
    expect(wrapper.findComponent({ name: 'AppHeader' }).exists()).toBe(true)
    expect(wrapper.find('router-view-stub').exists()).toBe(true)
  })
})
