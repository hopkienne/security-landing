/**
 * Bộ dữ liệu danh mục sản phẩm & giải pháp tiếng Việt đã được làm sạch.
 *
 * Nguồn gốc: dữ liệu crawl từ data/sophos_crawl/sophos_catalog.json — đã được:
 *  - Biên dịch sang tiếng Việt tự nhiên (không dịch máy).
 *  - Gỡ thương hiệu gốc: mọi "Sophos" → "SecureOps".
 *  - Loại bỏ trùng lặp (cloud-workload-protection x3, endpoint x2…) và gộp lại.
 *  - Chuẩn hoá tên sản phẩm theo đúng nghĩa (vd tagline "AI speed. Human judgment."
 *    → "Dịch vụ MDR — Phát hiện & phản ứng được quản lý").
 *
 * Dùng cho src/migrate-catalog.ts để nạp vào Payload (products, solutions, và các
 * danh mục tương ứng).
 */

export type CatalogProductCategory = {
  name: string
  slug: string
  description: string
  sortOrder: number
}

export type CatalogProduct = {
  name: string
  slug: string
  categorySlug: string
  shortDescription: string
  keyPoints: string[]
  features: string[]
  benefits: string[]
  overview: string[]
  sortOrder: number
}

export type CatalogSolutionCategory = {
  name: string
  slug: string
  type: 'use_case' | 'industry' | 'compliance' | 'general'
  description: string
  sortOrder: number
}

export type CatalogSolution = {
  name: string
  slug: string
  categorySlug: string
  shortDescription: string
  painPoints: string[]
  benefits: string[]
  overview: string[]
  sortOrder: number
}

/* ------------------------------------------------------------------ */
/* DANH MỤC SẢN PHẨM                                                   */
/* ------------------------------------------------------------------ */

export const productCategories: CatalogProductCategory[] = [
  {
    name: 'Dịch vụ bảo mật được quản lý',
    slug: 'managed-security-services',
    description:
      'Đội ngũ chuyên gia an ninh mạng vận hành như một trung tâm điều hành bảo mật (SOC) cho doanh nghiệp của bạn — giám sát, phát hiện và phản ứng 24/7.',
    sortOrder: 1,
  },
  {
    name: 'Bảo vệ điểm cuối',
    slug: 'endpoint',
    description:
      'Bảo vệ máy chủ, máy tính và thiết bị di động khỏi mã độc tống tiền, khai thác lỗ hổng và tấn công có chủ đích bằng AI và năng lực phát hiện — phản ứng (EDR/XDR).',
    sortOrder: 2,
  },
  {
    name: 'Bảo mật đám mây',
    slug: 'cloud-security',
    description:
      'Bảo vệ workload, hạ tầng và danh tính trên AWS, Azure, GCP và OCI với năng lực phát hiện XDR hợp nhất, từ thời điểm chạy đến lúc phản ứng.',
    sortOrder: 3,
  },
  {
    name: 'Bảo mật mạng',
    slug: 'network-security',
    description:
      'Bộ giải pháp bảo mật mạng tích hợp: tường lửa thế hệ mới, NDR, SD-WAN, switch và Wi-Fi — quản lý tập trung trên một console duy nhất.',
    sortOrder: 4,
  },
  {
    name: 'Bảo vệ không gian làm việc',
    slug: 'workspace-protection',
    description:
      'Bảo vệ người dùng làm việc từ xa và kết hợp: truy cập Zero Trust, trình duyệt bảo mật, bảo vệ email và DNS, đào tạo nhận thức an ninh.',
    sortOrder: 5,
  },
  {
    name: 'Dịch vụ tư vấn & kiểm thử',
    slug: 'advisory-services',
    description:
      'Kiểm thử bảo mật chủ động và tư vấn chuyên sâu: phát hiện điểm yếu, củng cố phòng thủ và nâng cao khả năng chống chịu trước khi kẻ tấn công ra tay.',
    sortOrder: 6,
  },
]

/* ------------------------------------------------------------------ */
/* SẢN PHẨM (đã gộp trùng, 25 sản phẩm)                                */
/* ------------------------------------------------------------------ */

