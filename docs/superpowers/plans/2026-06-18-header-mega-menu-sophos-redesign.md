# Header Mega Menu Sophos Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. This repository's AGENTS.md reserves subagent orchestration for `/goal` execution, so use subagent-driven execution only after the work is explicitly converted into an active `/goal`. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current scroll-heavy combined `Sản phẩm / Giải pháp` header mega menu with three compact Sophos-inspired top-level menus: `Nền tảng`, `Dịch vụ`, and `Giải pháp`.

**Architecture:** Keep Payload CMS as the catalog source, but add a curated nav configuration in `src/components/nav/nav-data.ts` so the header renders only selected links. Convert the client header from a boolean mega-menu state to an active section key, then render one full-width section panel at a time. Mobile uses the same curated `sections` data in three accordion entries.

**Tech Stack:** Next.js 15 App Router, React 19 client components, TypeScript, Tailwind CSS v4 utility classes, `motion/react`, Payload CMS public query helpers, `lucide-react`.

---

## File Structure

- Modify `src/components/nav/nav-data.ts`
  - Owns all mega menu types.
  - Defines curated section config.
  - Fetches products and solutions from Payload.
  - Resolves configured slugs into safe links.
  - Skips missing CMS items and empty groups.

- Modify `src/dictionaries/vi.ts`
  - Adds `vi.nav.platform`, `vi.nav.services`, and `vi.cta.overview`.
  - Keeps `productsSolutions` in place for compatibility even though desktop no longer uses it.

- Modify `src/components/nav/HeaderClient.tsx`
  - Replaces `openMega: boolean` with `activeMega: MegaMenuKey | null`.
  - Renders three top-level menu buttons from `menu.sections`.
  - Replaces the two-column scroll menu with a full-width section panel.
  - Uses `xl` as the desktop nav breakpoint to avoid wrapping with the expanded top-level nav.

- Modify `src/components/nav/MobileNav.tsx`
  - Replaces product/solution accordions with section accordions based on `menu.sections`.
  - Keeps the drawer, close button, plain links, and CTA behavior.
  - Uses `xl:hidden` so mobile/tablet behavior matches the new desktop breakpoint.

- Do not modify Payload collections, catalog seed data, homepage sections, or product/solution routes.

## Worktree Safety

The current worktree may contain unrelated changes. During implementation, stage only these files:

```bash
git add -- src/components/nav/nav-data.ts src/dictionaries/vi.ts src/components/nav/HeaderClient.tsx src/components/nav/MobileNav.tsx
```

Do not use `git add .`.

---

### Task 1: Add Curated Mega Menu Data Model

**Files:**
- Modify: `src/components/nav/nav-data.ts`

- [ ] **Step 1: Replace raw product/solution grouping with curated section types and config**

Replace the full contents of `src/components/nav/nav-data.ts` with:

```ts
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
          { type: 'solution', slug: 'microsoft-365-email' },
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
```

- [ ] **Step 2: Run typecheck for the data model**

Run:

```bash
npx tsc --noEmit
```

Expected:

```text
No TypeScript errors from src/components/nav/nav-data.ts.
```

If errors appear because other worktree files are already failing, record those unrelated errors before continuing and still fix any error that references `src/components/nav/nav-data.ts`.

- [ ] **Step 3: Commit the data model change**

Run:

```bash
git add -- src/components/nav/nav-data.ts
git commit -m "feat: curate header mega menu data"
```

Expected:

```text
1 file changed
```

---

### Task 2: Add Vietnamese Nav Labels

**Files:**
- Modify: `src/dictionaries/vi.ts`

- [ ] **Step 1: Add menu labels to the dictionary**

In `src/dictionaries/vi.ts`, update the `cta` and `nav` objects to include these keys:

```ts
  cta: {
    primary: CTA.primary,
    solutions: CTA.secondarySolutions,
    products: CTA.secondaryProducts,
    readMore: 'Tìm hiểu thêm',
    viewAll: 'Xem tất cả',
    overview: 'Xem tổng quan',
    apply: 'Ứng tuyển',
    submit: 'Gửi thông tin',
    sending: 'Đang gửi...',
  },
  nav: {
    home: 'Trang chủ',
    about: 'Giới thiệu',
    products: 'Sản phẩm',
    platform: 'Nền tảng',
    services: 'Dịch vụ',
    solutions: 'Giải pháp',
    productsSolutions: 'Sản phẩm / Giải pháp',
    customers: 'Khách hàng / Dự án',
    news: 'Tin tức / Blog',
    careers: 'Tuyển dụng',
    contact: 'Liên hệ',
  },
```

