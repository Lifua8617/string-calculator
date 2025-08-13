import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AboutView from '@/views/AboutView.vue'

describe('AboutView', () => {
  it('renders an about page title', () => {
    const wrapper = mount(AboutView)
    expect(wrapper.find('h1').text()).toBe('This is an about page')
  })
})
