# SecureOps Post-Hero Sophos-Inspired Redesign

Date: 2026-06-18

## Objective

Redesign the SecureOps homepage sections immediately after the hero so the page follows the same narrative rhythm as Sophos while keeping SecureOps brand, Vietnamese copy, and original assets.

This is a phase 1 homepage redesign. It starts after `Hero` and ends before the existing Products section.

## Source Material

Read these before implementation:

- `data/sophos_crawl/sophos_home.html`
- `data/sophos_crawl/sophos_summary.md`
- `src/app/(frontend)/page.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/LogoMarquee.tsx`
- `src/components/sections/ValueProps.tsx`
- `src/components/sections/FocusSection.tsx`
- `src/components/sections/FeatureBlock.tsx`
- `src/app/(frontend)/globals.css`
- Reference screenshots if present: `image_1.png` for Sophos, `image.png` and `image_2.png` for SecureOps

Do not copy Sophos proprietary images, logos, exact text, or page code. Use the research to reproduce the information architecture, visual rhythm, and interaction pattern in SecureOps language.

## Research Summary

Sophos homepage sequence after hero:

1. Hero with dark cinematic background, central headline, dashboard visual, and three feature cards.
2. `Defeat cyberattacks`: a short explanatory section that bridges the hero to proof and platform detail.
3. Logo/proof band on a light background.
4. `Sophos advantage in cybersecurity`: three pillars, not a generic four-card grid.
5. Platform visual/detail block: `Stop threats before they strike`.
6. Focus-scroll platform section: `Adaptive AI-native cybersecurity platform` with `Dynamic Defenses`, `Battle-proven AI`, and `Open Ecosystem`.
7. Product coverage bento: `Sophos has you covered`.
8. Solutions/use cases.
9. Customer proof/case-study slider.
10. X-Ops and thought-leadership sections.

The important pattern is not the exact visuals. The important pattern is narrative pacing:

- Strong hero first.
- Bridge section second.
- Proof third.
- Advantage pillars fourth.
- Deep interactive/platform detail only after the value proposition is clear.

## Current SecureOps Issues

Current homepage sequence:

1. `Hero`
2. `LogoMarquee`
3. `ValueProps`
4. `StatsBand`
5. `FocusSection`
6. Products
7. `FeatureBlock`
8. Solutions
9. Testimonials
10. News
11. CTA

Observed issues:

- `LogoMarquee` is only a thin trust strip after a strong hero. It does not bridge the story.
- `ValueProps` is a generic four-card grid and feels less premium than Sophos.
- `StatsBand` is visually isolated and reads like an internal KPI widget rather than public proof.
- `FocusSection` arrives too early and is very tall, so visitors enter a heavy sticky interaction before the offer is clear.
- The first post-hero area lacks a dominant visual anchor. It becomes cards, stats, then sticky content, instead of a clear editorial progression.

## Desired Flow

Replace `LogoMarquee + ValueProps + StatsBand` with:

1. `DefeatCyberattacks`
2. `ProofBand`
3. `AdvantageSection`

Then keep `FocusSection`, but tune it so it feels like the next chapter, not an abrupt long interruption.

The resulting phase 1 homepage sequence:

1. `Hero`
2. `DefeatCyberattacks`
3. `ProofBand`
4. `AdvantageSection`
5. tuned `FocusSection`
6. existing Products section and everything after it

## Visual Thesis

SecureOps should feel like an enterprise cybersecurity platform: dark, precise, confident, and technical, with enough whitespace to feel premium. Use dashboard/product imagery as proof, blue/cyan as action and intelligence signals, and restraint instead of many cards.

## Component Design

### 1. DefeatCyberattacks

Purpose:

- Bridge the hero to the rest of the page.
- Explain what SecureOps does in one clear section.
- Avoid a generic card grid immediately after the hero.

Layout:

- Light section, full width, with constrained inner container.
- Desktop: two columns.
  - Left: eyebrow, H2, paragraph, three capability rows.
  - Right: a large product/security visual using existing SecureOps assets.
- Mobile: copy first, visual second, capability rows stacked.

Suggested copy:

- Eyebrow: `Đánh bại tấn công mạng`
- Heading: `Bảo vệ doanh nghiệp trước mọi giai đoạn tấn công`
- Body: `SecureOps kết hợp AI thích ứng, chuyên gia vận hành 24/7 và nền tảng mở để phát hiện, ngăn chặn và phản ứng trước khi rủi ro lan rộng.`

Capability rows:

1. `Ngăn chặn sớm`
   - `Giảm nguy cơ từ mã độc, khai thác lỗ hổng và hành vi bất thường ngay khi tín hiệu xuất hiện.`
2. `Phản ứng 24/7`
   - `Chuyên gia giám sát, điều tra và phối hợp xử lý sự cố trong mọi khung giờ.`
3. `Tích hợp hệ sinh thái`
   - `Kết nối endpoint, cloud, identity, email và network để giảm điểm mù vận hành.`

Visual direction:

- Prefer existing asset `/secureops/hero-cyber-defense.webp` if it can be cropped differently from the hero.
- Alternative existing asset: `/secureops/solutions-network-defense.webp`.
- Do not create a decorative card wall.
- Use one strong image plane with a small overlay label or metric only if it helps the narrative.

Motion:

- Subtle reveal for copy and visual.
- No excessive hover effects.

### 2. ProofBand

Purpose:

- Combine trust logos and stats into one proof section.
- Make current `LogoMarquee` and `StatsBand` feel intentional.

Layout:

- Light Sophos-style background, preferably close to `#edf2f9`.
- Top: small centered line such as `Đồng hành cùng các doanh nghiệp cần phòng thủ liên tục`.
- Middle: customer logos. They can remain fictional/current seed names, but should be visually muted and evenly spaced.
- Bottom: four stats in a clean horizontal row on desktop, two columns on mobile.

