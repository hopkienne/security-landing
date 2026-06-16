# SecureOps — Cybersecurity Landing + Payload CMS

Website landing page enterprise cho **SecureOps** (đơn vị tư vấn & triển khai giải pháp an ninh mạng), xây dựng bằng **Next.js 15 (App Router) + TypeScript**, nội dung quản trị qua **Payload CMS 3** tại `/admin`, cơ sở dữ liệu **PostgreSQL**.

Giao diện lấy cảm hứng enterprise cybersecurity (tham khảo Sophos) nhưng **không sao chép** — bảng màu teal/cyan/electric-blue, nền sáng, motion tối giản. Toàn bộ nội dung tiếng Việt, brand-neutral.

## Tech stack

- Next.js 15.4.11 (App Router) + React 19 + TypeScript
- Payload CMS 3.85 (admin UI tích hợp, `@payloadcms/db-postgres`)
- Tailwind CSS v4, Motion (Framer Motion), Lucide icons
- PostgreSQL (Docker)

## Yêu cầu

- Node `>= 20.9`
- pnpm 10
- Docker (cho PostgreSQL)

## Khởi chạy nhanh

```bash
# 1. Khởi động PostgreSQL
docker compose up -d db

# 2. Cấu hình môi trường
cp .env.example .env       # chỉnh PAYLOAD_SECRET nếu cần

# 3. Cài đặt
pnpm install

# 4. Nạp dữ liệu mẫu (idempotent — chạy lại an toàn)
pnpm seed                  # thêm --force để ghi đè dữ liệu seed

# 5. Chạy dev
pnpm dev
```

- Public site: http://localhost:3000
- Admin Payload: http://localhost:3000/admin
- Tài khoản admin seed mặc định: `admin@secureops.vn` / `SecureOps#2026`
  (đổi qua `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`)

## Scripts

| Lệnh | Mô tả |
| --- | --- |
| `pnpm dev` | Chạy dev server |
| `pnpm build` | Build production |
| `pnpm start` | Chạy bản build |
| `pnpm lint` | ESLint |
| `pnpm seed` | Nạp dữ liệu mẫu (idempotent, `--force` để ghi đè) |
| `pnpm generate:types` | Sinh `payload-types.ts` |
| `pnpm generate:importmap` | Sinh import map cho admin |

## Cấu trúc chính

```
src/
  payload.config.ts          # cấu hình Payload + Postgres + email
  collections/               # 12 collections (Users, Media, Products, Solutions, ...)
  globals/SiteSettings.ts     # global cấu hình site
  fields/                    # helper field dùng chung (slug, seo, status, ctas)
  access/                    # quy tắc phân quyền
  seed.ts, seed-data.ts      # script seed + dữ liệu tiếng Việt
  brand/tokens.ts            # brand tokens (đổi thương hiệu tại đây)
  dictionaries/vi.ts          # chuỗi UI (i18n-ready)
  lib/                       # queries, seo, jsonld, utils, lexical
  components/                # Header, MegaMenu, MobileNav, Footer, cards, forms, ...
  app/(frontend)/            # public site + server actions
  app/(payload)/             # admin + API (Payload sinh tự động)
  app/sitemap.ts, robots.ts  # SEO
```

## Collections

Users, Media, ProductCategories, Products, SolutionCategories, Solutions, Categories, Posts, CaseStudies, Jobs, Leads, JobApplications + global SiteSettings.

- Form **Liên hệ tư vấn** → tạo bản ghi `Leads`.
- Form **Ứng tuyển** → upload CV vào `Media` + tạo `JobApplications`.
- Khi chưa cấu hình SMTP, form vẫn lưu DB và ghi log rõ ràng (bỏ qua email).

## SEO

- `sitemap.xml` động (gồm Products/Solutions/Posts/CaseStudies/Jobs đã publish).
- `robots.txt` (chặn `/admin`, `/api`).
- Metadata + OpenGraph + Twitter cho từng route, canonical.
- JSON-LD: Organization, Service, Article, JobPosting, BreadcrumbList.
- Slug tiếng Việt không dấu, thân thiện SEO.

## Ghi chú production

- Đặt `PAYLOAD_SECRET`, `DATABASE_URI`, `NEXT_PUBLIC_SITE_URL` thật.
- Cấu hình SMTP (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`, `EMAIL_TO`) để bật email notification.
- Chuyển Postgres sang dùng migrations: tắt `push`, dùng `payload migrate:create` + `payload migrate` (hiện đang dùng `push` cho dev).
- Dữ liệu crawl trong `data/sophos_crawl/` chỉ dùng tham khảo seed, không hiển thị nguyên văn ra public.
