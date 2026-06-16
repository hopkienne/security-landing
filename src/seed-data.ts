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
      'Năm 2026 chứng kiến sự trỗi dậy của các cuộc tấn công sử dụng AI. Doanh nghiệp cần chiến lược phòng thủ thích ứng để đối phó.',
    content: [
      'Trí tuệ nhân tạo đang thay đổi cục diện an ninh mạng theo cả hai hướng tấn công và phòng thủ. Kẻ tấn công sử dụng AI để tự động hóa và tăng tốc các chiến dịch, trong khi đội ngũ phòng thủ tận dụng AI để phát hiện và phản ứng nhanh hơn.',
      { heading: 'Phòng thủ thích ứng là gì?' },
      'Phòng thủ thích ứng kết hợp tự động hóa dựa trên AI với phán đoán của chuyên gia con người, cho phép tổ chức phản ứng với mối đe dọa theo thời gian thực.',
      'Doanh nghiệp nên bắt đầu bằng việc đánh giá hiện trạng và xây dựng lộ trình nâng cao năng lực phát hiện, phản ứng.',
    ],
  },
  {
    slug: 'huong-dan-phong-chong-ransomware',
    title: 'Hướng dẫn phòng chống ransomware cho doanh nghiệp',
    categorySlug: 'bai-viet-chuyen-mon',
    excerpt:
      'Ransomware vẫn là mối đe dọa hàng đầu. Bài viết cung cấp các bước thực tế giúp doanh nghiệp tăng cường phòng thủ.',
    content: [
      'Ransomware tiếp tục là một trong những mối đe dọa gây thiệt hại lớn nhất. Phòng thủ hiệu quả đòi hỏi cách tiếp cận đa lớp.',
      { heading: 'Các bước cơ bản' },
      'Sao lưu dữ liệu thường xuyên và kiểm tra khả năng khôi phục. Triển khai bảo vệ điểm cuối hiện đại. Đào tạo nhân viên nhận biết lừa đảo. Áp dụng nguyên tắc đặc quyền tối thiểu.',
    ],
  },
  {
    slug: 'secureops-ra-mat-dich-vu-mdr',
    title: 'SecureOps ra mắt dịch vụ MDR cho doanh nghiệp Việt Nam',
    categorySlug: 'tin-tuc',
    excerpt:
      'SecureOps chính thức cung cấp dịch vụ Phát hiện & Phản ứng quản lý (MDR) vận hành 24/7 cho thị trường Việt Nam.',
    content: [
      'SecureOps vui mừng thông báo ra mắt dịch vụ MDR, mang đến năng lực giám sát và phản ứng sự cố 24/7 cho doanh nghiệp Việt Nam.',
      'Dịch vụ kết hợp công nghệ AI tiên tiến với đội ngũ chuyên gia bảo mật trong nước, giúp doanh nghiệp đối phó hiệu quả với mối đe dọa ngày càng phức tạp.',
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
