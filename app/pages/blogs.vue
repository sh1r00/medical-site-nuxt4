<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-950 dark:to-gray-950 text-white py-20 md:py-28">
      <div class="section-container text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('blogs.title') }}</h1>
        <p class="text-white/80 text-lg max-w-2xl mx-auto">{{ t('blogs.subtitle') }}</p>
      </div>
    </section>

    <!-- Category filters -->
    <section class="py-8 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div class="section-container">
        <div class="flex flex-wrap gap-2 justify-center" role="group" aria-label="Filter articles by category">
          <button
            v-for="cat in categories"
            :key="cat.value"
            type="button"
            :aria-pressed="activeCategory === cat.value ? 'true' : 'false'"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              activeCategory === cat.value
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            ]"
            @click="activeCategory = cat.value"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Blog listing -->
    <section class="section-padding bg-gray-50 dark:bg-gray-900">
      <div class="section-container">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="post in filteredPosts"
            :key="post.slug"
            class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
          >
            <div class="h-48 bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-800 dark:to-accent-800 flex items-center justify-center">
              <AIcon :name="post.icon" size="12" decorative />
            </div>
            <div class="p-6">
              <span class="inline-block px-3 py-1 bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full mb-3">
                {{ post.category }}
              </span>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                <NuxtLink :to="localePath('/blog/' + post.slug)" class="hover:underline">
                  {{ post.title }}
                </NuxtLink>
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{{ post.excerpt }}</p>
              <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                <span>{{ t('blogs.by') }} {{ post.author }}</span>
                <span>{{ post.date }}</span>
              </div>
            </div>
          </article>
        </div>

        <div v-if="filteredPosts.length === 0" class="text-center py-16">
          <p class="text-gray-500 dark:text-gray-400">{{ t('notFound.message') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const activeCategory = ref('all')

const categories = computed(() => [
  { value: 'all', label: 'All Posts' },
  { value: 'nutrition', label: t('blogs.categories.nutrition') },
  { value: 'cardiology', label: t('blogs.categories.cardiology') },
  { value: 'mentalHealth', label: t('blogs.categories.mentalHealth') },
  { value: 'prevention', label: t('blogs.categories.prevention') },
  { value: 'pediatrics', label: t('blogs.categories.pediatrics') },
])

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  icon: string
}

const posts: BlogPost[] = [
  { slug: 'heart-healthy-diet-tips', title: '10 Heart-Healthy Diet Tips for a Longer Life', excerpt: 'Discover the foods that support cardiovascular health and simple dietary changes that can make a significant difference.', category: 'Heart Health', author: 'Dr. Sarah Mitchell', date: '2026-06-15', icon: 'heart' },
  { slug: 'understanding-migraine-triggers', title: 'Understanding Migraine Triggers and Prevention', excerpt: 'Learn about common migraine triggers and evidence-based strategies to reduce the frequency and severity of attacks.', category: 'Mental Health', author: 'Dr. James Rodriguez', date: '2026-06-10', icon: 'brain' },
  { slug: 'childhood-vaccination-guide', title: 'A Parent\'s Guide to Childhood Vaccinations', excerpt: 'Everything parents need to know about the recommended vaccination schedule and addressing common concerns.', category: 'Child Health', author: 'Dr. Emily Chen', date: '2026-06-05', icon: 'baby' },
  { slug: 'benefits-of-mediterranean-diet', title: 'The Science Behind the Mediterranean Diet', excerpt: 'Why the Mediterranean diet consistently ranks as one of the healthiest eating patterns backed by decades of research.', category: 'Nutrition', author: 'Dr. Lisa Wong', date: '2026-05-28', icon: 'heart' },
  { slug: 'managing-chronic-pain', title: 'Modern Approaches to Chronic Pain Management', excerpt: 'From physical therapy to innovative treatments, explore comprehensive strategies for managing chronic pain effectively.', category: 'Prevention', author: 'Dr. Michael Brooks', date: '2026-05-20', icon: 'bone' },
  { slug: 'importance-of-regular-checkups', title: 'Why Regular Health Checkups Matter', excerpt: 'Preventive care saves lives. Learn how routine screenings and early detection can improve health outcomes.', category: 'Prevention', author: 'Dr. Sarah Mitchell', date: '2026-05-15', icon: 'shield' },
  { slug: 'mental-health-self-care', title: 'Daily Self-Care Practices for Mental Wellness', excerpt: 'Simple, effective self-care routines that can improve your mental health and overall quality of life.', category: 'Mental Health', author: 'Dr. James Rodriguez', date: '2026-05-08', icon: 'brain' },
  { slug: 'sports-safety-for-kids', title: 'Keeping Young Athletes Safe: A Guide for Parents', excerpt: 'Tips for preventing sports injuries in children and recognizing when to seek medical attention.', category: 'Child Health', author: 'Dr. Emily Chen', date: '2026-05-01', icon: 'baby' },
  { slug: 'nutrition-for-seniors', title: 'Optimal Nutrition for Healthy Aging', excerpt: 'Nutritional needs change as we age. Learn how to maintain a balanced diet for vitality in your golden years.', category: 'Nutrition', author: 'Dr. Lisa Wong', date: '2026-04-25', icon: 'heart' },
]

const filteredPosts = computed(() => {
  if (activeCategory.value === 'all') return posts
  return posts.filter(p => {
    const cat = p.category.toLowerCase().replace(/\s+/g, '')
    const active = activeCategory.value.toLowerCase()
    return cat.includes(active) || active.includes(cat)
  })
})
</script>
