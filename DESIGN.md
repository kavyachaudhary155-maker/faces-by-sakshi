# Design Brief: Faces by Sakshi — World-Class Editorial Makeup Artist Portfolio

## Visual Direction
Vogue/Harper's Bazaar editorial luxury dark portfolio with advanced 3D animations. Deep charcoal near-black (`oklch(0.05 0.008 280)`) paired with rose-gold (`328°`) and champagne gold (`45°`) accents. Signature glow halos on interactive elements signal premium tech sophistication. Serif/sans typography hierarchy signals editorial prestige. Long-form, breathing layout with luxury negative space.

## Tone & Differentiation
Elite makeup artist portfolio, not beauty salon site. Every section layered with 3D depth — rotating geometric particles, parallax scrolling, animated card reveals. Glassmorphic surfaces with backdrop blur. Celebrity credentials and Indian bridal testimonials prominently featured with animated cascading reveals. Refined, intentional, unforgettable.

## Color Palette (OKLCH — Dark Mode Primary)
| Token | Value | Usage |
|-------|-------|-------|
| **Background** | `0.05 0.008 280` | Deep charcoal, near-black base |
| **Card** | `0.09 0.012 280` | Elevated surfaces, glass cards |
| **Foreground** | `0.96 0 0` | High-contrast white text |
| **Primary** | `0.76 0.29 328` | Rose-gold, hero accents, CTAs |
| **Secondary** | `0.72 0.22 45` | Champagne gold, secondary highlights |
| **Accent** | `0.76 0.29 328` | Active states, glowing focus elements |
| **Muted** | `0.14 0.01 280` | Disabled, subtle backgrounds |
| **Destructive** | `0.67 0.26 25` | Warnings (warm red, rose-tinted) |
| **Border** | `0.16 0.012 300` | Subtle dividers with depth hint |

## Typography
**Display**: Lora serif (700, -0.02em spacing) — headlines up to 4.5rem with aggressive leading. Editorial prestige.
**Body**: Plus Jakarta Sans (400/500, -0.015em) — warm, approachable paragraphs. Professional without coldness.
**Mono**: Geist Mono (400) — details, testimonial attribution.
Type Scale: 12→14→16→18→20→24→32→40 | Heading leading: 1.2–1.4 | Body leading: 1.6

## Elevation & Depth
Three-tier shadow hierarchy: `elevation-light` (0 4px 12px), `elevation` (0 12px 32px), `elevation-deep` (0 20px 48px + pink glow). Glow effects: standard pink/gold glow, "intense" variant for hero focus, "soft" variant for subtle accents. Glassmorphic cards with 25–40px backdrop blur and inset highlight borders.

## Structural Zones
| Zone | Treatment | Animation |
|------|-----------|-----------|
| **Hero** | `bg-hero-editorial` (multi-radial gradient), centered profile with glow halo | Rotating cube + orbiting particles, parallax depth |
| **Sections** | `bg-luxury` or `bg-section-alt`, layered radial gradients | Scroll-triggered fade-in-up, staggered reveals |
| **Cards** | `glass-card` with `elevation-deep` + `glow-pink`, rounded-lg | Hover: scale, intensify glow; active: pulse-glow animation |
| **CTAs** | `btn-luxury` with gradient + glow, or outline variant | Glow-pulse on hover, translate-y shift |
| **Testimonials** | Glass cards with avatar + text, carousel loop | Cascade reveal on scroll (slide-fade, staggered delay) |
| **Footer** | `bg-muted/20 border-t border-border` | Minimal, breathing separation |

## Component Patterns
- **Buttons**: Gradient background (rose-gold or gold) with glow halo on hover, rounded-lg, uppercase tracking, smooth transitions
- **Cards**: Rounded-lg, `elevation-deep`, `glow-pink` shadow, glassmorphic fill, hover scales 1.02 + intensifies glow
- **Links**: Accent color with underline, glow-soft on hover
- **Forms**: Muted background, accent border on focus, rounded-md
- **Badges**: Accent background, small text, rounded-full

## Motion Choreography
| Name | Duration | Easing | Purpose |
|------|----------|--------|---------|
| **cube-rotate** | 8s | linear | Hero background 3D geometric spin |
| **spiral** | 6s | ease-in-out | Particles expanding/contracting spiral |
| **drift / drift-alt** | 8s / 10s | ease-in-out | Floating particles asymmetric paths |
| **pulse-glow** | 3s | ease-in-out | Breathing glow intensity, blur pulse |
| **float-bounce** | 4s | cubic-bezier | Card rise & scale on user interaction |
| **slide-fade** | 1s | ease-out | Testimonials cascade reveal |
| **fade-in-up** | 0.6s | ease-out | Section reveals on scroll (intersection observer) |
| **glow-pulse** | 2s | ease-in-out | CTA button breathing glow |

All transitions use `cubic-bezier(0.4, 0, 0.2, 1)` (smooth, intentional).

## Signature Details
1. **Layered glow halos** on hero photo and interactive elements — standard, intense (hero), soft (subtle accents)
2. **Glassmorphic cards** with multi-gradient backgrounds (pink + gold radial) creating depth illusion
3. **3D rotating particles** in hero background (CSS cube-rotate, orbital paths)
4. **Champagne gold secondary** accent for luxe pairing with rose-gold primary
5. **Editorial typography contrast** — large bold serif headlines (4.5rem), warm sans body, refined mono accents
6. **Scroll-triggered cascading reveals** — testimonials, credentials, services all fade-in-up with staggered delays
7. **No pure black** — deep charcoal `oklch(0.05 0.008 280)` avoids flat, harsh feeling

## Anti-Patterns
- No harsh shadows or neon glows (uses soft, layered glow)
- No full-page gradients (uses subtle layered radials with breathing room)
- No generic animations (every keyframe serves editorial luxury narrative)
- No light mode (dark-only design, intentional choice)
- No rainbow color mixing (rose-gold + champagne gold only; greys are charcoal-tinted)

## Constraints
- AA+ contrast maintained across all text–background combinations
- Glow effects are visual delight, not functional contrast
- All @font-face fonts bundled locally (Lora, Plus Jakarta, Geist Mono)
- Animations trigger on scroll/hover, never auto-loop on page load
- Mobile-first responsive design with breakpoints: sm (640px), md (768px), lg (1024px)
