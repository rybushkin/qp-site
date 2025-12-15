import React from 'react';

const Header = () => (
  <header className="cursor-header">
    <div className="cursor-header-container">
      <a href="/" className="cursor-logo">
        <span className="cursor-logo-icon">Cursor</span>
        <span className="cursor-logo-text">Cursor</span>
      </a>
      <nav className="cursor-nav">
        <a href="/features">Features</a>
        <a href="/enterprise">Enterprise</a>
        <a href="/pricing">Pricing</a>
        <div className="cursor-nav-dropdown">
          <a href="/changelog">Resources</a>
          <button className="cursor-nav-dropdown-btn">↓</button>
        </div>
      </nav>
      <div className="cursor-header-actions">
        <a href="/dashboard" className="cursor-link">Sign in</a>
        <a href="/download" className="cursor-btn cursor-btn-primary">Download</a>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="cursor-hero">
    <div className="cursor-hero-container">
      <div className="cursor-hero-content">
        <h1 className="cursor-hero-title">
          Built to make you extraordinarily productive, Cursor is the best way to code with AI.
        </h1>
        <a href="/download" className="cursor-btn cursor-btn-large cursor-btn-primary">
          Download for macOS
          <span className="cursor-btn-icon">⤓</span>
        </a>
      </div>
      <div className="cursor-hero-demo">
        <div className="cursor-demo-placeholder">
          Interactive demo showing Cursor IDE interfaces
        </div>
      </div>
    </div>
  </section>
);

const TrustedSection = () => (
  <section className="cursor-trusted">
    <div className="cursor-container">
      <h2 className="cursor-section-title">Trusted every day by millions of professional developers.</h2>
    </div>
  </section>
);

