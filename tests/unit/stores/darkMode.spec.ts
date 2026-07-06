import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { ref, computed } from 'vue'

// Stub Nuxt auto-imports used by the store
vi.stubGlobal('ref', ref)
vi.stubGlobal('computed', computed)

let useDarkModeStore: any

beforeAll(async () => {
  const mod = await import('~/stores/darkMode')
  useDarkModeStore = mod.useDarkModeStore
})

describe('darkMode store', () => {
  let store: ReturnType<typeof useDarkModeStore>

  const localStorageMock = (() => {
    let store: Record<string, string> = {}
    return {
      getItem: vi.fn((key: string) => store[key] ?? null),
      setItem: vi.fn((key: string, value: string) => { store[key] = value }),
      removeItem: vi.fn((key: string) => { delete store[key] }),
      clear: vi.fn(() => { store = {} }),
    }
  })()

  beforeEach(() => {
    vi.stubGlobal('localStorage', localStorageMock)

    // Spy on document.documentElement.classList instead of replacing document
    const classList = document.documentElement.classList
    vi.spyOn(classList, 'add').mockImplementation(() => {})
    vi.spyOn(classList, 'remove').mockImplementation(() => {})

    localStorageMock.clear()
    vi.clearAllMocks()

    setActivePinia(createPinia())
    store = useDarkModeStore()
  })

  describe('initial state', () => {
    it('should initialize with isDark as false', () => {
      expect(store.isDark).toBe(false)
    })

    it('should expose init, toggle, and isDark', () => {
      expect(store).toHaveProperty('isDark')
      expect(store).toHaveProperty('init')
      expect(store).toHaveProperty('toggle')
      expect(typeof store.init).toBe('function')
      expect(typeof store.toggle).toBe('function')
    })
  })

  describe('toggle', () => {
    it('should toggle isDark from false to true', () => {
      expect(store.isDark).toBe(false)
      store.toggle()
      expect(store.isDark).toBe(true)
    })

    it('should toggle isDark from true to false', () => {
      store.toggle() // false -> true
      expect(store.isDark).toBe(true)
      store.toggle() // true -> false
      expect(store.isDark).toBe(false)
    })

    it('should persist dark mode preference to localStorage', () => {
      store.toggle()
      expect(localStorageMock.setItem).toHaveBeenCalledWith('darkMode', 'true')

      store.toggle()
      expect(localStorageMock.setItem).toHaveBeenCalledWith('darkMode', 'false')
    })

    it('should add "dark" class to document when toggled on', () => {
      const classList = document.documentElement.classList
      store.toggle() // dark mode on
      expect(classList.add).toHaveBeenCalledWith('dark')
    })

    it('should remove "dark" class from document when toggled off', () => {
      const classList = document.documentElement.classList
      store.toggle() // dark mode on
      store.toggle() // dark mode off
      expect(classList.remove).toHaveBeenCalledWith('dark')
    })
  })

  describe('init', () => {
    it('should read from localStorage if value exists', () => {
      localStorageMock.getItem.mockReturnValue('true')
      store.init()
      expect(store.isDark).toBe(true)
    })

    it('should use system preference when localStorage has no value', () => {
      localStorageMock.getItem.mockReturnValue(null)
      vi.stubGlobal('window', { matchMedia: vi.fn(() => ({ matches: true })) })

      store.init()
      expect(store.isDark).toBe(true)
    })

    it('should default to false when no stored value and system prefers light', () => {
      localStorageMock.getItem.mockReturnValue(null)
      vi.stubGlobal('window', { matchMedia: vi.fn(() => ({ matches: false })) })

      store.init()
      expect(store.isDark).toBe(false)
    })
  })
})
