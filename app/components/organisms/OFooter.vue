<template>
  <footer
    class="bg-gray-900 dark:bg-gray-950 text-gray-300 border-t border-gray-800"
    role="contentinfo"
  >
    <div class="section-container section-padding pb-8">
      <!-- Top section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- Brand -->
        <div class="lg:col-span-1">
          <NuxtLink
            :to="localePath('/')"
            class="flex items-center gap-2 text-primary-400 font-bold text-xl mb-4"
            aria-label="MediCare Plus home"
          >
            <AIcon name="heart" size="8" decorative />
            <span>MediCare Plus</span>
          </NuxtLink>
          <p class="text-gray-400 text-sm leading-relaxed mb-4">
            {{ t('footer.tagline') }}
          </p>
          <div class="flex items-center gap-3">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              :aria-label="social.label"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-primary-400 transition-colors"
            >
              <AIcon :name="social.name" size="5" decorative />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-semibold mb-4">{{ t('footer.quickLinks') }}</h3>
          <ul class="space-y-2" role="list">
            <li v-for="link in quickLinks" :key="link.to">
              <NuxtLink
                :to="localePath(link.to)"
                class="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h3 class="text-white font-semibold mb-4">{{ t('footer.services') }}</h3>
          <ul class="space-y-2" role="list">
            <li v-for="svc in serviceLinks" :key="svc.label">
              <NuxtLink
                :to="localePath(svc.to)"
                class="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                {{ svc.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-white font-semibold mb-4">{{ t('footer.contact') }}</h3>
          <ul class="space-y-3" role="list">
            <li class="flex items-start gap-2 text-sm text-gray-400">
              <AIcon name="phone" size="4" decorative />
              <span>{{ t('footer.emergencyNumber') }}: +1 (555) 911-0000</span>
            </li>
            <li class="flex items-start gap-2 text-sm text-gray-400">
              <AIcon name="mail" size="4" decorative />
              <span>info@medicareplus.com</span>
            </li>
            <li class="flex items-start gap-2 text-sm text-gray-400">
              <AIcon name="map" size="4" decorative />
              <span>123 Health Avenue, Medical District, NY 10001</span>
            </li>
            <li class="flex items-start gap-2 text-sm text-gray-400">
              <AIcon name="clock" size="4" decorative />
              <span>{{ t('footer.openHours') }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-gray-500 text-xs">
          &copy; {{ new Date().getFullYear() }} MediCare Plus. {{ t('footer.rights') }}
        </p>
        <div class="flex items-center gap-4">
          <NuxtLink
            :to="localePath('/page/privacy-policy')"
            class="text-gray-500 hover:text-gray-300 text-xs transition-colors"
          >
            {{ t('footer.privacy') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/page/terms-of-service')"
            class="text-gray-500 hover:text-gray-300 text-xs transition-colors"
          >
            {{ t('footer.terms') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const quickLinks = computed(() => [
  { to: '/', label: t('nav.home') },
  { to: '/about', label: t('nav.about') },
  { to: '/blogs', label: t('nav.blogs') },
  { to: '/faqs', label: t('nav.faqs') },
  { to: '/contact', label: t('nav.contact') },
])

const serviceLinks = computed(() => [
  { to: '/page/cardiology', label: t('services.cardiology') },
  { to: '/page/neurology', label: t('services.neurology') },
  { to: '/page/pediatrics', label: t('services.pediatrics') },
  { to: '/page/orthopedics', label: t('services.orthopedics') },
  { to: '/page/dental', label: t('services.dental') },
])

const socials = [
  { name: 'facebook', url: '#', label: 'Facebook' },
  { name: 'twitter', url: '#', label: 'Twitter' },
  { name: 'instagram', url: '#', label: 'Instagram' },
  { name: 'linkedin', url: '#', label: 'LinkedIn' },
]
</script>
