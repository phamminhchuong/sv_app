import React, { createContext, useContext, useState, useEffect } from 'react';

const CharityContext = createContext();

const initialCampaigns = [
  {
    id: 'camp-1',
    title: 'Góp Sách Lên Vùng Cao - Ươm Mầm Trí Tuệ Trẻ Em Hà Giang',
    shortDescription: 'Chương trình quyên góp sách vở, xây dựng tủ sách yêu thương cho các em học sinh tiểu học tại vùng cao Đồng Văn, Hà Giang.',
    description: 'Nhiều trẻ em nghèo miền núi Hà Giang vẫn chưa có đủ sách giáo khoa và đồ dùng học tập thiết thực để đến trường. Dự án này hướng đến quyên góp kinh phí mua mới 1,500 bộ sách giáo khoa, 2,000 cuốn vở viết, các đồ dùng học tập cơ bản, đồng thời cải tạo và set up 5 thư viện trường học thân thiện cho trẻ em tại huyện Đồng Văn.',
    targetAmount: 180000000,
    currentAmount: 125500000,
    startDate: '2026-05-01',
    endDate: '2026-06-30',
    category: 'Giáo dục',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
    featured: true,
    donorsCount: 248,
    story: 'Hà Giang, miền biên viễn xa xôi của Tổ quốc, nơi có những dãy núi đá tai mèo trùng điệp và mây mù bao phủ quanh năm. Đời sống của bà con đồng bào nơi đây còn muôn vàn khó khăn, cơm ăn áo mặc hàng ngày vẫn còn là một trăn trở lớn. Đối với các em nhỏ, con chữ và những trang sách thơm mùi giấy mới thực sự là một giấc mơ xa vời.\n\nNhiều trường học ở xã Lũng Cú, Sủng Là vẫn còn trang thiết bị nghèo nàn. Sách giáo khoa thường là sách cũ truyền tay từ nhiều khoá học trước, rách nát và thiếu trang. Việc có một thư viện với những đầu sách truyện thiếu nhi, sách khoa học đời sống hay truyện cổ tích thực sự là điều các em chưa bao giờ nghĩ tới.\n\nDự án "Góp Sách Lên Vùng Cao" được khởi xướng với mục tiêu thu hẹp khoảng cách tri thức. Chúng tôi tin rằng, giáo dục là con đường ngắn nhất và bền vững nhất để giúp các em thoát nghèo. Với nguồn kinh phí đóng góp, ban tổ chức sẽ trực tiếp mua sách chuẩn từ các nhà xuất bản, thuê xe vận chuyển trực tiếp đến các điểm trường và phối hợp cùng thầy cô bản địa xây dựng tủ sách trực quan, hoạt động ổn định trọn đời.'
  },
  {
    id: 'camp-2',
    title: 'Nước Sạch Cho Đồng Bào Miền Tây Xâm Nhập Mặn',
    shortDescription: 'Lắp đặt 10 hệ thống máy lọc nước RO công nghiệp công suất lớn cho bà con vùng hạn mặn tại Bến Tre và Tiền Giang.',
    description: 'Hạn mặn khốc liệt kéo dài khiến hàng ngàn hộ gia đình miền Tây Nam Bộ không có nước ngọt sinh hoạt. Dự án lắp đặt trạm lọc nước miễn phí cho cộng đồng giúp cung cấp dòng nước mát lành, bảo vệ sức khoẻ người dân.',
    targetAmount: 350000000,
    currentAmount: 220100000,
    startDate: '2026-04-15',
    endDate: '2026-07-15',
    category: 'Môi trường',
    image: 'https://images.unsplash.com/photo-1541944743257-944760bf00e5?auto=format&fit=crop&q=80&w=800',
    featured: true,
    donorsCount: 412,
    story: 'Hàng năm vào mùa khô, đồng bằng sông Cửu Long, đặc biệt là các tỉnh như Bến Tre, Tiền Giang, Sóc Trăng lại phải gồng mình chống chịu với thiên tai xâm nhập mặn nghiêm trọng. Các kênh rạch cạn trơ đáy, nước sông nhiễm mặn vượt ngưỡng cho phép nhiều lần, không thể dùng cho ăn uống hay sinh hoạt cơ bản.\n\nNgười dân nghèo phải bấm bụng mua từng xe nước ngọt với giá đắt đỏ từ 100.000đ đến 200.000đ mỗi khối. Gánh nặng kinh tế chồng chất lên bờ vai những nông dân quanh năm chỉ biết bám vào mảnh ruộng vườn dừa nay cũng đang chết héo vì hạn mặn.\n\nDự án "Nước Sạch Cho Đồng Bào Miền Tây" phối hợp triển khai lắp đặt hệ thống lọc nước RO bán công nghiệp tại các UBND xã hoặc nhà văn hoá thôn. Mỗi hệ thống công suất 500-1000L/h có thể phục vụ nước uống trực tiếp miễn phí cho khoảng 400 - 500 hộ gia đình xung quanh. Mọi khoản chi phí từ khảo sát, mua sắm vật tư, lắp đặt và bảo dưỡng định kỳ trong năm đầu tiên sẽ được cam kết chi trả minh bạch.'
  },
  {
    id: 'camp-3',
    title: 'Mái Ấm Tình Thương - Xây Nhà Tình Nghĩa Cho Cụ Già Nêu Đơn',
    shortDescription: 'Xây dựng mới 3 căn nhà tình nghĩa kiên cố cho 3 hoàn cảnh cụ già neo đơn, mất sức lao động tại Quảng Nam.',
    description: 'Giúp đỡ các cụ già neo đơn, không nơi nương tựa có một mái nhà ấm áp, kiên cố, không còn lo ngại những ngày bão lũ khắc nghiệt ở miền Trung.',
    targetAmount: 210000000,
    currentAmount: 210000000, // Completed campaign
    startDate: '2026-03-01',
    endDate: '2026-05-15',
    category: 'Hoàn cảnh khó khăn',
    image: 'https://images.unsplash.com/photo-1516880711640-ef7db81be3e1?auto=format&fit=crop&q=80&w=800',
    featured: false,
    donorsCount: 389,
    story: 'Miền Trung - khúc ruột đau thương luôn hứng chịu nhiều thiên tai của cả nước. Tại những vùng quê nghèo ở Quảng Nam, còn đó những cụ già đã bước sang tuổi xế chiều, sức cùng lực kiệt nhưng lại chịu cảnh cô đơn không gia đình, sống trong những căn nhà tranh tạm bợ, dột nát tồi tàn mấp mé sụp đổ.\n\nMỗi mùa mưa bão về, các cụ lại phải sống trong nỗi sợ hãi tột cùng. Sức khoẻ yếu ớt không cho phép các cụ chạy lụt hay tự gia cố nhà cửa. Việc ăn uống hàng ngày chỉ trông chờ vào vài đồng trợ cấp ít ỏi và sự đùm bọc của chòm xóm.\n\nDự án đã gây quỹ thành công số tiền 210,000,000 VND để xây dựng 3 ngôi nhà cấp 4 kiên cố bằng bê tông cốt thép, lợp mái tôn chống nóng, có gác lửng tránh lũ. Quá trình chọn lọc đối tượng được phối hợp chặt chẽ với Mặt trận Tổ quốc địa phương để đảm bảo đúng người, đúng hoàn cảnh. Hiện tại các ngôi nhà đang trong giai đoạn hoàn thiện những khâu cuối cùng để bàn giao trước mùa bão lũ năm nay.'
  },
  {
    id: 'camp-4',
    title: 'Trái Tim Cho Em - Tài Trợ Mổ Tim Nhân Đạo Cho Trẻ Em Nghèo',
    shortDescription: 'Hỗ trợ chi phí phẫu thuật tim bẩm sinh cho các bệnh nhi nghèo dưới 16 tuổi có hoàn cảnh đặc biệt khó khăn.',
    description: 'Cứu sống những cuộc đời non trẻ đang mang trong mình những dị tật tim bẩm sinh nhưng gia đình lại quá nghèo, không thể gánh vác nổi chi phí phẫu thuật đắt đỏ lên tới hàng trăm triệu đồng.',
    targetAmount: 500000000,
    currentAmount: 312000000,
    startDate: '2026-05-10',
    endDate: '2026-08-31',
    category: 'Y tế',
    image: 'https://images.unsplash.com/photo-1532938911079-009b027edd13?auto=format&fit=crop&q=80&w=800',
    featured: true,
    donorsCount: 520,
    story: 'Mỗi năm ở Việt Nam có hàng ngàn đứa trẻ sinh ra mắc bệnh tim bẩm sinh. Một ca phẫu thuật kịp thời có thể giúp các em khoẻ mạnh bình thường, được chạy nhảy và đến trường như bao bạn bè đồng trang lứa. Tuy nhiên, với gia đình làm nông, làm thuê kiếm ăn từng bữa, số tiền 50 đến 100 triệu đồng đồng chi trả bảo hiểm y tế còn lại thực sự là một con số không tưởng.\n\nNhìn con yêu yếu ớt, thở dốc sau mỗi bước đi hay tím tái đôi môi mỗi lần cười khóc, cha mẹ chỉ biết gạt nước mắt bất lực bán đi tất cả những gì có thể nhưng vẫn không gom đủ tiền phẫu thuật.\n\n"Trái Tim Cho Em" liên kết trực tiếp với các bệnh viện tim đầu ngành tại Hà Nội và TP.HCM để xác minh hồ sơ bệnh án và hỗ trợ 100% phần chi phí gia đình phải tự chi trả. Chúng tôi cam kết hành động khẩn trương vì thời gian của các em là vô cùng quý giá. Từng khoản tiền đóng góp sẽ thắp sáng lên hy vọng sống cho một mầm non tương lai.'
  }
];

