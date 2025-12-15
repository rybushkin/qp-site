export function runLayoutDebug({ runId, page }) {
  try {
    if (typeof window === 'undefined') return;
    if (window.__agentLayoutDebugRan) return;
    window.__agentLayoutDebugRan = true;

    const endpoint =
      'http://127.0.0.1:7242/ingest/aa166672-1a70-47bf-8cbd-a2ab821c38e4';

    const base = (hypothesisId, location, message, data) => ({
      sessionId: 'debug-session',
      runId,
      hypothesisId,
      location,
      message,
      data,
      timestamp: Date.now()
    });

    const getLinks = () =>
      Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        .map((l) => l.getAttribute('href'))
        .filter(Boolean);

    const snap = (el) => {
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        id: el.id || null,
        className: el.className || null,
        rect: {
          top: Math.round(r.top),
          left: Math.round(r.left),
          width: Math.round(r.width),
          height: Math.round(r.height)
        },
        style: {
          display: cs.display,
          position: cs.position,
          paddingTop: cs.paddingTop,
          paddingRight: cs.paddingRight,
          paddingBottom: cs.paddingBottom,
          paddingLeft: cs.paddingLeft,
          marginTop: cs.marginTop,
          marginBottom: cs.marginBottom,
          gap: cs.gap,
          rowGap: cs.rowGap,
          columnGap: cs.columnGap,
          alignItems: cs.alignItems,
          alignContent: cs.alignContent,
          justifyItems: cs.justifyItems,
          justifyContent: cs.justifyContent,
          placeItems: cs.placeItems
        }
      };
    };

    const collect = () => {
      const main = document.querySelector('main');
      const header = document.querySelector('header');
      const container = document.querySelector('.container');
      const firstGrid = document.querySelector('.grid');
      const firstCard = document.querySelector('.card');
      const serviceGrid = document.querySelector('.grid.grid-3');
      const serviceCards = Array.from(
        document.querySelectorAll('.grid.grid-3 .card')
      ).slice(0, 6);

      return {
        page,
        path: window.location.pathname,
        viewport: { w: window.innerWidth, h: window.innerHeight },
        links: getLinks(),
        elements: {
          header: snap(header),
          main: snap(main),
          container: snap(container),
          firstGrid: snap(firstGrid),
          serviceGrid: snap(serviceGrid),
          firstCard: snap(firstCard)
        },
        serviceCardTops: serviceCards.map((el) => ({
          className: el.className || null,
          top: Math.round(el.getBoundingClientRect().top),
          height: Math.round(el.getBoundingClientRect().height)
        }))
      };
    };

    const readVars = () => {
      const cs = window.getComputedStyle(document.documentElement);
      const get = (k) => (cs.getPropertyValue(k) || '').trim();
      return {
        '--container-padding': get('--container-padding'),
        '--section-space-desktop': get('--section-space-desktop'),
        '--section-space-tablet': get('--section-space-tablet'),
        '--section-space-mobile': get('--section-space-mobile'),
        '--max-width': get('--max-width')
      };
    };

    const readSuspects = () => {
      const selectors = [
        '.step-item',
        '.steps',
        '.service-page-card',
        '.cargo-card',
        '.format-card',
        '.hub-card',
        '.hero-panel',
        '.cta-panel',
        '.topbar'
      ];

      const out = [];
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (!el) continue;
        const cs = window.getComputedStyle(el);
        const r = el.getBoundingClientRect();
        out.push({
          selector: sel,
          rect: {
            top: Math.round(r.top),
            left: Math.round(r.left),
            width: Math.round(r.width),
            height: Math.round(r.height)
          },
          style: {
            display: cs.display,
            alignItems: cs.alignItems,
            alignContent: cs.alignContent,
            justifyContent: cs.justifyContent,
            placeItems: cs.placeItems,
            placeContent: cs.placeContent,
            paddingTop: cs.paddingTop,
            gap: cs.gap
          }
        });
      }
      return out;
    };

    const tryCollect = (attempt) => {
      const main = document.querySelector('main');
      if (!main && attempt < 10) {
        requestAnimationFrame(() => tryCollect(attempt + 1));
        return;
      }

      const data = collect();
      const vars = readVars();
      const suspects = readSuspects();

      // #region agent log H1
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          base('H1', 'v1/src/agentLayoutDebug.js:78', 'Layout debug meta', {
            page: data.page,
            path: data.path,
            viewport: data.viewport,
            links: data.links
          })
        )
      }).catch(() => {});
      // #endregion

      // #region agent log H2
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          base(
            'H2',
            'v1/src/agentLayoutDebug.js:99',
            'Computed styles snapshots',
            data.elements
          )
        )
      }).catch(() => {});
      // #endregion

      // #region agent log H3
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          base(
            'H3',
            'v1/src/agentLayoutDebug.js:120',
            'First grid-3 card tops',
            { count: data.serviceCardTops.length, tops: data.serviceCardTops }
          )
        )
      }).catch(() => {});
      // #endregion

      // #region agent log H4
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          base('H4', 'v1/src/agentLayoutDebug.js:150', 'CSS vars snapshot', vars)
        )
      }).catch(() => {});
      // #endregion

      // #region agent log H5
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          base(
            'H5',
            'v1/src/agentLayoutDebug.js:162',
            'Suspect elements snapshot',
            { count: suspects.length, suspects }
          )
        )
      }).catch(() => {});
      // #endregion
    };

    requestAnimationFrame(() => tryCollect(0));
  } catch (_) {
    // ignore debug failures
  }
}


