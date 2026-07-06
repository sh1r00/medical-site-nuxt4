import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, computed } from 'vue'

// Stub Nuxt auto-imports
vi.stubGlobal('ref', ref)
vi.stubGlobal('computed', computed)

// Mock i18n
const mockT = vi.fn((key: string) => key)
vi.stubGlobal('useI18n', vi.fn(() => ({
  t: mockT,
  locale: ref('en'),
  locales: ref([{ code: 'en', name: 'English' }]),
})))
vi.stubGlobal('useLocalePath', vi.fn(() => (path: string) => `/en${path === '/' ? '' : path}`))

import OFooter from '~/components/organisms/OFooter.vue'

describe('OFooter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders a footer with role contentinfo', () => {
    const wrapper = mount(OFooter, {
      global: {
        stubs: {
          AIcon: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })
    expect(wrapper.find('footer[role="contentinfo"]').exists()).toBe(true)
  })

  it('renders MediCare Plus brand name', () => {
    const wrapper = mount(OFooter, {
      global: {
        stubs: {
          AIcon: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })
    expect(wrapper.text()).toContain('MediCare Plus')
  })

  it('renders tagline section', () => {
    const wrapper = mount(OFooter, {
      global: {
        stubs: {
          AIcon: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })
    expect(wrapper.text()).toContain('footer.tagline')
  })

  it('renders quick links section', () => {
    const wrapper = mount(OFooter, {
      global: {
        stubs: {
          AIcon: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })
    expect(wrapper.text()).toContain('footer.quickLinks')
    const quickLinks = ['nav.home', 'nav.about', 'nav.blogs', 'nav.faqs', 'nav.contact']
    for (const label of quickLinks) {
      expect(wrapper.text()).toContain(label)
    }
  })

  it('renders services section', () => {
    const wrapper = mount(OFooter, {
      global: {
        stubs: {
          AIcon: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })
    expect(wrapper.text()).toContain('footer.services')
    const services = ['services.cardiology', 'services.neurology', 'services.pediatrics', 'services.orthopedics', 'services.dental']
    for (const svc of services) {
      expect(wrapper.text()).toContain(svc)
    }
  })

  it('renders contact info section', () => {
    const wrapper = mount(OFooter, {
      global: {
        stubs: {
          AIcon: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })
    expect(wrapper.text()).toContain('footer.contact')
    expect(wrapper.text()).toContain('info@medicareplus.com')
    expect(wrapper.text()).toContain('123 Health Avenue')
    expect(wrapper.text()).toContain('+1 (555) 911-0000')
  })

  it('renders social media links', () => {
    const wrapper = mount(OFooter, {
      global: {
        stubs: {
          AIcon: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })

    const socialLinks = wrapper.findAll('a[target="_blank"]')
    expect(socialLinks.length).toBe(4) // facebook, twitter, instagram, linkedin

    const labels = socialLinks.map(link => link.attributes('aria-label'))
    expect(labels).toContain('Facebook')
    expect(labels).toContain('Twitter')
    expect(labels).toContain('Instagram')
    expect(labels).toContain('LinkedIn')
  })

  it('renders privacy and terms links', () => {
    const wrapper = mount(OFooter, {
      global: {
        stubs: {
          AIcon: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })
    expect(wrapper.text()).toContain('footer.privacy')
    expect(wrapper.text()).toContain('footer.terms')
  })

  it('renders copyright with current year', () => {
    const wrapper = mount(OFooter, {
      global: {
        stubs: {
          AIcon: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })
    const currentYear = new Date().getFullYear().toString()
    expect(wrapper.text()).toContain(currentYear)
    expect(wrapper.text()).toContain('footer.rights')
  })

  it('renders emergency number', () => {
    const wrapper = mount(OFooter, {
      global: {
        stubs: {
          AIcon: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })
    expect(wrapper.text()).toContain('footer.emergencyNumber')
    expect(wrapper.text()).toContain('+1 (555) 911-0000')
  })

  it('renders open hours label', () => {
    const wrapper = mount(OFooter, {
      global: {
        stubs: {
          AIcon: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })
    expect(wrapper.text()).toContain('footer.openHours')
  })

  it('renders four columns on large screens', () => {
    const wrapper = mount(OFooter, {
      global: {
        stubs: {
          AIcon: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })
    const grid = wrapper.find('.grid')
    expect(grid.exists()).toBe(true)
    expect(grid.classes()).toContain('lg:grid-cols-4')
  })
})