const initialEvents = [
  {
    id: 'evt-1',
    title: 'Chương Trình Hiến Máu Nhân Đạo: Giọt Hồng Sẻ Chia',
    description: 'Tham gia hiến máu nhân đạo kết hợp với Viện Huyết học - Truyền máu Trung ương để bổ sung nguồn máu dự trữ cho các bệnh nhân đang cấp cứu điều trị dịp hè.',
    date: '2026-06-15',
    time: '07:30 - 11:30',
    location: 'Cung Trí thức Thành phố, 80 Trần Thái Tông, Cầu Giấy, Hà Nội',
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=800',
    status: 'upcoming',
    volunteersRegistered: 2,
    maxVolunteers: 150,
    registeredEmails: ['hoangnam@gmail.com', 'thuyduong.neu@gmail.com'],
    registeredVolunteers: [
      { id: 'v-101', name: 'Hoàng Văn Nam', email: 'hoangnam@gmail.com', phone: '0912123456', status: 'confirmed', paymentStatus: 'free', notes: 'Nhóm trưởng hiến máu, phụ trách đón tiếp khách', signupDate: '2026-05-30' },
      { id: 'v-102', name: 'Đặng Thùy Dương', email: 'thuyduong.neu@gmail.com', phone: '0987654321', status: 'confirmed', paymentStatus: 'paid', notes: 'Đã đóng 100K mua áo thun sự kiện, cam kết đúng giờ', signupDate: '2026-05-31' }
    ],
    organizer: 'Hội Chữ Thập Đỏ Trái Tim Vàng phối hợp cùng Viện Huyết Học'
  },
  {
    id: 'evt-2',
    title: 'Chiến Dịch Xanh: Làm Sạch Bãi Biển Cần Giờ 2026',
    description: 'Chung tay nhặt rác thải nhựa, làm sạch bờ biển Cần Giờ, đồng thời tuyên truyền nâng cao ý thức bảo vệ môi trường biển cho người dân địa phương và du khách.',
    date: '2026-06-21',
    time: '06:00 - 17:00 (Hỗ trợ xe đưa đón từ Trung tâm TP.HCM)',
    location: 'Bờ biển 30/4, Huyện Cần Giờ, TP. Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=800',
    status: 'upcoming',
    volunteersRegistered: 3,
    maxVolunteers: 100,
    registeredEmails: ['minhtrung@gmail.com', 'lananh99@gmail.com', 'quocbao@outlook.com'],
    registeredVolunteers: [
      { id: 'v-201', name: 'Lê Minh Trung', email: 'minhtrung@gmail.com', phone: '0901234567', status: 'pending', paymentStatus: 'unpaid', notes: 'Chờ lên xe trung chuyển lúc 06:15 sáng', signupDate: '2026-05-29' },
      { id: 'v-202', name: 'Nguyễn Lại Lân Anh', email: 'lananh99@gmail.com', phone: '0934567890', status: 'confirmed', paymentStatus: 'unpaid', notes: 'Đi tự túc bằng xe máy, chắc chắn có mặt đúng giờ', signupDate: '2026-05-30' },
      { id: 'v-203', name: 'Trương Quốc Bảo', email: 'quocbao@outlook.com', phone: '0978111222', status: 'confirmed', paymentStatus: 'paid', notes: 'Đã hoàn tất đóng 150K phí cơm trưa, đi xe bus đoàn', signupDate: '2026-05-31' }
    ],
    organizer: 'Nhóm Tình Nguyện Viên Xanh Sài Gòn'
  },
  {
    id: 'evt-3',
    title: 'Phát Cháo Từ Thiện Tại Bệnh Viện K - Tân Triều',
    description: 'Chuẩn bị và phát 500 suất cháo dinh dưỡng nóng hổi miễn phí tận tay cho các bệnh nhân ung thư và người nhà bệnh nhân có hoàn cảnh khó khăn.',
    date: '2026-05-25',
    time: '05:30 - 08:30',
    location: 'Bệnh viện K cơ sở 3, Tân Triều, Thanh Trì, Hà Nội',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800',
    status: 'completed',
    volunteersRegistered: 2,
    maxVolunteers: 30,
    registeredEmails: ['ngocha.ftu@gmail.com', 'dungtien@yahoo.com'],
    registeredVolunteers: [
      { id: 'v-301', name: 'Phùng Ngọc Hà', email: 'ngocha.ftu@gmail.com', phone: '0943332211', status: 'completed', paymentStatus: 'free', notes: 'Phụ sơ chế chuẩn bị cháo dinh dưỡng, dọn dẹp điểm đóng', signupDate: '2026-05-24' },
      { id: 'v-302', name: 'Bùi Dũng Tiến', email: 'dungtien@yahoo.com', phone: '0988665544', status: 'completed', paymentStatus: 'free', notes: 'Vác đồ kéo, hỗ trợ chia suất cháo đến từng phòng', signupDate: '2026-05-24' }
    ],
    organizer: 'Bếp Cơm Thiện Tâm'
  }
];

