import React from 'react';
import { createRoot } from 'react-dom/client';
import { servicesPage } from './data/content.js';
import SiteHeader from './components/SiteHeader.jsx';
import './styles.css';
import { runLayoutDebug } from './agentLayoutDebug.js';

const ServicesPageStandalone = () => (
  <>
    <SiteHeader />
    <main className="page">
      <div className="container">
        <h1 className="section-title">{servicesPage.title}</h1>
        {servicesPage.subtitle ? <p className="section-subtitle">{servicesPage.subtitle}</p> : null}
        <div className="grid grid-3">
          {servicesPage.items.map((item) => (
            <article key={item.name} className="card service-page-card">
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
          <div className="services-addon" role="note" aria-label="Дополнение к услугам">
            <span className="services-addon-plus" aria-hidden="true">
              +
            </span>
            <p className="services-addon-text">{servicesPage.addon}</p>
          </div>
        ) : null}
      </div>
    </main>
  </>
);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ServicesPageStandalone />
  </React.StrictMode>
);

runLayoutDebug({ runId: 'post-fix', page: 'services' });








