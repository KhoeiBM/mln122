// Kiến thức dùng trong sản phẩm.
// Không đánh số chương: mỗi phạm trù đứng một mình, kèm trích dẫn, nguồn, đúc kết và
// phần ứng dụng vào ba ví dụ của sản phẩm.
//
// Về trích dẫn: nội dung trích theo cách diễn đạt phổ biến trong giáo trình; số trang
// chưa đối chiếu bản in nên mọi trích dẫn đều hiển thị kèm ghi chú nguồn ở giao diện.

export const TEXTBOOK = {
  title:
    'Giáo trình Kinh tế chính trị Mác – Lênin (dành cho bậc đại học, không chuyên lý luận chính trị)',
  publisher: 'Nhà xuất bản Chính trị quốc gia Sự thật',
  year: 2021,
  note: 'Số trang của từng trích dẫn cần đối chiếu bản in trước khi công bố.',
};

export const CONCEPTS = [
  {
    id: 'hang-hoa',
    name: 'Hàng hoá và hai thuộc tính',
    quote:
      'Hàng hoá là sản phẩm của lao động, có thể thoả mãn một nhu cầu nào đó của con người và được dùng để trao đổi, mua bán.',
    page: null,
    plain:
      'Một ly trà sữa vừa thoả mãn cơn khát (giá trị sử dụng) vừa là thứ được bán (giá trị). Hai thứ này không tỉ lệ với nhau: ly trà ngon hơn không có nghĩa bán được nhiều tiền hơn.',
    conclusion:
      'Giá trị sử dụng làm nên sự hữu ích; giá trị làm nên cái được trao đổi. Người mua trả tiền cho cả hai, nhưng chỉ một trong hai quyết định giá.',
    applications: {
      'tra-sua':
        'Vị ngon và ly đẹp là giá trị sử dụng; 45.000 đồng là hình thức tiền của giá trị. Quán cạnh tranh bằng giá trị sử dụng nhưng tồn tại bằng giá trị.',
      'ao-thun':
        'Cùng một chiếc áo cotton, giá trị sử dụng gần như nhau; chênh lệch 200.000 đồng nằm ở phần giá trị được thương hiệu thêm vào.',
      'suat-an':
        'Suất ăn no bụng là giá trị sử dụng; giá 35.000 đồng trên ứng dụng đã bao gồm cả phần phí kênh bán — thứ không làm bữa ăn ngon hơn.',
    },
  },
  {
    id: 'gia-tri',
    name: 'Giá trị hàng hoá',
    quote:
      'Giá trị hàng hoá là lao động xã hội của người sản xuất hàng hoá kết tinh trong hàng hoá.',
    page: null,
    plain:
      'Giá trị không nằm trong nguyên liệu, cũng không nằm ở công dụng. Nó nằm ở lượng lao động xã hội cần thiết để làm ra món đó, tính trung bình cho cả ngành.',
    conclusion:
      'Vì là lao động xã hội cần thiết, giá trị luôn là một mức trung bình — người làm tốn công hơn mức trung bình sẽ chịu thiệt.',
    applications: {
      'tra-sua':
        'Quán pha 2 phút/ly và quán pha 4 phút/ly bán cùng giá. Giá trị do mức trung bình của ngành quyết định, không do thời gian của riêng quán.',
      'ao-thun':
        'Một chiếc áo may mất 40 phút ở xưởng, nhưng giá bán tính cả hàng giờ làm thương hiệu và bán hàng — lao động ấy cũng là lao động xã hội.',
      'suat-an':
        'Suất ăn 35.000 đồng có phần lao động nấu nướng và phần lao động của cả hệ thống đặt món, giao hàng đứng sau nó.',
    },
  },
  {
    id: 'chi-phi-san-xuat',
    name: 'Chi phí sản xuất và cấu trúc c + v',
    quote:
      'Chi phí sản xuất tư bản chủ nghĩa là phần giá trị của hàng hoá, bù lại giá cả của những tư liệu sản xuất đã tiêu dùng và giá cả của sức lao động đã được sử dụng để sản xuất ra hàng hoá ấy.',
    page: null,
    plain:
      'Muốn làm ra một món, phải chi hai loại: mua nguyên liệu, máy móc, mặt bằng (gọi là c) và trả công cho người làm (gọi là v). Cộng lại là chi phí sản xuất.',
    conclusion:
      'c chỉ chuyển giá trị cũ sang sản phẩm, còn v tạo ra giá trị mới. Đó là lý do hai khoản này không bao giờ được gộp làm một khi giải thích lợi nhuận.',
    applications: {
      'tra-sua':
        'Trân châu, sữa, mặt bằng là c; công người pha chế là v. Ly trà bán 45.000 đồng, phần lớn chi phí là c — nhưng phần tạo thêm giá trị lại là v.',
      'ao-thun':
        'Vải và máy may là c; công may là v. Phần lớn tiền trong chiếc áo 250.000 đồng không nằm ở hai khoản này.',
      'suat-an':
        'Nguyên liệu, bếp, mặt bằng là c; công nấu và đóng gói là v. Phí nền tảng không thuộc c hay v của quán — nó là khoản trừ trước khi quán tính phần của mình.',
    },
  },
  {
    id: 'tu-ban',
    name: 'Tư bản bất biến và tư bản khả biến',
    quote:
      'Tư bản bất biến là bộ phận tư bản biến thành tư liệu sản xuất, giá trị của nó được bảo tồn và chuyển vào sản phẩm; tư bản khả biến là bộ phận biến thành sức lao động và tạo ra giá trị mới.',
    page: null,
    plain:
      'Máy móc không tự sinh ra đồng nào thêm: nó chỉ chuyển dần giá trị của mình vào sản phẩm. Chỉ sức lao động mới tạo ra phần lớn hơn cái đã trả cho nó.',
    conclusion:
      'Đầu tư vào máy chỉ đổi cách chia giá trị đã có; đầu tư vào con người mới là nơi sinh ra phần tăng thêm.',
    applications: {
      'tra-sua':
        'Mua thêm máy lắc không làm ly trà đắt lên — chỉ khấu hao vào giá. Thuê thêm người mới làm tăng lượng giá trị mới được tạo ra.',
      'ao-thun':
        'Xưởng may mua máy tự động để giảm giá thành, nhưng phần chênh lệch lớn nhất trong chiếc áo lại do thương hiệu định giá, không do máy.',
      'suat-an':
        'Nền tảng đầu tư hệ thống đặt món (c) để giảm chi phí mỗi đơn; nhưng phần lớn chi phí biến đổi vẫn là công của người nấu và người giao.',
    },
  },
  {
    id: 'gia-tri-thang-du',
    name: 'Giá trị thặng dư',
    quote:
      'Giá trị thặng dư là phần giá trị mới dư ra ngoài giá trị sức lao động do người công nhân tạo ra và bị nhà tư bản chiếm đoạt.',
    page: null,
    plain:
      'Sau khi trừ nguyên liệu, máy móc và tiền công, giá bán còn lại một khoản. Khoản đó không phải tiền tự sinh ra, mà là phần lao động đã tạo ra nhưng không được trả.',
    conclusion:
      'Giá trị thặng dư không phải "tiền lời gian lận"; nó là một quan hệ phân phối — và cách nó được chia là chuyện chính trị, không chỉ là chuyện kế toán.',
    applications: {
      'tra-sua':
        'Nếu ly trà 45.000 đồng có 7.200 đồng tiền công và 10.800 đồng lợi nhuận, phần lợi nhuận ấy là kết quả của việc giá bán vượt quá chi phí, trong đó công là phần đã trả.',
      'ao-thun':
        'Chiếc áo 250.000 đồng: xưởng nhận phần gia công nhỏ, thương hiệu nhận phần lớn. Cùng một sản phẩm, phần thặng dư chảy về nơi nắm quyền định giá.',
      'suat-an':
        'Suất ăn 35.000 đồng, quán còn lại khoảng 4.200 đồng sau mọi chi phí. Phần lớn hơn nằm ở phí nền tảng — nơi không nấu ăn nhưng kiểm soát đơn hàng.',
    },
  },
  {
    id: 'ty-suat-thang-du',
    name: 'Tỷ suất giá trị thặng dư',
    quote:
      'Tỷ suất giá trị thặng dư là tỷ lệ phần trăm giữa số lượng giá trị thặng dư và tư bản khả biến, được tính theo công thức m′ = m/v × 100%.',
    page: null,
    plain:
      'Đây là phép chia giữa phần dôi ra và phần đã trả cho lao động. m′ = 150% nghĩa là cứ 100 đồng trả công thì có 150 đồng dôi ra.',
    conclusion:
      'm′ đo mức bóc lột lao động sống, không đo lợi nhuận trên vốn. Một món có lãi mỏng vẫn có thể có m′ rất cao nếu tiền công chiếm phần nhỏ trong giá.',
    applications: {
      'tra-sua':
        'Cách chia tham chiếu cho m′ = 150%: 100 đồng công thì 150 đồng thặng dư. Cách chia của bạn cho ra con số khác — chênh lệch đó chính là điều cần giải thích.',
      'ao-thun':
        'Công may rất nhỏ so với giá bán, nên m′ tính trên toàn chuỗi rất cao. Nhưng nếu chỉ tính trong xưởng gia công, con số thấp hơn nhiều — cùng một chiếc áo, hai con số.',
      'suat-an':
        'Công nấu khoảng 4.200 đồng, lợi nhuận quán khoảng 4.200 đồng, cho m′ ≈ 100%. Nếu tính cả phí nền tảng vào phần dôi ra, con số tăng vọt — nhưng khoản đó không do lao động trong bếp tạo ra.',
    },
  },
  {
    id: 'canh-tranh-doc-quyen',
    name: 'Cạnh tranh và độc quyền',
    quote:
      'Độc quyền là sự liên minh giữa các doanh nghiệp lớn, nắm trong tay phần lớn việc sản xuất và tiêu thụ một loại hàng hoá hay dịch vụ, có khả năng định ra giá cả độc quyền nhằm thu lợi nhuận độc quyền cao.',
    page: null,
    plain:
      'Cạnh tranh ép giá xuống gần chi phí; độc quyền cho phép giữ giá cao hơn. Quyền định giá không đến từ sản phẩm tốt hơn, mà từ vị thế trên thị trường.',
    conclusion:
      'Khi một bên kiểm soát kênh bán hoặc thương hiệu, họ có thể lấy phần thặng dư mà không cần sản xuất giỏi hơn.',
    applications: {
      'tra-sua':
        'Quán nhỏ trong ngõ cạnh tranh bằng giá với hàng chục quán khác, nên m′ bị ép xuống. Chuỗi lớn có thương hiệu thì giữ được giá cao hơn cho cùng một ly.',
      'ao-thun':
        'Chiếc áo 250.000 đồng không đắt vì vải, mà vì thương hiệu định được giá. Đây là dạng sức mạnh thị trường dễ thấy nhất trong đời sống.',
      'suat-an':
        'Nền tảng giữ phần lớn thị phần đặt món thì đặt được mức phí. Quán nhận phí ấy như một điều kiện để được bán, không phải một thoả thuận ngang hàng.',
    },
  },
  {
    id: 'quan-he-loi-ich',
    name: 'Quan hệ lợi ích kinh tế',
    quote:
      'Quan hệ lợi ích kinh tế là quan hệ giữa người với người trong quá trình sản xuất, phân phối, trao đổi và tiêu dùng, gắn với lợi ích vật chất của các chủ thể tham gia.',
    page: null,
    plain:
      'Mỗi đồng trong giá bán đều có người nhận và người không nhận. Câu hỏi "ai lấy phần nào" là câu hỏi về quan hệ lợi ích, không phải về đạo đức của từng người.',
    conclusion:
      'Lợi ích không tự hài hoà. Muốn biết một mô hình kinh doanh có bền hay không, phải xem ai đang chịu chi phí mà không được quyết định.',
    applications: {
      'tra-sua':
        'Chủ quán quyết giá, nhân viên nhận lương cố định, người thuê nhà nhận tiền cố định. Ba người, ba rủi ro khác nhau trong cùng một ly trà.',
      'ao-thun':
        'Xưởng gia công chịu áp lực giảm giá gia công, thương hiệu chịu áp lực bán hàng. Rủi ro không chia đều vì quyền thương lượng không bằng nhau.',
      'suat-an':
        'Ba bên cùng sống trên một đơn hàng: quán, nền tảng, tài xế. Quán chịu rủi ro ế ẩm, nền tảng nhận phí theo doanh thu, tài xế nhận theo đơn.',
    },
  },
];

export function conceptById(id) {
  return CONCEPTS.find((concept) => concept.id === id) || null;
}
