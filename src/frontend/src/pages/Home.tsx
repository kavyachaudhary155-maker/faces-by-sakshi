import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";

// ─── Shared helpers ───────────────────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimCounter({
  target,
  suffix = "",
  duration = 1800,
}: { target: number; suffix?: string; duration?: number }) {
  const { ref, inView } = useInView(0.3);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  gold = false,
}: { eyebrow: string; title: string; subtitle?: string; gold?: boolean }) {
  return (
    <div className="text-center mb-16">
      <p className="text-xs font-body tracking-[0.4em] uppercase text-accent mb-3">
        {eyebrow}
      </p>
      <h2
        className={`font-display font-bold mb-4 ${gold ? "text-gradient-gold" : "text-gradient-pink"}`}
        style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", lineHeight: 1.2 }}
      >
        {title}
      </h2>
      <div
        className={`mx-auto mb-4 ${gold ? "divider-gold" : "divider-pink"}`}
        style={{ maxWidth: 200 }}
      />
      {subtitle && (
        <p className="text-muted-foreground font-body max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
const heroParticles = [
  {
    id: "p0",
    x: "15%",
    y: "20%",
    size: 8,
    color: "rgba(233,30,140,0.7)",
    anim: "float 3s ease-in-out infinite",
    delay: "0s",
  },
  {
    id: "p1",
    x: "80%",
    y: "15%",
    size: 5,
    color: "rgba(212,166,84,0.8)",
    anim: "float 4s ease-in-out infinite",
    delay: "0.5s",
  },
  {
    id: "p2",
    x: "70%",
    y: "70%",
    size: 10,
    color: "rgba(233,30,140,0.5)",
    anim: "float-slow 6s ease-in-out infinite",
    delay: "1s",
  },
  {
    id: "p3",
    x: "25%",
    y: "75%",
    size: 6,
    color: "rgba(212,166,84,0.6)",
    anim: "float 5s ease-in-out infinite",
    delay: "2s",
  },
  {
    id: "p4",
    x: "50%",
    y: "10%",
    size: 4,
    color: "rgba(233,30,140,0.9)",
    anim: "float 2.5s ease-in-out infinite",
    delay: "0.8s",
  },
  {
    id: "p5",
    x: "90%",
    y: "45%",
    size: 7,
    color: "rgba(212,166,84,0.5)",
    anim: "float-slow 7s ease-in-out infinite",
    delay: "1.5s",
  },
  {
    id: "p6",
    x: "5%",
    y: "50%",
    size: 5,
    color: "rgba(233,30,140,0.6)",
    anim: "drift 8s ease-in-out infinite",
    delay: "0.3s",
  },
  {
    id: "p7",
    x: "60%",
    y: "85%",
    size: 9,
    color: "rgba(212,166,84,0.4)",
    anim: "drift-alt 10s ease-in-out infinite",
    delay: "2.5s",
  },
];

const geomShapes = [
  {
    id: "g0",
    x: "8%",
    y: "30%",
    sz: 32,
    border: "rgba(233,30,140,0.5)",
    anim: "cube-rotate 8s linear infinite",
    delay: "0s",
  },
  {
    id: "g1",
    x: "88%",
    y: "20%",
    sz: 24,
    border: "rgba(212,166,84,0.6)",
    anim: "cube-rotate 10s linear infinite reverse",
    delay: "1s",
  },
  {
    id: "g2",
    x: "5%",
    y: "72%",
    sz: 18,
    border: "rgba(233,30,140,0.4)",
    anim: "spiral 6s ease-in-out infinite",
    delay: "2s",
  },
  {
    id: "g3",
    x: "92%",
    y: "65%",
    sz: 28,
    border: "rgba(212,166,84,0.4)",
    anim: "cube-rotate 12s linear infinite",
    delay: "3s",
  },
  {
    id: "g4",
    x: "45%",
    y: "5%",
    sz: 16,
    border: "rgba(233,30,140,0.6)",
    anim: "spiral 7s ease-in-out infinite",
    delay: "0.5s",
  },
  {
    id: "g5",
    x: "75%",
    y: "90%",
    sz: 20,
    border: "rgba(212,166,84,0.5)",
    anim: "cube-rotate 9s linear infinite reverse",
    delay: "4s",
  },
];

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-hero-editorial"
    >
      {/* Deep glow orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          top: "-10%",
          left: "-8%",
          background:
            "radial-gradient(circle at 30% 30%, rgba(233,30,140,0.2), transparent 65%)",
          filter: "blur(60px)",
          animation: "float-slow 10s ease-in-out infinite",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          top: "60%",
          right: "-5%",
          background:
            "radial-gradient(circle, rgba(212,166,84,0.18), transparent 65%)",
          filter: "blur(50px)",
          animation: "float-slow 12s ease-in-out infinite",
          animationDelay: "3s",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 300,
          height: 300,
          top: "30%",
          left: "55%",
          background:
            "radial-gradient(circle, rgba(233,30,140,0.12), transparent 65%)",
          filter: "blur(40px)",
          animation: "drift 9s ease-in-out infinite",
          animationDelay: "1.5s",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(233,30,140,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(233,30,140,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating particles */}
      {heroParticles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            animation: p.anim,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* 3D Geometric floating shapes */}
      {geomShapes.map((g) => (
        <div
          key={g.id}
          className="absolute pointer-events-none"
          style={{
            left: g.x,
            top: g.y,
            width: g.sz,
            height: g.sz,
            border: `1px solid ${g.border}`,
            transform: "rotateX(45deg) rotateY(45deg)",
            boxShadow: `0 0 ${g.sz / 2}px ${g.border}`,
            animation: g.anim,
            animationDelay: g.delay,
            perspective: "400px",
          }}
        />
      ))}

      <div className="section-container relative z-10 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Editorial Text */}
          <div
            className="text-center lg:text-left"
            style={{ animation: "fade-in-up 0.8s ease-out both" }}
          >
            <div
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-card-strong luxury-border mb-8"
              style={{ animation: "fade-in-up 0.5s ease-out both" }}
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-glow-pulse" />
              <span className="text-xs font-body tracking-[0.3em] uppercase text-muted-foreground">
                Available for Bookings
              </span>
            </div>

            <div
              className="mb-2"
              style={{ animation: "slide-in-left 0.8s ease-out 0.1s both" }}
            >
              <span className="font-body text-xs tracking-[0.5em] uppercase text-muted-foreground block mb-3">
                — Premium Makeup Artist, Noida —
              </span>
            </div>

            <h1
              className="font-display font-bold leading-none mb-6"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 6.5rem)",
                letterSpacing: "-0.03em",
                animation: "fade-in-up 0.8s ease-out 0.2s both",
              }}
            >
              <span className="block text-gradient-editorial">ART.</span>
              <span
                className="block text-gradient-pink"
                style={{ animationDelay: "0.3s" }}
              >
                BEAUTY.
              </span>
              <span
                className="block text-gradient-gold"
                style={{ animationDelay: "0.4s" }}
              >
                SAKSHI.
              </span>
            </h1>

            <p
              className="font-display text-lg md:text-xl italic text-muted-foreground mb-2"
              style={{ animation: "fade-in-up 0.7s ease-out 0.5s both" }}
            >
              Professional Makeup Artist · Bridal Specialist
            </p>
            <p
              className="font-body text-base text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
              style={{ animation: "fade-in-up 0.7s ease-out 0.6s both" }}
            >
              Crafting flawless transformations for brides, celebrities &amp;
              editorial campaigns. Trusted by Bollywood's finest. Based in Noida
              — serving all of India.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-14"
              style={{ animation: "fade-in-up 0.7s ease-out 0.7s both" }}
            >
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="hero-cta-book"
                className="btn-luxury px-10 py-4 rounded-full text-white text-xs tracking-widest uppercase font-semibold"
              >
                Book Your Look
              </button>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("portfolio")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="hero-cta-portfolio"
                className="btn-luxury-outline px-10 py-4 rounded-full text-xs tracking-widest uppercase font-semibold"
              >
                View Portfolio
              </button>
            </div>

            {/* Stats row */}
            <div
              className="grid grid-cols-3 gap-4 border-t luxury-border pt-8"
              style={{ animation: "fade-in-up 0.7s ease-out 0.8s both" }}
            >
              {[
                { n: 500, suf: "+", label: "Happy Brides" },
                { n: 8, suf: "+", label: "Years Artistry" },
                { n: 50, suf: "+", label: "Celebrity Clients" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-3xl md:text-4xl font-bold text-gradient-pink">
                    <AnimCounter target={s.n} suffix={s.suf} />
                  </div>
                  <div className="text-xs text-muted-foreground tracking-wide uppercase font-body mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Editorial Portrait */}
          <div
            className="flex justify-center lg:justify-end"
            style={{ animation: "slide-in-right 1s ease-out 0.3s both" }}
          >
            <div className="relative">
              {/* Glow rings */}
              <div className="absolute -inset-8 rounded-3xl border border-primary/15 animate-rotate-slow pointer-events-none" />
              <div
                className="absolute -inset-14 rounded-3xl border border-secondary/10 animate-rotate pointer-events-none"
                style={{ animationDirection: "reverse" }}
              />
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none animate-glow-pulse"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(233,30,140,0.3) 0%, transparent 65%)",
                  transform: "scale(1.15)",
                }}
              />

              {/* Main image */}
              <div
                className="relative rounded-2xl overflow-hidden shadow-glow-pink-lg"
                style={{ width: 360, maxWidth: "85vw" }}
              >
                <img
                  src="/assets/look1.png"
                  alt="Sakshi — red flame editorial makeup — Faces by Sakshi"
                  className="w-full object-cover"
                  style={{ height: 480, objectPosition: "top center" }}
                />

                {/* Cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Floating badge */}
                <div className="absolute bottom-4 left-4 right-4 glass-card-strong rounded-xl px-4 py-3 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: "linear-gradient(135deg,#e91e8c,#c2185b)",
                    }}
                  >
                    <span className="text-white font-display font-bold text-xs">
                      FS
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-display font-bold text-foreground truncate">
                      Faces by Sakshi
                    </p>
                    <p className="text-xs text-accent font-body tracking-wider">
                      Bridal · Celebrity · Editorial
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating accent card */}
              <div
                className="absolute -right-6 top-1/3 glass-card-gold rounded-xl p-3 luxury-border-gold shadow-glow-gold"
                style={{ animation: "float 4s ease-in-out infinite" }}
              >
                <p className="text-xs font-body text-muted-foreground">
                  Experience
                </p>
                <p className="font-display font-bold text-gradient-gold text-lg">
                  8+ Yrs
                </p>
              </div>

              {/* Floating left card */}
              <div
                className="absolute -left-6 top-2/3 glass-card rounded-xl p-3 luxury-border"
                style={{
                  animation: "float-slow 5s ease-in-out infinite",
                  animationDelay: "1s",
                }}
              >
                <p className="text-xs font-body text-muted-foreground">
                  Satisfied
                </p>
                <p className="font-display font-bold text-gradient-pink text-lg">
                  500+ Brides
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ animation: "float 3s ease-in-out infinite" }}
      >
        <span className="text-xs text-muted-foreground tracking-[0.3em] uppercase font-body">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-accent/60 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-glow-pulse" />
      </div>
    </section>
  );
}

