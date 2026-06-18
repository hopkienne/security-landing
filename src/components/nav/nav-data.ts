import { getProducts, getSolutions } from '@/lib/queries'

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
  imageSrc: string
  imageAlt: string
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

type CatalogLinkType = 'product' | 'solution'

type ConfiguredCatalogLink = {
  type: CatalogLinkType
  slug: string
  label?: string
  description?: string
}

type ConfiguredRouteLink = {
  type: 'route'
  label: string
  href: string
  description?: string
}

type ConfiguredLink = ConfiguredCatalogLink | ConfiguredRouteLink

type ConfiguredGroup = {
  label: string
  links: ConfiguredLink[]
}

type ConfiguredSection = Omit<MegaMenuSection, 'groups'> & {
  groups: ConfiguredGroup[]
}

type CatalogItem = {
  name?: string | null
  slug?: string | null
}

const MENU_SECTION_CONFIG: ConfiguredSection[] = [
  {
    key: 'platform',
    label: 'Nền tảng',
    overviewHref: '/san-pham',
    eyebrow: 'Nền tảng bảo mật',
    heading: 'Vận hành bảo mật từ một nền tảng hợp nhất',
    description:
      'Kết nối endpoint, network, cloud, identity và email để giảm điểm mù trong điều tra và phản ứng.',
    groups: [
      {
        label: 'Tổng quan nền tảng',
        links: [{ type: 'product', slug: 'security-platform' }],
      },
      {
        label: 'Bảo vệ điểm cuối',
        links: [
          { type: 'product', slug: 'endpoint-security' },
          { type: 'product', slug: 'edr' },
          { type: 'product', slug: 'extended-detection-and-response' },
          { type: 'product', slug: 'xdr-with-next-gen-siem' },
          { type: 'product', slug: 'identity-threat-detection-and-response' },
        ],
      },
      {
        label: 'Mạng & hạ tầng',
        links: [
          { type: 'product', slug: 'next-gen-firewall' },
          { type: 'product', slug: 'network-detection-and-response' },
          { type: 'product', slug: 'sd-wan' },
          { type: 'product', slug: 'secure-wifi' },
          { type: 'product', slug: 'network-switch' },
        ],
      },
      {
        label: 'Workspace, email & cloud',
        links: [
          { type: 'product', slug: 'zero-trust-network-access' },
          { type: 'product', slug: 'protected-browser' },
          { type: 'product', slug: 'dns-protection' },
          { type: 'product', slug: 'email-security' },
          { type: 'product', slug: 'cloud-workload-protection' },
        ],
      },
    ],
    cta: {
      heading: 'Hợp nhất vận hành bảo mật',
      body: 'Quản lý endpoint, network, cloud, identity và email trong một trải nghiệm thống nhất.',
      imageSrc: '/secureops/menu-cta-platform.webp',
      imageAlt: 'Minh họa nền tảng vận hành bảo mật hợp nhất',
      primary: { label: 'Khám phá sản phẩm', href: '/san-pham' },
    },
  },
  {
    key: 'services',
    label: 'Dịch vụ',
    overviewHref: '/san-pham',
    eyebrow: 'Dịch vụ chuyên gia',
    heading: 'Mở rộng đội ngũ bảo mật với chuyên gia 24/7',
    description:
      'Từ MDR đến ứng cứu sự cố và kiểm thử bảo mật, SecureOps hỗ trợ doanh nghiệp khi cần con người giàu kinh nghiệm đứng cùng hệ thống.',
    groups: [
      {
        label: 'Managed services',
        links: [
          { type: 'product', slug: 'managed-detection-and-response' },
          { type: 'product', slug: 'mdr-for-microsoft' },
          { type: 'product', slug: 'managed-risk' },
        ],
      },
      {
        label: 'Incident response',
        links: [{ type: 'product', slug: 'incident-response-services' }],
      },
      {
        label: 'Advisory services',
        links: [{ type: 'product', slug: 'security-testing' }],
      },
    ],
    cta: {
      heading: 'Đang bị tấn công?',
      body: 'Đội ngũ chuyên gia SecureOps sẵn sàng hỗ trợ phản ứng khẩn cấp 24/7.',
      imageSrc: '/secureops/menu-cta-services.webp',
      imageAlt: 'Minh họa dịch vụ giám sát và phản ứng sự cố bảo mật',
      primary: { label: 'Liên hệ khẩn cấp', href: '/lien-he' },
      secondary: {
        label: 'Tìm hiểu MDR',
        href: '/san-pham/managed-detection-and-response',
      },
    },
  },
  {
    key: 'solutions',
    label: 'Giải pháp',
    overviewHref: '/giai-phap',
    eyebrow: 'Giải pháp theo nhu cầu',
    heading: 'Chọn lộ trình phòng thủ theo rủi ro, ngành và tuân thủ',
    description:
      'Bắt đầu từ vấn đề kinh doanh: ransomware, Microsoft, làm việc từ xa, ngành trọng yếu hoặc yêu cầu tuân thủ.',
    groups: [
      {
        label: 'Theo nhu cầu',
        links: [
          { type: 'solution', slug: 'ransomware-protection' },
          { type: 'solution', slug: 'microsoft' },
          { type: 'solution', slug: 'microsoft-365' },
          { type: 'solution', slug: 'remote-working' },
          { type: 'solution', slug: 'data-protection' },
        ],
      },
      {
        label: 'Theo ngành',
        links: [
          { type: 'solution', slug: 'finance-and-banking' },
          { type: 'solution', slug: 'healthcare' },
          { type: 'solution', slug: 'education' },
          { type: 'solution', slug: 'manufacturing' },
          { type: 'solution', slug: 'retail' },
        ],
      },
      {
        label: 'Tuân thủ',
        links: [
          { type: 'solution', slug: 'cis-critical-security-controls' },
          { type: 'solution', slug: 'gdpr' },
          { type: 'solution', slug: 'pci-dss' },
          { type: 'solution', slug: 'hipaa' },
        ],
      },
    ],
    cta: {
      heading: 'Tìm đúng giải pháp',
      body: 'Chọn theo rủi ro, ngành hoặc yêu cầu tuân thủ để xây dựng lộ trình phòng thủ phù hợp.',
      imageSrc: '/secureops/menu-cta-solutions.webp',
      imageAlt: 'Minh họa các lộ trình giải pháp bảo mật theo rủi ro',
      primary: { label: 'Xem tất cả giải pháp', href: '/giai-phap' },
    },
  },
]

