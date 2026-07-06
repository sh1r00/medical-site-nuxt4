<template>
  <header
    class="sticky top-0 z-40 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
    role="banner"
  >
    <nav
      class="section-container flex items-center justify-between h-16 md:h-20"
      aria-label="Main navigation"
    >
      <!-- Logo -->
      <NuxtLink
        :to="localePath('/')"
        class="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold text-xl"
        aria-label="MediCare Plus home"
      >
        <AIcon name="heart" size="8" decorative />
        <span class="hidden sm:inline">MediCare Plus</span>
      </NuxtLink>

      <!-- Desktop nav -->
      <ul class="hidden md:flex items-center gap-1" role="list">
        <li v-for="link in navLinks" :key="link.to">
          <NuxtLink
            :to="localePath(link.to)"
            class="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-primary-950 transition-colors"
            :aria-current="isCurrentPath(link.to) ? 'page' : undefined"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Right actions -->
      <div class="flex items-center gap-2">
        <NuxtLink
          :to="localePath('/contact')"
          class="hidden sm:inline-flex"
        >
          <ABaseButton size="sm" variant="primary">
            <AIcon name="phone" size="4" decorative />
            {{ t('emergency') }}
          </ABaseButton>
        </NuxtLink>

        <ADarkModeToggle />

        <!-- Locale switcher -->
        <div class="relative" @keydown.escape="localeOpen = false">
          <button
            type="button"
            :aria-label="t('switchLanguage')"
            :aria-expanded="localeOpen ? 'true' : 'false'"
            class="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            @click="localeOpen = !localeOpen"
          >
            <AIcon name="globe" size="5" decorative />
            <span class="ml-1 text-xs font-medium uppercase">{{ locale }}</span>
          </button>

          <ul
            v-if="localeOpen"
            class="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50"
            role="listbox"
            :aria-label="t('chooseLanguage')"
          >
            <li
              v-for="loc in availableLocales"
              :key="loc.code"
              role="option"
              :aria-selected="loc.code === locale"
            >
              <NuxtLink
                :to="switchLocalePath(loc.code)"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-primary-950 dark:hover:text-primary-400"
                :class="{ 'font-semibold bg-primary-50 dark:bg-primary-950': loc.code === locale }"
                @click="localeOpen = false"
              >
                {{ loc.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Mobile menu button -->
        <button
          type="button"
          :aria-label="mobileMenuOpen ? t('closeMenu') : t('openMenu')"
          :aria-expanded="mobileMenuOpen ? 'true' : 'false'"
          class="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <AIcon :name="mobileMenuOpen ? 'close' : 'menu'" size="5" decorative />
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <nav
      v-if="mobileMenuOpen"
      class="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 animate-slide-down"
      aria-label="Mobile navigation"
    >
      <ul class="section-container py-4 space-y-1" role="list">
        <li v-for="link in navLinks" :key="link.to">
          <NuxtLink
            :to="localePath(link.to)"
            class="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-primary-950 transition-colors"
            :aria-current="isCurrentPath(link.to) ? 'page' : undefined"
            @click="mobileMenuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            :to="localePath('/contact')"
            class="block px-4 py-3 mt-2"
            @click="mobileMenuOpen = false"
          >
            <ABaseButton size="md" variant="primary" class="w-full">
              <AIcon name="phone" size="4" decorative />
              {{ t('emergency') }}
            </ABaseButton>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useDarkModeStore } from '~/stores/darkMode'
import { useI18n } from 'vue-i18n'
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

const darkStore = useDarkModeStore()
onMounted(() => darkStore.init())

const mobileMenuOpen = ref(false)
const localeOpen = ref(false)

const availableLocales = computed(() => locales.value)

const navLinks = computed(() => [
  { to: '/', label: t('nav.home') },
  { to: '/about', label: t('nav.about') },
  { to: '/blogs', label: t('nav.blogs') },
  { to: '/faqs', label: t('nav.faqs') },
  { to: '/contact', label: t('nav.contact') },
])

const isCurrentPath = (to: string) => {
  const localized = localePath(to)
  return route.path === localized || route.path.startsWith(localized + '/')
}

// Close locale dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.relative')) {
      localeOpen.value = false
    }
  })
})
</script>