const initialArticles = [
  {
    id: 'art-1',
    title: 'Hành Trình Mang Hơi Ấm Lên Đỉnh Mẫu Sơn Giữa Mùa Đông Lạnh Giá',
    shortContent: 'Câu chuyện đầy cảm xúc về chuyến xe chở hơn 1 tấn quần áo ấm và chăn bông đã cán đích thành công tại các điểm trường mầm non Mẫu Sơn, Lạng Sơn.',
    content: 'Vào những ngày cuối tháng 12 khi đợt không khí lạnh kỷ lục tràn về, nhiệt độ tại Mẫu Sơn giảm xuống dưới 0 độ C, xuất hiện băng giá bao phủ. Trong khi chúng ta quây quần quanh lò sưởi, khoác lên mình những chiếc áo phao đắt tiền thì trẻ em mầm non và tiểu học tại đây chỉ có độc một tấm áo mỏng manh, chân trần tím tái vì lạnh cắt da cắt thịt.\n\nNhóm thiện nguyện Trái Tim Vàng đã lên kế hoạch thần tốc trong 5 ngày, kết nối và vận động quyên góp được 400 chiếc áo khoác gió 3 lớp chống thấm, 500 đôi ủng nhựa cao su, 300 chiếc chăn lông cừu ấm áp cùng hàng trăm suất bánh kẹo, sữa tươi.\n\nHành trình leo dốc quanh co đầy sương mù, đường trơn trượt vô cùng hiểm trở nhưng cuối cùng đoàn xe cứu trợ đã tiếp cận thành công 3 điểm trường lẻ biệt lập nhất. Nhìn nụ cười hồn nhiên, đôi má ửng hồng đầy hạnh phúc của các em nhỏ khi được mặc áo mới ấm áp, mọi mệt mỏi của các tình nguyện viên như tan biến sạch. Đó là sức mạnh của sự sẻ chia, là động lực để những chuyến xe tình thương tiếp tục lăn bánh.',
    author: 'Trần Minh Quân',
    publishDate: '2026-05-18',
    category: 'Câu chuyện thành công',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800',
    views: 1240
  },
  {
    id: 'art-2',
    title: 'Cách Kiểm Tra Và Giám Sát Tính Minh Bạch Khi Quyên Góp Từ Thiện',
    shortContent: 'Hướng dẫn chi tiết cách nhà hảo tâm có thể tra cứu sao kê dòng tiền, tiến độ dự án và tham tra đóng góp ý kiến cho các chiến dịch thiện nguyện.',
    content: 'Niềm tin chính là xương sống của mọi hoạt động thiện nguyện xã hội. Tại Trái Tim Vàng, chúng tôi đặt sự minh bạch lên vị trí tối thượng hàng đầu. Để đảm bảo mọi đóng góp đều đi đúng hướng và phát huy hết hiệu quả tốt nhất, chúng tôi áp dụng quy trình kiểm soát 3 lớp:\n\n1. Công khai sao kê tự động: Cập nhật dòng tiền quyên góp theo thời gian thực (Real-time tracking). Mỗi giao dịch chuyển khoản thành công của bạn đều được hệ thống ghi nhận, gán ID giao dịch công khai hiển thị ngay trên bảng tin danh sách nhà hảo tâm tại chiến dịch đó.\n\n2. Cập nhật tiến độ dự án bằng hình ảnh/video: Mỗi cột mốc quan trọng (mua sắm trang bị, động thổ khởi công, nghiệm thu bàn giao) đều phải có báo cáo tiến trình kèm hoá đơn đỏ từ đơn vị phân phối uy tín và xác nhận đóng dấu đỏ từ chính quyền xã bản địa.\n\n3. Hậu kiểm định độc lập: Các số liệu quyết toán tài chính cuối dự án luôn mở cho mọi bên đối tác và thành viên cộng đồng có thể chất vấn, kiểm tra chéo tại văn phòng hoặc thông qua đại diện kiểm toán tình nguyện.',
    author: 'Phạm Thuỳ Linh (Trưởng ban Minh Bạch)',
    publishDate: '2026-05-24',
    category: 'Cẩm nang chia sẻ',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    views: 890
  },
  {
    id: 'art-3',
    title: 'Gặp Gỡ Những Tình Nguyện Viên Thầm Lặng Đằng Sau Bếp Ăn 0 Đồng',
    shortContent: 'Họ là những người dậy từ 3 giờ sáng để đi chợ, nhặt rau, nấu cơm, mang lại hàng trăm suất ăn nóng hổi tiếp sức cho thân nhân người bệnh hiểm nghèo.',
    content: 'Đều đặn thứ 3 và thứ 5 hàng tuần, góc nhỏ trước cổng bệnh viện lại rộn ràng tiếng nói cười ấm áp và thơm phức mùi thức ăn chín từ bếp ăn Trái Tim Vàng. Ít ai biết rằng, để chuẩn bị xong 300-500 suất cơm xá xíu, canh sườn bổ dưỡng phát đúng giờ trưa, một đội ngũ gần 15 thành viên cốt cán đã phải làm việc cật lực từ lúc gà chưa gáy sáng.\n\nHọ có thể là một bác cán bộ về hưu, một bạn sinh viên tranh thủ thời gian nghỉ, hay một người mẹ bận rộn chăm lo gia đình. Không cần thù lao danh tiếng, họ thầm lặng góp sức, người góp công, người mang bao gạo, người chở thùng nước sạch. "Khi thấy người bệnh ung thư xa quê, gầy gò ốm yếu cầm trên tay chiếc khay cơm đầy ắp cơm nóng sốt và nở nụ cười, tôi cảm nhận thấy mọi cực nhọc thức khuya dậy sớm đều xứng đáng làm sao," cô Mai - đầu bếp chính rưng rưng chia sẻ.\n\nNhững cống hiến thầm lặng ấy chính là chất keo kết dính, sưởi ấm tình người trong gian khó xã hội vây quanh.',
    author: 'Lê Thanh Bình',
    publishDate: '2026-05-29',
    category: 'Hoạt động nổi bật',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
    views: 1560
  }
];

