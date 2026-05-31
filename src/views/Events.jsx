import React, { useState } from 'react';
import { useCharity } from '../context/CharityContext';
import { Calendar, Clock, MapPin, Users, Heart, Gift, Award, CheckCircle } from 'lucide-react';

const Events = () => {
  const { events, registerForEvent } = useCharity();
  const [selectedFilter, setSelectedFilter] = useState('all'); // all, upcoming, completed
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Registration Form state
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const filteredEvents = selectedFilter === 'all' 
    ? events 
    : events.filter(e => e.status === selectedFilter);

  const handleOpenRegister = (evt) => {
    setSelectedEvent(evt);
    setRegisterEmail('');
    setRegisterName('');
    setRegisterPhone('');
    setRegisterSuccess(false);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (selectedEvent && registerEmail.trim() && registerName.trim()) {
      registerForEvent(selectedEvent.id, {
        name: registerName,
        email: registerEmail.toLowerCase(),
        phone: registerPhone,
        status: 'pending', // default state
        paymentStatus: 'unpaid', // default state
        notes: 'Chưa có ghi chú'
      });
      setRegisterSuccess(true);
      setTimeout(() => {
        setRegisterSuccess(false);
        setSelectedEvent(null);
      }, 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fadeIn">
      {/* HEADER INTRODUCTION */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Sự Kiện Thiện Nguyện Đồng Hành</h1>
        <p className="text-gray-600">
          Đăng ký tham gia trực tiếp những chương trình hiến máu nhân đạo, phát cháo cứu trợ, hay trồng cây xanh. Mỗi sự góp sức bằng công lao động đều mang lại giá trị vô giá cho đời sống thực tế.
        </p>
      </div>

      {/* FILTER TABS */}
      <div className="flex border-b border-gray-200 max-w-md mx-auto justify-center">
        {[
          { id: 'all', label: 'Tất cả sự kiện' },
          { id: 'upcoming', label: 'Sắp diễn ra' },
          { id: 'completed', label: 'Đã hoàn thành' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`flex-1 text-center py-3 text-sm font-bold border-b-2 transition-all ${
              selectedFilter === tab.id
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-gray-500 hover:text-rose-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* EVENTS CARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredEvents.map((evt) => {
          const listLen = (evt.registeredVolunteers || []).length;
          const isFull = listLen >= evt.maxVolunteers;
          return (
            <div key={evt.id} className="bg-white rounded-3xl border border-gray-150 shadow-sm hover:shadow-lg overflow-hidden flex flex-col justify-between group transition-all duration-300">
              <div className="relative h-56 overflow-hidden bg-slate-200">
                <img src={evt.image} alt={evt.title} className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500" />
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase shadow-sm ${
                  evt.status === 'upcoming' 
                    ? 'bg-sky-500 text-white' 
                    : 'bg-gray-500 text-white'
                }`}>
                  {evt.status === 'upcoming' ? 'Sắp diễn ra' : 'Đã kết thúc'}
                </span>
              </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors leading-tight">
                    {evt.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {evt.description}
                  </p>

                  {/* Event details card info */}
                  <div className="space-y-2 text-xs font-semibold text-gray-600 pt-2">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-sky-500 shrink-0" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-sky-500 shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-sky-500 shrink-0" />
                      <span className="line-clamp-1">{evt.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-800 font-bold border-t border-gray-100 pt-3">
                      <Users className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>Tình nguyện viên đã đăng ký: <span className="text-rose-600 font-black">{listLen}</span> / {evt.maxVolunteers} người</span>
                    </div>
                  </div>
                </div>

                {/* Event Action Button */}
                {evt.status === 'completed' ? (
                  <div className="p-3 bg-gray-50 text-gray-500 rounded-xl text-center text-xs font-bold leading-normal">
                    ✓ Sự kiện đã diễn ra thành công tốt đẹp!
                  </div>
                ) : isFull ? (
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-xl text-center text-xs font-bold leading-normal border border-amber-100">
                    ⚠️ Lượt đăng ký đã kín chỗ! Cảm ơn bạn.
                  </div>
                ) : (
                  <button
                    onClick={() => handleOpenRegister(evt)}
                    className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs uppercase rounded-xl shadow-md transition-all shadow-rose-600/10"
                  >
                    Đăng Ký Làm Tình Nguyện Viên Ngay
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* CORE BENEFITS OF VOLUNTEERING */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 relative overflow-hidden mt-12 shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_left,rgba(244,63,94,0.4),transparent_50%)]" />
        
        <div className="space-y-3 relative z-10">
          <div className="w-10 h-10 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <h4 className="font-extrabold text-lg">Chia sẻ yêu thương</h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            Dành tặng thời gian thảnh thơi ngày cuối tuần của bạn để thắp sáng nụ cười cho những trẻ nhỏ và bệnh nhân nghèo bản xứ.
          </p>
        </div>

        <div className="space-y-3 relative z-10">
          <div className="w-10 h-10 bg-sky-500/20 text-sky-450 rounded-full flex items-center justify-center">
            <Gift className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-lg">Sống đẹp & nhân ái</h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            Trải nghiệm giá trị tinh thần sống cao cả của đạo lý thương người như thể thương thân của dân tộc Việt Nam.
          </p>
        </div>

        <div className="space-y-3 relative z-10">
          <div className="w-10 h-10 bg-emerald-500/20 text-emerald-450 rounded-full flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-lg">Ghi nhận cống hiến</h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            Nhận giấy chứng nhận hoàn thành công tác tình nguyện xã hội hữu ích từ Ban quản trị và các đối tác đồng phối hợp.
          </p>
        </div>
      </section>

      {/* VOLUNTEER REGISTER DIALOG */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-3xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-150 transform transition-all duration-300 animate-scaleUp">
            
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">ĐĂNG KÝ TÌNH NGUYỆN VIÊN</span>
                <h3 className="font-extrabold text-base leading-snug line-clamp-1 mt-0.5">{selectedEvent.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="p-1 px-2.5 rounded-full hover:bg-white/10 text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {registerSuccess ? (
              /* Success screen */
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-100 shadow-sm">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Ghi Danh Thành Công!</h4>
                <p className="text-gray-500 text-xs leading-relaxed max-w-xs mx-auto">
                  Tuyệt vời! Thông tin đăng ký đã được lưu nhận thành công. Ban điều phối viên sẽ gọi điện xác nhận và hướng dẫn chi tiết kế hoạch tập trung trong thời gian sớm nhất.
                </p>
                <div className="text-xs bg-gray-50 p-3 rounded-xl inline-block max-w-xs text-left font-semibold text-slate-700">
                  <p>Họ tên: {registerName}</p>
                  <p>Email: {registerEmail}</p>
                  <p>Số điện thoại: {registerPhone}</p>
                </div>
              </div>
            ) : (
              /* Register form flow */
              <form onSubmit={handleRegisterSubmit} className="p-6 space-y-4">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Cung cấp thông tin của bạn dưới đây. Ban điều phối viên sẽ kiểm duyệt email và kết nạp nhóm Zalo điều lôi chi hành tiện lợi.
                </p>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Họ và tên của bạn</label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Mã Email liên lạc</label>
                    <input
                      type="email"
                      required
                      placeholder="nva@gmail.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Số điện thoại liên lạc Zalo</label>
                    <input
                      type="tel"
                      required
                      placeholder="0912xxxxxx"
                      value={registerPhone}
                      onChange={(e) => setRegisterPhone(e.target.value)}
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-extrabold text-xs uppercase rounded-xl transition-all shadow-md pt-3.5 shadow-rose-600/10"
                >
                  Xác Nhận Đăng Ký Trực Tiếp
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default Events;
