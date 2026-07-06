import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, computed } from 'vue'
import { setActivePinia, createPinia } from 'pinia'

// Stub Nuxt auto-imports for the store
vi.stubGlobal('ref', ref)
vi.stubGlobal('computed', computed)

let useDarkModeStore: any
let ADarkModeToggle: any
let AIcon: any

beforeAll(async () => {
  const storeMod = await import('~/stores/darkMode')
  useDarkModeStore = storeMod.useDarkModeStore
  ADarkModeToggle = (await import('~/components/atoms/ADarkModeToggle.vue')).default
  AIcon = (await import('~/components/atoms/AIcon.vue')).default
})

describe('ADarkModeToggle', () => {
  const localStorageMock = {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    clear: vi.fn(),
  }

  beforeEach(() => {
    vi.stubGlobal('localStorage', localStorageMock)

    // Spy on real happy-dom document classList
    const classList = document.documentElement.classList
    vi.spyOn(classList, 'add').mockImplementation(() => {})
    vi.spyOn(classList, 'remove').mockImplementation(() => {})

    vi.clearAllMocks()

    // Create real pinia + store and stub it globally so ADarkModeToggle uses it
    setActivePinia(createPinia())
    const realStore = useDarkModeStore()
    vi.stubGlobal('useDarkModeStore', vi.fn(() => realStore))
  })

  it('renders a button', () => {
    const wrapper = mount(ADarkModeToggle, {
      global: {
        stubs: { AIcon: true },
      },
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('has accessible aria-label', () => {
    const wrapper = mount(ADarkModeToggle, {
      global: {
        stubs: { AIcon: true },
      },
    })
    const button = wrapper.find('button')
    expect(button.attributes('aria-label')).toBeDefined()
  })

  it('toggles dark mode on click', async () => {
    const wrapper = mount(ADarkModeToggle, {
      global: {
        stubs: { AIcon: true },
      },
    })
    const store = useDarkModeStore()

    expect(store.isDark).toBe(false)
    await wrapper.find('button').trigger('click')
    expect(store.isDark).toBe(true)
  })

  it('toggles back to light mode on second click', async () => {
    const wrapper = mount(ADarkModeToggle, {
      global: {
        stubs: { AIcon: true },
      },
    })
    const store = useDarkModeStore()

    await wrapper.find('button').trigger('click')
    expect(store.isDark).toBe(true)

    await wrapper.find('button').trigger('click')
    expect(store.isDark).toBe(false)
  })

  it('shows sun icon in dark mode, moon icon in light mode', async () => {
    const wrapper = mount(ADarkModeToggle, {
      global: {
        components: { AIcon },
      },
    })

    // Default: light mode -> moon icon
    let iconComponent = wrapper.findComponent(AIcon)
    expect(iconComponent.exists()).toBe(true)
    expect(iconComponent.props('name')).toBe('moon')

    await wrapper.find('button').trigger('click')

    // Dark mode -> sun icon
    iconComponent = wrapper.findComponent(AIcon)
    expect(iconComponent.props('name')).toBe('sun')
  })
})
