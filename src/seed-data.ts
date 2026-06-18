/**
 * Curated SecureOps seed content.
 *
 * Structure (categories, product/solution taxonomy, key themes) is informed by
 * data/sophos_crawl/sophos_catalog.json, but ALL copy is original Vietnamese and
 * brand-neutral — no verbatim Sophos text, names, or assets. This keeps the public
 * site clean while preserving a realistic enterprise-cybersecurity catalog.
 */

export type SeedProductCategory = {
  slug: string
  name: string
  description: string
  sortOrder: number
}

export type SeedProduct = {
  slug: string
  name: string
  categorySlug: string
  shortDescription: string
  overview: string[]
  keyPoints: string[]
  features: string[]
  benefits: string[]
  sortOrder: number
}

export type SeedSolutionCategory = {
  slug: string
  name: string
  type: 'use_case' | 'industry' | 'compliance' | 'general'
  description: string
  sortOrder: number
}

export type SeedSolution = {
  slug: string
  name: string
  categorySlug: string
  shortDescription: string
  overview: string[]
  painPoints: string[]
  benefits: string[]
  sortOrder: number
}

export const productCategories: SeedProductCategory[] = [
  {
    slug: 'dich-vu-bao-mat-quan-ly',
    name: 'Dịch vụ bảo mật quản lý',
    description: 'Giám sát, phát hiện và phản ứng sự cố 24/7 do đội ngũ chuyên gia thực hiện.',
    sortOrder: 1,
  },
  {
    slug: 'bao-ve-diem-cuoi',
    name: 'Bảo vệ điểm cuối',
    description: 'Bảo vệ máy chủ, máy trạm và thiết bị đầu cuối khỏi tấn công nâng cao.',
    sortOrder: 2,
  },
  {
    slug: 'an-ninh-mang-luoi',
    name: 'An ninh mạng lưới',
    description: 'Tường lửa thế hệ mới, phát hiện bất thường và bảo vệ hạ tầng mạng.',
    sortOrder: 3,
  },
  {
    slug: 'bao-mat-dam-may',
    name: 'Bảo mật đám mây',
    description: 'Bảo vệ khối lượng công việc và hạ tầng trên các nền tảng đám mây.',
    sortOrder: 4,
  },
  {
    slug: 'bao-ve-khong-gian-lam-viec',
    name: 'Bảo vệ không gian làm việc',
    description: 'Bảo mật email, trình duyệt và danh tính cho người dùng cuối.',
    sortOrder: 5,
  },
  {
    slug: 'dich-vu-tu-van',
    name: 'Dịch vụ tư vấn',
    description: 'Đánh giá, kiểm thử và tư vấn chiến lược an ninh mạng.',
    sortOrder: 6,
  },
]

