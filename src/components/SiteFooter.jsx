import React from 'react';
import { hero } from '../data/content.js';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <a className="footer-brand" href="/" aria-label="На главную">
            <img className="footer-logo" src="/pics/logo.png" alt="Quantum Post" decoding="async" loading="lazy" />
          </a>
          <div className="tracking-pill">{hero.trackingLabel}</div>
        </div>
        <div className="footer-bottom">© {new Date().getFullYear()} Quantum Post</div>
      </div>
    </footer>
  );
}


