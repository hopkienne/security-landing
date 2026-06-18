# PROGRESS

Goal ID: `catalog-services-solutions-migration`

Status: `DONE`

## Objective

Controlled catalog migration for detailed services and solutions

## Scope

Changed:
- `src/data/catalog-vi.ts`
- `src/migrate-catalog.ts`
- `src/collections/ProductCategories.ts`
- `src/collections/Products.ts`
- `src/collections/SolutionCategories.ts`
- `src/collections/Solutions.ts`
- `src/payload-types.ts`
- `scripts/validate_catalog_seed.ts`
- `src/components/nav/nav-data.ts` (canonical Microsoft 365 slug only)
- Focused validation reports under `.agents/runs/catalog-services-solutions-migration/`

Must not change:
- Unrelated frontend, nav, blog, crawl, and asset files
- Public routes `/san-pham/[slug]` and `/giai-phap/[slug]`

## Constraints

- Sophos crawl is research only; public seed copy must be original Vietnamese and not raw Sophos copy.
- `/services/*` maps into products; `/solutions/*` maps into solutions.
- `--force` must not update records outside the catalog migration set.

## Acceptance Criteria

- [x] All 5 crawled services are represented as products or intentionally mapped to equivalent product slugs.
- [x] Crawled solution detail pages are represented in solutions with correct categories and richer Vietnamese content.
- [x] `--force` migration only updates catalog-managed slugs and reports unsafe collisions clearly.
- [x] `--force --adopt-existing` adopts legacy seed slugs explicitly and retires stale duplicates.
- [x] No raw Sophos brand copy is imported into public-facing catalog fields.
- [x] Validation output and final record counts are captured.

## Validation Commands

Cheap check:

```bash
pnpm tsx scripts/validate_catalog_seed.ts
npx tsc --noEmit
pnpm generate:types
```

Full check:

```bash
pnpm tsx src/migrate-catalog.ts --dry-run
pnpm tsx src/migrate-catalog.ts --dry-run --force
pnpm tsx src/migrate-catalog.ts --dry-run --force --adopt-existing
```

## Timeline

| Time | Phase | Agent | Status | Notes |
|---|---|---|---|---|
| | Intake | Main | RUNNING | Run folder created. |
| 2026-06-18 | Planning | Planner Agent | READY | See planner-report.md. |
| 2026-06-18 | Development | Developer Agent | IMPLEMENTED | Validator, seed coverage, safe migration, dry-run, and generated types complete. |
| 2026-06-18 | Migration | Main | APPLIED | Ran `pnpm tsx src/migrate-catalog.ts --force --adopt-existing`; updated 66 records, retired 29 legacy slugs. |
| 2026-06-18 | Testing | Tester Agent | PASS | See tester-report.md. |
| 2026-06-18 | Review | Reviewer Agent | APPROVED | See reviewer-report.md. |

## Subagent Reports

- Planner: `planner-report.md`
- Developer: `dev-report.md`
- Tester: `tester-report.md`
- Reviewer: `reviewer-report.md`

## Current Blockers

- None.

## Final Outcome

Migration complete. The database has 6 published product categories, 26 published products,
4 published solution categories, and 30 published solutions, all catalog-managed. The 29 mapped
legacy seed slugs are retained as draft catalog-managed records so they no longer duplicate public
catalog pages.
