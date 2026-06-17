# Planner Report: secureops-post-hero-redesign

Status: READY

Summary:
- Source-of-truth spec is clear: phase 1 starts after `Hero` and ends before existing Products.
- Current homepage flow in `src/app/(frontend)/page.tsx` is `Hero -> LogoMarquee -> ValueProps -> StatsBand -> FocusSection -> Products -> FeatureBlock -> Solutions -> Testimonials -> News -> CTA`.
- Sophos crawl heading order confirms the desired narrative rhythm: hero/cards, `Defeat cyberattacks`, `Sophos advantage in cybersecurity` with `Prevention / Trust / Platform`, platform detail, focus concepts `Dynamic Defenses / Battle-proven AI / Open Ecosystem`, then product coverage.
- Reference screenshots present at repo root show the current SecureOps hero already follows the dark Sophos-inspired hero pattern; the redesign should avoid touching Hero except spacing compatibility.
- Actual source strings are valid UTF-8 Vietnamese; PowerShell may display mojibake. Touched visible copy should still be pasted and verified as proper Vietnamese in browser.
- No blockers found. No code edited by planner.

Relevant files:
- `docs/superpowers/specs/2026-06-18-secureops-post-hero-sophos-redesign.md`: acceptance criteria, desired flow, copy, constraints.
- `data/sophos_crawl/sophos_home.html`: confirms reference heading sequence and focus concepts.
- `data/sophos_crawl/sophos_summary.md`: broader Sophos product/solution research context.
- `src/app/(frontend)/page.tsx`: homepage flow and inline `StatsBand`; imports `LogoMarquee`, `ValueProps`, `FocusSection`, `FeatureBlock`.
- `src/components/sections/Hero.tsx`: existing dark hero, dashboard image, feature-card seam; preserve except compatibility spacing if needed.
- `src/components/sections/LogoMarquee.tsx`: current logo-only trust strip; can be replaced or refactored into `ProofBand`.
- `src/components/sections/ValueProps.tsx`: current four-card grid; replace with three-pillar `AdvantageSection`.
- `src/components/sections/FocusSection.tsx`: current three-panel sticky section uses `panels.length * 100vh`; tune to arrive after proof/advantage and reduce sticky length.
- `src/components/sections/FeatureBlock.tsx`: currently after Products; keep after Products in phase 1 unless compatibility fixes are required.
- `src/app/(frontend)/globals.css`: existing tokens, marquee CSS, gradient text, hero card hover support; only add small token/utilities if needed.
- Assets available: `/secureops/hero-cyber-defense.webp`, `/secureops/solutions-network-defense.webp`, `/secureops/products-security-platform.webp`, `/secureops/abstract-cyber-pattern.webp`.

Implementation plan:
1. Create `src/components/sections/DefeatCyberattacks.tsx`.
   - Client component only if using `Reveal`/motion wrappers; otherwise server component is fine.
   - Use a light full-width section with two-column desktop layout and stacked mobile layout.
   - Left side: eyebrow, h2, short paragraph, three capability rows from the spec in proper Vietnamese.
   - Right side: one strong existing image plane, preferably `/secureops/hero-cyber-defense.webp` cropped differently from Hero; use `/secureops/solutions-network-defense.webp` if duplication feels too strong.
   - Avoid a decorative card wall; at most add one small quiet overlay label/metric.

2. Create or refactor `src/components/sections/ProofBand.tsx`.
   - Reuse the existing fictional logo list from `LogoMarquee.tsx`.
   - Combine logo trust line and the four stats currently in inline `StatsBand`.
   - Use a compact light band around `#edf2f9` or a new subtle CSS token if needed.
   - Use muted wordmark logos and divider/typography-based stats, not a large rounded stats card.
   - Keep marquee behavior only if it remains subtle and pause-on-hover; otherwise a static responsive logo row is acceptable.

3. Create `src/components/sections/AdvantageSection.tsx`.
   - Replace the four-card `ValueProps` concept with three pillars: `Phòng ngừa`, `Tin cậy`, `Nền tảng mở`.
   - Use lucide icons around 40px, short paragraphs, and cyan-to-primary gradient hairlines.
   - Prefer plain columns with separators over heavy boxed cards/shadows.
   - Stagger `Reveal` delays lightly if using existing `Reveal`.

4. Update `src/app/(frontend)/page.tsx`.
   - Remove imports/rendering for `LogoMarquee` and `ValueProps`.
   - Remove inline `StatsBand` from the render path and delete the local function if fully replaced.
   - Add imports and render order: `<Hero />`, `<DefeatCyberattacks />`, `<ProofBand />`, `<AdvantageSection />`, `<FocusSection />`, then existing Products and everything after unchanged.
   - Preserve Products, Solutions, Testimonials, News, CTA rendering and data queries.

5. Tune `src/components/sections/FocusSection.tsx`.
   - Keep concepts: `Dynamic Defenses`, `Battle-proven AI`, `Open Ecosystem`.
   - Reduce desktop scroll track from `panels.length * 100vh` to about `panels.length * 80vh`, then verify it still cross-fades cleanly.
   - On mobile, avoid a long sticky trap. Recommended approach: use responsive classes to disable sticky/tall-track behavior below `lg` and render the three panels as stacked dark cards or a compact vertical sequence.
   - Shorten any long panel body copy if visual testing shows overflow.
   - Reduce glass-card heaviness if it competes with the new proof/advantage sections.

6. Make only minimal style support in `src/app/(frontend)/globals.css`.
   - Add a proof-band background token/utility only if Tailwind arbitrary values become noisy.
   - Keep existing marquee CSS if `ProofBand` uses it; remove unused imports/classes only if no longer referenced.
   - Do not broaden global heading/radius behavior.

7. Validation path for implementer.
   - Run `npm run build`.
   - Start local dev server with `npm run dev` and inspect `http://localhost:3000`.
   - Verify desktop around 1440px and 1920px, and mobile around 390px.
   - Capture/describe: first section after hero, proof/advantage area, focus section start, transition into Products.
   - Specifically check no clipped/overlapping text, Vietnamese diacritics render correctly, Products and later sections still appear.

Risks:
- Reusing `/secureops/hero-cyber-defense.webp` immediately after the hero may feel repetitive; switch to `/secureops/solutions-network-defense.webp` or `/secureops/products-security-platform.webp` if the page looks duplicated.
- FocusSection mobile behavior is the highest layout risk because the current sticky/tall track can feel like a scroll trap.
- Removing `LogoMarquee`/`ValueProps` imports without deleting unused CSS is safe but may leave dead marquee utilities if ProofBand becomes static.
- `npm run build` may surface unrelated Payload/env issues despite query fallbacks; document if unrelated.
- Browser/shell encoding can mislead reviewers; validate Vietnamese in rendered browser, not only PowerShell output.

Questions/blockers:
- No blockers.
- Open design choice for implementer: whether `ProofBand` should keep a subtle marquee or use a static logo row. Recommended: static row on mobile, subtle marquee or evenly spaced row on desktop depending on visual density.
