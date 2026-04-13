import { useEffect, useState } from "react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Credentials", href: "#credentials" },
  { label: "Why Us", href: "#why-us" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sectionIds = navLinks.map((l) => l.href.slice(1));
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      data-ocid="nav-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/95 backdrop-blur-lg border-b luxury-border shadow-elevation"
          : "bg-transparent"
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-3 group"
            aria-label="Faces by Sakshi — Home"
          >
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full glow-pink flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                }}
              >
                <span className="font-display text-white font-bold text-sm">
                  FS
                </span>
              </div>
            </div>
            <div className="hidden sm:block text-left">
              <div className="font-display text-sm font-bold text-gradient-pink leading-tight tracking-wide">
                Faces by Sakshi
              </div>
              <div className="text-xs text-muted-foreground tracking-widest uppercase font-body">
                Luxury Makeup Artist
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                data-ocid={`nav-${link.href.slice(1)}`}
                className={`px-4 py-2 text-xs tracking-widest uppercase font-semibold rounded-md transition-smooth font-body ${
                  activeSection === link.href.slice(1)
                    ? "text-accent glow-soft"
                    : "text-muted-foreground hover:text-foreground hover:text-accent"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="tel:07217666375"
              data-ocid="nav-cta-call"
              className="hidden md:flex btn-luxury items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-current"
              >
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              Book Now
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-ocid="nav-mobile-toggle"
              className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-smooth"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-none stroke-current stroke-2"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-none stroke-current stroke-2"
                >
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          data-ocid="nav-mobile-menu"
          className="lg:hidden bg-card/98 backdrop-blur-lg border-t luxury-border"
        >
          <nav className="section-container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-left px-4 py-3 text-sm tracking-widest uppercase font-semibold rounded-md transition-smooth font-body ${
                  activeSection === link.href.slice(1)
                    ? "text-accent bg-secondary/20"
                    : "text-muted-foreground hover:text-accent hover:bg-secondary/10"
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="tel:07217666375"
              className="mt-2 btn-luxury text-center px-5 py-3 rounded-full text-white text-xs tracking-widest uppercase"
            >
              Book Now — 07217666375
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
