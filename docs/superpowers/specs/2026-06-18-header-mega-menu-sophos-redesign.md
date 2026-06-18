# Header Mega Menu Sophos-Inspired Redesign

Date: 2026-06-18

## Objective

Redesign the SecureOps desktop and mobile header navigation so the product and solution catalog is easier to scan, follows the compact three-level information architecture used by Sophos, and removes the current scroll-heavy `Sản phẩm / Giải pháp` mega menu.

The requested direction is option A from the visual review: a full-width Sophos-like mega menu with three top-level navigation entries:

- `Nền tảng`
- `Dịch vụ`
- `Giải pháp`

Each top-level entry opens its own focused mega menu. The menu should show curated category groups and important links, not every CMS item at once.

## Source Material

Read these before implementation:

- `src/components/nav/Header.tsx`
- `src/components/nav/HeaderClient.tsx`
- `src/components/nav/MobileNav.tsx`
- `src/components/nav/nav-data.ts`
- `src/dictionaries/vi.ts`
- `src/lib/queries.ts`
- `src/data/catalog-vi.ts`
- `src/collections/ProductCategories.ts`
- `src/collections/Products.ts`
- `src/collections/SolutionCategories.ts`
- `src/collections/Solutions.ts`
- `data/sophos_crawl/sophos_summary.md`
- `data/sophos_crawl/sophos_catalog.json`
- Sophos public references:
  - `https://www.sophos.com/en-gb`
  - `https://www.sophos.com/en-gb/products`
  - `https://www.sophos.com/en-gb/solutions`

Do not copy Sophos proprietary code, exact menu markup, logos, images, or long copy. Use Sophos as a reference for information architecture, density, hierarchy, and interaction rhythm.

## Research Summary

Sophos avoids presenting the whole catalog in one long mega menu. Their navigation pattern uses a small number of high-level entrances, then exposes compact groups beneath them.

Relevant Sophos patterns:

- Top-level navigation separates major buying contexts such as platform, services, products, solutions, resources, and partners.
- Product and service areas are grouped by category, not dumped as one flat list.
- Category pages such as managed security services, endpoint, cloud native security, workspace protection, and network security act as meaningful second-level entrances.
- Solutions are organized by use case, industry, and compliance needs.
- Menus and pages use contextual CTAs such as speaking with an expert, starting a demo, getting help during an incident, or exploring all solutions.

The important design lesson is the three-layer hierarchy:

1. Top-level intent.
2. Category group.
3. Curated links.

SecureOps should adopt that hierarchy while preserving Vietnamese labels, SecureOps brand styling, existing routes, and Payload CMS content.

## Current SecureOps Issues

Current desktop header:

- Uses a single `Sản phẩm / Giải pháp` nav item.
- Opens one full-width mega menu with two large columns: products and solutions.
- Product and solution columns render many groups and links at once.
- Each column has `max-h-80 overflow-y-auto`, so users must scroll inside the menu.
- The visual weight is high because two catalogs compete in the same panel.
- The structure is technically two layers in the UI, even though the content needs three layers.

Current mobile menu:

- Uses separate `Sản phẩm` and `Giải pháp` accordions.
- Still inherits long CMS-driven lists.
- The mobile interaction is workable, but the information architecture should match the redesigned desktop model.

## Design Decision

Use a full-width mega menu for each of the three new desktop nav entries.

Selected approach: option A, `Full-width Sophos-like`.

Why:

- It matches the Sophos reference most closely.
- It creates clear top-level intent before showing links.
- It avoids internal scrollbars.
- It gives each section enough space for category groups and a contextual CTA.
- It supports future catalog growth through curation instead of raw rendering.

Rejected approaches:

- Side rail mega menu: useful for very large catalogs, but adds interaction complexity and is not needed for the current SecureOps catalog.
- Small dropdowns: simpler to code, but weaker for enterprise positioning and too cramped for category descriptions or CTAs.

## Information Architecture

### Top-Level Nav

Replace the current desktop `Sản phẩm / Giải pháp` item with:

