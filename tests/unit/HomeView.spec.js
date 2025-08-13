import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'

describe('HomeView', () => {
  it('renders HelloWorld component', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.findComponent({ name: 'HelloWorld' }).exists()).toBe(true)
  })
})
