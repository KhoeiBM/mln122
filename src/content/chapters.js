// Sáu chương của môn MLN122. Mỗi chương là một "khu chợ" riêng: có phần tóm tắt,
// ba mục tiêu học, các phạm trù trọng tâm lấy từ Knowledge Hub và một ví dụ đời thường
// (trà sữa, áo thun, suất ăn) để người học bám vào.
//
// Nội dung bám sát sáu chương trong giáo trình Kinh tế chính trị Mác – Lênin (NXB Chính
// trị quốc gia Sự thật, 2021) dùng cho bậc đại học không chuyên lý luận chính trị.

export const CHAPTERS = [
  {
    id: 1,
    slug: 'khai-quat',
    title: 'Khái quát về kinh tế chính trị Mác – Lênin',
    tagline: 'Đối tượng, phương pháp, chức năng',
    summary:
      'Kinh tế chính trị học nghiên cứu quan hệ sản xuất trong sự tác động qua lại với lực lượng sản xuất và kiến trúc thượng tầng. Chương này trả lời ba câu: nghiên cứu cái gì, bằng cách nào, và để làm gì.',
    aims: [
      'Phân biệt được đối tượng nghiên cứu của kinh tế chính trị với đối tượng của kỹ thuật và quản trị.',
      'Gọi tên được các phương pháp chủ yếu, đặc biệt là trừu tượng hoá khoa học.',
      'Phân biệt quy luật kinh tế (khách quan) với chính sách kinh tế (chủ quan).',
    ],
    terms: ['doi-tuong-ktct', 'phuong-phap-truu-tuong', 'quy-luat-kinh-te'],
  },
  {
    id: 2,
    slug: 'hang-hoa-thi-truong',
    title: 'Hàng hoá và thị trường',
    tagline: 'Giá trị, giá trị sử dụng, quy luật giá trị',
    summary:
      'Hàng hoá có hai thuộc tính vì lao động làm ra nó có hai mặt. Từ đó mới giải thích được vì sao cùng một món lại có giá trị và giá cả khác nhau, và vì sao tiền chỉ là hình thức biểu hiện của giá trị.',
    aims: [
      'Chỉ ra hai thuộc tính của hàng hoá trên một món cụ thể.',
      'Giải thích lượng giá trị bằng thời gian lao động xã hội cần thiết.',
      'Trình bày được ba tác động của quy luật giá trị.',
    ],
    terms: ['hang-hoa', 'gia-tri', 'tien-te', 'quy-luat-gia-tri'],
  },
  {
    id: 3,
    slug: 'gia-tri-thang-du',
    title: 'Giá trị thặng dư và tích luỹ tư bản',
    tagline: 'Sức lao động, c và v, m, m′',
    summary:
      'Chương nặng nhất của môn. Sức lao động trở thành hàng hoá; nhà tư bản trả cho giá trị sức lao động nhưng thu về giá trị do lao động tạo ra. Phần chênh lệch là giá trị thặng dư, và mọi công thức trong chương đều bắt đầu từ đó.',
    aims: [
      'Tính được m′ = m/v khi biết c, v, m của một đơn vị hàng hoá.',
      'Phân biệt tư bản bất biến với tư bản khả biến, kể cả khi đọc một bảng chi phí.',
      'Phân biệt hai phương pháp sản xuất giá trị thặng dư và hiểu tích luỹ tư bản.',
    ],
    terms: [
      'chi-phi-san-xuat',
      'tu-ban',
      'gia-tri-thang-du',
      'ty-suat-thang-du',
      'tich-luy-tu-ban',
    ],
  },
  {
    id: 4,
    slug: 'canh-tranh-doc-quyen',
    title: 'Cạnh tranh và độc quyền',
    tagline: 'Năm đặc điểm của chủ nghĩa tư bản độc quyền',
    summary:
      'Cạnh tranh tự do không xoá bỏ cạnh tranh mà sinh ra độc quyền. Năm đặc điểm do Lênin tổng kết là bộ khung để đọc mọi thị trường có một vài ông lớn định giá — từ hãng xe đến nền tảng gọi món.',
    aims: [
      'Kể đúng năm đặc điểm kinh tế của chủ nghĩa tư bản độc quyền.',
      'Phân biệt giá cả độc quyền cao với giá cả độc quyền thấp.',
      'Nhận ra hình thức mới của độc quyền trong nền kinh tế số.',
    ],
    terms: ['canh-tranh-doc-quyen', 'dac-diem-doc-quyen', 'xuat-khau-tu-ban', 'doc-quyen-nha-nuoc'],
  },
  {
    id: 5,
    slug: 'kinh-te-thi-truong-dinh-huong-xhcn',
    title: 'Kinh tế thị trường định hướng XHCN ở Việt Nam',
    tagline: 'Đặc trưng, quan hệ lợi ích, thể chế',
    summary:
      'Đây là chương nối lý luận với chính sách Việt Nam: vẫn dùng cơ chế thị trường, nhưng mục tiêu và quan hệ sở hữu được định hướng khác. Trọng tâm là năm đặc trưng và cách xử lý quan hệ lợi ích.',
    aims: [
      'Nêu được năm đặc trưng của nền kinh tế thị trường định hướng XHCN.',
      'Phân tích một quan hệ lợi ích cụ thể theo ba chủ thể: người lao động, doanh nghiệp, nhà nước.',
      'Giải thích vai trò của Nhà nước pháp quyền trong nền kinh tế nhiều thành phần.',
    ],
    terms: ['quan-he-loi-ich', 'dac-trung-kttt', 'the-che-kinh-te'],
  },
  {
    id: 6,
    slug: 'cnh-hdh-hoi-nhap',
    title: 'Công nghiệp hoá, hiện đại hoá và hội nhập kinh tế quốc tế',
    tagline: 'Chuyển dịch cơ cấu, chuyển đổi số, FTA',
    summary:
      'Chương của hiện tại: từ nền kinh tế nông nghiệp sang công nghiệp và dịch vụ, rồi hội nhập sâu vào chuỗi giá trị toàn cầu. Nội dung gồm tính tất yếu của công nghiệp hoá, nội dung hội nhập và cách đọc cơ hội – thách thức.',
    aims: [
      'Phân biệt công nghiệp hoá với hiện đại hoá và nêu tính tất yếu của cả hai.',
      'Kể được các nội dung chủ yếu của hội nhập kinh tế quốc tế.',
      'Đánh giá một hiệp định thương mại theo cả cơ hội lẫn rủi ro.',
    ],
    terms: ['cnh-hdh', 'hoi-nhap-ktqt', 'kinh-te-tri-thuc'],
  },
];

export function chapterById(id) {
  return CHAPTERS.find((chapter) => chapter.id === Number(id)) || null;
}

export function chapterBySlug(slug) {
  return CHAPTERS.find((chapter) => chapter.slug === slug) || null;
}

export function nextChapter(id) {
  const index = CHAPTERS.findIndex((chapter) => chapter.id === Number(id));
  if (index === -1) return null;
  return CHAPTERS[index + 1] || CHAPTERS[0];
}