1. `Nền tảng`
2. `Dịch vụ`
3. `Giải pháp`

Keep the existing plain links after these items:

- `Giới thiệu`
- `Khách hàng / Dự án`
- `Tin tức / Blog`
- `Tuyển dụng`
- `Liên hệ`

Keep the existing primary CTA button:

- `Liên hệ tư vấn`

### Nền tảng

Purpose:

- Help users understand SecureOps as a unified security platform and product portfolio.
- Focus on technology/product capabilities.

Groups:

- `Tổng quan nền tảng`
  - `Nền tảng quản lý bảo mật tập trung`
- `Bảo vệ điểm cuối`
  - `Bảo vệ điểm cuối (Endpoint Security)`
  - `Phát hiện & phản ứng điểm cuối (EDR)`
  - `Phát hiện & phản ứng mở rộng (XDR)`
  - `XDR với SIEM thế hệ mới`
  - `Phát hiện & phản ứng mối đe dọa danh tính (ITDR)`
- `Mạng & hạ tầng`
  - `Tường lửa thế hệ mới`
  - `Phát hiện & phản ứng mạng (NDR)`
  - `SD-WAN`
  - `Wi-Fi bảo mật`
  - `Switch mạng`
- `Workspace, email & cloud`
  - `Truy cập mạng Zero Trust (ZTNA)`
  - `Trình duyệt bảo mật`
  - `Bảo vệ DNS`
  - `Bảo vệ email`
  - `Bảo vệ workload đám mây`

CTA card:

- Heading: `Hợp nhất vận hành bảo mật`
- Body: `Quản lý endpoint, network, cloud, identity và email trong một trải nghiệm thống nhất.`
- Primary link: `/san-pham`
- Primary label: `Khám phá sản phẩm`

### Dịch vụ

Purpose:

- Separate expert-led and managed security services from self-managed product capabilities.
- Give emergency response and MDR enough prominence.

Groups:

- `Managed services`
  - `Dịch vụ MDR — Phát hiện & phản ứng được quản lý`
  - `MDR cho môi trường Microsoft`
  - `Quản lý rủi ro chủ động (Managed Risk)`
- `Incident response`
  - `Dịch vụ ứng cứu sự cố`
- `Advisory services`
  - `Dịch vụ kiểm thử bảo mật`

CTA card:

- Heading: `Đang bị tấn công?`
- Body: `Đội ngũ chuyên gia SecureOps sẵn sàng hỗ trợ phản ứng khẩn cấp 24/7.`
- Primary link: `/lien-he`
- Primary label: `Liên hệ khẩn cấp`
- Secondary link: `/san-pham/managed-detection-and-response`
- Secondary label: `Tìm hiểu MDR`

### Giải pháp

Purpose:

- Help users enter by use case, industry, or compliance concern.
- Avoid rendering the entire solution catalog in the header.

Groups:

- `Theo nhu cầu`
  - `Tăng cường phòng thủ mã độc tống tiền`
  - `SecureOps và Microsoft — Mạnh mẽ hơn khi kết hợp`
  - `Bảo vệ email cho Microsoft 365`
  - `Bảo mật cho lực lượng làm việc từ xa`
  - `Ngăn ngừa thất thoát dữ liệu`
- `Theo ngành`
  - `An ninh mạng cho Tài chính – Ngân hàng`
  - `An ninh mạng cho Y tế`
  - `An ninh mạng cho Giáo dục`
  - `An ninh mạng cho Sản xuất`
  - `An ninh mạng cho Bán lẻ`
- `Tuân thủ`
  - `Tuân thủ các Kiểm soát An ninh Trọng yếu (CIS Controls)`
  - `Hỗ trợ tuân thủ GDPR`
  - `Tuân thủ PCI DSS`
  - `Tuân thủ HIPAA`

CTA card:

- Heading: `Tìm đúng giải pháp`
- Body: `Chọn theo rủi ro, ngành hoặc yêu cầu tuân thủ để xây dựng lộ trình phòng thủ phù hợp.`
- Primary link: `/giai-phap`
- Primary label: `Xem tất cả giải pháp`