export const products: CatalogProduct[] = [
  /* --- Dịch vụ bảo mật được quản lý --- */
  {
    name: 'Dịch vụ MDR — Phát hiện & phản ứng được quản lý',
    slug: 'managed-detection-and-response',
    categorySlug: 'managed-security-services',
    shortDescription:
      'Dịch vụ phát hiện và phản ứng 24/7 được quản lý hoàn toàn cho kỷ nguyên AI: AI xử lý tốc độ và quy mô, chuyên gia con người đảm bảo phán đoán và trách nhiệm.',
    keyPoints: [
      'AI điều tra và phản ứng trong vài giây, chuyên gia giám sát và chịu trách nhiệm cho mọi kết quả.',
      'Phần lớn sự cố được xử lý đầu–cuối tự động bởi AI, rút ngắn thời gian từ cảnh báo đến phản ứng.',
      'Tích hợp sẵn với hàng trăm công cụ bảo mật và IT — mang theo stack của bạn hoặc dùng của chúng tôi.',
      'Không giới hạn số lần ứng cứu sự cố trong phạm vi dịch vụ.',
    ],
    features: [
      'Giám sát môi trường 24/7/365 bởi đội ngũ chuyên gia an ninh mạng.',
      'Săn tìm mối đe dọa chủ động kết hợp học máy và phân tích hành vi.',
      'Phản ứng và ngăn chặn mối đe dọa thay mặt khách hàng.',
    ],
    benefits: [
      'Có ngay một trung tâm điều hành bảo mật (SOC) mà không cần tự xây dựng.',
      'Giảm gánh nặng và tình trạng quá tải cảnh báo cho đội ngũ IT nội bộ.',
      'Rút ngắn đáng kể thời gian phát hiện và xử lý sự cố.',
    ],
    overview: [
      'Dịch vụ MDR của SecureOps cung cấp năng lực phát hiện và phản ứng với mối đe dọa được quản lý hoàn toàn, hoạt động liên tục suốt ngày đêm.',
      'AI đảm nhận tốc độ và quy mô, trong khi các chuyên gia của chúng tôi đưa ra phán đoán và chịu trách nhiệm cho từng kết quả — giúp doanh nghiệp ngăn chặn tấn công trước khi gây thiệt hại.',
    ],
    sortOrder: 1,
  },
  {
    name: 'MDR cho môi trường Microsoft',
    slug: 'mdr-for-microsoft',
    categorySlug: 'managed-security-services',
    shortDescription:
      'Mở rộng đội ngũ của bạn với các chuyên gia giám sát, điều tra và phản ứng với cảnh báo bảo mật Microsoft 24/7, tích hợp sâu với Microsoft Defender.',
    keyPoints: [
      'Tích hợp sâu với công nghệ Microsoft để phát hiện và vô hiệu hóa các cuộc tấn công tinh vi mà công cụ đơn lẻ không ngăn được.',
      'Một phần lớn sự cố được kích hoạt từ dữ liệu telemetry của Microsoft.',
      'Tận dụng tối đa khoản đầu tư vào các công cụ Microsoft mà bạn đang sử dụng.',
    ],
    features: [
      'Giám sát và phản ứng với cảnh báo Microsoft Defender for Endpoint và Defender for Business.',
      'Kết hợp dịch vụ MDR hàng đầu với hệ sinh thái Microsoft sẵn có.',
      'Rút ngắn thời gian khắc phục mối đe dọa trong môi trường Microsoft.',
    ],
    benefits: [
      'Tăng cường bảo vệ và giảm rủi ro cho môi trường Microsoft.',
      'Tối ưu hóa giá trị các khoản đầu tư bảo mật hiện có.',
      'Phản ứng nhanh hơn với các mối đe dọa nhắm vào danh tính và điểm cuối.',
    ],
    overview: [
      'SecureOps MDR for Microsoft giúp các tổ chức tận dụng tối đa hệ sinh thái Microsoft, bổ sung chuyên gia con người giám sát và phản ứng 24/7.',
    ],
    sortOrder: 2,
  },
  {
    name: 'Quản lý rủi ro chủ động (Managed Risk)',
    slug: 'managed-risk',
    categorySlug: 'managed-security-services',
    shortDescription:
      'Dịch vụ quản lý lỗ hổng và bề mặt tấn công chủ động: phát hiện, xếp ưu tiên và giám sát các điểm yếu nghiêm trọng trước khi chúng làm gián đoạn doanh nghiệp.',
    keyPoints: [
      'Giảm rủi ro an ninh mạng bằng cách quản lý lỗ hổng trên bề mặt tấn công, cung cấp dưới dạng dịch vụ.',
      'Phần lớn khách hàng phát hiện ra những điểm phơi nhiễm chưa biết ngay trong lần đánh giá đầu tiên.',
      'Nhiều tổ chức bị tấn công tống tiền vì một điểm phơi nhiễm mà họ không hề hay biết.',
    ],
    features: [
      'Giám sát liên tục bề mặt tấn công và khả năng hiển thị điểm phơi nhiễm.',
      'Xếp hạng ưu tiên lỗ hổng theo mức độ nghiêm trọng và khả năng bị khai thác.',
      'Hướng dẫn khắc phục từ chuyên gia bảo mật.',
    ],
    benefits: [
      'Chủ động bịt lỗ hổng trước khi kẻ tấn công kịp khai thác.',
      'Tập trung nguồn lực vào những rủi ro quan trọng nhất.',
      'Nâng cao tư thế an ninh tổng thể của tổ chức.',
    ],
    overview: [
      'SecureOps Managed Risk giúp doanh nghiệp nhìn rõ và kiểm soát bề mặt tấn công của mình, biến việc quản lý lỗ hổng thành một dịch vụ liên tục thay vì một dự án rời rạc.',
    ],
    sortOrder: 3,
  },
  {
    name: 'Dịch vụ ứng cứu sự cố',
    slug: 'incident-response-services',
    categorySlug: 'managed-security-services',
    shortDescription:
      'Đang bị tấn công? Đội ngũ chuyên gia ứng cứu sự cố sẵn sàng 24/7 để nhanh chóng nhận diện, vô hiệu hóa mối đe dọa đang hoạt động và đưa doanh nghiệp trở lại bình thường.',
    keyPoints: [
      'Mỗi giây đều quan trọng — chuyên gia trực 24/7 sẵn sàng nhận diện và vô hiệu hóa mối đe dọa đang hoạt động.',
      'Ứng cứu khẩn cấp để loại bỏ mối đe dọa và giám sát phòng ngừa tái diễn.',
      'Dịch vụ trọn gói chi phí cố định, không lo phát sinh ẩn.',
    ],
    features: [
      'Nhận diện và vô hiệu hóa mối đe dọa đang hoạt động trong thời gian thực.',
      'Điều tra nguyên nhân gốc rễ và đánh giá mức độ xâm phạm.',
      'Săn tìm mối đe dọa và hỗ trợ phục hồi sau sự cố.',
    ],
    benefits: [
      'Phản ứng tức thời với sự cố an ninh nghiêm trọng.',
      'Giảm thiểu thiệt hại và thời gian gián đoạn hoạt động.',
      'Yên tâm với chi phí minh bạch, không bất ngờ.',
    ],
    overview: [
      'Dịch vụ ứng cứu sự cố của SecureOps được hỗ trợ bởi đội ngũ chuyên gia tinh nhuệ, có thể ngay lập tức nhận diện và vô hiệu hóa các mối đe dọa đang diễn ra.',
      'Dù là lây nhiễm, xâm phạm hay nỗ lực truy cập trái phép, đội ngũ ứng cứu từ xa 24/7 của chúng tôi đều đã từng gặp và xử lý.',
    ],
    sortOrder: 4,
  },
  {
    name: 'Nền tảng quản lý bảo mật tập trung',
    slug: 'security-platform',
    categorySlug: 'managed-security-services',
    shortDescription:
      'Nền tảng đám mây hợp nhất mọi giải pháp bảo mật thế hệ mới: quản lý điểm cuối, email, di động và máy chủ từ một console mạnh mẽ duy nhất.',
    keyPoints: [
      'Một console duy nhất để quản lý toàn bộ an ninh mạng của doanh nghiệp.',
      'Khám phá đầy đủ các giải pháp: điểm cuối, tường lửa, email, di động và bảo vệ máy chủ.',
      'Tích hợp sẵn, tương thích với các công cụ an ninh và IT bạn đang dùng.',
    ],
    features: [
      'Quản lý tập trung mọi sản phẩm bảo mật trên nền tảng đám mây.',
      'Đồng bộ hóa bảo mật giữa điểm cuối, mạng và các lớp phòng thủ.',
      'Bảng điều khiển trực quan với báo cáo và cảnh báo theo thời gian thực.',
    ],
    benefits: [
      'Giảm thời gian và công sức vận hành an ninh của đội ngũ IT.',
      'Tăng hiệu quả nhờ quản lý tất cả từ một nơi.',
      'Mở rộng linh hoạt theo nhu cầu phát triển của doanh nghiệp.',
    ],
    overview: [
      'Nền tảng quản lý bảo mật tập trung của SecureOps là trung tâm điều khiển hợp nhất mọi giải pháp an ninh thế hệ mới, mang lại hiệu quả vận hành và khả năng hiển thị toàn diện.',
    ],
    sortOrder: 5,
  },

  /* --- Bảo vệ điểm cuối --- */
  {
    name: 'Bảo vệ điểm cuối (Endpoint Security)',
    slug: 'endpoint-security',
    categorySlug: 'endpoint',
    shortDescription:
      'Giải pháp bảo vệ điểm cuối hợp nhất với EDR, được xây dựng để đánh bại các cuộc tấn công bằng AI — chặn đứng kỹ thuật nằm ở trung tâm của mọi cuộc tấn công.',
    keyPoints: [
      'Giải pháp hợp nhất Bảo vệ điểm cuối và EDR, chặn các kỹ thuật cốt lõi của tấn công dù do con người hay AI thực hiện.',
      'Nhiều cuộc tấn công tống tiền khởi đầu từ một lỗ hổng bị khai thác.',
      'Năng lực chống mã độc tống tiền, phát hiện hành vi, ngăn khai thác và phòng thủ thích ứng mạnh mẽ.',
    ],
    features: [
      'Chống mã độc tống tiền nội bộ và từ xa.',
      'AI học sâu phát hiện mối đe dọa chưa từng thấy.',
      'Phòng thủ thích ứng tự động tăng cường khi bị tấn công.',
    ],
    benefits: [
      'Ngăn chặn tấn công trước khi gây ảnh hưởng đến hệ thống.',
      'Giảm bề mặt tấn công và rủi ro gián đoạn kinh doanh.',
      'Bảo vệ toàn diện trên Windows, macOS và máy chủ.',
    ],
    overview: [
      'Bảo vệ điểm cuối của SecureOps mang lại sự bảo vệ vượt trội, ngăn chặn các cuộc tấn công nâng cao trước khi chúng tác động đến hệ thống.',
      'Các công cụ phát hiện và phản ứng mạnh mẽ (EDR/XDR) cho phép tổ chức săn tìm, điều tra và phản ứng với hoạt động đáng ngờ.',
    ],
    sortOrder: 6,
  },
  {
    name: 'Phát hiện & phản ứng điểm cuối (EDR)',
    slug: 'edr',
    categorySlug: 'endpoint',
    shortDescription:
      'Mở rộng năng lực bảo vệ điểm cuối với khả năng phát hiện và phản ứng, giúp nhận diện, điều tra và vô hiệu hóa các mối đe dọa lẩn tránh trên điểm cuối và máy chủ.',
    keyPoints: [
      'Giải pháp toàn diện dành cho chuyên viên phân tích bảo mật và quản trị IT.',
      'Bảo vệ điểm cuối và máy chủ khỏi các cuộc tấn công nâng cao do con người dẫn dắt.',
      'Nhiều sự cố bắt đầu từ tấn công danh tính — mối đe dọa mà công cụ phòng ngừa khó nhìn thấy.',
    ],
    features: [
      'Cô lập điểm cuối và can thiệp thủ công khi điều tra hoạt động đáng ngờ.',
      'Truy cập shell từ xa an toàn, có kiểm soát và ghi nhật ký.',
      'Săn tìm mối đe dọa và phân tích nguyên nhân gốc rễ.',
    ],
    benefits: [
      'Nhận diện và vô hiệu hóa các mối đe dọa lẩn tránh.',
      'Tăng tốc độ và độ chính xác khi khắc phục sự cố.',
      'Tăng cường khả năng hiển thị trên toàn bộ điểm cuối và máy chủ.',
    ],
    overview: [
      'EDR của SecureOps củng cố phòng thủ điểm cuối bằng cách cho phép bạn nhận diện, điều tra và vô hiệu hóa các mối đe dọa lẩn tránh trên toàn bộ điểm cuối và máy chủ.',
    ],
    sortOrder: 7,
  },
  {
    name: 'Phát hiện & phản ứng mở rộng (XDR)',
    slug: 'extended-detection-and-response',
    categorySlug: 'endpoint',
    shortDescription:
      'Nền tảng XDR phòng thủ trước các đối thủ đang hoạt động, cung cấp công cụ và trí tuệ về mối đe dọa để phát hiện, điều tra và phản ứng trên toàn bộ hệ sinh thái IT.',
    keyPoints: [
      'Phát hiện, điều tra và phản ứng với hoạt động đáng ngờ trên toàn bộ hệ sinh thái IT.',
      'Phần lớn tấn công tống tiền dùng thông tin xác thực hợp lệ hoặc khai thác lỗ hổng chưa biết để xâm nhập.',
      'Hợp nhất tín hiệu từ điểm cuối, mạng, đám mây và danh tính vào một quy trình điều tra.',
    ],
    features: [
      'Hợp nhất telemetry từ toàn bộ hạ tầng vào một data lake trung tâm.',
      'Tương quan tín hiệu bằng phân tích AI để làm nổi bật điều quan trọng.',
      'Quy trình điều tra và phản ứng thống nhất, không khoảng mù.',
    ],
    benefits: [
      'Loại bỏ khoảng mù do các công cụ rời rạc tạo ra.',
      'Giảm tải cảnh báo và tình trạng quá tải cho chuyên viên.',
      'Theo dấu một cuộc tấn công từ điểm xâm nhập đến khi xử lý xong.',
    ],
    overview: [
      'XDR của SecureOps cung cấp công cụ mạnh mẽ và trí tuệ về mối đe dọa, cho phép bạn phát hiện, điều tra và phản ứng trên toàn bộ hệ sinh thái IT thông qua nền tảng AI-native mở.',
    ],
    sortOrder: 8,
  },
  {
    name: 'XDR với SIEM thế hệ mới',
    slug: 'xdr-with-next-gen-siem',
    categorySlug: 'endpoint',
    shortDescription:
      'Một hệ thống phòng thủ AI-native hợp nhất bảo vệ, phát hiện, phản ứng và tuân thủ — kết hợp vận hành bảo mật với khả năng lưu trữ phục vụ kiểm toán lên tới 10 năm.',
    keyPoints: [
      'Hệ thống phòng thủ AI-native hợp nhất bảo vệ, phát hiện, điều tra, phản ứng và lưu trữ dữ liệu dài hạn.',
      'Tích hợp công nghệ rộng khắp mang lại khả năng hiển thị đầy đủ trước mối đe dọa do con người và AI.',
      'Playbook tự động hóa dựng sẵn giúp tăng tốc phản ứng với mối đe dọa.',
    ],
    features: [
      'Lưu trữ dữ liệu phục vụ bảo mật và tuân thủ.',
      'Tự động hóa quy trình phản ứng với playbook linh hoạt.',
      'Tích hợp với hạ tầng công cụ hiện có của doanh nghiệp.',
    ],
    benefits: [
      'Hợp nhất vận hành bảo mật trên một nền tảng duy nhất.',
      'Đáp ứng yêu cầu lưu trữ và kiểm toán dài hạn.',
      'Phản ứng nhanh hơn với mối đe dọa hiện đại.',
    ],
    overview: [
      'XDR với SIEM thế hệ mới của SecureOps hợp nhất bảo vệ, phát hiện, điều tra, phản ứng và lưu trữ dữ liệu dài hạn — giúp đội ngũ ngăn chặn các cuộc tấn công hiện đại nhanh hơn.',
    ],
    sortOrder: 9,
  },
  {
    name: 'Phát hiện & phản ứng mối đe dọa danh tính (ITDR)',
    slug: 'identity-threat-detection-and-response',
    categorySlug: 'endpoint',
    shortDescription:
      'Nhận diện và phản ứng với các mối đe dọa vượt qua kiểm soát danh tính truyền thống, giám sát cấu hình sai và cung cấp thông tin về thông tin xác thực bị lộ.',
    keyPoints: [
      'Phát hiện và phản ứng với mối đe dọa né tránh các kiểm soát bảo mật danh tính truyền thống.',
      'Phần lớn tổ chức từng trải qua ít nhất một vụ xâm phạm liên quan đến danh tính trong năm qua.',
      'Giám sát dark web để phát hiện thông tin xác thực bị lộ.',
    ],
    features: [
      'Giám sát cấu hình sai và rủi ro liên quan đến danh tính.',
      'Cảnh báo khi phát hiện lạm dụng thông tin xác thực.',
      'Cung cấp thông tin tình báo về thông tin xác thực bị xâm phạm.',
    ],
    benefits: [
      'Bịt kín lỗ hổng danh tính — con đường tấn công phổ biến nhất.',
      'Nâng cao tư thế bảo mật danh tính của tổ chức.',
      'Phát hiện sớm trước khi thông tin xác thực bị lạm dụng.',
    ],
    overview: [
      'ITDR của SecureOps giúp tổ chức nhận diện và phản ứng với các mối đe dọa vượt qua kiểm soát danh tính truyền thống, đồng thời giám sát cấu hình sai và thông tin xác thực bị lộ.',
    ],
    sortOrder: 10,
  },
  {
    name: 'Bảo vệ workload máy chủ',
    slug: 'server-security',
    categorySlug: 'endpoint',
    shortDescription:
      'Bảo vệ máy chủ linh hoạt, nhẹ và tối ưu hiệu năng với cấp phép và triển khai đơn giản — cho cả môi trường đa đám mây, tại chỗ, ảo hóa hoặc kết hợp.',
    keyPoints: [
      'Bảo vệ máy chủ Windows và Linux dù trên đa đám mây, tại chỗ, ảo hóa hay kết hợp.',
      'Triển khai đơn giản với một agent duy nhất, áp dụng chính sách cho mọi máy chủ.',
      'Được công nhận là giải pháp dẫn đầu trong lĩnh vực bảo vệ điểm cuối.',
    ],
    features: [
      'Agent nhẹ, tối ưu hiệu năng máy chủ.',
      'Áp dụng chính sách thống nhất trong môi trường hỗn hợp.',
      'Tích hợp với dịch vụ MDR để giám sát 24/7.',
    ],
    benefits: [
      'Bảo vệ máy chủ ở mọi nơi với cấu hình đơn giản.',
      'Giảm tác động đến hiệu năng hệ thống.',
      'Quản lý nhất quán dù môi trường phức tạp.',
    ],
    overview: [
      'Bảo vệ workload máy chủ của SecureOps mang lại sự linh hoạt với agent nhẹ, tối ưu hiệu năng, cấp phép và triển khai đơn giản trên mọi môi trường.',
    ],
    sortOrder: 11,
  },
  {
    name: 'Quản lý & bảo mật thiết bị di động',
    slug: 'mobile-security',
    categorySlug: 'endpoint',
    shortDescription:
      'Giải pháp quản lý điểm cuối hợp nhất (UEM) bảo vệ người dùng, thiết bị và dữ liệu doanh nghiệp khỏi các mối đe dọa di động đã biết và chưa từng thấy.',
    keyPoints: [
      'Bảo vệ người dùng, thiết bị và dữ liệu doanh nghiệp khỏi mối đe dọa di động.',
      'Quản lý tập trung iOS, Android, Windows và macOS trên một nền tảng.',
      'Chống virus và mối đe dọa cho thiết bị di động doanh nghiệp.',
    ],
    features: [
      'Quản lý điểm cuối hợp nhất (UEM) đa nền tảng.',
      'Áp dụng chính sách bảo mật và tuân thủ cho thiết bị di động.',
      'Bảo vệ dữ liệu doanh nghiệp trên thiết bị cá nhân (BYOD).',
    ],
    benefits: [
      'Kiểm soát và bảo vệ toàn bộ thiết bị di động từ một nơi.',
      'Bảo vệ dữ liệu nhạy cảm trên thiết bị di động.',
      'Hỗ trợ làm việc linh hoạt mà vẫn an toàn.',
    ],
    overview: [
      'Giải pháp quản lý thiết bị di động của SecureOps bảo vệ người dùng, thiết bị và dữ liệu doanh nghiệp khỏi cả những mối đe dọa di động đã biết lẫn chưa từng thấy.',
    ],
    sortOrder: 12,
  },

  /* --- Bảo mật đám mây --- */
  {
    name: 'Bảo vệ workload đám mây',
    slug: 'cloud-workload-protection',
    categorySlug: 'cloud-security',
    shortDescription:
      'Bảo mật đám mây AI-native từ thời điểm chạy đến lúc phản ứng, với năng lực phát hiện XDR hợp nhất trên AWS, Azure, GCP, OCI, Kubernetes, Linux và Windows Server.',
    keyPoints: [
      'Hợp nhất telemetry đám mây từ host, container và dịch vụ vào cùng một quy trình điều tra XDR.',
      'Bảo vệ toàn diện trên AWS, Azure, GCP và OCI — dù bạn xây dựng theo cách nào.',
      'Đưa tín hiệu danh tính đám mây vào quy trình, phát hiện lạm dụng thông tin xác thực và cấu hình IAM sai.',
    ],
    features: [
      'Phát hiện theo thời gian chạy cho host Linux/Windows và container Kubernetes.',
      'Hiển thị sâu vào control plane và ngữ cảnh lưu lượng đám mây.',
      'Phát hiện dựa trên AI cho mã độc, khai thác và hành vi bất thường.',
    ],
    benefits: [
      'Một console, một quy trình điều tra — không khoảng mù.',
      'Phát hiện sớm các mối đe dọa đặc thù của đám mây.',
      'Phản ứng nhanh nhờ playbook tự động.',
    ],
    overview: [
      'Bảo vệ workload đám mây của SecureOps mang lại bảo mật AI-native từ thời điểm chạy đến lúc phản ứng, hợp nhất phát hiện XDR trên mọi nền tảng đám mây lớn.',
      'Kẻ tấn công không đứng yên một chỗ — chúng di chuyển qua đám mây, điểm cuối, mạng và danh tính. SecureOps kết nối tín hiệu từ toàn bộ hạ tầng vào một quy trình duy nhất.',
    ],
    sortOrder: 13,
  },

  /* --- Bảo mật mạng --- */
  {
    name: 'Tường lửa thế hệ mới',
    slug: 'next-gen-firewall',
    categorySlug: 'network-security',
    shortDescription:
      'Tường lửa thế hệ mới Secure by Design: tích hợp MDR/XDR, SD-WAN toàn diện, hỗ trợ SSE/SASE, quản lý đám mây và ZTNA tích hợp sẵn.',
    keyPoints: [
      'Hợp nhất, đơn giản hóa và tiết kiệm với một tường lửa Secure by Design.',
      'Được làm cứng từ mã nguồn đến lõi với vá lỗi tự động và giám sát toàn vẹn từ xa.',
      'Chặn đứng tấn công với NDR tích hợp, Synchronized Security và Active Threat Response.',
    ],
    features: [
      'Bảo vệ zero-day bằng AI với kiến trúc Xstream thế hệ mới.',
      'Vá lỗi tự động và kiểm tra sức khỏe cấu hình rủi ro.',
      'Quản lý toàn bộ mạng từ một console đám mây duy nhất.',
    ],
    benefits: [
      'Bảo vệ mạnh mẽ với hiệu năng vượt trội cho mạng lai.',
      'Giảm rủi ro cấu hình sai nhờ tự động hóa.',
      'Phản ứng tự động khi phát hiện thiết bị bị xâm phạm.',
    ],
    overview: [
      'Tường lửa thế hệ mới của SecureOps là tường lửa được làm cứng nhất trên thị trường, với các tính năng độc đáo như vá lỗi tự động, kiểm tra sức khỏe cấu hình và giám sát toàn vẹn từ xa.',
    ],
    sortOrder: 14,
  },
  {
    name: 'Phát hiện & phản ứng mạng (NDR)',
    slug: 'network-detection-and-response',
    categorySlug: 'network-security',
    shortDescription:
      'Phát hiện các hành vi đáng ngờ vượt ra ngoài tường lửa và điểm cuối, mang lại khả năng hiển thị quan trọng vào hoạt động mạng.',
    keyPoints: [
      'Giám sát lưu lượng sâu trong mạng, gửi hoạt động đáng ngờ về data lake để phân tích.',
      'Nhận diện kỹ thuật sinh tên miền động mà mã độc dùng để né tránh phát hiện.',
      'Phối hợp với tường lửa để cô lập và chặn hoạt động độc hại theo thời gian thực.',
    ],
    features: [
      'Engine logic mạnh mẽ gửi cảnh báo dựa trên rủi ro theo phiên.',
      'Console điều tra để phân tích pháp y chuyên sâu.',
      'Hiển thị tức thời lưu lượng và luồng rủi ro trong mạng.',
    ],
    benefits: [
      'Phát hiện mối đe dọa ẩn nấp trong mạng nội bộ.',
      'Phản ứng tự động phối hợp với các lớp phòng thủ khác.',
      'Tăng khả năng hiển thị vào các điểm mù của mạng.',
    ],
    overview: [
      'NDR của SecureOps phối hợp với điểm cuối và tường lửa được quản lý để giám sát hoạt động mạng, phát hiện các mẫu đáng ngờ và độc hại.',
    ],
    sortOrder: 15,
  },
  {
    name: 'SD-WAN',
    slug: 'sd-wan',
    categorySlug: 'network-security',
    shortDescription:
      'Giải pháp SD-WAN triển khai zero-touch chi phí hợp lý, không phát sinh phí cấp phép và không cần kỹ năng kỹ thuật tại điểm chi nhánh.',
    keyPoints: [
      'Đạt mục tiêu kết nối mạng diện rộng đơn giản và tiết kiệm.',
      'Cân bằng tải qua nhiều đường truyền với định tuyến theo hiệu năng và SLA.',
      'Mở rộng mạng tới chi nhánh và điểm từ xa cực kỳ đơn giản.',
    ],
    features: [
      'Triển khai zero-touch, không cần kỹ năng kỹ thuật tại chỗ.',
      'Chọn đường truyền theo độ trễ, jitter và mất gói thời gian thực.',
      'Tăng tốc đường hầm VPN IPsec bằng phần cứng chuyên dụng.',
    ],
    benefits: [
      'Chuyển phiên liền mạch khi đường truyền gặp sự cố.',
      'Giảm chi phí và độ phức tạp khi mở rộng mạng.',
      'Đảm bảo hiệu năng cho ứng dụng quan trọng như VoIP, hội nghị.',
    ],
    overview: [
      'SD-WAN của SecureOps được quản lý và điều phối tập trung, giúp đạt mục tiêu kết nối mạng diện rộng đơn giản, kinh tế và phản ứng tức thời với gián đoạn Internet.',
    ],
    sortOrder: 16,
  },
  {
    name: 'Wi-Fi bảo mật',
    slug: 'secure-wifi',
    categorySlug: 'network-security',
    shortDescription:
      'Mạng Wi-Fi an toàn, dễ triển khai và quản lý, mở rộng đơn giản bằng cách thêm access point — tích hợp Active Threat Response để cô lập thiết bị bị xâm phạm.',
    keyPoints: [
      'Mở rộng mạng đơn giản bằng cách thêm một access point.',
      'Cô lập thiết bị bị xâm phạm ngay tại lớp truy cập.',
      'Phối hợp với MDR/XDR để phản ứng tự động khi có mối đe dọa.',
    ],
    features: [
      'Access point Wi-Fi 6/6E hiệu năng cao, dễ mở rộng.',
      'Quản lý tập trung trên nền tảng đám mây.',
      'Active Threat Response cô lập thiết bị nghi ngờ tự động.',
    ],
    benefits: [
      'Triển khai và vận hành mạng không dây nhanh chóng.',
      'Ngăn chặn lan truyền ngang khi có thiết bị bị xâm phạm.',
      'Tăng khả năng mở rộng mà không bị giới hạn phần cứng.',
    ],
    overview: [
      'Wi-Fi bảo mật của SecureOps dễ triển khai và quản lý, giúp mạng không dây của bạn hoạt động nhanh chóng, đồng thời cô lập thiết bị bị xâm phạm ngay tại lớp truy cập.',
    ],
    sortOrder: 17,
  },
  {
    name: 'Switch mạng',
    slug: 'network-switch',
    categorySlug: 'network-security',
    shortDescription:
      'Switch lớp truy cập 8, 24 và 48 cổng giúp kiểm soát truy cập thiết bị an toàn cho chi nhánh, bán lẻ và doanh nghiệp vừa và nhỏ.',
    keyPoints: [
      'Kết nối và quản lý số lượng thiết bị ngày càng tăng một cách nhất quán.',
      'Phân đoạn mạng bằng VLAN để giảm bề mặt tấn công khi bị xâm phạm.',
      'Cô lập host bị xâm phạm ngay tại lớp truy cập.',
    ],
    features: [
      'Nhiều kích cỡ phù hợp văn phòng từ xa, SMB, bán lẻ và chi nhánh.',
      'Cấu hình VLAN để phân đoạn lưu lượng nội bộ.',
      'Active Threat Response cô lập host có dây và không dây.',
    ],
    benefits: [
      'Kiểm soát truy cập thiết bị an toàn và mở rộng linh hoạt.',
      'Giảm rủi ro lây lan khi xảy ra lây nhiễm hoặc xâm phạm.',
      'Quản lý nhất quán cùng hệ sinh thái bảo mật.',
    ],
    overview: [
      'Switch mạng của SecureOps mang lại giải pháp tinh gọn, an toàn để kết nối và quản lý thiết bị, đảm bảo tính nhất quán, khả năng mở rộng và kiểm soát trên toàn mạng.',
    ],
    sortOrder: 18,
  },

  /* --- Bảo vệ không gian làm việc --- */
  {
    name: 'Truy cập mạng Zero Trust (ZTNA)',
    slug: 'zero-trust-network-access',
    categorySlug: 'workspace-protection',
    shortDescription:
      'Cung cấp truy cập Zero Trust an toàn, loại bỏ sự tin cậy ngầm định và bảo vệ ứng dụng bằng đánh giá trạng thái thiết bị và Synchronized Security.',
    keyPoints: [
      'Kết nối người dùng tới đúng ứng dụng họ cần, loại bỏ sự tin cậy ngầm định.',
      'Giảm mạnh bề mặt tấn công, làm ứng dụng vô hình với thế giới bên ngoài.',
      'Thay thế VPN truy cập từ xa kiểu cũ bằng truy cập theo đặc quyền tối thiểu.',
    ],
    features: [
      'Thêm đánh giá trạng thái thiết bị vào chính sách truy cập.',
      'Xác thực đa yếu tố bắt buộc để xác minh danh tính.',
      'Tích hợp liền mạch với trình duyệt bảo mật.',
    ],
    benefits: [
      'Bảo vệ ứng dụng khỏi truy cập trái phép và tấn công.',
      'Truy cập dễ dàng, an toàn cho người làm việc từ xa.',
      'Dễ quản lý hơn so với VPN truyền thống.',
    ],
    overview: [
      'ZTNA của SecureOps cung cấp cách kết nối người dùng tới ứng dụng một cách minh bạch và an toàn, loại bỏ sự tin cậy ngầm định và bảo vệ ứng dụng khỏi truy cập trái phép.',
    ],
    sortOrder: 19,
  },
  {
    name: 'Trình duyệt bảo mật',
    slug: 'protected-browser',
    categorySlug: 'workspace-protection',
    shortDescription:
      'Trình duyệt Chromium được làm cứng với kiểm soát chi tiết, kết nối Zero Trust, kiểm soát ứng dụng SaaS, bảo vệ ranh giới dữ liệu và tích hợp SWG, DNS.',
    keyPoints: [
      'Một ứng dụng để bảo vệ tất cả các ứng dụng khác của bạn.',
      'Tích hợp mọi chức năng bảo mật cần thiết vào một trình duyệt Chromium được làm cứng.',
      'Kiểm soát chi tiết, bảo mật chặt chẽ và trải nghiệm minh bạch cho người dùng.',
    ],
    features: [
      'Kết nối Zero Trust tích hợp với client RDP và SSH.',
      'Kiểm soát và phân tích việc sử dụng ứng dụng SaaS.',
      'Bảo vệ ranh giới dữ liệu để ngăn rò rỉ.',
    ],
    benefits: [
      'Bảo vệ người làm việc từ xa và bên thứ ba dễ dàng, tiết kiệm.',
      'Cho phép truy cập an toàn từ thiết bị không được quản lý.',
      'Trải nghiệm liền mạch cho người dùng cuối.',
    ],
    overview: [
      'Trình duyệt bảo mật của SecureOps tích hợp mọi chức năng bảo mật cần thiết vào một trình duyệt Chromium được làm cứng, mang lại kiểm soát chi tiết cho người làm việc từ xa và bên thứ ba.',
    ],
    sortOrder: 20,
  },
  {
    name: 'Bảo vệ DNS',
    slug: 'dns-protection',
    categorySlug: 'workspace-protection',
    shortDescription:
      'Sử dụng trí tuệ về mối đe dọa bằng AI để chặn các tên miền độc hại, rủi ro và không mong muốn trên mọi cổng và ứng dụng, đảm bảo phân giải DNS nhanh và an toàn.',
    keyPoints: [
      'Bảo vệ DNS hiệu năng cao, an toàn cho mạng và điểm cuối của bạn.',
      'Chặn tên miền độc hại và rủi ro ngay tại thời điểm phân giải.',
      'Được hỗ trợ bởi trí tuệ về mối đe dọa AI, bảo vệ thời gian thực toàn cầu.',
    ],
    features: [
      'Chặn tên miền độc hại trên mọi cổng, giao thức và ứng dụng.',
      'Bảo vệ mọi thiết bị trong mạng, cả được quản lý và không.',
      'Hiệu năng cao, không làm chậm trải nghiệm người dùng.',
    ],
    benefits: [
      'Ngăn chặn tấn công web và lừa đảo từ gốc.',
      'Bảo vệ liền mạch cho cả mạng và điểm cuối.',
      'Triển khai đơn giản, tích hợp sẵn với các giải pháp khác.',
    ],
    overview: [
      'Bảo vệ DNS của SecureOps tận dụng trí tuệ về mối đe dọa bằng AI để chặn các tên miền độc hại, rủi ro và không mong muốn ngay tại thời điểm phân giải, mang lại hiệu năng và bảo vệ tối đa.',
    ],
    sortOrder: 21,
  },
  {
    name: 'Bảo vệ email',
    slug: 'email-security',
    categorySlug: 'workspace-protection',
    shortDescription:
      'Ngăn chặn mối đe dọa email trước khi đến hộp thư nhờ bảo vệ AI đa lớp, tích hợp liền mạch với Microsoft 365 và Google Workspace, kèm mô phỏng lừa đảo và đào tạo.',
    keyPoints: [
      'Ngăn mối đe dọa email bằng bảo vệ AI đa lớp và trí tuệ về mối đe dọa vượt trội.',
      'Phần lớn cuộc tấn công thành công khởi đầu từ một email lừa đảo.',
      'Tích hợp liền mạch với Microsoft 365 và Google Workspace.',
    ],
    features: [
      'Phát hiện lừa đảo và xâm phạm email doanh nghiệp (BEC) bằng AI.',
      'Mô phỏng tấn công lừa đảo và đào tạo nhận thức cho người dùng.',
      'Hiển thị mối đe dọa email cho dịch vụ MDR.',
    ],
    benefits: [
      'Giảm phơi nhiễm trước lừa đảo nâng cao và BEC.',
      'Đào tạo người dùng nhận biết các thủ đoạn lừa đảo.',
      'Bảo vệ doanh nghiệp khỏi thiệt hại và gián đoạn tốn kém.',
    ],
    overview: [
      'Bảo vệ email của SecureOps ngăn chặn các mối đe dọa email trước khi đến hộp thư người dùng thông qua bảo vệ AI đa lớp, đồng thời tích hợp đào tạo nhận thức và mô phỏng lừa đảo.',
    ],
    sortOrder: 22,
  },
  {
    name: 'Giám sát email bổ sung',
    slug: 'email-monitoring-system',
    categorySlug: 'workspace-protection',
    shortDescription:
      'Tăng cường khả năng hiển thị vào các mối đe dọa email nâng cao, phát hiện các cuộc tấn công bị bỏ sót và đưa telemetry vào MDR/XDR để khắc phục nhanh hơn.',
    keyPoints: [
      'Tăng cường hạ tầng bảo mật email hiện có để nhận diện rủi ro bị bỏ sót.',
      'Bổ sung một lớp hiển thị vào bất kỳ dịch vụ bảo mật email nào.',
      'Khắc phục đơn giản với khả năng thu hồi thủ công các thư lọt lưới.',
    ],
    features: [
      'Phân tích bổ sung email đã qua các lớp phòng thủ hiện có.',
      'Đưa ra phán định về thư đáng ngờ bị bỏ sót hoặc phân loại sai.',
      'Tích hợp telemetry vào quy trình MDR và XDR.',
    ],
    benefits: [
      'Phát hiện các mối đe dọa email mà giải pháp khác bỏ sót.',
      'Không ảnh hưởng đến luồng thư hiện tại.',
      'Khắc phục nhanh các thư độc hại lọt lưới.',
    ],
    overview: [
      'Hệ thống giám sát email của SecureOps cung cấp thêm góc nhìn và thông tin chuyên sâu về lưu lượng email đã đi qua các lớp phòng thủ hiện có, nhận diện các email đáng ngờ vẫn còn rủi ro.',
    ],
    sortOrder: 23,
  },
  {
    name: 'Mô phỏng lừa đảo & đào tạo nhận thức',
    slug: 'phishing-training',
    categorySlug: 'workspace-protection',
    shortDescription:
      'Giáo dục và kiểm tra người dùng cuối qua mô phỏng tấn công lừa đảo tự động, đào tạo nhận thức an ninh chất lượng và báo cáo chỉ số có thể hành động.',
    keyPoints: [
      'Mô phỏng tấn công lừa đảo và đào tạo cho người dùng cuối.',
      'Một chương trình nâng cao nhận thức vững chắc là phần thiết yếu của chiến lược phòng thủ.',
      'Mô phỏng hàng trăm tình huống lừa đảo thực tế chỉ với vài cú nhấp.',
    ],
    features: [
      'Hơn 30 mô-đun đào tạo nhận thức về bảo mật và tuân thủ.',
      'Mẫu mô phỏng tấn công cập nhật theo thủ đoạn lừa đảo hiện hành.',
      'Báo cáo chỉ số chi tiết về người dùng có rủi ro cao.',
    ],
    benefits: [
      'Xây dựng văn hóa nhận thức an ninh tích cực trong tổ chức.',
      'Giảm rủi ro người dùng trở thành nạn nhân của lừa đảo.',
      'Đào tạo tự động, đúng lúc cho nhân viên khi cần.',
    ],
    overview: [
      'Giải pháp mô phỏng lừa đảo của SecureOps giáo dục và kiểm tra người dùng cuối thông qua mô phỏng tấn công tự động, đào tạo nhận thức chất lượng và báo cáo chỉ số có thể hành động.',
    ],
    sortOrder: 24,
  },

  /* --- Dịch vụ tư vấn & kiểm thử --- */
  {
    name: 'Dịch vụ kiểm thử bảo mật',
    slug: 'security-testing',
    categorySlug: 'advisory-services',
    shortDescription:
      'Mô phỏng đối thủ thực tế để phát hiện lỗ hổng, kiểm chứng phòng thủ và nâng cao khả năng chống chịu, với kiểm thử xâm nhập và đánh giá do chuyên gia thực hiện.',
    keyPoints: [
      'Nhìn môi trường và ứng dụng qua lăng kính của một kẻ tấn công thực thụ.',
      'Phát hiện lỗ hổng và điểm mù trước khi mối đe dọa ập đến.',
      'Kiểm thử là yếu tố then chốt của một chiến lược bảo mật chủ động.',
    ],
    features: [
      'Kiểm thử xâm nhập mạng nội bộ và bên ngoài.',
      'Đánh giá bảo mật ứng dụng web và mạng không dây.',
      'Báo cáo chi tiết kèm khuyến nghị cải thiện tư thế an ninh.',
    ],
    benefits: [
      'Phát hiện và bịt lỗ hổng trước khi bị khai thác.',
      'Đáp ứng yêu cầu tuân thủ và quy định.',
      'Nâng cao khả năng chống chịu trước hoạt động độc hại.',
    ],
    overview: [
      'Dịch vụ kiểm thử bảo mật của SecureOps mô phỏng các đối thủ thực tế để phát hiện lỗ hổng, kiểm chứng phòng thủ và củng cố khả năng chống chịu thông qua kiểm thử xâm nhập do chuyên gia thực hiện.',
    ],
    sortOrder: 25,
  },
]

