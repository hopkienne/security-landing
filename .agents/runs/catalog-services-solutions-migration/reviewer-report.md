# Reviewer Report

Status: APPROVED

## Summary

The previous blocking issue is resolved. The catalog migration now keeps default/no-force behavior non-destructive, keeps plain `--force` limited to current catalog-managed records, and only retires legacy thin seed slugs when `--force --adopt-existing` is explicitly supplied.

The implementation also updates the stale Microsoft 365 nav slug and adds validator coverage for legacy slug maps.

## Findings

No blocking findings.

## Review Notes

- `src/data/catalog-vi.ts` now defines 29 explicit legacy slug mappings: 6 product categories, 12 products, and 11 solutions. Each legacy slug maps to an active canonical catalog slug with a non-empty reason.
- `src/migrate-catalog.ts` gates legacy retirement behind `FORCE && ADOPT_EXISTING`. Default mode skips existing current records; plain `--force` updates only catalog-managed current records and does not retire legacy slugs.
- Legacy retirement drafts the legacy record and sets `catalogManaged: true`, `catalogSource`, and `catalogSourcePath` with `legacy-slug`, `canonical-slug`, and `reason`.
- `scripts/validate_catalog_seed.ts` validates category refs, unique slugs, public Sophos string absence, richText conversion, source-path coverage, and legacy map integrity.
- `src/components/nav/nav-data.ts` now references `microsoft-365` rather than the retired `microsoft-365-email` slug.

## Validation Run

- `pnpm tsx scripts/validate_catalog_seed.ts` - PASS: 26 products, 30 solutions, 38 crawl paths checked, 29 legacy slugs mapped.
- `npx tsc --noEmit` - PASS.
- `pnpm tsx src/migrate-catalog.ts --dry-run` - PASS: skipped 66, retired 0, blocked 0.
- `pnpm tsx src/migrate-catalog.ts --dry-run --force` - PASS: updated 66, retired 0, blocked 0.
- `pnpm tsx src/migrate-catalog.ts --dry-run --force --adopt-existing` - PASS/idempotent after actual migration: updated 66, all 29 legacy slugs already retired, blocked 0.
- `pnpm tsx src/migrate-catalog.ts --dry-run --adopt-existing` - PASS as expected failure: exits non-zero because adoption requires `--force`.
- Read-only DB verification - PASS:
  - Published counts: product-categories 6, products 26, solution-categories 4, solutions 30.
  - Retired legacy records: product-categories 6/6, products 12/12, solutions 11/11.
  - All retired legacy records checked have required legacy/canonical/reason metadata.
  - `solutions/microsoft-365` is published and catalog-managed; `solutions/microsoft-365-email` is draft and catalog-managed.

## Residual Risks

- I did not run another destructive actual migration during review; verification used dry-run commands and read-only DB queries against the post-migration database.
- The legacy map is explicit and intentionally conservative. If future seed slugs are renamed, the map and validator should be updated in the same change.
