// Hai kịch bản quyết định. Mỗi kịch bản: một vai, bốn dữ kiện, ba phương án.
// Mỗi phương án có hệ quả trên ba trục (kinh tế / an sinh / bền vững), dòng thời gian,
// người trả giá, ba góc nhìn và hai phạm trù MLN122.
//
// Nguyên tắc nội dung: không phương án nào là đáp án đúng. Mọi phương án đều có
// người được lợi và người trả giá; phần "Góc phân tích" chỉ giải thích bằng lý luận.

export const AXES = [
  { key: 'kinhTe', label: 'Kinh tế', hint: 'chi phí, doanh thu, năng suất' },
  { key: 'anSinh', label: 'An sinh', hint: 'việc làm, thu nhập, người yếu thế' },
  { key: 'benVung', label: 'Bền vững', hint: 'năng lực để tự đứng sau 3 năm' },
];

export const SCENARIOS = [
  {
    id: 'ai-va-viec-lam',
    code: 'HS-01',
    title: 'AI thay đổi dây chuyền',
    kicker: 'Một nhà máy may gia công ở ngoại thành',
    minutes: 8,
    chapters: [3, 6],
    role: {
      name: 'Bạn là thành viên tổ chuyển đổi của nhà máy',
      detail:
        'Nhà máy may gia công cho một nhãn hàng nước ngoài, 1.200 công nhân. Bạn được giao đề xuất phương án trình ban giám đốc trong hai tuần.',
    },
    brief:
      'Đối tác vừa tăng yêu cầu chất lượng và giảm 6% đơn giá gia công. Hệ thống kiểm lỗi bằng mắt không còn đạt tỉ lệ lỗi cho phép. Có công nghệ thị giác máy tính đủ dùng, nhưng dây chuyền phải có người biết vận hành nó.',
    dataPoints: [
      {
        value: '400 người',
        label: 'đang làm khâu kiểm lỗi bằng mắt',
        note: 'Phần lớn là lao động phổ thông, thâm niên 8–15 năm.',
      },
      {
        value: '60%',
        label: 'khâu kiểm lỗi máy có thể thay thế',
        note: 'Phần còn lại vẫn cần người vì sản phẩm may không đồng nhất.',
      },
      {
        value: '80 người',
        label: 'kỹ thuật viên vận hành còn thiếu nếu chạy tự động',
        note: 'Không có trong nhà máy; thị trường lao động địa phương cũng thiếu.',
      },
      {
        value: '4%',
        label: 'biên lợi nhuận hiện tại',
        note: 'Chi phí đào tạo lại ước tính 9 triệu đồng/người.',
      },
    ],
    tension: {
      title: 'Quyết định trong 9 tháng',
      body:
        'Không đổi thì mất hợp đồng lớn nhất. Đổi nhanh thì 300 người mất việc trong một huyện mà nhà máy là chỗ làm lớn thứ hai. Đổi có chuẩn bị thì lợi nhuận hai năm tới mỏng đi rõ rệt.',
    },
    options: [
      {
        id: 'A',
        title: 'Giữ nguyên quy trình',
        summary:
          'Không đầu tư công nghệ. Thương lượng lại với đối tác để giữ đơn giá, chấp nhận bị cắt bớt đơn hàng.',
        ledger: {
          kinhTe: {
            signal: 'xuong',
            text: 'Không mất vốn đầu tư, nhưng mất dần đơn hàng lớn: doanh thu có thể giảm khoảng 30% trong ba năm.',
          },
          anSinh: {
            signal: 'hon-hop',
            text: 'Không ai mất việc trong 12 tháng đầu. Lương đứng yên vì năng suất không tăng, trong khi chi phí sinh hoạt tăng.',
          },
          benVung: {
            signal: 'xuong',
            text: 'Năng lực sản xuất không đổi trong khi đối thủ cùng ngành đã tự động hoá. Rủi ro bị dồn về cuối.',
          },
        },
        timeline: [
          { when: '6 tháng', what: 'Không ai bị ảnh hưởng. Đơn hàng giảm nhẹ, ca làm vẫn đủ.' },
          { when: '3 năm', what: 'Mất hợp đồng chính, phải giảm ca và cắt giảm hàng loạt.' },
        ],
        costPaidBy:
          'Chi phí được đẩy về sau và do người lao động trả: mất việc cùng lúc, khó tìm việc mới vì cả huyện cùng một nghề.',
        perspectives: [
          {
            role: 'Chị Hoa, 12 năm ở khâu kiểm lỗi',
            stake: 'Công việc trước mắt',
            view:
              '“Yên tâm thêm vài năm.” Nhưng chị cũng là người đầu tiên bị cắt ca nếu đơn hàng giảm, và ở tuổi 44 việc tìm chỗ mới khó hơn nhiều.',
          },
          {
            role: 'Anh Dũng, tổ trưởng chuyền',
            stake: 'Tay nghề của tổ',
            view:
              '“Giữ người là giữ tay nghề.” Đúng trong 6 tháng. Nhưng cả tổ vẫn kiểm bằng mắt trong khi đối tác đã quen với tiêu chuẩn mới.',
          },
          {
            role: 'Giám đốc nhà máy',
            stake: 'Hợp đồng và dòng tiền',
            view:
              'Không thể cam kết với đối tác rằng “chúng tôi không đổi gì”. Nhưng cũng chưa có vốn để đổi ngay.',
          },
        ],
        theory: [
          {
            chapter: 3,
            concept: 'Năng suất lao động và giá trị thặng dư tương đối',
            link:
              'Không tăng năng suất thì phần giá trị thặng dư tương đối không tăng; lợi thế chỉ còn dựa vào việc trả công thấp hơn — thứ không thể giữ mãi.',
          },
          {
            chapter: 6,
            concept: 'Lực lượng sản xuất trong CNH – HĐH',
            link:
              'Giữ nguyên lực lượng sản xuất cũ nghĩa là giữ nguyên vị trí gia công trong chuỗi giá trị, kèm theo toàn bộ rủi ro của vị trí đó.',
          },
        ],
      },
      {
        id: 'B',
        title: 'Đầu tư công nghệ, đào tạo lại 400 người',
        summary:
          'Mua hệ thống kiểm lỗi, chuyển 400 người sang vị trí vận hành và giám sát, đào tạo trong 9 tháng theo ba giai đoạn.',
        ledger: {
          kinhTe: {
            signal: 'hon-hop',
            text: 'Lợi nhuận mỏng đi khoảng hai năm: 9 triệu × 400 người là 3,6 tỷ đồng, chưa kể thiết bị. Sau đó biên lợi nhuận cao hơn hiện tại.',
          },
          anSinh: {
            signal: 'len',
            text: 'Không có làn sóng mất việc. 400 người chuyển sang vị trí mới với thu nhập giữ hoặc tăng; số còn lại được đào tạo chéo.',
          },
          benVung: {
            signal: 'len',
            text: 'Năng lực vận hành nằm lại trong nhà máy, không phụ thuộc một đối tác hay một nhà cung cấp thiết bị.',
          },
        },
        timeline: [
          { when: '9 tháng', what: 'Ba lớp chuyển đổi, vừa chạy vừa học. Năng suất tạm giảm 5–8%.' },
          { when: '2–3 năm', what: 'Đạt tiêu chuẩn chất lượng mới, giữ được đơn hàng, có kỹ thuật viên nội bộ.' },
        ],
        costPaidBy:
          'Doanh nghiệp trả trước bằng lợi nhuận; người lao động trả bằng thời gian học ngoài giờ trong 9 tháng.',
        perspectives: [
          {
            role: 'Chị Hoa, 12 năm ở khâu kiểm lỗi',
            stake: 'Học lại ở tuổi 44',
            view:
              '“Tôi không biết dùng máy tính.” Nhưng công việc mới là đọc kết quả máy và quyết định lô nào phải kiểm tay — gần với kinh nghiệm 12 năm hơn là với máy tính.',
          },
          {
            role: 'Anh Dũng, tổ trưởng chuyền',
            stake: 'Tiến độ trong 9 tháng',
            view:
              'Vừa chạy đơn vừa đào tạo là hai việc cùng lúc. Nếu không giảm chỉ tiêu trong giai đoạn chuyển đổi, người học sẽ bỏ.',
          },
          {
            role: 'Kỹ thuật viên mới tuyển',
            stake: 'Cơ hội nghề',
            view:
              'Có chỗ để học nghề mới ngay tại huyện, không phải lên thành phố. Nhưng lương khởi điểm phải đủ giữ người, nếu không sẽ bị nơi khác hút.',
          },
        ],
        theory: [
          {
            chapter: 3,
            concept: 'Tăng năng suất để tạo giá trị thặng dư tương đối',
            link:
              'Đây là con đường tăng giá trị thặng dư dựa vào công nghệ và tổ chức lao động, không dựa vào kéo dài ngày lao động hay hạ công.',
          },
          {
            chapter: 1,
            concept: 'Quan hệ sản xuất phù hợp với trình độ lực lượng sản xuất',
            link:
              'Khi công nghệ đổi, cách tổ chức lao động và phân phối thu nhập phải đổi theo. Đào tạo lại chính là điều chỉnh quan hệ sản xuất cho khớp.',
          },
        ],
      },
      {
        id: 'C',
        title: 'Tự động hoá nhanh toàn bộ khâu kiểm lỗi',
        summary:
          'Ký hợp đồng trọn gói với nhà cung cấp nước ngoài: máy, phần mềm và 20 kỹ thuật viên vận hành thuê ngoài trong ba năm.',
        ledger: {
          kinhTe: {
            signal: 'len',
            text: 'Đạt chuẩn chất lượng trong 8 tháng, giữ được đơn hàng, lãi rõ rệt ngay năm đầu.',
          },
          anSinh: {
            signal: 'xuong',
            text: 'Khoảng 300 người ở khâu kiểm lỗi mất việc. Trợ cấp một lần không thay được thu nhập hàng tháng.',
          },
          benVung: {
            signal: 'xuong',
            text: 'Kỹ năng vận hành nằm ở nhà cung cấp. Hết hợp đồng ba năm, nhà máy vẫn không tự vận hành được hệ thống của mình.',
          },
        },
        timeline: [
          { when: '8 tháng', what: 'Chất lượng đạt chuẩn mới, đơn hàng giữ được, cổ đông hài lòng.' },
          { when: '3 năm', what: 'Kết thúc hợp đồng thuê ngoài; hoặc gia hạn với giá mới, hoặc học lại từ đầu.' },
        ],
        costPaidBy:
          'Chi phí xã hội do người lao động và địa phương trả: mất thu nhập, áp lực an sinh, trong khi lợi ích tập trung ở doanh nghiệp.',
        perspectives: [
          {
            role: 'Chị Hoa, 12 năm ở khâu kiểm lỗi',
            stake: 'Việc làm',
            view:
              'Được trợ cấp ba tháng lương. Nhưng ở huyện này, 300 người cùng rời một nhà máy thì không ai tuyển nổi.',
          },
          {
            role: 'Anh Dũng, tổ trưởng chuyền',
            stake: 'Vai trò của tổ',
            view:
              'Tổ vẫn còn việc, nhưng phần việc khó nhất đã chuyển cho người của nhà cung cấp. Kinh nghiệm của tổ không còn được dùng để quyết định.',
          },
          {
            role: 'Chủ tịch huyện',
            stake: 'An sinh địa phương',
            view:
              'Nhà máy đóng góp lớn cho ngân sách huyện. Nhưng 300 hộ mất thu nhập trong một quý là việc huyện phải xử lý, không phải doanh nghiệp.',
          },
        ],
        theory: [
          {
            chapter: 3,
            concept: 'Giá trị thặng dư siêu ngạch và thời gian của nó',
            link:
              'Lợi thế từ công nghệ mới chỉ là siêu ngạch tạm thời. Khi đối thủ cũng tự động hoá, phần chênh lệch biến mất — còn chi phí xã hội thì ở lại.',
          },
          {
            chapter: 5,
            concept: 'Quan hệ lợi ích kinh tế',
            link:
              'Lợi ích doanh nghiệp, người lao động và địa phương không tự động hài hoà. Không có cơ chế chia sẻ thì lợi ích tập trung một phía, chi phí dồn phía còn lại.',
          },
        ],
      },
    ],
    counterQuestion:
      'Phát triển công nghệ đến đâu thì chi phí chuyển đổi do ai trả — doanh nghiệp, người lao động, hay ngân sách?',
    reflectionPrompt:
      'Viết 3–5 câu: bạn chọn phương án nào, ai chịu chi phí trong 12 tháng đầu, và bạn dựa vào phạm trù nào của MLN122 để lập luận.',
    hints: [
      'Ai được lợi trước, ai chịu trước?',
      'Nếu bạn là chị Hoa, bạn muốn doanh nghiệp làm gì trong 6 tháng đầu?',
      'Điều kiện nào khiến phương án C trở nên chấp nhận được?',
    ],
  },

  {
    id: 'nen-tang-tang-phi',
    code: 'HS-02',
    title: 'Nền tảng tăng phí hoa hồng',
    kicker: 'Một ứng dụng giao đồ ăn giữ 72% thị phần',
    minutes: 8,
    chapters: [4, 5],
    role: {
      name: 'Bạn phụ trách chính sách đối tác của nền tảng',
      detail:
        'Nền tảng "Nồi Niêu" (tên hư cấu) có 40.000 quán đối tác và 72% thị phần giao đồ ăn tại ba thành phố lớn. Quỹ đầu tư yêu cầu có lãi trong 12 tháng.',
    },
    brief:
      'Mảng giao hàng đang lỗ 31% mỗi đơn. Ban điều hành đề xuất tăng phí hoa hồng từ 20% lên 28%. Hiệp hội quán ăn nhỏ đã gửi kiến nghị, và một bài báo về "phí ẩn" đang được chia sẻ nhiều.',
    dataPoints: [
      {
        value: '20% → 28%',
        label: 'mức phí hoa hồng đề xuất',
        note: 'Một quán bán 100 triệu đồng/tháng sẽ trả thêm 8 triệu.',
      },
      {
        value: '31%',
        label: 'phần lỗ trên mỗi đơn giao hàng',
        note: 'Chủ yếu do chi phí tài xế và khuyến mại thu hút khách.',
      },
      {
        value: '40.000',
        label: 'quán đối tác, trong đó 63% là hộ kinh doanh nhỏ',
        note: 'Nhóm này không có bộ phận pháp chế hay kế toán riêng.',
      },
      {
        value: '72%',
        label: 'thị phần của nền tảng tại ba thành phố',
        note: 'Đối thủ thứ hai khoảng 18%.',
      },
    ],
    tension: {
      title: 'Quyết định trong 12 tháng',
      body:
        'Tăng phí là cách nhanh nhất để cân đối chi phí giao hàng. Nhưng khi thị phần đã ở mức 72%, việc tăng phí không còn giống một quyết định thương lượng bình thường giữa hai bên có quyền lựa chọn ngang nhau.',
    },
    options: [
      {
        id: 'A',
        title: 'Tăng phí, lập quỹ hỗ trợ quán nhỏ',
        summary:
          'Áp mức 28% từ quý sau, đồng thời lập quỹ hỗ trợ cho quán dưới 5 đơn/ngày: giảm còn 22% trong 12 tháng và hỗ trợ chụp ảnh, quảng cáo.',
        ledger: {
          kinhTe: {
            signal: 'hon-hop',
            text: 'Doanh thu phí tăng khoảng 18% thay vì 24% nếu tăng đều. Đủ cân đối phần lỗ nhưng chậm hơn kế hoạch của quỹ đầu tư.',
          },
          anSinh: {
            signal: 'len',
            text: 'Nhóm yếu nhất không bị sốc ngay. Nhưng quán vừa (trên 20 đơn/ngày) vẫn chịu đủ 28% dù đây là nhóm đóng góp nhiều đơn nhất.',
          },
          benVung: {
            signal: 'len',
            text: 'Giữ được quan hệ đối tác và giảm rủi ro phản ứng công luận. Đổi lại là một cơ chế trợ giá cần duy trì lâu dài.',
          },
        },
        timeline: [
          { when: 'Quý 1', what: 'Phí mới áp dụng, quán nhỏ được giảm tạm thời, ít phản ứng công khai.' },
          { when: 'Năm 2', what: 'Quỹ hỗ trợ hết hạn; áp lực tăng phí đều quay lại nếu chi phí giao hàng chưa giảm.' },
        ],
        costPaidBy:
          'Doanh nghiệp trả bằng doanh thu ngắn hạn; nền tảng vẫn là bên quyết định ai được hỗ trợ.',
        perspectives: [
          {
            role: 'Cô Lan, quán cơm 4 người, 9 đơn/ngày',
            stake: 'Chi phí cố định',
            view:
              'Vẫn được hưởng mức hỗ trợ 12 tháng, đủ thời gian để tính lại giá menu. Nhưng cô không biết năm sau mình còn trong diện hỗ trợ hay không.',
          },
          {
            role: 'Tài xế Hùng, chạy 11 tiếng/ngày',
            stake: 'Thu nhập mỗi đơn',
            view:
              'Phí tăng không chảy xuống tài xế. Anh chỉ quan tâm cước mỗi đơn có tăng để bù giá xăng, và câu trả lời thường là không.',
          },
          {
            role: 'Sinh viên Mai, đặt 3 bữa/tuần',
            stake: 'Giá bữa ăn',
            view:
              'Giá trên ứng dụng khó tăng ngay vì quán sợ mất khách. Nhiều quán chọn giảm khẩu phần thay vì tăng giá — điều khách khó thấy hơn.',
          },
        ],
        theory: [
          {
            chapter: 4,
            concept: 'Độc quyền và giá cả độc quyền',
            link:
              'Với 72% thị phần, nền tảng có khả năng định giá cao hơn mức cạnh tranh. Quỹ hỗ trợ làm dịu tác động nhưng không thay đổi cấu trúc quyền lực thị trường.',
          },
          {
            chapter: 5,
            concept: 'Quan hệ lợi ích kinh tế',
            link:
              'Phí hoa hồng là điểm giao của ba lợi ích: nền tảng, quán, người tiêu dùng. Không có cơ chế đại diện cho phía yếu thì thoả thuận nghiêng về phía mạnh.',
          },
        ],
      },
      {
        id: 'B',
        title: 'Tăng phí và dồn toàn bộ vào hạ tầng giao hàng',
        summary:
          'Áp mức 28% cho mọi đối tác, dùng toàn bộ phần tăng để mở rộng mạng lưới giao hàng và giảm thời gian chờ.',
        ledger: {
          kinhTe: {
            signal: 'len',
            text: 'Cân đối được chi phí giao hàng trong 3 quý và có thể giảm phí sau đó nếu mật độ đơn tăng. Nhưng lợi ích đến muộn hơn chi phí.',
          },
          anSinh: {
            signal: 'xuong',
            text: 'Quán nhỏ chịu toàn bộ phần tăng. Nhiều hộ kinh doanh không có biên lợi nhuận đủ để hấp thụ 8 điểm phần trăm.',
          },
          benVung: {
            signal: 'hon-hop',
            text: 'Hạ tầng tốt hơn là lợi ích thật cho toàn hệ sinh thái, nhưng vị thế độc quyền của nền tảng cũng mạnh thêm.',
          },
        },
        timeline: [
          { when: 'Quý 1–3', what: 'Phí tăng đều, hạ tầng mở rộng, thời gian giao giảm.' },
          { when: 'Năm 2', what: 'Nếu không giảm phí, một phần quán nhỏ rời nền tảng hoặc chuyển sang bán trực tiếp.' },
        ],
        costPaidBy:
          'Quán nhỏ trả trước, khách hàng trả sau (qua giá hoặc khẩu phần), lợi ích đến lượt nền tảng và toàn hệ thống.',
        perspectives: [
          {
            role: 'Cô Lan, quán cơm 4 người, 9 đơn/ngày',
            stake: 'Sống còn',
            view:
              'Chênh 8% trên doanh thu bằng gần toàn bộ lãi ròng của quán. Lựa chọn thực tế là tăng giá, giảm khẩu phần, hoặc rời ứng dụng.',
          },
          {
            role: 'Tài xế Hùng, chạy 11 tiếng/ngày',
            stake: 'Điều kiện làm việc',
            view:
              'Đơn dày hơn, ít chờ hơn, thu nhập ổn định hơn. Đây là phía được lợi rõ nhất trong phương án này.',
          },
          {
            role: 'Sinh viên Mai, đặt 3 bữa/tuần',
            stake: 'Giá và chất lượng',
            view:
              'Giao nhanh hơn trong 3 tháng đầu, sau đó giá và khẩu phần thay đổi. Bạn chỉ thấy phần sau.',
          },
        ],
        theory: [
          {
            chapter: 4,
            concept: 'Cạnh tranh không hoàn hảo và sức mạnh thị trường',
            link:
              'Nền tảng không cần thoả thuận với ai để nâng giá; chỉ cần giữ thị phần đủ lớn. Đây là biểu hiện của sức mạnh thị trường, không phải quan hệ cung – cầu thông thường.',
          },
          {
            chapter: 2,
            concept: 'Giá trị, giá cả và quan hệ cung – cầu',
            link:
              'Giá dịch vụ giao hàng đang thấp hơn chi phí thực (lỗ 31%/đơn) nhờ vốn đầu tư. Khi vốn phải thu hồi, giá bắt buộc điều chỉnh — câu hỏi là ai chịu phần điều chỉnh đó.',
          },
        ],
      },
      {
        id: 'C',
        title: 'Không tăng phí, mở API cho đối thủ',
        summary:
          'Giữ mức 20%, mở giao diện lập trình để quán và đối thủ cùng dùng mạng lưới giao hàng, thu phí hạ tầng theo đơn.',
        ledger: {
          kinhTe: {
            signal: 'xuong',
            text: 'Biên lợi nhuận mỏng đi trong 12–18 tháng. Có thể thu phí hạ tầng ổn định về sau, nhưng không đủ nhanh để đáp ứng yêu cầu của quỹ đầu tư.',
          },
          anSinh: {
            signal: 'len',
            text: 'Quán nhỏ giữ được chi phí hiện tại và có thêm lựa chọn kênh bán, giảm phụ thuộc một nền tảng.',
          },
          benVung: {
            signal: 'hon-hop',
            text: 'Thị trường cạnh tranh hơn, nhưng nền tảng tự nguyện từ bỏ một phần lợi thế quy mô — điều hiếm khi xảy ra nếu không có áp lực bên ngoài.',
          },
        },
        timeline: [
          { when: '6 tháng', what: 'API mở, đối thủ dùng chung mạng giao hàng, đơn hàng tăng nhưng biên lợi nhuận giảm.' },
          { when: '18 tháng', what: 'Nếu hạ tầng thật sự hiệu quả, mô hình "phí hạ tầng" có thể bền hơn "phí hoa hồng".' },
        ],
        costPaidBy:
          'Cổ đông trả bằng lợi nhuận ngắn hạn; đổi lại là vị thế thị trường ít bị phản ứng hơn và quan hệ đối tác bền hơn.',
        perspectives: [
          {
            role: 'Cô Lan, quán cơm 4 người, 9 đơn/ngày',
            stake: 'Lựa chọn kênh bán',
            view:
              'Lần đầu cô có thể chọn: ở lại, hoặc dùng chung mạng giao hàng qua một bên khác. Chi phí không giảm ngay nhưng quyền lựa chọn là thật.',
          },
          {
            role: 'Tài xế Hùng, chạy 11 tiếng/ngày',
            stake: 'Số đơn mỗi ngày',
            view:
              'Nhiều đơn hơn vì mạng lưới phục vụ nhiều nền tảng. Nhưng chính sách thưởng và phân đơn có thể thay đổi theo hợp đồng mới.',
          },
          {
            role: 'Sinh viên Mai, đặt 3 bữa/tuần',
            stake: 'Giá và lựa chọn',
            view:
              'Có thể so sánh giá giữa các ứng dụng trên cùng một quán. Đây là thay đổi khách hàng nhận ra rõ nhất.',
          },
        ],
        theory: [
          {
            chapter: 4,
            concept: 'Cạnh tranh và độc quyền',
            link:
              'Mở hạ tầng cho đối thủ là cách chuyển từ cạnh tranh triệt tiêu sang cạnh tranh trên nền hạ tầng chung. Lý luận MLN122 cho thấy độc quyền không tự tan; nó chỉ bị hạn chế bởi cơ chế bên ngoài hoặc bởi chính chiến lược dài hạn của doanh nghiệp.',
          },
          {
            chapter: 5,
            concept: 'Quan hệ lợi ích và vai trò của nhà nước',
            link:
              'Khi một bên giữ 72% thị phần, quan hệ lợi ích không tự cân bằng. Cần khung pháp lý cho phía yếu — hoặc doanh nghiệp tự đặt ra cơ chế đó trước khi bị áp đặt.',
          },
        ],
      },
    ],
    counterQuestion:
      'Khi một nền tảng giữ 72% thị phần, "giá thị trường" còn là giá của thị trường không?',
    reflectionPrompt:
      'Viết 3–5 câu: bạn chọn phương án nào, ai chịu chi phí, và bạn dùng phạm trù nào của MLN122 để giải thích vì sao lựa chọn của bạn không có lợi cho tất cả các bên.',
    hints: [
      'Nếu phí tăng 8% mà khẩu phần giảm 8%, ai thật sự trả tiền?',
      'Quán nhỏ có quyền thương lượng nào không?',
      'Một quyết định đúng về kinh tế có thể sai về an sinh ở chỗ nào?',
    ],
  },
];

export function scenarioById(id) {
  return SCENARIOS.find((item) => item.id === id) || null;
}

export function nextScenario(id) {
  const index = SCENARIOS.findIndex((item) => item.id === id);
  if (index === -1) return null;
  return SCENARIOS[index + 1] || null;
}
