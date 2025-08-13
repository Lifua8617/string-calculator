import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '@/components/AppHeader.vue'

describe('AppHeader', () => {
  it('renders a header element', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.find('header').exists()).toBe(true)
  })
})
