import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { hero, stats, geography, cargoTypes, segments, steps, benefits, security, formats, finalCta, servicesPage } from './data/content.js';
import { servicesArticlesPage } from './data/articles.js';
import SiteHeader from './components/SiteHeader.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const scrollToForm = () => {
  const el = document.getElementById('contact');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const ratioToSubtitle = (ratio) => {
  if (ratio === 'ratio-16-9') return '16:9';
  if (ratio === 'ratio-4-3') return '4:3';
  if (ratio === 'ratio-1-1') return '1:1';
  return '';
};

const Placeholder = ({ ratio = 'ratio-16-9', label, subtitle }) => {
  const sub = subtitle ?? ratioToSubtitle(ratio);
  return (
    <figure className={`placeholder ${ratio}`} aria-label={[label, sub].filter(Boolean).join(' ')}>
      <div className="placeholder-title">{label}</div>
      {sub ? <div className="placeholder-subtitle">{sub}</div> : null}
    </figure>
  );
};

const Hero = () => (
  <section id="hero" className="hero-section">
    <div className="container">
      <div className="hero-panel">
        <div className="hero-copy" data-anim="fade">
          <h1 className="hero-title">
            {(Array.isArray(hero.title) ? hero.title : [hero.title]).map((line, idx, arr) => (
              <span key={line}>
                {line}
                {idx < arr.length - 1 ? <br /> : null}
              </span>
            ))}
          </h1>
          <p className="hero-subtitle">{hero.subtitle}</p>
          <div className="cta-row">
            <button className="btn btn-secondary" onClick={scrollToForm}>
              {hero.ctaPrimary}
            </button>
          </div>
        </div>
        {/*
        <ul className="bullets">
          {hero.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        */}
        {/* CTA перенесли выше, под подзаголовок */}
      </div>
    </div>
  </section>
);

