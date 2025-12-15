import React, { useEffect, useMemo, useState } from 'react';

export const NAV_ITEMS = [
  { label: 'Услуги', href: '/services.html' },
  { label: 'Преимущества', href: '/#stats' },
  { label: 'География', href: '/#geography' },
  { label: 'Типы грузов', href: '/#cargo' },
  { label: 'Сегменты', href: '/#segments' },
  { label: 'Процесс', href: '/#steps' },
  { label: 'Форматы', href: '/#formats' },
  { label: 'FAQ', href: '/#faq' }
  // { label: 'Отслеживание груза', href: '/#tracking', className: 'tracking-pill' }, // временно скрыли
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 640;
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
    const update = () => {
      const mobile = window.innerWidth <= 640;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <header>
      <div className="container topbar">
        <a className="logo" href="/" title="На главную">
          Quantum Post
        </a>

        <nav className="nav" aria-label="Основная навигация">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className={item.className}>
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
          {!isMobile ? (
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
                <a key={item.label} href={item.href} className="mobile-nav-link" onClick={() => setIsOpen(false)}>
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


