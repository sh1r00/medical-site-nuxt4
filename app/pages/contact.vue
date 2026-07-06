<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-950 dark:to-gray-950 text-white py-20 md:py-28">
      <div class="section-container text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('contact.title') }}</h1>
        <p class="text-white/80 text-lg max-w-2xl mx-auto">{{ t('contact.subtitle') }}</p>
      </div>
    </section>

    <!-- Emergency banner -->
    <section class="bg-red-600 dark:bg-red-800 text-white">
      <div class="section-container py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <AIcon name="emergency" size="8" decorative />
          <div>
            <p class="font-bold">{{ t('contact.emergencyTitle') }}</p>
            <p class="text-sm text-red-100">{{ t('contact.emergencyDesc') }}</p>
          </div>
        </div>
        <span class="text-xl font-bold whitespace-nowrap">{{ t('contact.emergencyNumber') }}</span>
      </div>
    </section>

    <!-- Contact form + info -->
    <section class="section-padding bg-white dark:bg-gray-950">
      <div class="section-container">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Form -->
          <div class="lg:col-span-2">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">{{ t('contact.formTitle') }}</h2>

            <form
              id="contact-form"
              class="space-y-5"
              novalidate
              @submit.prevent="handleSubmit"
            >
              <!-- Name -->
              <div>
                <label for="contact-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ t('contact.name') }} <span class="text-red-500">*</span>
                </label>
                <input
                  id="contact-name"
                  v-model="form.name"
                  type="text"
                  :placeholder="t('contact.namePlaceholder')"
                  :aria-invalid="errors.name ? 'true' : undefined"
                  :aria-describedby="errors.name ? 'contact-name-error' : undefined"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                />
                <p v-if="errors.name" id="contact-name-error" class="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">{{ errors.name }}</p>
              </div>

              <!-- Email -->
              <div>
                <label for="contact-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ t('contact.email') }} <span class="text-red-500">*</span>
                </label>
                <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  :placeholder="t('contact.emailPlaceholder')"
                  :aria-invalid="errors.email ? 'true' : undefined"
                  :aria-describedby="errors.email ? 'contact-email-error' : undefined"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                />
                <p v-if="errors.email" id="contact-email-error" class="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">{{ errors.email }}</p>
              </div>

              <!-- Phone -->
              <div>
                <label for="contact-phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ t('contact.phone') }}
                </label>
                <input
                  id="contact-phone"
                  v-model="form.phone"
                  type="tel"
                  :placeholder="t('contact.phonePlaceholder')"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                />
              </div>

              <!-- Subject -->
              <div>
                <label for="contact-subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ t('contact.subject') }} <span class="text-red-500">*</span>
                </label>
                <select
                  id="contact-subject"
                  v-model="form.subject"
                  :aria-invalid="errors.subject ? 'true' : undefined"
                  :aria-describedby="errors.subject ? 'contact-subject-error' : undefined"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                >
                  <option value="" disabled>{{ t('contact.subjectPlaceholder') }}</option>
                  <option value="appointment">Appointment Request</option>
                  <option value="billing">Billing Inquiry</option>
                  <option value="records">Medical Records</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
                <p v-if="errors.subject" id="contact-subject-error" class="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">{{ errors.subject }}</p>
              </div>

              <!-- Message -->
              <div>
                <label for="contact-message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ t('contact.message') }} <span class="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  v-model="form.message"
                  :placeholder="t('contact.messagePlaceholder')"
                  :aria-invalid="errors.message ? 'true' : undefined"
                  :aria-describedby="errors.message ? 'contact-message-error' : undefined"
                  rows="5"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-y"
                ></textarea>
                <p v-if="errors.message" id="contact-message-error" class="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">{{ errors.message }}</p>
              </div>

              <ABaseButton type="submit" variant="primary" size="lg" class="w-full sm:w-auto">
                {{ t('contact.submit') }}
              </ABaseButton>

              <!-- Success message -->
              <div
                v-if="submitted"
                class="p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg"
                role="status"
              >
                <p class="text-green-700 dark:text-green-300 text-sm">{{ t('contact.success') }}</p>
              </div>
            </form>
          </div>

          <!-- Sidebar info -->
          <div class="space-y-8">
            <!-- Location -->
            <div class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <AIcon name="map" size="5" decorative />
                {{ t('contact.location') }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('contact.address') }}</p>

              <div class="mt-4 h-48 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center">
                <AIcon name="map" size="12" decorative />
              </div>
              <p class="text-xs text-gray-400 mt-2">{{ t('contact.mapTitle') }}</p>
            </div>

            <!-- Hours -->
            <div class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <AIcon name="clock" size="5" decorative />
                {{ t('contact.hours') }}
              </h3>
              <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>{{ t('contact.weekdays') }}</li>
                <li>{{ t('contact.saturday') }}</li>
                <li class="text-red-500 dark:text-red-400">{{ t('contact.sunday') }}</li>
              </ul>
            </div>

            <!-- Quick contact -->
            <div class="bg-primary-50 dark:bg-primary-950 rounded-2xl p-6">
              <h3 class="text-lg font-semibold text-primary-700 dark:text-primary-300 mb-4">{{ t('footer.contact') }}</h3>
              <ul class="space-y-3 text-sm">
                <li class="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <AIcon name="phone" size="4" decorative />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li class="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <AIcon name="mail" size="4" decorative />
                  <span>info@medicareplus.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const errors = reactive<Record<string, string>>({})
const submitted = ref(false)

const validate = (): boolean => {
  const newErrors: Record<string, string> = {}
  if (!form.name.trim()) newErrors.name = t('contact.required')
  if (!form.email.trim()) {
    newErrors.email = t('contact.required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = t('contact.invalidEmail')
  }
  if (!form.subject) newErrors.subject = t('contact.required')
  if (!form.message.trim()) newErrors.message = t('contact.required')

  Object.keys(errors).forEach(k => delete errors[k])
  Object.assign(errors, newErrors)
  return Object.keys(newErrors).length === 0
}

const handleSubmit = () => {
  if (!validate()) return
  submitted.value = true
  form.name = ''
  form.email = ''
  form.phone = ''
  form.subject = ''
  form.message = ''
  setTimeout(() => { submitted.value = false }, 5000)
}
</script>