const FeatureSection = ({ title, description, linkText, linkUrl, demoContent, reverse = false }) => (
  <section className="cursor-feature">
    <div className={`cursor-feature-content ${reverse ? 'cursor-feature-reverse' : ''}`}>
      <a href={linkUrl} className="cursor-feature-link">
        <div className="cursor-feature-text">
          <h3 className="cursor-feature-title">{title}</h3>
          <p className="cursor-feature-desc">{description}</p>
        </div>
        <span className="cursor-feature-link-text">{linkText} →</span>
      </a>
      <div className="cursor-feature-demo">
        <div className="cursor-demo-placeholder">{demoContent}</div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="cursor-testimonials">
    <div className="cursor-container">
      <h2 className="cursor-section-title">The new way to build software.</h2>
      <div className="cursor-testimonials-grid">
        {[
          {
            quote: "It was night and day from one batch to another, adoption went from single digits to over 80%. It just spread like wildfire, all the best builders were using Cursor.",
            author: "Diana Hu",
            role: "General Partner, Y Combinator"
          },
          {
            quote: "The most useful AI tool that I currently pay for, hands down, is Cursor. It's fast, autocompletes when and where you need it to, handles brackets properly, sensible keyboard shortcuts, bring-your-own-model... everything is well put together.",
            author: "shadcn",
            role: "Creator of shadcn/ui"
          },
          {
            quote: "The best LLM applications have an autonomy slider: you control how much independence to give the AI. In Cursor, you can do Tab completion, Cmd+K for targeted edits, or you can let it rip with the full autonomy agentic version.",
            author: "Andrej Karpathy",
            role: "CEO, Eureka Labs"
          },
          {
            quote: "Cursor quickly grew from hundreds to thousands of extremely enthusiastic Stripe employees. We spend more on R&D and software creation than any other undertaking, and there's significant economic outcomes when making that process more efficient and productive.",
            author: "Patrick Collison",
            role: "Co‑Founder & CEO, Stripe"
          },
          {
            quote: "It's official. I hate vibe coding. I love Cursor tab coding. It's wild.",
            author: "ThePrimeagen",
            role: "@ThePrimeagen"
          },
          {
            quote: "It's definitely becoming more fun to be a programmer. It's less about digging through pages and more about what you want to happen. We are at the 1% of what's possible, and it's in interactive experiences like Cursor where models like GPT-5 shine brightest.",
            author: "Greg Brockman",
            role: "President, OpenAI"
          }
        ].map((testimonial, idx) => (
          <figure key={idx} className="cursor-testimonial">
            <blockquote className="cursor-testimonial-quote">
              <p>{testimonial.quote}</p>
            </blockquote>
            <figcaption className="cursor-testimonial-author">
              <span className="cursor-testimonial-name">{testimonial.author}</span>
              <span className="cursor-testimonial-role">{testimonial.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

const FrontierSection = () => (
  <section className="cursor-frontier">
    <div className="cursor-container">
      <h2 className="cursor-section-title">Stay on the frontier</h2>
      <div className="cursor-frontier-grid">
        {[
          {
            title: "Access the best models",
            description: "Choose between every cutting-edge model from OpenAI, Anthropic, Gemini, and xAI.",
            linkText: "Explore models ↗",
            linkUrl: "/docs/models"
          },
          {
            title: "Complete codebase understanding",
            description: "Cursor learns how your codebase works, no matter the scale or complexity.",
            linkText: "Learn about codebase indexing ↗",
            linkUrl: "/docs/context/codebase-indexing"
          },
          {
            title: "Develop enduring software",
            description: "Trusted by over half of the Fortune 500 to accelerate development, securely and at scale.",
            linkText: "Explore enterprise →",
            linkUrl: "/enterprise"
          }
        ].map((item, idx) => (
          <a key={idx} href={item.linkUrl} className="cursor-frontier-card">
            <div className="cursor-frontier-content">
              <h3 className="cursor-frontier-title">{item.title}</h3>
              <p className="cursor-frontier-desc">{item.description}</p>
              <span className="cursor-frontier-link">{item.linkText}</span>
            </div>
            <div className="cursor-frontier-demo">
              <div className="cursor-demo-placeholder">Demo content</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const Changelog = () => (
  <section className="cursor-changelog">
    <div className="cursor-container">
      <h2 className="cursor-section-title">Changelog</h2>
      <div className="cursor-changelog-list">
        {[
          { version: "2.2", date: "Dec 10, 2025", title: "Debug Mode, Plan Mode Improvements, Multi-Agent Judging, and Pinned Chats", url: "/changelog/2-2" },
          { version: "2.1", date: "Nov 21, 2025", title: "Improved Plan Mode, AI Code Review in Editor, and Instant Grep", url: "/changelog/2-1" },
          { version: "2.0", date: "Oct 29, 2025", title: "New Coding Model and Agent Interface", url: "/changelog/2-0" },
          { version: "1.7", date: "Sep 29, 2025", title: "Browser Controls, Plan Mode, and Hooks", url: "/changelog/1-7" }
        ].map((item, idx) => (
          <article key={idx} className="cursor-changelog-item">
            <a href={item.url} className="cursor-changelog-link">
              <div className="cursor-changelog-header">
                <span className="cursor-changelog-version">{item.version}</span>
                <time className="cursor-changelog-date">{item.date}</time>
              </div>
              <p className="cursor-changelog-title">{item.title}</p>
            </a>
          </article>
        ))}
      </div>
      <a href="/changelog" className="cursor-changelog-more">See what's new in Cursor →</a>
    </div>
  </section>
);

const TeamSection = () => (
  <section className="cursor-team">
    <div className="cursor-container">
      <div className="cursor-team-content">
        <h2 className="cursor-section-title">Cursor is an applied team focused on building the future of coding.</h2>
        <a href="/careers" className="cursor-btn cursor-btn-primary">
          Join us
          <span className="cursor-btn-icon">→</span>
        </a>
      </div>
    </div>
  </section>
);

const BlogSection = () => (
  <section className="cursor-blog">
    <div className="cursor-container">
      <h2 className="cursor-section-title">Recent highlights</h2>
      <div className="cursor-blog-grid">
        {[
          {
            title: "Introducing Cursor 2.0 and Composer",
            description: "A new interface and our first coding model, both purpose-built for working with agents.",
            category: "Product",
            date: "Oct 29, 2025",
            url: "/blog/2-0"
          },
          {
            title: "Improving Cursor Tab with online RL",
            description: "Our new Tab model makes 21% fewer suggestions while having 28% higher accept rate.",
            category: "Research",
            date: "Sep 12, 2025",
            url: "/blog/tab-rl"
          },
          {
            title: "1.5x faster MoE training with custom MXFP8 kernels",
            description: "Achieving a 3.5x MoE layer speedup with a complete rebuild for Blackwell GPUs.",
            category: "Research",
            date: "Aug 29, 2025",
            url: "/blog/kernels"
          }
        ].map((post, idx) => (
          <article key={idx} className="cursor-blog-item">
            <a href={post.url} className="cursor-blog-link">
              <div className="cursor-blog-content">
                <h3 className="cursor-blog-title">{post.title}</h3>
                <p className="cursor-blog-desc">{post.description}</p>
              </div>
              <div className="cursor-blog-meta">
                <span className="cursor-blog-category">{post.category}</span>
                <span className="cursor-blog-sep">·</span>
                <time className="cursor-blog-date">{post.date}</time>
              </div>
            </a>
          </article>
        ))}
      </div>
      <a href="/blog" className="cursor-blog-more">View more posts →</a>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="cursor-final-cta">
    <div className="cursor-container">
      <h2 className="cursor-section-title">Try Cursor now.</h2>
      <a href="/download" className="cursor-btn cursor-btn-large cursor-btn-primary">
        Download for macOS
        <span className="cursor-btn-icon">⤓</span>
      </a>
    </div>
  </section>
);

const Footer = () => (
  <footer className="cursor-footer">
    <div className="cursor-container">
      <nav className="cursor-footer-nav">
        <div className="cursor-footer-column">
          <h3 className="cursor-footer-heading">Product</h3>
          <ul className="cursor-footer-list">
            <li><a href="/features">Features</a></li>
            <li><a href="/enterprise">Enterprise</a></li>
            <li><a href="/agents">Web Agents</a></li>
            <li><a href="/bugbot">Bugbot</a></li>
            <li><a href="/cli">CLI</a></li>
            <li><a href="/pricing">Pricing</a></li>
          </ul>
        </div>
        <div className="cursor-footer-column">
          <h3 className="cursor-footer-heading">Resources</h3>
          <ul className="cursor-footer-list">
            <li><a href="/download">Download</a></li>
            <li><a href="/changelog">Changelog</a></li>
            <li><a href="https://cursor.com/docs" target="_blank" rel="noopener noreferrer">Docs ↗</a></li>
            <li><a href="https://cursor.com/learn" target="_blank" rel="noopener noreferrer">Learn ↗</a></li>
            <li><a href="https://forum.cursor.com/" target="_blank" rel="noopener noreferrer">Forum ↗</a></li>
            <li><a href="https://status.cursor.com/" target="_blank" rel="noopener noreferrer">Status ↗</a></li>
          </ul>
        </div>
        <div className="cursor-footer-column">
          <h3 className="cursor-footer-heading">Company</h3>
          <ul className="cursor-footer-list">
            <li><a href="/careers">Careers</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/community">Community</a></li>
            <li><a href="/workshops">Workshops</a></li>
            <li><a href="/students">Students</a></li>
            <li><a href="/brand">Brand</a></li>
          </ul>
        </div>
        <div className="cursor-footer-column">
          <h3 className="cursor-footer-heading">Legal</h3>
          <ul className="cursor-footer-list">
            <li><a href="/terms-of-service">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/data-use">Data Use</a></li>
            <li><a href="/security">Security</a></li>
          </ul>
        </div>
        <div className="cursor-footer-column">
          <h3 className="cursor-footer-heading">Connect</h3>
          <ul className="cursor-footer-list">
            <li><a href="https://x.com/cursor_ai" target="_blank" rel="noopener noreferrer">X ↗</a></li>
            <li><a href="https://www.linkedin.com/company/cursorai" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
            <li><a href="https://www.youtube.com/@cursor_ai" target="_blank" rel="noopener noreferrer">YouTube ↗</a></li>
          </ul>
        </div>
      </nav>
      <div className="cursor-footer-bottom">
        <div className="cursor-footer-copyright">
          <span>© 2025 Cursor</span>
          <a href="/security" className="cursor-footer-cert">
            🛡 SOC 2 Certified
          </a>
        </div>
        <div className="cursor-footer-actions">
          <button className="cursor-theme-btn">🖥</button>
          <button className="cursor-theme-btn">☉</button>
          <button className="cursor-theme-btn">☾</button>
          <button className="cursor-lang-btn">🌐 English ↓</button>
        </div>
      </div>
    </div>
  </footer>
);

export default function Page1() {
  return (
    <div className="cursor-page">
      <Header />
      <main>
        <Hero />
        <TrustedSection />
        <FeatureSection
          title="Agent turns ideas into code"
          description="A human-AI programmer, orders of magnitude more effective than any developer alone."
          linkText="Learn about Agent"
          linkUrl="/features#agent"
          demoContent="Agent demo showing Cursor IDE"
          reverse={false}
        />
        <FeatureSection
          title="Magically accurate autocomplete"
          description="Our custom Tab model predicts your next action with striking speed and precision."
          linkText="Learn about Tab"
          linkUrl="/features#tab"
          demoContent="Tab autocomplete demo"
          reverse={true}
        />
        <FeatureSection
          title="Everywhere software gets built"
          description="Cursor is in GitHub reviewing your PRs, a teammate in Slack, and anywhere else you work."
          linkText="Learn about Cursor's ecosystem"
          linkUrl="/features#ecosystem"
          demoContent="Slack and GitHub integration demos"
          reverse={false}
        />
        <Testimonials />
        <FrontierSection />
        <Changelog />
        <TeamSection />
        <BlogSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

