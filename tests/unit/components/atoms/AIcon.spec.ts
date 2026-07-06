import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, computed } from 'vue'

// Stub Nuxt auto-imports
vi.stubGlobal('ref', ref)
vi.stubGlobal('computed', computed)

import AIcon from '~/components/atoms/AIcon.vue'

describe('AIcon', () => {
  it('renders a span with role="img"', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'heart' },
    })
    const span = wrapper.find('span')
    expect(span.exists()).toBe(true)
    expect(span.attributes('role')).toBe('img')
  })

  it('renders heart SVG when name is heart', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'heart' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders different icons for different names', () => {
    const names = ['heart', 'sun', 'moon', 'phone', 'mail', 'menu', 'close']
    for (const name of names) {
      const wrapper = mount(AIcon, {
        props: { name },
      })
      expect(wrapper.find('svg').exists()).toBe(true)
    }
  })

  it('renders fallback circle icon for unknown name', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'unknown-icon' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
    // The fallback icon has a circle element
    expect(wrapper.find('circle').exists()).toBe(true)
  })

  it('sets aria-hidden when decorative', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'heart', decorative: true },
    })
    expect(wrapper.find('span').attributes('aria-hidden')).toBe('true')
  })

  it('sets aria-label when not decorative', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'heart', decorative: false },
    })
    expect(wrapper.find('span').attributes('aria-label')).toBe('heart icon')
  })

  it('uses custom ariaLabel when provided', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'heart', ariaLabel: 'Favorite' },
    })
    expect(wrapper.find('span').attributes('aria-label')).toBe('Favorite')
  })

  it('applies size classes', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'heart' },
      attrs: { size: '8' },
    })
    expect(wrapper.find('span').classes()).toContain('w-8')
    expect(wrapper.find('span').classes()).toContain('h-8')
  })

  it('uses default size 6 when no size specified', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'heart' },
    })
    expect(wrapper.find('span').classes()).toContain('w-6')
    expect(wrapper.find('span').classes()).toContain('h-6')
  })

  it('has inline-flex class', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'heart' },
    })
    expect(wrapper.find('span').classes()).toContain('inline-flex')
  })
})
