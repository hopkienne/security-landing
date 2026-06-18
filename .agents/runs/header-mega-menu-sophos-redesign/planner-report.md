# Planner Report: header-mega-menu-sophos-redesign

Status: READY

## Summary

Current code is still on the old combined desktop mega menu:

- `nav-data.ts` returns `{ productGroups, solutionGroups }`.
- `HeaderClient.tsx` renders one `Sản phẩm / Giải pháp` button and a two-column `MegaColumn` panel.
- Desktop menu still has `max-h-80 overflow-y-auto`.
- `MobileNav.tsx` renders separate `Sản phẩm` and `Giải pháp` accordions from the same raw CMS groups.

The spec and implementation plan remain directionally correct, but implementation should be applied carefully because it changes the public `MegaMenuData` shape consumed by both desktop and mobile components.

## Relevant Files Inspected

- `docs/superpowers/specs/2026-06-18-header-mega-menu-sophos-redesign.md`
- `docs/superpowers/plans/2026-06-18-header-mega-menu-sophos-redesign.md`
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
- `src/payload-types.ts`
- `tsconfig.json`
- `package.json`

## Implementation Plan

1. Update `src/components/nav/nav-data.ts`.
   - Replace the old `NavLink`, `NavGroup`, and `{ productGroups, solutionGroups }` model with `MegaMenuKey`, `MegaMenuLink`, `MegaMenuGroup`, `MegaMenuCTA`, `MegaMenuSection`, and `{ sections }`.
   - Keep `getProducts()` and `getSolutions()` as the only required queries; remove `getProductCategories()`.
   - Add a curated static section config for `platform`, `services`, and `solutions`.
   - Resolve configured product/solution slugs against CMS results by slug.
   - Skip missing slugs and empty groups.
   - Preserve section shells even when all CMS data is empty so UI can show the empty state.

2. Update `src/dictionaries/vi.ts`.
   - Add `vi.nav.platform`, `vi.nav.services`, and `vi.cta.overview`.
   - Keep `vi.nav.productsSolutions` for compatibility unless a final cleanup confirms no other references.

3. Update `src/components/nav/HeaderClient.tsx`.
   - Import `MegaMenuKey` and `MegaMenuSection`.
   - Replace `openMega: boolean` state with `activeMega: MegaMenuKey | null`.
   - Derive `openMega` and `activeSection` locally.
   - Replace the single combined button with `menu.sections.map(...)`.
   - Replace `MegaColumn` with a single `MegaPanel` plus CTA card.
   - Use `aria-expanded` per top-level button and stable `aria-controls`.
   - Close on plain-link hover, link click, mouse leave, and Escape.
   - Remove the desktop internal scrollbar class.
   - Consider moving all header desktop/mobile breakpoints from `lg` to `xl` consistently.

4. Update `src/components/nav/MobileNav.tsx`.
   - Import `ArrowRight` and `MegaMenuSection`.
   - Replace product/solution accordions with one accordion per `menu.sections`.
   - Render section description, overview link, curated groups, and empty fallback.
   - Preserve drawer close-on-link behavior and CTA.
   - If desktop breakpoint changes to `xl`, update overlay and drawer visibility to `xl:hidden`.

5. Verify.
   - `rg -n "productGroups|solutionGroups|MegaColumn|overflow-y-auto" src/components/nav`
   - Expected after implementation: no matches in `HeaderClient.tsx`; `MobileNav.tsx` may still contain drawer body `overflow-y-auto`, which is acceptable because it is the mobile drawer, not a desktop mega-menu scrollbar.
   - `npx tsc --noEmit`
   - `npm run build` if env/DB config allows.
   - Manual desktop check around 1440px and mobile check around 390px.

## Risks / Mismatches

- The written plan says `rg ... overflow-y-auto` should have no matches in `MobileNav.tsx`, but the current mobile drawer uses `overflow-y-auto` on the scrollable drawer body. That should probably remain. The real acceptance risk is internal desktop mega-menu scrolling.
- The plan's staged commits are implementation-run guidance, but this planner task is read-only planning. A developer should not assume commits are required unless the orchestrator asks for them.
- `HeaderClient` currently receives but does not use `brandName`; the redesign does not need to touch this.
- `Product.slug` and `Solution.slug` are optional in generated Payload types. The resolver must guard both `source.slug` and `source.name` before constructing links.
- `getProducts()` / `getSolutions()` return empty arrays on DB failure. That is good for build resilience, but visual verification should explicitly check the empty-state panel.
- If only the desktop nav changes to `xl:flex` but the utility bar remains `lg:block`, tablet widths may show the utility bar while still using the mobile drawer. This is not fatal, but consistency should be reviewed.
- `Logo tone={overHero ? 'dark' : 'light'}` is existing behavior. Opening a mega menu must continue to make `overHero` false by deriving it from active menu state.
- Current plan text appears mojibake in PowerShell output, but source files may still be valid UTF-8. Edit with care and do not re-encode whole files unnecessarily.
- The suggested 12-column panel with four platform groups in a two-column group area should fit, but labels are long. Verify at 1280-1440px if using `xl`; reduce gaps or font size before adding scrollbars.

## Slug Check

All slugs proposed by the written plan were found in `src/data/catalog-vi.ts`:

- Products: `security-platform`, `endpoint-security`, `edr`, `extended-detection-and-response`, `xdr-with-next-gen-siem`, `identity-threat-detection-and-response`, `next-gen-firewall`, `network-detection-and-response`, `sd-wan`, `secure-wifi`, `network-switch`, `zero-trust-network-access`, `protected-browser`, `dns-protection`, `email-security`, `cloud-workload-protection`, `managed-detection-and-response`, `mdr-for-microsoft`, `managed-risk`, `incident-response-services`, `security-testing`
- Solutions: `ransomware-protection`, `microsoft`, `microsoft-365-email`, `remote-working`, `data-protection`, `finance-and-banking`, `healthcare`, `education`, `manufacturing`, `retail`, `cis-critical-security-controls`, `gdpr`, `pci-dss`, `hipaa`

## Questions / Blockers

No blockers found.

Open implementation choice:

- Decide whether to keep the utility bar at `lg:block` or shift it to `xl:block` with the desktop nav breakpoint. Recommended: shift desktop nav, menu button, mega panel, mobile drawer, and utility bar together to `xl` for a cleaner tablet layout.

## Recommended Next Step

Proceed to implementation in the four intended source files:

- `src/components/nav/nav-data.ts`
- `src/dictionaries/vi.ts`
- `src/components/nav/HeaderClient.tsx`
- `src/components/nav/MobileNav.tsx`

Start with `nav-data.ts`, then update both consumers in the same changeset before running TypeScript, because the new `MegaMenuData` shape will temporarily break both header clients.
