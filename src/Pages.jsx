// Pages.jsx — Catalog, Product detail, Cart pages

const CatalogPage = ({ t, navigate, onAdd }) => {
  const [q, setQ] = React.useState("");
  const [genre, setGenre] = React.useState("all");
  const [sort, setSort] = React.useState(0);
  const all = window.HM_DATA.posters;
  const genres = ["all", ...new Set(all.map((p) => p.genre))];

  let filtered = all.filter((p) => (genre === "all" || p.genre === genre) && (q === "" || (p.title + " " + p.artist).toLowerCase().includes(q.toLowerCase())));
  if (sort === 1) filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);
  if (sort === 2) filtered = [...filtered].sort((a, b) => b.year - a.year);
  if (sort === 3) filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <section style={{ padding: "60px 0 100px" }}>
      <div className="container">
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <span className="eyebrow center" style={{ justifyContent: "center" }}><span className="dot"></span>CATÁLOGO</span>
          <h1 style={{ fontSize: "clamp(48px, 7vw, 96px)", letterSpacing: "-0.04em", margin: "16px 0 14px", fontWeight: 600, lineHeight: 1 }}>
            {t.catalog.title}
          </h1>
          <p style={{ color: "var(--text-2)", maxWidth: 480, margin: "0 auto 28px" }}>{t.catalog.sub}</p>
          <div className="hero-search" style={{ margin: "0 auto", maxWidth: 560 }}>
            <Icon.Search />
            <input placeholder={t.hero.search} value={q} onChange={(e) => setQ(e.target.value)} />
            {q && <button onClick={() => setQ("")} style={{ background: "transparent", color: "var(--muted)", padding: "0 12px" }}><Icon.X /></button>}
          </div>
        </div>

        <div className="catalog-grid">
          <aside>
            <div className="filter-block">
              <h4>{t.catalog.genre}</h4>
              {genres.map((g) => (
                <label key={g} className="filter-pill">
                  <input type="radio" name="genre" checked={genre === g} onChange={() => setGenre(g)} />
                  <span style={{ textTransform: g === "all" ? "uppercase" : "none", letterSpacing: g === "all" ? "0.1em" : "0" }}>{g === "all" ? "Todos" : g}</span>
                  <span style={{ marginLeft: "auto", color: "var(--muted)", fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
                    {g === "all" ? all.length : all.filter((p) => p.genre === g).length}
                  </span>
                </label>
              ))}
            </div>
            <div className="filter-block">
              <h4>{t.catalog.price}</h4>
              <label className="filter-pill"><input type="checkbox" /> Bajo $4</label>
              <label className="filter-pill"><input type="checkbox" /> En oferta</label>
              <label className="filter-pill"><input type="checkbox" /> Bundles</label>
            </div>
            <div className="filter-block">
              <h4>Tamaño preferido</h4>
              {["A2 · 42×59cm", "A3 · 30×42cm", "A4 · 21×30cm", "A5 · 15×21cm"].map((s) => (
                <label key={s} className="filter-pill"><input type="checkbox" /> {s}</label>
              ))}
            </div>
          </aside>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
              <span style={{ color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
                {filtered.length} {t.catalog.results}
              </span>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <span style={{ color: "var(--muted)", fontSize: 12, marginRight: 8 }}>{t.catalog.sort}:</span>
                {t.catalog.sortBy.map((s, i) => (
                  <button key={i} onClick={() => setSort(i)}
                    style={{ background: sort === i ? "rgba(217,13,43,0.15)" : "transparent", color: sort === i ? "var(--accent)" : "var(--text-2)", border: 0, padding: "6px 12px", borderRadius: 999, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="products-grid">
              {filtered.map((p) => <ProductCard key={p.id} poster={p} onSelect={(x) => navigate("product", x.id)} onAdd={onAdd} />)}
            </div>
            {filtered.length === 0 && (
              <div style={{ padding: 80, textAlign: "center", color: "var(--muted)" }}>Sin resultados. Prueba otra búsqueda.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductPage = ({ id, t, navigate, onAdd }) => {
  const poster = window.HM_DATA.posters.find((p) => p.id === id) || window.HM_DATA.posters[0];
  const [tab, setTab] = React.useState("includes");
  const [qty, setQty] = React.useState(1);
  const [size, setSize] = React.useState("A3");
  const related = window.HM_DATA.posters.filter((p) => p.artist === poster.artist && p.id !== poster.id).slice(0, 4);
  const fallback = window.HM_DATA.posters.filter((p) => p.id !== poster.id).slice(0, 4);

  return (
    <section style={{ padding: "30px 0 80px" }}>
      <div className="container">
        <div style={{ display: "flex", gap: 8, color: "var(--muted)", fontSize: 13, marginBottom: 12, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          <span style={{ cursor: "pointer" }} onClick={() => navigate("home")}>HOME</span>
          <span>/</span>
          <span style={{ cursor: "pointer" }} onClick={() => navigate("catalog")}>{t.product.crumb}</span>
          <span>/</span>
          <span style={{ color: "var(--text)" }}>{poster.artist}</span>
        </div>

        <div className="product-page">
          <div className="product-stage">
            <div style={{ position: "relative", zIndex: 2, animation: "float-y 7s ease-in-out infinite" }}>
              <Poster poster={poster} framed size={420} />
            </div>
          </div>
          <div className="product-info">
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Stars rating={poster.rating} />
              <span style={{ color: "var(--muted)", fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>{poster.rating} · {poster.reviews} reviews</span>
            </div>
            <h1>{poster.title}</h1>
            <div className="artist-line">{poster.artist} · {poster.year} · {poster.genre}</div>

            <div className="price-row">
              <span className="now">${poster.price.toFixed(2)}</span>
              <span className="was">${poster.was.toFixed(2)}</span>
              <span className="save">-{Math.round((1 - poster.price / poster.was) * 100)}% OFF</span>
            </div>

            <div>
              <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Tamaños incluidos</div>
              <div>
                {["A2", "A3", "A4", "A5"].map((s) => (
                  <span key={s} className="size-pill" onClick={() => setSize(s)}
                    style={{ cursor: "pointer", borderColor: size === s ? "var(--accent)" : "var(--border)", color: size === s ? "var(--accent)" : "var(--text-2)" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="includes-list">
              {[t.product.inc1, t.product.inc2, t.product.inc3, t.product.inc4].map((it) => (
                <div key={it} className="item"><Icon.Check /> {it}</div>
              ))}
            </div>

            <div className="qty-row">
              <span style={{ color: "var(--muted)", fontSize: 13, marginRight: 6 }}>{t.product.qty}</span>
              <div className="qty">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span className="v">{qty}</span>
                <button onClick={() => setQty(qty + 1)}>+</button>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center", padding: "16px 22px", fontSize: 15 }}
                onClick={() => { onAdd(poster, qty); navigate("cart"); }}>
                {t.product.buyNow} <Icon.Arrow />
              </button>
              <button className="btn btn-ghost" style={{ padding: "16px 22px", fontSize: 15 }}
                onClick={() => onAdd(poster, qty)}>
                <Icon.Plus /> {t.product.buy}
              </button>
            </div>

            <div className="tabs">
              {[["includes", t.product.includes], ["tracklist", t.product.tracklist], ["details", t.product.details]].map(([id, label]) => (
                <button key={id} className={`tab ${tab === id ? "on" : ""}`} onClick={() => setTab(id)}>{label}</button>
              ))}
            </div>
            <div className="tab-body">
              {tab === "includes" && (
                <p>Recibirás 4 archivos JPG en alta resolución (300 DPI), uno por cada tamaño estándar. Los archivos llegan a tu correo en menos de 60 segundos tras el pago. Re-descarga ilimitada desde tu cuenta.</p>
              )}
              {tab === "tracklist" && (
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, columnCount: 2, columnGap: 32 }}>
                  {["Intro", "Tití me preguntó", "Después de la playa", "Me porto bonito", "Moscow Mule", "Tarot", "La corriente", "Efecto", "Party", "Yo no soy celoso", "Un Verano Sin Ti", "Andrea"].map((s, i) => (
                    <div key={s} style={{ padding: "6px 0", borderTop: i ? "1px solid var(--border)" : 0, display: "flex", justifyContent: "space-between", color: "var(--text-2)" }}>
                      <span>{String(i + 1).padStart(2, "0")}. {s}</span>
                      <span style={{ color: "var(--muted)" }}>{2 + Math.floor(Math.random() * 3)}:{String(Math.floor(Math.random() * 60)).padStart(2, "0")}</span>
                    </div>
                  ))}
                </div>
              )}
              {tab === "details" && (
                <div>
                  <p>Diseño original inspirado en la estética de <strong style={{ color: "var(--text)" }}>{poster.title}</strong> de {poster.artist}. Cada poster incluye carátula a página completa, lista de canciones tipográfica y código de barras de identificación.</p>
                  <p>Imprímelo en papel fotográfico mate de 200–250g/m² para el mejor resultado. Compatible con marcos estándar IKEA, Amazon y similares.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related */}
        <div style={{ marginTop: 100 }}>
          <div className="section-head">
            <div>
              <span className="eyebrow"><span className="dot"></span>{t.product.related}</span>
              <h2>Más de {poster.artist}</h2>
            </div>
          </div>
          <div className="products-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {(related.length > 0 ? related : fallback).map((p) => (
              <ProductCard key={p.id} poster={p} onSelect={(x) => navigate("product", x.id)} onAdd={onAdd} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CartPage = ({ t, navigate, cart, setCart }) => {
  const [promo, setPromo] = React.useState("");
  const [discount, setDiscount] = React.useState(0);
  const items = cart.map((c) => ({ ...c, poster: window.HM_DATA.posters.find((p) => p.id === c.id) })).filter((x) => x.poster);
  const subtotal = items.reduce((s, i) => s + i.poster.price * i.qty, 0);
  const total = Math.max(0, subtotal - subtotal * discount);

  const updateQty = (id, dq) => setCart((c) => c.map((x) => x.id === id ? { ...x, qty: Math.max(1, x.qty + dq) } : x));
  const remove = (id) => setCart((c) => c.filter((x) => x.id !== id));

  const applyPromo = () => {
    if (promo.toUpperCase() === "HYPE5") setDiscount(0.05);
    else if (promo.toUpperCase() === "HYPE10") setDiscount(0.1);
  };

  return (
    <section style={{ padding: "40px 0 100px", minHeight: 600 }}>
      <div className="container">
        <h1 style={{ fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "-0.035em", marginBottom: 12 }}>{t.cart.title}</h1>
        <div style={{ color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, marginBottom: 40 }}>
          {items.length} {items.length === 1 ? t.cart.item : t.cart.items}
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <Icon.Bag style={{ width: 48, height: 48 }} />
            <h2 style={{ margin: "16px 0", fontSize: 28, fontWeight: 500 }}>{t.cart.empty}</h2>
            <button className="btn btn-primary" onClick={() => navigate("catalog")}>{t.cart.continueShopping} <Icon.Arrow /></button>
          </div>
        ) : (
          <div className="cart-grid">
            <div>
              {items.map((i) => (
                <div key={i.id} className="cart-line">
                  <div className="thumb"><Poster poster={i.poster} size={84} /></div>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 16 }}>{i.poster.title}</div>
                    <div style={{ color: "var(--muted)", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>{i.poster.artist}</div>
                    <div style={{ color: "var(--text-2)", fontSize: 12, marginTop: 8 }}>4 archivos · A2/A3/A4/A5 · 300 DPI</div>
                  </div>
                  <div className="qty">
                    <button onClick={() => updateQty(i.id, -1)}>−</button>
                    <span className="v">{i.qty}</span>
                    <button onClick={() => updateQty(i.id, 1)}>+</button>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 500 }}>${(i.poster.price * i.qty).toFixed(2)}</div>
                    <button onClick={() => remove(i.id)} style={{ background: "none", border: 0, color: "var(--muted)", cursor: "pointer", fontSize: 12, marginTop: 6, padding: 0 }}>{t.cart.remove}</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h3>{t.cart.summary}</h3>
              <div className="summary-row"><span>{t.cart.subtotal}</span><span>${subtotal.toFixed(2)}</span></div>
              {discount > 0 && <div className="summary-row" style={{ color: "var(--accent)" }}><span>{t.cart.discount}</span><span>−${(subtotal * discount).toFixed(2)}</span></div>}
              <div className="promo-row">
                <input placeholder={t.cart.promo + " (HYPE5)"} value={promo} onChange={(e) => setPromo(e.target.value)} />
                <button className="btn btn-ghost" style={{ padding: "10px 16px", fontSize: 13 }} onClick={applyPromo}>{t.cart.apply}</button>
              </div>
              <div style={{ fontSize: 11, color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace", marginBottom: 16 }}>{t.cart.bonus}</div>
              <div className="summary-row total"><span>{t.cart.total}</span><span>${total.toFixed(2)}</span></div>
              <button onClick={() => navigate("checkout")} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "16px 22px", fontSize: 15, marginTop: 18 }}>
                {t.cart.checkout} <Icon.Arrow />
              </button>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 18, color: "var(--muted)", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em" }}>
                <Icon.Check /> Pago seguro · Stripe · PayPal
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const CheckoutPage = ({ t, navigate, cart, setCart }) => {
  const [step, setStep] = React.useState("method"); // method, transfer-receipt, cash-address, receipt-address, final
  const [method, setMethod] = React.useState(null); // "transfer" o "cash"
  const [receipt, setReceipt] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [city, setCity] = React.useState("");

  const items = cart.map((c) => ({ ...c, poster: window.HM_DATA.posters.find((p) => p.id === c.id) })).filter((x) => x.poster);
  const subtotal = items.reduce((s, i) => s + i.poster.price * i.qty, 0);
  const total = subtotal;

  const handleMethodSelect = (m) => {
    setMethod(m);
    if (m === "transfer") setStep("transfer-receipt");
    else setStep("cash-address");
  };

  const handleReceiptSubmit = () => {
    if (receipt.trim()) setStep("receipt-address");
  };

  const handleFinalSubmit = () => {
    if (address.trim() && name.trim() && phone.trim() && city.trim()) {
      setStep("final");
    }
  };

  if (step === "final") {
    return (
      <section style={{ padding: "60px 0 100px", minHeight: 600 }}>
        <div className="container" style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ textAlign: "center", padding: "60px 40px", borderRadius: 24, background: "linear-gradient(135deg, rgba(217,13,43,0.08), rgba(0,0,0,0))", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 48, color: "var(--accent)", marginBottom: 16 }}>✓</div>
            <h1 style={{ fontSize: 40, letterSpacing: "-0.035em", marginBottom: 16 }}>{t.checkout.success}</h1>
            <p style={{ color: "var(--text-2)", fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>{t.checkout.successSub}</p>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, marginBottom: 24, textAlign: "left" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Detalles del pedido</div>
              <div style={{ display: "grid", gap: 12 }}>
                {items.map((i) => (
                  <div key={i.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>
                    <div>
                      <div style={{ fontWeight: 500 }}>{i.poster.title}</div>
                      <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 4 }}>{i.poster.artist} × {i.qty}</div>
                    </div>
                    <div style={{ textAlign: "right", fontWeight: 500 }}>${(i.poster.price * i.qty).toFixed(2)}</div>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600, fontSize: 18, paddingTop: 12 }}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => { setCart([]); navigate("home"); }} style={{ width: "100%", justifyContent: "center", padding: "14px 22px" }}>
              Ir al inicio <Icon.Arrow />
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: "40px 0 100px", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 40, alignItems: "flex-start" }}>
          {/* Form */}
          <div>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", letterSpacing: "-0.035em", marginBottom: 12 }}>{t.checkout.title}</h1>
            <p style={{ color: "var(--text-2)", marginBottom: 40, fontSize: 16 }}>{t.checkout.sub}</p>

            {step === "method" && (
              <div style={{ display: "grid", gap: 16 }}>
                <button onClick={() => handleMethodSelect("transfer")} style={{ padding: 24, border: "1px solid var(--border)", borderRadius: 16, background: "var(--surface)", cursor: "pointer", transition: "all .3s", textAlign: "left" }} onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent)"} onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}>
                  <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Transferencia Bancaria</div>
                  <p style={{ color: "var(--text-2)", margin: 0, fontSize: 14 }}>Realiza una transferencia a nuestra cuenta y recibe los archivos en 24h</p>
                </button>
                <button onClick={() => handleMethodSelect("cash")} style={{ padding: 24, border: "1px solid var(--border)", borderRadius: 16, background: "var(--surface)", cursor: "pointer", transition: "all .3s", textAlign: "left" }} onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent)"} onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}>
                  <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Contraentrega</div>
                  <p style={{ color: "var(--text-2)", margin: 0, fontSize: 14 }}>Paga al recibir tu pedido impreso en tu domicilio</p>
                </button>
              </div>
            )}

            {step === "transfer-receipt" && (
              <div>
                <div style={{ background: "rgba(217,13,43,0.08)", border: "1px solid rgba(217,13,43,0.3)", borderRadius: 16, padding: 24, marginBottom: 24 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Datos Bancarios</div>
                  <div style={{ display: "grid", gap: 12, fontSize: 14 }}>
                    <div>
                      <div style={{ color: "var(--muted)", fontSize: 12, marginBottom: 4 }}>Titular:</div>
                      <div style={{ fontWeight: 500 }}>Hype Music Prints S.L.</div>
                    </div>
                    <div>
                      <div style={{ color: "var(--muted)", fontSize: 12, marginBottom: 4 }}>IBAN:</div>
                      <div style={{ fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>ES91 1234 5678 9012 3456 7890</div>
                    </div>
                    <div>
                      <div style={{ color: "var(--muted)", fontSize: 12, marginBottom: 4 }}>BIC:</div>
                      <div style={{ fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>BBVVESMM</div>
                    </div>
                    <div>
                      <div style={{ color: "var(--muted)", fontSize: 12, marginBottom: 4 }}>Concepto:</div>
                      <div style={{ fontWeight: 500 }}>Pedido #{Math.floor(Math.random() * 100000)}</div>
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", marginBottom: 8, fontSize: 14, color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>Número o ID de recibo</label>
                  <input type="text" placeholder="Ej: TRF-2026-001234" value={receipt} onChange={(e) => setReceipt(e.target.value)} style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text)", fontSize: 14, fontFamily: "inherit" }} />
                </div>
                <button onClick={handleReceiptSubmit} disabled={!receipt.trim()} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px 22px", opacity: receipt.trim() ? 1 : 0.5, cursor: receipt.trim() ? "pointer" : "default" }}>
                  Continuar <Icon.Arrow />
                </button>
              </div>
            )}

            {(step === "receipt-address" || step === "cash-address") && (
              <div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", marginBottom: 8, fontSize: 14, color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>Nombre completo</label>
                  <input type="text" placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text)", fontSize: 14, fontFamily: "inherit" }} />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", marginBottom: 8, fontSize: 14, color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>Teléfono</label>
                  <input type="tel" placeholder="+34 666 123 456" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text)", fontSize: 14, fontFamily: "inherit" }} />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", marginBottom: 8, fontSize: 14, color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>Dirección</label>
                  <input type="text" placeholder="Calle, número, apartamento" value={address} onChange={(e) => setAddress(e.target.value)} style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text)", fontSize: 14, fontFamily: "inherit" }} />
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", marginBottom: 8, fontSize: 14, color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>Ciudad / Región</label>
                  <input type="text" placeholder="Madrid, Barcelona, etc" value={city} onChange={(e) => setCity(e.target.value)} style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text)", fontSize: 14, fontFamily: "inherit" }} />
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={() => setStep("method")} className="btn btn-ghost" style={{ flex: 1, justifyContent: "center", padding: "14px 22px" }}>
                    Atrás
                  </button>
                  <button onClick={handleFinalSubmit} disabled={!address.trim() || !name.trim() || !phone.trim() || !city.trim()} className="btn btn-primary" style={{ flex: 1, justifyContent: "center", padding: "14px 22px", opacity: (address.trim() && name.trim() && phone.trim() && city.trim()) ? 1 : 0.5, cursor: (address.trim() && name.trim() && phone.trim() && city.trim()) ? "pointer" : "default" }}>
                    Confirmar pedido <Icon.Arrow />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="cart-summary" style={{ position: "sticky", top: 100 }}>
            <h3>{t.cart.summary}</h3>
            <div style={{ maxHeight: 300, overflowY: "auto", marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
              {items.map((i) => (
                <div key={i.id} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, color: "var(--text)" }}>{i.poster.title}</div>
                    <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 4 }}>×{i.qty}</div>
                  </div>
                  <div style={{ textAlign: "right", fontWeight: 500 }}>${(i.poster.price * i.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="summary-row"><span>{t.cart.subtotal}</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="summary-row total" style={{ marginTop: 12 }}><span>{t.cart.total}</span><span>${total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

window.Pages = { CatalogPage, ProductPage, CartPage, CheckoutPage };
