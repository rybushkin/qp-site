import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { hero, stats, geography, cargoTypes, segments, steps, benefits, security, formats, faq, finalCta, servicesPage } from './data/content.js';
import SiteHeader from './components/SiteHeader.jsx';
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
      <div className="hero-panel" data-anim="fade-up">
        <h1 className="hero-title">{hero.title}</h1>
        <p className="hero-subtitle">{hero.subtitle}</p>
        <ul className="bullets">
          {hero.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="cta-row">
          <button className="btn btn-primary" onClick={scrollToForm}>
            {hero.ctaPrimary}
          </button>
          <button className="btn btn-secondary" onClick={scrollToForm}>
            {hero.ctaSecondary}
          </button>
          {/* "Вход в личный кабинет" пока убираем */}
        </div>
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
          <Placeholder label="Карта" />
        </div>
        <div className="hub-grid">
          {geography.hubs.map((hub) => (
            <div key={hub.city} className="hub-card" data-anim="fade">
              <Placeholder ratio="ratio-1-1" label="Иконка" />
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
      <div className="grid grid-3">
        {cargoTypes.items.map((item) => (
          <article key={item.name} className="card cargo-card" data-anim="fade">
            <div className="cargo-img-wrap ratio-1-1">
              <img src={item.image} alt={item.name} className="cargo-img" />
            </div>
            <div className="card-title">{item.name}</div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const Segments = () => (
  <section id="segments">
    <div className="container">
      <h2 className="section-title">{segments.title}</h2>
      {segments.subtitle ? <p className="section-subtitle">{segments.subtitle}</p> : null}
      <SegmentsScroller />
    </div>
  </section>
);

function SegmentsScroller() {
  const scrollerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < max - 2);
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

  const scrollByCard = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.85) * direction;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className="segments-wrap" data-anim="fade">
      <button
        type="button"
        className={`segments-arrow segments-arrow-left${canScrollLeft ? '' : ' is-disabled'}`}
        aria-label="Прокрутить влево"
        aria-disabled={!canScrollLeft}
        disabled={!canScrollLeft}
        onClick={() => scrollByCard(-1)}
      >
        ‹
      </button>
      <div ref={scrollerRef} className="segments-stack" aria-label="Сегменты (листайте)">
        {segments.items.map((segment) => (
          <article key={segment.name} className="segment-card">
            <Placeholder label="Заменительная иллюстрация" />
            <div className="card-title">{segment.name}</div>
            <div className="card-desc">{segment.desc}</div>
          </article>
        ))}
      </div>
      <button
        type="button"
        className={`segments-arrow segments-arrow-right${canScrollRight ? '' : ' is-disabled'}`}
        aria-label="Прокрутить вправо"
        aria-disabled={!canScrollRight}
        disabled={!canScrollRight}
        onClick={() => scrollByCard(1)}
      >
        ›
      </button>
    </div>
  );
}

const Steps = () => (
  <section id="steps">
    <div className="container">
      <h2 className="section-title">{steps.title}</h2>
      <p className="section-subtitle">{steps.subtitle}</p>
      <div className="steps">
        <div className="steps-list">
          {steps.items.map((step, index) => {
            const isEndOfFirstRow = index === 2;
            const hasRightArrow = index !== 2 && index !== steps.items.length - 1;
            const hasDownArrow = isEndOfFirstRow;

            return (
              <div key={step} className="step-item" data-anim="fade">
                <div className="step-number">{index + 1}</div>
                <div className="step-text">{step}</div>
                {hasRightArrow ? (
                  <span className="step-arrow step-arrow-right" aria-hidden="true">
                    →
                  </span>
                ) : null}
                {hasDownArrow ? (
                  <span className="step-arrow step-arrow-down" aria-hidden="true">
                    ↓
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
            <Placeholder ratio="ratio-4-3" label="Заменительная иллюстрация" />
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
            <div className="card-media" role="img" aria-label="Изображение услуги (заглушка)" />
            <div className="card-title">{item.name}</div>
            <p className="card-desc">{item.desc}</p>
            <a className="link-out" href={item.href}>
              Подробнее
            </a>
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

const FAQ = () => (
  <section id="faq">
    <div className="container">
      <h2 className="section-title">{faq.title}</h2>
      {faq.subtitle ? <p className="section-subtitle">{faq.subtitle}</p> : null}
      <div className="faq">
        {faq.items.map((question) => (
          <details key={question} data-anim="fade">
            <summary>{question}</summary>
            <div className="faq-body">
              Ответ добавим после уточнений от клиента.
            </div>
          </details>
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
            <Placeholder ratio="ratio-4-3" label="Заменительная иллюстрация" subtitle="Визуал CTA" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-top">
        <div className="logo">Quantum Post</div>
        <div className="tracking-pill">{hero.trackingLabel}</div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} Quantum Post</div>
    </div>
  </footer>
);

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
          delay: Math.min(idx * 0.04, 0.35),
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        };

        if (type === 'fade-up') {
          gsap.from(el, { ...base, y: 24 });
        } else if (type === 'fade-in') {
          gsap.from(el, { ...base });
        } else if (type === 'zoom') {
          gsap.from(el, { ...base, scale: 0.94 });
        } else {
          gsap.from(el, { ...base, y: 16 });
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
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}


