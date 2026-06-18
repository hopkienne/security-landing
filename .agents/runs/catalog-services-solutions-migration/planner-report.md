Status: READY

Summary:
The catalog migration can proceed, but it should not be implemented as a simple expansion of `src/data/catalog-vi.ts` alone. Current seed data already models several Sophos `/services/*` pages as products and many Sophos `/solutions/*` pages as solutions, preserving the Vietnamese public routes `/san-pham/[slug]` and `/giai-phap/[slug]`. The unsafe part is `src/migrate-catalog.ts`: `--force` currently updates any existing database record with a matching slug, with no catalog ownership marker, dry-run/audit path, or validation that a slug collision is seed-owned. The implementation should add explicit catalog-managed metadata to the affected collections and make force updates conditional on that metadata.

Files inspected:
- `data/sophos_crawl/sophos_catalog.json`
- `data/sophos_crawl/sophos_path_map.md`
- `src/data/catalog-vi.ts`
- `src/migrate-catalog.ts`
- `src/collections/Products.ts`
- `src/collections/Solutions.ts`
- `src/collections/ProductCategories.ts`
- `src/collections/SolutionCategories.ts`
- `src/lib/lexical.ts`
- `src/lib/queries.ts`
- `src/fields/slug.ts`
- `src/fields/status.ts`
- `src/fields/common.ts`
- `src/app/(frontend)/san-pham/page.tsx`
- `src/app/(frontend)/san-pham/[slug]/page.tsx`
- `src/app/(frontend)/giai-phap/page.tsx`
- `src/app/(frontend)/giai-phap/[slug]/page.tsx`
- `src/app/sitemap.ts`
- `src/components/cards/ProductCard.tsx`
- `src/components/cards/SolutionCard.tsx`
- `src/components/nav/nav-data.ts`
- `package.json`
- `tsconfig.json`

Implementation plan:
1. Add catalog ownership metadata fields to catalog-managed collections.
   - Modify `src/collections/Products.ts`, `src/collections/Solutions.ts`, `src/collections/ProductCategories.ts`, and `src/collections/SolutionCategories.ts`.
   - Add sidebar/admin-hidden or read-only fields such as `catalogManaged` (checkbox, default `false`, indexed), `catalogSource` (text/select), and optional `catalogSourcePath` for traceability.
   - Keep public query behavior unchanged. Existing `/san-pham/[slug]` and `/giai-phap/[slug]` routes query by collection slug and should not need frontend/nav changes.

2. Extend seed TypeScript types in `src/data/catalog-vi.ts`.
   - Add optional source metadata to catalog category/product/solution types, e.g. `sourcePath?: string` and `sourceKind?: 'product' | 'service' | 'solution'`.
   - Public copy must remain original Vietnamese, SecureOps-neutral, and not a verbatim Sophos translation.

3. Complete service-to-product records in `src/data/catalog-vi.ts`.
   - Ensure all 5 Sophos `/services/*` detail pages are represented in `products`.
   - Current likely coverage: `managed-detection-and-response`, `mdr-for-microsoft`, `managed-risk`, and broad `security-testing`.
   - Add missing `security-services-retainer`.
   - Decide whether `Penetration Testing` should be a distinct `penetration-testing` product or remain folded into `security-testing`; recommended: add distinct `penetration-testing` if the goal is one detail page per service detail.

4. Complete solution records in `src/data/catalog-vi.ts`.
   - Ensure all non-duplicate Sophos `/solutions/*`, `/solutions/compliance/*`, `/solutions/industries/*`, `/solutions/use-cases/*`, and `/public-cloud` detail pages are represented in `solutions`.
   - Add likely missing records: `ai-assistant`, `ai-cybersecurity-toolkit`, `virtualization`, `us-federal` or neutral equivalent, and `protected-classroom` or an explicit merge into `education`.
   - Preserve deliberate dedupe for duplicate MDR, Microsoft 365 email, and ransomware URLs through a mapping manifest/commented source metadata.

5. Replace migration `upsert` safety behavior in `src/migrate-catalog.ts`.
   - Default mode: create missing records with `catalogManaged: true`; skip existing records.
   - `--force`: update only existing records where `catalogManaged === true`.
   - If a matching slug exists but is unmarked, do not update it; log a blocked unsafe collision and exit non-zero after summary.
   - Add `--dry-run` to print planned creates, skips, force-updates, and blocked collisions without writes.
   - Optional: add `--strict` so missing category slugs or unsafe collisions fail immediately.

6. Add seed validation.
   - Preferred: create `scripts/validate_catalog_seed.ts` or export a DB-free validator from `src/migrate-catalog.ts`.
   - Validate unique slugs, valid category references, service source paths only in products, solution source paths only in solutions, no public strings containing `Sophos`, no duplicate records for known duplicate source URLs, and `richText()` conversion for every overview.
   - Validate Sophos path-map coverage with explicit represented/deduped/excluded status for each detail path.

7. Generate Payload types after collection field changes.
   - Run `pnpm generate:types`.
   - Commit generated `src/payload-types.ts` only if it changes.

8. Validate implementation.
   - `npx tsc --noEmit`
   - `pnpm generate:types`
   - `pnpm tsx scripts/validate_catalog_seed.ts`
   - `pnpm tsx src/migrate-catalog.ts --dry-run`
   - `pnpm tsx src/migrate-catalog.ts --dry-run --force`
   - In a controlled local DB fixture, create an unmarked product with a seed slug and verify `--force` blocks without updating it.

Risks:
- Current `--force` is unsafe because it overwrites any same-slug record, including possible admin-created content.
- Existing database records created by earlier seed runs will not have `catalogManaged`; a strict safe implementation will skip/block force-updating them until explicitly adopted.
- Some crawl pages are duplicates or product-like helper pages; blind URL-to-record mapping will create low-quality duplicates.
- Sophos source text must be treated as research only; generated Vietnamese copy needs review.
- The worktree is already dirty with unrelated changes, including crawl data, nav/frontend files, and run artifacts. Implementation should avoid touching unrelated frontend/nav files.
- PowerShell output shows mojibake for Vietnamese text, but source files are UTF-8; validators should read files as UTF-8 and not rely on terminal rendering.

Questions/blockers:
- No blocking questions for implementation.
- Should existing unmarked records with seed slugs be explicitly adopted as catalog-managed? Recommended: do not auto-adopt during `--force`; add a separate explicit `--adopt-catalog-managed` or one-time admin-reviewed script if needed.
- Should `Penetration Testing` be distinct from `security-testing`? Recommended: add a distinct product if one public detail per Sophos service detail is required.
- Should US-specific federal and protected-classroom solution pages be public SecureOps solutions? Recommended: include only if SecureOps intends to market those segments; otherwise record explicit exclusions in validation metadata.

Recommended next step:
Assign the developer subagent to implement migration safety first: collection metadata fields, catalog-aware upsert behavior, `--dry-run`, and seed validation. Then add the missing service/solution records and run validation against the source-path map before touching any live seed data with `--force`.
