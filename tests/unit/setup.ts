import { config } from '@vue/test-utils'
import { vi, beforeEach } from 'vitest'
import { ref } from 'vue'

const cookieStore: Record<string, any> = {}
vi.stubGlobal('useCookie', (key: string, opts?: any) => {
  if (!(key in cookieStore)) {
    const defaultVal = opts?.default ? (typeof opts.default === 'function' ? opts.default() : opts.default) : null
    cookieStore[key] = ref(defaultVal)
  }
  return cookieStore[key]
})

vi.stubGlobal('useHead', vi.fn())
vi.stubGlobal('useSeoMeta', vi.fn())
vi.stubGlobal('useRuntimeConfig', vi.fn(() => ({})))
vi.stubGlobal('navigateTo', vi.fn())
vi.stubGlobal('useRoute', vi.fn(() => ({ path: '/', params: {}, query: {}, fullPath: '/' })))
vi.stubGlobal('useRouter', vi.fn(() => ({ push: vi.fn(), replace: vi.fn() })))
vi.stubGlobal('useLocalePath', vi.fn((path: string) => path))
vi.stubGlobal('useSwitchLocalePath', vi.fn((path: string) => path))
vi.stubGlobal('$fetch', vi.fn().mockResolvedValue({}))

// Mock i18n
const mockT = vi.fn((key: string) => key)
vi.stubGlobal('useI18n', vi.fn(() => ({
  t: mockT,
  locale: ref('en'),
  locales: ref([{ code: 'en', name: 'English' }, { code: 'es', name: 'Spanish' }]),
})))

// Mock dark mode store — will be overridden by individual tests that import the real store
const mockDarkStore = {
  isDark: ref(false),
  init: vi.fn(),
  toggle: vi.fn(),
}
vi.stubGlobal('useDarkModeStore', vi.fn(() => mockDarkStore))

config.global.stubs = {
  NuxtLink: { template: '<a :href="to"><slot /></a>', props: ['to'] },
  ClientOnly: { template: '<div><slot /></div>' },
}

beforeEach(() => {
  for (const k of Object.keys(cookieStore)) delete cookieStore[k]
})
vi.stubGlobal("import", { meta: { client: true, server: false } })
