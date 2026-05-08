// Sections.jsx — landing page sections (Stats, BestSellers, Artists, HowItWorks, CustomCTA, NewArrivals, Testimonials, FAQ, Newsletter)

const Stats = ({ t }) => (
  <section style={{ paddingTop: 60 }}>
    <div className="container">
      <div className="section-head">
        <div>
          <span className="eyebrow"><span className="dot"></span>TRUST</span>
          <h2>{t.stats.title}</h2>
        </div>
        <p>{t.stats.sub}</p>
      </div>
      <div className="stat-grid">
        {t.stats.items.map((s, i) => (
          <div key={i} className="stat">
            <div className="n">{s.n}</div>
            <div className="l">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Stars = ({ rating = 5 }) => (
  <span className="rating">
    {[...Array(5)].map((_, i) => <Icon.Star key={i} style={{ opacity: i < Math.floor(rating) ? 1 : 0.25 }} />)}
  </span>
);
window.Stars = Stars;

const ProductCard = ({ poster, onSelect, onAdd }) => (
  <div className="product-card" onClick={() => onSelect(poster)}>
    <div className="frame">
      {poster.badge && <span className="badge">{poster.badge}</span>}
      <button className="quick btn btn-primary" style={{ padding: "8px 12px", fontSize: 12 }}
        onClick={(e) => { e.stopPropagation(); onAdd(poster); }}>
        <Icon.Plus /> Add
      </button>
      <Poster poster={poster} framed size={220} />
    </div>
    <div className="meta">
      <div>
        <div className="title">{poster.title}</div>
        <div className="artist">{poster.artist}</div>
        <div style={{ marginTop: 8 }}><Stars rating={poster.rating} /> <span style={{ color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>({poster.reviews})</span></div>
      </div>
      <div className="price">
        <span className="was">${poster.was.toFixed(2)}</span>
        ${poster.price.toFixed(2)}
      </div>
    </div>
  </div>
);
window.ProductCard = ProductCard;

const BestSellers = ({ t, navigate, onAdd }) => {
  const items = window.HM_DATA.posters.slice(0, 8);
  return (
    <section>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow"><span className="dot"></span>{t.best.eyebrow}</span>
            <h2>{t.best.title}</h2>
            <p>{t.best.sub}</p>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button className="btn btn-ghost" onClick={() => navigate("catalog")}>{t.best.view} <Icon.Arrow /></button>
          </div>
        </div>
        <div className="products-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {items.slice(0, 4).map((p) => <ProductCard key={p.id} poster={p} onSelect={(x) => navigate("product", x.id)} onAdd={onAdd} />)}
        </div>
        <div className="products-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", marginTop: 24 }}>
          {items.slice(4, 8).map((p) => <ProductCard key={p.id} poster={p} onSelect={(x) => navigate("product", x.id)} onAdd={onAdd} />)}
        </div>
      </div>
    </section>
  );
};

// Artist editorial card with abstract gradient background
const ArtistCard = ({ a }) => (
  <div className="artist-card">
    <div className="bg" style={{
      background: `radial-gradient(circle at 50% 30%, hsl(${a.hue}, 60%, 45%) 0%, hsl(${a.hue}, 80%, 12%) 60%, #0a0a0a 100%)`,
    }}>
      {/* Stylized portrait silhouette */}
      <svg viewBox="0 0 100 130" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id={`g-${a.slug}`} cx="50%" cy="35%" r="50%">
            <stop offset="0%" stopColor={`hsl(${a.hue}, 80%, 70%)`} stopOpacity="0.7" />
            <stop offset="100%" stopColor={`hsl(${a.hue}, 80%, 12%)`} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100" height="130" fill="transparent" />
        <circle cx="50" cy="40" r="35" fill={`url(#g-${a.slug})`} />
        <ellipse cx="50" cy="42" rx="14" ry="18" fill="rgba(0,0,0,0.55)" />
        <path d="M28 80 Q50 60 72 80 L72 130 L28 130 Z" fill="rgba(0,0,0,0.65)" />
        <text x="50" y="125" textAnchor="middle" fill="rgba(255,255,255,0.06)" fontSize="40" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" letterSpacing="-2">{a.name.split(" ")[0].toUpperCase()}</text>
      </svg>
    </div>
    <div className="overlay"></div>
    <div className="info">
      <div className="country">{a.country}</div>
      <h3>{a.name}</h3>
      <div className="count">{a.posters} posters</div>
    </div>
  </div>
);
window.ArtistCard = ArtistCard;

const Artists = ({ t, navigate }) => {
  const list = window.HM_DATA.artists.slice(0, 8);
  return (
    <section>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow"><span className="dot"></span>{t.artists.eyebrow}</span>
            <h2>{t.artists.title}</h2>
            <p>{t.artists.sub}</p>
          </div>
          <button className="btn btn-ghost" onClick={() => navigate("artists")}>{t.best.view} <Icon.Arrow /></button>
        </div>
        <div className="artist-grid">
          {list.map((a) => <ArtistCard key={a.slug} a={a} />)}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = ({ t }) => {
  const featured = [window.HM_DATA.posters[5], window.HM_DATA.posters[1], window.HM_DATA.posters[4]];
  return (
    <section id="how">
      <div className="container">
        <div className="section-head" style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <div>
            <span className="eyebrow"><span className="dot"></span>{t.how.eyebrow}</span>
            <h2 style={{ maxWidth: 800 }}>{t.how.title}</h2>
            <p style={{ maxWidth: 540 }}>{t.how.sub}</p>
          </div>
        </div>
        <div className="steps">
          {t.how.steps.map((s, i) => (
            <div key={i} className={`step ${i % 2 === 1 ? "reverse" : ""}`}>
              <div>
                <div className="step-num">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
              <div className="step-visual">
                {i === 0 && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, transform: "perspective(800px) rotateX(8deg) rotateY(-12deg)" }}>
                    {window.HM_DATA.posters.slice(0, 6).map((p) => <Poster key={p.id} poster={p} size={100} />)}
                  </div>
                )}
                {i === 1 && (
                  <div style={{ width: "100%", maxWidth: 360, padding: 22, borderRadius: 16, background: "rgba(0,0,0,0.55)", border: "1px solid var(--border)", backdropFilter: "blur(8px)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--accent)", display: "grid", placeItems: "center" }}><Icon.Inbox /></div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>tu@correo.com</div>
                        <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace" }}>Hype Music · just now</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 16 }}>Tu pedido está listo. 4 archivos, 300 DPI:</div>
                    {["A2_Un_Verano.jpg", "A3_Un_Verano.jpg", "A4_Un_Verano.jpg", "A5_Un_Verano.jpg"].map((f) => (
                      <div key={f} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: "1px solid var(--border)", fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
                        <span>{f}</span>
                        <Icon.Download style={{ color: "var(--accent)" }} />
                      </div>
                    ))}
                  </div>
                )}
                {i === 2 && (
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-end" }}>
                    {featured.map((p, k) => (
                      <div key={p.id} style={{ transform: `rotate(${k === 1 ? 0 : k === 0 ? -3 : 3}deg) translateY(${k === 1 ? -10 : 0}px)` }}>
                        <Poster poster={p} framed size={160 - Math.abs(k - 1) * 20} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CustomCTA = ({ t, navigate }) => (
  <section>
    <div className="container">
      <div className="custom-cta">
        <span className="eyebrow"><span className="dot"></span>{t.custom.eyebrow}</span>
        <h2>{t.custom.title}</h2>
        <p>{t.custom.sub}</p>
        <button className="btn btn-primary" onClick={() => navigate("catalog")} style={{ fontSize: 15, padding: "16px 26px" }}>
          {t.custom.cta}
        </button>
        {/* Floating decorative posters */}
        <div style={{ position: "absolute", top: 40, right: 60, transform: "rotate(8deg)", opacity: 0.6, pointerEvents: "none" }}>
          <Poster poster={window.HM_DATA.posters[6]} framed size={180} />
        </div>
        <div style={{ position: "absolute", bottom: -30, right: 220, transform: "rotate(-12deg)", opacity: 0.4, pointerEvents: "none" }}>
          <Poster poster={window.HM_DATA.posters[12]} framed size={140} />
        </div>
      </div>
    </div>
  </section>
);

const NewArrivals = ({ t, navigate, onAdd }) => {
  const items = window.HM_DATA.posters.slice(8, 16);
  const ref = React.useRef(null);
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  return (
    <section>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow"><span className="dot"></span>{t.nuevos.eyebrow}</span>
            <h2>{t.nuevos.title}</h2>
            <p>{t.nuevos.sub}</p>
          </div>
          <div className="scroller-controls">
            <button onClick={() => scroll(-1)} aria-label="prev"><Icon.Arrow style={{ transform: "rotate(180deg)" }} /></button>
            <button onClick={() => scroll(1)} aria-label="next"><Icon.Arrow /></button>
          </div>
        </div>
        <div className="scroller" ref={ref}>
          {items.map((p) => (
            <div key={p.id} style={{ width: 280 }}>
              <ProductCard poster={p} onSelect={(x) => navigate("product", x.id)} onAdd={onAdd} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = ({ t }) => {
  const list = window.HM_DATA.testimonials;
  return (
    <section>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow"><span className="dot"></span>{t.test.eyebrow}</span>
            <h2>{t.test.title}</h2>
            <p>{t.test.sub}</p>
          </div>
          <div className="right">{list.length} reviews · 4.94 avg</div>
        </div>
        <div className="test-grid">
          {list.map((tt, i) => (
            <div key={i} className="test-card">
              <Stars rating={tt.rating} />
              <blockquote>“{tt.body}”</blockquote>
              <div className="who">
                <div className="avatar">{tt.name.split(" ").map(s => s[0]).slice(0, 2).join("")}</div>
                <div>
                  <div className="name">{tt.name}</div>
                  <div className="role">{tt.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = ({ t, lang }) => {
  const faqs = lang === "es" ? window.HM_DATA.faqs_es : window.HM_DATA.faqs_en;
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow"><span className="dot"></span>{t.faq.eyebrow}</span>
            <h2>{t.faq.title}</h2>
            <p>{t.faq.sub}</p>
          </div>
        </div>
        <div className="faq-wrap">
          {faqs.map((f, i) => (
            <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
              <div className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="q">{f.q}</span>
                <span className="toggle"><Icon.Plus /></span>
              </div>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Newsletter = ({ t }) => {
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);
  return (
    <section>
      <div className="container">
        <div className="newsletter">
          <span className="eyebrow center" style={{ justifyContent: "center" }}><span className="dot"></span>{t.news.eyebrow}</span>
          <h2>{t.news.title}</h2>
          <p>{t.news.sub}</p>
          {!done ? (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}>
              <input type="email" placeholder={t.news.placeholder} value={email} onChange={(e) => setEmail(e.target.value)} required />
              <button type="submit" className="btn btn-primary">{t.news.cta} <Icon.Arrow /></button>
            </form>
          ) : (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 22px", borderRadius: 999, background: "rgba(217,13,43,0.1)", border: "1px solid rgba(217,13,43,0.3)", color: "var(--accent)" }}>
              <Icon.Check /> ¡Bienvenido! Revisa tu correo.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

window.LandingSections = { Stats, BestSellers, Artists, HowItWorks, CustomCTA, NewArrivals, Testimonials, FAQ, Newsletter };
