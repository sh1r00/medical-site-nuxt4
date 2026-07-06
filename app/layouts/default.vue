<template>
  <div class="flex min-h-screen flex-col">
    <a href="#main-content" class="skip-to-content">
      {{ t('skipToContent') }}
    </a>

    <OHeader />

    <main id="main-content" class="flex-1">
      <slot />
    </main>

    <OFooter />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
