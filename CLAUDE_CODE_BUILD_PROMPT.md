# Prompt for Claude Code: SecureOps Cybersecurity Landing + Payload CMS

Bạn là senior full-stack engineer. Hãy xây dựng phase 1 cho project tại workspace hiện tại.

## Mục tiêu

Xây dựng website landing page cho **SecureOps**, một đơn vị tư vấn và triển khai giải pháp an ninh mạng.

Website lấy cảm hứng visual, style, layout và animation từ `https://www.sophos.com/en-gb`, nhưng **không copy 1:1**. Cần giao diện enterprise cybersecurity, hiện đại, nhanh, chuẩn SEO nâng cao.

Admin dùng **Payload CMS**, không tự code CRUD admin từ đầu.

## Trước Khi Làm

- Đọc toàn bộ repo hiện tại.
- Tuân thủ `AGENTS.md` nếu có.
- Khi dùng Next.js, Payload CMS, Tailwind, Framer Motion hoặc thư viện liên quan, dùng Context7 để kiểm tra docs hiện hành.
- Giữ các file crawl hiện có, đặc biệt:
  - `data/sophos_crawl/sophos_catalog.json`
  - `data/sophos_crawl/sophos_crawl.json`
  - `data/sophos_crawl/sophos_index.csv`
  - `data/sophos_crawl/sophos_summary.md`
- Không xóa CSV hiện có.
- Không commit secret thật.

## Kiến Trúc Yêu Cầu

- Next.js App Router + TypeScript.
- Payload CMS chạy cùng app tại `/admin`.
- Database: PostgreSQL qua Payload adapter.
- Admin chỉ dùng Payload built-in admin UI.
- Public site tự code bằng Next.js, không dùng page builder.
- Landing page, animation, layout, mega menu do code kiểm soát.
- Nội dung sản phẩm/giải pháp/blog/case/jobs có thể chỉnh trong Payload.
- Chuẩn bị cấu trúc để sau này làm i18n, nhưng phase 1 chỉ tiếng Việt.

## Brand

- Tên tạm: **SecureOps**.
- Config token: `BRAND_NAME`.
- Định vị: đơn vị tư vấn và triển khai giải pháp an ninh mạng.
- Brand tokens dễ thay:
  - brand name
  - logo text
  - colors
  - typography
  - radius
  - spacing
  - CTA style
- Không có brand asset sẵn, dùng text logo `SecureOps`.
- Tone tiếng Việt: chuyên nghiệp, rõ ràng, tin cậy, không quá salesy.

## Visual Direction

- Phong cách: enterprise cybersecurity inspired by Sophos.
- Không copy Sophos 1:1.
- Nền sáng chủ đạo, nhiều whitespace.
- Accent xanh cyber, teal, cyan hoặc electric blue.
- Tránh dùng đỏ Sophos làm màu chính.
- Motion nhẹ, premium, không lạm dụng.
- Hero có cảm giác cybersecurity:
  - telemetry cards
  - security signals
  - abstract network/defense visuals
  - subtle dashboard motif
- Section sản phẩm/giải pháp dạng enterprise grid, dễ scan.
- Menu mega rõ ràng, mật độ thông tin tốt.
- Blog/case study sạch, SEO-friendly.

## Reference Style / Animation Links

Hãy mở và nghiên cứu các trang sau để tham khảo visual style, layout, spacing, motion, hero treatment, mega menu, CTA, card layout và cách trình bày sản phẩm/giải pháp. Chỉ dùng làm cảm hứng, **không copy 1:1 text, layout hay asset**.

### Primary Reference

- Sophos homepage: https://www.sophos.com/en-gb
- Sophos products overview: https://www.sophos.com/en-gb/products
- Sophos solutions overview: https://www.sophos.com/en-gb/solutions

### Product / Detail References

- Sophos MDR: https://www.sophos.com/en-gb/products/managed-detection-and-response
- Sophos XDR: https://www.sophos.com/en-gb/products/extended-detection-and-response
- Sophos Next-Gen Firewall: https://www.sophos.com/en-gb/products/next-gen-firewall
- Sophos Endpoint Security: https://www.sophos.com/en-gb/products/endpoint-security
- Sophos Cloud Security: https://www.sophos.com/en-gb/products/cloud-native-security
- Sophos Email Security: https://www.sophos.com/en-gb/products/sophos-email

