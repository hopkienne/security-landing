import { richText } from '../src/lib/lexical'
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
  type LegacyCatalogSlugMapping,
} from '../src/data/catalog-vi'

type CatalogRecord = {
  slug: string
  categorySlug: string
  overview: string[]
  sourcePaths?: string[]
  dedupedSourcePaths?: string[]
}

type CoverageTarget = {
  path: string
  collection: 'products' | 'solutions'
  slug: string
  status: 'represented' | 'deduped'
  canonicalSlug?: string
  note?: string
}

const expectedCoverage: CoverageTarget[] = [
  {
    path: '/services/advisory-services/penetration-testing',
    collection: 'products',
    slug: 'security-testing',
    status: 'deduped',
    canonicalSlug: 'security-testing',
    note: 'Penetration testing is represented by the broader security testing product.',
  },
  {
    path: '/services/managed-detection-and-response',
    collection: 'products',
    slug: 'managed-detection-and-response',
    status: 'represented',
  },
  {
    path: '/services/managed-detection-and-response/microsoft',
    collection: 'products',
    slug: 'mdr-for-microsoft',
    status: 'represented',
  },
  {
    path: '/services/managed-risk',
    collection: 'products',
    slug: 'managed-risk',
    status: 'represented',
  },
  {
    path: '/services/security-services-retainer',
    collection: 'products',
    slug: 'security-services-retainer',
    status: 'represented',
  },
  {
    path: '/public-cloud',
    collection: 'solutions',
    slug: 'public-cloud',
    status: 'represented',
  },
  {
    path: '/solutions/ai-cybersecurity',
    collection: 'solutions',
    slug: 'ai-cybersecurity',
    status: 'represented',
  },
  {
    path: '/solutions/ai-cybersecurity/ai-assistant',
    collection: 'solutions',
    slug: 'ai-assistant',
    status: 'represented',
  },
  {
    path: '/solutions/ai-cybersecurity/ai-cybersecurity-toolkit',
    collection: 'solutions',
    slug: 'ai-cybersecurity-toolkit',
    status: 'represented',
  },
  {
    path: '/solutions/mdr-security-solutions',
    collection: 'solutions',
    slug: 'neutralize-threats',
    status: 'deduped',
    canonicalSlug: 'neutralize-threats',
    note: 'Duplicate of MDR solution messaging.',
  },
  {
    path: '/solutions/neutralize-threats',
    collection: 'solutions',
    slug: 'neutralize-threats',
    status: 'represented',
  },
  {
    path: '/solutions/compliance/ccpa',
    collection: 'solutions',
    slug: 'ccpa',
    status: 'represented',
  },
  {
    path: '/solutions/compliance/cipa',
    collection: 'solutions',
    slug: 'cipa',
    status: 'represented',
  },
  {
    path: '/solutions/compliance/cis-critical-security-controls',
    collection: 'solutions',
    slug: 'cis-critical-security-controls',
    status: 'represented',
  },
  {
    path: '/solutions/compliance/gdpr',
    collection: 'solutions',
    slug: 'gdpr',
    status: 'represented',
  },
  {
    path: '/solutions/compliance/hipaa',
    collection: 'solutions',
    slug: 'hipaa',
    status: 'represented',
  },
  {
    path: '/solutions/compliance/pci-dss',
    collection: 'solutions',
    slug: 'pci-dss',
    status: 'represented',
  },
  {
    path: '/solutions/compliance/sox',
    collection: 'solutions',
    slug: 'sox',
    status: 'represented',
  },
  {
    path: '/solutions/industries/education',
    collection: 'solutions',
    slug: 'education',
    status: 'represented',
  },
  {
    path: '/solutions/industries/education1',
    collection: 'solutions',
    slug: 'education',
    status: 'deduped',
    canonicalSlug: 'education',
    note: 'Protected classroom is covered by the education solution.',
  },
  {
    path: '/solutions/industries/finance-and-banking',
    collection: 'solutions',
    slug: 'finance-and-banking',
    status: 'represented',
  },
  {
    path: '/solutions/industries/government',
    collection: 'solutions',
    slug: 'government',
    status: 'represented',
  },
  {
    path: '/solutions/industries/healthcare',
    collection: 'solutions',
    slug: 'healthcare',
    status: 'represented',
  },
  {
    path: '/solutions/industries/manufacturing',
    collection: 'solutions',
    slug: 'manufacturing',
    status: 'represented',
  },
  {
    path: '/solutions/industries/retail',
    collection: 'solutions',
    slug: 'retail',
    status: 'represented',
  },
  {
    path: '/solutions/industries/us-federal',
    collection: 'solutions',
    slug: 'us-federal',
    status: 'represented',
  },
  {
    path: '/solutions/use-cases/cyber-insurance',
    collection: 'solutions',
    slug: 'cyber-insurance',
    status: 'represented',
  },
  {
    path: '/solutions/use-cases/data-protection',
    collection: 'solutions',
    slug: 'data-protection',
    status: 'represented',
  },
  {
    path: '/solutions/use-cases/insider-threat-protection',
    collection: 'solutions',
    slug: 'insider-threat-protection',
    status: 'represented',
  },
  {
    path: '/solutions/use-cases/microsoft',
    collection: 'solutions',
    slug: 'microsoft',
    status: 'represented',
  },
  {
    path: '/solutions/use-cases/microsoft-365',
    collection: 'solutions',
    slug: 'microsoft-365',
    status: 'represented',
  },
  {
    path: '/solutions/use-cases/microsoft-365-email',
    collection: 'solutions',
    slug: 'microsoft-365',
    status: 'deduped',
    canonicalSlug: 'microsoft-365',
    note: 'Duplicate of the Microsoft 365 email protection use case.',
  },
  {
    path: '/solutions/use-cases/ransomware-protection',
    collection: 'solutions',
    slug: 'ransomware-protection',
    status: 'represented',
  },
  {
    path: '/solutions/use-cases/ransomware-protection-1',
    collection: 'solutions',
    slug: 'ransomware-protection',
    status: 'deduped',
    canonicalSlug: 'ransomware-protection',
    note: 'Duplicate ransomware URL.',
  },
  {
    path: '/solutions/use-cases/remote-working',
    collection: 'solutions',
    slug: 'remote-working',
    status: 'represented',
  },
  {
    path: '/solutions/use-cases/supply-chain-security',
    collection: 'solutions',
    slug: 'supply-chain-security',
    status: 'represented',
  },
  {
    path: '/solutions/use-cases/threat-prevention',
    collection: 'solutions',
    slug: 'threat-prevention',
    status: 'represented',
  },
  {
    path: '/solutions/use-cases/virtualization',
    collection: 'solutions',
    slug: 'virtualization',
    status: 'represented',
  },
]

