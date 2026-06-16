import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { buildMetadata } from '@/lib/seo'
import { BRAND } from '@/brand/tokens'
import { vi } from '@/dictionaries/vi'

export const metadata: Metadata = buildMetadata({
  title: 'Điều khoản sử dụng',
  description: `Điều khoản sử dụng website ${BRAND.name}.`,
  path: vi.routes.terms,
})

export default function TermsPage() {
  return (
    <LegalPage title="Điều khoản sử dụng" href={vi.routes.terms}>
      <p>
        Khi truy cập và sử dụng website {BRAND.name}, bạn đồng ý tuân thủ các điều khoản dưới đây.
      </p>
      <h2>1. Sử dụng nội dung</h2>
      <p>
        Toàn bộ nội dung trên website thuộc quyền sở hữu của {BRAND.name}. Bạn không được sao chép,
        phân phối hoặc sử dụng cho mục đích thương mại khi chưa có sự đồng ý bằng văn bản.
      </p>
      <h2>2. Trách nhiệm người dùng</h2>
      <p>
        Bạn cam kết cung cấp thông tin chính xác khi sử dụng các biểu mẫu và không thực hiện hành
        vi gây ảnh hưởng đến hoạt động của website.
      </p>
      <h2>3. Giới hạn trách nhiệm</h2>
      <p>
        {BRAND.name} không chịu trách nhiệm cho các thiệt hại phát sinh từ việc sử dụng thông tin
        trên website ngoài phạm vi dịch vụ đã thỏa thuận.
      </p>
      <h2>4. Thay đổi điều khoản</h2>
      <p>
        Chúng tôi có thể cập nhật điều khoản theo thời gian. Phiên bản mới sẽ có hiệu lực khi được
        đăng tải trên website.
      </p>
      <p className="text-sm text-slate">Cập nhật lần cuối: 16/06/2026.</p>
    </LegalPage>
  )
}
