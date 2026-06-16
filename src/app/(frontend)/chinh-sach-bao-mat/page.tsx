import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { buildMetadata } from '@/lib/seo'
import { BRAND } from '@/brand/tokens'
import { vi } from '@/dictionaries/vi'

export const metadata: Metadata = buildMetadata({
  title: 'Chính sách bảo mật',
  description: `Chính sách bảo mật thông tin của ${BRAND.name}.`,
  path: vi.routes.privacy,
})

export default function PrivacyPage() {
  return (
    <LegalPage title="Chính sách bảo mật" href={vi.routes.privacy}>
      <p>
        {BRAND.name} cam kết bảo vệ thông tin cá nhân của khách hàng và người dùng truy cập
        website. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.
      </p>
      <h2>1. Thông tin chúng tôi thu thập</h2>
      <p>
        Chúng tôi thu thập thông tin bạn cung cấp khi gửi biểu mẫu liên hệ, đăng ký tư vấn hoặc ứng
        tuyển, bao gồm họ tên, email, số điện thoại, công ty và nội dung trao đổi.
      </p>
      <h2>2. Mục đích sử dụng</h2>
      <p>
        Thông tin được sử dụng để phản hồi yêu cầu, cung cấp dịch vụ tư vấn, và cải thiện trải
        nghiệm người dùng. Chúng tôi không bán dữ liệu cá nhân cho bên thứ ba.
      </p>
      <h2>3. Bảo mật dữ liệu</h2>
      <p>
        Dữ liệu được lưu trữ và bảo vệ bằng các biện pháp kỹ thuật và tổ chức phù hợp nhằm ngăn
        chặn truy cập trái phép.
      </p>
      <h2>4. Quyền của bạn</h2>
      <p>
        Bạn có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình. Vui lòng liên
        hệ {BRAND.email} để được hỗ trợ.
      </p>
      <p className="text-sm text-slate">Cập nhật lần cuối: 16/06/2026.</p>
    </LegalPage>
  )
}