const failures: string[] = []

function assert(condition: unknown, message: string) {
  if (!condition) failures.push(message)
}

function validateUniqueSlugs(label: string, records: { slug: string }[]) {
  const seen = new Set<string>()
  for (const record of records) {
    assert(!seen.has(record.slug), `${label} has duplicate slug "${record.slug}"`)
    seen.add(record.slug)
  }
}

function validateDetailSections(
  label: 'products' | 'solutions',
  records: CatalogRecord[],
) {
  for (const record of records) {
    const hasCrawlSource =
      (record.sourcePaths?.length ?? 0) > 0 || (record.dedupedSourcePaths?.length ?? 0) > 0
    if (!hasCrawlSource) continue

    const detailSections =
      label === 'products'
        ? getProductDetailSections(record as never)
        : getSolutionDetailSections(record as never)
    const totalBodyBlocks = detailSections.reduce(
      (total, section) => total + section.body.length + (section.bullets?.length ?? 0),
      0,
    )

    assert(
      detailSections.length >= 3,
      `${label}/${record.slug} needs at least 3 detail sections`,
    )
    assert(
      totalBodyBlocks >= 10,
      `${label}/${record.slug} needs at least 10 detail body/bullet blocks`,
    )
    for (const section of detailSections) {
      assert(section.heading.trim().length > 0, `${label}/${record.slug} has empty detail heading`)
      assert(section.body.length > 0, `${label}/${record.slug}/${section.heading} has empty body`)
    }
  }
}

function validateCategoryReferences(
  label: string,
  records: CatalogRecord[],
  categories: { slug: string }[],
) {
  const categorySlugs = new Set(categories.map((category) => category.slug))
  for (const record of records) {
    assert(
      categorySlugs.has(record.categorySlug),
      `${label}/${record.slug} references missing category "${record.categorySlug}"`,
    )
  }
}

function collectStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(collectStrings)
  if (value && typeof value === 'object') return Object.values(value).flatMap(collectStrings)
  return []
}