export const products: SeedProduct[] = [
  {
    slug: 'phat-hien-va-phan-ung-quan-ly-mdr',
    name: 'Phát hiện & Phản ứng quản lý (MDR)',
    categorySlug: 'dich-vu-bao-mat-quan-ly',
    shortDescription:
      'Dịch vụ SOC vận hành 24/7 kết hợp AI và chuyên gia, phát hiện và xử lý mối đe dọa trong vài phút.',
    overview: [
      'Dịch vụ Phát hiện & Phản ứng quản lý (MDR) của SecureOps mang đến một trung tâm điều hành an ninh (SOC) vận hành liên tục, kết hợp tốc độ của AI với phán đoán của chuyên gia con người.',
      'Đội ngũ phân tích giám sát môi trường của bạn 24/7, điều tra cảnh báo và chủ động phản ứng để ngăn chặn tấn công trước khi gây thiệt hại.',
    ],
    keyPoints: [
      'Giám sát và phản ứng 24/7 trên toàn bộ môi trường',
      'Kết hợp AI và chuyên gia bảo mật giàu kinh nghiệm',
      'Thời gian phản ứng trung bình dưới 15 phút',
      'Tích hợp với hạ tầng bảo mật hiện có của doanh nghiệp',
    ],
    features: [
      'Săn tìm mối đe dọa chủ động (threat hunting)',
      'Điều tra và phân tích nguyên nhân gốc rễ',
      'Phản ứng và ngăn chặn sự cố từ xa',
      'Báo cáo định kỳ và đánh giá rủi ro',
    ],
    benefits: [
      'Giảm tải cho đội ngũ IT nội bộ',
      'Rút ngắn thời gian phát hiện và xử lý sự cố',
      'Tối ưu chi phí so với xây dựng SOC nội bộ',
    ],
    sortOrder: 1,
  },
  {
    slug: 'quan-ly-rui-ro',
    name: 'Quản lý rủi ro & lỗ hổng',
    categorySlug: 'dich-vu-bao-mat-quan-ly',
    shortDescription:
      'Xác định, ưu tiên và xử lý các lỗ hổng quan trọng cùng khả năng giám sát bề mặt tấn công.',
    overview: [
      'Dịch vụ quản lý rủi ro giúp doanh nghiệp liên tục phát hiện và ưu tiên các lỗ hổng nghiêm trọng, đồng thời cung cấp hướng dẫn khắc phục từ chuyên gia.',
    ],
    keyPoints: [
      'Giám sát bề mặt tấn công liên tục',
      'Ưu tiên lỗ hổng theo mức độ rủi ro thực tế',
      'Hướng dẫn khắc phục từ chuyên gia',
    ],
    features: ['Quét lỗ hổng định kỳ', 'Đánh giá mức độ phơi nhiễm', 'Báo cáo ưu tiên xử lý'],
    benefits: ['Chủ động giảm thiểu rủi ro', 'Tập trung nguồn lực vào vấn đề quan trọng'],
    sortOrder: 2,
  },
  {
    slug: 'bao-ve-diem-cuoi-endpoint',
    name: 'Bảo vệ điểm cuối',
    categorySlug: 'bao-ve-diem-cuoi',
    shortDescription:
      'Ngăn chặn tấn công nâng cao trên máy trạm và máy chủ với công nghệ phát hiện dựa trên AI.',
    overview: [
      'Giải pháp bảo vệ điểm cuối ngăn chặn mã độc, ransomware và các kỹ thuật tấn công nâng cao trước khi chúng ảnh hưởng đến hệ thống.',
      'Tích hợp công cụ phát hiện và phản ứng (EDR) cho phép săn tìm và điều tra hành vi đáng ngờ.',
    ],
    keyPoints: [
      'Chống ransomware và mã độc nâng cao',
      'Phát hiện và phản ứng điểm cuối (EDR)',
      'Triển khai nhẹ, hiệu năng cao',
    ],
    features: [
      'Học máy phát hiện mối đe dọa chưa từng biết',
      'Ngăn chặn khai thác lỗ hổng',
      'Cô lập thiết bị bị nhiễm',
    ],
    benefits: ['Bảo vệ toàn diện điểm cuối', 'Giảm thiểu thời gian gián đoạn'],
    sortOrder: 3,
  },
  {
    slug: 'phat-hien-phan-ung-diem-cuoi-edr',
    name: 'Phát hiện & Phản ứng điểm cuối (EDR)',
    categorySlug: 'bao-ve-diem-cuoi',
    shortDescription:
      'Mở rộng năng lực phát hiện, điều tra và xử lý mối đe dọa lẩn tránh trên điểm cuối và máy chủ.',
    overview: [
      'EDR cung cấp khả năng quan sát sâu vào hoạt động điểm cuối, giúp đội ngũ bảo mật phát hiện, điều tra và vô hiệu hóa các mối đe dọa tinh vi.',
    ],
    keyPoints: ['Quan sát sâu hành vi điểm cuối', 'Điều tra sự cố nhanh chóng', 'Phản ứng tự động'],
    features: ['Ghi nhận dữ liệu telemetry chi tiết', 'Truy vết chuỗi tấn công', 'Khắc phục tự động'],
    benefits: ['Phát hiện mối đe dọa lẩn tránh', 'Rút ngắn thời gian điều tra'],
    sortOrder: 4,
  },
  {
    slug: 'bao-ve-may-chu',
    name: 'Bảo vệ máy chủ & khối lượng công việc',
    categorySlug: 'bao-ve-diem-cuoi',
    shortDescription:
      'Bảo vệ máy chủ vật lý, ảo và đám mây với giải pháp nhẹ, tối ưu cho hiệu năng.',
    overview: [
      'Giải pháp bảo vệ khối lượng công việc máy chủ được tối ưu cho hiệu năng, với cấp phép và triển khai đơn giản trên môi trường lai.',
    ],
    keyPoints: ['Bảo vệ máy chủ vật lý, ảo, đám mây', 'Tối ưu hiệu năng', 'Triển khai linh hoạt'],
    features: ['Giám sát tính toàn vẹn tệp', 'Phát hiện xâm nhập máy chủ', 'Khóa ứng dụng'],
    benefits: ['Bảo vệ hạ tầng quan trọng', 'Tuân thủ yêu cầu bảo mật'],
    sortOrder: 5,
  },
  {
    slug: 'tuong-lua-the-he-moi',
    name: 'Tường lửa thế hệ mới (NGFW)',
    categorySlug: 'an-ninh-mang-luoi',
    shortDescription:
      'Hợp nhất bảo mật mạng với SD-WAN, ZTNA và quản lý tập trung trên nền tảng đám mây.',
    overview: [
      'Tường lửa thế hệ mới hợp nhất nhiều lớp bảo mật mạng, tích hợp SD-WAN, ZTNA và khả năng quản lý tập trung từ đám mây.',
      'Khả năng phối hợp với các giải pháp MDR và XDR giúp tăng cường khả năng quan sát toàn diện.',
    ],
    keyPoints: ['Tích hợp SD-WAN', 'Hỗ trợ ZTNA tích hợp sẵn', 'Quản lý tập trung từ đám mây'],
    features: ['Kiểm soát ứng dụng', 'Lọc web và IPS', 'VPN site-to-site'],
    benefits: ['Đơn giản hóa quản trị mạng', 'Bảo vệ chi nhánh và người dùng từ xa'],
    sortOrder: 6,
  },
  {
    slug: 'phat-hien-phan-ung-mang-ndr',
    name: 'Phát hiện & Phản ứng mạng (NDR)',
    categorySlug: 'an-ninh-mang-luoi',
    shortDescription:
      'Phát hiện hành vi đáng ngờ vượt ra ngoài tường lửa và điểm cuối, tăng khả năng quan sát mạng.',
    overview: [
      'NDR mang lại khả năng quan sát quan trọng vào hoạt động mạng, phát hiện các hành vi bất thường mà tường lửa và điểm cuối có thể bỏ sót.',
    ],
    keyPoints: ['Quan sát toàn bộ lưu lượng mạng', 'Phát hiện bất thường', 'Phát hiện tấn công ẩn'],
    features: ['Phân tích lưu lượng theo thời gian thực', 'Phát hiện C2', 'Cảnh báo bất thường'],
    benefits: ['Phát hiện mối đe dọa nội bộ', 'Tăng khả năng quan sát mạng'],
    sortOrder: 7,
  },
  {
    slug: 'bao-mat-khoi-luong-cong-viec-dam-may',
    name: 'Bảo mật khối lượng công việc đám mây',
    categorySlug: 'bao-mat-dam-may',
    shortDescription:
      'Bảo mật đám mây từ runtime đến phản ứng, với khả năng phát hiện XDR hợp nhất trên đa nền tảng.',
    overview: [
      'Giải pháp bảo mật đám mây cung cấp khả năng phát hiện XDR hợp nhất trên các nền tảng đám mây phổ biến, bảo vệ từ thời điểm chạy đến khi phản ứng sự cố.',
    ],
    keyPoints: ['Hỗ trợ đa nền tảng đám mây', 'Phát hiện XDR hợp nhất', 'Bảo vệ container và máy chủ'],
    features: ['Quản lý tư thế bảo mật đám mây', 'Phát hiện cấu hình sai', 'Giám sát runtime'],
    benefits: ['Quan sát toàn diện môi trường đám mây', 'Tuân thủ và giảm rủi ro'],
    sortOrder: 8,
  },
  {
    slug: 'bao-mat-email',
    name: 'Bảo mật Email',
    categorySlug: 'bao-ve-khong-gian-lam-viec',
    shortDescription:
      'Ngăn chặn mối đe dọa email với bảo vệ đa lớp dựa trên AI và phát hiện giả mạo thương hiệu.',
    overview: [
      'Giải pháp bảo mật email ngăn chặn các mối đe dọa trước khi đến hộp thư người dùng, với nhiều lớp bảo vệ dựa trên AI.',
      'Tích hợp liền mạch với các nền tảng email phổ biến và hỗ trợ mô phỏng tấn công lừa đảo.',
    ],
    keyPoints: ['Bảo vệ đa lớp dựa trên AI', 'Phát hiện giả mạo thương hiệu', 'Tích hợp nền tảng email'],
    features: ['Lọc thư rác và mã độc', 'Chống lừa đảo', 'Quản lý DMARC'],
    benefits: ['Bảo vệ người dùng khỏi lừa đảo', 'Giảm rủi ro qua email'],
    sortOrder: 9,
  },
  {
    slug: 'mo-phong-tan-cong-lua-dao',
    name: 'Mô phỏng tấn công lừa đảo & đào tạo',
    categorySlug: 'bao-ve-khong-gian-lam-viec',
    shortDescription:
      'Đào tạo và kiểm tra nhận thức an ninh của nhân viên qua các chiến dịch mô phỏng lừa đảo tự động.',
    overview: [
      'Giải pháp giúp giáo dục và kiểm tra người dùng cuối thông qua các chiến dịch mô phỏng tấn công lừa đảo tự động, nâng cao nhận thức an ninh.',
    ],
    keyPoints: ['Chiến dịch mô phỏng tự động', 'Bài đào tạo tương tác', 'Báo cáo nhận thức'],
    features: ['Mẫu lừa đảo đa dạng', 'Theo dõi kết quả', 'Khóa học nâng cao nhận thức'],
    benefits: ['Giảm rủi ro do con người', 'Xây dựng văn hóa an ninh'],
    sortOrder: 10,
  },
  {
    slug: 'kiem-thu-bao-mat',
    name: 'Kiểm thử bảo mật & đánh giá',
    categorySlug: 'dich-vu-tu-van',
    shortDescription:
      'Mô phỏng kẻ tấn công thực tế để phát hiện lỗ hổng, kiểm chứng phòng thủ và tăng cường khả năng chống chịu.',
    overview: [
      'Dịch vụ kiểm thử bảo mật mô phỏng các kỹ thuật tấn công thực tế để phát hiện lỗ hổng, kiểm chứng năng lực phòng thủ và củng cố khả năng chống chịu của tổ chức.',
    ],
    keyPoints: ['Kiểm thử xâm nhập do chuyên gia thực hiện', 'Đánh giá toàn diện', 'Báo cáo chi tiết'],
    features: ['Pentest ứng dụng và hạ tầng', 'Đánh giá cấu hình', 'Tư vấn khắc phục'],
    benefits: ['Phát hiện điểm yếu trước kẻ tấn công', 'Đáp ứng yêu cầu kiểm toán'],
    sortOrder: 11,
  },
  {
    slug: 'phan-ung-su-co',
    name: 'Dịch vụ phản ứng sự cố',
    categorySlug: 'dich-vu-tu-van',
    shortDescription:
      'Đội ngũ chuyên gia sẵn sàng 24/7 để xác định và vô hiệu hóa các mối đe dọa đang hoạt động.',
    overview: [
      'Dịch vụ phản ứng sự cố cung cấp đội ngũ chuyên gia sẵn sàng 24/7 để nhanh chóng xác định, ngăn chặn và loại bỏ các mối đe dọa đang hoạt động.',
    ],
    keyPoints: ['Phản ứng khẩn cấp 24/7', 'Ngăn chặn nhanh mối đe dọa', 'Khôi phục sau sự cố'],
    features: ['Điều tra số (forensics)', 'Ngăn chặn và loại bỏ', 'Giám sát tái phát'],
    benefits: ['Giảm thiểu thiệt hại sự cố', 'Khôi phục hoạt động nhanh chóng'],
    sortOrder: 12,
  },
]

export const solutionCategories: SeedSolutionCategory[] = [
  {
    slug: 'theo-nhu-cau',
    name: 'Theo nhu cầu sử dụng',
    type: 'use_case',
    description: 'Giải pháp cho các tình huống bảo mật cụ thể.',
    sortOrder: 1,
  },
  {
    slug: 'theo-nganh',
    name: 'Theo ngành',
    type: 'industry',
    description: 'Giải pháp bảo mật đặc thù theo từng ngành.',
    sortOrder: 2,
  },
  {
    slug: 'tuan-thu',
    name: 'Tuân thủ',
    type: 'compliance',
    description: 'Hỗ trợ đáp ứng các yêu cầu và tiêu chuẩn tuân thủ.',
    sortOrder: 3,
  },
]

