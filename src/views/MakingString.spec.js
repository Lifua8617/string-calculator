import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MakingString from './MakingString.vue'

describe('MakingString', () => {
  it('shows prompt message initially', () => {
    const wrapper = mount(MakingString)
    expect(wrapper.text()).toContain('回転数、番手、撚りを入力してください。')
  })

  it('shows result when valid inputs are provided', async () => {
    const wrapper = mount(MakingString)
    
    await wrapper.find('input#count').setValue(48)
    await wrapper.find('input#twist').setValue(570)
    await wrapper.find('input#rpm').setValue(7000)
    await wrapper.find('input#hundredValue').setValue(100)

    expect(wrapper.text()).toContain('生産時間(分):')
    expect(wrapper.find('.final-answer strong').text()).not.toBe('0')
  })
})
