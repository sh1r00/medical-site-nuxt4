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
```bash
Deploy .output/public to Netlify via API zip upload.
```

## Quick Start (Local Development)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run generate
   ```

4. Preview production build:
   ```bash
   npx serve .output/public
   ```

## Notes

- Built with Nuxt 4 (compatibilityVersion 4) and Vue 3 Composition API
- All projects use atomic design: atoms/ → molecules/ → organisms/
- Dark mode is SSR-safe via Pinia store with useCookie() persistence
- PWA configured with service worker for offline access
- CSP headers configured via nuxt-security module (production only)
- i18n supports 3 locales: English, Español, አማርኛ

## Pitfalls & Fixes

See [DOCUMENTATION.md](./DOCUMENTATION.md) for the full build/deployment guide and detailed pitfalls & fixes. Key items:

- nuxt-security@2.6.0 requires Node ≥ 24 (`NODE_VERSION = "24"` in `netlify.toml`)
- esbuild/vite peer conflict → `npm install --legacy-peer-deps`
- i18n v10: `detectBrowserLanguage: false` + `const localePath = useLocalePath()`
- `$t()` banned in templates → `const { t } = useI18n()`
- Component auto-import `pathPrefix: false` (else `OrganismsOHeroSection` → blank screen)
- PWA precache/fallback can blank-screen non-precached routes
- i18n `prefix` strategy → `/` must 302 to `/en/` (not `/* → /index.html`)

---

*Made with ❤️ by shiro — rasisg@gmail.com — github.com/sh1r00*
