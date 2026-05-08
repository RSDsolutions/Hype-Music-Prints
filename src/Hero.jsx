// Hero.jsx — 4 hero variants selected via tweak

const HeroCollage = ({ t, navigate }) => {
  const posters = window.HM_DATA.posters;
  return (
    <section className="hero">
      <div className="glow" style={{ width: 600, height: 600, background: "rgba(217,13,43,0.5)", top: -150, left: -200 }}></div>
      <div className="glow" style={{ width: 500, height: 500, background: "rgba(230,42,63,0.25)", top: 200, right: -150 }}></div>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="hero-collage-grid">
          <div>
            <span className="eyebrow"><span className="dot"></span>{t.hero.eyebrow}</span>
            <h1>
              {t.hero.h1a}<br />
              <span className="it">{t.hero.h1b}</span>
            </h1>
            <p className="hero-sub">{t.hero.sub}</p>
            <div className="hero-search">
              <Icon.Search />
              <input placeholder={t.hero.search} />
              <button onClick={() => navigate("catalog")}>↗</button>
            </div>
            <div className="hero-cta-row">
              <button className="btn btn-primary" onClick={() => navigate("catalog")}>{t.hero.cta1} <Icon.Arrow /></button>
              <button className="btn btn-ghost" onClick={() => document.querySelector("#how")?.scrollIntoView({ behavior: "smooth" })}>{t.hero.cta2}</button>
            </div>
            <div className="hero-meta">
              <div className="m"><Icon.Download /> {t.hero.stat1}</div>
              <div className="m"><Icon.Frame /> {t.hero.stat2}</div>
              <div className="m"><Icon.Sparkle /> {t.hero.stat3}</div>
            </div>
          </div>
          <div className="hero-collage-art collage" style={{ minHeight: 560 }}>
            {[posters[0], posters[4], posters[7], posters[2], posters[5]].map((p, i) => (
              <div key={p.id} className={`floater f${i + 1}`}>
                <Poster poster={p} framed />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroEditorial = ({ t, navigate }) => {
  const featured = window.HM_DATA.posters[0];
  return (
    <section className="hero" style={{ padding: "40px 0 100px" }}>
      <div className="glow" style={{ width: 800, height: 800, background: "rgba(217,13,43,0.35)", top: -200, left: "30%" }}></div>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="hero-collage-grid">
          <div>
            <span className="eyebrow"><span className="dot"></span>{t.hero.eyebrow}</span>
            <h1 style={{ fontSize: "clamp(72px, 11vw, 180px)" }}>
              <span className="it">{t.hero.h1a.replace(".", "")}</span><br />
              <span className="red">{t.hero.h1b.replace(".", "")}.</span>
            </h1>
            <p className="hero-sub">{t.hero.sub}</p>
            <div className="hero-cta-row">
              <button className="btn btn-primary" onClick={() => navigate("catalog")}>{t.hero.cta1} <Icon.Arrow /></button>
              <button className="btn btn-ghost" onClick={() => document.querySelector("#how")?.scrollIntoView({ behavior: "smooth" })}>{t.hero.cta2}</button>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ transform: "rotate(-3deg) translateY(20px)", animation: "float-y 6s ease-in-out infinite" }}>
              <Poster poster={featured} framed size={420} />
            </div>
            <div style={{ position: "absolute", bottom: -10, right: -10, padding: "10px 16px", borderRadius: 14, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)", border: "1px solid var(--border)", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.1em" }}>
              <div style={{ color: "var(--accent)" }}>// FEATURED</div>
              <div style={{ color: "var(--text)", marginTop: 4 }}>{featured.title.toUpperCase()}</div>
              <div style={{ color: "var(--muted)" }}>{featured.artist}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroMarquee = ({ t, navigate }) => {
  const posters = window.HM_DATA.posters;
  const row1 = [...posters.slice(0, 8), ...posters.slice(0, 8)];
  const row2 = [...posters.slice(6, 14), ...posters.slice(6, 14)];
  return (
    <section className="hero" style={{ padding: "60px 0 60px" }}>
      <div className="glow" style={{ width: 700, height: 700, background: "rgba(217,13,43,0.4)", top: 200, left: "50%", transform: "translateX(-50%)" }}></div>
      <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <span className="eyebrow center" style={{ justifyContent: "center" }}><span className="dot"></span>{t.hero.eyebrow}</span>
        <h1 style={{ fontSize: "clamp(64px, 10vw, 160px)", textAlign: "center" }}>
          {t.hero.h1a} <span className="it">{t.hero.h1b}</span>
        </h1>
        <p className="hero-sub" style={{ margin: "0 auto 28px" }}>{t.hero.sub}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 48, flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={() => navigate("catalog")}>{t.hero.cta1} <Icon.Arrow /></button>
          <button className="btn btn-ghost" onClick={() => document.querySelector("#how")?.scrollIntoView({ behavior: "smooth" })}>{t.hero.cta2}</button>
        </div>
      </div>
      <div className="marquee-fade" style={{ marginTop: 48 }}>
        <div className="marquee-row">
          {row1.map((p, i) => (
            <div key={i} style={{ width: 220, flexShrink: 0 }}>
              <Poster poster={p} framed size={220} />
            </div>
          ))}
        </div>
      </div>
      <div className="marquee-fade" style={{ marginTop: 24 }}>
        <div className="marquee-row reverse">
          {row2.map((p, i) => (
            <div key={i} style={{ width: 200, flexShrink: 0 }}>
              <Poster poster={p} framed size={200} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HeroSearch = ({ t, navigate }) => {
  const posters = window.HM_DATA.posters;
  const grid = [...posters, ...posters].slice(0, 24);
  return (
    <section className="hero" style={{ padding: "0", minHeight: 760, display: "grid", placeItems: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.18 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 12, transform: "rotate(-8deg) scale(1.4) translateY(-40px)", padding: 20 }}>
          {grid.map((p, i) => (
            <div key={i}>
              <Poster poster={p} size={150} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.95) 60%)" }}></div>
      <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <span className="eyebrow center" style={{ justifyContent: "center" }}><span className="dot"></span>{t.hero.eyebrow}</span>
        <h1 style={{ fontSize: "clamp(56px, 9vw, 144px)", textAlign: "center" }}>
          {t.hero.h1a}<br /><span className="it">{t.hero.h1b}</span>
        </h1>
        <p className="hero-sub" style={{ margin: "0 auto 32px" }}>{t.hero.sub}</p>
        <div className="hero-search" style={{ margin: "0 auto 20px", maxWidth: 600, background: "rgba(20,20,22,0.85)", backdropFilter: "blur(12px)" }}>
          <Icon.Search />
          <input placeholder={t.hero.search} />
          <button onClick={() => navigate("catalog")}>{t.hero.cta1.split(" ")[0]} →</button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
          {["Bad Bunny", "Karol G", "Quevedo", "The Weeknd", "Rosalía"].map((q) => (
            <button key={q} className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: 12 }} onClick={() => navigate("catalog")}>{q}</button>
          ))}
        </div>
      </div>
    </section>
  );
};

const Hero = ({ variant, t, navigate }) => {
  switch (variant) {
    case "editorial": return <HeroEditorial t={t} navigate={navigate} />;
    case "marquee": return <HeroMarquee t={t} navigate={navigate} />;
    case "search": return <HeroSearch t={t} navigate={navigate} />;
    case "collage":
    default: return <HeroCollage t={t} navigate={navigate} />;
  }
};
window.Hero = Hero;