Keep the rest of the file unchanged.

- [ ] **Step 2: Run typecheck for dictionary changes**

Run:

```bash
npx tsc --noEmit
```

Expected:

```text
No TypeScript errors from src/dictionaries/vi.ts.
```

- [ ] **Step 3: Commit the dictionary change**

Run:

```bash
git add -- src/dictionaries/vi.ts
git commit -m "feat: add header mega menu labels"
```

Expected:

```text
1 file changed
```

---

### Task 3: Replace Desktop Header Mega Menu

**Files:**
- Modify: `src/components/nav/HeaderClient.tsx`

- [ ] **Step 1: Update imports and state**

In `src/components/nav/HeaderClient.tsx`, change the nav-data import and state section to:

```ts
import type { MegaMenuData, MegaMenuKey, MegaMenuSection } from './nav-data'
```

Then replace:

```ts
  const [openMega, setOpenMega] = useState(false)
```

with:

```ts
  const [activeMega, setActiveMega] = useState<MegaMenuKey | null>(null)
```

After `const pathname = usePathname()`, add:

```ts
  const openMega = activeMega !== null
  const activeSection = menu.sections.find((section) => section.key === activeMega) ?? null
```

- [ ] **Step 2: Add Escape-key close behavior**

After the existing scroll `useEffect`, add this effect:

```ts
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMega(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
```

- [ ] **Step 3: Update header close behavior and desktop breakpoint**

Change the opening header tag from:

```tsx
    <header className="sticky top-0 z-50 w-full" onMouseLeave={() => setOpenMega(false)}>
```

to:

```tsx
    <header className="sticky top-0 z-50 w-full" onMouseLeave={() => setActiveMega(null)}>
```

Change the desktop nav class from:

```tsx
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Điều hướng chính">
```

to:

```tsx
          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Điều hướng chính">
```

Change the mobile menu button class from:

```tsx
                'inline-flex h-10 w-10 items-center justify-center rounded-md lg:hidden',
```

to:

```tsx
                'inline-flex h-10 w-10 items-center justify-center rounded-md xl:hidden',
```

- [ ] **Step 4: Replace the old combined desktop menu button**

Replace the single `Sản phẩm / Giải pháp` button in the desktop nav with this mapped section button block:

```tsx
            {menu.sections.map((section) => {
              const active = activeMega === section.key

              return (
                <button
                  key={section.key}
                  type="button"
                  className={cn(
                    'inline-flex items-center gap-1 rounded-md px-2.5 py-2 text-[15px] font-semibold transition-colors',
                    overHero ? 'text-white/90 hover:text-white' : 'text-ink hover:text-primary',
                    active && 'text-primary',
                  )}
                  onMouseEnter={() => setActiveMega(section.key)}
                  onClick={() => setActiveMega((current) => (current === section.key ? null : section.key))}
                  aria-expanded={active}
                  aria-controls="secureops-mega-menu"
                >
                  {section.label}
                  <ChevronDown className={cn('h-4 w-4 transition-transform', active && 'rotate-180')} />
                </button>
              )
            })}
```

In the plain `NAV.map` links, replace:

```tsx
                onMouseEnter={() => setOpenMega(false)}
```

with:

```tsx
                onMouseEnter={() => setActiveMega(null)}
```

- [ ] **Step 5: Replace the desktop mega menu render block**

Replace the current `AnimatePresence` desktop mega menu block with:

```tsx
      {/* Desktop mega menu */}
      <AnimatePresence>
        {activeSection && (
          <motion.div
            key={activeSection.key}
            id="secureops-mega-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute inset-x-0 top-full hidden border-b border-border-soft bg-white shadow-xl xl:block"
            onMouseEnter={() => setActiveMega(activeSection.key)}
          >
            <MegaPanel section={activeSection} onNavigate={() => setActiveMega(null)} />
          </motion.div>
        )}
      </AnimatePresence>
```

- [ ] **Step 6: Replace `MegaColumn` with `MegaPanel` and `MegaCtaCard`**

Remove the old `MegaColumn` function and add these functions at the bottom of `HeaderClient.tsx`:

```tsx
function MegaPanel({
  section,
  onNavigate,
}: {
  section: MegaMenuSection
  onNavigate: () => void
}) {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-12 gap-8 px-8 py-8">
      <div className="col-span-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate">
          {section.eyebrow}
        </p>
        <h3 className="mt-3 text-xl font-extrabold leading-tight text-ink">{section.heading}</h3>
        <p className="mt-3 text-sm leading-6 text-slate">{section.description}</p>
        <Link
          href={section.overviewHref}
          onClick={onNavigate}
          className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary transition-colors hover:text-primary-dark"
        >
          {vi.cta.overview}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="col-span-6">
        {section.groups.length === 0 ? (
          <p className="rounded-md bg-bg-soft px-4 py-3 text-sm text-slate">
            Đang cập nhật nội dung.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {section.groups.map((group) => (
              <div key={group.label}>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.1em] text-ink">
                  {group.label}
                </p>
                <ul className="space-y-1">
                  {group.links.slice(0, 5).map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onNavigate}
                        className="block rounded px-2 py-1.5 text-sm leading-5 text-slate transition-colors hover:bg-bg-soft hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="col-span-3">
        <MegaCtaCard section={section} onNavigate={onNavigate} />
      </div>
    </div>
  )
}

function MegaCtaCard({
  section,
  onNavigate,
}: {
  section: MegaMenuSection
  onNavigate: () => void
}) {
  return (
    <div className="relative flex h-full min-h-64 flex-col justify-between overflow-hidden rounded-[var(--radius-brand-lg)] bg-navy p-6 text-white">
      <div className="bg-dotgrid absolute inset-0 opacity-50" aria-hidden />
      <div className="relative">
        <p className="text-lg font-bold">{section.cta.heading}</p>
        <p className="mt-2 text-sm leading-6 text-white/75">{section.cta.body}</p>
      </div>
      <div className="relative mt-6 flex flex-col gap-2">
        <Link
          href={section.cta.primary.href}
          onClick={onNavigate}
          className="rounded-full bg-primary px-4 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-primary-dark"
        >
          {section.cta.primary.label}
        </Link>
        {section.cta.secondary && (
          <Link
            href={section.cta.secondary.href}
            onClick={onNavigate}
            className="rounded-full border border-white/30 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {section.cta.secondary.label}
          </Link>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Run typecheck for desktop header**

Run:

```bash
npx tsc --noEmit
```

Expected:

```text
No TypeScript errors from src/components/nav/HeaderClient.tsx.
```

- [ ] **Step 8: Commit the desktop header change**

Run:

```bash
git add -- src/components/nav/HeaderClient.tsx
git commit -m "feat: split desktop header mega menu"
```

Expected:

```text
1 file changed
```

---

### Task 4: Update Mobile Drawer Sections

**Files:**
- Modify: `src/components/nav/MobileNav.tsx`

- [ ] **Step 1: Update imports**

Change:

```ts
import { ChevronDown, X } from 'lucide-react'
import type { MegaMenuData, NavGroup } from './nav-data'
```

to:

```ts
import { ArrowRight, ChevronDown, X } from 'lucide-react'
import type { MegaMenuData, MegaMenuSection } from './nav-data'
```

- [ ] **Step 2: Update mobile breakpoint classes**

Change the overlay class from:

```tsx
            className="fixed inset-0 z-50 bg-ink/40 lg:hidden"
```

to:

```tsx
            className="fixed inset-0 z-50 bg-ink/40 xl:hidden"
```

Change the drawer class from:

```tsx
            className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-white shadow-2xl lg:hidden"
```

to:

```tsx
            className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-white shadow-2xl xl:hidden"
```

- [ ] **Step 3: Replace product/solution accordions with section accordions**

Replace:

```tsx
              <Accordion title={vi.nav.products} groups={menu.productGroups} onNavigate={onClose} />
              <Accordion
                title={vi.nav.solutions}
                groups={menu.solutionGroups}
                onNavigate={onClose}
              />
```

with:

```tsx
              {menu.sections.map((section) => (
                <Accordion key={section.key} section={section} onNavigate={onClose} />
              ))}
