export const toSlug = (str: string): string => {
  return str.trim().toLowerCase().replace(/\s+/g, '-');
};

export const fromSlug = (slug: string): string => {
  return slug.replace(/-/g, ' ');
};