export const solutions: SeedSolution[] = [
  {
    slug: 'chong-ransomware',
    name: 'Phòng chống ransomware',
    categorySlug: 'theo-nhu-cau',
    shortDescription:
      'Tăng cường khả năng phòng thủ trước ransomware với phòng ngừa, phát hiện và phản ứng đa lớp.',
    overview: [
      'Ransomware là một trong những mối đe dọa nghiêm trọng nhất đối với doanh nghiệp. Giải pháp của SecureOps kết hợp nhiều lớp phòng thủ để ngăn chặn, phát hiện sớm và phản ứng nhanh trước các cuộc tấn công mã hóa dữ liệu.',
    ],
    painPoints: [
      'Ransomware ngày càng tinh vi và khó phát hiện',
      'Thiệt hại lớn khi dữ liệu bị mã hóa',
      'Thiếu năng lực phản ứng nhanh',
    ],
    benefits: [
      'Ngăn chặn ransomware trước khi mã hóa',
      'Phát hiện và cô lập sớm',
      'Khôi phục nhanh sau sự cố',
    ],
    sortOrder: 1,
  },
  {
    slug: 'bao-ve-moi-truong-microsoft',
    name: 'Bảo vệ môi trường Microsoft',
    categorySlug: 'theo-nhu-cau',
    shortDescription:
      'Mở rộng đội ngũ với chuyên gia giám sát, điều tra và phản ứng cảnh báo bảo mật Microsoft 24/7.',
    overview: [
      'Giải pháp giúp doanh nghiệp tối ưu hóa đầu tư vào hệ sinh thái Microsoft, với chuyên gia giám sát và phản ứng các cảnh báo bảo mật Microsoft 24/7.',
    ],
    painPoints: ['Khối lượng cảnh báo lớn', 'Thiếu chuyên gia chuyên sâu Microsoft', 'Khó phản ứng kịp thời'],
    benefits: ['Tận dụng tối đa đầu tư Microsoft', 'Giám sát chuyên sâu 24/7', 'Phản ứng nhanh'],
    sortOrder: 2,
  },
  {
    slug: 'bao-ve-luc-luong-lam-viec-tu-xa',
    name: 'Bảo vệ lực lượng làm việc từ xa',
    categorySlug: 'theo-nhu-cau',
    shortDescription:
      'Bảo mật cho nhân viên làm việc từ xa với truy cập không tin cậy mặc định và bảo vệ thiết bị.',
    overview: [
      'Khi lực lượng lao động phân tán, bề mặt tấn công mở rộng. Giải pháp bảo vệ làm việc từ xa đảm bảo truy cập an toàn và bảo vệ thiết bị ở mọi nơi.',
    ],
    painPoints: ['Bề mặt tấn công mở rộng', 'Thiết bị ngoài tầm kiểm soát', 'Rủi ro truy cập trái phép'],
    benefits: ['Truy cập an toàn từ mọi nơi', 'Bảo vệ thiết bị đầu cuối', 'Áp dụng zero-trust'],
    sortOrder: 3,
  },
  {
    slug: 'chong-thao-lung-du-lieu',
    name: 'Phòng chống thất thoát dữ liệu',
    categorySlug: 'theo-nhu-cau',
    shortDescription:
      'Ngăn chặn rò rỉ dữ liệu nhạy cảm và bảo vệ tài sản thông tin quan trọng của doanh nghiệp.',
    overview: [
      'Giải pháp phòng chống thất thoát dữ liệu giúp doanh nghiệp kiểm soát và bảo vệ thông tin nhạy cảm, ngăn chặn rò rỉ dù vô tình hay cố ý.',
    ],
    painPoints: ['Rò rỉ dữ liệu nhạy cảm', 'Mối đe dọa nội bộ', 'Khó kiểm soát luồng dữ liệu'],
    benefits: ['Kiểm soát dữ liệu nhạy cảm', 'Phát hiện hành vi bất thường', 'Tuân thủ quy định'],
    sortOrder: 4,
  },
  {
    slug: 'tai-chinh-ngan-hang',
    name: 'Tài chính & Ngân hàng',
    categorySlug: 'theo-nganh',
    shortDescription:
      'Bảo vệ dữ liệu tài chính, giao dịch và hoạt động của tổ chức tài chính, ngân hàng.',
    overview: [
      'Ngành tài chính - ngân hàng là mục tiêu hàng đầu của tội phạm mạng. SecureOps cung cấp giải pháp bảo vệ toàn diện cho dữ liệu, giao dịch và hệ thống quan trọng.',
    ],
    painPoints: ['Mục tiêu tấn công giá trị cao', 'Yêu cầu tuân thủ nghiêm ngặt', 'Rủi ro gian lận'],
    benefits: ['Bảo vệ giao dịch và dữ liệu', 'Đáp ứng yêu cầu tuân thủ', 'Giảm rủi ro gian lận'],
    sortOrder: 5,
  },
  {
    slug: 'y-te',
    name: 'Y tế',
    categorySlug: 'theo-nganh',
    shortDescription:
      'Bảo vệ dữ liệu bệnh nhân và đảm bảo hoạt động liên tục của hệ thống y tế.',
    overview: [
      'Các tổ chức y tế lưu giữ lượng lớn dữ liệu nhạy cảm. Giải pháp của chúng tôi bảo vệ dữ liệu bệnh nhân và đảm bảo dịch vụ y tế không bị gián đoạn.',
    ],
    painPoints: ['Dữ liệu bệnh nhân nhạy cảm', 'Hệ thống cũ dễ tổn thương', 'Yêu cầu hoạt động liên tục'],
    benefits: ['Bảo vệ dữ liệu bệnh nhân', 'Đảm bảo dịch vụ liên tục', 'Tuân thủ quy định y tế'],
    sortOrder: 6,
  },
  {
    slug: 'giao-duc',
    name: 'Giáo dục',
    categorySlug: 'theo-nganh',
    shortDescription:
      'Bảo mật cho cơ sở giáo dục với ngân sách tối ưu và bảo vệ dữ liệu học sinh, sinh viên.',
    overview: [
      'Các cơ sở giáo dục đối mặt với mối đe dọa ngày càng tăng trong khi ngân sách hạn chế. SecureOps cung cấp giải pháp hiệu quả, tối ưu chi phí.',
    ],
    painPoints: ['Ngân sách hạn chế', 'Nhiều người dùng đa dạng', 'Dữ liệu cần bảo vệ'],
    benefits: ['Bảo vệ hiệu quả chi phí', 'Quản lý người dùng dễ dàng', 'Bảo vệ dữ liệu'],
    sortOrder: 7,
  },
  {
    slug: 'san-xuat',
    name: 'Sản xuất',
    categorySlug: 'theo-nganh',
    shortDescription:
      'Bảo vệ hệ thống vận hành (OT) và dây chuyền sản xuất khỏi gián đoạn do tấn công mạng.',
    overview: [
      'Ngành sản xuất hiện đại phụ thuộc vào hệ thống kết nối. Giải pháp của chúng tôi bảo vệ cả CNTT và công nghệ vận hành (OT) để đảm bảo sản xuất liên tục.',
    ],
    painPoints: ['Hệ thống OT dễ tổn thương', 'Gián đoạn sản xuất tốn kém', 'Chuỗi cung ứng phức tạp'],
    benefits: ['Bảo vệ hệ thống OT', 'Đảm bảo sản xuất liên tục', 'Bảo mật chuỗi cung ứng'],
    sortOrder: 8,
  },
  {
    slug: 'tuan-thu-gdpr',
    name: 'Hỗ trợ tuân thủ GDPR',
    categorySlug: 'tuan-thu',
    shortDescription:
      'Hỗ trợ doanh nghiệp đáp ứng các yêu cầu bảo vệ dữ liệu cá nhân theo GDPR.',
    overview: [
      'SecureOps hỗ trợ doanh nghiệp xây dựng và duy trì các biện pháp kỹ thuật cần thiết để đáp ứng yêu cầu bảo vệ dữ liệu cá nhân theo quy định GDPR.',
    ],
    painPoints: ['Yêu cầu bảo vệ dữ liệu phức tạp', 'Rủi ro phạt nặng', 'Khó chứng minh tuân thủ'],
    benefits: ['Đáp ứng yêu cầu kỹ thuật GDPR', 'Giảm rủi ro vi phạm', 'Chứng minh tuân thủ'],
    sortOrder: 9,
  },
  {
    slug: 'tuan-thu-pci-dss',
    name: 'Hỗ trợ tuân thủ PCI DSS',
    categorySlug: 'tuan-thu',
    shortDescription:
      'Hỗ trợ bảo vệ dữ liệu thẻ thanh toán và đáp ứng tiêu chuẩn PCI DSS.',
    overview: [
      'Đối với các tổ chức xử lý thanh toán thẻ, tuân thủ PCI DSS là bắt buộc. Chúng tôi cung cấp các biện pháp bảo mật giúp đáp ứng tiêu chuẩn này.',
    ],
    painPoints: ['Yêu cầu PCI DSS khắt khe', 'Bảo vệ dữ liệu thẻ', 'Kiểm toán định kỳ'],
    benefits: ['Đáp ứng tiêu chuẩn PCI DSS', 'Bảo vệ dữ liệu thanh toán', 'Sẵn sàng kiểm toán'],
    sortOrder: 10,
  },
]

export const postCategories = [
  { slug: 'tin-tuc', name: 'Tin tức', description: 'Tin tức an ninh mạng mới nhất.' },
  {
    slug: 'bai-viet-chuyen-mon',
    name: 'Bài viết chuyên môn',
    description: 'Phân tích và hướng dẫn chuyên sâu về an ninh mạng.',
  },
]

