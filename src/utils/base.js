export const BASE_URL = import.meta.env.BASE_URL || '/';

// Prefixes internal URLs with Vite's base URL (important for GitHub Pages subpaths like /qp-site/).
// - Leaves absolute http(s) URLs intact.
// - Handles inputs like "/pics/x.png", "pics/x.png", "/#contact", "#contact", "/" etc.
export function withBase(path = '') {
  if (!path) return BASE_URL;

  // already absolute (external) or data URI
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:') || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path;
  }

  // already base-prefixed (avoid /qp-site/qp-site/...)
  if (BASE_URL !== '/' && path.startsWith(BASE_URL)) return path;

  // hash-only links should go to the site root (useful from subpages)
  if (path.startsWith('#')) return `${BASE_URL}${path}`;

  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE_URL}${clean}`;
}

export function withBaseHtml(html) {
  if (!html) return html;
  // rewrite only root-absolute internal hrefs like href="/service.html" or href="/#contact"
  return html.replaceAll('href="/', `href="${BASE_URL}`);
}


