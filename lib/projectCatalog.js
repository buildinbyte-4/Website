export const OFFERING_TYPES = {
  CUSTOM_SYSTEM: 'custom_system',
  WEBSITE_TEMPLATE: 'website_template',
};

const TEMPLATE_SLUGS = new Set([
  'buildinbyte-luxury-hotel',
  'luxury-hotel',
  'real-estate',
  'elecstore',
  'kanchimarket',
  'scsvmv',
  'hostel-management',
]);

export function getTemplateSlug(demoUrl = '') {
  const match = String(demoUrl).match(/\/templates\/([^/]+)(?:\/|$)/i);
  const slug = match?.[1]?.toLowerCase();
  return slug && TEMPLATE_SLUGS.has(slug) ? slug : null;
}

export function getLocalProjectPreview(demoUrl) {
  const slug = getTemplateSlug(demoUrl);
  return slug ? `/project-previews/${slug}.webp` : null;
}

export function getOfferingType(product, demoUrl) {
  const explicitType = product.offering_type || product.offeringType;
  if (Object.values(OFFERING_TYPES).includes(explicitType)) return explicitType;

  if (getTemplateSlug(demoUrl) || /template/i.test(product.name || product.title || '')) {
    return OFFERING_TYPES.WEBSITE_TEMPLATE;
  }

  return OFFERING_TYPES.CUSTOM_SYSTEM;
}
