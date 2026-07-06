<template>
  <div>
    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 dark:from-primary-950 dark:via-primary-900 dark:to-accent-950 text-white overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>

      <div class="section-container relative py-20 md:py-32 lg:py-40">
        <div class="max-w-3xl animate-fade-in">
          <h1 id="hero-heading" class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            {{ t('hero.title') }}
          </h1>
          <p class="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            {{ t('hero.subtitle') }}
          </p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink :to="localePath('/contact')">
              <ABaseButton size="lg" variant="secondary">
                <AIcon name="phone" size="5" decorative />
                {{ t('hero.cta') }}
              </ABaseButton>
            </NuxtLink>
            <NuxtLink :to="localePath('/page/cardiology')">
              <ABaseButton size="lg" variant="outline" class="!border-white !text-white hover:!bg-white/10">
                {{ t('hero.ctaSecondary') }}
                <AIcon name="arrow-right" size="5" decorative />
              </ABaseButton>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Wave divider -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
          <path d="M0 40C240 80 480 0 720 20C960 40 1200 80 1440 40V80H0V40Z" class="fill-white dark:fill-gray-950" />
        </svg>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="section-padding bg-white dark:bg-gray-950" aria-label="Key statistics">
      <div class="section-container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div v-for="stat in stats" :key="stat.label" class="animate-slide-up">
            <div class="text-3xl md:text-4xl font-extrabold text-primary-600 dark:text-primary-400 mb-2">
              {{ stat.value }}+
            </div>
            <div class="text-sm md:text-base text-gray-600 dark:text-gray-400">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="section-padding bg-gray-50 dark:bg-gray-900" aria-labelledby="services-heading">
      <div class="section-container">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 id="services-heading" class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ t('services.title') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            {{ t('services.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="svc in servicesList"
            :key="svc.key"
            :to="localePath(svc.href)"
            class="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1"
          >
            <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
              <AIcon :name="svc.icon" size="6" decorative />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {{ t(svc.labelKey) }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ t(svc.descKey) }}
            </p>
            <span class="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:gap-2 transition-all">
              {{ t('blogs.readMore') }}
              <AIcon name="chevron-right" size="4" decorative />
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Doctors Section -->
    <section class="section-padding bg-white dark:bg-gray-950" aria-labelledby="doctors-heading">
      <div class="section-container">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 id="doctors-heading" class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ t('doctors.title') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            {{ t('doctors.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="doc in doctors"
            :key="doc.name"
            class="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
          >
            <div class="h-48 bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-800 dark:to-accent-800 flex items-end justify-center relative overflow-hidden">
              <div class="absolute inset-0 flex items-center justify-center">
                <AIcon :name="doc.icon" size="16" decorative />
              </div>
            </div>
            <div class="p-5 text-center">
              <h3 class="font-semibold text-gray-900 dark:text-white">{{ doc.name }}</h3>
              <p class="text-sm text-primary-600 dark:text-primary-400 mb-2">{{ doc.specialty }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ doc.credentials }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="section-padding bg-primary-600 dark:bg-primary-950" aria-labelledby="testimonials-heading">
      <div class="section-container">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 id="testimonials-heading" class="text-3xl md:text-4xl font-bold text-white mb-4">
            {{ t('testimonials.title') }}
          </h2>
          <p class="text-white/80">
            {{ t('testimonials.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(testimonial, i) in testimonials"
            :key="i"
            class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <AIcon name="quote" size="8" decorative />
            <p class="text-white/90 mt-3 mb-4 leading-relaxed">{{ testimonial.quote }}</p>
            <div class="flex items-center gap-1 mb-3">
              <AIcon v-for="n in 5" :key="n" name="star" size="4" decorative />
            </div>
            <p class="text-white font-semibold text-sm">{{ testimonial.name }}</p>
            <p class="text-white/60 text-xs">{{ testimonial.role }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding bg-white dark:bg-gray-950" aria-labelledby="cta-heading">
      <div class="section-container">
        <div class="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-900 dark:to-accent-900 rounded-3xl p-10 md:p-16 text-center text-white">
          <h2 id="cta-heading" class="text-3xl md:text-4xl font-bold mb-4">
            {{ t('cta.title') }}
          </h2>
          <p class="text-white/90 mb-8 max-w-xl mx-auto">
            {{ t('cta.subtitle') }}
          </p>
          <NuxtLink :to="localePath('/contact')">
            <ABaseButton size="lg" variant="secondary">
              <AIcon name="phone" size="5" decorative />
              {{ t('cta.button') }}
            </ABaseButton>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const stats = computed(() => [
  { value: '50,000', label: t('stats.patients') },
  { value: '120', label: t('stats.doctors') },
  { value: '25', label: t('stats.experience') },
  { value: '15', label: t('stats.awards') },
])

const servicesList = [
  { key: 'cardiology', icon: 'heart', href: '/page/cardiology', labelKey: 'services.cardiology', descKey: 'services.cardiologyDesc' },
  { key: 'neurology', icon: 'brain', href: '/page/neurology', labelKey: 'services.neurology', descKey: 'services.neurologyDesc' },
  { key: 'orthopedics', icon: 'bone', href: '/page/orthopedics', labelKey: 'services.orthopedics', descKey: 'services.orthopedicsDesc' },
  { key: 'pediatrics', icon: 'baby', href: '/page/pediatrics', labelKey: 'services.pediatrics', descKey: 'services.pediatricsDesc' },
  { key: 'ophthalmology', icon: 'eye', href: '/page/ophthalmology', labelKey: 'services.ophthalmology', descKey: 'services.ophthalmologyDesc' },
  { key: 'dental', icon: 'tooth', href: '/page/dental', labelKey: 'services.dental', descKey: 'services.dentalDesc' },
]

const doctors = [
  { name: 'Dr. Sarah Mitchell', specialty: 'Cardiology', credentials: 'MD, FACC', icon: 'heart' },
  { name: 'Dr. James Rodriguez', specialty: 'Neurology', credentials: 'MD, PhD', icon: 'brain' },
  { name: 'Dr. Emily Chen', specialty: 'Pediatrics', credentials: 'MD, FAAP', icon: 'baby' },
  { name: 'Dr. Michael Brooks', specialty: 'Orthopedics', credentials: 'MD, FAAOS', icon: 'bone' },
]

const testimonials = [
  {
    quote: `"The team at MediCare Plus saved my father's life. Their cardiac team was incredible — professional, caring, and always available to answer our questions."`,
    name: 'Robert Johnson',
    role: 'Patient Family Member',
  },
  {
    quote: `"I've been bringing my children here for years. The pediatric department treats us like family. I wouldn't trust anyone else with my kids' health."`,
    name: 'Maria Gonzalez',
    role: 'Mother of Three',
  },
  {
    quote: `"After my knee surgery, the rehabilitation program was outstanding. The physical therapists were knowledgeable and encouraging. I'm back to running marathons!"`,
    name: 'David Park',
    role: 'Orthopedic Patient',
  },
] as const
</script>
