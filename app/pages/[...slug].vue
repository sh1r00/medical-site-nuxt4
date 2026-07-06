<template>
  <div class="flex items-center justify-center min-h-[70vh]">
    <div class="section-container text-center py-20">
      <div class="text-8xl mb-6">🏥</div>

      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        {{ t('notFound.title') }}
      </h1>

      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        {{ t('notFound.message') }}
      </p>

      <NuxtLink :to="localePath('/')">
        <ABaseButton size="lg" variant="primary">
          <AIcon name="home" size="5" decorative />
          {{ t('notFound.cta') }}
        </ABaseButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

// Set proper HTTP status
if (import.meta.server) {
  const nuxtApp = useNuxtApp()
  nuxtApp.ssrContext!.event.node.res.statusCode = 404
}
</script>