/* ------------------------------------------------------------------ */
/* NHÓM GIẢI PHÁP                                                      */
/* ------------------------------------------------------------------ */

export const solutionCategories: CatalogSolutionCategory[] = [
  {
    name: 'Theo nhu cầu',
    slug: 'theo-nhu-cau',
    type: 'use_case',
    description: 'Giải pháp theo từng tình huống và nhu cầu bảo mật cụ thể của doanh nghiệp.',
    sortOrder: 1,
  },
  {
    name: 'Theo ngành',
    slug: 'theo-nganh',
    type: 'industry',
    description: 'Giải pháp an ninh mạng được thiết kế riêng cho đặc thù từng ngành.',
    sortOrder: 2,
  },
  {
    name: 'Tuân thủ',
    slug: 'tuan-thu',
    type: 'compliance',
    description: 'Giải pháp giúp đáp ứng các yêu cầu tuân thủ và quy định pháp lý.',
    sortOrder: 3,
  },
  {
    name: 'Giải pháp tổng quát',
    slug: 'tong-quat',
    type: 'general',
    description: 'Các nền tảng và năng lực phòng thủ cốt lõi cho mọi doanh nghiệp.',
    sortOrder: 4,
  },
]

/* ------------------------------------------------------------------ */
/* GIẢI PHÁP (26)                                                      */
/* ------------------------------------------------------------------ */

