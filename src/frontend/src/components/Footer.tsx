const year = new Date().getFullYear();
const hostname = typeof window !== "undefined" ? window.location.hostname : "";
const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

const quickLinks = [
  { label: "Services", id: "services" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Credentials", id: "credentials" },
  { label: "Why Us", id: "why-us" },
  { label: "Reviews", id: "reviews" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

const services = [
  "Bridal Makeup",
  "Celebrity Makeup",
  "Party Makeup",
  "Editorial Shoots",
  "Engagement Makeup",
  "Pre-Wedding Looks",
];

export default function Footer() {
  const handleLink = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-section-alt border-t luxury-border">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full glow-pink flex items-center justify-center shrink-0"
                style={{
                  background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                }}
              >
                <span className="font-display text-white font-bold text-base">
                  FS
                </span>
              </div>
              <div>
                <div className="font-display text-lg font-bold text-gradient-pink">
                  Faces by Sakshi
                </div>
                <div className="text-xs text-muted-foreground tracking-widest uppercase">
                  Luxury Makeup Artist
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Transforming beauty with artistry. Specializing in bridal,
              celebrity & editorial makeup for the most important moments of
              your life.
            </p>
            <a
              href="https://www.instagram.com/facesbySakshi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent text-sm font-semibold hover:glow-soft transition-smooth"
              aria-label="Follow Faces by Sakshi on Instagram"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-current"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @FacesBySakshi
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold text-gradient-pink tracking-widest uppercase mb-4">
              Navigate
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => handleLink(l.id)}
                    className="text-sm text-muted-foreground hover:text-accent transition-smooth font-body tracking-wide"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm font-bold text-gradient-pink tracking-widest uppercase mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s}>
                  <span className="text-sm text-muted-foreground font-body">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold text-gradient-pink tracking-widest uppercase mb-4">
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current text-accent shrink-0 mt-0.5"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <address className="not-italic text-sm text-muted-foreground leading-relaxed">
                  N Block, Vivek Vihar,
                  <br />
                  Sector 82, Noida,
                  <br />
                  Uttar Pradesh 201304
                </address>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current text-accent shrink-0"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <a
                  href="tel:07217666375"
                  className="text-sm text-accent hover:glow-soft transition-smooth font-semibold"
                >
                  07217666375
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="divider-pink mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-body">
            © {year} Faces by Sakshi. All rights reserved. | Luxury Makeup
            Studio, Noida
          </p>
          <p className="text-xs text-muted-foreground font-body">
            Built with love using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:glow-soft transition-smooth"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
