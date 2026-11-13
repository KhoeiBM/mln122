/** Impacts and explanations are ordered: vendors, workers, consumers, management resources. */
export type Choice={text:string; impact:[number,number,number,number]; feedback:string; effects:[string,string,string,string]; score:number};
export type Event={title:string; label:string; story:string; topic:string; lesson:string; choices:Choice[]};
export const events:Event[]=[
{
 label:'PHÂN BỔ SẠP',title:'Ai được thuê sạp gần cổng?',
 story:'Chợ Không Tưởng sắp sửa lại khu cổng chính. Một công ty đề nghị đóng góp chi phí sửa chữa nếu được thuê 12 trong 15 sạp ở vị trí đẹp. Các hộ bán lâu năm lo rằng họ sẽ phải chuyển vào sâu trong chợ. Ban quản lý cần quyết định cách phân bổ sạp và tìm nguồn kinh phí.',
 topic:'the-che',lesson:'Hoàn thiện thể chế về tiếp cận nguồn lực, bảo đảm môi trường cạnh tranh minh bạch.',
 choices:[
  {text:'Đồng ý dành 12 sạp cho công ty để nhận tiền sửa chợ, không mở đăng ký cho các hộ khác.',impact:[-15,-4,-8,15],score:3,feedback:'Chợ có tiền sửa nhanh, nhưng phân bổ thiếu công khai khiến nhiều hộ nhỏ mất cơ hội kinh doanh.',effects:['Nhiều hộ khó tiếp cận vị trí bán hàng thuận lợi.','Một số lao động ở các sạp phải chuyển đi có nguy cơ mất việc.','Khách có thể có ít lựa chọn hơn khi một đơn vị chiếm nhiều sạp.','Khoản đóng góp của công ty giúp giảm áp lực chi phí sửa chợ.']},
  {text:'Từ chối khoản tài trợ và giữ cách bố trí hiện tại, chưa triển khai sửa khu cổng.',impact:[5,0,0,-8],score:5,feedback:'Hộ cũ giữ được vị trí, nhưng khu cổng vẫn xuống cấp và chợ bỏ lỡ một nguồn đóng góp có thể được xem xét công khai.',effects:['Các hộ hiện tại tạm thời giữ được sạp.','Việc làm chưa thay đổi đáng kể trong ngắn hạn.','Lựa chọn và giá hàng chưa thay đổi đáng kể.','Chợ vẫn phải tìm ngân sách khác để xử lý khu cổng xuống cấp.']},
  {text:'Công khai điều kiện thuê sạp, lấy ý kiến các hộ và xem xét khoản tài trợ tách biệt với quyền ưu tiên.',impact:[8,3,6,-5],score:10,feedback:'Cách làm tạo cơ hội tiếp cận công bằng hơn và vẫn để ngỏ khả năng hợp tác, nhưng cần thời gian tổ chức đăng ký và đối thoại.',effects:['Các hộ có cơ hội đăng ký theo cùng tiêu chí rõ ràng.','Việc phân bổ công bằng giúp các sạp có điều kiện duy trì việc làm.','Nhiều hộ có cơ hội kinh doanh, giúp khách giữ được lựa chọn.','Ban quản lý phải dành thời gian và kinh phí tổ chức, rà soát hồ sơ.']}
 ]
},
{
 label:'CẠNH TRANH',title:'Hai sạp rau cùng giảm giá',
 story:'Sạp A nhập được rau với giá tốt và bán rẻ hơn sạp B. Chủ sạp B đề nghị ban quản lý buộc sạp A nâng giá, cho rằng mình mất khách. Hiện chưa có bằng chứng sạp A vi phạm quy định; cả hai vẫn niêm yết giá và bán đúng chất lượng.',
 topic:'thi-truong',lesson:'Các chủ thể bình đẳng và cạnh tranh theo pháp luật; giá cả phản ánh tín hiệu thị trường.',
 choices:[
  {text:'Yêu cầu sạp A nâng giá ngay để sạp B không mất khách.',impact:[-8,0,-12,2],score:2,feedback:'Một hộ được bảo vệ trước mắt, nhưng ban quản lý can thiệp thiếu căn cứ và hạn chế cạnh tranh hợp pháp.',effects:['Sạp A mất cơ hội cạnh tranh bằng giá; các hộ khác cũng lo bị áp đặt.','Chưa có tác động trực tiếp rõ rệt đến việc làm trong ngắn hạn.','Khách hàng mất cơ hội mua rau với giá thấp hơn.','Ban quản lý không phải dành nguồn lực xác minh trong ngắn hạn.']},
  {text:'Không tiếp nhận thêm phản ánh, kể cả nếu sau này có bằng chứng về hành vi vi phạm.',impact:[-6,-2,-5,5],score:3,feedback:'Không phải mọi việc giảm giá đều sai, nhưng từ chối xem xét phản ánh về vi phạm khiến chợ thiếu cơ chế bảo vệ các bên.',effects:['Hộ kinh doanh khó được bảo vệ nếu có hành vi cạnh tranh trái quy định.','Kinh doanh bất ổn có thể ảnh hưởng việc làm tại các sạp.','Nếu có vi phạm, người mua có thể chịu hậu quả mà không được phản ánh.','Ban quản lý tiết kiệm công tiếp nhận và kiểm tra trước mắt.']},
  {text:'Cho phép cả hai tự quyết định giá; tiếp nhận phản ánh và phối hợp kiểm tra nếu có dấu hiệu vi phạm.',impact:[5,2,8,-4],score:10,feedback:'Ban quản lý tôn trọng việc cạnh tranh hợp pháp, đồng thời để ngỏ cách xử lý khi có bằng chứng vi phạm.',effects:['Các hộ được cạnh tranh trên cùng quy tắc.','Hoạt động kinh doanh ổn định hơn giúp duy trì việc làm.','Khách có thêm lựa chọn về giá và chất lượng.','Tiếp nhận phản ánh và kiểm tra cần nhân lực quản lý.']}
 ]
},
{
 label:'QUAN HỆ LAO ĐỘNG',title:'Đề nghị giảm tiền công',
 story:'Do doanh thu giảm, một chủ quầy thực phẩm muốn giảm tiền công của ba nhân viên từ tháng tới. Nhân viên cho biết mức mới không đủ chi tiêu và đề nghị được trao đổi. Ban quản lý không thể tự quyết định lương thay hai bên nhưng có thể hỗ trợ đối thoại và hướng dẫn tìm cơ quan có thẩm quyền.',
 topic:'loi-ich',lesson:'Quan hệ lợi ích giữa người lao động và người sử dụng lao động có cả thống nhất lẫn mâu thuẫn.',
 choices:[
  {text:'Ủng hộ chủ quầy tự giảm tiền công ngay, không cần trao đổi với nhân viên.',impact:[5,-16,-2,2],score:2,feedback:'Chủ quầy giảm chi phí trước mắt, nhưng bỏ qua thỏa thuận và quyền lợi của nhân viên có thể khiến tranh chấp nghiêm trọng hơn.',effects:['Chủ quầy tiết kiệm chi phí nhân công trước mắt.','Nhân viên bị giảm thu nhập và không được tham gia đối thoại.','Tranh chấp có thể làm phục vụ khách bị gián đoạn.','Ban quản lý không phải tổ chức cuộc gặp trong ngắn hạn.']},
  {text:'Yêu cầu chủ quầy tăng lương ngay mà không tìm hiểu hợp đồng hay khả năng chi trả.',impact:[-10,8,0,-2],score:4,feedback:'Mong muốn bảo vệ nhân viên là chính đáng, nhưng áp đặt mức lương ngoài thẩm quyền và thiếu thông tin có thể làm quầy khó duy trì hoạt động.',effects:['Chi phí tăng đột ngột có thể gây khó khăn cho chủ quầy.','Nhân viên có thể được đề xuất mức thu nhập cao hơn trước mắt.','Giá và dịch vụ chưa thay đổi rõ rệt ngay sau quyết định.','Ban quản lý tốn công can thiệp nhưng chưa giải quyết được căn cứ tranh chấp.']},
  {text:'Mời hai bên trao đổi về doanh thu, hợp đồng và phương án trả công; hướng dẫn liên hệ cơ quan có thẩm quyền nếu cần.',impact:[3,8,2,-5],score:10,feedback:'Đối thoại giúp hai bên tìm phương án có thể thực hiện và chú ý đến quyền lợi hợp pháp; kết quả cụ thể vẫn phụ thuộc vào thỏa thuận và quy định.',effects:['Chủ quầy được trình bày khó khăn và cùng tìm phương án duy trì kinh doanh.','Nhân viên có tiếng nói và được hướng dẫn bảo vệ quyền lợi.','Một thỏa thuận ổn định giúp hạn chế gián đoạn phục vụ.','Ban quản lý cần thời gian tổ chức và hỗ trợ đối thoại.']}
 ]
},
{
 label:'LỢI ÍCH NHÓM',title:'Nguồn hàng cùng tăng giá',
 story:'Ba nhà cung cấp trứng lớn đồng loạt báo giá cao và ngừng giao cho những sạp mua từ nguồn khác. Một số tiểu thương nghi ngờ họ thỏa thuận hạn chế cạnh tranh, nhưng ban quản lý chưa có đủ bằng chứng để kết luận.',
 topic:'loi-ich',lesson:'Lợi ích nhóm không mặc nhiên tiêu cực; hành vi hạn chế cạnh tranh có dấu hiệu vi phạm cần được kiểm tra đúng thẩm quyền.',
 choices:[
  {text:'Bỏ qua phản ánh vì ba nhà cung cấp đang đóng góp nhiều cho hoạt động của chợ.',impact:[-10,-3,-16,8],score:1,feedback:'Nguồn đóng góp có thể được giữ trước mắt, nhưng bỏ qua phản ánh khiến rủi ro đối với sạp nhỏ và khách hàng không được xem xét.',effects:['Các sạp nhỏ có thể phải mua đầu vào đắt hơn hoặc khó tìm nguồn hàng.','Sạp kinh doanh khó khăn có thể giảm giờ làm của nhân viên.','Giá trứng bán lẻ có thể tăng và lựa chọn giảm.','Chợ giữ được khoản đóng góp và tiết kiệm công tiếp nhận trước mắt.']},
  {text:'Tuyên bố mọi hiệp hội cung cấp hàng đều vi phạm và từ chối làm việc với họ.',impact:[-7,-2,-2,-3],score:3,feedback:'Đánh đồng liên kết hợp pháp với hành vi vi phạm khi chưa có bằng chứng có thể làm gián đoạn nguồn hàng và quan hệ hợp tác.',effects:['Các hộ có thể mất những nguồn cung hợp tác chính đáng.','Gián đoạn giao hàng có thể ảnh hưởng giờ làm tại sạp.','Nguồn hàng thiếu ổn định có thể làm khách khó mua.','Ban quản lý phải xử lý khiếu nại phát sinh từ quyết định thiếu căn cứ.']},
  {text:'Ghi nhận chứng cứ, lắng nghe các bên và chuyển phản ánh đến cơ quan cạnh tranh có thẩm quyền khi phù hợp.',impact:[6,2,8,-6],score:10,feedback:'Thu thập thông tin và chuyển đúng cơ quan giúp làm rõ vụ việc mà không vội kết luận các bên vi phạm.',effects:['Các hộ có kênh phản ánh và cơ hội bảo vệ nguồn cung hợp pháp.','Nguồn cung cạnh tranh hơn có thể giúp các sạp duy trì việc làm.','Người mua được bảo vệ tốt hơn nếu dấu hiệu vi phạm được làm rõ.','Tiếp nhận hồ sơ và phối hợp xác minh cần thêm thời gian, nhân lực.']}
 ]
},
{
 label:'AN TOÀN HÀNG HÓA',title:'Lô gia vị chưa rõ nguồn gốc',
 story:'Một khách hàng phản ánh gia vị tại quầy thực phẩm không có nhãn và chứng từ đi kèm. Chủ quầy nói đã mua từ người quen và xin tiếp tục bán trong lúc tìm giấy tờ. Những quầy khác lo vụ việc ảnh hưởng uy tín chung của chợ.',
 topic:'the-che',lesson:'Thực thi quy tắc minh bạch, bảo vệ lợi ích hợp pháp và phối hợp ngăn chặn hoạt động phi pháp.',
 choices:[
  {text:'Để quầy tiếp tục bán, không yêu cầu kiểm tra vì chưa ai báo bị ngộ độc.',impact:[2,0,-15,4],score:1,feedback:'Quầy giữ được doanh thu trước mắt, nhưng chưa có sự cố không đồng nghĩa hàng hóa đã an toàn.',effects:['Chủ quầy tạm thời không bị gián đoạn bán hàng.','Giờ làm tại quầy chưa thay đổi ngay.','Người mua vẫn có nguy cơ sử dụng hàng chưa rõ nguồn gốc.','Ban quản lý chưa phải dành nguồn lực kiểm tra.']},
  {text:'Yêu cầu tất cả quầy trong chợ ngừng bán cả ngày dù phản ánh chỉ liên quan một lô hàng.',impact:[-13,-10,2,-8],score:3,feedback:'Biện pháp bao trùm có thể tạm giảm rủi ro tiếp xúc, nhưng gây gián đoạn lớn cho các quầy không liên quan.',effects:['Các hộ không liên quan cũng mất doanh thu cả ngày.','Nhân viên các quầy có thể mất ca làm hoặc thu nhập.','Khách tạm tránh được lô hàng nghi vấn nhưng không mua được hàng khác tại chợ.','Việc đóng chợ và xử lý phản ứng của các hộ tốn nhiều nguồn lực.']},
  {text:'Yêu cầu quầy tạm ngừng bán riêng lô nghi vấn, ghi nhận thông tin và phối hợp cơ quan chức năng kiểm tra.',impact:[2,1,10,-5],score:10,feedback:'Khoanh vùng lô hàng giúp hạn chế rủi ro mà không ngừng toàn bộ hoạt động; kết luận vi phạm cần chờ kiểm tra.',effects:['Các quầy tuân thủ vẫn hoạt động và được bảo vệ uy tín.','Phần lớn việc làm tiếp tục; môi trường làm việc có thể an toàn hơn.','Khách được giảm tiếp xúc với hàng chưa rõ nguồn gốc.','Ghi nhận thông tin và phối hợp kiểm tra cần nhân lực.']}
 ]
},
{
 label:'MÔI TRƯỜNG',title:'Rác sau buổi chợ',
 story:'Sau mỗi buổi chiều, rau hỏng và nước thải tồn đọng ở lối đi chung. Tổ vệ sinh cho biết lịch thu gom hiện tại không đủ; một số hộ ngại tăng phí vì doanh thu đang thấp. Ban quản lý phải tìm cách cải thiện vệ sinh mà các hộ có thể thực hiện.',
 topic:'the-che',lesson:'Gắn hoạt động kinh tế với bảo vệ môi trường và lợi ích cộng đồng.',
 choices:[
  {text:'Giữ nguyên lịch thu gom, không bổ sung biện pháp để tránh phát sinh chi phí.',impact:[2,-4,-12,5],score:1,feedback:'Các hộ và ban quản lý tránh thêm chi phí trước mắt, nhưng môi trường chợ tiếp tục xuống cấp.',effects:['Các hộ chưa phải trả thêm chi phí thu gom.','Nhân viên tiếp tục làm việc trong môi trường kém vệ sinh.','Khách gặp mùi hôi và rủi ro vệ sinh khi mua hàng.','Ban quản lý chưa phải chi thêm cho thu gom.']},
  {text:'Thu tiền phạt từ mọi hộ ngay lập tức mà chưa công bố quy tắc hay xác minh trách nhiệm.',impact:[-10,-3,2,2],score:3,feedback:'Việc nhắc nhở có thể khiến một số người chú ý vệ sinh hơn, nhưng phạt đồng loạt thiếu căn cứ không giải quyết rõ trách nhiệm.',effects:['Các hộ, kể cả hộ tuân thủ, chịu chi phí không minh bạch.','Căng thẳng tại các sạp có thể ảnh hưởng môi trường làm việc.','Một số hộ có thể dọn dẹp ngay, giúp lối đi sạch hơn phần nào.','Giả định khoản thu tạm giúp bù chi phí, dù xử lý thiếu công bằng có thể gây khiếu nại.']},
  {text:'Trao đổi với các hộ và tổ vệ sinh, công khai phương án phân loại, lịch thu gom và mức phí dự kiến.',impact:[3,5,8,-6],score:10,feedback:'Giải pháp có chi phí và cần sự tham gia của các hộ, nhưng làm rõ trách nhiệm và giúp cải thiện vệ sinh lâu dài.',effects:['Các hộ được tham gia xây dựng phương án và hưởng lợi từ chợ sạch hơn.','Nhân viên làm việc trong môi trường vệ sinh hơn.','Khách có lối đi sạch và an tâm hơn khi mua hàng.','Thêm lượt thu gom và tổ chức giám sát cần kinh phí, nhân lực.']}
 ]
},
{
 label:'BIẾN CỐ NGUỒN CUNG',title:'Mưa lớn, rau về ít',
 story:'Mưa lớn làm đường từ vùng trồng rau bị ngập. Lượng hàng giao cho chợ giảm trong hai ngày, chi phí vận chuyển tăng và một số giá bán tăng theo. Người mua phản ánh giá cao; người bán cho biết họ cũng phải trả thêm tiền nhập hàng.',
 topic:'loi-ich',lesson:'Quan hệ lợi ích thay đổi theo điều kiện sản xuất, nguồn cung và thị trường; cần tôn trọng lợi ích hợp pháp của các bên.',
 choices:[
  {text:'Yêu cầu mọi sạp bán rau thấp hơn giá nhập mà không xem xét chi phí.',impact:[-13,-4,5,0],score:3,feedback:'Giá thấp có thể giúp một số khách mua được hàng ngắn hạn, nhưng yêu cầu thiếu căn cứ có thể khiến sạp thua lỗ và ngừng bán.',effects:['Các hộ có nguy cơ bán lỗ vì giá thấp hơn chi phí nhập.','Sạp thua lỗ có thể giảm giờ làm của nhân viên.','Một số khách mua được rau rẻ hơn trong lúc còn hàng.','Giả định không có khoản chi quản lý mới ngay tại thời điểm này.']},
  {text:'Không cung cấp thông tin về nguồn hàng và từ chối tiếp nhận phản ánh về giá.',impact:[-5,-2,-12,4],score:2,feedback:'Ít tốn công trước mắt nhưng thiếu thông tin và kênh phản ánh làm các bên khó thích ứng với biến cố.',effects:['Các hộ khó tìm nguồn cung thay thế hoặc giải thích biến động giá.','Việc làm tại sạp có thể bị ảnh hưởng nếu hàng về không đều.','Khách khó so sánh thông tin và phản ánh dấu hiệu bất thường.','Ban quản lý tiết kiệm thời gian cập nhật và tiếp nhận phản ánh.']},
  {text:'Cập nhật tình hình nguồn cung, kết nối thêm đầu mối và tiếp nhận phản ánh để chuyển cơ quan có thẩm quyền khi cần.',impact:[6,3,8,-6],score:10,feedback:'Thông tin rõ ràng và nguồn hàng thay thế có thể giảm áp lực cho cả người mua lẫn người bán, dù không bảo đảm giá giảm ngay.',effects:['Các hộ có thêm thông tin và khả năng tiếp cận nguồn hàng.','Nguồn cung ổn định hơn giúp duy trì giờ làm.','Khách dễ so sánh và có thêm cơ hội mua hàng.','Tìm đầu mối, cập nhật thông tin và tiếp nhận phản ánh cần nguồn lực.']}
 ]
},
{
 label:'ĐỐI THOẠI & PHÂN PHỐI',title:'Phí chợ được dùng thế nào?',
 story:'Chi phí điện chiếu sáng và thu gom rác tăng. Ban quản lý dự kiến điều chỉnh phí dịch vụ để duy trì hoạt động, nhưng nhiều hộ muốn biết khoản thu hiện được dùng vào việc gì và đề nghị có thời gian góp ý trước khi thay đổi.',
 topic:'loi-ich',lesson:'Điều hòa lợi ích cần công khai thông tin, tham gia của các bên và cân nhắc lợi ích chung.',
 choices:[
  {text:'Tăng phí đồng loạt từ ngày mai mà không công khai chi phí hay lấy ý kiến.',impact:[-12,-4,-5,12],score:2,feedback:'Khoản thu có thể tăng nhanh nhưng các hộ không có cơ hội kiểm tra hoặc góp ý, làm giảm niềm tin vào quản lý.',effects:['Các hộ phải chịu phí cao hơn mà chưa biết căn cứ tính.','Sạp có thể cắt giờ làm để bù chi phí tăng.','Khách có thể chịu giá bán cao hơn nếu sạp chuyển chi phí vào giá.','Khoản thu dự kiến tăng giúp chợ có thêm nguồn chi ngắn hạn.']},
  {text:'Bỏ toàn bộ phí dịch vụ ngay mà chưa xác định nguồn thay thế để trả tiền điện và thu gom.',impact:[8,2,3,-15],score:4,feedback:'Các hộ bớt chi phí trước mắt, nhưng chợ có thể thiếu tiền duy trì những dịch vụ chung.',effects:['Các hộ được giảm chi phí dịch vụ ngay.','Chi phí thấp hơn có thể giúp các sạp tạm duy trì giờ làm.','Chi phí bán hàng giảm có thể giúp giá bán bớt áp lực tăng.','Mất nguồn thu trong khi vẫn phải trả chi phí vận hành.']},
  {text:'Công khai thu chi, giải thích nhu cầu điều chỉnh, lấy ý kiến các hộ rồi đề xuất phương án phí phù hợp.',impact:[6,4,6,-4],score:10,feedback:'Minh bạch và tham vấn giúp các bên hiểu chi phí chung và cân nhắc khả năng đóng góp; việc thống nhất phương án cần thêm thời gian.',effects:['Các hộ có thông tin và cơ hội góp ý về mức phí.','Dịch vụ chung ổn định giúp môi trường làm việc tốt hơn.','Khách hưởng lợi khi vệ sinh và chiếu sáng được duy trì.','Công khai số liệu và tổ chức lấy ý kiến cần thời gian, nhân lực.']}
 ]
}
];
