// Poster.jsx — stylized SVG album-cover compositions
// Each "style" produces a distinct visual so the catalog feels real.

const Poster = ({ poster, framed = false, size = 320, showMeta = true }) => {
  const { title, artist, palette, style, year } = poster;
  const w = size;
  const h = Math.round(size * 1.4); // 5:7 poster ratio

  // tracklist mock — same length feels for all
  const tracks = [
    "01  Intro", "02  Tití me preguntó", "03  Después de la playa",
    "04  Me porto bonito", "05  Moscow Mule", "06  Tarot",
    "07  La corriente", "08  Efecto", "09  Party",
    "10  Yo no soy celoso", "11  Un Verano Sin Ti",
  ];

  const ArtComposition = () => {
    const [c0, c1, c2, c3] = palette;
    switch (style) {
      case "tropical":
        return (
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
            <rect width="100" height="100" fill={c0} />
            <circle cx="78" cy="22" r="14" fill={c1} />
            <path d="M0 70 Q30 55 60 75 T100 65 L100 100 L0 100Z" fill={c3} opacity="0.85" />
            <path d="M0 80 Q35 70 65 85 T100 80 L100 100 L0 100Z" fill={c2} opacity="0.7" />
            <path d="M50 50 L48 60 L52 60 Z" fill={c1} />
            <circle cx="50" cy="48" r="5" fill={c1} />
            <circle cx="46" cy="46" r="3" fill={c0} />
            <circle cx="54" cy="46" r="3" fill={c0} />
          </svg>
        );
      case "noir":
        return (
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
            <defs>
              <radialGradient id={`n-${poster.id}`} cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor={c3} stopOpacity="0.6" />
                <stop offset="60%" stopColor={c1} stopOpacity="0.2" />
                <stop offset="100%" stopColor={c0} />
              </radialGradient>
            </defs>
            <rect width="100" height="100" fill={`url(#n-${poster.id})`} />
            <ellipse cx="50" cy="55" rx="22" ry="30" fill={c0} opacity="0.7" />
            <ellipse cx="50" cy="48" rx="14" ry="18" fill={c2} opacity="0.4" />
            <line x1="0" y1="78" x2="100" y2="78" stroke={c3} strokeWidth="0.3" opacity="0.5" />
          </svg>
        );
      case "shadow":
        return (
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
            <rect width="100" height="100" fill={c0} />
            <rect x="10" y="20" width="80" height="60" fill={c1} opacity="0.4" />
            <text x="50" y="55" textAnchor="middle" fill={c2} fontSize="9" fontWeight="900" fontFamily="Inter, sans-serif" letterSpacing="2">REAL</text>
            <text x="50" y="65" textAnchor="middle" fill={c3} fontSize="5" fontFamily="Inter, sans-serif" letterSpacing="3">HASTA LA MUERTE</text>
          </svg>
        );
      case "abstract":
        return (
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
            <rect width="100" height="100" fill={c0} />
            <circle cx="30" cy="40" r="25" fill={c1} opacity="0.7" />
            <circle cx="65" cy="60" r="20" fill={c2} opacity="0.6" />
            <rect x="40" y="20" width="35" height="35" fill={c3} opacity="0.5" />
            <line x1="0" y1="80" x2="100" y2="60" stroke={c2} strokeWidth="0.5" />
          </svg>
        );
      case "portrait":
        return (
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
            <defs>
              <linearGradient id={`p-${poster.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={c1} />
                <stop offset="100%" stopColor={c0} />
              </linearGradient>
            </defs>
            <rect width="100" height="100" fill={`url(#p-${poster.id})`} />
            <circle cx="50" cy="42" r="18" fill={c2} opacity="0.55" />
            <path d="M30 80 Q50 60 70 80 L70 100 L30 100 Z" fill={c3} opacity="0.5" />
            <circle cx="44" cy="40" r="2" fill={c0} />
            <circle cx="56" cy="40" r="2" fill={c0} />
          </svg>
        );
      case "minimal":
        return (
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
            <rect width="100" height="100" fill={c0} />
            <circle cx="50" cy="50" r="30" fill="none" stroke={c2} strokeWidth="0.8" />
            <circle cx="50" cy="50" r="20" fill="none" stroke={c2} strokeWidth="0.5" />
            <circle cx="50" cy="50" r="3" fill={c3} />
            <line x1="50" y1="20" x2="50" y2="80" stroke={c2} strokeWidth="0.3" />
            <line x1="20" y1="50" x2="80" y2="50" stroke={c2} strokeWidth="0.3" />
          </svg>
        );
      case "neon":
        return (
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
            <rect width="100" height="100" fill={c0} />
            <text x="50" y="58" textAnchor="middle" fill={c1} fontSize="22" fontWeight="900" fontFamily="Inter, sans-serif" letterSpacing="-1" style={{ filter: `drop-shadow(0 0 4px ${c1})` }}>STAR</text>
            <text x="50" y="78" textAnchor="middle" fill={c2} fontSize="12" fontWeight="900" fontFamily="Inter, sans-serif" letterSpacing="2">BOY</text>
          </svg>
        );
      case "redblock":
        return (
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
            <rect width="100" height="100" fill={c0} />
            <rect x="0" y="0" width="100" height="55" fill={c1} />
            <circle cx="55" cy="32" r="14" fill={c2} opacity="0.4" />
            <text x="50" y="80" textAnchor="middle" fill={c3} fontSize="14" fontWeight="900" fontFamily="Inter, sans-serif" letterSpacing="3">ANTI</text>
          </svg>
        );
      case "sky":
        return (
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
            <defs>
              <linearGradient id={`s-${poster.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={c0} />
                <stop offset="60%" stopColor={c1} />
                <stop offset="100%" stopColor={c2} />
              </linearGradient>
            </defs>
            <rect width="100" height="100" fill={`url(#s-${poster.id})`} />
            <ellipse cx="70" cy="70" rx="8" ry="2" fill={c3} opacity="0.7" />
            <ellipse cx="40" cy="80" rx="12" ry="3" fill={c3} opacity="0.5" />
            <circle cx="80" cy="20" r="6" fill={c3} opacity="0.4" />
          </svg>
        );
      case "industrial":
        return (
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
            <rect width="100" height="100" fill={c0} />
            {[...Array(20)].map((_, i) => (
              <line key={i} x1={i * 5} y1="0" x2={i * 5} y2="100" stroke={c1} strokeWidth="0.2" />
            ))}
            <rect x="20" y="35" width="60" height="30" fill={c2} opacity="0.8" />
            <text x="50" y="55" textAnchor="middle" fill={c3} fontSize="10" fontWeight="900" fontFamily="Inter, sans-serif">TURR4ZO</text>
          </svg>
        );
      case "vintage":
        return (
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
            <rect width="100" height="100" fill={c2} />
            <circle cx="50" cy="50" r="35" fill={c1} />
            <circle cx="50" cy="50" r="25" fill={c0} />
            <circle cx="50" cy="50" r="3" fill={c3} />
            <text x="50" y="52" textAnchor="middle" fill={c2} fontSize="3.5" fontFamily="Georgia, serif" fontStyle="italic">cosa nuestra</text>
          </svg>
        );
      case "scrapbook":
        return (
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
            <rect width="100" height="100" fill={c3} />
            <rect x="8" y="12" width="35" height="28" fill={c0} transform="rotate(-6 25 26)" />
            <rect x="55" y="18" width="35" height="28" fill={c1} transform="rotate(4 72 32)" />
            <rect x="20" y="55" width="35" height="28" fill={c2} transform="rotate(3 37 69)" />
            <rect x="58" y="58" width="32" height="30" fill={c0} transform="rotate(-4 74 73)" opacity="0.85" />
          </svg>
        );
      case "pastel":
        return (
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
            <defs>
              <radialGradient id={`pa-${poster.id}`} cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor={c0} />
                <stop offset="100%" stopColor={c1} />
              </radialGradient>
            </defs>
            <rect width="100" height="100" fill={`url(#pa-${poster.id})`} />
            <text x="50" y="56" textAnchor="middle" fill={c3} fontSize="16" fontWeight="700" fontFamily="Georgia, serif" fontStyle="italic">Lover</text>
          </svg>
        );
      case "geometric":
        return (
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
            <rect width="100" height="100" fill={c0} />
            <polygon points="20,30 50,15 80,30 65,55 50,40 35,55" fill={c1} />
            <polygon points="20,70 50,55 80,70 50,85" fill={c2} />
            <circle cx="50" cy="40" r="4" fill={c3} />
          </svg>
        );
      default:
        return <div style={{ width: "100%", height: "100%", background: c0 }} />;
    }
  };

  // The card itself — print layout: art on top, tracklist + title at bottom
  const cardInner = (
    <div className="poster-art-wrap" style={{ aspectRatio: "5 / 7", background: "#f4f1ea", display: "flex", flexDirection: "column", overflow: "hidden", borderRadius: framed ? 0 : 2 }}>
      <div style={{ flex: "0 0 62%", position: "relative", overflow: "hidden" }}>
        <ArtComposition />
      </div>
      <div style={{ flex: "1 1 auto", padding: "8% 9% 7%", color: "#0a0a0a", display: "flex", flexDirection: "column", gap: "3%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
          <div style={{ fontSize: "5.5%", lineHeight: 1.15, fontFamily: "'JetBrains Mono', monospace", color: "#222", maxWidth: "55%" }}>
            {tracks.slice(0, 6).map((t, i) => <div key={i} style={{ whiteSpace: "nowrap", overflow: "hidden" }}>{t}</div>)}
          </div>
          <div style={{ fontSize: "5.5%", lineHeight: 1.15, fontFamily: "'JetBrains Mono', monospace", color: "#222", textAlign: "right", maxWidth: "40%" }}>
            <div style={{ whiteSpace: "nowrap" }}>{artist.toUpperCase()}</div>
            <div style={{ whiteSpace: "nowrap" }}>{year}</div>
          </div>
        </div>
        <div style={{ marginTop: "auto", borderTop: "1px solid #0a0a0a", paddingTop: "4%", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontSize: "10%", fontWeight: 900, letterSpacing: "0.04em", lineHeight: 1, fontFamily: "'Space Grotesk', sans-serif" }}>
            {title.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );

  if (framed) {
    return (
      <div style={{ width: w, padding: "8px 8px 10px", background: "#0e0e0e", boxShadow: "0 30px 60px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)", borderRadius: 4 }}>
        {cardInner}
      </div>
    );
  }
  return cardInner;
};

window.Poster = Poster;
