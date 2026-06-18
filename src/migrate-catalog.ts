import 'dotenv/config'
import { getPayload } from 'payload'
import type { Payload } from 'payload'
import config from './payload.config'
import { richText } from './lib/lexical'
import {
  legacyProductCategorySlugMappings,
  legacyProductSlugMappings,
  legacySolutionSlugMappings,
  getProductDetailSections,
  getSolutionDetailSections,
  productCategories,
  products,
  solutionCategories,
  solutions,
  type CatalogProduct,
  type CatalogProductCategory,
  type CatalogSolution,
  type CatalogSolutionCategory,
  type LegacyCatalogSlugMapping,
  type CatalogDetailSection,
} from './data/catalog-vi'

const FORCE = process.argv.includes('--force')
const DRY_RUN = process.argv.includes('--dry-run')
const ADOPT_EXISTING = process.argv.includes('--adopt-existing')
const CATALOG_SOURCE = 'sophos-catalog-research'

type CatalogCollection = Parameters<Payload['find']>[0]['collection']

type ExistingCatalogDoc = {
  id: number | string
  catalogManaged?: boolean | null
  status?: string | null
}

type Summary = {
  created: number
  updated: number
  adopted: number
  retired: number
  skipped: number
  blocked: string[]
  missingCategories: string[]
}

const summary: Summary = {
  created: 0,
  updated: 0,
  adopted: 0,
  retired: 0,
  skipped: 0,
  blocked: [],
  missingCategories: [],
}

let dryRunId = -1

function sourcePath(record: { sourcePaths?: string[]; dedupedSourcePaths?: string[] }) {
  return [...(record.sourcePaths ?? []), ...(record.dedupedSourcePaths ?? [])].join('\n')
}

function withCatalogMetadata(
  data: Record<string, unknown>,
  record: { sourcePaths?: string[]; dedupedSourcePaths?: string[] } = {},
) {
  return {
    ...data,
    catalogManaged: true,
    catalogSource: CATALOG_SOURCE,
    catalogSourcePath: sourcePath(record),
  }
}

async function upsert(
  payload: Payload,
  collection: CatalogCollection,
  slug: string,
  data: Record<string, unknown>,
): Promise<number | undefined> {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: true,
  })

  const doc = existing.docs[0] as ExistingCatalogDoc | undefined
  const label = `${collection}/${slug}`

  if (doc) {
    const id = Number(doc.id)
    if (!FORCE) {
      summary.skipped += 1
      console.log(`  = skip ${label} (exists)`)
      return id
    }

    if (doc.catalogManaged !== true && !ADOPT_EXISTING) {
      const message = `${label} exists but is not catalogManaged; refusing --force update`
      summary.blocked.push(message)
      console.log(`  ! blocked ${message}`)
      return id
    }

    if (doc.catalogManaged !== true && ADOPT_EXISTING) {
      summary.adopted += 1
      summary.updated += 1
      if (DRY_RUN) {
        console.log(`  ~ would adopt and update ${label}`)
        return id
      }

      await payload.update({ collection, id, data, overrideAccess: true })
      console.log(`  ~ adopted and updated ${label}`)
      return id
    }

    summary.updated += 1
    if (DRY_RUN) {
      console.log(`  ~ would update ${label}`)
      return id
    }

    await payload.update({ collection, id, data, overrideAccess: true })
    console.log(`  ~ updated ${label}`)
    return id
  }

  summary.created += 1
  if (DRY_RUN) {
    const id = dryRunId
    dryRunId -= 1
    console.log(`  + would create ${label}`)
    return id
  }

  const created = await payload.create({ collection, data, overrideAccess: true })
  console.log(`  + created ${label}`)
  return Number(created.id)
}

function categoryMissing(kind: 'product' | 'solution', slug: string, categorySlug: string) {
  const message = `${kind}/${slug} references missing category "${categorySlug}"`
  summary.missingCategories.push(message)
  console.warn(`  ! ${message}`)
}

function legacySourcePath(mapping: LegacyCatalogSlugMapping) {
  return [
    `legacy-slug:${mapping.legacySlug}`,
    `canonical-slug:${mapping.canonicalSlug}`,
    `reason:${mapping.reason}`,
  ].join('\n')
}

async function retireLegacySlug(
  payload: Payload,
  collection: CatalogCollection,
  mapping: LegacyCatalogSlugMapping,
) {
  const legacy = await payload.find({
    collection,
    where: { slug: { equals: mapping.legacySlug } },
    limit: 1,
    overrideAccess: true,
  })

  const legacyDoc = legacy.docs[0] as ExistingCatalogDoc | undefined
  const legacyLabel = `${collection}/${mapping.legacySlug}`
  const canonicalLabel = `${collection}/${mapping.canonicalSlug}`

  if (!legacyDoc) {
    console.log(`  = legacy missing ${legacyLabel} -> ${canonicalLabel}`)
    return
  }

  const canonical = await payload.find({
    collection,
    where: { slug: { equals: mapping.canonicalSlug } },
    limit: 1,
    overrideAccess: true,
  })

  if (!canonical.docs[0] && !DRY_RUN) {
    const message = `${legacyLabel} cannot retire because ${canonicalLabel} is missing`
    summary.blocked.push(message)
    console.log(`  ! blocked ${message}`)
    return
  }

  if (legacyDoc.status === 'draft' && legacyDoc.catalogManaged === true) {
    console.log(`  = legacy already retired ${legacyLabel} -> ${canonicalLabel}`)
    return
  }

  summary.retired += 1
  if (DRY_RUN) {
    console.log(`  - would retire legacy ${legacyLabel} -> ${canonicalLabel}`)
    return
  }

  await payload.update({
    collection,
    id: Number(legacyDoc.id),
    data: {
      status: 'draft',
      catalogManaged: true,
      catalogSource: CATALOG_SOURCE,
      catalogSourcePath: legacySourcePath(mapping),
    },
    overrideAccess: true,
  })
  console.log(`  - retired legacy ${legacyLabel} -> ${canonicalLabel}`)
}