export const samplePosts = [
  {
    slug: 'xu-huong-an-ninh-mang-2026',
    title: 'Xu hướng an ninh mạng 2026: AI và phòng thủ thích ứng',
    categorySlug: 'bai-viet-chuyen-mon',
    excerpt:
      'AI đang làm thay đổi tốc độ, quy mô và mức độ thuyết phục của các cuộc tấn công mạng. Doanh nghiệp cần chuyển từ phòng thủ bị động sang mô hình thích ứng, liên tục học hỏi và phản ứng theo ngữ cảnh.',
    content: [
      'Năm 2026, an ninh mạng không còn là cuộc đua giữa một bên tấn công thủ công và một bên phòng thủ bằng bộ quy tắc cố định. AI đã bước vào cả hai phía. Kẻ tấn công dùng AI để viết email lừa đảo tự nhiên hơn, tạo biến thể mã độc nhanh hơn, tìm kiếm lỗ hổng trên diện rộng và tự động hóa các bước trinh sát. Ở chiều ngược lại, đội ngũ phòng thủ dùng AI để phân tích tín hiệu, ưu tiên cảnh báo, điều tra hành vi bất thường và rút ngắn thời gian phản ứng.',
      'Điểm thay đổi quan trọng không chỉ nằm ở công nghệ, mà nằm ở tốc độ. Một chiến dịch tấn công có thể đi từ thu thập thông tin đến khai thác, leo thang đặc quyền và đánh cắp dữ liệu trong thời gian ngắn hơn nhiều so với trước đây. Nếu doanh nghiệp vẫn vận hành theo nhịp kiểm tra thủ công, họ sẽ luôn chậm hơn một bước.',
      { heading: 'AI làm mối đe dọa trở nên thuyết phục hơn' },
      'Trước đây, nhiều cuộc tấn công lừa đảo có thể bị nhận ra nhờ lỗi chính tả, cách diễn đạt vụng về hoặc nội dung quá chung chung. Với AI tạo sinh, kẻ tấn công có thể viết email đúng ngữ cảnh, đúng vai trò công việc, đúng giọng điệu nội bộ và thậm chí cá nhân hóa theo từng phòng ban. Một yêu cầu thanh toán giả mạo gửi cho bộ phận tài chính, một thông báo đăng nhập gửi cho nhân viên vận hành, hay một lời mời họp giả gửi cho lãnh đạo đều có thể trông rất thật.',
      'AI cũng giúp tội phạm mạng mở rộng quy mô. Thay vì viết một mẫu email rồi gửi hàng loạt, chúng có thể tạo hàng nghìn biến thể khác nhau để tránh bộ lọc truyền thống. Thay vì thử từng lỗ hổng bằng tay, chúng có thể tự động hóa quá trình dò quét và ưu tiên mục tiêu có khả năng thành công cao nhất.',
      { heading: 'Phòng thủ thích ứng là gì?' },
      'Phòng thủ thích ứng là mô hình trong đó hệ thống bảo mật không chỉ chặn những gì đã biết, mà liên tục học từ hành vi, ngữ cảnh và rủi ro thực tế của tổ chức. Thay vì xem mọi cảnh báo như nhau, hệ thống cần hiểu tài khoản nào đang truy cập, thiết bị đó có đáng tin cậy không, hành vi này có lệch khỏi thói quen bình thường không, dữ liệu nào đang bị chạm tới và tác động kinh doanh nếu sự kiện là thật.',
      'Một ví dụ đơn giản: việc nhân viên đăng nhập từ một thành phố khác chưa chắc là nguy hiểm nếu họ đang đi công tác. Nhưng nếu đăng nhập đó đến từ thiết bị chưa từng thấy, ngay sau đó là hành vi tải xuống số lượng lớn tài liệu nhạy cảm và tạo quy tắc chuyển tiếp email, hệ thống phải xem đây là chuỗi rủi ro cao. Phòng thủ thích ứng nằm ở khả năng kết nối các tín hiệu rời rạc thành một câu chuyện có ý nghĩa.',
      { heading: 'Vì sao công cụ rời rạc không đủ' },
      'Nhiều doanh nghiệp đã đầu tư tường lửa, bảo vệ điểm cuối, bảo mật email, quản lý danh tính và giám sát đám mây. Vấn đề là các công cụ này thường tạo ra dữ liệu trong những hệ thống riêng biệt. Khi một sự cố xảy ra, đội ngũ bảo mật phải tự ghép nối log, cảnh báo và bối cảnh từ nhiều nơi. Công việc đó tốn thời gian, trong khi kẻ tấn công lại đang di chuyển rất nhanh.',
      'Phòng thủ thích ứng đòi hỏi một lớp quan sát hợp nhất. Dữ liệu từ điểm cuối, email, danh tính, mạng và đám mây cần được tương quan để giảm nhiễu và làm nổi bật những dấu hiệu thật sự quan trọng. AI có thể hỗ trợ mạnh ở bước này, nhưng không nên được xem là người ra quyết định duy nhất.',
      { heading: 'Con người vẫn giữ vai trò quyết định' },
      'AI phù hợp để xử lý tốc độ và quy mô: đọc log, gom nhóm cảnh báo, phát hiện mẫu bất thường và đề xuất hành động. Tuy nhiên, bối cảnh kinh doanh, mức độ chấp nhận rủi ro và quyết định can thiệp vào hệ thống quan trọng vẫn cần chuyên gia con người. Một hành động cô lập máy chủ có thể đúng về mặt kỹ thuật, nhưng nếu máy chủ đó đang vận hành dây chuyền sản xuất hoặc hệ thống giao dịch, quyết định cần được cân nhắc kỹ.',
      'Vì vậy, chiến lược đúng không phải là thay thế đội ngũ bảo mật bằng AI, mà là dùng AI để tăng năng lực cho đội ngũ. Khi chuyên gia có dữ liệu rõ hơn, cảnh báo ít nhiễu hơn và gợi ý phản ứng nhanh hơn, họ có thể tập trung vào các quyết định có giá trị cao.',
      { heading: 'Doanh nghiệp nên bắt đầu từ đâu' },
      'Bước đầu tiên là đánh giá lại bề mặt tấn công: tài khoản đặc quyền, dịch vụ mở ra Internet, hệ thống chưa vá, dữ liệu nhạy cảm và các điểm tích hợp với bên thứ ba. Tiếp theo, doanh nghiệp cần xác định các kịch bản rủi ro quan trọng nhất, chẳng hạn ransomware, xâm phạm email doanh nghiệp, lạm dụng tài khoản quản trị hoặc rò rỉ dữ liệu khách hàng.',
      'Từ đó, tổ chức có thể xây dựng lộ trình theo từng lớp: củng cố kiểm soát danh tính, triển khai xác thực đa yếu tố, chuẩn hóa quản lý bản vá, tăng khả năng phát hiện trên điểm cuối, giám sát email và kết nối dữ liệu vào một quy trình điều tra thống nhất. Với những doanh nghiệp chưa có đội ngũ SOC đầy đủ, dịch vụ MDR là cách thực tế để có năng lực giám sát và phản ứng 24/7 mà không phải xây dựng mọi thứ từ đầu.',
      'Xu hướng lớn của năm 2026 là rõ ràng: phòng thủ không thể đứng yên. Doanh nghiệp nào biết kết hợp AI, tự động hóa, dữ liệu hợp nhất và phán đoán của chuyên gia sẽ có khả năng chống chịu tốt hơn trước các cuộc tấn công ngày càng nhanh và tinh vi.',
    ],
  },
  {
    slug: 'huong-dan-phong-chong-ransomware',
    title: 'Hướng dẫn phòng chống ransomware cho doanh nghiệp',
    categorySlug: 'bai-viet-chuyen-mon',
    excerpt:
      'Ransomware vẫn là mối đe dọa có tác động lớn nhất với doanh nghiệp. Bài viết đi từ nguyên nhân, chuỗi tấn công thường gặp đến các bước thực tế để giảm rủi ro và phục hồi khi sự cố xảy ra.',
    content: [
      'Ransomware không còn là kiểu mã độc đơn giản chỉ mã hóa máy tính rồi yêu cầu tiền chuộc. Các nhóm tấn công hiện đại thường vận hành như một tổ chức chuyên nghiệp: có đội trinh sát, đội xâm nhập, đội đàm phán và thậm chí có kênh rò rỉ dữ liệu riêng. Mục tiêu của chúng không chỉ là khóa hệ thống, mà còn gây áp lực bằng cách đánh cắp dữ liệu, đe dọa công bố thông tin và làm gián đoạn hoạt động kinh doanh.',
      'Đối với doanh nghiệp, thiệt hại từ ransomware hiếm khi dừng ở chi phí khôi phục kỹ thuật. Nó có thể kéo theo mất doanh thu, vi phạm cam kết dịch vụ, ảnh hưởng uy tín, chi phí pháp lý và thời gian gián đoạn kéo dài. Vì vậy, phòng chống ransomware phải được xem là một chương trình quản trị rủi ro, không chỉ là việc cài thêm phần mềm bảo mật.',
      { heading: 'Ransomware thường bắt đầu như thế nào' },
      'Một cuộc tấn công thường bắt đầu từ những điểm rất quen thuộc: email lừa đảo, thông tin đăng nhập bị lộ, dịch vụ truy cập từ xa cấu hình yếu hoặc lỗ hổng chưa được vá. Sau khi có điểm bám, kẻ tấn công tìm cách leo thang đặc quyền, tắt hoặc né tránh công cụ bảo mật, di chuyển ngang trong mạng và xác định nơi lưu trữ dữ liệu quan trọng.',
      'Giai đoạn nguy hiểm nhất thường diễn ra trước khi mã hóa. Nếu đội ngũ phòng thủ chỉ phát hiện khi màn hình đòi tiền chuộc xuất hiện, tổ chức đã bỏ lỡ nhiều cơ hội can thiệp sớm. Những dấu hiệu như đăng nhập bất thường, tạo tài khoản quản trị mới, quét mạng nội bộ, truy cập hàng loạt file chia sẻ hoặc nén dữ liệu lớn cần được xem là cảnh báo nghiêm trọng.',
      { heading: 'Sao lưu là cần thiết nhưng chưa đủ' },
      'Sao lưu dữ liệu là lớp phòng vệ quan trọng, nhưng không nên là niềm tin duy nhất. Nhiều tổ chức có sao lưu nhưng không kiểm tra khôi phục định kỳ, không tách biệt quyền truy cập hoặc để bản sao lưu nằm trong cùng miền quản trị với hệ thống sản xuất. Khi bị xâm nhập, kẻ tấn công có thể xóa, mã hóa hoặc làm hỏng cả bản sao lưu trước khi triển khai ransomware.',
      'Một chiến lược sao lưu tốt cần có nhiều phiên bản, lưu trữ tách biệt, giới hạn quyền truy cập và kiểm tra khôi phục thường xuyên. Doanh nghiệp nên xác định rõ hệ thống nào phải khôi phục trước, thời gian khôi phục chấp nhận được là bao lâu và dữ liệu nào không được phép mất quá một ngưỡng nhất định.',
      { heading: 'Giảm bề mặt tấn công' },
      'Phòng ransomware bắt đầu bằng việc làm cho kẻ tấn công khó vào hơn. Doanh nghiệp cần quản lý bản vá theo mức độ rủi ro, ưu tiên lỗ hổng đang bị khai thác thực tế và các hệ thống lộ ra Internet. Tất cả truy cập từ xa phải dùng xác thực đa yếu tố, chính sách mật khẩu mạnh và kiểm soát thiết bị.',
      'Tài khoản đặc quyền cần được quản lý nghiêm ngặt. Không nên dùng tài khoản quản trị cho công việc hằng ngày, không chia sẻ tài khoản giữa nhiều người và không cấp quyền rộng hơn nhu cầu thực tế. Nguyên tắc đặc quyền tối thiểu giúp giảm tác động nếu một tài khoản bị chiếm đoạt.',
      { heading: 'Phát hiện sớm trên điểm cuối và danh tính' },
      'Ransomware hiện đại thường sử dụng công cụ hợp lệ có sẵn trong hệ thống để tránh bị phát hiện. Vì vậy, chỉ dựa vào chữ ký mã độc là không đủ. Doanh nghiệp cần khả năng quan sát hành vi trên điểm cuối: tiến trình lạ, script đáng ngờ, thao tác tắt bảo vệ, kết nối điều khiển từ xa hoặc truy cập file bất thường.',
      'Danh tính cũng phải được giám sát như một bề mặt tấn công riêng. Một đăng nhập hợp lệ nhưng đến từ vị trí lạ, thiết bị lạ hoặc dẫn tới hành vi truy cập dữ liệu bất thường cần được điều tra. Kết hợp tín hiệu điểm cuối, email, mạng và danh tính giúp đội ngũ bảo mật phát hiện tấn công trước khi mã hóa xảy ra.',
      { heading: 'Chuẩn bị kế hoạch phản ứng' },
      'Khi sự cố xảy ra, thời gian là yếu tố quyết định. Doanh nghiệp cần có kế hoạch phản ứng ransomware được chuẩn bị trước: ai có quyền ra quyết định, ai phụ trách kỹ thuật, ai liên hệ pháp lý, ai truyền thông với khách hàng, hệ thống nào cần cô lập đầu tiên và bằng chứng nào cần giữ lại để điều tra.',
      'Kế hoạch này phải được diễn tập. Một buổi tabletop exercise có thể giúp phát hiện khoảng trống trong quy trình, chẳng hạn danh sách liên hệ lỗi thời, quyền truy cập khẩn cấp không hoạt động hoặc đội ngũ chưa thống nhất tiêu chí ngắt kết nối hệ thống. Diễn tập càng thực tế, khả năng phản ứng thật càng tốt.',
      { heading: 'Vai trò của MDR trong phòng chống ransomware' },
      'Không phải doanh nghiệp nào cũng có đủ nhân sự để giám sát 24/7, điều tra cảnh báo và phản ứng ngoài giờ làm việc. Đây là khoảng trống mà ransomware thường tận dụng. Dịch vụ MDR giúp bổ sung đội ngũ chuyên gia theo dõi liên tục, săn tìm mối đe dọa và hỗ trợ ngăn chặn khi phát hiện dấu hiệu xâm nhập.',
      'Phòng chống ransomware hiệu quả là sự kết hợp của nhiều lớp: giảm bề mặt tấn công, bảo vệ danh tính, phát hiện hành vi, sao lưu có kiểm chứng, kế hoạch phản ứng rõ ràng và giám sát liên tục. Không có biện pháp đơn lẻ nào đủ mạnh, nhưng khi các lớp này được vận hành cùng nhau, doanh nghiệp có thể giảm đáng kể khả năng bị mã hóa và rút ngắn thời gian phục hồi.',
    ],
  },
  {
    slug: 'secureops-ra-mat-dich-vu-mdr',
    title: 'SecureOps ra mắt dịch vụ MDR cho doanh nghiệp Việt Nam',
    categorySlug: 'tin-tuc',
    excerpt:
      'SecureOps giới thiệu dịch vụ Phát hiện & Phản ứng quản lý (MDR) dành cho doanh nghiệp Việt Nam, kết hợp giám sát 24/7, chuyên gia phân tích và quy trình phản ứng sự cố thực tế.',
    content: [
      'SecureOps chính thức giới thiệu dịch vụ Phát hiện & Phản ứng quản lý (MDR) cho doanh nghiệp tại Việt Nam, nhằm giải quyết một thách thức ngày càng phổ biến: tổ chức có nhiều công cụ bảo mật hơn trước, nhưng vẫn thiếu người, thiếu thời gian và thiếu quy trình để biến cảnh báo thành hành động kịp thời.',
      'Trong bối cảnh ransomware, lừa đảo qua email, xâm phạm danh tính và tấn công vào môi trường đám mây gia tăng, việc chỉ triển khai công cụ phòng ngừa không còn đủ. Doanh nghiệp cần một năng lực vận hành liên tục, có thể theo dõi tín hiệu, xác minh nguy cơ, điều tra nguyên nhân và hỗ trợ phản ứng trước khi sự cố gây thiệt hại lớn.',
      { heading: 'MDR giải quyết khoảng trống vận hành bảo mật' },
      'Nhiều đội ngũ CNTT tại Việt Nam đang phải kiêm nhiệm quá nhiều việc: vận hành hạ tầng, hỗ trợ người dùng, triển khai hệ thống mới và xử lý cảnh báo bảo mật. Khi cảnh báo đến vào ban đêm, cuối tuần hoặc trong thời điểm cao tải, nguy cơ bỏ sót sự kiện quan trọng tăng lên đáng kể. Đây là khoảng trống mà dịch vụ MDR được thiết kế để lấp đầy.',
      'MDR của SecureOps cung cấp khả năng giám sát 24/7, kết hợp dữ liệu từ điểm cuối, danh tính, email, mạng và môi trường đám mây. Thay vì gửi thêm cảnh báo thô cho khách hàng, đội ngũ phân tích sẽ xác minh, phân loại mức độ nghiêm trọng và đưa ra khuyến nghị hoặc hành động phản ứng phù hợp với quy trình đã thống nhất.',
      { heading: 'Kết hợp công nghệ và chuyên gia' },
      'Công nghệ đóng vai trò quan trọng trong việc thu thập tín hiệu, tương quan dữ liệu và phát hiện hành vi bất thường. Tuy nhiên, kinh nghiệm của chuyên gia vẫn là yếu tố quyết định khi cần đánh giá bối cảnh. Một hành vi có thể đáng ngờ ở doanh nghiệp này nhưng lại là hoạt động bình thường ở doanh nghiệp khác. MDR hiệu quả phải hiểu được môi trường vận hành, tài sản quan trọng và ưu tiên kinh doanh của từng khách hàng.',
      'Đội ngũ SecureOps tập trung vào việc giảm nhiễu cho khách hàng. Các cảnh báo được điều tra theo chuỗi sự kiện thay vì xem như từng điểm rời rạc. Khi phát hiện dấu hiệu tấn công, chuyên gia sẽ xác định phạm vi ảnh hưởng, tài khoản hoặc thiết bị liên quan, mức độ lan rộng và bước phản ứng cần thiết.',
      { heading: 'Các tình huống dịch vụ ưu tiên xử lý' },
      'Dịch vụ MDR đặc biệt hữu ích trong các tình huống có tốc độ diễn biến nhanh: ransomware đang ở giai đoạn chuẩn bị, tài khoản quản trị bị lạm dụng, email doanh nghiệp bị xâm phạm, mã độc né tránh công cụ truyền thống hoặc dữ liệu nhạy cảm bị truy cập bất thường. Trong những trường hợp này, phát hiện sớm và phản ứng nhanh có thể tạo khác biệt rất lớn.',
      'SecureOps cũng hỗ trợ săn tìm mối đe dọa chủ động. Thay vì chỉ chờ cảnh báo, đội ngũ phân tích định kỳ rà soát các dấu hiệu tiềm ẩn trong môi trường, chẳng hạn hành vi persistence, công cụ điều khiển từ xa trái phép, script đáng ngờ hoặc cấu hình danh tính có rủi ro cao.',
      { heading: 'Phù hợp với doanh nghiệp đang mở rộng' },
      'Không phải tổ chức nào cũng có điều kiện xây dựng SOC nội bộ hoàn chỉnh. Chi phí tuyển dụng, đào tạo, duy trì ca trực và vận hành nền tảng phân tích bảo mật có thể vượt quá khả năng của nhiều doanh nghiệp. MDR cho phép doanh nghiệp tiếp cận năng lực tương tự SOC theo mô hình dịch vụ, bắt đầu từ phạm vi quan trọng nhất và mở rộng dần theo nhu cầu.',
      'Dịch vụ cũng phù hợp với các tổ chức đã có đội ngũ bảo mật nội bộ nhưng cần tăng cường ngoài giờ, bổ sung chuyên môn điều tra hoặc giảm tải khối lượng cảnh báo. Trong mô hình này, SecureOps đóng vai trò như cánh tay mở rộng của đội ngũ hiện có, phối hợp theo quy trình và kênh liên lạc đã thống nhất.',
      { heading: 'Cam kết hướng tới hiệu quả thực tế' },
      'Mục tiêu của MDR không phải là tạo thêm dashboard, mà là giúp doanh nghiệp giảm rủi ro thật. Điều đó đòi hỏi chỉ số vận hành rõ ràng: thời gian phát hiện, thời gian xác minh, thời gian phản ứng, số cảnh báo được xử lý, các lỗ hổng quy trình được phát hiện và mức độ cải thiện qua từng tháng.',
      'Với việc ra mắt dịch vụ MDR, SecureOps hướng tới việc giúp doanh nghiệp Việt Nam xây dựng năng lực phòng thủ liên tục, thực tế và có thể mở rộng. Khi mối đe dọa ngày càng nhanh, phòng thủ cũng cần vận hành theo nhịp liên tục, có chuyên gia đồng hành và có khả năng phản ứng trước khi sự cố trở thành khủng hoảng.',
    ],
  },
  {
    slug: 'bao-mat-danh-tinh-trong-ky-nguyen-lam-viec-linh-hoat',
    title: 'Bảo mật danh tính trong kỷ nguyên làm việc linh hoạt',
    categorySlug: 'bai-viet-chuyen-mon',
    excerpt:
      'Khi nhân viên làm việc từ nhiều địa điểm, trên nhiều thiết bị và ứng dụng đám mây, danh tính trở thành đường biên bảo mật mới. Doanh nghiệp cần bảo vệ tài khoản như một tài sản trọng yếu.',
    content: [
      'Mô hình làm việc linh hoạt đã thay đổi cách doanh nghiệp vận hành. Nhân viên có thể đăng nhập từ văn phòng, nhà riêng, quán cà phê, chi nhánh hoặc khi đi công tác. Ứng dụng kinh doanh chuyển dần lên đám mây, dữ liệu nằm trong nhiều nền tảng SaaS và thiết bị truy cập không còn luôn nằm trong mạng nội bộ. Trong bối cảnh đó, danh tính trở thành đường biên bảo mật mới.',
      'Kẻ tấn công hiểu rất rõ sự thay đổi này. Thay vì cố gắng phá qua nhiều lớp bảo vệ kỹ thuật, chúng tìm cách chiếm quyền tài khoản. Một mật khẩu bị lộ, một phiên đăng nhập bị đánh cắp hoặc một tài khoản không có xác thực đa yếu tố có thể mở ra con đường vào hệ thống mà không tạo ra dấu hiệu xâm nhập rõ ràng.',
      { heading: 'Tài khoản hợp lệ có thể che giấu hành vi nguy hiểm' },
      'Điểm khó của tấn công danh tính là hoạt động ban đầu thường trông hợp lệ. Hệ thống thấy một người dùng đăng nhập bằng đúng tên tài khoản và mật khẩu. Nếu không có thêm ngữ cảnh, rất khó phân biệt đó là nhân viên thật hay kẻ tấn công đang dùng thông tin bị đánh cắp.',
      'Sau khi đăng nhập, kẻ tấn công có thể đọc email, tìm hóa đơn, thay đổi quy tắc chuyển tiếp, truy cập kho tài liệu, tải dữ liệu nhạy cảm hoặc tìm đường leo thang đặc quyền. Trong nhiều sự cố, hành vi nguy hiểm không bắt đầu bằng mã độc mà bắt đầu bằng một tài khoản bình thường bị lạm dụng.',
      { heading: 'Những điểm yếu thường gặp' },
      'Điểm yếu phổ biến nhất là thiếu xác thực đa yếu tố cho toàn bộ người dùng, đặc biệt là tài khoản quản trị, tài khoản dịch vụ hoặc cổng truy cập từ xa. Điểm yếu thứ hai là cấp quyền quá rộng và không rà soát định kỳ. Khi nhân viên chuyển vai trò hoặc nghỉ việc, quyền truy cập cũ đôi khi vẫn tồn tại.',
      'Một vấn đề khác là thiếu khả năng giám sát hành vi danh tính. Doanh nghiệp có thể biết ai đăng nhập thành công, nhưng không biết phiên đăng nhập đó có bất thường không, có đến từ thiết bị đáng tin cậy không, có truy cập dữ liệu nhạy cảm sau đó không và có tạo thay đổi cấu hình nguy hiểm không.',
      { heading: 'Zero Trust bắt đầu từ danh tính' },
      'Zero Trust không có nghĩa là không tin ai, mà là không mặc định tin tưởng chỉ vì người dùng đã ở trong mạng nội bộ hoặc đã đăng nhập một lần. Mỗi yêu cầu truy cập cần được đánh giá theo ngữ cảnh: người dùng là ai, thiết bị có an toàn không, vị trí có hợp lý không, ứng dụng được truy cập có nhạy cảm không và hành vi có lệch khỏi mẫu bình thường không.',
      'Áp dụng Zero Trust cho danh tính bắt đầu từ những việc cơ bản: bật xác thực đa yếu tố, loại bỏ tài khoản dùng chung, tách tài khoản quản trị khỏi tài khoản làm việc hằng ngày, áp dụng đặc quyền tối thiểu và rà soát quyền truy cập định kỳ. Đây không phải là dự án một lần, mà là chương trình vận hành liên tục.',
      { heading: 'ITDR giúp phát hiện lạm dụng tài khoản' },
      'Phát hiện và phản ứng mối đe dọa danh tính (ITDR) tập trung vào việc tìm các dấu hiệu tài khoản bị lạm dụng, cấu hình danh tính sai hoặc quyền truy cập tạo rủi ro. ITDR có thể cảnh báo khi có đăng nhập bất thường, thay đổi quyền quản trị, tạo ứng dụng OAuth đáng ngờ, tắt chính sách bảo mật hoặc truy cập dữ liệu với mô hình khác thường.',
      'Khi kết hợp ITDR với dữ liệu điểm cuối và email, đội ngũ bảo mật có thể thấy đầy đủ hơn. Ví dụ, một email lừa đảo dẫn đến đăng nhập từ vị trí lạ, sau đó tài khoản tạo quy tắc chuyển tiếp và tải tài liệu nhạy cảm. Từng tín hiệu riêng lẻ có thể không đủ mạnh, nhưng khi ghép lại, chúng cho thấy một cuộc xâm nhập đang diễn ra.',
      { heading: 'Xây dựng chương trình bảo vệ danh tính' },
      'Doanh nghiệp nên bắt đầu bằng kiểm kê tài khoản: người dùng, quản trị viên, tài khoản dịch vụ, ứng dụng tích hợp và quyền truy cập vào dữ liệu quan trọng. Sau đó, ưu tiên bảo vệ nhóm có rủi ro cao nhất bằng MFA, quản lý đặc quyền, cảnh báo hành vi và quy trình phản ứng khi nghi ngờ bị chiếm quyền.',
      'Bảo mật danh tính không chỉ là việc của đội bảo mật. Bộ phận nhân sự, vận hành CNTT, chủ sở hữu ứng dụng và lãnh đạo các phòng ban đều cần phối hợp để đảm bảo quyền truy cập phản ánh đúng vai trò thực tế. Trong kỷ nguyên làm việc linh hoạt, tài khoản người dùng chính là chìa khóa vào doanh nghiệp. Chìa khóa đó cần được quản lý, giám sát và bảo vệ với mức độ nghiêm túc tương xứng.',
    ],
  },
  {
    slug: 'bao-mat-email-va-bec-khi-ai-lam-lua-dao-kho-nhan-ra',
    title: 'Bảo mật email và BEC: Khi AI làm lừa đảo khó nhận ra hơn',
    categorySlug: 'bai-viet-chuyen-mon',
    excerpt:
      'Email vẫn là cửa ngõ quen thuộc của nhiều cuộc tấn công. Khi AI giúp kẻ xấu viết nội dung thuyết phục hơn, doanh nghiệp cần kết hợp công nghệ, quy trình và đào tạo người dùng.',
    content: [
      'Email vẫn là một trong những kênh tấn công hiệu quả nhất vì nó đi thẳng vào quy trình làm việc hằng ngày của con người. Nhân viên nhận báo giá, hợp đồng, hóa đơn, lịch họp, yêu cầu phê duyệt và thông báo hệ thống qua email. Chính sự quen thuộc đó khiến email trở thành môi trường lý tưởng cho lừa đảo, phát tán mã độc và xâm phạm email doanh nghiệp.',
      'Tấn công BEC, hay Business Email Compromise, đặc biệt nguy hiểm vì nó không nhất thiết cần mã độc. Kẻ tấn công có thể giả mạo lãnh đạo, đối tác hoặc nhà cung cấp để yêu cầu chuyển tiền, đổi thông tin tài khoản ngân hàng hoặc gửi dữ liệu nhạy cảm. Khi email được viết đúng ngữ cảnh và gửi vào đúng thời điểm, người nhận rất dễ tin.',
      { heading: 'AI làm email giả mạo giống thật hơn' },
      'AI tạo sinh giúp kẻ tấn công vượt qua nhiều dấu hiệu nhận biết truyền thống. Email lừa đảo không còn đầy lỗi chính tả hoặc câu chữ kỳ lạ. Chúng có thể được viết bằng tiếng Việt tự nhiên, dùng giọng điệu chuyên nghiệp, nhắc tới bối cảnh ngành nghề và cá nhân hóa theo vai trò của người nhận.',
      'Kẻ tấn công cũng có thể tạo nhiều biến thể nội dung để né bộ lọc dựa trên mẫu. Một chiến dịch nhắm vào phòng tài chính có thể dùng ngôn ngữ về hóa đơn và thanh toán, trong khi chiến dịch nhắm vào nhân sự có thể nói về hồ sơ ứng viên hoặc cập nhật chính sách. Sự linh hoạt này khiến việc phòng thủ chỉ bằng danh sách chặn trở nên kém hiệu quả.',
      { heading: 'BEC thường khai thác quy trình yếu' },
      'Điểm chung của nhiều vụ BEC là kẻ tấn công không chỉ khai thác công nghệ, mà khai thác quy trình. Nếu doanh nghiệp cho phép thay đổi thông tin thanh toán chỉ bằng email, không xác minh qua kênh thứ hai hoặc không có ngưỡng phê duyệt rõ ràng, một email giả mạo có thể dẫn tới tổn thất tài chính lớn.',
      'Một biến thể phổ biến là xâm nhập hộp thư của đối tác hoặc nhân viên thật, sau đó theo dõi luồng trao đổi trong nhiều ngày. Khi đến thời điểm phù hợp, kẻ tấn công chen vào cuộc hội thoại với yêu cầu thay đổi tài khoản nhận tiền. Vì email đến từ hộp thư thật và nằm trong chuỗi trao đổi thật, người nhận càng khó nghi ngờ.',
      { heading: 'Bảo vệ email cần nhiều lớp' },
      'Lớp đầu tiên là công nghệ lọc email có khả năng phân tích liên kết, tệp đính kèm, danh tiếng tên miền, hành vi giả mạo và nội dung đáng ngờ. Nhưng công nghệ cần được bổ sung bằng xác thực email như SPF, DKIM và DMARC để giảm nguy cơ giả mạo tên miền. Doanh nghiệp cũng cần bảo vệ tài khoản email bằng MFA và cảnh báo khi có đăng nhập bất thường.',
      'Lớp thứ hai là kiểm soát quy trình. Mọi yêu cầu chuyển tiền, thay đổi thông tin nhà cung cấp hoặc chia sẻ dữ liệu nhạy cảm cần có bước xác minh ngoài email, chẳng hạn gọi lại theo số đã biết trước hoặc phê duyệt qua hệ thống nội bộ. Quy trình tốt giúp giảm tác động ngay cả khi một email giả lọt qua.',
      { heading: 'Đào tạo người dùng phải thực tế' },
      'Đào tạo nhận thức an ninh không nên chỉ là một buổi học dài mỗi năm. Người dùng cần được tiếp xúc với tình huống gần với công việc thật: hóa đơn giả, tài liệu chia sẻ giả, yêu cầu đăng nhập giả, lời mời họp giả hoặc email mạo danh lãnh đạo. Mô phỏng định kỳ giúp đo lường xu hướng và xác định nhóm cần hỗ trợ thêm.',
      'Điều quan trọng là xây dựng văn hóa báo cáo. Nhân viên không nên sợ bị trách phạt khi bấm nhầm hoặc nghi ngờ một email. Nếu họ báo cáo sớm, đội ngũ bảo mật có thể thu hồi email tương tự, chặn tên miền, kiểm tra tài khoản và ngăn sự cố lan rộng. Tốc độ báo cáo đôi khi quan trọng không kém công nghệ chặn.',
      { heading: 'Phát hiện sau khi email lọt qua' },
      'Không có hệ thống nào chặn được mọi email nguy hiểm. Vì vậy, doanh nghiệp cần năng lực phát hiện sau khi người dùng tương tác: đăng nhập từ vị trí lạ, cấp quyền OAuth bất thường, tạo quy tắc chuyển tiếp, tải xuống dữ liệu lớn hoặc gửi email hàng loạt từ tài khoản bị chiếm quyền. Đây là nơi dữ liệu email, danh tính và điểm cuối cần được kết nối.',
      'Trong bối cảnh AI làm lừa đảo ngày càng khó nhận ra, bảo mật email phải được nhìn như một chương trình liên tục. Công nghệ lọc tốt, xác thực tên miền, quy trình tài chính chặt chẽ, MFA, đào tạo thực tế và giám sát tài khoản sau đăng nhập là những lớp bổ sung cho nhau. Khi mỗi lớp làm đúng vai trò, doanh nghiệp có thể giảm đáng kể rủi ro từ email và BEC.',
    ],
  },
  {
    slug: 'kiem-thu-bao-mat-dinh-ky-giup-giam-rui-ro-nhu-the-nao',
    title: 'Kiểm thử bảo mật định kỳ giúp giảm rủi ro như thế nào',
    categorySlug: 'tin-tuc',
    excerpt:
      'Kiểm thử bảo mật không chỉ để tìm lỗi kỹ thuật. Khi được thực hiện định kỳ, hoạt động này giúp doanh nghiệp hiểu bề mặt tấn công, ưu tiên khắc phục và kiểm chứng năng lực phòng thủ.',
    content: [
      'Trong nhiều doanh nghiệp, kiểm thử bảo mật vẫn được xem như một bước cuối trước khi ra mắt hệ thống hoặc như yêu cầu để đáp ứng kiểm toán. Cách nhìn này khiến tổ chức bỏ lỡ giá trị lớn hơn của kiểm thử: hiểu rõ hệ thống có thể bị tấn công như thế nào, điểm yếu nào tạo rủi ro thật sự và năng lực phòng thủ hiện tại có phát hiện được hành vi xâm nhập hay không.',
      'Bề mặt tấn công của doanh nghiệp thay đổi liên tục. Ứng dụng mới được triển khai, API mới được mở, tài khoản mới được cấp quyền, dịch vụ đám mây được cấu hình lại và nhà cung cấp bên thứ ba được kết nối. Một lần kiểm thử duy nhất không thể phản ánh rủi ro trong suốt cả năm.',
      { heading: 'Kiểm thử bảo mật không chỉ là quét lỗ hổng' },
      'Quét lỗ hổng tự động là một phần quan trọng, nhưng chưa đủ. Công cụ có thể phát hiện phiên bản phần mềm lỗi thời, cấu hình yếu hoặc cổng dịch vụ mở. Tuy nhiên, nhiều rủi ro nghiêm trọng nằm ở logic nghiệp vụ, chuỗi quyền truy cập, cấu hình danh tính hoặc cách các hệ thống kết nối với nhau. Những vấn đề này cần kiểm thử thủ công và tư duy của người tấn công.',
      'Ví dụ, một API có thể không có lỗ hổng kỹ thuật rõ ràng nhưng cho phép người dùng truy cập dữ liệu của khách hàng khác nếu thay đổi tham số. Một quy trình đặt lại mật khẩu có thể hoạt động đúng về mặt chức năng nhưng thiếu kiểm soát chống lạm dụng. Những lỗi như vậy thường chỉ xuất hiện khi kiểm thử viên hiểu bối cảnh nghiệp vụ.',
      { heading: 'Tần suất kiểm thử nên dựa trên rủi ro' },
      'Không phải hệ thống nào cũng cần kiểm thử với cùng tần suất. Ứng dụng xử lý dữ liệu khách hàng, hệ thống thanh toán, cổng quản trị, API công khai và hạ tầng lộ ra Internet nên được ưu tiên cao hơn. Ngoài lịch định kỳ, doanh nghiệp nên kiểm thử lại sau các thay đổi lớn như triển khai tính năng quan trọng, chuyển hạ tầng, thay đổi cơ chế xác thực hoặc tích hợp đối tác mới.',
      'Cách tiếp cận dựa trên rủi ro giúp tối ưu ngân sách. Thay vì kiểm thử dàn trải, tổ chức tập trung vào nơi nếu bị xâm nhập sẽ gây tác động lớn nhất. Kết quả kiểm thử cũng nên được phân loại theo khả năng khai thác và tác động kinh doanh, không chỉ theo điểm số kỹ thuật.',
      { heading: 'Từ phát hiện đến khắc phục' },
      'Giá trị của kiểm thử chỉ được hiện thực hóa khi phát hiện được khắc phục. Báo cáo tốt cần mô tả rõ rủi ro, bằng chứng khai thác, tác động, mức độ ưu tiên và hướng khắc phục có thể thực hiện. Đội phát triển và vận hành cần có thời hạn xử lý, người chịu trách nhiệm và cơ chế xác minh lại sau khi sửa.',
      'Một lỗi nghiêm trọng không nên bị chôn trong danh sách dài các khuyến nghị chung chung. Doanh nghiệp cần quy trình đưa phát hiện vào hệ thống quản lý công việc, theo dõi trạng thái và đo lường thời gian khắc phục. Khi kiểm thử được nối với quy trình vận hành, nó trở thành công cụ cải thiện liên tục thay vì tài liệu để lưu trữ.',
      { heading: 'Kiểm chứng năng lực phát hiện' },
      'Kiểm thử hiện đại không chỉ hỏi hệ thống có bị khai thác không, mà còn hỏi đội ngũ bảo mật có nhìn thấy hành vi đó không. Khi kiểm thử viên thử leo thang đặc quyền, tải dữ liệu mẫu hoặc dùng công cụ điều khiển từ xa, SOC hoặc dịch vụ MDR có phát hiện không? Cảnh báo có đủ bối cảnh không? Quy trình phản ứng có được kích hoạt không?',
      'Đây là điểm giao giữa pentest, purple team và đánh giá năng lực phòng thủ. Kết quả không chỉ giúp sửa lỗ hổng, mà còn cải thiện rule phát hiện, playbook phản ứng và khả năng phối hợp giữa các đội.',
      { heading: 'Xây dựng thói quen kiểm thử liên tục' },
      'Doanh nghiệp nên bắt đầu bằng việc xác định tài sản quan trọng, lập lịch kiểm thử theo mức độ rủi ro và chuẩn hóa mẫu báo cáo. Với ứng dụng phát triển nhanh, kiểm thử bảo mật nên được đưa vào quy trình DevSecOps: review thiết kế, kiểm tra mã nguồn, quét phụ thuộc, kiểm thử API và kiểm thử trước khi phát hành.',
      'Kiểm thử bảo mật định kỳ giúp tổ chức nhìn thấy điểm yếu trước khi kẻ tấn công nhìn thấy. Quan trọng hơn, nó tạo ra vòng lặp học hỏi: phát hiện, khắc phục, kiểm chứng và cải thiện. Trong môi trường mối đe dọa thay đổi liên tục, vòng lặp đó là nền tảng để giảm rủi ro một cách bền vững.',
    ],
  },
]

