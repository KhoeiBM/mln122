// Hai mốc lịch sử kinh tế mở đầu sản phẩm. Mỗi mốc có ba con số, một mâu thuẫn,
// hai phạm trù MLN122 và một câu hỏi dẫn sang phần kịch bản.
//
// Lưu ý về số liệu: các giá trị có `canChot: true` mới là số nháp, cần đối chiếu
// Niên giám thống kê / văn kiện trước khi demo. Trang /ho-so hiển thị đúng cảnh báo này.

export const PROLOGUE_INTRO =
  'Hai mốc dưới đây không phải bài học lịch sử. Chúng là hai lần nền kinh tế Việt Nam đổi cách vận hành — và mỗi lần như thế, một nhóm người phải quyết định trước, chịu hậu quả sau.';

export const MILESTONES = [
  {
    id: 'moc-1986',
    year: '1986',
    code: 'Mốc 01',
    title: 'Từ tem phiếu sang giá thị trường',
    lead:
      'Hàng hoá thiết yếu được phân phối bằng tem phiếu theo định lượng. Khi lượng hàng không đủ, cách phân phối vẫn giả định là đủ — và cái thiếu hiện ra ở chợ, không hiện ra trên giấy.',
    figures: [
      {
        value: 'Ba chữ số',
        label: 'lạm phát mỗi năm giữa thập niên 80',
        note: 'Mức chính xác theo từng năm cần đối chiếu Niên giám thống kê.',
        canChot: true,
      },
      {
        value: 'Tem phiếu',
        label: 'phương thức phân phối phần lớn hàng thiết yếu trước Đổi mới',
        note: 'Tem phiếu cho gạo, vải, thịt, xà phòng… theo định mức từng nhân khẩu.',
      },
      {
        value: '1986',
        label: 'Đại hội VI khởi xướng đường lối đổi mới',
        note: 'Sau đó là một chuỗi quyết định: xoá bao cấp, giá theo cung cầu, khoán trong nông nghiệp.',
      },
    ],
    tension: {
      title: 'Mâu thuẫn hiện ra ở đâu',
      body:
        'Sản xuất không đủ hàng, nhưng hệ thống phân phối vẫn vận hành như thể đủ: định mức không đổi, giá không đổi. Người sản xuất không có động lực làm nhiều hơn vì phần vượt định mức không đổi được thành thu nhập. Cái thiếu dồn ra chợ tự do, nơi giá cao hơn nhiều lần giá tem phiếu.',
      sides: [
        'Người sản xuất: làm nhiều không hơn làm ít.',
        'Người tiêu dùng: có tem nhưng không có hàng.',
        'Nhà nước: giữ giá nhưng mất kiểm soát giá thực tế.',
      ],
    },
    concepts: [
      {
        chapter: 2,
        name: 'Hàng hoá, tiền tệ, giá cả',
        link:
          'Giá không do quyết định hành chính tạo ra; giá hình thành từ quan hệ cung – cầu và giá trị. Khi giá bị ấn định lệch khỏi quan hệ đó, giao dịch chuyển sang nơi khác.',
      },
      {
        chapter: 5,
        name: 'Chuyển sang kinh tế thị trường định hướng XHCN',
        link:
          'Đổi mới không phải bỏ kế hoạch, mà là thừa nhận thị trường như một phương tiện phân bố nguồn lực — kèm theo đó là toàn bộ câu hỏi về quan hệ lợi ích.',
      },
    ],
    question:
      'Nếu bạn phải chọn giữa giữ ổn định giá và để giá vận động theo thị trường vào năm 1986, bạn chọn gì — và ai chịu hậu quả trong 12 tháng đầu?',
    sources: [
      'Văn kiện Đại hội đại biểu toàn quốc lần thứ VI (1986).',
      'Niên giám thống kê các năm 1986–1990 — số liệu lạm phát.',
      'Giáo trình Kinh tế chính trị Mác – Lênin, chương 5 (phần kinh tế thị trường ở Việt Nam).',
    ],
  },
  {
    id: 'moc-2007',
    year: '2007',
    code: 'Mốc 02',
    title: 'Gia nhập WTO: vốn vào, kỹ năng phải đổi',
    lead:
      'Ngày 11 tháng 1 năm 2007, Việt Nam trở thành thành viên của WTO. Vốn và công nghệ vào nhanh hơn tốc độ đào tạo người dùng được chúng — và đó là chỗ câu chuyện hôm nay bắt đầu.',
    figures: [
      {
        value: '11/01/2007',
        label: 'Việt Nam chính thức là thành viên WTO',
        note: 'Sau 11 năm đàm phán, kể từ khi nộp đơn năm 1995.',
      },
      {
        value: '≈ 48 tỷ USD',
        label: 'kim ngạch xuất khẩu năm 2007',
        note: 'Con số nháp, cần chốt theo Niên giám thống kê 2008.',
        canChot: true,
      },
      {
        value: '≈ 20 tỷ USD',
        label: 'vốn FDI đăng ký năm 2007',
        note: 'Con số nháp, cần chốt theo Niên giám thống kê 2008.',
        canChot: true,
      },
    ],
    tension: {
      title: 'Mâu thuẫn hiện ra ở đâu',
      body:
        'Lợi thế cạnh tranh của Việt Nam khi đó chủ yếu là nhân công giá thấp. Nhưng chính dòng vốn vào lại mang theo dây chuyền cần người biết vận hành, bảo trì, giám sát. Nếu kỹ năng không theo kịp, phần giá trị lớn hơn vẫn nằm ở phía đối tác — còn ta giữ phần gia công.',
      sides: [
        'Doanh nghiệp: có vốn, có máy, thiếu người vận hành.',
        'Người lao động: có việc, nhưng việc dễ bị thay thế.',
        'Địa phương: có nhà máy, kèm theo là áp lực hạ tầng và đào tạo.',
      ],
    },
    concepts: [
      {
        chapter: 6,
        name: 'Hội nhập kinh tế quốc tế và CNH – HĐH',
        link:
          'Hội nhập không tự động nâng cấp lực lượng sản xuất. Nó mở cửa cho công nghệ đi vào; năng lực hấp thụ công nghệ mới quyết định phần giá trị ta giữ lại.',
      },
      {
        chapter: 3,
        name: 'Năng suất lao động và giá trị thặng dư',
        link:
          'Tăng năng suất là cách tạo giá trị thặng dư tương đối. Không tăng năng suất thì lợi thế chỉ còn là giá nhân công thấp — thứ luôn có nơi rẻ hơn.',
      },
    ],
    question:
      'Vốn và máy vào trong một năm, còn người biết dùng máy cần năm năm. Trong khoảng giữa đó, ai trả chi phí đào tạo?',
    sources: [
      'Thông tin gia nhập WTO của Việt Nam (11/01/2007).',
      'Niên giám thống kê 2008 — xuất khẩu và FDI đăng ký năm 2007 (số liệu nháp ở trên).',
      'Giáo trình Kinh tế chính trị Mác – Lênin, chương 6 (CNH – HĐH, hội nhập).',
    ],
  },
];

export function milestoneById(id) {
  return MILESTONES.find((item) => item.id === id) || null;
}
