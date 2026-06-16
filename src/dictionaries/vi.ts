/**
 * Vietnamese UI dictionary. Phase 1 is Vietnamese-only, but routing copy through
 * this dictionary keeps the site i18n-ready: add `en.ts` and a locale switch later
 * without touching component JSX.
 */

import { CTA } from '@/brand/tokens'

export const vi = {
  cta: {
    primary: CTA.primary,
    solutions: CTA.secondarySolutions,
    products: CTA.secondaryProducts,
    readMore: 'Tìm hiểu thêm',
    viewAll: 'Xem tất cả',
    apply: 'Ứng tuyển',
    submit: 'Gửi thông tin',
    sending: 'Đang gửi...',
  },
  nav: {
    home: 'Trang chủ',
    about: 'Giới thiệu',
    products: 'Sản phẩm',
    solutions: 'Giải pháp',
    productsSolutions: 'Sản phẩm / Giải pháp',
    customers: 'Khách hàng / Dự án',
    news: 'Tin tức / Blog',
    careers: 'Tuyển dụng',
    contact: 'Liên hệ',
  },
  routes: {
    home: '/',
    about: '/gioi-thieu',
    products: '/san-pham',
    solutions: '/giai-phap',
    customers: '/khach-hang-du-an',
    news: '/tin-tuc',
    careers: '/tuyen-dung',
    contact: '/lien-he',
    privacy: '/chinh-sach-bao-mat',
    terms: '/dieu-khoan-su-dung',
    cookies: '/cookie-policy',
  },
  sections: {
    productsTitle: 'Sản phẩm bảo mật',
    productsSubtitle: 'Danh mục sản phẩm bảo vệ toàn diện cho doanh nghiệp.',
    solutionsTitle: 'Giải pháp theo nhu cầu',
    solutionsSubtitle: 'Giải pháp theo tình huống, ngành và yêu cầu tuân thủ.',
    newsTitle: 'Tin tức & bài viết chuyên môn',
    customersTitle: 'Khách hàng & dự án tiêu biểu',
    careersTitle: 'Cơ hội nghề nghiệp',
  },
  form: {
    fullName: 'Họ và tên',
    company: 'Công ty',
    email: 'Email',
    phone: 'Số điện thoại',
    needType: 'Nhu cầu',
    companySize: 'Quy mô doanh nghiệp',
    message: 'Nội dung',
    coverMessage: 'Thư giới thiệu',
    portfolioUrl: 'Portfolio / LinkedIn',
    cv: 'Tải lên CV (PDF/DOC)',
    successLead:
      'Cảm ơn bạn! Chúng tôi đã nhận được yêu cầu và sẽ liên hệ tư vấn trong thời gian sớm nhất.',
    successApplication:
      'Cảm ơn bạn đã ứng tuyển! Bộ phận tuyển dụng sẽ xem xét hồ sơ và phản hồi sớm.',
    error: 'Đã có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp với chúng tôi.',
    required: 'Vui lòng điền các trường bắt buộc.',
  },
} as const

export type Dictionary = typeof vi