function mapBySlug(items: CatalogItem[]): Map<string, CatalogItem> {
  const map = new Map<string, CatalogItem>()

  for (const item of items) {
    if (item.slug) {
      map.set(item.slug, item)
    }
  }

  return map
}

function resolveConfiguredLink(
  link: ConfiguredLink,
  productBySlug: Map<string, CatalogItem>,
  solutionBySlug: Map<string, CatalogItem>,
): MegaMenuLink | null {
  if (link.type === 'route') {
    return {
      label: link.label,
      href: link.href,
      description: link.description,
    }
  }

  const source = link.type === 'product' ? productBySlug.get(link.slug) : solutionBySlug.get(link.slug)

  if (!source?.slug || !source.name) {
    return null
  }

  return {
    label: link.label ?? source.name,
    href: `/${link.type === 'product' ? 'san-pham' : 'giai-phap'}/${source.slug}`,
    description: link.description,
  }
}

function buildSection(
  section: ConfiguredSection,
  productBySlug: Map<string, CatalogItem>,
  solutionBySlug: Map<string, CatalogItem>,
): MegaMenuSection {
  return {
    ...section,
    groups: section.groups
      .map((group) => ({
        label: group.label,
        links: group.links
          .map((link) => resolveConfiguredLink(link, productBySlug, solutionBySlug))
          .filter((link): link is MegaMenuLink => Boolean(link)),
      }))
      .filter((group) => group.links.length > 0),
  }
}

/**
 * Build a curated Sophos-style mega menu. Payload remains the source for
 * product/solution names and slugs, while MENU_SECTION_CONFIG controls which
 * catalog entries are important enough for the header.
 */
export async function getMegaMenuData(): Promise<MegaMenuData> {
  const [products, solutions] = await Promise.all([getProducts(), getSolutions()])

  const productBySlug = mapBySlug(products)
  const solutionBySlug = mapBySlug(solutions)

  return {
    sections: MENU_SECTION_CONFIG.map((section) =>
      buildSection(section, productBySlug, solutionBySlug),
    ),
  }
}
