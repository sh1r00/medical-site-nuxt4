<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-950 dark:to-gray-950 text-white py-20 md:py-28">
      <div class="section-container text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('about.title') }}</h1>
        <p class="text-white/80 text-lg max-w-2xl mx-auto">{{ t('about.missionStatement') }}</p>
      </div>
    </section>

    <!-- Story -->
    <section class="section-padding bg-white dark:bg-gray-950">
      <div class="section-container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">{{ t('about.story') }}</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{{ t('about.storyContent') }}</p>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ t('about.storyContent2') }}</p>
          </div>
          <div class="bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 rounded-3xl p-12 flex items-center justify-center min-h-[300px]">
            <AIcon name="shield" size="16" decorative />
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="section-padding bg-gray-50 dark:bg-gray-900">
      <div class="section-container">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
            <AIcon name="heart" size="10" decorative />
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-3">{{ t('about.mission') }}</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ t('about.missionStatement') }}</p>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
            <AIcon name="eye" size="10" decorative />
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-3">{{ t('about.vision') }}</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ t('about.visionStatement') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section-padding bg-white dark:bg-gray-950">
      <div class="section-container">
        <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">{{ t('about.values') }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(val, i) in values"
            :key="i"
            class="text-center p-6"
          >
            <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <AIcon :name="val.icon" size="8" decorative />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ val.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Accreditations -->
    <section class="section-padding bg-gray-50 dark:bg-gray-900">
      <div class="section-container">
        <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">{{ t('about.accreditations') }}</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="(badge, i) in badges"
            :key="i"
            class="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <AIcon name="award" size="10" decorative />
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mt-3">{{ badge }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const values = [
  { title: 'Compassion', desc: 'We treat every patient with empathy, dignity, and respect.', icon: 'heart' },
  { title: 'Excellence', desc: 'We strive for the highest standards in clinical care and patient outcomes.', icon: 'star' },
  { title: 'Innovation', desc: 'We embrace cutting-edge technology and evidence-based practices.', icon: 'brain' },
  { title: 'Integrity', desc: 'We operate with transparency, honesty, and ethical responsibility.', icon: 'shield' },
]

const badges = computed(() => (t('about.badges') as unknown as string[]) || [
  'Joint Commission Accredited',
  'ISO 9001:2015 Certified',
  'AAAHC Accredited',
  'Magnet Recognition for Nursing Excellence',
])
</script>