// ─── Portfolio Section ────────────────────────────────────────────────────────
const portfolioItems = [
  {
    img: "/assets/look1.png",
    label: "Red Flame Editorial",
    cat: "Editorial",
    span: "row-span-2",
  },
  {
    img: "/assets/look2.png",
    label: "Soft Glam Portrait",
    cat: "Celebrity",
    span: "",
  },
  {
    img: "/assets/look3.png",
    label: "Indian Bridal Red Saree",
    cat: "Bridal",
    span: "",
  },
  {
    img: "/assets/look4.png",
    label: "Bridal White Lehenga",
    cat: "Fashion",
    span: "",
  },
  {
    img: "/assets/look5.png",
    label: "Classic Bridal Gold",
    cat: "Bridal",
    span: "",
  },
  {
    img: "/assets/generated/portfolio-fashion-bridal.dim_600x750.jpg",
    label: "Rose Gold Bridal",
    cat: "Bridal",
    span: "",
  },
  {
    img: "/assets/generated/portfolio-editorial.dim_600x750.jpg",
    label: "Editorial Artistry",
    cat: "Editorial",
    span: "",
  },
];

function PortfolioSection() {
  const { ref, inView } = useInView(0.1);
  return (
    <section
      id="portfolio"
      className="relative py-24 bg-luxury overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(212,166,84,1), transparent)",
          filter: "blur(80px)",
        }}
      />

      <div className="section-container" ref={ref}>
        <SectionHeader
          eyebrow="Gallery"
          title="PORTFOLIO"
          subtitle="A curated selection of transformations — each a unique story of beauty, artistry and emotion."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
          {portfolioItems.map((item, i) => (
            <div
              key={item.label}
              data-ocid={`portfolio-item-${i}`}
              className={`relative group overflow-hidden rounded-xl luxury-border transition-all duration-500 hover:shadow-glow-pink cursor-pointer ${item.span} ${inView ? "animate-scale-in" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.08}s`, perspective: "800px" }}
            >
              <img
                src={item.img}
                alt={`${item.label} — Faces by Sakshi`}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-xs font-body tracking-widest uppercase text-accent block mb-0.5">
                  {item.cat}
                </span>
                <span className="font-display text-white text-sm font-semibold">
                  {item.label}
                </span>
              </div>
              {/* Glow border on hover */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px rgba(233,30,140,0.5)" }}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com/facesbySakshi"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="portfolio-instagram-cta"
            className="inline-flex items-center gap-2 btn-luxury-outline px-8 py-3 rounded-full text-sm"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-current text-accent"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            View Full Gallery on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────
const services = [
  {
    icon: "👰",
    title: "Bridal Makeup",
    tagline: "Your Most Radiant Day",
    desc: "Complete bridal transformation — HD airbrush, long-lasting formulas, intricate detailing that photographs beautifully from every angle.",
    price: "₹8,000 onwards",
    highlight: true,
  },
  {
    icon: "⭐",
    title: "Celebrity Makeup",
    tagline: "Red Carpet Ready",
    desc: "Premium artistry for film shoots, TV appearances, and public events. Trusted by Bollywood celebrities for flawless on-screen looks.",
    price: "₹12,000 onwards",
    highlight: false,
  },
  {
    icon: "📸",
    title: "Editorial & Shoots",
    tagline: "Fashion Forward",
    desc: "High-fashion editorial makeup for magazine shoots, ad campaigns, and fashion weeks. Bold, experimental, breathtakingly artistic.",
    price: "₹10,000 onwards",
    highlight: false,
  },
  {
    icon: "💎",
    title: "Engagement Makeup",
    tagline: "Picture Perfect",
    desc: "Soft romantic looks tailored for your ring ceremony. Dewy skin, luminous glow, and timeless elegance that makes every photo a treasure.",
    price: "₹5,000 onwards",
    highlight: false,
  },
  {
    icon: "✨",
    title: "Party Glam",
    tagline: "Unforgettable Nights",
    desc: "Bold, glamorous party makeup for sangeet nights, cocktail parties, and festive celebrations. Drama and sparkle guaranteed.",
    price: "₹3,500 onwards",
    highlight: false,
  },
  {
    icon: "🎬",
    title: "Pre-Wedding Shoot",
    tagline: "Cinematic Romance",
    desc: "Tailored looks for pre-wedding photography — multiple look changes, outdoor-ready formulas, and creative concept-based styling.",
    price: "₹4,500 onwards",
    highlight: false,
  },
];

function ServiceCard({ s, i }: { s: (typeof services)[0]; i: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -14;
    setTilt({ x, y });
  };
  const handleLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-ocid={`service-card-${i}`}
      className={`relative glass-card rounded-2xl p-6 cursor-default group transition-all duration-300 hover:shadow-card-hover ${s.highlight ? "luxury-border-glow" : "luxury-border hover:luxury-border-glow"}`}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
        transition: "transform 0.15s ease-out, box-shadow 0.3s ease-out",
        animationDelay: `${i * 0.1}s`,
      }}
    >
      {s.highlight && (
        <div
          className="absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-body font-semibold tracking-widest uppercase text-white"
          style={{ background: "linear-gradient(135deg, #e91e8c, #c2185b)" }}
        >
          Most Popular
        </div>
      )}
      <div className="text-4xl mb-4 inline-block group-hover:animate-float-bounce">
        {s.icon}
      </div>
      <h3 className="font-display text-xl font-bold text-foreground mb-1">
        {s.title}
      </h3>
      <p className="text-xs text-accent font-body tracking-widest uppercase mb-3">
        {s.tagline}
      </p>
      <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
        {s.desc}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-body font-semibold text-gradient-gold">
          {s.price}
        </span>
        <button
          type="button"
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          data-ocid={`service-book-${i}`}
          className="text-xs px-4 py-2 rounded-full btn-luxury-outline"
        >
          Book
        </button>
      </div>
    </div>
  );
}