export const sampleCaseStudies = [
  {
    slug: 'ngan-hang-thuong-mai-abc',
    clientName: 'Ngân hàng Thương mại ABC',
    industry: 'Tài chính - Ngân hàng',
    summary:
      'Triển khai dịch vụ MDR và bảo vệ điểm cuối giúp ngân hàng giảm 80% thời gian phát hiện sự cố.',
    challenge: [
      'Ngân hàng ABC đối mặt với khối lượng cảnh báo bảo mật lớn và thiếu đội ngũ chuyên trách để giám sát 24/7, dẫn đến rủi ro bỏ sót mối đe dọa nghiêm trọng.',
    ],
    solution: [
      'SecureOps triển khai dịch vụ MDR kết hợp bảo vệ điểm cuối, cung cấp giám sát liên tục và phản ứng sự cố do chuyên gia thực hiện.',
    ],
    results: [
      'Giảm 80% thời gian phát hiện sự cố',
      'Giám sát 24/7 toàn bộ hệ thống',
      'Tuân thủ yêu cầu của cơ quan quản lý',
    ],
    testimonial: {
      quote:
        'SecureOps đã trở thành cánh tay nối dài của đội ngũ bảo mật chúng tôi, mang lại sự an tâm thực sự.',
      author: 'Nguyễn Văn A',
      role: 'Giám đốc CNTT, Ngân hàng ABC',
    },
  },
  {
    slug: 'tap-doan-san-xuat-xyz',
    clientName: 'Tập đoàn Sản xuất XYZ',
    industry: 'Sản xuất',
    summary:
      'Bảo vệ hệ thống OT và mạng lưới nhà máy, đảm bảo sản xuất liên tục không gián đoạn.',
    challenge: [
      'Tập đoàn XYZ cần bảo vệ hệ thống công nghệ vận hành (OT) trước nguy cơ tấn công có thể gây gián đoạn dây chuyền sản xuất.',
    ],
    solution: [
      'Chúng tôi triển khai giải pháp an ninh mạng lưới kết hợp phát hiện bất thường, bảo vệ cả môi trường CNTT và OT.',
    ],
    results: [
      'Không có sự cố gián đoạn sản xuất',
      'Tăng khả năng quan sát hệ thống OT',
      'Bảo vệ chuỗi cung ứng',
    ],
    testimonial: {
      quote: 'Giải pháp của SecureOps giúp chúng tôi yên tâm vận hành 24/7.',
      author: 'Trần Thị B',
      role: 'Trưởng phòng An ninh thông tin, XYZ',
    },
  },
]

