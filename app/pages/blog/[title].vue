<template>
  <div>
    <section class="bg-white dark:bg-gray-950">
      <div class="section-container section-padding">
        <div class="max-w-3xl mx-auto">
          <!-- Back link -->
          <NuxtLink
            :to="localePath('/blogs')"
            class="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:underline mb-8"
          >
            <AIcon name="chevron-right" size="4" decorative />
            <span>{{ t('blogs.title') }}</span>
          </NuxtLink>

          <!-- Category badge -->
          <span class="inline-block px-3 py-1 bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full mb-4">
            {{ post.category }}
          </span>

          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{{ post.title }}</h1>

          <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <span>{{ t('blogs.by') }} {{ post.author }}</span>
            <span>{{ post.date }}</span>
          </div>

          <!-- Article image placeholder -->
          <div class="h-64 md:h-96 bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-800 dark:to-accent-800 rounded-2xl flex items-center justify-center mb-8">
            <AIcon :name="post.icon" size="16" decorative />
          </div>

          <!-- Content -->
          <div class="prose prose-lg dark:prose-invert max-w-none">
            <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">{{ post.excerpt }}</p>

            <div v-for="(para, i) in post.content" :key="i">
              <h2 v-if="para.startsWith('##')" class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">{{ para.replace('## ', '') }}</h2>
              <p v-else class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{{ para }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related articles -->
    <section class="section-padding bg-gray-50 dark:bg-gray-900">
      <div class="section-container">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NuxtLink
            v-for="related in relatedPosts"
            :key="related.slug"
            :to="localePath('/blog/' + related.slug)"
            class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
          >
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">{{ related.title }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ related.date }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const posts: Record<string, {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  icon: string
  content: string[]
}> = {
  'heart-healthy-diet-tips': {
    slug: 'heart-healthy-diet-tips',
    title: '10 Heart-Healthy Diet Tips for a Longer Life',
    excerpt: 'Discover the foods that support cardiovascular health and simple dietary changes that can make a significant difference.',
    category: 'Heart Health',
    author: 'Dr. Sarah Mitchell',
    date: '2026-06-15',
    icon: 'heart',
    content: [
      '## Why Heart Health Matters',
      'Cardiovascular disease remains the leading cause of death worldwide, but the good news is that many risk factors are modifiable through diet and lifestyle changes. Research consistently shows that what we eat directly impacts our heart health.',
      '## Key Dietary Principles',
      'A heart-healthy diet emphasizes whole foods, limits processed ingredients, and balances macronutrients. The Mediterranean and DASH (Dietary Approaches to Stop Hypertension) diets are two of the most well-researched eating patterns for cardiovascular health.',
      '## Top 10 Tips',
      '1. Prioritize fruits and vegetables: Aim for at least five servings daily. 2. Choose whole grains: Brown rice, quinoa, and whole wheat provide fiber that helps lower cholesterol. 3. Include healthy fats: Olive oil, avocados, and nuts contain monounsaturated fats that support heart health. 4. Eat fatty fish twice weekly: Salmon, mackerel, and sardines are rich in omega-3 fatty acids.',
      '## Foods to Limit',
      'Reduce sodium intake to less than 2,300mg per day. Limit added sugars, especially from sugary beverages. Minimize consumption of processed meats and fried foods. Choose lean protein sources and plant-based alternatives when possible.',
      '## The Bottom Line',
      'Small, sustainable changes to your diet can have a profound impact on your heart health. Start with one or two changes and build from there. Always consult with your healthcare provider before making significant dietary changes, especially if you have existing health conditions.',
    ],
  },
  'understanding-migraine-triggers': {
    slug: 'understanding-migraine-triggers',
    title: 'Understanding Migraine Triggers and Prevention',
    excerpt: 'Learn about common migraine triggers and evidence-based strategies to reduce the frequency and severity of attacks.',
    category: 'Mental Health',
    author: 'Dr. James Rodriguez',
    date: '2026-06-10',
    icon: 'brain',
    content: [
      '## What Are Migraines?',
      'Migraines are more than just headaches. They are a complex neurological condition characterized by intense, throbbing pain, often accompanied by nausea, sensitivity to light and sound, and visual disturbances. Understanding your triggers is the first step toward effective management.',
      '## Common Triggers',
      'Stress is the most commonly reported trigger. Hormonal changes, particularly in women, can precipitate attacks. Certain foods like aged cheeses, processed meats, and alcohol are known triggers. Environmental factors like bright lights, loud noises, and strong smells can also provoke migraines.',
      '## Prevention Strategies',
      'Keep a headache diary to identify your personal triggers. Maintain a consistent sleep schedule. Stay hydrated throughout the day. Regular moderate exercise can reduce frequency. Consider stress-management techniques like meditation or yoga.',
      '## When to Seek Help',
      'If migraines interfere with your daily life, consult a neurologist. There are many effective preventive medications available today, including newer CGRP inhibitors that have shown remarkable results for many patients.',
    ],
  },
  'childhood-vaccination-guide': {
    slug: 'childhood-vaccination-guide',
    title: "A Parent's Guide to Childhood Vaccinations",
    excerpt: 'Everything parents need to know about the recommended vaccination schedule and addressing common concerns.',
    category: 'Child Health',
    author: 'Dr. Emily Chen',
    date: '2026-06-05',
    icon: 'baby',
    content: [
      '## Why Vaccinate?',
      'Vaccines are one of the greatest public health achievements in history. They protect children from serious, potentially life-threatening diseases and contribute to community immunity, protecting those who cannot be vaccinated.',
      '## The Recommended Schedule',
      'The CDC recommends vaccinations starting at birth with the hepatitis B vaccine. At 2, 4, and 6 months, babies receive a series of vaccines including DTaP, IPV, Hib, PCV13, and rotavirus. The MMR and varicella vaccines are given at 12-15 months.',
      '## Addressing Common Concerns',
      'Vaccines are rigorously tested for safety and effectiveness before approval. Side effects are typically mild and temporary, such as soreness at the injection site or a low-grade fever. Serious adverse reactions are extremely rare. The benefits of vaccination far outweigh the risks.',
      '## Preparing Your Child',
      'Bring a comfort item like a favorite toy or blanket. Stay calm and reassuring during the appointment. After vaccination, you can use a cool, damp cloth on the injection site and offer extra comfort and fluids.',
    ],
  },
  'benefits-of-mediterranean-diet': {
    slug: 'benefits-of-mediterranean-diet',
    title: 'The Science Behind the Mediterranean Diet',
    excerpt: 'Why the Mediterranean diet consistently ranks as one of the healthiest eating patterns backed by decades of research.',
    category: 'Nutrition',
    author: 'Dr. Lisa Wong',
    date: '2026-05-28',
    icon: 'heart',
    content: [
      '## Origins of the Mediterranean Diet',
      'The Mediterranean diet is based on the traditional eating patterns of countries bordering the Mediterranean Sea, particularly Greece and southern Italy in the 1960s. Researchers noticed that these populations had remarkably low rates of chronic disease and long life expectancy.',
      '## Health Benefits Backed by Science',
      'Numerous large-scale studies have demonstrated benefits including reduced risk of cardiovascular disease, lower rates of type 2 diabetes, improved cognitive function in aging, and better weight management without calorie counting.',
      '## Getting Started',
      'Start by increasing your intake of fruits and vegetables. Replace butter with olive oil. Eat fish at least twice a week. Enjoy nuts and seeds as snacks. Make meals a social occasion shared with family and friends.',
    ],
  },
}

const titleSlug = computed(() => {
  const slug = Array.isArray(route.params.title) ? route.params.title[0] : route.params.title
  return slug as string
})

const post = computed(() => {
  return posts[titleSlug.value] || {
    slug: titleSlug.value,
    title: titleSlug.value.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
    excerpt: 'This article is being prepared. Check back soon for detailed health insights from our medical experts.',
    category: 'General',
    author: 'MediCare Plus Editorial Team',
    date: new Date().toISOString().split('T')[0],
    icon: 'heart',
    content: [
      'This article is currently being prepared by our medical team. We are working hard to bring you accurate, up-to-date health information.',
      'Please check back soon or browse our other articles for the latest health insights.',
    ],
  }
})

const relatedPosts = computed(() => {
  return Object.values(posts)
    .filter(p => p.slug !== titleSlug.value)
    .slice(0, 3)
    .map(p => ({ slug: p.slug, title: p.title, date: p.date }))
})
</script>
