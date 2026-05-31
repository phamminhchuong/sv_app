import React from 'react';
import { 
  Target, Eye, Compass, Heart, Award, ShieldAlert, Check, 
  Phone, Mail, Facebook, MessageCircle, ExternalLink, Share2 
} from 'lucide-react';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Nguyễn Lâm Sơn',
      role: 'Người Sáng Lập & Chủ Tịch CLB',
      bio: 'Hơn 12 năm kinh nghiệm hoạt động cứu trợ khẩn cấp vùng cao và phát triển dự án nước sạch Nam Bộ.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      contact: {
        phone: '0912.345.678',
        email: 'son.nguyen@traitimvang.vn',
        zalo: 'https://zalo.me/0912345678',
        facebook: 'https://facebook.com/lamson.traitimvang'
      }
    },
    {
      name: 'Vũ Thị Thanh Hà',
      role: 'Giám Đốc Ban Dự Án Y Tế & Trẻ Em',
      bio: 'Nguyên bác sĩ nội trú tim mạch, chuyên trách rà soát hồ sơ mổ tim và thiết lập bếp cơm dinh dưỡng.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
      contact: {
        phone: '0988.765.432',
        email: 'ha.vu@traitimvang.vn',
        zalo: 'https://zalo.me/0988765432'
      }
    },
    {
      name: 'Hoàng Quốc Khánh',
      role: 'Trưởng Ban Công Nghệ & Minh Bạch',
      bio: 'Kỹ sư phần mềm tâm huyết, phát triển hệ thống quản lý sao kê tự động theo thời gian thực.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      contact: {
        phone: '0911.223.344',
        email: 'khanh.hoang@traitimvang.vn'
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 animate-fadeIn">
      
      {/* MISSION, VISION, VALUES */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Về Chúng Tôi — Trái Tim Vàng</h1>
        <p className="text-gray-600 leading-relaxed text-base">
          Trái Tim Vàng là nền tảng thiện nguyện số phi lợi nhuận, được thành lập với tầm nhìn giải quyết triệt để vấn đề minh bạch trong các hoạt động cứu trợ nhân đạo tại Việt Nam.
        </p>
      </section>

      {/* CORE VALUES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-150 shadow-xs space-y-4 text-center">
          <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-lg">Sứ mệnh bất diệt</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Kiến tạo giải pháp công nghệ kết nối trực tiếp những tấm lòng nhân ái với đúng người đúng việc một cách nhanh nhất, chu đáo nhất.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-150 shadow-xs space-y-4 text-center">
          <div className="w-12 h-12 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-lg">Tầm nhìn chiến lược</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Trở thành hệ sinh thái nhân đạo lớn mạnh hàng đầu cả nước, thúc đẩy lối sống "Cho đi là còn mãi" trong thế hệ thanh niên Việt Nam hiện đại.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-150 shadow-xs space-y-4 text-center">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-lg">Giá trị cốt lõi</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            MINH BẠCH tuyệt đối trong dòng tiền - NHÂN ÁI trong cách ứng xử - KỶ LUẬT cao độ trong quản lý vận hành dự án cứu tế thực tế.
          </p>
        </div>
      </section>

      {/* FINANCIAL TRANSPARENCY DETAILED SEGMENT */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl" />
        
        <div className="lg:col-span-6 space-y-6 relative z-10">
          <span className="inline-block px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-450 text-[10px] font-bold tracking-widest uppercase rounded-full">BÁO CÁO TÀI CHÍNH NĂM QUA</span>
          <h2 className="text-3xl font-black text-white sm:text-4xl leading-tight">Mỗi Giao Dịch Đều Được Định Hướng Trọn Vẹn</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Chúng tôi tự hào là đơn vị tiên phong áp dụng triết lý quản trị tinh gọn. 100% chi phí hoạt động nội bộ (văn phòng, website, lương nhân sự) được tài trợ riêng bởi các nhà tài trợ kim cương sáng lập, đảm bảo hoàn toàn tiền từ cộng đồng đi trực tiếp tới tay người nhận.
          </p>
          <div className="space-y-3 pt-2 text-xs font-semibold text-slate-300">
            <p className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-450 fill-current" /> 92% Nguồn vốn trực tiếp tài trợ mua sắm trang thiết bị, gói sinh kế cứu trợ.</p>
            <p className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-450 fill-current" /> 5% Chi phí logistic, vận chuyển xe bán tải chở đồ lên dốc núi biên viễn.</p>
            <p className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-450 fill-current" /> 3% Chi phí vận hành, chuẩn bị thư mời, báo cáo tài liệu sao kê in ấn.</p>
          </div>
        </div>

        {/* Visual custom pure tailwind graph representations */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-750 backdrop-blur-md relative z-10">
          <h3 className="font-extrabold text-base text-center text-slate-100 border-b border-slate-700/60 pb-3">Phân Bổ Sử Dụng Quỹ (100% khớp sao kê)</h3>
          
          <div className="space-y-4">
            {/* 92% */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-300">
                <span>Dự án trực tiếp ngoài hiện trường</span>
                <span className="text-rose-450 font-black">92%</span>
              </div>
              <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full transition-all" style={{ width: '92%' }} />
              </div>
            </div>

            {/* 5% */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-300">
                <span>Vận tải, đo đạc & hậu cần địa phương</span>
                <span className="text-sky-450 font-black">5%</span>
              </div>
              <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div className="h-full bg-gradient-to-r from-sky-500 to-sky-600 rounded-full transition-all" style={{ width: '5%' }} />
              </div>
            </div>

            {/* 3% */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-300">
                <span>Chứng từ, liên lạc, thiết kế truyền thông</span>
                <span className="text-amber-450 font-black">3%</span>
              </div>
              <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all" style={{ width: '3%' }} />
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 text-center leading-normal italic mt-2">
            Mục tiêu tối thượng: Không một đồng nào bị thất thoát vào mục đích riêng ngoài quy trình phê duyện.
          </p>
        </div>
      </section>

      {/* CORE TEAM PROFILE GRIDS */}
      <section className="space-y-10">
        <div className="text-center space-y-4">
          <span className="text-rose-600 font-extrabold text-xs uppercase tracking-wider">Đội Ngũ Nhiệt Thành</span>
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">Những Con Người Đứng Sau Các Dự Án</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Tâp hợp những con người làm việc hăng say không kể đêm ngày với sứ mệnh đem lại nụ cười tới vùng cao dốc thẳm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((team, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-gray-150 p-6 flex flex-col justify-between items-center text-center space-y-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-100 shadow-sm border-2 border-rose-100/50">
                  <img src={team.image} alt={team.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 text-base">{team.name}</h4>
                  <p className="text-xs font-bold text-rose-600">{team.role}</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                  {team.bio}
                </p>
              </div>

              {team.contact && (
                <div className="flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-gray-100 w-full shrink-0">
                  {team.contact.phone && (
                    <a
                      href={`tel:${team.contact.phone.replace(/\./g, '')}`}
                      title={`Gọi: ${team.contact.phone}`}
                      className="p-1 px-2.5 rounded-lg bg-gray-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-gray-150 hover:border-rose-200 transition-all text-[10px] font-bold flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" /> Gọi
                    </a>
                  )}
                  {team.contact.zalo && (
                    <a
                      href={team.contact.zalo}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Trò chuyện Zalo"
                      className="p-1 px-2.5 bg-cyan-50/50 hover:bg-cyan-50 text-cyan-600 hover:text-cyan-700 rounded-lg border border-cyan-100/50 hover:border-cyan-200 transition-all text-[10px] font-extrabold flex items-center gap-1"
                    >
                      <span className="w-3 h-3 flex items-center justify-center font-black">Z</span> Zalo
                    </a>
                  )}
                  {team.contact.facebook && (
                    <a
                      href={team.contact.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Facebook Cá Nhân"
                      className="p-1 px-2 bg-blue-50/60 hover:bg-blue-50 text-blue-600 hover:text-blue-700 rounded-lg border border-blue-100/60 hover:border-blue-200 transition-all text-[10px] font-bold flex items-center gap-1"
                    >
                      <Facebook className="w-3 h-3" /> FB
                    </a>
                  )}
                  {team.contact.email && (
                    <a
                      href={`mailto:${team.contact.email}`}
                      title={`Email: ${team.contact.email}`}
                      className="p-1 px-2 bg-gray-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-lg border border-gray-150 transition-all text-[10px] font-bold flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" /> Email
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* QUICK CONNECT & CLUB CONTACT LINKS */}
      <section className="bg-slate-50 rounded-3xl border border-gray-150 p-8 md:p-10 relative overflow-hidden mt-12 shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-2xl" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="inline-block px-3 py-1 bg-sky-100 border border-sky-100 text-sky-700 text-[10px] font-bold tracking-widest uppercase rounded-full">KẾT NỐI TỨC THỜI</span>
            <h3 className="text-2xl font-black text-slate-900 leading-tight">Mọi ý kiến đóng góp & liên hệ điều phối</h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              Bạn mong muốn tài trợ dự án, đăng ký đồng hành cùng câu lạc bộ, hoặc giải đáp các thắc mắc về sao kê quyên góp? 
              Hãy liên hệ trực tiếp với Chủ nhiệm câu lạc bộ hoặc tương tác qua các kênh liên lạc mạng xã hội chính thức để được hỗ trợ trong thời gian sớm nhất.
            </p>
            <div className="flex flex-col gap-3 text-xs text-slate-700 font-bold pt-1">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shadow-2xs">
                  <Phone className="w-4 h-4" />
                </div>
                <span>Hỗ trợ trực tiếp: <a href="tel:0912345678" className="hover:underline text-rose-600 font-black">0912.345.678 (Nguyễn Lâm Sơn)</a></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center shadow-2xs">
                  <Mail className="w-4 h-4" />
                </div>
                <span>Email chính thức: <a href="mailto:son.nguyen@traitimvang.vn" className="hover:underline text-sky-600 font-extrabold">son.nguyen@traitimvang.vn</a></span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Fanpage Link Card */}
            <a 
              href="https://facebook.com/traitimvang.clb" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-2xl border border-gray-150 hover:border-blue-400 group hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-2xs group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Facebook className="w-5 h-5" />
                </div>
                <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-900 text-sm">Fanpage Facebook</h4>
                <p className="text-[10px] font-bold text-blue-600">Câu lạc bộ Trái Tim Vàng</p>
                <p className="text-[10px] text-gray-400 leading-relaxed pt-1">Xem video hành trình thực tế và các câu chuyện cảm động từ bản làng.</p>
              </div>
            </a>

            {/* Zalo Link Card */}
            <a 
              href="https://zalo.me/g/traitimvang" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-2xl border border-gray-150 hover:border-cyan-400 group hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-cyan-0 text-cyan-600 rounded-xl flex items-center justify-center font-black shadow-2xs bg-cyan-50 group-hover:bg-cyan-600 group-hover:text-white transition-all text-xl">
                  Z
                </div>
                <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-cyan-500 transition-colors" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-900 text-sm">Cộng Đồng Zalo</h4>
                <p className="text-[10px] font-bold text-cyan-600">Nhóm trò chuyện tình nguyện viên</p>
                <p className="text-[10px] text-gray-400 leading-relaxed pt-1">Giao lưu điều lưu động, đăng ký ghép xe cứu trợ, thông tin cứu trợ tức thời.</p>
              </div>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