export const solutions: CatalogSolution[] = [
  /* --- Giải pháp tổng quát --- */
  {
    name: 'Phòng thủ mạng tăng cường bằng AI',
    slug: 'ai-cybersecurity',
    categorySlug: 'tong-quat',
    shortDescription:
      'Kết hợp học sâu, AI tạo sinh và chuyên môn con người để mang lại sự bảo vệ vượt trội trước các mối đe dọa mạng.',
    painPoints: [
      'Kẻ tấn công đang dùng AI để tăng tốc và mở rộng quy mô tấn công.',
      'Công cụ truyền thống khó theo kịp tốc độ và độ tinh vi của mối đe dọa mới.',
    ],
    benefits: [
      'Phát hiện và phản ứng nhanh hơn với sự hỗ trợ của AI.',
      'Kết hợp tốc độ của máy với phán đoán của chuyên gia.',
      'Nâng cao năng suất cho chuyên viên phân tích bảo mật.',
    ],
    overview: [
      'Các công nghệ AI của SecureOps kết hợp học sâu, AI tạo sinh và chuyên môn con người để mang lại sự bảo vệ trước mối đe dọa vượt trội.',
    ],
    sortOrder: 1,
  },
  {
    name: 'Vô hiệu hóa mối đe dọa suốt ngày đêm',
    slug: 'neutralize-threats',
    categorySlug: 'tong-quat',
    shortDescription:
      'Dịch vụ MDR 24/7 ngăn ngừa, phát hiện và phản ứng — giảm thiểu rủi ro, giảm quá tải cảnh báo và vô hiệu hóa mối đe dọa quanh đồng hồ.',
    painPoints: [
      'Mối đe dọa hoạt động liên tục, kể cả ngoài giờ làm việc.',
      'Đội ngũ nội bộ quá tải vì khối lượng cảnh báo khổng lồ.',
    ],
    benefits: [
      'Giám sát và phản ứng liên tục 24/7.',
      'Giảm rủi ro và tình trạng quá tải cảnh báo.',
      'Chuyên gia xác thực, điều tra và xử lý thay bạn.',
    ],
    overview: [
      'Giải pháp MDR của SecureOps sử dụng học máy nâng cao và phân tích hành vi để phát hiện những mối đe dọa mà công cụ truyền thống bỏ sót, trong khi đội ngũ chuyên gia xác thực và xử lý.',
    ],
    sortOrder: 2,
  },
  {
    name: 'Bảo mật đám mây hợp nhất',
    slug: 'public-cloud',
    categorySlug: 'tong-quat',
    shortDescription:
      'Hệ thống bảo mật đám mây AI-native hợp nhất, bao phủ workload, mạng và danh tính trên AWS, Azure, GCP và OCI với XDR, MDR, SIEM, ITDR và tường lửa thế hệ mới.',
    painPoints: [
      'Môi trường đa đám mây tạo ra nhiều điểm mù và độ phức tạp.',
      'Kẻ tấn công lợi dụng danh tính bị xâm phạm để di chuyển nhanh trong đám mây.',
    ],
    benefits: [
      'Khả năng hiển thị đầy đủ từ một console duy nhất.',
      'Phát hiện dựa trên mô hình mối đe dọa thực tế.',
      'Phản ứng tự động trong vài giây với SOC tăng cường AI.',
    ],
    overview: [
      'SecureOps mang lại hệ thống bảo mật đám mây AI-native hợp nhất, bao phủ workload, mạng và danh tính trên mọi nền tảng đám mây lớn từ một console duy nhất.',
    ],
    sortOrder: 3,
  },

  /* --- Theo nhu cầu (use_case) --- */
  {
    name: 'Ngăn ngừa thất thoát dữ liệu',
    slug: 'data-protection',
    categorySlug: 'theo-nhu-cau',
    shortDescription:
      'Bảo vệ dữ liệu toàn diện với dịch vụ bảo mật được quản lý 24/7, bảo vệ điểm cuối nâng cao với XDR, tường lửa thế hệ mới và bảo mật đám mây cho tổ chức mọi quy mô.',
    painPoints: [
      'Dữ liệu nhạy cảm nằm ở nhiều nơi khiến việc bảo vệ trở nên khó khăn.',
      'Rò rỉ dữ liệu có thể xảy ra từ cả bên trong lẫn bên ngoài.',
    ],
    benefits: [
      'Bảo vệ dữ liệu trên Windows, Mac, Linux và máy ảo.',
      'Quy tắc ngăn thất thoát dữ liệu theo đặc thù ngành.',
      'Kết hợp phòng ngừa chủ động và bảo vệ tích cực.',
    ],
    overview: [
      'Giải pháp của SecureOps mang lại bảo vệ dữ liệu toàn diện, kết hợp các biện pháp phòng ngừa và bảo vệ chủ động cho tổ chức ở mọi quy mô.',
    ],
    sortOrder: 4,
  },
  {
    name: 'Bảo vệ trước mối đe dọa nội bộ',
    slug: 'insider-threat-protection',
    categorySlug: 'theo-nhu-cau',
    shortDescription:
      'Giải pháp giảm thiểu tập trung vào phòng ngừa, chủ động nhận diện mối đe dọa và bảo vệ dữ liệu quan trọng khỏi các tấn công xuất phát từ nội bộ.',
    painPoints: [
      'Tấn công nội bộ gây thiệt hại lớn và khó phát hiện hơn tấn công bên ngoài.',
      'Người dùng nội bộ có quyền truy cập hợp lệ vào dữ liệu nhạy cảm.',
    ],
    benefits: [
      'Nhanh chóng nhận diện hoạt động nội bộ đáng ngờ.',
      'Kiểm soát truy cập theo người dùng đối với ứng dụng và tài nguyên.',
      'Bảo vệ dữ liệu quan trọng khỏi lạm dụng.',
    ],
    overview: [
      'SecureOps giúp bạn nhanh chóng nhận diện và giảm thiểu mối đe dọa nội bộ — vốn khó ngăn chặn và phát hiện hơn so với tấn công từ bên ngoài.',
    ],
    sortOrder: 5,
  },
  {
    name: 'Tối ưu vị thế bảo hiểm an ninh mạng',
    slug: 'cyber-insurance',
    categorySlug: 'theo-nhu-cau',
    shortDescription:
      'Giảm thiểu rủi ro tấn công mạng và dễ dàng đạt được mức bảo hiểm an ninh mạng phù hợp với nhu cầu của doanh nghiệp.',
    painPoints: [
      'Yêu cầu của các công ty bảo hiểm an ninh mạng ngày càng khắt khe.',
      'Khó chứng minh tư thế an ninh đủ tốt để được bảo hiểm.',
    ],
    benefits: [
      'Sử dụng dịch vụ MDR — một trong những cách tốt nhất giảm rủi ro mạng.',
      'Tăng khả năng đạt mức bảo hiểm mong muốn.',
      'Chứng minh năng lực phòng thủ với nhà bảo hiểm.',
    ],
    overview: [
      'Các nhà bảo hiểm công nhận rộng rãi rằng việc sử dụng dịch vụ phát hiện và phản ứng được quản lý như MDR của SecureOps là một trong những cách tốt nhất để giảm rủi ro an ninh mạng.',
    ],
    sortOrder: 6,
  },
  {
    name: 'Bảo mật cho lực lượng làm việc từ xa',
    slug: 'remote-working',
    categorySlug: 'theo-nhu-cau',
    shortDescription:
      'Bảo mật cho tổ chức làm việc mọi nơi với bộ giải pháp toàn diện: bất kỳ địa điểm, thiết bị hay tài nguyên nào.',
    painPoints: [
      'VPN truy cập từ xa kiểu cũ tạo ra rủi ro và khó quản lý.',
      'Người dùng kết nối từ nhiều thiết bị và địa điểm khác nhau.',
    ],
    benefits: [
      'ZTNA mang lại kết nối từ xa an toàn, hiện đại hơn VPN.',
      'Bảo vệ thiết bị và người dùng đầu–cuối với một agent duy nhất.',
      'Trải nghiệm liền mạch cho người làm việc từ xa.',
    ],
    overview: [
      'SecureOps bảo vệ tổ chức làm việc mọi nơi — bất kỳ địa điểm, thiết bị hay tài nguyên nào — với truy cập mạng Zero Trust tích hợp chặt chẽ cùng bảo vệ điểm cuối.',
    ],
    sortOrder: 7,
  },
  {
    name: 'Bảo mật chuỗi cung ứng',
    slug: 'supply-chain-security',
    categorySlug: 'theo-nhu-cau',
    shortDescription:
      'Phòng vệ trước các cuộc tấn công chuỗi cung ứng, giảm thiểu rủi ro từ lừa đảo, lỗ hổng của nhà cung cấp bên thứ ba và phần mềm bị xâm phạm.',
    painPoints: [
      'Tổ chức phụ thuộc vào nhà cung cấp bên thứ ba để vận hành nhiều chức năng.',
      'Chuỗi cung ứng vẫn là mắt xích yếu trong an ninh mạng.',
    ],
    benefits: [
      'Kiểm soát chặt chẽ truy cập của nhà cung cấp bên thứ ba.',
      'Giảm thiểu rủi ro từ phần mềm bị xâm phạm.',
      'Bảo vệ trước các cuộc tấn công lừa đảo nhắm vào chuỗi cung ứng.',
    ],
    overview: [
      'SecureOps giúp phòng vệ trước các cuộc tấn công chuỗi cung ứng bằng bộ giải pháp bảo mật, kiểm soát truy cập của bên thứ ba và giảm thiểu rủi ro từ phần mềm bị xâm phạm.',
    ],
    sortOrder: 8,
  },
  {
    name: 'Bảo vệ email cho Microsoft 365',
    slug: 'microsoft-365-email',
    categorySlug: 'theo-nhu-cau',
    shortDescription:
      'Tích hợp với email Microsoft 365 chỉ trong vài phút, bảo vệ người dùng nhanh hơn và mở khóa khả năng hiển thị đầu–cuối trên toàn bộ M365 với XDR.',
    painPoints: [
      'Bảo vệ gốc của Exchange Online chưa đủ trước mối đe dọa nâng cao.',
      'Thiếu khả năng hiển thị mối đe dọa trên toàn bộ môi trường M365.',
    ],
    benefits: [
      'Tích hợp với Microsoft 365 chỉ trong vài phút.',
      'Tăng cường và mở rộng bảo vệ gốc của Exchange Online.',
      'Hiển thị đầu–cuối trên toàn bộ M365 với XDR.',
    ],
    overview: [
      'Bảo vệ email của SecureOps tích hợp liền mạch với Microsoft 365 chỉ trong vài phút để tăng cường và mở rộng các biện pháp bảo vệ gốc của Exchange Online.',
    ],
    sortOrder: 9,
  },
  {
    name: 'SecureOps và Microsoft — Mạnh mẽ hơn khi kết hợp',
    slug: 'microsoft',
    categorySlug: 'theo-nhu-cau',
    shortDescription:
      'Tăng cường bảo vệ trên môi trường Microsoft, giảm rủi ro, nâng cao ROI bảo mật với các giải pháp an ninh mạng tích hợp.',
    painPoints: [
      'Môi trường lấy Microsoft làm trung tâm cần bảo vệ mạnh mẽ và thích ứng hơn.',
      'Khó tối ưu giá trị từ các khoản đầu tư bảo mật Microsoft.',
    ],
    benefits: [
      'Nâng cao bảo vệ và giảm rủi ro cho môi trường Microsoft.',
      'Tối đa hóa lợi tức đầu tư bảo mật.',
      'Tích hợp sâu với hệ sinh thái Microsoft.',
    ],
    overview: [
      'Các mối đe dọa ngày nay đòi hỏi sự bảo vệ mạnh mẽ và thích ứng hơn cho môi trường lấy Microsoft làm trung tâm. SecureOps giúp nâng cao bảo vệ, giảm rủi ro và tối đa hóa giá trị đầu tư.',
    ],
    sortOrder: 10,
  },
  {
    name: 'Tăng cường phòng thủ mã độc tống tiền',
    slug: 'ransomware-protection',
    categorySlug: 'theo-nhu-cau',
    shortDescription:
      'Phát hiện và chặn mã độc tống tiền ở nhiều giai đoạn của chuỗi tấn công với bảo vệ mạng nâng cao và giám sát mối đe dọa 24/7.',
    painPoints: [
      'Mã độc tống tiền vẫn là mối đe dọa lớn với mọi tổ chức.',
      'Ngăn chặn các cuộc tấn công nâng cao đòi hỏi phòng thủ thích ứng mạnh mẽ.',
    ],
    benefits: [
      'Chặn mã độc tống tiền ở nhiều giai đoạn của chuỗi tấn công.',
      'Công nghệ phòng thủ thích ứng được đánh giá hàng đầu.',
      'Giám sát mối đe dọa 24/7 để phản ứng kịp thời.',
    ],
    overview: [
      'SecureOps Endpoint kết hợp nhiều công nghệ tiên tiến để tự động chặn mã độc tống tiền ở nhiều giai đoạn của chuỗi tấn công, được đánh giá hàng đầu trong các bài kiểm thử độc lập.',
    ],
    sortOrder: 11,
  },
  {
    name: 'Ngăn ngừa mối đe dọa',
    slug: 'threat-prevention',
    categorySlug: 'theo-nhu-cau',
    shortDescription:
      'Khả năng hiển thị, bảo vệ và hiệu năng vượt trội cho những mạng đòi hỏi khắt khe nhất hiện nay.',
    painPoints: [
      'Mối đe dọa nâng cao đang vượt qua các công nghệ bảo mật hiện có.',
      'Tổ chức cần phòng thủ thông minh và tự động cho mạng, điểm cuối.',
    ],
    benefits: [
      'Kết hợp AI học sâu, chống mã độc tống tiền và ngăn khai thác.',
      'Khả năng hiển thị và bảo vệ vượt trội cho mạng đòi hỏi cao.',
      'Phòng thủ tự động, giảm gánh nặng vận hành.',
    ],
    overview: [
      'Giải pháp ngăn ngừa mối đe dọa của SecureOps kết hợp AI học sâu, năng lực chống mã độc tống tiền và ngăn khai thác để mang lại sự bảo vệ tự động, thông minh cho mạng và điểm cuối.',
    ],
    sortOrder: 12,
  },

  /* --- Theo ngành (industry) --- */
  {
    name: 'An ninh mạng cho khối Chính phủ',
    slug: 'government',
    categorySlug: 'theo-nganh',
    shortDescription:
      'Tiếp cận Zero Trust cho mạng và cơ quan nhà nước: không tin tưởng mặc định, xác minh mọi thứ và kiểm soát tuyệt đối quyền truy cập dữ liệu trên mạng.',
    painPoints: [
      'Cơ quan nhà nước là mục tiêu của tấn công tống tiền và rò rỉ dữ liệu.',
      'Cần đảm bảo cung cấp dịch vụ thiết yếu không gián đoạn.',
    ],
    benefits: [
      'Chặn tấn công tống tiền và rò rỉ dữ liệu.',
      'Dịch vụ MDR 24/7 do chuyên gia thực hiện.',
      'Kiểm soát tuyệt đối quyền truy cập dữ liệu.',
    ],
    overview: [
      'SecureOps mang lại tiếp cận Zero Trust cho mạng và cơ quan nhà nước, đảm bảo cung cấp dịch vụ thiết yếu không gián đoạn với kiểm soát tuyệt đối quyền truy cập.',
    ],
    sortOrder: 13,
  },
  {
    name: 'An ninh mạng cho Tài chính – Ngân hàng',
    slug: 'finance-and-banking',
    categorySlug: 'theo-nganh',
    shortDescription:
      'Bảo vệ toàn diện dữ liệu, giao dịch và hoạt động cho ngân hàng và mạng lưới tài chính.',
    painPoints: [
      'Dữ liệu tài chính là mục tiêu giá trị cao của kẻ tấn công.',
      'Ngành tài chính chịu áp lực tuân thủ và rủi ro tống tiền lớn.',
    ],
    benefits: [
      'Chặn tấn công tống tiền và rò rỉ dữ liệu.',
      'Bảo vệ giao dịch và dữ liệu tài chính nhạy cảm.',
      'Dịch vụ MDR 24/7 cho ngành tài chính.',
    ],
    overview: [
      'SecureOps cung cấp bảo mật dữ liệu toàn diện cho ngân hàng và mạng lưới tài chính, bảo vệ dữ liệu, giao dịch và hoạt động khỏi các mối đe dọa tinh vi.',
    ],
    sortOrder: 14,
  },
  {
    name: 'An ninh mạng cho Y tế',
    slug: 'healthcare',
    categorySlug: 'theo-nganh',
    shortDescription:
      'Bảo vệ môi trường IT và dữ liệu sức khỏe nhạy cảm, hỗ trợ tuân thủ các quy định nghiêm ngặt với giải pháp an ninh mạng y tế toàn diện.',
    painPoints: [
      'Dữ liệu sức khỏe nhạy cảm cần được bảo vệ và tuân thủ nghiêm ngặt.',
      'Gián đoạn hệ thống y tế ảnh hưởng trực tiếp đến chăm sóc bệnh nhân.',
    ],
    benefits: [
      'Đảm bảo hoạt động liên tục và chăm sóc bệnh nhân không gián đoạn.',
      'Chặn tấn công tống tiền và rò rỉ dữ liệu.',
      'Hỗ trợ tuân thủ các quy định bảo vệ dữ liệu y tế.',
    ],
    overview: [
      'An ninh mạng dạng dịch vụ của SecureOps giải quyết các thách thức bảo mật trong ngành y tế, đảm bảo hoạt động liên tục và bảo vệ dữ liệu sức khỏe nhạy cảm.',
    ],
    sortOrder: 15,
  },
  {
    name: 'An ninh mạng cho Sản xuất',
    slug: 'manufacturing',
    categorySlug: 'theo-nganh',
    shortDescription:
      'Giải pháp bảo mật toàn diện cho nhà máy và tổ chức sản xuất hiện đại trên toàn cầu.',
    painPoints: [
      'Môi trường sản xuất kết hợp IT và OT tạo ra bề mặt tấn công phức tạp.',
      'Gián đoạn sản xuất gây thiệt hại lớn về chi phí và uy tín.',
    ],
    benefits: [
      'Dịch vụ MDR 24/7 do chuyên gia thực hiện.',
      'Tương thích với hạ tầng và công cụ sản xuất hiện có.',
      'Bảo vệ liên tục cho hoạt động sản xuất.',
    ],
    overview: [
      'SecureOps cung cấp giải pháp bảo mật hoàn chỉnh cho nhà máy và tổ chức sản xuất hiện đại, với dịch vụ MDR linh hoạt tương thích với hạ tầng hiện có.',
    ],
    sortOrder: 16,
  },
  {
    name: 'An ninh mạng cho Bán lẻ',
    slug: 'retail',
    categorySlug: 'theo-nganh',
    shortDescription:
      'Hệ sinh thái bảo mật độc đáo mang lại sự bảo vệ vững chắc cho các cơ sở bán lẻ phân tán và bán hàng trực tuyến.',
    painPoints: [
      'Hệ thống bán lẻ phân tán tạo ra nhiều điểm cần bảo vệ.',
      'Dữ liệu thanh toán của khách hàng là mục tiêu của kẻ tấn công.',
    ],
    benefits: [
      'Dịch vụ MDR 24/7 do chuyên gia thực hiện.',
      'Linh hoạt dùng công cụ của SecureOps hoặc bên thứ ba.',
      'Bảo vệ vững chắc cho hệ thống bán lẻ phân tán.',
    ],
    overview: [
      'Hệ sinh thái bảo mật độc đáo của SecureOps mang lại sự bảo vệ vững chắc cho các cơ sở bán lẻ phân tán và hoạt động bán hàng trực tuyến.',
    ],
    sortOrder: 17,
  },
  {
    name: 'An ninh mạng cho Giáo dục',
    slug: 'education',
    categorySlug: 'theo-nganh',
    shortDescription:
      'Giữ an toàn cho học sinh, giảng viên và dữ liệu — tại trường, từ xa hay trên đám mây — với các giải pháp bảo mật thích ứng.',
    painPoints: [
      'Môi trường giáo dục có nhiều người dùng và thiết bị đa dạng.',
      'Ngân sách hạn chế nhưng vẫn cần bảo mật không thỏa hiệp.',
    ],
    benefits: [
      'Bảo vệ điểm cuối, mạng và dịch vụ MDR kết hợp.',
      'Săn tìm mối đe dọa do con người dẫn dắt.',
      'Bảo vệ thích ứng cho cả tại trường, từ xa và đám mây.',
    ],
    overview: [
      'SecureOps giữ an toàn cho học sinh, giảng viên và dữ liệu của các cơ sở giáo dục với giải pháp bảo mật thích ứng, kết hợp công nghệ và săn tìm mối đe dọa do con người dẫn dắt.',
    ],
    sortOrder: 18,
  },
  {
    name: 'An ninh mạng cho khu vực công',
    slug: 'public-sector',
    categorySlug: 'theo-nganh',
    shortDescription:
      'Bảo vệ các tài sản trọng yếu của cơ quan, đơn vị khu vực công trước rủi ro mạng ngày càng gia tăng bằng dịch vụ quản lý và giải pháp tự vận hành.',
    painPoints: [
      'Cơ quan khu vực công đối mặt rủi ro mạng cao hơn bao giờ hết.',
      'Cần bảo vệ tài sản trọng yếu trong khi vẫn đổi mới và hợp tác.',
    ],
    benefits: [
      'Vô hiệu hóa các mối đe dọa mạng có chủ đích.',
      'Linh hoạt giữa dịch vụ quản lý và giải pháp tự vận hành.',
      'Bảo vệ tài sản trọng yếu của tổ chức.',
    ],
    overview: [
      'Các cơ quan khu vực công đối mặt với rủi ro mạng cao hơn bao giờ hết. SecureOps giúp bảo vệ những tài sản trọng yếu bằng cả dịch vụ quản lý lẫn giải pháp tự vận hành.',
    ],
    sortOrder: 19,
  },

  /* --- Tuân thủ (compliance) --- */
  {
    name: 'Tuân thủ các Kiểm soát An ninh Trọng yếu (CIS Controls)',
    slug: 'cis-critical-security-controls',
    categorySlug: 'tuan-thu',
    shortDescription:
      'Giải pháp bảo mật thế hệ mới mang lại phòng thủ vững chắc và công cụ bảo vệ dữ liệu, giúp đáp ứng các yêu cầu tuân thủ ngày càng tăng theo ngành và khu vực.',
    painPoints: [
      'Yêu cầu tuân thủ theo ngành và khu vực ngày càng phức tạp.',
      'Cần ngăn mối đe dọa lan sang các hệ thống khác.',
    ],
    benefits: [
      'Phòng thủ nâng cao với IPS thế hệ mới trong tường lửa.',
      'Phát hiện và tự động khắc phục mối đe dọa trên mọi thiết bị.',
      'Đáp ứng các kiểm soát an ninh trọng yếu.',
    ],
    overview: [
      'Các giải pháp bảo mật thế hệ mới của SecureOps mang lại phòng thủ vững chắc và công cụ bảo vệ dữ liệu, giúp đáp ứng các yêu cầu tuân thủ ngày càng tăng theo ngành và khu vực.',
    ],
    sortOrder: 20,
  },
  {
    name: 'Hỗ trợ tuân thủ GDPR',
    slug: 'gdpr',
    categorySlug: 'tuan-thu',
    shortDescription:
      'Hỗ trợ nỗ lực tuân thủ Quy định Bảo vệ Dữ liệu Chung của EU (GDPR) và giảm thiểu rủi ro bị phạt bằng cách giữ an toàn cho dữ liệu và thiết bị.',
    painPoints: [
      'GDPR đặt ra yêu cầu cao về bảo mật dữ liệu cá nhân.',
      'Vi phạm có thể dẫn đến các khoản phạt nặng.',
    ],
    benefits: [
      'Chặn mối đe dọa nâng cao và lưu lượng độc hại tại vành đai.',
      'Phát hiện chủ động hành vi độc hại trên host.',
      'Giảm thiểu rủi ro bị phạt do vi phạm dữ liệu.',
    ],
    overview: [
      'SecureOps hỗ trợ nỗ lực tuân thủ GDPR và giảm thiểu rủi ro bị phạt bằng cách giữ an toàn cho dữ liệu và thiết bị của bạn.',
    ],
    sortOrder: 21,
  },
  {
    name: 'Tuân thủ PCI DSS',
    slug: 'pci-dss',
    categorySlug: 'tuan-thu',
    shortDescription:
      'Bảo vệ dữ liệu chủ thẻ với sự bảo vệ đầu–cuối và triển khai chính sách Zero Trust để đáp ứng các yêu cầu của PCI DSS.',
    painPoints: [
      'Phải bảo vệ dữ liệu chủ thẻ tại mọi điểm trong quá trình xử lý.',
      'Yêu cầu kiểm soát truy cập chặt chẽ và đặc quyền tối thiểu.',
    ],
    benefits: [
      'Xác thực danh tính và trạng thái thiết bị với ZTNA.',
      'Duy trì truy cập theo đặc quyền tối thiểu.',
      'Bảo vệ dữ liệu chủ thẻ đầu–cuối.',
    ],
    overview: [
      'SecureOps giúp bạn bảo vệ dữ liệu chủ thẻ tại mọi điểm trong quá trình xử lý, triển khai kiểm soát truy cập mạnh và chính sách Zero Trust để đáp ứng yêu cầu PCI DSS.',
    ],
    sortOrder: 22,
  },
  {
    name: 'Tuân thủ HIPAA',
    slug: 'hipaa',
    categorySlug: 'tuan-thu',
    shortDescription:
      'Bảo vệ thông tin sức khỏe (PHI) với mã hóa luôn bật, quản lý từ mọi nơi và đáp ứng các biện pháp bảo vệ theo HIPAA.',
    painPoints: [
      'Thông tin sức khỏe được bảo vệ (PHI) đòi hỏi mã hóa và kiểm soát chặt.',
      'Cần đáp ứng các biện pháp bảo vệ kỹ thuật theo HIPAA.',
    ],
    benefits: [
      'Mã hóa luôn bật cho thông tin sức khỏe nhạy cảm.',
      'Phản ứng tự động với sự cố qua tường lửa.',
      'Phát hiện chủ động hành vi độc hại.',
    ],
    overview: [
      'Các giải pháp thế hệ mới của SecureOps là công cụ hiệu quả giúp đáp ứng các biện pháp bảo vệ theo HIPAA, bảo vệ thông tin sức khỏe với mã hóa luôn bật.',
    ],
    sortOrder: 23,
  },
  {
    name: 'Tuân thủ SOX',
    slug: 'sox',
    categorySlug: 'tuan-thu',
    shortDescription:
      'Bảo mật thế hệ mới với nhiều giải pháp giúp đạt và duy trì tuân thủ SOX, đảm bảo tính sẵn sàng của hồ sơ tài chính.',
    painPoints: [
      'Cần đảm bảo tính toàn vẹn và sẵn sàng của hồ sơ tài chính.',
      'Bảo vệ dữ liệu tài chính trên thiết bị và qua email.',
    ],
    benefits: [
      'Mã hóa toàn bộ ổ đĩa cho Windows và macOS.',
      'Kiểm soát truy cập theo đặc quyền tối thiểu trên đám mây.',
      'Đảm bảo tính sẵn sàng của hồ sơ tài chính.',
    ],
    overview: [
      'Bảo mật thế hệ mới của SecureOps bao gồm nhiều giải pháp giúp đạt và quản lý tuân thủ SOX, đảm bảo tính sẵn sàng của hồ sơ tài chính.',
    ],
    sortOrder: 24,
  },
  {
    name: 'Hỗ trợ tuân thủ CCPA',
    slug: 'ccpa',
    categorySlug: 'tuan-thu',
    shortDescription:
      'Hỗ trợ nỗ lực tuân thủ Đạo luật Quyền riêng tư Người tiêu dùng California (CCPA) với bộ giải pháp bảo mật hoàn chỉnh.',
    painPoints: [
      'CCPA đặt ra yêu cầu bảo vệ dữ liệu cá nhân người tiêu dùng.',
      'Cần bảo vệ dữ liệu cá nhân được lưu trữ và xử lý.',
    ],
    benefits: [
      'Mã hóa toàn bộ ổ đĩa cho dữ liệu cá nhân được lưu trữ.',
      'Xác minh người dùng và thiết bị trước khi cho truy cập.',
      'Bộ giải pháp bảo mật hoàn chỉnh hỗ trợ tuân thủ.',
    ],
    overview: [
      'SecureOps hỗ trợ nỗ lực tuân thủ CCPA bằng bộ giải pháp bảo mật hoàn chỉnh, bảo vệ dữ liệu cá nhân được lưu trữ với mã hóa và kiểm soát truy cập chặt chẽ.',
    ],
    sortOrder: 25,
  },
  {
    name: 'Tuân thủ an toàn Internet cho trường học (CIPA)',
    slug: 'cipa',
    categorySlug: 'tuan-thu',
    shortDescription:
      'Cung cấp công cụ và giải pháp giúp trường học và thư viện xây dựng Chính sách An toàn Internet tuân thủ CIPA.',
    painPoints: [
      'Trường học và thư viện cần kiểm soát nội dung học sinh truy cập.',
      'Phải hạn chế nội dung không phù hợp để tuân thủ CIPA.',
    ],
    benefits: [
      'Lọc web mạnh mẽ để quản lý nội dung truy cập.',
      'Hạn chế các trang không phù hợp và mạng xã hội.',
      'Quét file độc hại đến qua web hoặc email.',
    ],
    overview: [
      'SecureOps cung cấp công cụ và giải pháp giúp trường học và thư viện định nghĩa và thiết lập Chính sách An toàn Internet tuân thủ CIPA.',
    ],
    sortOrder: 26,
  },
]
