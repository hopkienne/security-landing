import { getProductCategories, getProducts, getSolutions } from '@/lib/queries'

export type NavLink = { label: string; href: string }
export type NavGroup = { label: string; links: NavLink[] }

export type MegaMenuData = {
  productGroups: NavGroup[]
  solutionGroups: NavGroup[]
}

const SOLUTION_TYPE_LABEL: Record<string, string> = {
  use_case: 'Theo nhu cầu',
  industry: 'Theo ngành',
  compliance: 'Tuân thủ',
  general: 'Tổng quát',
}

/**
 * Build mega-menu structure from Payload content: products grouped by category,
 * solutions grouped by their category's `type`.
 */
export async function getMegaMenuData(): Promise<MegaMenuData> {
  const [productCategories, products, solutions] = await Promise.all([
    getProductCategories(),
    getProducts(),
    getSolutions(),
  ])

  const productGroups: NavGroup[] = productCategories
    .map((cat) => ({
      label: cat.name,
      links: products
        .filter((p) => (typeof p.category === 'object' ? p.category?.id : p.category) === cat.id)
        .map((p) => ({ label: p.name, href: `/san-pham/${p.slug}` })),
    }))
    .filter((g) => g.links.length > 0)

  // Group solutions by the type of their category.
  const byType = new Map<string, NavLink[]>()
  for (const sol of solutions) {
    const cat = typeof sol.category === 'object' ? sol.category : null
    const type = cat?.type ?? 'general'
    const arr = byType.get(type) ?? []
    arr.push({ label: sol.name, href: `/giai-phap/${sol.slug}` })
    byType.set(type, arr)
  }
  const solutionGroups: NavGroup[] = Array.from(byType.entries()).map(([type, links]) => ({
    label: SOLUTION_TYPE_LABEL[type] ?? type,
    links,
  }))

  return { productGroups, solutionGroups }
}
