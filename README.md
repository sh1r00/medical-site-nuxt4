# Medical Site
*shiro — where style meets function*

**Category: Business Template**  
**Live:** [https://medical-site-sh1r00-972.netlify.app](https://medical-site-sh1r00-972.netlify.app)  
**GitHub:** [medical-site-nuxt4](https://github.com/sh1r00/medical-site-nuxt4)  

## About This Project

Healthcare practice website. Services, doctor profiles, appointment booking, patient resources, contact.

**Tech:** 
Nuxt 4, Vue 3, i18n (3 locales), PWA, Tailwind CSS, Dark Mode, M3 Design

[![shiro](https://img.shields.io/badge/shiro-where_style_meets_function-6C5CE7)](https://shiro-portfolio-sh1r00.netlify.app)

## Deployment

```bash
npx nuxi generate
```
```bash
Deploy .output/public to Netlify via API zip upload.
```

## Quick Start (Local Development)

1. Install dependencies:
npm install

2. Start development server:
npm run dev

3. Build for production:
npm run generate

4. Preview production build:
npx serve .output/public

## Notes

- Built with Nuxt 4 (compatibilityVersion 4) and Vue 3 Composition API
- All projects use atomic design: atoms/ → molecules/ → organisms/
- Dark mode is SSR-safe via Pinia store with useCookie() persistence
- PWA configured with service worker for offline access
- CSP headers configured via nuxt-security module (production only)
- i18n supports 3 locales: English, Español, አማርኛ

---

*Made with ❤️ by shiro — rasisg@gmail.com — github.com/sh1r00*