Stats:

- `24/7` - `Giám sát và phản ứng sự cố`
- `52%` - `Sự cố được AI xử lý tự động`
- `99,9%` - `Tỷ lệ phát hiện mối đe dọa`
- `<15ph` - `Thời gian phản ứng trung bình`

Style:

- Avoid a large rounded stats card.
- Use dividers, whitespace, and typography instead of heavy border/shadow.
- Keep proof compact enough to support the next section, not compete with the hero.

Motion:

- If using marquee, keep it subtle and pause on hover.
- Stats can fade in, but should not animate numbers unless already supported cleanly.

### 3. AdvantageSection

Purpose:

- Replace `ValueProps` four-card grid with a clearer Sophos-like three-pillar system.
- Explain why SecureOps is credible and differentiated.

Layout:

- Light background or continuation from proof band.
- Heading centered or left-aligned depending on visual balance.
- Three columns on desktop, stacked on mobile.
- Each column has an icon, heading, short paragraph, and a gradient hairline.

Suggested copy:

Eyebrow: `Lợi thế SecureOps`

Heading: `Ba trụ cột cho phòng thủ an ninh mạng hiện đại`

Pillars:

1. `Phòng ngừa`
   - `Chủ động giảm bề mặt tấn công và chặn kỹ thuật cốt lõi trước khi chúng trở thành sự cố.`
2. `Tin cậy`
   - `AI tăng tốc điều tra, chuyên gia con người giữ phán đoán và chịu trách nhiệm kết quả.`
3. `Nền tảng mở`
   - `Kết nối dữ liệu từ endpoint, network, cloud, identity và email để tạo một quy trình điều tra thống nhất.`

Style:

- Use fewer boxes than current `ValueProps`.
- No heavy shadow.
- Cards are optional. Prefer plain columns with subtle separators.
- Icon size around 40px.
- Hairline gradient can use cyan to primary blue.

Motion:

- Staggered reveal for the three pillars.
- Hover can slightly emphasize the hairline/icon, not move the entire layout dramatically.

### 4. Tuned FocusSection

Purpose:

- Keep the Sophos-inspired focus-scroll chapter, but make it arrive after the visitor understands the promise and proof.

Current issue:

- It is around 3600px tall in local inspection and appears too early.

Required tuning:

- Keep three concepts: `Dynamic Defenses`, `Battle-proven AI`, `Open Ecosystem`.
- Reduce the perceived length or make each slide feel more visual.
- Prefer `height: panels.length * 80vh` or another measured reduction if it still works visually.
- On mobile, avoid a long sticky trap. Use stacked panels or a simple slider-like layout if needed.
- Keep dark oxford/navy background and cyan/blue accents.

Style:

- Reduce glass-card heaviness if it feels like another generic dashboard card.
- Add or preserve one platform visual if available.
- Keep text short.

## Content Constraints

- All public UI copy should be valid Vietnamese with proper encoding.
- Do not introduce mojibake or broken Vietnamese text.
- Do not use long paragraphs in the UI.
- Avoid using visible copy that describes the design itself.
- Keep CTAs consistent with existing routes and labels.

## Implementation Scope

May change:

- `src/app/(frontend)/page.tsx`
- `src/components/sections/LogoMarquee.tsx`
- `src/components/sections/ValueProps.tsx`
- `src/components/sections/FocusSection.tsx`
- new section components under `src/components/sections/`
- `src/app/(frontend)/globals.css` only for small token/style support

Expected implementation:

- Remove `LogoMarquee`, `ValueProps`, and inline `StatsBand` from the homepage render path.
- Add `DefeatCyberattacks`, `ProofBand`, and `AdvantageSection`.
- Tune `FocusSection` after the new sections.
- Keep Products and all following sections in place for this phase.

Do not change:

- Payload CMS schema or collections.
- Product, solution, blog, case study, job detail pages.
- Admin routes.
- Data migration or seed logic unless a text encoding issue directly blocks visible homepage copy.
- Header/Hero except minor spacing compatibility if strictly necessary.

## Acceptance Criteria

- The homepage after `Hero` follows the sequence:
  `DefeatCyberattacks -> ProofBand -> AdvantageSection -> FocusSection -> Products`.
- No generic four-card `ValueProps` section appears immediately after hero.
- Customer proof and stats are combined into a single intentional proof band.
- Advantage content uses three pillars, not four.
- Focus section appears after the new proof and advantage sections.
- Desktop layout is visually balanced at common widths around 1440px and 1920px.
- Mobile layout is readable and does not trap the user in an overly long sticky section.
- Text does not overlap or overflow buttons/cards/sections.
- Vietnamese text renders correctly.
- Existing Products, Solutions, Testimonials, News, and CTA sections still render after the redesigned area.

## Validation Plan

Run:

- `npm run build`

If build is too slow or blocked, run the most relevant cheaper checks available in the repo and document why build could not be completed.

Visual verification:

- Open `http://localhost:3000`.
- Inspect desktop viewport around 1440px wide.
- Inspect mobile viewport around 390px wide.
- Capture or describe screenshots for:
  - section immediately after hero,
  - proof/advantage area,
  - focus section start,
  - transition into Products.

## Pause Conditions

Pause and ask the user if:

- Existing visual assets are insufficient and a new generated image is needed.
- The desired copy meaning is ambiguous.
- Build fails due to unrelated Payload/database/environment configuration.
- The local dev server cannot run.
- A required design choice would expand scope beyond homepage post-hero sections.

## Final Report Requirements

Final report should include:

- Summary of changed section flow.
- Files changed.
- Validation commands run and results.
- Screenshots or visual verification notes.
- Remaining risks or recommended phase 2 improvements.
