import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { buildMetadata } from '@/lib/seo'
import { BRAND } from '@/brand/tokens'
import { vi } from '@/dictionaries/vi'

export const metadata: Metadata = buildMetadata({
  title: 'Cookie Policy',
  description: `Chính sách cookie của website ${BRAND.name}.`,
  path: vi.routes.cookies,
})

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Chính sách Cookie" href={vi.routes.cookies}>
      <p>
        Website {BRAND.name} sử dụng cookie để cải thiện trải nghiệm người dùng và phân tích lưu
        lượng truy cập.
      </p>
      <h2>1. Cookie là gì?</h2>
      <p>
        Cookie là các tệp văn bản nhỏ được lưu trên thiết bị của bạn khi truy cập website, giúp ghi
        nhớ tùy chọn và hành vi duyệt web.
      </p>
      <h2>2. Cách chúng tôi sử dụng cookie</h2>
      <p>
        Chúng tôi sử dụng cookie cần thiết cho hoạt động của website và cookie phân tích để hiểu
        cách người dùng tương tác với nội dung.
      </p>
      <h2>3. Quản lý cookie</h2>
      <p>
        Bạn có thể quản lý hoặc xóa cookie thông qua cài đặt trình duyệt. Việc tắt cookie có thể ảnh
        hưởng đến một số chức năng của website.
      </p>
      <p className="text-sm text-slate">Cập nhật lần cuối: 16/06/2026.</p>
    </LegalPage>
  )
}
