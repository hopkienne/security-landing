/**
 * Dữ liệu bài blog tiếng Việt cho chuyên mục Tin tức / Blog.
 *
 * Chủ đề bám theo các nội dung an ninh mạng mà trang mẫu (sophos.com) đang nhấn
 * mạnh: mã độc tống tiền, MDR / Agentic SOC, tấn công danh tính & ITDR, lừa đảo
 * email / BEC, và mối đe dọa tăng tốc bằng AI. Nội dung được biên soạn gốc bằng
 * tiếng Việt, không gắn thương hiệu bên thứ ba (mọi tham chiếu là "SecureOps").
 *
 * Dùng cho src/migrate-blog.ts để nạp vào Payload (categories + posts).
 */

import type { Block } from '@/lib/lexical'

export type CatalogPostCategory = {
  name: string
  slug: string
  description: string
}

export type CatalogPost = {
  title: string
  slug: string
  categorySlug: string
  excerpt: string
  /** ISO date string. */
  publishedAt: string
  content: Block[]
}

export const postCategories: CatalogPostCategory[] = [
  {
    name: 'Mối đe dọa & Xu hướng',
    slug: 'moi-de-doa-xu-huong',
    description: 'Phân tích các mối đe dọa mới nổi và xu hướng tấn công mạng.',
  },
  {
    name: 'Vận hành bảo mật',
    slug: 'van-hanh-bao-mat',
    description: 'Kinh nghiệm xây dựng và vận hành năng lực phòng thủ, SOC, MDR.',
  },
  {
    name: 'Hướng dẫn & Thực hành',
    slug: 'huong-dan-thuc-hanh',
    description: 'Hướng dẫn thực tế giúp doanh nghiệp nâng cao tư thế an ninh.',
  },
]