function ServicesSection() {
  const { ref, inView } = useInView(0.1);
  return (
    <section
      id="services"
      className="relative py-24 bg-section-alt overflow-hidden"
    >
      <div
        className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full pointer-events-none opacity-8"
        style={{
          background:
            "radial-gradient(circle, rgba(233,30,140,0.8), transparent)",
          filter: "blur(100px)",
        }}
      />

      <div className="section-container relative z-10" ref={ref}>
        <SectionHeader
          eyebrow="What We Offer"
          title="THE ART OF TRANSFORMATION"
          subtitle="Every service is a masterpiece of precision, passion and premium artistry."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`${inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <ServiceCard s={s} i={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Celebrity Credentials Section ───────────────────────────────────────────
const statItems = [
  { n: 500, suf: "+", label: "Bridal Clients" },
  { n: 8, suf: "+", label: "Years Experience" },
  { n: 50, suf: "+", label: "Celebrity Assignments" },
  { n: 15, suf: "+", label: "Brand Collaborations" },
];

const celebNames = [
  "Alka Yagnik",
  "Sonal Chauhan",
  "Amyra Dastur",
  "Sophie Choudry",
  "Ruhi Singh",
  "Aditi Rao Hydari",
  "Bhumi Pednekar",
  "Payal Ghosh",
  "Sonnalli Seygall",
];

const brandNames = [
  "L'Oreal Paris",
  "MAC Cosmetics",
  "NARS",
  "Charlotte Tilbury",
  "Huda Beauty",
  "Kiko Milano",
  "Lancôme",
  "Dior Beauty",
  "Fenty Beauty",
  "Pat McGrath",
  "Vogue India",
  "Femina",
  "Harper's Bazaar India",
  "Elle India",
];

function CredentialsSection() {
  const { ref, inView } = useInView(0.1);
  return (
    <section
      id="credentials"
      className="relative py-24 bg-luxury overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-8"
        style={{
          background:
            "radial-gradient(circle, rgba(212,166,84,0.6), transparent)",
          filter: "blur(100px)",
        }}
      />

      <div className="section-container relative z-10" ref={ref}>
        <SectionHeader
          eyebrow="Recognition & Achievements"
          title="TRUSTED BY THE STARS"
          gold={true}
          subtitle="Bollywood stars, television personalities, and fashion icons trust Sakshi for their most important moments."
        />

        {/* Animated stat counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {statItems.map((stat, i) => (
            <div
              key={stat.label}
              className={`glass-card-gold rounded-2xl p-6 text-center luxury-border-gold-glow transition-all duration-300 hover:shadow-glow-gold hover:-translate-y-1 ${inView ? "animate-scale-in" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="font-display text-4xl font-bold text-gradient-gold mb-1">
                <AnimCounter target={stat.n} suffix={stat.suf} />
              </div>
              <div className="text-xs text-muted-foreground tracking-widest uppercase font-body">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Celebrity names with two real photos side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          <div className="glass-card rounded-2xl luxury-border-glow p-6">
            <p className="text-xs font-body tracking-[0.4em] uppercase text-accent text-center mb-5">
              ✨ Celebrity Clients ✨
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {celebNames.map((name, i) => (
                <div
                  key={name}
                  className="px-4 py-2 rounded-full glass-card-strong luxury-border transition-smooth hover:luxury-border-glow hover:-translate-y-1"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <span className="text-sm font-body font-semibold text-foreground">
                    {name}
                  </span>
                </div>
              ))}
              <div
                className="px-4 py-2 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(233,30,140,0.15),rgba(194,24,91,0.15))",
                  border: "1px solid rgba(233,30,140,0.4)",
                }}
              >
                <span className="text-sm font-body font-semibold text-accent">
                  & Many More
                </span>
              </div>
            </div>
          </div>

          {/* Two real portfolio photos */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative overflow-hidden rounded-xl luxury-border group">
              <img
                src="/assets/look3.png"
                alt="Indian bridal red saree makeup — Faces by Sakshi"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ minHeight: 180 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-2 left-3">
                <span className="text-xs font-body font-semibold text-accent tracking-wide block">
                  Bridal
                </span>
                <span className="text-xs text-white font-display">
                  Red Saree Look
                </span>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl luxury-border group">
              <img
                src="/assets/look4.png"
                alt="Indian bridal white lehenga makeup — Faces by Sakshi"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ minHeight: 180 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-2 left-3">
                <span className="text-xs font-body font-semibold text-accent tracking-wide block">
                  Bridal
                </span>
                <span className="text-xs text-white font-display">
                  White Lehenga
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand ticker */}
        <div className="glass-card rounded-2xl luxury-border-gold p-4 overflow-hidden">
          <p className="text-xs font-body tracking-[0.4em] uppercase text-secondary text-center mb-4">
            Brand Collaborations & Products Used
          </p>
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div
              className="flex gap-8 whitespace-nowrap"
              style={{ animation: "marquee 25s linear infinite" }}
            >
              {brandNames.map((b) => (
                <span
                  key={`brand-a-${b}`}
                  className="font-display text-sm font-semibold text-gradient-gold opacity-80 shrink-0"
                >
                  {b} <span className="text-accent opacity-50 mx-2">◆</span>
                </span>
              ))}
              {brandNames.map((b) => (
                <span
                  key={`brand-b-${b}`}
                  className="font-display text-sm font-semibold text-gradient-gold opacity-80 shrink-0"
                >
                  {b} <span className="text-accent opacity-50 mx-2">◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
const whyUsPoints = [
  {
    icon: "💄",
    title: "International-Grade Products",
    desc: "Charlotte Tilbury, MAC, NARS, Huda Beauty, and professional airbrush systems for flawless long-lasting results.",
  },
  {
    icon: "🎨",
    title: "Personalized Artistry",
    desc: "Every look is tailored to your bone structure, skin tone, outfit and occasion — no cookie-cutter templates.",
  },
  {
    icon: "⏰",
    title: "Punctual & Professional",
    desc: "Our team arrives 15 minutes early, fully prepared. Your special day runs smoothly without stress.",
  },
  {
    icon: "📸",
    title: "Photography Optimized",
    desc: "Specialized in HD makeup that looks ethereal both in person and in photographs. Every detail is camera-perfect.",
  },
  {
    icon: "🌸",
    title: "Certified Hygiene Standards",
    desc: "Strict sanitation protocols, single-use tools, and premium skin-prep for every client. Your skin is our highest priority.",
  },
  {
    icon: "✈️",
    title: "On-Location Service",
    desc: "We come to you — hotel suites, bridal homes, film sets. Luxury service delivered wherever you are.",
  },
];

function WhyUsSection() {
  const { ref, inView } = useInView(0.1);
  return (
    <section
      id="why-us"
      className="relative py-24 bg-section-alt overflow-hidden"
    >
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-60 rounded-full pointer-events-none opacity-8"
        style={{
          background:
            "radial-gradient(ellipse, rgba(233,30,140,0.5), transparent)",
          filter: "blur(80px)",
        }}
      />

      <div className="section-container relative z-10" ref={ref}>
        <SectionHeader
          eyebrow="Our Difference"
          title="WHY CHOOSE SAKSHI"
          subtitle="8+ years of perfecting the art of transformation. Excellence isn't just our promise — it's our standard."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyUsPoints.map((point, i) => (
            <div
              key={point.title}
              data-ocid={`whyus-card-${i}`}
              className={`relative glass-card rounded-2xl p-6 luxury-border hover:luxury-border-glow transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover group ${inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/40 to-transparent rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-4xl mb-4 inline-block group-hover:animate-float">
                {point.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-3">
                {point.title}
              </h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Reviews — 3D Carousel ────────────────────────────────────────────────────
const reviews = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    text: "Sakshi is an absolute magician! My bridal makeup was nothing short of breathtaking. She understood my vision perfectly and made me look like a Bollywood heroine. My photographer said it was the best bridal makeup he'd ever captured.",
    occasion: "Bridal Makeup",
    avatar: "PS",
  },
  {
    name: "Anjali Mehra",
    location: "Noida",
    rating: 5,
    text: "I was skeptical, but Sakshi exceeded every expectation. The look lasted 12 hours without a single touch-up. Absolutely magical hands — she transformed my daughter beautifully for her engagement!",
    occasion: "Engagement Makeup",
    avatar: "AM",
  },
  {
    name: "Kavya Nair",
    location: "Mumbai",
    rating: 5,
    text: "As someone who works in the film industry, I'm extremely particular about makeup. Sakshi's technique is unmatched — she knows exactly how to make you look stunning under bright studio lights.",
    occasion: "Celebrity Makeup",
    avatar: "KN",
  },
  {
    name: "Ritu Gupta",
    location: "Gurgaon",
    rating: 5,
    text: "Booked Sakshi for my sister's wedding — she handled 6 family members seamlessly. Professional, punctual, and absolutely talented. Everyone looked stunning. The bridal photos went viral on Instagram!",
    occasion: "Wedding Party",
    avatar: "RG",
  },
  {
    name: "Simran Kaur",
    location: "Chandigarh",
    rating: 5,
    text: "The best investment of my wedding! Sakshi's work is precise, artistic, and deeply thoughtful. She took time to understand my skin type and chose products that kept me glowing all day long.",
    occasion: "Bridal Makeup",
    avatar: "SK",
  },
  {
    name: "Neha Joshi",
    location: "Lucknow",
    rating: 5,
    text: "I hired Sakshi for a corporate event photoshoot. The look was perfectly professional yet glamorous — exactly what I needed. She transformed me in 45 minutes flat. Already booked her again!",
    occasion: "Party Glam",
    avatar: "NJ",
  },
];

function ReviewsSection() {
  const [active, setActive] = useState(0);
  const total = reviews.length;

  useEffect(() => {
    const id = setInterval(() => setActive((prev) => (prev + 1) % total), 4000);
    return () => clearInterval(id);
  }, [total]);

  const getPos = (i: number) => {
    const diff = (i - active + total) % total;
    if (diff === 0) return "center";
    if (diff === 1 || diff === total - 1)
      return diff === 1 ? "right1" : "left1";
    if (diff === 2 || diff === total - 2)
      return diff === 2 ? "right2" : "left2";
    return "hidden";
  };

  const posStyles: Record<string, React.CSSProperties> = {
    center: {
      transform: "translateX(0) scale(1) rotateY(0deg)",
      zIndex: 10,
      opacity: 1,
    },
    right1: {
      transform: "translateX(55%) scale(0.82) rotateY(-15deg)",
      zIndex: 7,
      opacity: 0.7,
    },
    left1: {
      transform: "translateX(-55%) scale(0.82) rotateY(15deg)",
      zIndex: 7,
      opacity: 0.7,
    },
    right2: {
      transform: "translateX(100%) scale(0.65) rotateY(-25deg)",
      zIndex: 5,
      opacity: 0.35,
    },
    left2: {
      transform: "translateX(-100%) scale(0.65) rotateY(25deg)",
      zIndex: 5,
      opacity: 0.35,
    },
    hidden: { opacity: 0, zIndex: 0, transform: "translateX(0) scale(0.5)" },
  };

  return (
    <section id="reviews" className="relative py-24 bg-luxury overflow-hidden">
      <div className="section-container">
        <SectionHeader
          eyebrow="Client Stories"
          title="GLOWING REVIEWS"
          subtitle="Real words from real brides, celebrities and clients across India who trusted Sakshi."
        />

        <div
          className="relative h-[380px] flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          {reviews.map((review, i) => {
            const pos = getPos(i);
            return (
              <button
                key={review.name}
                type="button"
                data-ocid={`review-card-${i}`}
                className="absolute w-full max-w-md glass-card rounded-2xl p-6 flex flex-col cursor-pointer text-left"
                style={{
                  transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
                  ...posStyles[pos],
                  ...(pos === "center"
                    ? {
                        border: "1px solid rgba(233,30,140,0.4)",
                        boxShadow: "0 0 40px rgba(233,30,140,0.25)",
                      }
                    : { border: "1px solid rgba(255,255,255,0.06)" }),
                }}
                onClick={() => setActive(i)}
                aria-label={`Review by ${review.name}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-display font-bold text-sm shrink-0"
                    style={{
                      background: "linear-gradient(135deg,#e91e8c,#c2185b)",
                      boxShadow: "0 0 15px rgba(233,30,140,0.4)",
                    }}
                  >
                    {review.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-semibold text-foreground truncate">
                      {review.name}
                    </p>
                    <p className="text-xs text-muted-foreground font-body">
                      {review.location}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-0.5 shrink-0">
                    {["s1", "s2", "s3", "s4", "s5"].map((k) => (
                      <span key={k} className="text-yellow-400 text-sm">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-body leading-relaxed flex-1 italic mb-4 line-clamp-4">
                  "{review.text}"
                </p>
                <div
                  className="inline-flex self-start px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(233,30,140,0.1)",
                    border: "1px solid rgba(233,30,140,0.25)",
                  }}
                >
                  <span className="text-xs font-body text-accent">
                    {review.occasion}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((review, i) => (
            <button
              type="button"
              key={`dot-${review.name}`}
              onClick={() => setActive(i)}
              data-ocid={`review-dot-${i}`}
              className="transition-all duration-300"
              style={{
                width: active === i ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background:
                  active === i
                    ? "rgba(233,30,140,0.8)"
                    : "rgba(233,30,140,0.25)",
              }}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>

        <div className="mt-12 text-center glass-card rounded-2xl p-8 luxury-border-glow max-w-lg mx-auto">
          <p className="font-display text-5xl font-bold text-gradient-pink mb-2">
            4.9/5
          </p>
          <div className="flex justify-center gap-1 mb-2">
            {["s1", "s2", "s3", "s4", "s5"].map((k) => (
              <span key={k} className="text-yellow-400 text-xl">
                ★
              </span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground font-body">
            Based on 200+ verified reviews across platforms
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
  const { ref, inView } = useInView(0.2);
  return (
    <section className="relative py-20 overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(233,30,140,0.18) 0%, oklch(0.05 0.008 280) 40%, rgba(212,166,84,0.12) 100%)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(233,30,140,0.25), transparent)",
            filter: "blur(60px)",
            animation: "pulse-glow 3s ease-in-out infinite",
          }}
        />
      </div>

      <div className="section-container relative z-10 text-center">
        <div
          className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className="text-5xl mb-6 inline-block"
            style={{
              animation:
                "float-bounce 4s cubic-bezier(0.34,1.56,0.64,1) infinite",
            }}
          >
            💄
          </div>
          <h2
            className="font-display font-bold text-gradient-pink mb-4"
            style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
          >
            Your Dream Look Awaits
          </h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto mb-10 text-lg leading-relaxed">
            Every bride deserves to feel like a queen. Every moment deserves to
            be extraordinary. Let Sakshi create your most memorable
            transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:07217666375"
              data-ocid="cta-banner-call"
              className="btn-luxury inline-flex items-center gap-2 px-10 py-4 rounded-full text-white text-sm"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current"
              >
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              Call Now: 07217666375
            </a>
            <a
              href="https://wa.me/917217666375"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="cta-banner-whatsapp"
              className="btn-luxury-outline inline-flex items-center gap-2 px-10 py-4 rounded-full text-sm"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current text-accent"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "How far in advance should I book for bridal makeup?",
    a: "For bridal makeup, we recommend booking at least 3-6 months in advance, especially for peak wedding seasons (October–December and February–April). For other services, 2-4 weeks notice is generally sufficient.",
  },
  {
    q: "Do you offer a trial makeup session before the wedding?",
    a: "Absolutely! A bridal trial is strongly recommended 1-2 months before your wedding day. It allows us to refine your look, test product longevity, and ensure you're completely satisfied. Trial sessions are available at our Noida studio.",
  },
  {
    q: "What makeup brands and products do you use?",
    a: "We exclusively use premium luxury brands including Charlotte Tilbury, MAC Cosmetics, NARS, Huda Beauty, Kiko Milano, Lancôme, and professional airbrush systems. All products are dermatologist-tested and safe for sensitive skin.",
  },
  {
    q: "Can you travel to my location?",
    a: "Yes! We offer on-location services across Delhi NCR including Noida, Gurgaon, Faridabad, and Greater Noida. For destinations outside NCR, travel charges apply. We have also served clients in Mumbai, Jaipur, and internationally.",
  },
  {
    q: "How long does bridal makeup typically take?",
    a: "A complete bridal makeup session takes 2.5–3.5 hours depending on complexity. Pre-wedding shoots take 1.5–2 hours per look change. Party and engagement makeup takes 1–1.5 hours.",
  },
  {
    q: "Is your makeup suitable for all Indian skin tones?",
    a: "Absolutely! Sakshi specializes in enhancing all skin tones, including wheatish, dusky, and dark complexions. We carry an extensive range that complements and celebrates every shade of Indian skin beautifully.",
  },
  {
    q: "What is your cancellation and rescheduling policy?",
    a: "Cancellations made 7+ days in advance receive a full refund minus the booking deposit. Rescheduling is free with 72 hours notice. Last-minute cancellations within 24 hours are non-refundable.",
  },
  {
    q: "Do you provide group bookings for wedding parties?",
    a: "Yes! We offer comprehensive packages for entire wedding parties including the bride, bridesmaids, family members, and guests. Group bookings receive special discounts. Contact us for custom group pricing.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="relative py-24 bg-section-alt overflow-hidden">
      <div className="section-container">
        <SectionHeader
          eyebrow="Got Questions?"
          title="FREQUENTLY ASKED"
          subtitle="Everything you need to know before booking your luxury makeup experience."
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.q.slice(0, 30)}
              data-ocid={`faq-item-${i}`}
              className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${open === i ? "luxury-border-glow shadow-glow-soft" : "luxury-border hover:luxury-border-glow"}`}
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={open === i}
                data-ocid={`faq-toggle-${i}`}
              >
                <span className="font-display text-base font-semibold text-foreground pr-4">
                  {faq.q}
                </span>
                <span
                  className={`shrink-0 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300 text-accent ${open === i ? "rotate-45" : ""}`}
                  style={{ background: "rgba(233,30,140,0.15)" }}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-none stroke-current stroke-2"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 animate-fade-in">
                  <div className="divider-pink mb-3" />
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact & Map Section ────────────────────────────────────────────────────
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
    date: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputCls =
    "w-full px-4 py-3 rounded-xl glass-card luxury-border focus:luxury-border-glow focus:outline-none focus:ring-1 focus:ring-accent/50 text-sm font-body text-foreground placeholder-muted-foreground transition-smooth bg-transparent";
  const labelCls =
    "block text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-2";

  const contactDetails = [
    {
      icon: (
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      ),
      label: "Studio Location",
      content: (
        <address className="not-italic text-sm text-muted-foreground leading-relaxed font-body">
          N Block, Vivek Vihar,
          <br />
          Sector 82, Noida,
          <br />
          Uttar Pradesh 201304
        </address>
      ),
    },
    {
      icon: (
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      ),
      label: "Call / WhatsApp",
      content: (
        <a
          href="tel:07217666375"
          className="text-accent font-semibold font-body text-base hover:glow-soft transition-smooth"
        >
          07217666375
        </a>
      ),
    },
    {
      icon: (
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      ),
      label: "Instagram",
      content: (
        <a
          href="https://www.instagram.com/facesbySakshi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent font-semibold font-body text-base hover:glow-soft transition-smooth"
        >
          @FacesBySakshi
        </a>
      ),
    },
  ];

  return (
    <section id="contact" className="relative py-24 bg-luxury overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-4"
        style={{
          background:
            "radial-gradient(circle, rgba(233,30,140,1), transparent)",
          filter: "blur(120px)",
        }}
      />

      <div className="section-container relative z-10">
        <SectionHeader
          eyebrow="Get In Touch"
          title="BOOK YOUR SESSION"
          subtitle="Ready to transform? Reach out and let's create something extraordinary together."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact Info */}
          <div>
            <div className="glass-card rounded-2xl p-8 luxury-border-glow mb-6">
              <h3 className="font-display text-2xl font-bold text-gradient-pink mb-6">
                Studio Details
              </h3>
              <div className="space-y-5">
                {contactDetails.map((detail) => (
                  <div key={detail.label} className="flex gap-4 items-start">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: "rgba(233,30,140,0.2)",
                        border: "1px solid rgba(233,30,140,0.4)",
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 fill-current text-accent"
                      >
                        {detail.icon}
                      </svg>
                    </div>
                    <div>
                      <p className="font-display text-sm font-semibold text-foreground mb-1">
                        {detail.label}
                      </p>
                      {detail.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 luxury-border">
              <h4 className="font-display text-sm font-bold text-gradient-pink tracking-widest uppercase mb-4">
                Studio Hours
              </h4>
              <div className="space-y-2">
                {[
                  { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
                  { day: "Saturday", time: "7:00 AM – 9:00 PM" },
                  { day: "Sunday", time: "8:00 AM – 7:00 PM" },
                ].map((h) => (
                  <div
                    key={h.day}
                    className="flex justify-between text-sm font-body"
                  >
                    <span className="text-muted-foreground">{h.day}</span>
                    <span className="text-accent font-semibold">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="glass-card rounded-2xl luxury-border overflow-hidden mt-6">
              <div className="p-3 border-b luxury-border flex items-center gap-2">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current text-accent shrink-0"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="text-xs font-body font-semibold text-foreground">
                  N Block, Vivek Vihar, Sector 82, Noida 201304
                </span>
              </div>
              <iframe
                title="Faces by Sakshi Studio Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.2!2d77.4126!3d28.6015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzA1LjQiTiA3N8KwMjQnNDUuNCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-56 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Booking Form */}
          <div className="glass-card-strong rounded-2xl p-8 luxury-border-glow">
            {submitted ? (
              <div className="text-center py-12">
                <div
                  className="text-6xl mb-4"
                  style={{ animation: "float 3s ease-in-out infinite" }}
                >
                  💄
                </div>
                <h3 className="font-display text-2xl font-bold text-gradient-pink mb-3">
                  Thank You!
                </h3>
                <p className="text-muted-foreground font-body">
                  Your booking request has been received. Sakshi will contact
                  you within 24 hours to confirm your appointment.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-display text-2xl font-bold text-gradient-pink mb-1">
                  Quick Booking
                </h3>
                <p className="text-sm text-muted-foreground font-body mb-5">
                  Fill in your details and we'll get back to you promptly.
                </p>

                <div>
                  <label htmlFor="booking-name" className={labelCls}>
                    Your Name *
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    data-ocid="contact-name"
                    className={inputCls}
                    placeholder="Priya Sharma"
                  />
                </div>
                <div>
                  <label htmlFor="booking-phone" className={labelCls}>
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    data-ocid="contact-phone"
                    className={inputCls}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="booking-service" className={labelCls}>
                      Service
                    </label>
                    <select
                      id="booking-service"
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      data-ocid="contact-service"
                      className={`${inputCls} bg-card`}
                    >
                      <option value="">Select...</option>
                      <option value="bridal">Bridal Makeup</option>
                      <option value="engagement">Engagement</option>
                      <option value="party">Party Glam</option>
                      <option value="celebrity">Celebrity</option>
                      <option value="editorial">Editorial</option>
                      <option value="prewedding">Pre-Wedding</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="booking-date" className={labelCls}>
                      Date
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      data-ocid="contact-date"
                      className={`${inputCls} bg-card`}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="booking-message" className={labelCls}>
                    Additional Details
                  </label>
                  <textarea
                    id="booking-message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    data-ocid="contact-message"
                    className={`${inputCls} resize-none`}
                    placeholder="Tell us about your occasion, preferences, or any special requirements..."
                  />
                </div>
                <button
                  type="submit"
                  data-ocid="contact-submit"
                  className="w-full btn-luxury py-4 rounded-xl text-white text-sm font-semibold tracking-widest uppercase"
                >
                  Send Booking Request ✨
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Home Page ───────────────────────────────────────────────────────────
export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <PortfolioSection />
      <ServicesSection />
      <CredentialsSection />
      <WhyUsSection />
      <ReviewsSection />
      <CTABanner />
      <FAQSection />
      <ContactSection />
    </Layout>
  );
}
