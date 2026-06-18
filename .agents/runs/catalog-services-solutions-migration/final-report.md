# Final Report: catalog-services-solutions-migration

Status: DONE
Date: 2026-06-18

## Outcome

- Services from the Sophos crawl are represented in `products`.
- Solutions from the Sophos crawl are represented in `solutions`.
- Detailed Vietnamese catalog content is now loaded into the current Payload database.
- Controlled overwrite is implemented:
  - default mode skips existing records,
  - plain `--force` only updates catalog-managed current catalog slugs,
  - `--force --adopt-existing` explicitly adopts current legacy seed records and retires mapped stale duplicates.

## Database Applied

Command run:

```bash
pnpm tsx src/migrate-catalog.ts --force --adopt-existing
```

Result:

- Updated current catalog records: 66
- Retired legacy duplicate slugs: 29
- Blocked: 0
- Missing categories: 0

Published DB state after migration:

- `product-categories`: 6 published, 6 published catalog-managed
- `products`: 26 published, 26 published catalog-managed
- `solution-categories`: 4 published, 4 published catalog-managed
- `solutions`: 30 published, 30 published catalog-managed
- Legacy mapped slugs retired: product categories 6/6, products 12/12, solutions 11/11

## Validation

- `pnpm tsx scripts/validate_catalog_seed.ts` - PASS
- `npx tsc --noEmit` - PASS
- `pnpm generate:types` - PASS, no new generated-types diff in tester run
- `pnpm tsx src/migrate-catalog.ts --dry-run` - PASS, skipped 66, blocked 0
- `pnpm tsx src/migrate-catalog.ts --dry-run --force` - PASS, updated 66, retired 0, blocked 0
- `pnpm tsx src/migrate-catalog.ts --dry-run --force --adopt-existing` - PASS, idempotent with 29 legacy slugs already retired
- Payload Local API DB checks - PASS

## Gates

- Tester: PASS, see `tester-report.md`
- Reviewer: APPROVED, see `reviewer-report.md`