### Solution References

- Neutralize threats / MDR solution: https://www.sophos.com/en-gb/solutions/neutralize-threats
- Ransomware protection: https://www.sophos.com/en-gb/solutions/use-cases/ransomware-protection
- Microsoft environment protection: https://www.sophos.com/en-gb/solutions/use-cases/microsoft
- Cloud-native security: https://www.sophos.com/en-gb/public-cloud
- Education industry: https://www.sophos.com/en-gb/solutions/industries/education
- Healthcare industry: https://www.sophos.com/en-gb/solutions/industries/healthcare

### What To Study

- Header structure and enterprise navigation.
- Mega menu behavior and information density.
- Hero composition: confident headline, short supporting copy, strong CTA.
- Security/cyber visual language: dashboards, signal cards, threat telemetry, abstract network/defense visuals.
- Section rhythm: alternating content bands, product grids, proof points, stats, testimonials/case studies.
- Animation: subtle entrance transitions, hover states, menu reveal, background motion, card interactions.
- SEO-friendly page structure: clear H1, section headings, internal links, product/solution detail pages.

### Important Reference Constraints

- Do not use Sophos logo.
- Do not use Sophos proprietary images/assets.
- Do not copy exact Sophos copy.
- Do not copy exact Sophos red brand palette.
- Build a SecureOps visual system inspired by the same enterprise cybersecurity quality level.
- Prefer teal/electric-blue/cyan accents instead of Sophos red.
- Use original Vietnamese copy for SecureOps.
- If browser tooling is available, capture screenshots of the reference pages before designing.

## Animation Direction

- Keep animations premium and restrained.
- Use motion to communicate cybersecurity signals, not decoration.
- Suggested interactions:
  - Header changes shadow/background on scroll.
  - Mega menu opens with smooth opacity/translate animation.
  - Hero has subtle animated signal lines or floating telemetry cards.
  - Product/Solution cards have hover lift, border glow, and icon motion.
  - Stats count-up only if lightweight and accessible.
  - Sections reveal on scroll with small fade/slide.
- Avoid heavy full-screen gimmicks, excessive particles, slow animations, and purely decorative clutter.

## Trang Phase 1

Tạo các routes sau:

- `/`
- `/gioi-thieu`
- `/san-pham`
- `/san-pham/[slug]`
- `/giai-phap`
- `/giai-phap/[slug]`
- `/khach-hang-du-an`
- `/khach-hang-du-an/[slug]`
- `/tin-tuc`
- `/tin-tuc/[slug]`
- `/tuyen-dung`
- `/tuyen-dung/[slug]`
- `/lien-he`
- `/chinh-sach-bao-mat`
- `/dieu-khoan-su-dung`
- `/cookie-policy` nếu phù hợp

## Navigation

Header navigation:

- Trang chủ
- Giới thiệu công ty
- Sản phẩm / Giải pháp
- Khách hàng / Dự án
- Tin tức / Blog
- Tuyển dụng
- Liên hệ

Footer:

- Thông tin SecureOps
- Sản phẩm
- Giải pháp
- Tin tức / Blog
- Tuyển dụng
- Liên hệ
- Chính sách bảo mật
- Điều khoản sử dụng
- Cookie policy nếu có

## Mega Menu Sản Phẩm / Giải Pháp

Desktop: mega menu 3 cột.

- Cột 1: Sản phẩm theo category.
- Cột 2: Giải pháp theo use case / industry / compliance/general.
- Cột 3: CTA nổi bật:
  - Liên hệ tư vấn
  - Khám phá sản phẩm
  - Xem giải pháp

Mobile:

- Dùng accordion menu.
- Không nhồi nguyên desktop mega menu xuống mobile.
- Dễ đọc, dễ chạm, có trạng thái open/close rõ ràng.

Dữ liệu menu lấy từ Payload `Products` / `Solutions` sau khi seed.

## CTA

- CTA chính toàn site: **Liên hệ tư vấn**.
- CTA phụ: **Xem giải pháp** hoặc **Khám phá sản phẩm**.
- Không dùng “Đặt lịch demo” làm CTA chính ở phase 1.

Form liên hệ nên hướng tới lead tư vấn:

- tên
- công ty
- email/số điện thoại
- nhu cầu
- quy mô doanh nghiệp
- ghi chú

## Payload CMS

Payload chạy cùng Next.js app tại `/admin`.

Không tự code admin CRUD từ đầu. Dùng Payload built-in admin UI. Chỉ custom khi thật sự cần.

Database dùng PostgreSQL qua Payload adapter.

## Payload Collections

### 1. Users

- Một role admin đơn giản.
- Không cần RBAC phức tạp ở phase 1.
- Code nên không khóa đường mở rộng role sau này.

### 2. Media

Dùng upload:

- ảnh bài viết
- ảnh sản phẩm
- ảnh giải pháp
- logo khách hàng
- OG image
- CV file nếu cần

### 3. ProductCategories

Fields:

- name
- slug
- description
- sortOrder
- status

### 4. Products

Fields:

- name
- slug
- category
- shortDescription
- overview
- keyPoints array
- features array
- benefits array
- ctas array:
  - label
  - href
- relatedProducts relationship
- relatedSolutions relationship
- icon/image
- seo:
  - metaTitle
  - metaDescription
  - ogImage
  - canonical
- status: draft/published
- sortOrder

### 5. SolutionTypes hoặc SolutionCategories

Fields:

- name
- slug
- type: use_case / industry / compliance / general
- description
- sortOrder
- status

### 6. Solutions

Fields:

- name
- slug
- type/category
- shortDescription
- overview
- painPoints array
- benefits array
- recommendedProducts relationship
- ctas array
- icon/image
- seo fields
- status
- sortOrder

### 7. Categories

Dành cho Posts.

Fields:

- name
- slug
- description

Seed 2 category:

- Tin tức
- Bài viết chuyên môn

### 8. Posts

Quản lý:

- Tin tức
- Bài viết chuyên môn

Fields:

- title
- slug
- excerpt
- coverImage
- category
- content rich text
- publishedAt
- seo fields
- status: draft/published

### 9. CaseStudies

Quản lý Khách hàng / Dự án.

Fields:

- clientName
- slug
- logo
- industry
- summary
- challenge
- solution
- results
- relatedProducts
- coverImage/gallery
- testimonial
- publishedAt
- seo fields
- status

### 10. Jobs

Quản lý tin tuyển dụng.

Fields:

- title
- slug
- department
- location
- workType: full-time / part-time / contract / remote / hybrid
- experienceLevel
- salaryRange
- summary
- responsibilities
- requirements
- benefits
- applicationEmail optional
- publishedAt
- seo fields
- status

### 11. Leads

Form “Liên hệ tư vấn” tạo record trong collection này.

Fields:

- fullName
- company
- email
- phone
- needType: sản phẩm / giải pháp / tư vấn bảo mật / hỗ trợ khác
- companySize
- message
- sourcePage
- status: mới / đã liên hệ / đang tư vấn / đóng
- internalNote
- createdAt

Behavior:

- Khi submit form liên hệ: lưu vào Payload.
- Gửi email notification nếu env email được cấu hình.
- Nếu chưa có email env thì lưu DB và log rõ.

### 12. JobApplications

Form ứng tuyển tạo record trong collection này.

Fields:

- job relationship
- fullName
- email
- phone
- portfolioUrl / LinkedIn
- cvFile
- coverMessage
- status: mới / đang xem / phỏng vấn / từ chối / nhận
- internalNote
- createdAt

Behavior:

- Khi submit form ứng tuyển: lưu vào Payload.
- Gửi email notification nếu env email được cấu hình.
- Nếu chưa có email env thì lưu DB và log rõ.

### 13. SiteSettings Nếu Hữu Ích

Fields:

- brandName
- phone
- email
- address
- social links
- default SEO
- CTA labels

## Seed / Import Dữ Liệu

Dùng `data/sophos_crawl/sophos_catalog.json` làm nguồn seed ban đầu cho:

- Products
- ProductCategories
- Solutions
- SolutionTypes / SolutionCategories

Yêu cầu rất quan trọng:

- Không copy nguyên văn Sophos ra public.
- Tạo seed script idempotent.
- Đọc JSON crawl.
- Tạo nội dung tiếng Việt đã biên tập lại theo brand SecureOps.
- Có thể giữ cấu trúc, category, ý chính, nhưng wording phải Việt hóa và brand-neutral.
- Seed script không được xóa dữ liệu admin đã chỉnh nếu chạy lại, trừ khi có flag rõ ràng như `--force`.