## Data Model

Current type:

```ts
export type MegaMenuData = {
  productGroups: NavGroup[]
  solutionGroups: NavGroup[]
}
```

Proposed type:

```ts
export type MegaMenuKey = 'platform' | 'services' | 'solutions'

export type MegaMenuLink = {
  label: string
  href: string
  description?: string
}

export type MegaMenuGroup = {
  label: string
  links: MegaMenuLink[]
}

export type MegaMenuCTA = {
  heading: string
  body: string
  primary: MegaMenuLink
  secondary?: MegaMenuLink
}

export type MegaMenuSection = {
  key: MegaMenuKey
  label: string
  overviewHref: string
  eyebrow: string
  heading: string
  description: string
  groups: MegaMenuGroup[]
  cta: MegaMenuCTA
}

export type MegaMenuData = {
  sections: MegaMenuSection[]
}
```

Implementation should use a curated static config for menu intent, matched against CMS records by `slug`.

Rules:

- CMS remains the source for product and solution names and URLs when an item exists.
- The curated config controls which items appear in the header and which group they belong to.
- Match products and solutions by slug.
- If a configured slug is missing from CMS, skip that link.
- If a group has no valid links after filtering, skip that group.
- If a section has no valid groups, render a small empty state instead of an empty panel.
- Keep `overviewHref` even if CMS data is empty, because overview pages are static routes.

This avoids broken links while preventing the header from growing uncontrollably as CMS content expands.

## Desktop Layout

Use one full-width dropdown panel positioned below the main nav, similar to the current absolute mega menu.

Panel structure:

- Full-width white background.
- `max-w-7xl` inner container.
- Grid layout with 12 columns.
- Left intro area: 3 columns.
- Main link groups: 6 columns.
- CTA card: 3 columns.

Suggested desktop structure:

- Intro column:
  - uppercase eyebrow
  - section heading
  - short description
  - `Xem tổng quan` link
- Groups area:
  - 2 or 3 columns depending on available groups
  - group heading
  - up to 5 visible links per group
  - optional bottom `Xem tất cả` link if section benefits from it
- CTA card:
  - dark navy card
  - subtle existing dot-grid background if already available
  - one primary action and optional secondary action

Hard requirements:

- Do not use internal vertical scrollbars in the mega menu.
- Do not render all CMS items.
- Keep panel height comfortably within common desktop viewports.
- Header items must not wrap or overflow at common desktop widths.
- If the extra top-level items make the `lg` layout too tight, move the desktop nav breakpoint to `xl` or reduce nav spacing within the existing design language.
- Avoid nested UI cards inside the CTA card.

## Desktop Interaction

State should change from `openMega: boolean` to an active section key.

Expected behavior:

- Hovering `Nền tảng`, `Dịch vụ`, or `Giải pháp` opens the panel for that section.
- Clicking the active nav item toggles the panel for pointer users.
- Moving from one top-level item to another switches the panel without closing first.
- Moving the pointer outside the header and panel closes the panel.
- Clicking any link closes the panel.
- On the homepage hero, opening a panel should force the white header treatment, preserving existing contrast behavior.

Animation:

- Keep the current short fade/slide transition.
- Avoid large panel motion or delayed interactions.

Accessibility:

- Use `aria-expanded` on each top-level button.
- Use `aria-controls` or a stable panel id for the active section.
- Keep buttons keyboard-focusable.
- Escape key should close the panel if implementation scope allows it without broad refactor.
- Focus styles must remain visible.

## Mobile Layout

Mobile should follow the same information architecture as desktop.

Replace the mobile `Sản phẩm` and `Giải pháp` accordions with:

- `Nền tảng`
- `Dịch vụ`
- `Giải pháp`

Each accordion renders:

- optional one-line section description
- groups
- curated links only
- overview link

Rules:

- Do not open one huge combined product/solution list.
- Keep the existing drawer interaction and CTA button.
- Preserve current close-on-link behavior.
- Long Vietnamese labels should wrap cleanly and not overflow.

