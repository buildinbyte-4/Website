# Supabase Migration Report

## Files modified
- [app/page.js](app/page.js)
- [components/Hero.js](components/Hero.js)
- [components/MetricsBanner.js](components/MetricsBanner.js)
- [components/ProjectStore.js](components/ProjectStore.js)
- [components/CustomServices.js](components/CustomServices.js)
- [components/Footer.js](components/Footer.js)
- [components/Navbar.js](components/Navbar.js)
- [components/InquiryModal.js](components/InquiryModal.js)
- [lib/supabase.js](lib/supabase.js)
- [hooks/useHero.js](hooks/useHero.js)
- [hooks/useProducts.js](hooks/useProducts.js)
- [hooks/useStats.js](hooks/useStats.js)
- [hooks/useFAQ.js](hooks/useFAQ.js)
- [hooks/useSettings.js](hooks/useSettings.js)

## Hardcoded sections replaced
- Hero section content
- Company metrics banner
- Product/template gallery content
- FAQ content
- Footer branding and social links
- Navbar branding
- Inquiry submission fallback behavior

## Supabase tables used
- hero_section
- company_stats
- products
- faq
- site_settings
- inquiries

## Assumptions
- The database uses URL strings for image assets in the documented tables.
- Product cards use the `products` table as the primary content source and fallback to the existing UI for actions.
- When Supabase credentials are unavailable, the app degrades gracefully and renders the existing UI shell without crashing.

## TODOs
- Add admin CRUD pages for hero, stats, FAQ, and settings so non-developers can manage the content.
- Add richer image handling and fallback placeholders for missing media URLs.
- Add a dedicated testimonials/technologies/team management experience if those tables are populated in the live database.

## Schema mismatches discovered
- The current project does not yet include components or pages wired to testimonials, technologies, or team data despite those tables being listed in the schema.
- The existing public pages use `status` and `is_active` differently than the initial homepage logic expected, so the product hook uses `is_active` for visibility.

## Recommended improvements
- Introduce dedicated admin screens for the remaining tables: testimonials, technologies, and team.
- Add server-side data fetching for better SEO and lower client-side load where appropriate.
- Add caching and revalidation for content-heavy pages once Supabase credentials and environment configuration are available in production.