const Stats = () => (
  <section id="stats">
    <div className="container">
      <h2 className="section-title">{stats.title}</h2>
      {stats.subtitle ? <p className="section-subtitle">{stats.subtitle}</p> : null}
      <div className="stat-grid">
        {stats.items.map((item) => (
              <article key={item.label} className="stat-card" data-anim="fade">
                <div className="stat-value">{item.value}</div>
                <div className="stat-unit">{item.unit}</div>
                <div className="stat-label">{item.label}</div>
          </article>
        ))}
      </div>

      <div className="grid grid-2 stats-extras" style={{ marginTop: 22 }}>
        <div className="card" data-anim="fade">
          <div className="card-title">{benefits.title}</div>
          <div className="benefits-list">
            {benefits.items.map((item) => (
              <div key={item} className="list-item">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="card" data-anim="fade">
          <div className="card-title">{security.title}</div>
          <div className="security-list">
            {security.items.map((item) => (
              <div key={item} className="list-item">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Geography = () => (
  <section id="geography">
    <div className="container">
      <h2 className="section-title">{geography.title}</h2>
      {geography.subtitle ? <p className="section-subtitle">{geography.subtitle}</p> : null}
      <div className="geo-layout">
        <div className="map-wrap" data-anim="zoom">
          <img className="map-img" src="/pics/map.png" alt="Карта маршрутов Quantum Post" loading="lazy" decoding="async" />
        </div>
        <div className="hub-grid">
          {geography.hubs.map((hub) => (
            <div key={hub.city} className="hub-card" data-anim="fade">
              {hub.icon ? (
                <div className="hub-icon" aria-hidden="true">
                  <img className="hub-icon-img" src={hub.icon} alt="" loading="lazy" decoding="async" />
                </div>
              ) : (
                <Placeholder ratio="ratio-1-1" label="Иконка" />
              )}
              <div>
                <div className="hub-title">{hub.city}</div>
                <div className="hub-desc">{hub.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const CargoTypes = () => (
  <section id="cargo">
    <div className="container">
      <h2 className="section-title">{cargoTypes.title}</h2>
      <p className="section-subtitle">{cargoTypes.subtitle}</p>
      <CargoTypesCarousel />
    </div>
  </section>
);

function CargoTypesCarousel() {
  const scrollerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const threshold = 12;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > threshold);
    setCanScrollRight(el.scrollLeft < max - threshold);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateScrollButtons();

    const onScroll = () => updateScrollButtons();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateScrollButtons);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollByViewport = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.85) * direction;
    el.scrollBy({ left: amount, behavior: 'smooth' });
    window.setTimeout(updateScrollButtons, 180);
  };

  return (
    <div className="cargo-wrap" data-anim="fade">
      <button
        type="button"
        className={`cargo-arrow cargo-arrow-left${canScrollLeft ? '' : ' is-disabled'}`}
        aria-label="Прокрутить типы грузов влево"
        aria-disabled={!canScrollLeft}
        disabled={!canScrollLeft}
        onClick={() => scrollByViewport(-1)}
      >
        ‹
      </button>
      <div ref={scrollerRef} className="cargo-stack" aria-label="Типы грузов (листайте)">
        {cargoTypes.items.map((item) => (
          <article key={item.name} className="card cargo-card">
            <div className="cargo-img-wrap ratio-wagon" aria-hidden="true">
              <img className="cargo-img" src={item.image} alt={item.name} loading="lazy" decoding="async" />
            </div>
            <div className="card-title">{item.name}</div>
          </article>
        ))}
      </div>
      <button
        type="button"
        className={`cargo-arrow cargo-arrow-right${canScrollRight ? '' : ' is-disabled'}`}
        aria-label="Прокрутить типы грузов вправо"
        aria-disabled={!canScrollRight}
        disabled={!canScrollRight}
        onClick={() => scrollByViewport(1)}
      >
        ›
      </button>
    </div>
  );
}

const Segments = () => (
  <section id="segments">
    <div className="container">
      <h2 className="section-title">{segments.title}</h2>
      {segments.subtitle ? <p className="section-subtitle">{segments.subtitle}</p> : null}
      <div className="grid grid-3 segments-grid" data-anim="fade">
        {segments.items.map((segment, idx) => (
          <article key={segment.name} className="segment-card">
            <div className="segment-head">
              <div className="segment-badge" aria-hidden="true">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <div className="segment-text">
                <div className="card-title">{segment.name}</div>
                <div className="card-desc">{segment.desc}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const Steps = () => (
  <section id="steps">
    <div className="container">
      <h2 className="section-title">{steps.title}</h2>
      <p className="section-subtitle">{steps.subtitle}</p>
      <div className="steps">
        <div className="steps-list">
          {steps.items.map((step, index) => {
            const isLast = index === steps.items.length - 1;
            // Делаем “перенос” между 3 и 4: после 3 стрелка вправо, перед 4 стрелка влево.
            // Убираем стрелку вниз (она визуально “летела” к 6 пункту).
            const hasRightArrow = !isLast;
            const hasLeftArrow = index === 3;

            return (
              <div key={step} className="step-item" data-anim="fade">
                <div className="step-number">{index + 1}</div>
                <div className="step-text">{step}</div>
                {hasRightArrow ? (
                  <span className="step-arrow step-arrow-right" aria-hidden="true">
                    →
                  </span>
                ) : null}
                {hasLeftArrow ? (
                  <span className="step-arrow step-arrow-left" aria-hidden="true">
                    ←
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

const Formats = () => (
  <section id="formats">
    <div className="container">
      <h2 className="section-title">{formats.title}</h2>
      {formats.subtitle ? <p className="section-subtitle">{formats.subtitle}</p> : null}
      <div className="grid grid-3">
        {formats.items.map((card) => (
          <article key={card.name} className="card format-card" data-anim="fade">
            {card.image ? (
              <div className="format-media ratio-16-9" aria-hidden="true">
                <img className="format-media-img" src={card.image} alt={card.name} loading="lazy" decoding="async" />
              </div>
            ) : (
              <Placeholder ratio="ratio-4-3" label="Иллюстрация" />
            )}
            <div className="card-title">{card.name}</div>
            <div className="card-desc">{card.desc}</div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const ServicesPage = () => (
  <section id="services-page">
    <div className="container">
      <h2 className="section-title">{servicesPage.title}</h2>
      {servicesPage.subtitle ? <p className="section-subtitle">{servicesPage.subtitle}</p> : null}
      <div className="grid grid-3">
        {servicesPage.items.map((item) => (
          <article key={item.name} className="card service-page-card" data-anim="fade">
            <div className="card-media" aria-hidden="true">
              <img className="card-media-img" src={item.image} alt={item.name} loading="lazy" decoding="async" />
            </div>
            <div className="card-title">{item.name}</div>
            <p className="card-desc">{item.desc}</p>
            {/* Внутренние страницы услуг: пока скрываем */}
          </article>
        ))}
      </div>

      {servicesPage.addon ? (
        <div className="services-addon" role="note" aria-label="Дополнение к услугам" data-anim="fade">
          <span className="services-addon-plus" aria-hidden="true">
            +
          </span>
          <p className="services-addon-text">{servicesPage.addon}</p>
        </div>
      ) : null}
    </div>
  </section>
);

const Blog = () => (
  <section id="blog">
    <div className="container">
      <h2 className="section-title">Блог</h2>
      <p className="section-subtitle">{servicesArticlesPage.subtitle}</p>
      <div className="blog-actions">
        <a className="btn btn-secondary" href="/blog.html">
          Читать больше
        </a>
      </div>
      <div className="grid grid-3 blog-grid" data-anim="fade">
        {servicesArticlesPage.articles.slice(0, 3).map((a) => (
          <a
            key={a.id}
            className="card blog-card blog-card-link"
            href={a.href ?? `/blog-${a.id}.html`}
            aria-label={a.title}
          >
            <div className="card-media" aria-hidden="true">
              <img className="card-media-img" src={a.cover ?? '/pics/0001.png'} alt={a.title} loading="lazy" decoding="async" />
            </div>
            <div className="card-title">{a.title}</div>
            <div className="card-desc">{a.description}</div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const FinalCTA = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    // Пока заглушка: логируем форму для дальнейшей интеграции
    console.log('Quantum Post form submit', Object.fromEntries(form.entries()));
    alert('Заявка отправлена (демо). В бою подключим API/CRM.');
  };

  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title">{finalCta.title}</h2>
        <p className="section-subtitle">{finalCta.text}</p>
        <div className="cta-panel" data-anim="fade">
          <form className="form" onSubmit={onSubmit}>
            {finalCta.fields.map((field) => (
              <label key={field.name}>
                {field.label}
                {field.type === 'textarea' ? (
                  <textarea name={field.name} placeholder={field.placeholder} required />
                ) : (
                  <input
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                  />
                )}
              </label>
            ))}
            <button type="submit" className="btn btn-primary">
              {finalCta.cta}
            </button>
          </form>
          <div className="contacts">
            <div className="card-title">Контакты</div>
            <div className="contact-row">
              <span className="pill">Офис</span>
              <span>{finalCta.contacts.office}</span>
            </div>
            <div className="contact-row">
              <span className="pill">Телефон</span>
              <span>{finalCta.contacts.phone}</span>
            </div>
            <div className="contact-row">
              <span className="pill">E‑mail</span>
              <span>{finalCta.contacts.email}</span>
            </div>
            <div className="contact-row">
              <span className="pill">Мессенджеры</span>
              <span>{finalCta.contacts.messenger}</span>
            </div>
            <Placeholder ratio="ratio-4-3" label="Иллюстрация" subtitle="Визуал CTA" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const appRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('[data-anim]');
      elements.forEach((el, idx) => {
        const type = el.dataset.anim || 'fade';
        const base = {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: Math.min(idx * 0.04, 0.35)
        };
        // Элементы, которые уже в первом экране, анимируем сразу (без ScrollTrigger),
        // чтобы не оставлять пустое место сверху при нестандартных ресайзах/перезагрузках.
        const rect = el.getBoundingClientRect?.();
        // Если элемент уже попадает в текущий viewport — анимируем сразу.
        // Иначе — через ScrollTrigger (элемент будет появляться при скролле).
        const isInViewport = rect ? rect.top < window.innerHeight && rect.bottom > 0 : true;
        const withTrigger = isInViewport
          ? base
          : {
              ...base,
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
              }
            };

        if (type === 'fade-up') {
          gsap.from(el, { ...withTrigger, y: 24 });
        } else if (type === 'fade-in') {
          gsap.from(el, { ...withTrigger });
        } else if (type === 'zoom') {
          gsap.from(el, { ...withTrigger, scale: 0.94 });
        } else {
          gsap.from(el, { ...withTrigger, y: 16 });
        }
      });
    }, appRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={appRef}>
      <SiteHeader />
      <main>
        <Hero />
        <ServicesPage />
        <Stats />
        <Geography />
        <CargoTypes />
        <Segments />
        <Steps />
        <Formats />
        <Blog />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}


