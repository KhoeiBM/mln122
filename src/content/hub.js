// Knowledge Hub: các phạm trù trọng tâm của sáu chương, mỗi mục gồm trích dẫn (hoặc diễn
// đạt theo giáo trình), phần nói lại bằng lời thường, một câu đúc kết và một ví dụ đời thường.
//
// `verbatim: true` nghĩa là câu chữ theo cách diễn đạt phổ biến trong giáo trình; số trang
// vẫn cần đối chiếu bản in. `verbatim: false` là phần diễn đạt của nhóm, không phải nguyên văn —
// giao diện ghi rõ để không ai trích lại như trích dẫn gốc.

export const TEXTBOOK = {
  title:
    'Giáo trình Kinh tế chính trị Mác – Lênin (dành cho bậc đại học, không chuyên lý luận chính trị)',
  publisher: 'Nhà xuất bản Chính trị quốc gia Sự thật',
  year: 2021,
  note: 'Số trang của từng trích dẫn cần đối chiếu bản in trước khi công bố.',
};

export const HUB = [
  {
    id: 'doi-tuong-ktct',
    chapter: 1,
    term: 'Đối tượng nghiên cứu của kinh tế chính trị',
    quote:
      'Kinh tế chính trị nghiên cứu quan hệ sản xuất trong sự tác động qua lại với lực lượng sản xuất và kiến trúc thượng tầng.',
    verbatim: true,
    plain:
      'Môn này không học cách vận hành máy móc hay cách viết hợp đồng. Nó học quan hệ giữa người với người khi làm ra của cải: ai sở hữu, ai làm, ai hưởng.',
    conclusion:
      'Vì đối tượng là quan hệ sản xuất, mọi con số trong môn này đều phải đọc kèm câu hỏi "ai quyết định và ai chịu".',
    example: 'Một ly trà sữa 45.000đ: kỹ thuật pha chỉ giải thích vị, không giải thích vì sao người pha nhận 6.000đ.',
  },
  {
    id: 'phuong-phap-truu-tuong',
    chapter: 1,
    term: 'Phương pháp trừu tượng hoá khoa học',
    quote: 'Trừu tượng hoá khoa học là phương pháp chủ yếu của kinh tế chính trị Mác – Lênin.',
    verbatim: false,
    plain:
      'Muốn thấy quy luật thì phải bỏ qua các chi tiết ngẫu nhiên: bỏ qua quán này bán ế, thời tiết hôm nay, mùi vị riêng — để lại cấu trúc chung của giá trị và quan hệ phân phối.',
    conclusion:
      'Trừu tượng hoá không phải là nói chung chung; nó là chọn đúng cái cần bỏ và cái cần giữ, rồi nói rõ đã bỏ gì.',
    example: 'Bỏ qua giá từng quán, giữ lại cấu trúc chung: nguyên liệu, công, mặt bằng, thương hiệu, lợi nhuận.',
  },
  {
    id: 'quy-luat-kinh-te',
    chapter: 1,
    term: 'Quy luật kinh tế và chính sách kinh tế',
    quote:
      'Quy luật kinh tế phản ánh những quan hệ nhân quả, tất yếu, lặp lại của các hiện tượng kinh tế; chính sách kinh tế là sản phẩm chủ quan của con người nhằm vận dụng quy luật.',
    verbatim: false,
    plain:
      'Quy luật tồn tại khách quan: không ai muốn giá tăng khi cầu vượt cung, nhưng nó vẫn xảy ra. Chính sách là việc con người cố ý can thiệp vào quy luật đó.',
    conclusion:
      'Chính sách hay không nằm ở chỗ có vận dụng đúng quy luật hay không, chứ không nằm ở ý định tốt.',
    example: 'Bình ổn giá suất ăn bằng trợ giá là chính sách; còn quy luật cung – cầu thì vẫn chạy phía sau.',
  },
  {
    id: 'hang-hoa',
    chapter: 2,
    term: 'Hàng hoá và hai thuộc tính',
    quote:
      'Hàng hoá là sản phẩm của lao động, có thể thoả mãn một nhu cầu nào đó của con người và được dùng để trao đổi, mua bán.',
    verbatim: true,
    plain:
      'Một ly trà sữa vừa thoả mãn cơn khát (giá trị sử dụng) vừa là thứ được bán (giá trị). Hai thứ này không tỉ lệ với nhau: ly trà ngon hơn không có nghĩa bán được nhiều tiền hơn.',
    conclusion:
      'Giá trị sử dụng làm nên sự hữu ích; giá trị làm nên cái được trao đổi. Người mua trả tiền cho cả hai, nhưng chỉ một trong hai quyết định giá.',
    example: 'Trà sữa 45.000đ: vị ngọt là giá trị sử dụng, con số trên menu là hình thái tiền của giá trị.',
  },
  {
    id: 'gia-tri',
    chapter: 2,
    term: 'Giá trị hàng hoá',
    quote: 'Giá trị hàng hoá là lao động xã hội của người sản xuất hàng hoá kết tinh trong hàng hoá.',
    verbatim: true,
    plain:
      'Giá trị không nằm trong nguyên liệu, cũng không nằm ở công dụng. Nó nằm ở lượng lao động xã hội cần thiết để làm ra món đó, tính trung bình cho cả ngành.',
    conclusion:
      'Vì là lao động xã hội cần thiết, giá trị luôn là một mức trung bình — người làm tốn công hơn mức trung bình sẽ chịu thiệt.',
    example: 'Quán pha 2 phút/ly và quán pha 4 phút/ly bán cùng giá: thời gian riêng không quyết định giá trị.',
  },
  {
    id: 'tien-te',
    chapter: 2,
    term: 'Tiền tệ và năm chức năng',
    quote:
      'Tiền tệ là hàng hoá đặc biệt, đóng vai trò vật ngang giá chung cho tất cả các hàng hoá khác, làm phương tiện để biểu hiện và đo lường giá trị của hàng hoá.',
    verbatim: false,
    plain:
      'Tiền ra đời từ trao đổi, không phải từ thoả thuận. Nó làm được năm việc: thước đo giá trị, phương tiện lưu thông, phương tiện cất trữ, phương tiện thanh toán, tiền tệ thế giới.',
    conclusion:
      'Khi tiền chỉ còn là phương tiện thanh toán và cất trữ, giá cả tách khỏi giá trị — đó là đất sống của lạm phát.',
    example: 'Ví điện tử trả 35.000đ cho suất ăn: tiền đóng vai trò phương tiện thanh toán, không phải thước đo.',
  },
  {
    id: 'quy-luat-gia-tri',
    chapter: 2,
    term: 'Quy luật giá trị',
    quote:
      'Quy luật giá trị là quy luật kinh tế cơ bản của sản xuất hàng hoá, quy định việc sản xuất và trao đổi hàng hoá phải dựa trên cơ sở giá trị của hàng hoá, tức là hao phí lao động xã hội cần thiết.',
    verbatim: true,
    plain:
      'Giá cả lên xuống quanh giá trị, nhưng không thoát khỏi nó. Ba tác động: điều tiết sản xuất và lưu thông, kích thích cải tiến kỹ thuật, phân hoá người sản xuất.',
    conclusion:
      'Quy luật giá trị vừa thưởng người làm tốt hơn mức trung bình, vừa đào thải người làm kém — hai mặt không tách rời.',
    example: 'Quán trà sữa nào hạ được chi phí mà vẫn giữ giá thị trường thì phần chênh rơi vào tay quán.',
  },
  {
    id: 'chi-phi-san-xuat',
    chapter: 3,
    term: 'Chi phí sản xuất và cấu trúc c + v',
    quote:
      'Chi phí sản xuất tư bản chủ nghĩa là phần giá trị của hàng hoá, bù lại giá cả của những tư liệu sản xuất đã tiêu dùng và giá cả của sức lao động đã được sử dụng để sản xuất ra hàng hoá ấy.',
    verbatim: true,
    plain:
      'Muốn làm ra một món, phải chi hai loại: mua nguyên liệu, máy móc, mặt bằng (gọi là c) và trả công cho người làm (gọi là v). Cộng lại là chi phí sản xuất.',
    conclusion:
      'c chỉ chuyển giá trị cũ sang sản phẩm, còn v tạo ra giá trị mới. Đó là lý do hai khoản này không bao giờ được gộp làm một khi giải thích lợi nhuận.',
    example: 'Áo thun 250.000đ: vải và máy là c, tiền công may là v; phần còn lại sau hai khoản đó mới là m.',
  },
  {
    id: 'tu-ban',
    chapter: 3,
    term: 'Tư bản bất biến và tư bản khả biến',
    quote:
      'Tư bản bất biến là bộ phận tư bản biến thành tư liệu sản xuất, giá trị của nó được bảo tồn và chuyển vào sản phẩm; tư bản khả biến là bộ phận biến thành sức lao động và tạo ra giá trị mới.',
    verbatim: true,
    plain:
      'Máy móc không tự sinh ra đồng nào thêm: nó chỉ chuyển dần giá trị của mình vào sản phẩm. Chỉ sức lao động mới tạo ra phần lớn hơn cái đã trả cho nó.',
    conclusion:
      'Đầu tư vào máy chỉ đổi cách chia giá trị đã có; đầu tư vào con người mới là nơi sinh ra phần tăng thêm.',
    example: 'Máy may 20 triệu chuyển dần vào từng chiếc áo; người may mới là người tạo thêm giá trị cho chiếc áo đó.',
  },
  {
    id: 'gia-tri-thang-du',
    chapter: 3,
    term: 'Giá trị thặng dư',
    quote:
      'Giá trị thặng dư là phần giá trị mới dư ra ngoài giá trị sức lao động do người công nhân tạo ra và bị nhà tư bản chiếm đoạt.',
    verbatim: true,
    plain:
      'Sau khi trừ nguyên liệu, máy móc và tiền công, giá bán còn lại một khoản. Khoản đó không phải tiền tự sinh ra, mà là phần lao động đã tạo ra nhưng không được trả.',
    conclusion:
      'Giá trị thặng dư không phải "tiền lời gian lận"; nó là một quan hệ phân phối — và cách nó được chia là chuyện chính trị, không chỉ là chuyện kế toán.',
    example: 'Suất ăn 35.000đ: người nấu nhận phần nhỏ, phần dôi ra nằm ở khâu đặt món và giao hàng.',
  },
  {
    id: 'ty-suat-thang-du',
    chapter: 3,
    term: 'Tỷ suất giá trị thặng dư',
    quote:
      'Tỷ suất giá trị thặng dư là tỷ lệ phần trăm giữa số lượng giá trị thặng dư và tư bản khả biến, được tính theo công thức m′ = m/v × 100%.',
    verbatim: true,
    plain:
      'Đây là phép chia giữa phần dôi ra và phần đã trả cho lao động. m′ = 150% nghĩa là cứ 100 đồng trả công thì có 150 đồng dôi ra.',
    conclusion:
      'm′ đo mức bóc lột lao động sống, không đo lợi nhuận trên vốn. Một món có lãi mỏng vẫn có thể có m′ rất cao nếu tiền công chiếm phần nhỏ trong giá.',
    example: 'Trà sữa: v = 14%, m = 22% thì m′ ≈ 157%; cùng món đó, lợi nhuận trên tổng vốn chỉ khoảng 22/86.',
  },
  {
    id: 'tich-luy-tu-ban',
    chapter: 3,
    term: 'Tích luỹ tư bản và cấu tạo hữu cơ',
    quote:
      'Tích luỹ tư bản là việc chuyển một phần giá trị thặng dư thành tư bản phụ thêm; cấu tạo hữu cơ của tư bản là tỷ lệ giữa tư bản bất biến và tư bản khả biến (c/v).',
    verbatim: false,
    plain:
      'Muốn lớn hơn thì phải bỏ phần lãi trở lại vào sản xuất. Càng đầu tư máy, tỷ lệ c/v càng tăng, nghĩa là cùng một lượng vốn cần ít lao động sống hơn.',
    conclusion:
      'Tích luỹ làm tư bản lớn lên, nhưng đồng thời đẩy c/v lên — đó là gốc của nạn thất nghiệp tương đối trong lý luận Mác.',
    example: 'Quán trà sữa mua máy trộn tự động: c tăng, v giảm, một người làm được nhiều ly hơn.',
  },
  {
    id: 'canh-tranh-doc-quyen',
    chapter: 4,
    term: 'Cạnh tranh và độc quyền',
    quote:
      'Độc quyền là sự liên minh giữa các doanh nghiệp lớn, nắm trong tay phần lớn việc sản xuất và tiêu thụ một loại hàng hoá hay dịch vụ, có khả năng định ra giá cả độc quyền nhằm thu lợi nhuận độc quyền cao.',
    verbatim: true,
    plain:
      'Cạnh tranh ép giá xuống gần chi phí; độc quyền cho phép giữ giá cao hơn. Quyền định giá không đến từ sản phẩm tốt hơn, mà từ vị thế trên thị trường.',
    conclusion:
      'Khi một bên kiểm soát kênh bán hoặc thương hiệu, họ có thể lấy phần thặng dư mà không cần sản xuất giỏi hơn.',
    example: 'Một ứng dụng gọi món chiếm phần lớn đơn hàng có thể nâng phí kênh bán mà quán khó từ chối.',
  },
  {
    id: 'dac-diem-doc-quyen',
    chapter: 4,
    term: 'Năm đặc điểm kinh tế của chủ nghĩa tư bản độc quyền',
    quote:
      'Tập trung sản xuất và các tổ chức độc quyền; tư bản tài chính và đầu sỏ tài chính; xuất khẩu tư bản; phân chia thế giới về kinh tế giữa các tổ chức độc quyền; phân chia lãnh thổ thế giới giữa các cường quốc.',
    verbatim: false,
    plain:
      'Đây là năm dấu hiệu do Lênin tổng kết. Không phải năm sự kiện rời rạc mà là một chuỗi: sản xuất tập trung → tiền tập trung → vốn đi ra ngoài → thị trường bị chia → lãnh thổ bị chia.',
    conclusion:
      'Đọc một ngành theo năm dấu hiệu này sẽ thấy độc quyền hiện đại không cần chiếm đất, chỉ cần chiếm nền tảng.',
    example: 'Một nền tảng gọi món vừa tập trung đơn hàng, vừa có quỹ đầu tư, vừa mua lại đối thủ nhỏ.',
  },
  {
    id: 'xuat-khau-tu-ban',
    chapter: 4,
    term: 'Xuất khẩu tư bản',
    quote:
      'Xuất khẩu tư bản là việc đưa tư bản ra nước ngoài để tiến hành sản xuất, kinh doanh nhằm thu lợi nhuận độc quyền cao.',
    verbatim: false,
    plain:
      'Khác với xuất khẩu hàng hoá (bán sản phẩm ra ngoài), xuất khẩu tư bản là mang tiền và nhà máy ra ngoài để sản xuất ngay tại đó.',
    conclusion:
      'Xuất khẩu tư bản không xoá bỏ bóc lột trong nước; nó mở rộng quan hệ đó ra phạm vi toàn cầu.',
    example: 'Hãng đồ uống mở nhà máy ở nước ngoài: tư bản xuất khẩu, lao động tại chỗ làm ra giá trị thặng dư tại chỗ.',
  },
  {
    id: 'doc-quyen-nha-nuoc',
    chapter: 4,
    term: 'Chủ nghĩa tư bản độc quyền nhà nước',
    quote:
      'Chủ nghĩa tư bản độc quyền nhà nước là sự kết hợp sức mạnh của các tổ chức độc quyền với sức mạnh của nhà nước tư sản thành một cơ chế thống nhất, nhằm thu lợi nhuận độc quyền cao.',
    verbatim: false,
    plain:
      'Nhà nước không đứng ngoài thị trường: nó mua hàng của tổ chức độc quyền, nhận hợp đồng quốc phòng, cứu trợ khi khủng hoảng và đặt luật chơi.',
    conclusion:
      'Khi lợi nhuận rủi ro được xã hội hoá còn lợi nhuận thì tư nhân hoá, độc quyền trở nên rất khó phá.',
    example: 'Gói cứu trợ ngân hàng bằng tiền thuế là ví dụ kinh điển của cơ chế này.',
  },
  {
    id: 'quan-he-loi-ich',
    chapter: 5,
    term: 'Quan hệ lợi ích kinh tế',
    quote:
      'Quan hệ lợi ích kinh tế là quan hệ giữa người với người trong quá trình sản xuất, phân phối, trao đổi và tiêu dùng, gắn với lợi ích vật chất của các chủ thể tham gia.',
    verbatim: true,
    plain:
      'Mỗi đồng trong giá bán đều có người nhận và người không nhận. Câu hỏi "ai lấy phần nào" là câu hỏi về quan hệ lợi ích, không phải về đạo đức của từng người.',
    conclusion:
      'Lợi ích không tự hài hoà. Muốn biết một mô hình kinh doanh có bền hay không, phải xem ai đang chịu chi phí mà không được quyết định.',
    example: 'Suất ăn 35.000đ: người nấu, nền tảng và người giao hàng cùng chia một khoản, nhưng quyền đặt giá chỉ ở một phía.',
  },
  {
    id: 'dac-trung-kttt',
    chapter: 5,
    term: 'Đặc trưng của kinh tế thị trường định hướng XHCN',
    quote:
      'Nền kinh tế thị trường định hướng xã hội chủ nghĩa ở Việt Nam hướng tới mục tiêu dân giàu, nước mạnh, dân chủ, công bằng, văn minh; có nhiều hình thức sở hữu, nhiều thành phần kinh tế, trong đó kinh tế nhà nước giữ vai trò chủ đạo; vận hành theo cơ chế thị trường có sự quản lý của Nhà nước pháp quyền xã hội chủ nghĩa.',
    verbatim: false,
    plain:
      'Vẫn là thị trường: giá do cung cầu, doanh nghiệp tự quyết. Khác ở chỗ mục tiêu cuối cùng và vai trò của sở hữu nhà nước, của an sinh, của phân phối.',
    conclusion:
      'Định hướng không nằm ở việc xoá thị trường, mà ở việc chọn ai hưởng thành quả của thị trường đó.',
    example: 'Giá trà sữa do thị trường quyết; học phí và viện phí thì có thêm một tầng chính sách.',
  },
  {
    id: 'the-che-kinh-te',
    chapter: 5,
    term: 'Thể chế kinh tế và hoàn thiện thể chế',
    quote:
      'Thể chế kinh tế là hệ thống quy tắc, luật lệ và tổ chức nhằm điều chỉnh hành vi của các chủ thể kinh tế; hoàn thiện thể chế là làm cho hệ thống đó đồng bộ, minh bạch và hiệu quả.',
    verbatim: false,
    plain:
      'Thể chế là luật chơi: ai được làm gì, làm sai thì chịu gì, tranh chấp giải quyết ở đâu. Luật chơi kém thì người làm ăn tử tế chịu thiệt trước.',
    conclusion:
      'Cải cách thể chế không phải thủ tục hành chính; nó quyết định chi phí giao dịch — thứ quyết định ai sống được trên thị trường.',
    example: 'Một quán nhỏ có đăng ký kinh doanh hay không phụ thuộc vào chi phí tuân thủ, tức là vào thể chế.',
  },
  {
    id: 'cnh-hdh',
    chapter: 6,
    term: 'Công nghiệp hoá, hiện đại hoá',
    quote:
      'Công nghiệp hoá, hiện đại hoá là quá trình chuyển đổi căn bản, toàn diện các hoạt động sản xuất, kinh doanh, dịch vụ và quản lý kinh tế – xã hội từ dựa trên lao động thủ công là chính sang dựa trên lao động sử dụng máy móc, công nghệ hiện đại.',
    verbatim: false,
    plain:
      'Công nghiệp hoá là thay sức người bằng máy; hiện đại hoá là làm việc đó bằng công nghệ mới nhất, gắn với tri thức và dữ liệu.',
    conclusion:
      'Với nước đi sau, công nghiệp hoá không chỉ là xây nhà máy mà là chọn đúng chỗ đứng trong chuỗi giá trị toàn cầu.',
    example: 'Một xưởng may dùng máy cắt tự động: công nghiệp hoá ở khâu cắt, hiện đại hoá ở khâu thiết kế và đặt hàng.',
  },
  {
    id: 'hoi-nhap-ktqt',
    chapter: 6,
    term: 'Hội nhập kinh tế quốc tế',
    quote:
      'Hội nhập kinh tế quốc tế là quá trình các quốc gia gắn kết nền kinh tế của mình với nền kinh tế khu vực và thế giới thông qua các hoạt động thương mại, đầu tư, tài chính, lao động và chuyển giao công nghệ.',
    verbatim: false,
    plain:
      'Hội nhập là mở cửa có lộ trình: hàng hoá, vốn, lao động và luật chơi đi qua biên giới. Không phải chỉ là ký hiệp định, mà là chịu áp lực cạnh tranh ngay ở sân nhà.',
    conclusion:
      'Hội nhập làm miếng bánh to hơn nhưng cách chia lại do vị thế quyết định — nước nào lên được nấc thang giá trị thì hưởng nhiều hơn.',
    example: 'Áo thun xuất khẩu: gia công nhận ít, thương hiệu và thiết kế nhận nhiều — đó là bài học về nấc thang giá trị.',
  },
  {
    id: 'kinh-te-tri-thuc',
    chapter: 6,
    term: 'Kinh tế tri thức và chuyển đổi số',
    quote:
      'Kinh tế tri thức là nền kinh tế trong đó tri thức, thông tin và dữ liệu là yếu tố sản xuất chủ yếu, chiếm tỷ trọng lớn trong giá trị gia tăng.',
    verbatim: false,
    plain:
      'Khi dữ liệu và tri thức thành đầu vào chính, chi phí biên giảm mạnh: phần mềm làm thêm một bản gần như miễn phí — khác hẳn làm thêm một chiếc áo.',
    conclusion:
      'Đó là lý do độc quyền nền tảng mạnh hơn độc quyền nhà máy: một khi đã dẫn đầu, chi phí phục vụ thêm một người dùng gần bằng không.',
    example: 'Ứng dụng gọi món thêm 1.000 quán mới tốn rất ít chi phí, nhưng chiếm thêm thị phần của mọi quán đó.',
  },
];

export function hubById(id) {
  return HUB.find((entry) => entry.id === id) || null;
}

export function hubByChapter(chapterId) {
  return HUB.filter((entry) => entry.chapter === Number(chapterId));
}

export function sourceLine(entry) {
  const base = `${TEXTBOOK.title}, ${TEXTBOOK.publisher}, ${TEXTBOOK.year}`;
  const label = entry.verbatim ? 'trích giáo trình' : 'diễn đạt theo giáo trình';
  return `${label} · ${base}${entry.page ? `, tr. ${entry.page}` : ', số trang cần đối chiếu bản in'}`;
}
