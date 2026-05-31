import React, { useState } from 'react';
import { useCharity } from '../context/CharityContext';
import { 
  Heart, Users, DollarSign, Calendar, ArrowRight, ShieldCheck, 
  Award, MessageSquare, Trophy, Medal, Search, Flame 
} from 'lucide-react';

const Home = ({ navigateTo }) => {
  const { campaigns, events, articles, donations } = useCharity();
  const [emailForm, setEmailForm] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);
  
  // Honor Roll search filter
  const [donorSearch, setDonorSearch] = useState('');

  // Get active and featured campaigns
  const featuredCampaigns = campaigns.filter(c => c.featured).slice(0, 3);
  // Get upcoming events
  const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(0, 2);
  // Get latest articles
  const latestArticles = articles.slice(0, 3);

  // Default historical honor donors to make Hall of Fame lively
  const defaultHonorDonors = [
    { name: 'Nguyễn Việt Anh', amount: 15000000, count: 3 },
    { name: 'Trần Minh Triết', amount: 12500000, count: 2 },
    { name: 'Lê Phương Thảo', amount: 8000000, count: 1 },
    { name: 'Đỗ Hoàng Khải', amount: 6550000, count: 2 },
    { name: 'Phạm Tiến Dũng', amount: 4500000, count: 1 }
  ];

  // Merge actual successful donations from state database
  const mergedDonors = [...defaultHonorDonors];
  donations
    .filter(d => d.status === 'success' && d.donorName && d.donorName.trim() !== '' && d.donorName.trim().toLowerCase() !== 'ẩn danh')
    .forEach(d => {
      const existing = mergedDonors.find(item => item.name.toLowerCase() === d.donorName.trim().toLowerCase());
      if (existing) {
        existing.amount += d.amount;
        existing.count += 1;
      } else {
        mergedDonors.push({ name: d.donorName.trim(), amount: d.amount, count: 1 });
      }
    });

  // Re-sort descending
  const finalSortedDonors = mergedDonors.sort((a, b) => b.amount - a.amount);

  // Filter sorted donors based on user search query
  const filteredDonors = finalSortedDonors.filter(donor => 
    donor.name.toLowerCase().includes(donorSearch.toLowerCase())
  );

  // Stats calculation
  const totalRaised = campaigns.reduce((acc, c) => acc + c.currentAmount, 0);
  const totalProjects = campaigns.length;
  const totalVolunteers = events.reduce((acc, e) => acc + e.volunteersRegistered, 0) + 120; // base + mock

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailForm.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmailForm('');
      }, 3000);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactName.trim() && contactMsg.trim()) {
      setContactSuccess(true);
      setTimeout(() => {
        setContactSuccess(false);
        setContactName('');
        setContactMsg('');
      }, 4000);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* HERO BANNER SECTION */}
      <section className="relative h-[600px] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
        {/* Abstract background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center brightness-[0.35]"
          style={{ imageRendering: 'auto', backgroundImage: `url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1920')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-500/90 text-white uppercase tracking-wider animate-bounce">
            <Heart className="w-3.5 h-3.5 fill-current" /> Kết nối những tấm lòng vàng
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            Gieo Yêu Thương, <span className="text-rose-500 underline decoration-rose-500/30">Gặt Hạnh Phúc</span> & Kiến Tạo Tương Lai
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Nền tảng thiện nguyện kết nối trực tiếp, minh bạch 100% dòng tiền quyên góp. Chung tay xây dựng một thế giới ấm áp đầy tình thương sĩ phu bản xứ.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigateTo('/campaigns')}
              className="w-full sm:w-auto px-8 py-4 bg-rose-600 hover:bg-rose-700 active:scale-95 transition-all text-white font-bold rounded-xl shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2"
            >
              Ủng Hộ Ngay <Heart className="w-5 h-5 fill-current" />
            </button>
            <button 
              onClick={() => navigateTo('/events')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 transition-all text-white font-semibold rounded-xl backdrop-blur-md flex items-center justify-center gap-2"
            >
              Xem Sự Kiện <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Waves divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* QUICK STATS SECTION */}
      <section className="-mt-24 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-xl flex items-center gap-6 border border-gray-100/50 hover:-translate-y-1 transition-all duration-300">
            <div className="p-4 bg-rose-50 text-rose-600 rounded-xl">
              <DollarSign className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">Tổng quỹ đã trao</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{formatVND(totalRaised)}</h3>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl flex items-center gap-6 border border-gray-100/50 hover:-translate-y-1 transition-all duration-300">
            <div className="p-4 bg-sky-50 text-sky-600 rounded-xl">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">Dự án thiện nguyện</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{totalProjects} Chiến dịch</h3>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl flex items-center gap-6 border border-gray-100/50 hover:-translate-y-1 transition-all duration-300">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">Tình nguyện viên</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">+{totalVolunteers} Thành viên</h3>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED FEATURES / WHY TRUST US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">Sứ Mệnh Minh Bạch Hàng Đầu</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            Chúng tôi sinh ra để làm cầu nối tin cậy giữa các tấm lòng vàng và những mảnh đời khó khăn thông qua quy chế giám sát chặt chẽ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Sao kê Real-time</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Mọi giao dịch đóng quyên đều được công bố công khai tự động trên bảng tin giao dịch tức thì.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Nơi tiếp nhận tin cậy</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Hợp tác mật thiết cùng chính quyền sở tại kiểm duyệt những hoàn cảnh đặc biệt khó khăn chuẩn xác nhất.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Cộng đồng tự quản</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Tình nguyện viên trực tiếp giám sát, nấu cháo, vận chuyển quà tặng đến tận tay người cần giúp đỡ.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Hỗ Trợ Trọn Vẹn</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Không chỉ là hỗ trợ tài chính khẩn cấp, chúng tôi tạo dựng những mô hình sinh kế và trường học vững chắc.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED CAMPAIGNS CONTAINER */}
      <section className="bg-gray-100/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-rose-600 font-bold text-sm tracking-wider uppercase">Dự án cấp thiết</span>
              <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">Chiến Dịch Đang Kêu Gọi</h2>
            </div>
            <button 
              onClick={() => navigateTo('/campaigns')}
              className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1.5 p-2 rounded-lg hover:bg-rose-50 transition-colors"
            >
              Xem tất cả chiến dịch <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCampaigns.map((camp) => {
              const percent = Math.min(100, Math.round((camp.currentAmount / camp.targetAmount) * 100));
              return (
                <div key={camp.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48 overflow-hidden bg-slate-200">
                    <img 
                      src={camp.image} 
                      alt={camp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm shadow-sm rounded-full text-xs font-bold text-rose-600 uppercase">
                      {camp.category}
                    </span>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2">
                      <h3 className="font-extrabold text-slate-900 text-lg hover:text-rose-600 transition-colors line-clamp-2 leading-snug">
                        {camp.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-3">
                        {camp.shortDescription}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Progress bar */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold text-gray-600">
                          <span>Đã quyên góp: {percent}%</span>
                          <span className="text-rose-600">{camp.donorsCount} lượt</span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs font-semibold py-2 border-t border-b border-gray-100">
                        <div>
                          <p className="text-gray-400">ĐÃ GÂY QUỸ</p>
                          <p className="text-sm font-extrabold text-slate-800 mt-0.5">{formatVND(camp.currentAmount)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400">MỤC TIÊU</p>
                          <p className="text-sm font-extrabold text-rose-600 mt-0.5">{formatVND(camp.targetAmount)}</p>
                        </div>
                      </div>

                      <button 
                        onClick={() => navigateTo(`/campaigns`, { campaignId: camp.id })}
                        className="w-full py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-extrabold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                      >
                        Quyên góp ngay <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BẢNG VÀNG VINH DANH HOÀN MỸ */}
      <section className="bg-gradient-to-b from-amber-50/30 to-white py-16 border-y border-amber-100/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 uppercase tracking-widest">
              <Trophy className="w-3.5 h-3.5 animate-bounce" /> Bảng Vàng Vinh Danh
            </span>
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">Những Tấm Lòng Vàng Cao Quý</h2>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Chúng tôi xin thành tâm tri ân và vinh danh những cá nhân xuất sắc đã tích cực chung tay quyên góp nguồn tài trợ quý giá giúp đỡ những mảnh đời bớt cơ cực. Sự đóng góp của quý vị hảo tâm chính là động lực to lớn cho phong trào nhân đạo của tổ sinh.
            </p>
          </div>

          {/* TOP 3 HIGHLIGHTS CARDS */}
          {finalSortedDonors.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-6 items-end">
              
              {/* TOP 2 (Silver) */}
              {finalSortedDonors[1] && (
                <div className="bg-white rounded-3xl border border-gray-150 p-6 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center order-2 md:order-1 border-slate-200 mt-0 md:mt-4">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-slate-100 rounded-full blur-xl opacity-85" />
                  <div className="w-14 h-14 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center shadow-inner relative z-10">
                    <Medal className="w-8 h-8" />
                  </div>
                  <span className="mt-4 px-2.5 py-0.5 bg-slate-100 text-slate-650 rounded-full text-[10px] font-black uppercase tracking-wider">HẠNG 2 • BỒ ĐỀ TÂM</span>
                  <h3 className="font-extrabold text-slate-900 text-base mt-2 line-clamp-1">{finalSortedDonors[1].name}</h3>
                  <div className="mt-4 py-2 px-4 bg-slate-50 rounded-2xl border border-slate-100 w-full text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">TỔNG ỦNG HỘ</p>
                    <p className="text-lg font-black text-slate-700">{formatVND(finalSortedDonors[1].amount)}</p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-400 font-bold">
                    <Flame className="w-3.5 h-3.5 text-orange-450" /> {finalSortedDonors[1].count} Lượt quyên góp
                  </div>
                </div>
              )}

              {/* TOP 1 (Gold/Diamond) */}
              {finalSortedDonors[0] && (
                <div className="bg-white rounded-3xl border-2 border-amber-400 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center order-1 md:order-2 scale-105 z-10 pb-10">
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500" />
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-150/40 rounded-full blur-2xl" />
                  <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center shadow-md relative z-10 border border-amber-100">
                    <Trophy className="w-9 h-9 text-amber-500 fill-current" />
                  </div>
                  <span className="mt-4 px-3 py-1 bg-amber-500 text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                    👑 HẠNG 1 • KIM CƯƠNG TOÀN VỆN
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-lg mt-3 line-clamp-1">{finalSortedDonors[0].name}</h3>
                  <div className="mt-4 py-3 px-6 bg-amber-550/10 rounded-2xl border border-amber-150 w-full text-center">
                    <p className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">TỔNG ỦNG HỘ</p>
                    <p className="text-xl font-black text-amber-600">{formatVND(finalSortedDonors[0].amount)}</p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-4 text-xs text-amber-800 font-extrabold">
                    <Flame className="w-4 h-4 text-rose-500 fill-current" /> {finalSortedDonors[0].count} Lượt quyên góp từ tâm
                  </div>
                </div>
              )}

              {/* TOP 3 (Bronze) */}
              {finalSortedDonors[2] && (
                <div className="bg-white rounded-3xl border border-gray-150 p-6 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center order-3 border-orange-100 mt-0 md:mt-4">
                  <div className="absolute top-0 left-0 w-24 h-24 bg-orange-100/50 rounded-full blur-xl" />
                  <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center shadow-inner relative z-10">
                    <Award className="w-8 h-8" />
                  </div>
                  <span className="mt-4 px-2.5 py-0.5 bg-orange-50 text-orange-700 rounded-full text-[10px] font-black uppercase tracking-wider">HẠNG 3 • TẤM LÒNG HỒNG</span>
                  <h3 className="font-extrabold text-slate-900 text-base mt-2 line-clamp-1">{finalSortedDonors[2].name}</h3>
                  <div className="mt-4 py-2 px-4 bg-orange-50/40 rounded-2xl border border-orange-100 w-full text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">TỔNG ỦNG HỘ</p>
                    <p className="text-lg font-black text-orange-700">{formatVND(finalSortedDonors[2].amount)}</p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-400 font-bold">
                    <Flame className="w-3.5 h-3.5 text-orange-450 animate-pulse" /> {finalSortedDonors[2].count} Lượt quyên góp
                  </div>
                </div>
              )}

            </div>
          )}

          {/* SEARCH & OTHER NOMINEE LISTS */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-150 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Danh Sách Tri Ân Đồng Hành</h4>
                <p className="text-xs text-gray-400 font-semibold">Danh sách đại gia đình hảo tâm đóng góp hỗ trợ dòng tiền (Đã kiểm toán và cộng thành công)</p>
              </div>
              
              {/* Search Bar Input */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-450" />
                <input
                  type="text"
                  placeholder="Nhập tên nhà hảo tâm tra cứu..."
                  value={donorSearch}
                  onChange={(e) => setDonorSearch(e.target.value)}
                  className="w-full text-xs pl-9 pr-4 py-3 rounded-xl border border-gray-150 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* List scrollbar content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredDonors.length === 0 ? (
                <p className="col-span-full py-8 text-center text-gray-400 font-medium italic text-xs">Không tìm thấy dữ liệu nhà hảo tâm phù hợp.</p>
              ) : (
                filteredDonors.slice(3).map((donor, idx) => (
                  <div key={idx} className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-xs hover:border-amber-100 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 font-bold text-xs flex items-center justify-center">
                        #{idx + 4}
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900 leading-tight">{donor.name}</p>
                        <p className="text-[10px] text-gray-450 font-semibold">{donor.count} lượt quyên góp tích cực</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-extrabold text-slate-800 leading-tight">{formatVND(donor.amount)}</p>
                      <span className="text-[9px] font-bold text-rose-500 bg-rose-50/80 px-2 py-0.5 rounded-full uppercase tracking-wider font-sans">Đồng Hành</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </section>

      {/* UPCOMING EVENTS & NEWS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Events list */}
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-sky-600 font-bold text-sm tracking-wider uppercase">Đồng hành thực tế</span>
            <h2 className="text-3xl font-black text-slate-900">Sự Kiện Sắp Diễn Ra</h2>
          </div>

          <div className="space-y-6">
            {upcomingEvents.length === 0 ? (
              <p className="text-gray-500 italic px-4 py-8 bg-white rounded-2xl border text-center">Hiện tại chưa có sự kiện mới sắp diễn ra.</p>
            ) : (
              upcomingEvents.map((evt) => (
                <div key={evt.id} className="bg-white rounded-2xl overflow-hidden p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-5 hover:shadow-md transition-shadow">
                  <div className="w-full sm:w-40 h-32 bg-slate-200 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1 space-y-2">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-semibold text-sky-600">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{evt.date} • {evt.time}</span>
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-base line-clamp-1 hover:text-sky-600 transition-colors">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {evt.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-50">
                      <span className="text-gray-400 font-medium">TNV: {evt.volunteersRegistered}/{evt.maxVolunteers}</span>
                      <button 
                        onClick={() => navigateTo('/events')}
                        className="text-sky-600 font-bold hover:underline flex items-center gap-1"
                      >
                        Đăng ký tham gia <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Latest Blogs / News */}
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-emerald-600 font-bold text-sm tracking-wider uppercase">Báo cáo thực tế</span>
            <h2 className="text-3xl font-black text-slate-900">Tin Tức & Bài Viết Mới nhất</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {latestArticles.slice(0, 2).map((art) => (
              <div key={art.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col hover:shadow-md transition-shadow group">
                <div className="h-36 bg-slate-200 overflow-hidden">
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{art.category}</span>
                    <h3 className="font-bold text-slate-950 text-sm line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors">
                      {art.title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => navigateTo('/articles')}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 pt-2 border-t border-gray-50 self-start"
                  >
                    Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REASSURING TRUST & MESSAGE STATEMENT / TESTIMONIALS */}
      <section className="bg-gradient-to-br from-rose-500 to-rose-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_45%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <MessageSquare className="w-12 h-12 mx-auto stroke-[1.5] text-white/80" />
          <blockquote className="text-2xl font-serif italic font-medium leading-relaxed">
            "Thiện nguyện không nằm ở việc chúng ta cho đi bao nhiêu, mà là tình yêu chúng ta đặt vào hành động chia sẻ ấy. Mỗi đóng góp nhỏ đều là một phép màu tái sinh cuộc đời một số phận khó khăn."
          </blockquote>
          <div>
            <p className="font-extrabold text-lg">Mẹ Teresa</p>
            <p className="text-xs text-rose-100 tracking-widest uppercase mt-0.5">Vinh danh triết lý hành động vì cộng đồng</p>
          </div>
        </div>
      </section>

      {/* JOINT VOLUNTEER NEWSLETTER OR CONTACT FORM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Banner: Đăng ký nhận bản tin */}
        <div className="bg-sky-50 p-8 rounded-3xl border border-sky-100 flex flex-col justify-between space-y-6 lg:col-span-1">
          <div className="space-y-3">
            <h3 className="text-xl font-black text-slate-900">Đăng kí nhận bản tin email</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Nhận thông báo định kỳ, báo cáo dòng tiền đầu phát và danh sách tổng kết chiến dịch mổ tim, nước sạch miền Tây sớm nhất.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="space-y-3">
            <input 
              type="email" 
              placeholder="Nhập địa chỉ email của bạn..." 
              required
              value={emailForm}
              onChange={(e) => setEmailForm(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-xl border border-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500" 
            />
            <button 
              type="submit" 
              className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold uppercase rounded-xl transition-all shadow-md active:scale-95"
            >
              {isSubscribed ? 'Đã Đăng KýThành Công!' : 'Gửi Đăng Ký'}
            </button>
          </form>
        </div>

        {/* Contact direct form */}
        <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100/50 flex flex-col justify-between space-y-6 lg:col-span-2">
          <div className="space-y-3">
            <h3 className="text-xl font-black text-slate-900">Gửi Ý Kiến Đóng Góp Hoặc Giới Thiệu Hoàn Cảnh Khó Khăn</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Bạn phát hiện một hoàn cảnh thực sự éo le cần trợ giúp? Hãy gửi lại thông tin cho chúng tôi. Đội ngũ khảo sát bản địa sẽ chủ động xác minh trong vòng 24 - 48 giờ.
            </p>
          </div>
          <form onSubmit={handleContactSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="col-span-1 space-y-3 flex flex-col">
              <input 
                type="text" 
                placeholder="Họ và tên của bạn..." 
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-xl border border-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <input 
                type="text" 
                placeholder="Số điện thoại / Email liên hệ..." 
                required
                className="w-full px-4 py-3 text-sm rounded-xl border border-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <div className="col-span-1 space-y-3 flex flex-col">
              <textarea 
                placeholder="Mô tả tóm tắt hoàn cảnh và số điện thoại hỗ trợ của bên trung gian..." 
                rows={3}
                required
                value={contactMsg}
                onChange={(e) => setContactMsg(e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-xl border border-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none flex-1"
              />
            </div>
            <div className="col-span-1 sm:col-span-2 flex items-center justify-between pt-1">
              {contactSuccess && (
                <span className="text-xs font-bold text-rose-600 animate-pulse">Tin nhắn đã gửi! Chúng tôi chân thành cám ơn thông tin của bạn.</span>
              )}
              <button 
                type="submit" 
                className="ml-auto px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5"
              >
                Gửi Tin Nhắn <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
