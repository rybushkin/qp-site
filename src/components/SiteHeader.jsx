import React, { useEffect, useMemo, useState } from 'react';

export const NAV_ITEMS = [
  { label: 'Услуги', href: '/#services-page' },
  { label: 'Преимущества', href: '/#stats' },
  { label: 'География', href: '/#geography' },
  { label: 'Типы грузов', href: '/#cargo' },
  { label: 'Сегменты', href: '/#segments' },
  { label: 'Процесс', href: '/#steps' },
  { label: 'Форматы', href: '/#formats' },
  { label: 'Блог', href: '/blog.html' }
  // { label: 'Отслеживание груза', href: '/#tracking', className: 'tracking-pill' }, // временно скрыли
];

const MOBILE_NAV_MEDIA = '(max-width: 1024px)';

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(() => {
    if (typeof window === 'undefined') return '/#hero';
    const { pathname, hash } = window.location;
    if (pathname.endsWith('/blog.html') || pathname.includes('blog-')) return '/blog.html';
    return hash ? `/${hash}` : '/#hero';
  });
  const [isMobileNav, setIsMobileNav] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.(MOBILE_NAV_MEDIA)?.matches ?? window.innerWidth <= 1024;
  });

  const navItems = useMemo(() => NAV_ITEMS, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const { pathname, hash } = window.location;
    const isBlog = pathname.endsWith('/blog.html') || pathname.includes('blog-');
    if (isBlog) {
      setActiveHref('/blog.html');
      return;
    }

    const sectionIds = navItems
      .map((i) => i.href)
      .filter((href) => href.startsWith('/#'))
      .map((href) => href.replace('/#', ''));

    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActiveHref(`/#${visible.target.id}`);
      },
      { root: null, threshold: [0.25, 0.4, 0.6], rootMargin: '-25% 0px -60% 0px' }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [navItems]);

  useEffect(() => {
    const update = () => {
      const mobileNav = window.matchMedia?.(MOBILE_NAV_MEDIA)?.matches ?? window.innerWidth <= 1024;
      setIsMobileNav(mobileNav);
      if (!mobileNav) setIsOpen(false);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <header className="site-header">
      <div className="container topbar">
        <a className="logo" href="/" title="На главную">
          <img className="logo-img" src="/pics/logo.png" alt="Quantum Post" decoding="async" loading="eager" />
        </a>

        <nav className="nav" aria-label="Основная навигация">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={[item.className, item.href === activeHref ? 'is-active' : null].filter(Boolean).join(' ')}
              aria-current={item.href === activeHref ? 'page' : undefined}
              onClick={() => setActiveHref(item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="burger"
            aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
          {!isMobileNav ? (
            <a className="btn btn-primary header-cta header-cta-desktop" href="/#contact">
              Рассчитать доставку
            </a>
          ) : null}
        </div>
      </div>

      {isOpen ? (
        <div
          className="mobile-nav-overlay"
          role="dialog"
          aria-label="Меню"
          onClick={() => setIsOpen(false)}
        >
          <div className="mobile-nav" onClick={(e) => e.stopPropagation()}>
            <div className="container mobile-nav-inner">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={['mobile-nav-link', item.href === activeHref ? 'is-active' : null].filter(Boolean).join(' ')}
                  aria-current={item.href === activeHref ? 'page' : undefined}
                  onClick={() => {
                    setActiveHref(item.href);
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <a className="btn btn-primary mobile-nav-cta" href="/#contact" onClick={() => setIsOpen(false)}>
                Рассчитать доставку
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}