## Visual Style

Keep the current SecureOps brand system:

- primary blue/purple action color
- navy CTA card
- white header/panel background
- restrained borders and soft shadows
- existing lucide icons where icons are needed

Do not introduce a new color system. The menu should feel like the current SecureOps header matured into a clearer enterprise navigation system.

Design notes:

- Use compact headings and readable line height.
- Avoid oversized hero-style typography inside the menu.
- Prefer icons only when they help recognition; text hierarchy is enough for the first implementation.
- Cards should keep border radius aligned with the existing site tokens.

## Implementation Scope

May change:

- `src/components/nav/nav-data.ts`
- `src/components/nav/HeaderClient.tsx`
- `src/components/nav/MobileNav.tsx`
- `src/dictionaries/vi.ts`
- small supporting CSS only if needed in `src/app/(frontend)/globals.css`

May add:

- Small helper functions in `src/components/nav/nav-data.ts`
- Local types for section config and curated slug matching

Do not change:

- Payload collections or schema.
- Product/solution page routes.
- Catalog seed/migration data.
- Homepage sections.
- Header logo, emergency utility bar, or primary CTA behavior unless required for compatibility with the new menu state.

## Acceptance Criteria

- Desktop header shows `Nền tảng`, `Dịch vụ`, and `Giải pháp` as separate top-level nav items.
- The old combined `Sản phẩm / Giải pháp` desktop item is removed.
- Each top-level item opens a full-width mega menu.
- Mega menus use three-level hierarchy: top-level section, group, link.
- Mega menus do not require internal vertical scrolling.
- Menu content is curated and does not render every CMS product or solution.
- Missing CMS items are skipped without broken links.
- Empty groups are skipped.
- Empty sections show a small `Đang cập nhật nội dung` fallback.
- Existing plain nav links remain present.
- Existing desktop CTA remains present.
- Mobile drawer uses the same three top-level sections.
- Header visual treatment still works on the homepage hero, scrolled state, and open-menu state.
- Link clicks close the desktop panel and mobile drawer.
- Vietnamese text renders correctly and does not overflow.

## Validation Plan

Focused code checks:

- `npx tsc --noEmit`
- `npm run build` if environment and Payload configuration allow it.

Manual desktop verification:

- Start local app.
- Open homepage.
- At desktop width around 1440px, open `Nền tảng`, `Dịch vụ`, and `Giải pháp`.
- Confirm no internal scrollbars appear inside the mega menus.
- Confirm hover switching between sections is stable.
- Confirm menu closes on link click and mouse leave.
- Confirm header colors remain readable on the hero and after scroll.

Manual mobile verification:

- Test around 390px width.
- Open drawer.
- Expand `Nền tảng`, `Dịch vụ`, and `Giải pháp`.
- Confirm labels wrap cleanly.
- Confirm links close the drawer.
- Confirm CTA remains reachable.

Fallback verification:

- If local CMS data is unavailable, verify the empty-state behavior.
- If build fails due to unrelated DB/env issues, document the failure and run the strongest local type/lint check available.

## Review Checklist

Before calling the implementation complete, review for:

- accidental reintroduction of scroll-heavy menu content
- broken or duplicate links
- slug mismatches between config and CMS data
- inaccessible button states
- hover flicker between nav and panel
- layout overflow at desktop and mobile widths
- unrelated changes to homepage or Payload data

Critical or major findings must be fixed before completion.

## Pause Conditions

Pause and ask the user if:

- The desired top-level labels change from `Nền tảng`, `Dịch vụ`, `Giải pháp`.
- More than five links per group are required in the header.
- A requested link does not exist in the current CMS/routes and needs a new page.
- The implementation would require Payload schema changes.
- Visual verification shows the selected full-width layout cannot fit the catalog without either reducing links or adding another interaction layer.

## Final Report Requirements

Final implementation report should include:

- Summary of the new nav structure.
- Files changed.
- Verification commands run and results.
- Desktop and mobile visual verification notes.
- Any skipped CMS slugs or fallback behavior observed.
