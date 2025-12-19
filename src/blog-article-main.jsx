import React from 'react';
import { createRoot } from 'react-dom/client';
import SiteHeader from './components/SiteHeader.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import { servicesArticlesPage } from './data/articles.js';
import './styles.css';
import { runLayoutDebug } from './agentLayoutDebug.js';

function SafeHtml({ html, className }) {
  if (!html) return null;
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function BlogArticlePage() {
  const id = document.body?.dataset?.article;
  const article = servicesArticlesPage.articles.find((a) => a.id === id);

  if (!article) {
    return (
      <>
        <SiteHeader />
        <main className="page">
          <div className="container">
            <h1 className="section-title">Статья не найдена</h1>
            <p className="section-subtitle">Возможно, ссылка устарела. Вернитесь в блог и выберите статью из списка.</p>
            <a className="btn btn-secondary" href="/blog.html">
              Перейти в блог
            </a>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="page">
        <div className="container">
          <div className="article-shell">
            <div className="article-breadcrumbs">
              <a className="pill pill-link" href="/blog.html">
                ← Назад к блогу
              </a>
              <a className="pill pill-link" href="/#services-page">
                На главную
              </a>
              <span className="pill">
                {servicesArticlesPage.updatedAtLabel}: {servicesArticlesPage.updatedAt}
              </span>
            </div>

            <header className="article-hero">
              <div className="article-hero-media" aria-hidden="true">
                {article.cover ? <img className="article-hero-img" src={article.cover} alt={article.title} loading="lazy" decoding="async" /> : null}
                <div className="media-fallback" aria-hidden={article.cover ? 'true' : 'false'} />
              </div>
              <div className="article-hero-copy">
                <h1 className="article-title">{article.title}</h1>
                {article.description ? <p className="article-desc">{article.description}</p> : null}
                {article.tags?.length ? (
                  <div className="article-tags" aria-label="Теги">
                    {article.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </header>

            <article className="card article-card">
              <SafeHtml className="prose article-body" html={article.contentHtml} />
            </article>

            <div className="card articles-cta" aria-label="CTA">
              <div className="card-title">Нужен расчет под ваш груз?</div>
              <p className="card-desc">
                Оставьте параметры партии и маршрут — предложим формат перевозки, сроки и план контрольных точек.
              </p>
              <div className="articles-cta-actions">
                <a className="btn btn-secondary" href="/#contact">
                  Получить расчет
                </a>
                <a className="btn btn-primary" href="/blog.html">
                  Все статьи
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BlogArticlePage />
  </React.StrictMode>
);

runLayoutDebug({ runId: 'post-fix', page: 'blog-article' });


