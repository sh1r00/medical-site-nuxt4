import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, computed } from 'vue'

// Stub Nuxt auto-imports
vi.stubGlobal('ref', ref)
vi.stubGlobal('computed', computed)

import ABaseButton from '~/components/atoms/ABaseButton.vue'

describe('ABaseButton', () => {
  it('renders a button element', () => {
    const wrapper = mount(ABaseButton, {
      slots: { default: 'Click me' },
    })
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(ABaseButton, {
      slots: { default: '<span class="inner">Submit</span>' },
    })
    expect(wrapper.find('.inner').exists()).toBe(true)
    expect(wrapper.text()).toContain('Submit')
  })

  it('has default type "button"', () => {
    const wrapper = mount(ABaseButton)
    const button = wrapper.find('button')
    expect(button.attributes('type')).toBe('button')
  })

  it('accepts type prop', () => {
    const wrapper = mount(ABaseButton, {
      props: { type: 'submit' },
    })
    expect(wrapper.find('button').attributes('type')).toBe('submit')
  })

  it('accepts disabled prop', () => {
    const wrapper = mount(ABaseButton, {
      props: { disabled: true },
      slots: { default: 'Disabled' },
    })
    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('is not disabled by default', () => {
    const wrapper = mount(ABaseButton, {
      slots: { default: 'Enabled' },
    })
    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeUndefined()
  })

  it('sets aria-label when provided', () => {
    const wrapper = mount(ABaseButton, {
      props: { ariaLabel: 'Close dialog' },
    })
    expect(wrapper.find('button').attributes('aria-label')).toBe('Close dialog')
  })

  it('does not set aria-label when not provided', () => {
    const wrapper = mount(ABaseButton)
    expect(wrapper.find('button').attributes('aria-label')).toBeUndefined()
  })

  it('sets aria-invalid when invalid prop is true', () => {
    const wrapper = mount(ABaseButton, {
      props: { invalid: true },
    })
    expect(wrapper.find('button').attributes('aria-invalid')).toBe('true')
  })

  it('does not set aria-invalid when not invalid', () => {
    const wrapper = mount(ABaseButton, {
      props: { invalid: false },
    })
    expect(wrapper.find('button').attributes('aria-invalid')).toBeUndefined()
  })

  it('sets id when provided', () => {
    const wrapper = mount(ABaseButton, {
      props: { id: 'my-button' },
    })
    expect(wrapper.find('button').attributes('id')).toBe('my-button')
  })

  it('applies base CSS classes', () => {
    const wrapper = mount(ABaseButton, {
      slots: { default: 'Test' },
    })
    const button = wrapper.find('button')
    expect(button.classes()).toContain('inline-flex')
    expect(button.classes()).toContain('rounded-lg')
    expect(button.classes()).toContain('font-medium')
  })

  it('respects type=reset', () => {
    const wrapper = mount(ABaseButton, {
      props: { type: 'reset' },
    })
    expect(wrapper.find('button').attributes('type')).toBe('reset')
  })
})