```

- [ ] **Step 4: Replace the mobile `Accordion` function**

Remove the old `Accordion` function and add this function:

```tsx
function Accordion({
  section,
  onNavigate,
}: {
  section: MegaMenuSection
  onNavigate: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border-soft">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 py-3 text-left text-base font-medium text-ink"
        aria-expanded={open}
      >
        <span>{section.label}</span>
        <ChevronDown className={cn('h-5 w-5 shrink-0 transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-2">
              <p className="mb-3 text-sm leading-6 text-slate">{section.description}</p>
              <Link
                href={section.overviewHref}
                onClick={onNavigate}
                className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-primary"
              >
                {vi.cta.overview}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              {section.groups.length === 0 ? (
                <p className="py-2 text-sm text-slate">Đang cập nhật.</p>
              ) : (
                section.groups.map((group) => (
                  <div key={group.label} className="mb-3">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate">
                      {group.label}
                    </p>
                    <ul className="space-y-1">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={onNavigate}
                            className="block py-1 pr-2 text-sm leading-6 text-slate"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 5: Run typecheck for mobile drawer**

Run:

```bash
npx tsc --noEmit
```

Expected:

```text
No TypeScript errors from src/components/nav/MobileNav.tsx.
```

- [ ] **Step 6: Commit the mobile drawer change**

Run:

```bash
git add -- src/components/nav/MobileNav.tsx
git commit -m "feat: align mobile nav with mega menu sections"
```

Expected:

```text
1 file changed
```

---

### Task 5: Run Integrated Verification

**Files:**
- Verify: `src/components/nav/nav-data.ts`
- Verify: `src/dictionaries/vi.ts`
- Verify: `src/components/nav/HeaderClient.tsx`
- Verify: `src/components/nav/MobileNav.tsx`

- [ ] **Step 1: Confirm no old combined desktop menu usage remains**

Run:

```bash
rg -n "productsSolutions|productGroups|solutionGroups|MegaColumn|overflow-y-auto" src/components/nav
```

Expected:

```text
No matches in HeaderClient.tsx or MobileNav.tsx for productGroups, solutionGroups, MegaColumn, or overflow-y-auto.
productsSolutions may remain only in src/dictionaries/vi.ts for compatibility.
```

- [ ] **Step 2: Run focused TypeScript verification**

Run:

```bash
npx tsc --noEmit
```

Expected:

```text
TypeScript exits successfully.
```

- [ ] **Step 3: Run production build**

Run:

```bash
npm run build
```

Expected:

```text
Next.js build completes successfully.
```

If the build fails because Payload, database, or environment configuration is unavailable, capture the exact error output in the final report and continue to visual verification with the local dev server if the dev server can run.

- [ ] **Step 4: Start local app for visual verification**

Run:

```bash
npm run dev
```

Expected:

```text
Local app starts on http://localhost:3000 or the next available port.
```

Keep the terminal session running while performing the browser checks.

- [ ] **Step 5: Verify desktop behavior**

Open the local app in a browser at a desktop width near 1440px.

Check:

```text
Header shows Nền tảng, Dịch vụ, Giải pháp.
The old Sản phẩm / Giải pháp button is gone.
Hovering each top-level menu opens a full-width panel.
Moving between Nền tảng, Dịch vụ, and Giải pháp switches panels without flicker.
No panel has an internal vertical scrollbar.
The CTA card appears on the right side of each panel.
Clicking a link closes the panel.
Header text remains readable on the homepage hero and after scrolling.
```

- [ ] **Step 6: Verify mobile behavior**

Open the local app in a browser at a mobile width near 390px.

Check:

```text
The drawer opens from the menu button.
The drawer shows Nền tảng, Dịch vụ, Giải pháp accordions.
Each accordion contains a short description, Xem tổng quan, grouped links, and no huge combined catalog list.
Long Vietnamese labels wrap cleanly.
Clicking a link closes the drawer.
The Liên hệ tư vấn CTA remains reachable at the bottom.
```

- [ ] **Step 7: Final review before completion**

Review the diff:

```bash
git diff HEAD~4..HEAD -- src/components/nav/nav-data.ts src/dictionaries/vi.ts src/components/nav/HeaderClient.tsx src/components/nav/MobileNav.tsx
```

Confirm:

```text
No Payload schema changes.
No homepage section changes.
No catalog seed/migration changes.
No unrelated files staged.
No internal menu scrollbar classes remain in the desktop mega menu.
```

---

## Final Report Template

Use this format after implementation:

```markdown
Implemented the Sophos-style header menu redesign.

Changed:
- `src/components/nav/nav-data.ts`: curated three-section mega menu data model.
- `src/dictionaries/vi.ts`: added platform/services/overview labels.
- `src/components/nav/HeaderClient.tsx`: desktop top-level `Nền tảng`, `Dịch vụ`, `Giải pháp` mega panels.
- `src/components/nav/MobileNav.tsx`: matching mobile accordions.

Verification:
- `npx tsc --noEmit`: PASS
- `npm run build`: PASS
- Desktop visual check: PASS
- Mobile visual check: PASS

Notes:
- Missing CMS slugs skipped safely: none observed
- Existing unrelated worktree changes were not staged.
```