export const sampleJobs = [
  {
    slug: 'ky-su-soc-analyst',
    title: 'Kỹ sư phân tích SOC (SOC Analyst)',
    department: 'Trung tâm điều hành an ninh',
    location: 'TP. Hồ Chí Minh',
    workType: 'full-time' as const,
    experienceLevel: '1-3 năm',
    salaryRange: 'Thỏa thuận',
    summary:
      'Giám sát, phân tích và phản ứng các sự cố an ninh mạng trong trung tâm điều hành an ninh (SOC) vận hành 24/7.',
    responsibilities: [
      'Giám sát cảnh báo bảo mật theo ca',
      'Phân tích và điều tra sự cố',
      'Phối hợp xử lý và ngăn chặn mối đe dọa',
    ],
    requirements: [
      'Kiến thức về SIEM, EDR, mạng',
      'Hiểu biết về các kỹ thuật tấn công phổ biến',
      'Tiếng Anh đọc hiểu tài liệu kỹ thuật',
    ],
    benefits: ['Lương cạnh tranh', 'Đào tạo và chứng chỉ quốc tế', 'Môi trường chuyên nghiệp'],
  },
  {
    slug: 'chuyen-gia-kiem-thu-xam-nhap',
    title: 'Chuyên gia kiểm thử xâm nhập (Penetration Tester)',
    department: 'Dịch vụ tư vấn',
    location: 'Hà Nội',
    workType: 'full-time' as const,
    experienceLevel: '3-5 năm',
    salaryRange: 'Thỏa thuận',
    summary:
      'Thực hiện kiểm thử xâm nhập ứng dụng, hạ tầng và đánh giá bảo mật cho khách hàng doanh nghiệp.',
    responsibilities: [
      'Thực hiện pentest ứng dụng web và hạ tầng',
      'Viết báo cáo và đề xuất khắc phục',
      'Tư vấn bảo mật cho khách hàng',
    ],
    requirements: [
      'Kinh nghiệm pentest thực tế',
      'Chứng chỉ OSCP/CEH là lợi thế',
      'Kỹ năng viết báo cáo tốt',
    ],
    benefits: ['Lương hấp dẫn', 'Cơ hội phát triển chuyên môn', 'Tham gia dự án đa dạng'],
  },
  {
    slug: 'ky-su-bao-mat-dam-may',
    title: 'Kỹ sư bảo mật đám mây (Cloud Security Engineer)',
    department: 'Kỹ thuật',
    location: 'Từ xa',
    workType: 'remote' as const,
    experienceLevel: '2-4 năm',
    salaryRange: 'Thỏa thuận',
    summary:
      'Thiết kế và triển khai các biện pháp bảo mật cho hạ tầng đám mây của khách hàng trên đa nền tảng.',
    responsibilities: [
      'Triển khai bảo mật trên AWS/Azure/GCP',
      'Đánh giá và khắc phục cấu hình sai',
      'Tự động hóa kiểm tra bảo mật',
    ],
    requirements: [
      'Kinh nghiệm với nền tảng đám mây',
      'Hiểu biết về IaC và DevSecOps',
      'Chứng chỉ bảo mật đám mây là lợi thế',
    ],
    benefits: ['Làm việc từ xa', 'Lương cạnh tranh', 'Công nghệ hiện đại'],
  },
]
