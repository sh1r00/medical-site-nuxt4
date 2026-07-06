import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, computed, onMounted } from 'vue'
import { setActivePinia, createPinia } from 'pinia'

// Stub Nuxt auto-imports
vi.stubGlobal('ref', ref)
vi.stubGlobal('computed', computed)
vi.stubGlobal('onMounted', onMounted)
vi.stubGlobal('import', { meta: { client: true } })

// Mock i18n
const mockT = vi.fn((key: string) => key)
const mockLocale = ref('en')
const mockLocales = ref([
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
])
vi.stubGlobal('useI18n', vi.fn(() => ({
  t: mockT,
  locale: mockLocale,
  locales: mockLocales,
})))
vi.stubGlobal('useLocalePath', vi.fn(() => (path: string) => `/en${path === '/' ? '' : path}`))
vi.stubGlobal('useSwitchLocalePath', vi.fn(() => (code: string) => `/switch-locale/${code}`))

// Mock useRoute (already stubbed in setup.ts, but we need a reactive path)
vi.stubGlobal('useRoute', vi.fn(() => ({
  path: '/en',
  params: {},
  query: {},
  fullPath: '/en',
})))

// Mock dark mode store
const mockDarkStore = {
  isDark: ref(false),
  init: vi.fn(),
  toggle: vi.fn(),
}
vi.stubGlobal('useDarkModeStore', vi.fn(() => mockDarkStore))

import OHeader from '~/components/organisms/OHeader.vue'
import ADarkModeToggle from '~/components/atoms/ADarkModeToggle.vue'

describe('OHeader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setActivePinia(createPinia())
    mockDarkStore.isDark.value = false
  })

  it('renders a header with role banner', () => {
    const wrapper = mount(OHeader, {
      global: {
        stubs: {
          AIcon: true,
          ADarkModeToggle: true,
          ABaseButton: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })
    expect(wrapper.find('header[role="banner"]').exists()).toBe(true)
  })

  it('renders the site name "MediCare Plus"', () => {
    const wrapper = mount(OHeader, {
      global: {
        stubs: {
          AIcon: true,
          ADarkModeToggle: true,
          ABaseButton: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })
    expect(wrapper.text()).toContain('MediCare Plus')
  })

  it('renders navigation links', () => {
    const wrapper = mount(OHeader, {
      global: {
        stubs: {
          AIcon: true,
          ADarkModeToggle: true,
          ABaseButton: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })

    // navLinks are computed from t() which returns the key itself
    const expectedLabels = ['nav.home', 'nav.about', 'nav.blogs', 'nav.faqs', 'nav.contact']
    for (const label of expectedLabels) {
      expect(wrapper.text()).toContain(label)
    }
  })

  it('renders emergency contact button', () => {
    const wrapper = mount(OHeader, {
      global: {
        stubs: {
          AIcon: true,
          ADarkModeToggle: true,
          ABaseButton: {
            template: '<button><slot /></button>',
          },
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })
    expect(wrapper.text()).toContain('emergency')
  })

  it('renders dark mode toggle', () => {
    const wrapper = mount(OHeader, {
      global: {
        stubs: {
          AIcon: true,
          ABaseButton: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
        components: { ADarkModeToggle },
      },
    })
    expect(wrapper.findComponent({ name: 'ADarkModeToggle' }).exists()).toBe(true)
  })

  it('renders locale switcher button', () => {
    const wrapper = mount(OHeader, {
      global: {
        stubs: {
          AIcon: true,
          ADarkModeToggle: true,
          ABaseButton: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })

    // Find locale button by its aria-label
    const buttons = wrapper.findAll('button')
    const localeBtn = buttons.find(b => b.attributes('aria-label') === 'switchLanguage')
    expect(localeBtn).toBeTruthy()
  })

  it('opens locale dropdown on click', async () => {
    const wrapper = mount(OHeader, {
      global: {
        stubs: {
          AIcon: true,
          ADarkModeToggle: true,
          ABaseButton: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })

    // Click the locale button
    const buttons = wrapper.findAll('button')
    const localeBtn = buttons.find(b => b.attributes('aria-label') === 'switchLanguage')
    await localeBtn!.trigger('click')

    // Check that locale dropdown is open
    expect(wrapper.text()).toContain('English')
    expect(wrapper.text()).toContain('Spanish')
  })

  it('renders mobile menu button', () => {
    const wrapper = mount(OHeader, {
      global: {
        stubs: {
          AIcon: true,
          ADarkModeToggle: true,
          ABaseButton: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })

    // Mobile menu button is the one with md:hidden class
    const buttons = wrapper.findAll('button')
    const menuBtn = buttons.find(b => b.classes().includes('md:hidden'))
    expect(menuBtn).toBeTruthy()
  })

  it('opens mobile menu on click', async () => {
    const wrapper = mount(OHeader, {
      global: {
        stubs: {
          AIcon: true,
          ADarkModeToggle: true,
          ABaseButton: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })

    // Mobile menu should not be present initially (v-if)
    expect(wrapper.find('[aria-label="Mobile navigation"]').exists()).toBe(false)

    // Click mobile menu button
    const buttons = wrapper.findAll('button')
    const menuBtn = buttons.find(b => b.classes().includes('md:hidden'))
    await menuBtn!.trigger('click')

    // Mobile menu should now be visible
    expect(wrapper.find('[aria-label="Mobile navigation"]').exists()).toBe(true)
  })

  it('calls darkStore.init on mount', () => {
    mount(OHeader, {
      global: {
        stubs: {
          AIcon: true,
          ADarkModeToggle: true,
          ABaseButton: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })
    expect(mockDarkStore.init).toHaveBeenCalled()
  })
})
