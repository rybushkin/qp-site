import React from 'react';
import { createRoot } from 'react-dom/client';
import SiteHeader from './components/SiteHeader.jsx';
import { servicesPage } from './data/content.js';
import './styles.css';
import { runLayoutDebug } from './agentLayoutDebug.js';

const SERVICE_BY_KEY = {
  multimodal: servicesPage.items[0],
  customs: servicesPage.items[1],
  china: servicesPage.items[2]
};

function ServiceDetailPage() {
  const key = document.body?.dataset?.service;
  const item = SERVICE_BY_KEY[key];

  return (
    <>
      <SiteHeader />
      <main className="page">
        <div className="container">
          <h1 className="section-title">{item?.name ?? 'Услуга'}</h1>
          {item?.desc ? <p className="section-subtitle">{item.desc}</p> : null}
          <p className="card-desc">Страница в разработке.</p>
        </div>
      </main>
    </>
  );
}

const rootElement = document.getElementById('root');
createRoot(rootElement).render(
  <React.StrictMode>
    <ServiceDetailPage />
  </React.StrictMode>
);

runLayoutDebug({ runId: 'post-fix', page: 'service-detail' });


