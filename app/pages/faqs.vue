<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-950 dark:to-gray-950 text-white py-20 md:py-28">
      <div class="section-container text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('faqs.title') }}</h1>
        <p class="text-white/80 text-lg max-w-2xl mx-auto">{{ t('faqs.subtitle') }}</p>
      </div>
    </section>

    <!-- Search -->
    <section class="py-6 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div class="section-container">
        <div class="max-w-xl mx-auto relative">
          <label for="faq-search" class="sr-only">Search FAQs</label>
          <input
            id="faq-search"
            v-model="searchQuery"
            type="text"
            placeholder="Search frequently asked questions..."
            class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          />
          <AIcon name="search" size="5" decorative />
        </div>
      </div>
    </section>

    <!-- FAQ accordion -->
    <section class="section-padding bg-gray-50 dark:bg-gray-900">
      <div class="section-container">
        <!-- Category tabs -->
        <div class="flex flex-wrap gap-2 mb-10 justify-center" role="tablist" aria-label="FAQ categories">
          <button
            v-for="cat in categoryList"
            :key="cat.value"
            type="button"
            role="tab"
            :aria-selected="activeCategory === cat.value ? 'true' : 'false'"
            :aria-controls="'faq-panel-' + cat.value"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              activeCategory === cat.value
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700'
            ]"
            @click="activeCategory = cat.value; expandedIndex = null"
          >
            {{ cat.label }}
          </button>
        </div>

        <div
          :id="'faq-panel-' + activeCategory"
          role="tabpanel"
          class="max-w-3xl mx-auto space-y-3"
        >
          <div
            v-for="(item, index) in filteredFaqs"
            :key="index"
            class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <button
              type="button"
              :id="'faq-trigger-' + index"
              :aria-expanded="expandedIndex === index ? 'true' : 'false'"
              :aria-controls="'faq-content-' + index"
              class="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              @click="expandedIndex = expandedIndex === index ? null : index"
            >
              <span class="font-medium text-gray-900 dark:text-white pr-4">{{ item.q }}</span>
              <span
                class="flex-shrink-0 transition-transform duration-200"
                :class="{ 'rotate-180': expandedIndex === index }"
              >
                <AIcon name="chevron-down" size="5" decorative />
              </span>
            </button>

            <div
              v-if="expandedIndex === index"
              :id="'faq-content-' + index"
              role="region"
              :aria-labelledby="'faq-trigger-' + index"
              class="px-6 pb-4 animate-slide-down"
            >
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ item.a }}</p>
            </div>
          </div>

          <div v-if="filteredFaqs.length === 0" class="text-center py-12">
            <p class="text-gray-500 dark:text-gray-400">No questions found matching your search.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Still have questions -->
    <section class="section-padding bg-white dark:bg-gray-950">
      <div class="section-container text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Still Have Questions?</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">Can't find what you're looking for? Our team is here to help.</p>
        <NuxtLink :to="localePath('/contact')">
          <ABaseButton variant="primary" size="lg">
            <AIcon name="mail" size="5" decorative />
            Contact Us
          </ABaseButton>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const searchQuery = ref('')
const activeCategory = ref('all')
const expandedIndex = ref<number | null>(null)

const categoryList = computed(() => [
  { value: 'all', label: 'All' },
  { value: 'insurance', label: t('faqs.categories.insurance') },
  { value: 'appointments', label: t('faqs.categories.appointments') },
  { value: 'visiting', label: t('faqs.categories.visiting') },
  { value: 'general', label: t('faqs.categories.general') },
])

interface FaqItem {
  q: string
  a: string
  cat: string
}

const faqs = computed<FaqItem[]>(() => (t('faqs.items') as unknown as FaqItem[]) || [])

const filteredFaqs = computed(() => {
  let items = faqs.value
  if (activeCategory.value !== 'all') {
    items = items.filter(i => i.cat === activeCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    items = items.filter(i => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q))
  }
  return items
})
</script>
