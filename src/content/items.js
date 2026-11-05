// Ba món hàng để bóc giá. Mỗi món có bảy khoản, một khoảng tham chiếu cho từng khoản
// (đơn vị: phần trăm giá bán), bốn mắt trong chuỗi giá trị và ba lựa chọn "cắt 5%".
//
// Toàn bộ con số là ước lượng minh hoạ để dạy cách chia, không phải số liệu công bố của
// doanh nghiệp hay quán nào. Trung điểm các khoảng của mỗi món cộng lại đúng 100%.

export const GROUPS = {
  c: { key: 'c', label: 'c', name: 'Tư liệu sản xuất (c)', note: 'Chỉ chuyển giá trị cũ vào sản phẩm.' },
  v: { key: 'v', label: 'v', name: 'Sức lao động (v)', note: 'Nơi tạo ra giá trị mới.' },
  m: { key: 'm', label: 'm', name: 'Phần thặng dư (m)', note: 'Giá trị dôi ra ngoài chi phí.' },
  ngoai: {
    key: 'ngoai',
    label: 'khác',
    name: 'Khoản nằm ngoài c, v, m của người bán',
    note: 'Thuế, phí, phần của bên thứ ba — trừ trước khi người bán tính phần của mình.',
  },
};

export const ITEMS = [
  {
    id: 'tra-sua',
    code: 'TS-45',
    name: 'Ly trà sữa',
    price: 45000,
    unit: 'ly',
    kicker: 'Quán nhỏ trong ngõ, tự pha, khách chủ yếu mua tại quán.',
    brief:
      'Chủ quán tự đứng bán 9 tiếng mỗi ngày, có một nhân viên pha chế theo ca. Không có thương hiệu, khách quen chủ yếu trong xóm và sinh viên gần đó.',
    buckets: [
      {
        id: 'nguyen-lieu',
        group: 'c',
        label: 'Nguyên liệu, hàng nhập',
        hint: 'trà, sữa, đường, trân châu, ly, ống hút',
        reference: [30, 35],
      },
      {
        id: 'may-moc',
        group: 'c',
        label: 'Máy móc, dụng cụ',
        hint: 'máy lắc, tủ mát, nồi, khấu hao tính theo tháng',
        reference: [3, 5],
      },
      {
        id: 'mat-bang',
        group: 'c',
        label: 'Mặt bằng, điện nước',
        hint: 'thuê quán, điện, nước, đổ rác',
        reference: [14, 18],
      },
      {
        id: 'lao-dong',
        group: 'v',
        label: 'Công người pha chế',
        hint: 'lương theo ca, bảo hiểm nếu có',
        reference: [14, 18],
      },
      {
        id: 'thuong-hieu',
        group: 'm',
        label: 'Biển hiệu, quảng cáo',
        hint: 'in menu, bài đăng, mã giảm giá',
        reference: [2, 4],
      },
      {
        id: 'loi-nhuan',
        group: 'm',
        label: 'Lợi nhuận của chủ quán',
        hint: 'phần còn lại sau khi trả mọi thứ, gồm cả công của chủ',
        reference: [18, 24],
      },
      {
        id: 'phi-khac',
        group: 'ngoai',
        label: 'Thuế, phí',
        hint: 'thuế khoán, phí chuyển khoản, hao hụt',
        reference: [6, 9],
      },
    ],
    chain: [
      {
        actor: 'Nhà cung cấp nguyên liệu',
        takes: 'Nằm trong c',
        note: 'Nhận tiền nguyên liệu trước khi ly trà được bán. Không quan tâm quán lãi hay lỗ.',
      },
      {
        actor: 'Nhân viên pha chế',
        takes: 'Nhận v',
        note: 'Nhận lương theo ca. Ly trà bán chạy hay ế, tiền công hôm đó không đổi.',
      },
      {
        actor: 'Chủ quán',
        takes: 'Nhận m còn lại',
        note: 'Lấy phần dôi ra, nhưng cũng là người duy nhất chịu rủi ro vắng khách, hỏng hàng, tăng giá thuê.',
      },
      {
        actor: 'Nhà nước',
        takes: 'Nhận thuế, phí',
        note: 'Khoản cố định theo doanh thu, không phụ thuộc quán lãi hay lỗ.',
      },
    ],
    cut: [
      {
        bucketId: 'nguyen-lieu',
        title: 'Giảm nguyên liệu',
        consequence:
          'Giảm c thì phần dôi ra tăng ngay, nhưng chất lượng là thứ khách nhận ra nhanh nhất. Đây là cách phổ biến nhất và cũng là cách dễ mất khách nhất.',
      },
      {
        bucketId: 'lao-dong',
        title: 'Giảm công pha chế',
        consequence:
          'Giảm v làm m′ tăng lên vì mẫu số nhỏ đi — đúng công thức, nhưng người chịu là nhân viên, và chất lượng ca làm việc giảm theo.',
      },
      {
        bucketId: 'thuong-hieu',
        title: 'Giảm quảng cáo',
        consequence:
          'Khoản này nhỏ (2–4%), cắt gần như không thấy ngay. Nhưng đây là khoản duy nhất giúp quán có khách mới, nên cái giá xuất hiện sau vài tháng.',
      },
    ],
    concepts: ['hang-hoa', 'chi-phi-san-xuat', 'gia-tri-thang-du', 'ty-suat-thang-du'],
    takeaways: [
      'Trong một ly trà sữa, phần lớn tiền nằm ở c (nguyên liệu, mặt bằng), nhưng phần dôi ra chỉ có thể đến từ giá bán vượt chi phí.',
      'Cắt vào c thì m′ tăng ngay; cắt vào v thì m′ tăng nhanh hơn nhưng người chịu là người làm. Cùng một kết quả kế toán, hai quan hệ khác nhau.',
    ],
    referenceNote:
      'Khoảng tham chiếu là ước lượng minh hoạ cho một quán nhỏ ở đô thị, dựng để dạy cách chia — không phải số liệu của quán nào.',
  },

  {
    id: 'ao-thun',
    code: 'AT-250',
    name: 'Áo thun có thương hiệu',
    price: 250000,
    unit: 'áo',
    kicker: 'May ở xưởng gia công, bán trong trung tâm thương mại.',
    brief:
      'Một chiếc áo cotton cơ bản. Xưởng nhận gia công theo đơn, thương hiệu quyết định thiết kế, giá bán và toàn bộ cách bán hàng.',
    buckets: [
      {
        id: 'nguyen-lieu',
        group: 'c',
        label: 'Vải, chỉ, phụ liệu',
        hint: 'vải cotton, nhãn, bao bì',
        reference: [10, 14],
      },
      {
        id: 'may-moc',
        group: 'c',
        label: 'Xưởng may, khấu hao máy',
        hint: 'máy may, bàn cắt, khấu hao thiết bị',
        reference: [3, 5],
      },
      {
        id: 'mat-bang',
        group: 'c',
        label: 'Cửa hàng, kho, vận chuyển',
        hint: 'thuê mặt bằng trung tâm thương mại, kho, ship',
        reference: [16, 20],
      },
      {
        id: 'lao-dong',
        group: 'v',
        label: 'Công may, đóng gói',
        hint: 'tiền công trả cho người may và người gói hàng',
        reference: [7, 9],
      },
      {
        id: 'thuong-hieu',
        group: 'm',
        label: 'Thương hiệu, thiết kế, marketing',
        hint: 'thiết kế, chụp ảnh, quảng cáo, nhượng quyền',
        reference: [31, 35],
      },
      {
        id: 'loi-nhuan',
        group: 'm',
        label: 'Lợi nhuận của thương hiệu và cửa hàng',
        hint: 'phần còn lại sau khi trừ mọi chi phí',
        reference: [16, 20],
      },
      {
        id: 'phi-khac',
        group: 'ngoai',
        label: 'Thuế, phí, chiết khấu thẻ',
        hint: 'thuế, phí thanh toán, giảm giá cho khách thẻ',
        reference: [6, 8],
      },
    ],
    chain: [
      {
        actor: 'Xưởng gia công',
        takes: 'Nhận c + v của xưởng',
        note: 'Nhận tiền công may theo đơn. Phần thặng dư của xưởng mỏng vì giá gia công do bên đặt hàng quyết.',
      },
      {
        actor: 'Thương hiệu',
        takes: 'Nhận phần lớn m',
        note: 'Không may một chiếc áo nào nhưng nhận phần lớn giá bán, nhờ kiểm soát thiết kế, thương hiệu và kênh bán.',
      },
      {
        actor: 'Cửa hàng, mặt bằng',
        takes: 'Nhận phần c cố định',
        note: 'Tiền thuê là chi phí cố định, thu trước khi biết tháng đó bán được bao nhiêu áo.',
      },
      {
        actor: 'Nhà nước',
        takes: 'Nhận thuế, phí',
        note: 'Tính trên giá bán, nên cũng tăng theo phần thương hiệu thêm vào.',
      },
    ],
    cut: [
      {
        bucketId: 'lao-dong',
        title: 'Ép giá gia công',
        consequence:
          'Cắt vào công may là cách phổ biến nhất để giữ giá bán. Người chịu là xưởng và người may — những người ít quyền thương lượng nhất trong chuỗi.',
      },
      {
        bucketId: 'thuong-hieu',
        title: 'Giảm chi phí thương hiệu',
        consequence:
          'Khoản này lớn nhất trong chiếc áo. Giảm nó thì giá bán phải giảm theo, và chiếc áo trở về đúng giá trị của vải và công may.',
      },
      {
        bucketId: 'loi-nhuan',
        title: 'Giảm lợi nhuận',
        consequence:
          'Cắt vào m là cách duy nhất không ai khác phải chịu, nhưng cũng là cách doanh nghiệp ít chọn nhất khi phải giữ giá.',
      },
    ],
    concepts: ['hang-hoa', 'gia-tri', 'canh-tranh-doc-quyen', 'gia-tri-thang-du'],
    takeaways: [
      'Chiếc áo cho thấy m không nằm ở nơi sản xuất. Nó nằm ở nơi định được giá.',
      'Cùng một sản phẩm, hai con số m′: tính trong xưởng gia công thì thấp, tính cho cả chuỗi thì rất cao. Phải nói rõ đang tính cho ai.',
    ],
    referenceNote:
      'Khoảng tham chiếu dựng theo cấu trúc giá của hàng may mặc có thương hiệu bán qua trung tâm thương mại; đây là ước lượng minh hoạ.',
  },

  {
    id: 'suat-an',
    code: 'SA-35',
    name: 'Suất ăn đặt qua ứng dụng',
    price: 35000,
    unit: 'suất',
    kicker: 'Quán cơm nhỏ bán qua ứng dụng giao đồ ăn.',
    brief:
      'Khách trả 35.000 đồng trên ứng dụng. Quán không tự giao, không tự thu tiền, và trả một tỉ lệ phần trăm doanh thu cho nền tảng.',
    buckets: [
      {
        id: 'nguyen-lieu',
        group: 'c',
        label: 'Nguyên liệu, hộp, túi',
        hint: 'gạo, thức ăn, hộp giấy, túi ni lông',
        reference: [28, 32],
      },
      {
        id: 'may-moc',
        group: 'c',
        label: 'Bếp, dụng cụ',
        hint: 'bếp, nồi, tủ, khấu hao',
        reference: [4, 6],
      },
      {
        id: 'mat-bang',
        group: 'c',
        label: 'Mặt bằng bếp, điện nước',
        hint: 'thuê bếp, điện, gas, nước',
        reference: [7, 9],
      },
      {
        id: 'lao-dong',
        group: 'v',
        label: 'Công nấu, đóng gói',
        hint: 'công người nấu và người gói',
        reference: [11, 13],
      },
      {
        id: 'thuong-hieu',
        group: 'm',
        label: 'Chụp ảnh, quảng cáo trên ứng dụng',
        hint: 'ảnh món, khuyến mại, đẩy hiển thị',
        reference: [1, 3],
      },
      {
        id: 'loi-nhuan',
        group: 'm',
        label: 'Lợi nhuận của quán',
        hint: 'phần còn lại sau khi trừ mọi thứ, gồm cả công của chủ',
        reference: [10, 14],
      },
      {
        id: 'phi-khac',
        group: 'ngoai',
        label: 'Phí nền tảng, giao hàng, thuế',
        hint: 'phần trăm doanh thu trả nền tảng, phí thanh toán, thuế',
        reference: [29, 33],
      },
    ],
    chain: [
      {
        actor: 'Quán ăn',
        takes: 'Nhận m còn lại sau phí',
        note: 'Chịu rủi ro ế ẩm và chi phí nguyên liệu, nhưng không quyết định giá khách thấy.',
      },
      {
        actor: 'Nền tảng',
        takes: 'Nhận phí theo doanh thu',
        note: 'Nhận một tỉ lệ cố định trên mỗi đơn, gần như độc lập với việc quán lãi hay lỗ.',
      },
      {
        actor: 'Tài xế giao hàng',
        takes: 'Nhận phần giao hàng',
        note: 'Thu nhập theo đơn; với nền tảng đây là chi phí biến đổi, với quán là khoản nằm ngoài c và v.',
      },
      {
        actor: 'Khách hàng',
        takes: 'Trả toàn bộ',
        note: 'Trả một giá đã gộp cả phí kênh bán, nên cảm giác "đắt hơn ăn tại quán" là đúng cấu trúc, không phải quán tham.',
      },
    ],
    cut: [
      {
        bucketId: 'nguyen-lieu',
        title: 'Giảm khẩu phần',
        consequence:
          'Cách phổ biến nhất vì khách khó so sánh. Nhưng đây là cắt vào chất lượng, và khách nhận ra sau vài lần đặt.',
      },
      {
        bucketId: 'lao-dong',
        title: 'Giảm công nấu',
        consequence:
          'Giảm v làm m′ tăng nhanh nhất trên giấy. Người chịu là người nấu — bên có ít tiếng nói nhất trong đơn hàng này.',
      },
      {
        bucketId: 'loi-nhuan',
        title: 'Giảm lợi nhuận quán',
        consequence:
          'Không ai khác phải chịu, nhưng với mỏng như suất ăn qua ứng dụng, cắt 5% có thể đẩy quán về hoà vốn.',
      },
    ],
    concepts: ['quan-he-loi-ich', 'canh-tranh-doc-quyen', 'gia-tri-thang-du', 'chi-phi-san-xuat'],
    takeaways: [
      'Suất ăn cho thấy một khoản tiền có thể là v với người này và là doanh thu với người khác — phải nói rõ đang đứng ở vị trí nào.',
      'Người kiểm soát kênh bán nhận phần lớn giá trị dù không tham gia sản xuất. Đó là nội dung kinh tế của "phí nền tảng".',
    ],
    referenceNote:
      'Cấu trúc giá dựng theo mức phí nền tảng phổ biến hiện nay; các con số là ước lượng minh hoạ, không phải số liệu của nền tảng nào.',
  },
];

export function itemById(id) {
  return ITEMS.find((item) => item.id === id) || null;
}

export function nextItem(id) {
  const index = ITEMS.findIndex((item) => item.id === id);
  if (index === -1) return null;
  return ITEMS[index + 1] || null;
}