const initialDonations = [
  {
    id: 'TXN-10029',
    campaignId: 'camp-1',
    campaignTitle: 'Góp Sách Lên Vùng Cao - Ươm Mầm Trí Tuệ Trẻ Em Hà Giang',
    donorName: 'Phạm Hồng Đăng',
    donorEmail: 'dangpham@gmail.com',
    amount: 2000000,
    message: 'Mong mỏi các em học sinh có sách mới học tập thật tốt, hướng tới tương lai xán lạn!',
    timestamp: '2026-05-30 21:15',
    status: 'success',
    paymentMethod: 'chuyển khoản'
  },
  {
    id: 'TXN-10030',
    campaignId: 'camp-1',
    campaignTitle: 'Góp Sách Lên Vùng Cao - Ươm Mầm Trí Tuệ Trẻ Em Hà Giang',
    donorName: 'Ẩn Danh',
    donorEmail: 'anonymous@traitimvang.vn',
    amount: 500000,
    message: 'Món quà nhỏ gửi tặng các em mầm non yêu thương.',
    timestamp: '2026-05-31 08:30',
    status: 'success',
    paymentMethod: 'momo'
  },
  {
    id: 'TXN-10031',
    campaignId: 'camp-2',
    campaignTitle: 'Nước Sạch Cho Đồng Bào Miền Tây Xâm Nhập Mặn',
    donorName: 'Lê Quang Thái',
    donorEmail: 'thaile@gmail.com',
    amount: 5000000,
    message: 'Chia sẻ cùng bà con Bến Tre sớm vượt qua đại hạn xâm nhập mặn lịch sử năm nay.',
    timestamp: '2026-05-31 10:45',
    status: 'success',
    paymentMethod: 'vnpay'
  },
  {
    id: 'TXN-10032',
    campaignId: 'camp-4',
    campaignTitle: 'Trái Tim Cho Em - Tài Trợ Mổ Tim Nhân Đạo Cho Trẻ Em Nghèo',
    donorName: 'Nguyễn Thị Minh An',
    donorEmail: 'minhan.neu@gmail.com',
    amount: 1000000,
    message: 'Gửi lời cầu nguyện mong em bé sớm được đại phẫu thuật thành công lành lặn!',
    timestamp: '2026-05-31 14:22',
    status: 'pending',
    paymentMethod: 'chuyển khoản'
  }
];