function validateNoSophosPublicStrings(label: string, records: object[]) {
  for (const record of records) {
    const slug = 'slug' in record && typeof record.slug === 'string' ? record.slug : 'unknown'
    for (const value of collectStrings(record)) {
      assert(!/\bSophos\b/i.test(value), `${label}/${slug} contains a public Sophos string`)
    }
  }
}

function validateRichText(label: string, records: CatalogRecord[]) {
  for (const record of records) {
    const converted = richText(record.overview)
    const children = converted.root.children
    assert(Array.isArray(children), `${label}/${record.slug} overview did not convert to Lexical`)
    assert(
      children.length === record.overview.length,
      `${label}/${record.slug} overview converted ${children.length} block(s), expected ${record.overview.length}`,
    )
  }
}

function hasPath(record: CatalogRecord, target: CoverageTarget) {
  const represented = target.status === 'represented' ? record.sourcePaths : record.dedupedSourcePaths
  return represented?.includes(target.path) ?? false
}

function validateCoverage(collection: 'products' | 'solutions', records: CatalogRecord[]) {
  const bySlug = new Map(records.map((record) => [record.slug, record]))
  for (const target of expectedCoverage.filter((item) => item.collection === collection)) {
    const record = bySlug.get(target.slug)
    assert(
      record,
      `${collection}/${target.slug} is missing for crawl path ${target.path}`,
    )
    if (!record) continue

    assert(
      hasPath(record, target),
      `${collection}/${target.slug} does not mark ${target.status} crawl path ${target.path}`,
    )
  }
}

function validateLegacyMappings(
  label: string,
  mappings: LegacyCatalogSlugMapping[],
  records: { slug: string }[],
) {
  const currentSlugs = new Set(records.map((record) => record.slug))
  const seenLegacySlugs = new Set<string>()
  for (const mapping of mappings) {
    assert(
      !seenLegacySlugs.has(mapping.legacySlug),
      `${label} maps legacy slug "${mapping.legacySlug}" more than once`,
    )
    seenLegacySlugs.add(mapping.legacySlug)
    assert(
      mapping.legacySlug !== mapping.canonicalSlug,
      `${label} maps legacy slug "${mapping.legacySlug}" to itself`,
    )
    assert(
      !currentSlugs.has(mapping.legacySlug),
      `${label} legacy slug "${mapping.legacySlug}" is still an active catalog slug`,
    )
    assert(
      currentSlugs.has(mapping.canonicalSlug),
      `${label} legacy slug "${mapping.legacySlug}" points to missing canonical slug "${mapping.canonicalSlug}"`,
    )
    assert(
      mapping.reason.trim().length > 0,
      `${label} legacy slug "${mapping.legacySlug}" needs a reason`,
    )
  }
}

validateUniqueSlugs('productCategories', productCategories)
validateUniqueSlugs('products', products)
validateUniqueSlugs('solutionCategories', solutionCategories)
validateUniqueSlugs('solutions', solutions)
validateCategoryReferences('products', products as CatalogRecord[], productCategories)
validateCategoryReferences('solutions', solutions as CatalogRecord[], solutionCategories)
validateNoSophosPublicStrings('productCategories', productCategories)
validateNoSophosPublicStrings('products', products)
validateNoSophosPublicStrings('solutionCategories', solutionCategories)
validateNoSophosPublicStrings('solutions', solutions)
validateRichText('products', products as CatalogRecord[])
validateRichText('solutions', solutions as CatalogRecord[])
validateCoverage('products', products as CatalogRecord[])
validateCoverage('solutions', solutions as CatalogRecord[])
validateDetailSections('products', products as CatalogRecord[])
validateDetailSections('solutions', solutions as CatalogRecord[])
validateLegacyMappings(
  'legacyProductCategorySlugMappings',
  legacyProductCategorySlugMappings,
  productCategories,
)
validateLegacyMappings('legacyProductSlugMappings', legacyProductSlugMappings, products)
validateLegacyMappings('legacySolutionSlugMappings', legacySolutionSlugMappings, solutions)

if (failures.length > 0) {
  console.error(`Catalog seed validation failed with ${failures.length} issue(s):`)
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log(
  `Catalog seed validation passed: ${products.length} products, ${solutions.length} solutions, ${expectedCoverage.length} crawl paths checked, ${legacyProductCategorySlugMappings.length + legacyProductSlugMappings.length + legacySolutionSlugMappings.length} legacy slugs mapped.`,
)
