<template>
  <button
    type="button"
    :aria-label="darkStore.isDark ? t('switchToLight') : t('switchToDark')"
    class="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
    @click="darkStore.toggle()"
  >
    <AIcon :name="darkStore.isDark ? 'sun' : 'moon'" size="5" decorative />
  </button>
</template>

<script setup lang="ts">
import { useDarkModeStore } from '~/stores/darkMode'
const darkStore = useDarkModeStore()
const { t } = useI18n()
</script>
