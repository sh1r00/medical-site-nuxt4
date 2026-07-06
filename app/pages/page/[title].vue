<template>
  <div>
    <section class="bg-white dark:bg-gray-950">
      <div class="section-container section-padding">
        <div class="max-w-3xl mx-auto">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">{{ pageTitle }}</h1>

          <div v-if="pageContent" class="prose prose-lg dark:prose-invert max-w-none">
            <p v-for="(para, i) in pageContent.split('\n').filter(Boolean)" :key="i" class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{{ para }}</p>
          </div>

          <!-- Service detail pages -->
          <div v-else-if="serviceDetail" class="space-y-8">
            <div class="h-64 md:h-80 bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-800 dark:to-accent-800 rounded-2xl flex items-center justify-center">
              <AIcon :name="serviceDetail.icon" size="16" decorative />
            </div>

            <div class="prose prose-lg dark:prose-invert max-w-none">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">About {{ serviceDetail.title }}</h2>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{{ serviceDetail.description }}</p>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{{ serviceDetail.longDescription }}</p>

              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Approach</h2>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{{ serviceDetail.approach }}</p>

              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Conditions We Treat</h2>
              <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li v-for="cond in serviceDetail.conditions" :key="cond">{{ cond }}</li>
              </ul>
            </div>
          </div>

          <!-- Default / privacy / terms -->
          <div v-else class="prose prose-lg dark:prose-invert max-w-none">
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              Information about {{ pageTitle.toLowerCase() }} is being compiled. Please check back shortly or contact us for more information.
            </p>
          </div>

          <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <NuxtLink
              :to="localePath('/contact')"
              class="text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-1"
            >
              <AIcon name="arrow-right" size="4" decorative />
              {{ t('contact.title') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const titleSlug = computed(() => {
  const slug = Array.isArray(route.params.title) ? route.params.title[0] : route.params.title
  return slug as string
})

const serviceDetails: Record<string, {
  title: string
  icon: string
  description: string
  longDescription: string
  approach: string
  conditions: string[]
}> = {
  cardiology: {
    title: 'Cardiology',
    icon: 'heart',
    description: 'Advanced heart care including diagnostics, interventional cardiology, and cardiac rehabilitation.',
    longDescription: 'Our cardiology department is equipped with state-of-the-art diagnostic and treatment technology. From preventive cardiology to complex interventional procedures, our team provides comprehensive cardiac care tailored to each patient.',
    approach: 'We take a holistic approach to heart health, combining the latest medical advances with lifestyle and preventive strategies. Our multidisciplinary team includes cardiologists, cardiac surgeons, nutritionists, and rehabilitation specialists.',
    conditions: ['Coronary artery disease', 'Heart failure', 'Arrhythmias', 'Valvular heart disease', 'Hypertension', 'Congenital heart defects'],
  },
  neurology: {
    title: 'Neurology',
    icon: 'brain',
    description: 'Expert diagnosis and treatment of neurological disorders including stroke, epilepsy, and migraines.',
    longDescription: 'Our neurology department offers comprehensive care for disorders of the brain, spinal cord, and nervous system. We use advanced diagnostic tools including MRI, CT, and EEG to accurately diagnose and treat a wide range of neurological conditions.',
    approach: 'We believe in patient-centered neurological care that addresses both symptoms and underlying causes. Our team stays current with the latest research and treatment protocols to provide the best possible outcomes.',
    conditions: ['Stroke and TIA', 'Epilepsy and seizure disorders', 'Migraines and headaches', 'Multiple sclerosis', 'Parkinson\'s disease', 'Neuropathy'],
  },
  orthopedics: {
    title: 'Orthopedics',
    icon: 'bone',
    description: 'Comprehensive bone and joint care from sports injuries to joint replacement surgery.',
    longDescription: 'Our orthopedic department provides complete musculoskeletal care, from diagnosis through rehabilitation. We specialize in both surgical and non-surgical treatments for conditions affecting bones, joints, ligaments, and tendons.',
    approach: 'We emphasize conservative treatment whenever possible, using physical therapy, medication, and lifestyle modifications before considering surgery. When surgery is necessary, we use minimally invasive techniques to reduce recovery time.',
    conditions: ['Arthritis and joint pain', 'Sports injuries', 'Fractures and trauma', 'Spine disorders', 'Carpal tunnel syndrome', 'Tendonitis'],
  },
  pediatrics: {
    title: 'Pediatrics',
    icon: 'baby',
    description: 'Compassionate care for infants, children, and adolescents including vaccinations and wellness checks.',
    longDescription: 'Our pediatrics department provides comprehensive healthcare for children from birth through adolescence. We focus on preventive care, early intervention, and supporting healthy development at every stage.',
    approach: 'We create a child-friendly environment that puts young patients and their families at ease. Our approach emphasizes preventive care, parent education, and building long-term relationships with families.',
    conditions: ['Well-child visits', 'Vaccinations', 'Acute illnesses', 'Asthma management', 'Developmental concerns', 'Adolescent health'],
  },
  ophthalmology: {
    title: 'Ophthalmology',
    icon: 'eye',
    description: 'Complete eye care from routine exams to advanced surgical procedures.',
    longDescription: 'Our ophthalmology department offers comprehensive eye care services using the latest diagnostic and treatment technology. From routine eye exams to complex surgical procedures, we provide personalized care for patients of all ages.',
    approach: 'We combine advanced technology with compassionate care to protect and restore vision. Regular eye exams are essential for detecting conditions early when they are most treatable.',
    conditions: ['Cataracts', 'Glaucoma', 'Macular degeneration', 'Diabetic retinopathy', 'Refractive errors', 'Dry eye syndrome'],
  },
  dental: {
    title: 'Dental Care',
    icon: 'tooth',
    description: 'Full dental services including preventive care, cosmetic dentistry, and oral surgery.',
    longDescription: 'Our dental department provides comprehensive oral health services in a comfortable, modern setting. We offer everything from routine cleanings to advanced restorative and cosmetic procedures.',
    approach: 'We believe in preventive dentistry and patient education as the foundation of good oral health. Our gentle approach and modern techniques help patients feel comfortable during treatment.',
    conditions: ['Tooth decay and cavities', 'Gum disease', 'Tooth sensitivity', 'Misaligned teeth', 'Oral infections', 'Tooth loss'],
  },
}

const staticPages: Record<string, { title: string; content: string }> = {
  'privacy-policy': {
    title: 'Privacy Policy',
    content: 'MediCare Plus is committed to protecting the privacy and security of your personal and health information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.\n\nWe collect information that you voluntarily provide to us when you fill out forms, schedule appointments, or communicate with us. This may include your name, contact information, health information, and insurance details.\n\nWe use your information to provide healthcare services, process payments, communicate with you about appointments and services, improve our website and services, and comply with legal obligations.\n\nWe implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We comply with HIPAA regulations and applicable data protection laws.\n\nIf you have questions about our privacy practices, please contact our Privacy Officer at privacy@medicareplus.com.',
  },
  'terms-of-service': {
    title: 'Terms of Service',
    content: 'By accessing and using the MediCare Plus website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not use our website or services.\n\nOur website is provided for informational purposes only. The content on this website does not constitute medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions you may have regarding a medical condition.\n\nMediCare Plus grants you a limited, non-exclusive, non-transferable license to access and use our website for personal, non-commercial purposes. You may not modify, reproduce, distribute, or create derivative works based on our content without our prior written consent.\n\nWhile we strive to provide accurate and up-to-date information, we make no warranties or representations about the completeness, accuracy, or reliability of the content on our website.\n\nThese terms are governed by the laws of the State of New York. Any disputes arising from these terms shall be resolved in the courts of New York.',
  },
}

const pageTitle = computed(() => {
  if (staticPages[titleSlug.value]) return staticPages[titleSlug.value].title
  if (serviceDetails[titleSlug.value]) return serviceDetails[titleSlug.value].title
  return titleSlug.value.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
})

const pageContent = computed(() => {
  if (staticPages[titleSlug.value]) return staticPages[titleSlug.value].content
  return null
})

const serviceDetail = computed(() => {
  return serviceDetails[titleSlug.value] || null
})
</script>
