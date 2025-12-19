import React from 'react';
import { createRoot } from 'react-dom/client';
import SiteHeader from './components/SiteHeader.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import { servicesArticlesPage } from './data/articles.js';
import './styles.css';
import { runLayoutDebug } from './agentLayoutDebug.js';

function BlogCard({ a }) {
  return (
    <a className="card blog-card blog-card-link" href={a.href} aria-label={a.title}>
      <div className="card-media blog-card-media" aria-hidden="true">
        {a.cover ? <img className="card-media-img" src={a.cover} alt={a.title} loading="lazy" decoding="async" /> : null}
        <div className="media-fallback" aria-hidden={a.cover ? 'true' : 'false'} />
      </div>
      <div className="card-title">{a.title}</div>
      {a.description ? <p className="card-desc">{a.description}</p> : null}
    </a>
  );
}

function BlogPage() {
  const p = servicesArticlesPage;
  return (
    <>
      <SiteHeader />
      <main className="page">
        <section id="blog" className="blog">
          <div className="container">
            <h1 className="section-title">Блог</h1>
            {p.subtitle ? <p className="section-subtitle">{p.subtitle}</p> : null}
            <div className="blog-actions">
              <a className="pill" href="/#services-page">
                На главную
              </a>
              <span className="pill">
                {p.updatedAtLabel}: {p.updatedAt}
              </span>
            </div>

            <div className="grid grid-3 blog-grid">
              {p.articles.map((a) => (
                <BlogCard key={a.id} a={a} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BlogPage />
  </React.StrictMode>
);

runLayoutDebug({ runId: 'post-fix', page: 'blog' });