export const posts: CatalogPost[] = [
  /* ----------------------------------------------------------------- */
  {
    title: 'Mã độc tống tiền 2025: Vì sao lỗ hổng chưa vá vẫn là cửa ngõ số một',
    slug: 'ma-doc-tong-tien-2025-lo-hong-chua-va',
    categorySlug: 'moi-de-doa-xu-huong',
    excerpt:
      'Phần lớn các cuộc tấn công tống tiền không bắt đầu bằng kỹ thuật cao siêu, mà từ một lỗ hổng bị bỏ quên. Cùng phân tích chuỗi tấn công và cách chặn đứng từ sớm.',
    publishedAt: '2026-05-28T02:00:00.000Z',
    content: [
      'Mã độc tống tiền (ransomware) tiếp tục là mối đe dọa hàng đầu với doanh nghiệp ở mọi quy mô. Điều đáng nói là phần lớn các vụ việc không khởi đầu bằng một kỹ thuật tinh vi, mà từ những điểm yếu rất cơ bản: một lỗ hổng chưa được vá, một thông tin xác thực bị lộ, hoặc một dịch vụ truy cập từ xa bị phơi bày ra Internet.',
      { heading: 'Lỗ hổng chưa vá — điểm khởi đầu phổ biến nhất' },
      'Theo các báo cáo về tình hình ransomware gần đây, khoảng một phần ba số vụ tấn công bắt đầu từ một lỗ hổng bị khai thác. Đáng chú ý, phần lớn các lỗ hổng này nằm ngay trên thiết bị của người dùng cuối — nơi mà nhiều tổ chức vẫn chưa có quy trình vá lỗi chặt chẽ.',
      'Khi một lỗ hổng tồn tại đủ lâu, kẻ tấn công chỉ cần quét và khai thác hàng loạt. Chúng không nhắm vào một mục tiêu cụ thể, mà tìm bất kỳ cánh cửa nào còn mở.',
      { heading: 'Chuỗi tấn công điển hình' },
      'Một cuộc tấn công tống tiền thường đi qua các giai đoạn: xâm nhập ban đầu, leo thang đặc quyền, di chuyển ngang trong mạng, đánh cắp dữ liệu, và cuối cùng là mã hóa. Thời gian từ lúc xâm nhập đến khi triển khai mã độc — gọi là "thời gian ẩn náu" — đang ngày càng ngắn lại, đôi khi chỉ còn vài ngày.',
      'Điều này có nghĩa là cửa sổ để phát hiện và phản ứng cũng thu hẹp. Phòng thủ thụ động, chỉ dựa vào phần mềm diệt virus truyền thống, không còn đủ.',
      { heading: 'Chặn đứng từ sớm' },
      'Cách hiệu quả nhất để giảm rủi ro tống tiền là kết hợp nhiều lớp: quản lý lỗ hổng chủ động để bịt cửa ngõ xâm nhập, năng lực phát hiện và phản ứng (EDR/XDR) để bắt sớm hành vi bất thường, và giám sát 24/7 để phản ứng ngay cả ngoài giờ làm việc.',
      'SecureOps khuyến nghị doanh nghiệp ưu tiên ba việc: rà soát và vá các lỗ hổng nghiêm trọng, áp dụng xác thực đa yếu tố cho mọi truy cập từ xa, và triển khai năng lực phát hiện — phản ứng được giám sát liên tục. Ba biện pháp này, khi kết hợp, có thể chặn phần lớn các cuộc tấn công tống tiền ngay từ giai đoạn đầu.',
    ],
  },

  /* ----------------------------------------------------------------- */
  {
    title: 'Agentic SOC: Khi AI xử lý tốc độ, con người giữ phán đoán',
    slug: 'agentic-soc-ai-va-con-nguoi-trong-mdr',
    categorySlug: 'van-hanh-bao-mat',
    excerpt:
      'Mô hình trung tâm điều hành bảo mật thế hệ mới kết hợp AI và chuyên gia con người. AI xử lý tốc độ và quy mô, con người đảm bảo phán đoán và trách nhiệm.',
    publishedAt: '2026-05-22T02:00:00.000Z',
    content: [
      'Khối lượng cảnh báo mà một đội ngũ bảo mật phải xử lý mỗi ngày đã vượt xa khả năng của con người. Hàng nghìn tín hiệu từ điểm cuối, mạng, đám mây và danh tính đổ về, phần lớn là nhiễu, nhưng chỉ cần bỏ lỡ một tín hiệu thật là đủ để xảy ra sự cố nghiêm trọng.',
      { heading: 'Vì sao cần một mô hình mới' },
      'Cách tiếp cận truyền thống — tuyển thêm chuyên viên để xử lý cảnh báo — không bền vững. Tình trạng quá tải và kiệt sức trong ngành an ninh mạng đang ở mức báo động, với phần lớn đội ngũ cho biết họ lo lắng về các cuộc tấn công trong tương lai.',
      'Agentic SOC là mô hình trung tâm điều hành bảo mật trong đó các tác nhân AI (AI agents) tự động điều tra và phản ứng với mối đe dọa trong vài giây, còn chuyên gia con người giám sát và chịu trách nhiệm cho từng kết quả.',
      { heading: 'AI xử lý tốc độ và quy mô' },
      'Với mô hình này, một phần lớn sự cố có thể được giải quyết đầu–cuối hoàn toàn tự động, rút ngắn thời gian từ cảnh báo đến phản ứng xuống còn dưới một trăm giây. AI không mệt mỏi, không bỏ sót, và có thể xử lý đồng thời số lượng tín hiệu mà không đội ngũ con người nào theo kịp.',
      { heading: 'Con người giữ phán đoán và trách nhiệm' },
      'Tuy nhiên, AI không thay thế hoàn toàn con người. Những quyết định phức tạp, có rủi ro cao hoặc đòi hỏi hiểu biết về ngữ cảnh kinh doanh vẫn cần chuyên gia. Trong mô hình Agentic SOC, con người đóng vai trò giám sát: xác nhận phán định của AI, xử lý các tình huống ngoại lệ, và đảm bảo mọi hành động đều có người chịu trách nhiệm.',
      'Đây chính là triết lý đằng sau dịch vụ MDR của SecureOps: kết hợp tốc độ của máy với phán đoán của người, để doanh nghiệp vừa được bảo vệ liên tục, vừa yên tâm rằng mọi kết quả đều được một chuyên gia đứng sau.',
    ],
  },

  /* ----------------------------------------------------------------- */
  {
    title: 'Tấn công danh tính: Mặt trận mới mà công cụ phòng ngừa khó thấy',
    slug: 'tan-cong-danh-tinh-itdr',
    categorySlug: 'moi-de-doa-xu-huong',
    excerpt:
      'Thông tin xác thực bị đánh cắp đang trở thành con đường xâm nhập nhanh nhất. Vì sao bảo vệ danh tính (ITDR) trở thành lớp phòng thủ không thể thiếu?',
    publishedAt: '2026-05-15T02:00:00.000Z',
    content: [
      'Khi các lớp phòng thủ điểm cuối và mạng ngày càng vững chắc, kẻ tấn công chuyển hướng sang một mục tiêu dễ hơn: danh tính. Thay vì phá cửa, chúng đăng nhập bằng thông tin xác thực hợp lệ — và với công cụ phòng ngừa truyền thống, hành vi này gần như vô hình.',
      { heading: 'Vì sao danh tính trở thành mục tiêu' },
      'Phần lớn các tổ chức đã trải qua ít nhất một vụ xâm phạm liên quan đến danh tính trong năm qua. Một tỷ lệ lớn các sự cố do đội ngũ ứng cứu xử lý có liên quan đến tấn công danh tính ngay từ đầu.',
      'Lý do rất đơn giản: một thông tin xác thực hợp lệ cho phép kẻ tấn công đi thẳng vào hệ thống, di chuyển ngang và leo thang đặc quyền mà không kích hoạt các cảnh báo thông thường. Chúng trông giống một người dùng bình thường.',
      { heading: 'Khoảng mù của công cụ truyền thống' },
      'Phần mềm chống mã độc và tường lửa được thiết kế để chặn mã độc và lưu lượng độc hại, chứ không phải để phát hiện một phiên đăng nhập "hợp lệ nhưng đáng ngờ". Đây chính là khoảng mù mà công cụ phòng ngừa đơn lẻ khó lấp đầy.',
      { heading: 'ITDR — lớp phòng thủ cho danh tính' },
      'Phát hiện và phản ứng với mối đe dọa danh tính (ITDR) ra đời để giải quyết đúng vấn đề này. ITDR giám sát các cấu hình danh tính sai, phát hiện hành vi lạm dụng thông tin xác thực, và theo dõi dark web để cảnh báo khi thông tin xác thực của tổ chức bị rò rỉ.',
      'Kết hợp ITDR với năng lực phát hiện — phản ứng mở rộng (XDR) cho phép đội ngũ bảo mật nhìn thấy bức tranh toàn cảnh: một phiên đăng nhập bất thường từ một vị trí lạ, theo sau là hành vi truy cập dữ liệu nhạy cảm, sẽ được liên kết lại thành một chuỗi tấn công thay vì những tín hiệu rời rạc.',
      'SecureOps khuyến nghị xem danh tính như một bề mặt tấn công độc lập, cần được giám sát và bảo vệ ngang hàng với điểm cuối và mạng.',
    ],
  },

  /* ----------------------------------------------------------------- */
  {
    title: 'Lừa đảo và BEC: Vì sao 90% tấn công vẫn bắt đầu từ email',
    slug: 'lua-dao-bec-tan-cong-tu-email',
    categorySlug: 'huong-dan-thuc-hanh',
    excerpt:
      'Email vẫn là cánh cửa đầu tiên của phần lớn các cuộc tấn công. Khi AI tạo sinh giúp kẻ xấu viết email lừa đảo thuyết phục hơn, doanh nghiệp cần làm gì?',
    publishedAt: '2026-05-08T02:00:00.000Z',
    content: [
      'Dù công nghệ phòng thủ đã tiến rất xa, email vẫn là điểm khởi đầu của phần lớn các cuộc tấn công mạng thành công. Lý do nằm ở yếu tố con người: chỉ cần một nhân viên nhấp vào một liên kết hoặc tin vào một yêu cầu giả mạo, hàng rào kỹ thuật dày đến đâu cũng có thể bị vượt qua.',
      { heading: 'BEC — mối đe dọa đắt giá' },
      'Tấn công xâm phạm email doanh nghiệp (Business Email Compromise — BEC) là một trong những hình thức gây thiệt hại lớn nhất. Kẻ tấn công mạo danh lãnh đạo hoặc đối tác để lừa nhân viên chuyển tiền hoặc tiết lộ thông tin nhạy cảm. Khác với lừa đảo đại trà, BEC thường nhắm mục tiêu cụ thể và được chuẩn bị kỹ.',
      { heading: 'AI tạo sinh làm thay đổi cuộc chơi' },
      'Trước đây, nhiều email lừa đảo dễ bị nhận ra nhờ lỗi chính tả hoặc văn phong vụng về. Giờ đây, với AI tạo sinh, kẻ tấn công có thể soạn ra những email trau chuốt, đúng ngữ cảnh và rất thuyết phục — bằng bất kỳ ngôn ngữ nào. Phần lớn lãnh đạo bảo mật bày tỏ lo ngại rằng AI sẽ khiến các cuộc tấn công lừa đảo và BEC trở nên tinh vi hơn.',
      { heading: 'Phòng thủ nhiều lớp cho email' },
      'Không có một biện pháp đơn lẻ nào đủ để chặn mọi mối đe dọa email. Doanh nghiệp cần kết hợp: bảo vệ email bằng AI đa lớp để lọc mối đe dọa trước khi đến hộp thư, năng lực phát hiện mạo danh và xâm phạm danh tính, cùng chương trình đào tạo nhận thức để người dùng trở thành lớp phòng thủ cuối cùng.',
      'Đặc biệt, mô phỏng tấn công lừa đảo định kỳ giúp đo lường và cải thiện mức độ cảnh giác của nhân viên theo thời gian. SecureOps khuyến nghị xem đào tạo nhận thức không phải là việc làm một lần, mà là một quá trình liên tục song hành cùng các biện pháp kỹ thuật.',
    ],
  },

  /* ----------------------------------------------------------------- */
  {
    title: 'Khi kẻ tấn công dùng AI: Cuộc đua tốc độ và cách doanh nghiệp bắt kịp',
    slug: 'ke-tan-cong-dung-ai-cuoc-dua-toc-do',
    categorySlug: 'moi-de-doa-xu-huong',
    excerpt:
      'AI không chỉ giúp phòng thủ — nó cũng đang được kẻ tấn công sử dụng để dò quét, viết mã và di chuyển nhanh hơn. Phòng thủ cần thích ứng với vận tốc mới này.',
    publishedAt: '2026-04-30T02:00:00.000Z',
    content: [
      'An ninh mạng luôn là một cuộc đua giữa tấn công và phòng thủ. Sự xuất hiện của AI đã đẩy cuộc đua này lên một vận tốc hoàn toàn mới — và đáng tiếc, kẻ tấn công cũng đang tận dụng AI hiệu quả không kém người phòng thủ.',
      { heading: 'AI trong tay kẻ tấn công' },
      'Kẻ tấn công đang dùng AI để tự động hóa nhiều khâu: dò quét lỗ hổng trên diện rộng, soạn email lừa đảo thuyết phục, viết và biến đổi mã độc để né tránh phát hiện, và di chuyển nhanh hơn qua điểm cuối, đám mây, danh tính và ứng dụng. Chúng tận dụng cả thông tin xác thực hợp lệ và công cụ đáng tin cậy có sẵn để qua mặt các lớp phòng thủ truyền thống.',
      'Một xu hướng đáng lo ngại là sự gia tăng số lượng tệp thực thi hợp lệ bị kẻ tấn công lợi dụng để ẩn mình — khiến việc phân biệt hoạt động bình thường và độc hại trở nên khó khăn hơn nhiều.',
      { heading: 'Vì sao công cụ rời rạc không theo kịp' },
      'Khi mối đe dọa di chuyển với tốc độ của máy, các công cụ bảo mật hoạt động độc lập sẽ tạo ra khoảng mù. Đội ngũ phải tự tay ghép nối dữ liệu từ nhiều nguồn, và trong khoảng thời gian đó, kẻ tấn công đã kịp tiến xa.',
      { heading: 'Phòng thủ AI-native' },
      'Để bắt kịp, phòng thủ cũng phải vận hành ở tốc độ của AI. Một nền tảng AI-native hợp nhất tín hiệu từ toàn bộ hạ tầng — điểm cuối, mạng, đám mây, danh tính, email — vào một quy trình điều tra duy nhất, dùng AI để tương quan và ưu tiên những gì quan trọng nhất.',
      'Kết hợp với năng lực phản ứng tự động và sự giám sát của chuyên gia, cách tiếp cận này cho phép doanh nghiệp rút ngắn khoảng cách tốc độ với kẻ tấn công. Quan điểm của SecureOps là: không thể chống lại tấn công tốc độ cao bằng phòng thủ thủ công — AI phải được dùng để chống lại chính AI, dưới sự dẫn dắt của con người.',
    ],
  },
]