// Initial default user roles and generic credentials
const initialUsers = [
  // Admins with specific roles
  { id: 'usr-1', name: 'Nguyễn Lâm Sơn (Chủ Tịch)', email: 'admin@traitimvang.vn', phone: '0912345678', password: 'admin', role: 'Super Admin', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200' },
  { id: 'usr-2', name: 'Vũ Thị Thanh Hà (Kế Toán)', email: 'ketoan@traitimvang.vn', phone: '0988765432', password: 'ketoan', role: 'Finance Manager', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
  { id: 'usr-3', name: 'Trần Minh Đức (Điều Phối)', email: 'dieupat@traitimvang.vn', phone: '0911223344', password: 'dieupat', role: 'Event Coordinator', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200' },
  
  // Standard members / volunteers / donors
  { id: 'usr-4', name: 'Hoàng Văn Nam', email: 'hoangnam@gmail.com', phone: '0912123456', password: '123', role: 'User', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
  { id: 'usr-5', name: 'Đặng Thùy Dương', email: 'thuyduong.neu@gmail.com', phone: '0987654321', password: '123', role: 'User', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200' },
  { id: 'usr-6', name: 'Lê Minh Trung', email: 'minhtrung@gmail.com', phone: '0901234567', password: '123', role: 'User', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200' }
];

const mergeUsersWithDefaults = (storedUsers = []) => {
  const byEmail = new Map();

  initialUsers.forEach((user) => {
    byEmail.set(user.email.toLowerCase(), user);
  });

  storedUsers.forEach((user) => {
    if (!user?.email) return;
    byEmail.set(user.email.toLowerCase(), user);
  });

  return Array.from(byEmail.values());
};

// Notifications dataset structure
const initialNotifications = [
  { id: 'nt-1', targetEmail: 'hoangnam@gmail.com', title: 'Phê duyệt đăng ký sự kiện thành công!', message: 'Đơn đăng ký tham gia sự kiện "Hiến Máu Nhân Đạo: Giọt Hồng Sẻ Chia" của bạn đã được Admin phê duyệt Chắc Chắn Tham Gia.', timestamp: '2026-05-31 09:00', isRead: false },
  { id: 'nt-2', targetEmail: 'thuyduong.neu@gmail.com', title: 'Xác nhận đóng quỹ sự kiện', message: 'Hệ thống đã nhận được 100,000 VND đóng hỗ trợ áo thun của bạn cho hoạt động sự kiện sắp tới.', timestamp: '2026-05-31 10:15', isRead: false },
  { id: 'nt-3', targetEmail: 'minhan.neu@gmail.com', title: 'Ủng hộ của bạn đang chờ kiểm duyệt', message: 'Khoản hỗ trợ 1,000,000 VND vào quỹ "Trái Tim Cho Em" đang trong trạng thái Đối Khớp ngân hàng.', timestamp: '2026-05-31 14:25', isRead: false }
];

export const CharityProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState(() => {
    const local = localStorage.getItem('charity_campaigns');
    return local ? JSON.parse(local) : initialCampaigns;
  });

  const [events, setEvents] = useState(() => {
    const local = localStorage.getItem('charity_events');
    return local ? JSON.parse(local) : initialEvents;
  });

  const [articles, setArticles] = useState(() => {
    const local = localStorage.getItem('charity_articles');
    return local ? JSON.parse(local) : initialArticles;
  });

  const [donations, setDonations] = useState(() => {
    const local = localStorage.getItem('charity_donations');
    return local ? JSON.parse(local) : initialDonations;
  });

  const [users, setUsers] = useState(() => {
    const local = localStorage.getItem('charity_users');
    if (!local) return initialUsers;

    try {
      const parsed = JSON.parse(local);
      return Array.isArray(parsed) ? mergeUsersWithDefaults(parsed) : initialUsers;
    } catch {
      return initialUsers;
    }
  });

  const [notifications, setNotifications] = useState(() => {
    const local = localStorage.getItem('charity_notifications');
    return local ? JSON.parse(local) : initialNotifications;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const local = localStorage.getItem('charity_current_user');
    return local ? JSON.parse(local) : null;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('charity_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('charity_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('charity_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('charity_donations', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('charity_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('charity_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('charity_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('charity_current_user');
    }
  }, [currentUser]);

  // Campaign management operations
  const addCampaign = (campaign) => {
    const newCamp = {
      ...campaign,
      id: `camp-${Date.now()}`,
      currentAmount: 0,
      donorsCount: 0,
      featured: campaign.featured || false,
      startDate: new Date().toISOString().split('T')[0]
    };
    setCampaigns(prev => [newCamp, ...prev]);
  };

  const updateCampaign = (id, updatedFields) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updatedFields } : c));
  };

  const deleteCampaign = (id) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
    setDonations(prev => prev.filter(d => d.campaignId !== id));
  };

  // Event management operations
  const addEvent = (event) => {
    const newEvt = {
      ...event,
      id: `evt-${Date.now()}`,
      volunteersRegistered: 0,
      registeredEmails: [],
      status: event.status || 'upcoming'
    };
    setEvents(prev => [newEvt, ...prev]);
  };

  const updateEvent = (id, updatedFields) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updatedFields } : e));
  };

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const registerForEvent = (eventId, volunteerData) => {
    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        const emails = e.registeredEmails || [];
        const isEmailRegistered = emails.some(email => email.toLowerCase() === volunteerData.email.toLowerCase());
        if (isEmailRegistered) return e;

        const newVol = {
          id: `vol-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          name: volunteerData.name,
          email: volunteerData.email.toLowerCase(),
          phone: volunteerData.phone,
          status: volunteerData.status || 'pending', // pending (Chờ xác nhận), confirmed (Chắc chắn tham gia), completed (Đã điểm danh/hoàn thành), cancelled (Hủy)
          paymentStatus: volunteerData.paymentStatus || 'unpaid', // unpaid, paid, free
          notes: volunteerData.notes || '',
          signupDate: new Date().toISOString().split('T')[0]
        };

        const currentVolunteers = e.registeredVolunteers || [];
        return {
          ...e,
          volunteersRegistered: e.volunteersRegistered + 1,
          registeredEmails: [...emails, newVol.email],
          registeredVolunteers: [...currentVolunteers, newVol]
        };
      }
      return e;
    }));
  };

  const updateVolunteer = (eventId, volunteerId, updatedFields) => {
    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        const updatedList = (e.registeredVolunteers || []).map(v => {
          if (v.id === volunteerId) {
            const hasStatusChanged = updatedFields.status && updatedFields.status !== v.status;
            const hasPaymentChanged = updatedFields.paymentStatus && updatedFields.paymentStatus !== v.paymentStatus;
            
            if (hasStatusChanged) {
              const statusLabel = updatedFields.status === 'confirmed' ? 'Chắc chắn tham gia' : updatedFields.status === 'attended' ? 'Đã điểm danh hoàn thành' : 'Chờ duyệt';
              addNotification(
                v.email,
                'Cập nhật tình trạng tham gia sự kiện!',
                `Đơn sự kiện "${e.title}" của bạn đã được cập nhật trạng thái thành: [${statusLabel}].`
              );
            }
            if (hasPaymentChanged) {
              const payLabel = updatedFields.paymentStatus === 'paid' ? 'ĐÃ ĐÓNG PHÍ' : 'CHƯA ĐÓNG PHÍ';
              addNotification(
                v.email,
                'Cập nhật trạng thái phí tham gia',
                `Đóng góp phí cho sự kiện "${e.title}" của bạn đã được ghi nhận: [${payLabel}].`
              );
            }
            
            return { ...v, ...updatedFields };
          }
          return v;
        });
        return {
          ...e,
          registeredVolunteers: updatedList
        };
      }
      return e;
    }));
  };

  // Article management
  const addArticle = (article) => {
    const newArt = {
      ...article,
      id: `art-${Date.now()}`,
      publishDate: new Date().toISOString().split('T')[0],
      views: 0
    };
    setArticles(prev => [newArt, ...prev]);
  };

  const updateArticle = (id, updatedFields) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, ...updatedFields } : a));
  };

  const deleteArticle = (id) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  // Donation operations
  const addDonation = (donation) => {
    const txnId = `TXN-${Math.floor(10000 + Math.random() * 90000)}`;
    const newDonation = {
      id: txnId,
      ...donation,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: donation.status || 'success' // Default can be processed immediately
    };

    // If donation structure is successful from the start, update currentAmount of the campaign
    if (newDonation.status === 'success') {
      setCampaigns(prev => prev.map(c => {
        if (c.id === donation.campaignId) {
          return {
            ...c,
            currentAmount: c.currentAmount + parseFloat(donation.amount),
            donorsCount: c.donorsCount + 1
          };
        }
        return c;
      }));
    }

    setDonations(prev => [newDonation, ...prev]);
    return txnId;
  };

  const updateDonationStatus = (donationId, newStatus) => {
    setDonations(prev => prev.map(d => {
      if (d.id === donationId) {
        // If status changes from non-success to success, increase target campaign's raised amount
        if (d.status !== 'success' && newStatus === 'success') {
          // Push notification if user has registered account matching donorEmail
          if (d.donorEmail) {
            addNotification(
              d.donorEmail,
              'Ủng hộ dự án thành công! ✓',
              `Khoản đóng góp trị giá ${parseFloat(d.amount).toLocaleString('vi-VN')} VND cho chiến dịch "${d.campaignTitle}" của bạn đã được kiểm toán đối khớp thành công. Trân trọng cảm ơn tấm lòng vàng của bạn!`
            );
          }
          setCampaigns(prevCamps => prevCamps.map(c => {
            if (c.id === d.campaignId) {
              return {
                ...c,
                currentAmount: c.currentAmount + d.amount,
                donorsCount: c.donorsCount + 1
              };
            }
            return c;
          }));
        }
        // If status changes from success to another status, decrease target campaign's raised amount
        else if (d.status === 'success' && newStatus !== 'success') {
          setCampaigns(prevCamps => prevCamps.map(c => {
            if (c.id === d.campaignId) {
              return {
                ...c,
                currentAmount: Math.max(0, c.currentAmount - d.amount),
                donorsCount: Math.max(0, c.donorsCount - 1)
              };
            }
            return c;
          }));
        }
        return { ...d, status: newStatus };
      }
      return d;
    }));
  };

  // User auth and notifications actions
  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    const found = users.find(
      u => u.email.toLowerCase() === normalizedEmail && u.password === normalizedPassword
    );
    if (found) {
      setCurrentUser(found);
      return { success: true, user: found };
    }
    return { success: false, message: 'Sai thông tin tài khoản hoặc mật khẩu!' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const registerUser = (name, email, password, phone) => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    const isExist = users.some(u => u.email.toLowerCase() === normalizedEmail);
    if (isExist) {
      return { success: false, message: 'Email này đã được sử dụng!' };
    }
    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      phone,
      password: normalizedPassword,
      role: 'User' // Default standard role
    };
    setUsers(prev => [...prev, newUser]);
    // Set auto-logged in
    setCurrentUser(newUser);

    // Initial notification for newly registered user
    addNotification(
      newUser.email,
      'Chào mừng gia nhập Trái Tim Vàng!',
      `Xin kính chào thành viên ${name}! Bạn đã đăng ký tài khoản thành công. Giờ đây bạn có thể dễ dàng quản lý các đợt quyên góp và theo dõi tiến độ sự kiện tham gia.`
    );

    return { success: true, user: newUser };
  };

  const addNotification = (targetEmail, title, message) => {
    const newNotif = {
      id: `nt-${Date.now()}`,
      targetEmail: targetEmail.toLowerCase(),
      title,
      message,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateUserProfile = (updatedFields) => {
    if (!currentUser) return;
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, ...updatedFields } : u));
    setCurrentUser(prev => prev ? { ...prev, ...updatedFields } : null);
  };

  const adminAddUser = (user) => {
    const newUser = {
      ...user,
      id: `usr-${Date.now()}`,
      avatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      role: user.role || 'User'
    };
    setUsers(prev => [...prev, newUser]);
  };

  const adminUpdateUser = (id, updatedFields) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updatedFields } : u));
    if (currentUser && currentUser.id === id) {
      setCurrentUser(prev => prev ? { ...prev, ...updatedFields } : null);
    }
  };

  const adminDeleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    if (currentUser && currentUser.id === id) {
      setCurrentUser(null);
    }
  };

  const markNotificationsAsRead = (email) => {
    setNotifications(prev => prev.map(n => n.targetEmail.toLowerCase() === email.toLowerCase() ? { ...n, isRead: true } : n));
  };

  return (
    <CharityContext.Provider value={{
      campaigns,
      events,
      articles,
      donations,
      users,
      currentUser,
      notifications,
      addCampaign,
      updateCampaign,
      deleteCampaign,
      addEvent,
      updateEvent,
      deleteEvent,
      registerForEvent,
      updateVolunteer,
      addArticle,
      updateArticle,
      deleteArticle,
      addDonation,
      updateDonationStatus,
      login,
      logout,
      registerUser,
      addNotification,
      markNotificationsAsRead,
      updateUserProfile,
      adminAddUser,
      adminUpdateUser,
      adminDeleteUser
    }}>
      {children}
    </CharityContext.Provider>
  );
};

export const useCharity = () => {
  const context = useContext(CharityContext);
  if (!context) {
    throw new Error('useCharity must be used within a CharityProvider');
  }
  return context;
};