async function retireLegacySlugs(payload: Payload) {
  if (!FORCE || !ADOPT_EXISTING) return

  console.log('\nLegacy slug retirements')
  for (const mapping of legacyProductCategorySlugMappings) {
    await retireLegacySlug(payload, 'product-categories', mapping)
  }
  for (const mapping of legacyProductSlugMappings) {
    await retireLegacySlug(payload, 'products', mapping)
  }
  for (const mapping of legacySolutionSlugMappings) {
    await retireLegacySlug(payload, 'solutions', mapping)
  }
}

function productCategoryData(category: CatalogProductCategory) {
  return withCatalogMetadata(
    {
      name: category.name,
      slug: category.slug,
      description: category.description,
      sortOrder: category.sortOrder,
      status: 'published',
    },
    category,
  )
}

function detailSectionData(sections: CatalogDetailSection[]) {
  return sections.map((section) => ({
    heading: section.heading,
    body: richText(section.body),
    bullets: (section.bullets ?? []).map((item) => ({ item })),
  }))
}

function productData(product: CatalogProduct, categoryId: number) {
  return withCatalogMetadata(
    {
      name: product.name,
      slug: product.slug,
      category: categoryId,
      shortDescription: product.shortDescription,
      overview: richText(product.overview),
      keyPoints: product.keyPoints.map((item) => ({ item })),
      features: product.features.map((item) => ({ item })),
      benefits: product.benefits.map((item) => ({ item })),
      detailSections: detailSectionData(getProductDetailSections(product)),
      ctas: [{ label: 'Liên hệ tư vấn', href: '/lien-he' }],
      sortOrder: product.sortOrder,
      status: 'published',
    },
    product,
  )
}

function solutionCategoryData(category: CatalogSolutionCategory) {
  return withCatalogMetadata(
    {
      name: category.name,
      slug: category.slug,
      type: category.type,
      description: category.description,
      sortOrder: category.sortOrder,
      status: 'published',
    },
    category,
  )
}

function solutionData(solution: CatalogSolution, categoryId: number) {
  return withCatalogMetadata(
    {
      name: solution.name,
      slug: solution.slug,
      category: categoryId,
      shortDescription: solution.shortDescription,
      overview: richText(solution.overview),
      painPoints: solution.painPoints.map((item) => ({ item })),
      benefits: solution.benefits.map((item) => ({ item })),
      detailSections: detailSectionData(getSolutionDetailSections(solution)),
      ctas: [{ label: 'Liên hệ tư vấn', href: '/lien-he' }],
      sortOrder: solution.sortOrder,
      status: 'published',
    },
    solution,
  )
}

function printSummary() {
  console.log('\nCatalog migration summary:')
  console.log(`  created: ${summary.created}`)
  console.log(`  updated: ${summary.updated}`)
  console.log(`  adopted: ${summary.adopted}`)
  console.log(`  retired: ${summary.retired}`)
  console.log(`  skipped: ${summary.skipped}`)
  console.log(`  blocked: ${summary.blocked.length}`)
  console.log(`  missing categories: ${summary.missingCategories.length}`)

  if (summary.blocked.length > 0) {
    console.log('\nBlocked unsafe collisions:')
    for (const blocked of summary.blocked) console.log(`  - ${blocked}`)
  }

  if (summary.missingCategories.length > 0) {
    console.log('\nMissing category issues:')
    for (const issue of summary.missingCategories) console.log(`  - ${issue}`)
  }
}

async function migrate() {
  const payload = await getPayload({ config })
  console.log(
    `\nCatalog migration${DRY_RUN ? ' --dry-run' : ''}${FORCE ? ' --force' : ''}${ADOPT_EXISTING ? ' --adopt-existing' : ''}\n`,
  )

  if (ADOPT_EXISTING && !FORCE) {
    summary.blocked.push('--adopt-existing requires --force so adoption is always explicit')
    printSummary()
    process.exit(1)
  }

  console.log('Product categories')
  const productCatIds = new Map<string, number>()
  for (const category of productCategories) {
    const id = await upsert(
      payload,
      'product-categories',
      category.slug,
      productCategoryData(category),
    )
    if (id !== undefined) productCatIds.set(category.slug, id)
  }

  console.log('\nProducts')
  for (const product of products) {
    const categoryId = productCatIds.get(product.categorySlug)
    if (!categoryId) {
      categoryMissing('product', product.slug, product.categorySlug)
      continue
    }
    await upsert(payload, 'products', product.slug, productData(product, categoryId))
  }

  console.log('\nSolution categories')
  const solutionCatIds = new Map<string, number>()
  for (const category of solutionCategories) {
    const id = await upsert(
      payload,
      'solution-categories',
      category.slug,
      solutionCategoryData(category),
    )
    if (id !== undefined) solutionCatIds.set(category.slug, id)
  }

  console.log('\nSolutions')
  for (const solution of solutions) {
    const categoryId = solutionCatIds.get(solution.categorySlug)
    if (!categoryId) {
      categoryMissing('solution', solution.slug, solution.categorySlug)
      continue
    }
    await upsert(payload, 'solutions', solution.slug, solutionData(solution, categoryId))
  }

  await retireLegacySlugs(payload)

  printSummary()

  if (summary.blocked.length > 0 || summary.missingCategories.length > 0) {
    process.exit(1)
  }

  process.exit(0)
}

migrate().catch((err) => {
  console.error('\nCatalog migration failed:', err)
  process.exit(1)
})