## SEO Nâng Cao

Dùng Next.js metadata API cho từng route.

Bắt buộc có:

- canonical
- OpenGraph metadata
- Twitter metadata
- `robots.ts`
- `sitemap.ts` động
- JSON-LD structured data

Sitemap động lấy các item published từ:

- Posts
- Products
- Solutions
- CaseStudies
- Jobs

JSON-LD:

- Organization cho toàn site.
- Article cho Posts.
- Product hoặc Service schema cho Products/Solutions nếu phù hợp.
- JobPosting cho Jobs.
- BreadcrumbList cho trang chi tiết.

Slug:

- Thân thiện SEO.
- Tiếng Việt không dấu.
- Không trùng lặp.

## Frontend Requirements

- Responsive desktop/mobile.
- Header sticky nhẹ.
- Mega menu có animation mượt nhưng không nặng.
- Hero trang chủ có visual cybersecurity motion nhẹ.
- Sản phẩm/Giải pháp hiển thị dạng grid rõ ràng, scan nhanh.
- Blog/case/job pages sạch, đọc tốt, SEO tốt.
- Form có validation, loading, success/error states.
- Dùng accessible HTML, focus states, semantic landmarks.
- Tránh text tràn khỏi button/card trên mobile.
- Không dùng UI card lồng card nếu không cần.
- Không dùng placeholder thô cho visual chính.

## Component Gợi Ý

Tạo các components:

- Header
- MegaMenu
- MobileNav
- Footer
- CTASection
- Hero
- ProductCard
- SolutionCard
- BlogCard
- CaseStudyCard
- JobCard
- ContactForm
- JobApplicationForm
- Breadcrumbs
- SEOJsonLd
- SectionHeading

## Thư Viện Đề Xuất

- Tailwind CSS cho styling.
- Framer Motion hoặc motion library phù hợp cho animation nhẹ.
- Lucide React cho icon nếu cần.
- Payload CMS built-in admin.
- Không tự dựng admin CRUD.

## Env

Tạo `.env.example` với:

- `DATABASE_URL`
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `EMAIL_FROM`
- `EMAIL_TO`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`

Nếu email chưa cấu hình, form vẫn phải lưu DB và log rõ rằng email notification bị skip.

## Yêu Cầu Triển Khai

1. Scaffold Next.js + Payload đúng cấu trúc.
2. Cấu hình Payload `/admin`.
3. Cấu hình PostgreSQL adapter.
4. Tạo collections.
5. Tạo seed script từ `sophos_catalog.json`.
6. Tạo frontend pages.
7. Tạo reusable components.
8. Tạo SEO utilities.
9. Tạo `sitemap.ts`, `robots.ts`, JSON-LD helpers.
10. Chạy format/lint/build.
11. Nếu build lỗi, sửa đến khi pass.
12. Khởi động dev server và cung cấp URL local.

## Verification Bắt Buộc

- Install dependencies thành công.
- Lint pass hoặc giải thích rõ nếu template không có lint.
- Build pass.
- Payload admin mở được tại `/admin`.
- Public homepage mở được.
- Products/Solutions được seed từ JSON.
- Contact form tạo `Lead`.
- Job application form tạo `JobApplication`.
- Sitemap hoạt động.
- Robots hoạt động.
- Không có text copy nguyên văn Sophos trên public UI nếu có thể tránh.
- Không xóa dữ liệu crawl/CSV hiện có.

## Không Làm

- Không dùng WordPress.
- Không tự code admin CRUD từ đầu.
- Không biến landing page thành page builder.
- Không copy y nguyên Sophos visual/text.
- Không dùng Sophos logo, images hoặc proprietary assets.
- Không xóa dữ liệu crawl/CSV hiện có.
- Không hardcode secret.

## Kết Quả Mong Muốn Khi Hoàn Thành

Trả lại:

- URL local public site.
- URL local admin `/admin`.
- Tài khoản admin seed nếu có.
- Danh sách file/chức năng chính đã tạo.
- Kết quả verification: install/lint/build.
- Ghi chú env cần cấu hình thêm cho production.
