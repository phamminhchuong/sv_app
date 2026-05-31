import React, { useState, useEffect } from 'react';
import { 
  Heart, Calendar, FileText, Users, ShieldAlert, Award, Menu, X, Settings, 
  User as UserIcon, LogOut, Bell, DollarSign, CheckCircle2, AlertCircle, Eye, Info
} from 'lucide-react';
import { useCharity } from './context/CharityContext';
import Home from './views/Home';
import Campaigns from './views/Campaigns';
import Events from './views/Events';
import Articles from './views/Articles';
import AboutUs from './views/AboutUs';
import Admin from './views/Admin';

function App() {
  const { 
    currentUser, login, logout, registerUser, notifications, markNotificationsAsRead, donations, events 
  } = useCharity();

  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash;
    return hash ? hash.replace('#', '') : '/';
  });
  
  const [routeParams, setRouteParams] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal Auth States
  const [showAuthModal, setShowCampAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // login / register
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard Modal State for standard Users
  const [showUserDashboard, setShowUserDashboard] = useState(false);

  // Sync hash with currentRoute for standard single-page bookmarkable compatibility
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentRoute(hash || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (path, params = {}) => {
    setRouteParams(params);
    window.location.hash = path;
    setCurrentRoute(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    if (authMode === 'login') {
      const res = login(authEmail, authPassword);
      if (res.success) {
        setShowCampAuthModal(false);
        setAuthEmail('');
        setAuthPassword('');
      } else {
        setAuthError(res.message);
      }
    } else {
      if (!authName || !authEmail || !authPassword || !authPhone) {
        setAuthError('Vui lòng nhập đầy đủ các trường thông tin!');
        return;
      }
      const res = registerUser(authName, authEmail, authPassword, authPhone);
      if (res.success) {
        setShowCampAuthModal(false);
        setAuthEmail('');
        setAuthPassword('');
        setAuthName('');
        setAuthPhone('');
      } else {
        setAuthError(res.message);
      }
    }
  };

  const unreadNotifCount = currentUser 
    ? notifications.filter(n => n.targetEmail.toLowerCase() === currentUser.email.toLowerCase() && !n.isRead).length
    : 0;

  const userDonations = currentUser
    ? donations.filter(d => d.donorEmail && d.donorEmail.toLowerCase() === currentUser.email.toLowerCase())
    : [];

  const userEventsRegistered = currentUser
    ? events.filter(evt => (evt.registeredVolunteers || []).some(vol => vol.email.toLowerCase() === currentUser.email.toLowerCase()))
    : [];

  const getVolRecordForEvent = (evt) => {
    if (!currentUser) return null;
    return (evt.registeredVolunteers || []).find(vol => vol.email.toLowerCase() === currentUser.email.toLowerCase());
  };

  const [activeDashboardTab, setActiveDashboardTab] = useState('notifications'); // notifications, donations, events

  // Custom User Dashboard Modal Content
  const renderUserDashboardModal = () => {
    if (!showUserDashboard || !currentUser) return null;

    const userNotifications = notifications.filter(
      (n) => n.targetEmail.toLowerCase() === currentUser.email.toLowerCase()
    );

    return (
      <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Dashboard Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <UserIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Tài Khoản Của Tôi</h3>
                <p className="text-xs text-slate-500 font-bold">{currentUser.name} — {currentUser.email}</p>
              </div>
            </div>
            <button
              onClick={() => setShowUserDashboard(false)}
              className="p-2 rounded-xl hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selection */}
          <div className="flex border-b border-gray-100 bg-white">
            <button
              onClick={() => setActiveDashboardTab('notifications')}
              className={`flex-grow py-4 text-center font-extrabold text-xs tracking-wider uppercase border-b-2 transition-all flex items-center justify-center gap-2 ${
                activeDashboardTab === 'notifications'
                  ? 'border-rose-650 text-rose-650 bg-rose-50/20'
                  : 'border-transparent text-gray-500 hover:text-slate-800'
              }`}
            >
              <Bell className="w-4 h-4" />
              Thông Báo
              {unreadNotifCount > 0 && (
                <span className="bg-rose-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {unreadNotifCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveDashboardTab('donations')}
              className={`flex-grow py-4 text-center font-extrabold text-xs tracking-wider uppercase border-b-2 transition-all flex items-center justify-center gap-2 ${
                activeDashboardTab === 'donations'
                  ? 'border-rose-650 text-rose-650 bg-rose-50/20'
                  : 'border-transparent text-gray-500 hover:text-slate-800'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              Lịch Sử Quyên Góp ({userDonations.length})
            </button>
            <button
              onClick={() => setActiveDashboardTab('events')}
              className={`flex-grow py-4 text-center font-extrabold text-xs tracking-wider uppercase border-b-2 transition-all flex items-center justify-center gap-2 ${
                activeDashboardTab === 'events'
                  ? 'border-rose-650 text-rose-650 bg-rose-50/20'
                  : 'border-transparent text-gray-500 hover:text-slate-800'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Sự Kiện Đã Đăng Ký ({userEventsRegistered.length})
            </button>
          </div>

          {/* Interactive Content Body */}
          <div className="flex-grow overflow-y-auto p-6 bg-slate-50/50">
            {activeDashboardTab === 'notifications' && (
              <div className="space-y-3">
                {userNotifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500 font-bold">Bạn không có thông báo nào từ ban tổ chức.</p>
                  </div>
                ) : (
                  userNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        notif.isRead
                          ? 'bg-white border-gray-150 opacity-75'
                          : 'bg-rose-50/40 border-rose-100 shadow-xs'
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className={`p-2 rounded-xl self-start ${notif.isRead ? 'bg-gray-100 text-gray-500' : 'bg-rose-100 text-rose-600'}`}>
                          <Info className="w-4 h-4" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-400 font-bold">
                              {new Date(notif.createdAt).toLocaleString('vi-VN')}
                            </span>
                            {!notif.isRead && (
                              <span className="px-2 py-0.5 bg-rose-100 text-rose-700 rounded-full text-[9px] font-extrabold">Mới</span>
                            )}
                          </div>
                          <p className="text-xs font-bold text-slate-800 mt-1">{notif.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeDashboardTab === 'donations' && (
              <div className="space-y-4">
                {userDonations.length === 0 ? (
                  <div className="text-center py-12">
                    <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500 font-bold">Bạn chưa thực hiện giao dịch quyên góp nào.</p>
                    <button
                      onClick={() => {
                        setShowUserDashboard(false);
                        navigateTo('/campaigns');
                      }}
                      className="mt-4 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs uppercase rounded-xl transition-all"
                    >
                      Ủng Hộ Chiến Dịch Ngay
                    </button>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-xs">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-gray-100 text-[10px] font-black uppercase text-gray-400 tracking-wider">
                          <th className="py-3 px-4">Thời gian</th>
                          <th className="py-3 px-4">Chiến dịch</th>
                          <th className="py-3 px-4">Số tiền</th>
                          <th className="py-3 px-4">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-xs font-bold text-slate-700">
                        {userDonations.map((d) => (
                          <tr key={d.id} className="hover:bg-gray-50/50">
                            <td className="py-3 px-4 text-gray-400">
                              {new Date(d.date).toLocaleDateString('vi-VN')}
                            </td>
                            <td className="py-3 px-4 text-slate-900 font-extrabold">
                              {d.campaignTitle}
                            </td>
                            <td className="py-3 px-4 text-rose-650 font-black">
                              {d.amount.toLocaleString('vi-VN')}đ
                            </td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                                d.verified
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                  : 'bg-amber-50 text-amber-700 border border-amber-100'
                              }`}>
                                {d.verified ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5 animate-pulse" />}
                                {d.verified ? 'Đã đối soát' : 'Chờ xác nhận'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeDashboardTab === 'events' && (
              <div className="space-y-4">
                {userEventsRegistered.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500 font-bold">Bạn chưa đăng ký tình nguyện sự kiện nào.</p>
                    <button
                      onClick={() => {
                        setShowUserDashboard(false);
                        navigateTo('/events');
                      }}
                      className="mt-4 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs uppercase rounded-xl transition-all"
                    >
                      Xem Các Sự Kiện Sắp Tới
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {userEventsRegistered.map((evt) => {
                      const vol = getVolRecordForEvent(evt);
                      return (
                        <div key={evt.id} className="bg-white rounded-2xl border border-gray-150 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full text-[9px] font-extrabold uppercase">
                              {evt.date}
                            </span>
                            <h4 className="text-sm font-black text-slate-900">{evt.title}</h4>
                            <p className="text-xs text-slate-500 font-bold">📍 {evt.location}</p>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-3">
                            {/* Attendance status */}
                            <div className="flex flex-col items-end">
                              <span className="text-[10px] text-gray-400 font-black uppercase text-right">Trạng thái</span>
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black ${
                                vol?.status === 'Approved'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                  : vol?.status === 'Pending'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-100'
                                  : 'bg-rose-50 text-rose-700 border border-rose-150'
                              }`}>
                                {vol?.status === 'Approved' ? 'Đã duyệt' : vol?.status === 'Pending' ? 'Đang duyệt' : 'Đã từ chối'}
                              </span>
                            </div>

                            {/* Guaranteed payment status */}
                            <div className="flex flex-col items-end border-l border-gray-150 pl-3">
                              <span className="text-[10px] text-gray-400 font-black uppercase text-right">Phí cam kết</span>
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                                vol?.hasPaidDeposit
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                  : 'bg-slate-50 text-slate-650 border border-slate-100'
                              }`}>
                                {vol?.hasPaidDeposit ? 'Đã đóng' : 'Chưa đóng / Miễn phí'}
                              </span>
                            </div>

                            {/* Guaranteed participation */}
                            <div className="flex flex-col items-end border-l border-gray-150 pl-3">
                              <span className="text-[10px] text-gray-400 font-black uppercase text-right">Tham gia thực tế</span>
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                                vol?.guaranteedParticipation
                                  ? 'bg-cyan-50 text-cyan-700 border border-cyan-100'
                                  : 'bg-slate-50 text-slate-655 border border-slate-100'
                              }`}>
                                {vol?.guaranteedParticipation ? 'Đã tham gia' : 'Vắng mặt / Chưa xác thực'}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-100 bg-slate-50 text-right">
            <button
              onClick={() => setShowUserDashboard(false)}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs uppercase rounded-xl transition-all"
            >
              Đóng bảng điều khiển
            </button>
          </div>

        </div>
      </div>
    );
  };

  {/* RENDER AUTHENTICATION REGISTER/LOGIN MODEL */}
  const renderAuthModal = () => {
    if (!showAuthModal) return null;
    return (
      <div className="fixed inset-0 z-[120] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          <div className="p-6 bg-slate-50 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">
              {authMode === 'login' ? 'Đăng Nhập Tài Khoản' : 'Đăng Ký Thành Viên'}
            </h3>
            <button
              onClick={() => setShowCampAuthModal(false)}
              className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-750 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="p-6 space-y-4">
            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-xs font-bold leading-relaxed flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {authMode === 'register' && (
              <>
                <div>
                  <label className="block text-[11px] font-black uppercase text-slate-500 mb-1.5">Họ & Tên</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-bold focus:outline-hidden focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase text-slate-500 mb-1.5">Số điện thoại</label>
                  <input
                    type="tel"
                    required
                    placeholder="0987654321"
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-bold focus:outline-hidden focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] font-black uppercase text-slate-500 mb-1.5">Email liên hệ</label>
              <input
                type="email"
                required
                placeholder="example@gmail.com"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-bold focus:outline-hidden focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase text-slate-500 mb-1.5">Mật khẩu bảo mật</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-bold focus:outline-hidden focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase rounded-xl tracking-wider shadow-md transition-all active:scale-98"
            >
              {authMode === 'login' ? 'Đăng Nhập Trực Tiếp' : 'Hoàn Tất Đăng Ký'}
            </button>

            <div className="text-center pt-2 border-t border-gray-100">
              {authMode === 'login' ? (
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setAuthError('');
                  }}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  Chưa có tài khoản? Đăng ký tại đây
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setAuthError('');
                  }}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  Đã có tài khoản? Đăng nhập ngay
                </button>
              )}
            </div>
            
            <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl text-amber-800 text-[10px] font-semibold leading-relaxed">
              💡 <strong>Tài khoản mẫu:</strong><br />
              • Admin chính: <code>superadmin@traitimvang.vn</code> (Mật khẩu: <code>123456</code>)<br />
              • Kế toán tài chính: <code>finance@traitimvang.vn</code> (Mật khẩu: <code>123456</code>)<br />
              • Điều phối viên: <code>coordinator@traitimvang.vn</code> (Mật khẩu: <code>123456</code>)<br />
              • Tình nguyện viên mẫu: <code>volunteer@gmail.com</code> (Mật khẩu: <code>123456</code>)
            </div>
          </form>

        </div>
      </div>
    );
  };

  const navLinks = [
    { path: '/', label: 'Trang Chủ', icon: Heart },
    { path: '/campaigns', label: 'Quyên Gây Quỹ', icon: Heart },
    { path: '/events', label: 'Sự Kiện', icon: Calendar },
    { path: '/articles', label: 'Tin Tức', icon: FileText },
    { path: '/about', label: 'Về Chúng Tôi', icon: Users },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      
      {/* GLOBAL MODALS */}
      {renderAuthModal()}
      {renderUserDashboardModal()}

      {/* ANNOUNCEMENT BANNER */}
      <div className="bg-gradient-to-r from-rose-600 to-rose-700 text-white text-xs font-bold py-2.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
        Hệ Thống Trái Tim Vàng 100% Minh Bạch, Cập Nhật Đối Soát Tự Động Theo Thời Real-Time!
      </div>
      
      {/* HEADER NAVBAR CONTAINER WITH GLASSMORPHISM AND SMOOTH STICKINESS */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-150/70 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* LOGO */}
            <div 
              onClick={() => navigateTo('/')} 
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-11 h-11 bg-gradient-to-br from-rose-500 to-rose-650 rounded-2xl flex items-center justify-center shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform duration-300">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <div>
                <span className="text-sm font-black tracking-tight text-slate-900 block leading-tight">TRÁI TIM VÀNG</span>
                <span className="text-[9px] font-bold text-rose-650 uppercase tracking-widest block -mt-0.5">Nền Tảng Thiện Nguyện Số</span>
              </div>
            </div>

            {/* DESKTOP NAV LINKS */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigateTo(link.path)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
                    currentRoute === link.path
                      ? 'bg-rose-50 text-rose-650'
                      : 'text-gray-650 hover:bg-gray-100 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* ACTION DIRECT BUTTONS */}
            <div className="hidden md:flex items-center gap-3">
              {/* Notifications and Profile triggers */}
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setShowUserDashboard(true);
                      markNotificationsAsRead(currentUser.email);
                    }}
                    className="p-2.5 rounded-xl border border-gray-150 text-slate-700 bg-white hover:bg-gray-50 relative flex items-center justify-center transition-all"
                    title="Thông báo & Quản lý của tôi"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadNotifCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                        {unreadNotifCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      if (currentUser.role && currentUser.role !== 'User') {
                        navigateTo('/admin');
                      } else {
                        setShowUserDashboard(true);
                      }
                    }}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-rose-100 bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-xs transition-all max-w-[180px]"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span className="truncate">{currentUser.name} ({currentUser.role || 'Member'})</span>
                  </button>

                  <button
                    onClick={() => logout()}
                    className="p-2.5 rounded-xl border border-gray-150 text-rose-600 bg-white hover:bg-rose-50 flex items-center justify-center transition-all"
                    title="Đăng xuất khỏi hệ thống"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setAuthError('');
                    setShowCampAuthModal(true);
                  }}
                  className="flex items-center gap-1.5 p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-slate-750 font-bold text-xs shadow-2xs transition-all"
                >
                  <UserIcon className="w-4 h-4 text-rose-500" /> Đăng nhập / Đăng ký
                </button>
              )}

              {/* Admin Panel Direct Button for Authorized Users */}
              {currentUser && currentUser.role && currentUser.role !== 'User' && (
                <button
                  onClick={() => navigateTo('/admin')}
                  className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
                    currentRoute === '/admin'
                      ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                  title="Tru cập trang Quản lý Admin"
                >
                  <Settings className="w-4 h-4" /> Bàn điều phối
                </button>
              )}
              
              <button
                onClick={() => navigateTo('/campaigns')}
                className="px-5 py-3 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-md transition-all shadow-rose-500/10"
              >
                Quyên Góp Ngay
              </button>
            </div>

            {/* MOBILE MENU TOGGLE BUTTON */}
            <div className="md:hidden flex items-center gap-2">
              {currentUser ? (
                <button
                  onClick={() => {
                    setShowUserDashboard(true);
                    markNotificationsAsRead(currentUser.email);
                  }}
                  className="p-2 rounded-lg border bg-white border-gray-200 text-slate-700 relative"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotifCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                      {unreadNotifCount}
                    </span>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setAuthError('');
                    setShowCampAuthModal(true);
                  }}
                  className="p-2 rounded-lg border bg-white border-gray-200 text-slate-700 text-xs font-bold"
                >
                  Đăng nhập
                </button>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl hover:bg-gray-100 text-slate-800"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* MOBILE MENU DROPDOWN LIST */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-2 shadow-inner">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigateTo(link.path)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold ${
                  currentRoute === link.path
                    ? 'bg-rose-50 text-rose-650'
                    : 'text-gray-650 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => navigateTo('/campaigns')}
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase rounded-xl tracking-wider shadow-md text-center block mt-4"
            >
              Quyên Góp Ngay
            </button>
          </div>
        )}
      </header>

      {/* CORE BODY SWITCH SELECTOR ROUTE PATH MAPPINGS */}
      <main className="flex-grow">
        {currentRoute === '/' && <Home navigateTo={navigateTo} />}
        {currentRoute === '/campaigns' && <Campaigns initialSelectedCampaignId={routeParams.campaignId} />}
        {currentRoute === '/events' && <Events />}
        {currentRoute === '/articles' && <Articles />}
        {currentRoute === '/about' && <AboutUs />}
        {currentRoute === '/admin' && <Admin />}
      </main>

      {/* FOOTER CONTAINER STRUCTURE */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 col-span-1 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="w-5.5 h-5.5 text-white fill-current" />
                </div>
                <span className="text-base font-black tracking-tight">TRÁI TIM VÀNG</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                Nền tảng quyên góp số độc lập, kết nối công bằng, cam kết đóng gói toàn vẹn giá trị dòng tiền trao gửi, minh bạch dữ liệu sổ cái tự động 100%.
              </p>
              <div className="flex gap-4 text-xs font-semibold text-slate-500">
                <span>© 2026 Trái Tim Vàng. All rights reserved.</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-200">Điều hướng nhanh</h4>
              <div className="flex flex-col gap-2.5 text-xs text-slate-400 font-semibold">
                <button onClick={() => navigateTo('/')} className="hover:text-rose-500 text-left">Trang chủ</button>
                <button onClick={() => navigateTo('/campaigns')} className="hover:text-rose-500 text-left">Kêu gọi gây quỹ</button>
                <button onClick={() => navigateTo('/events')} className="hover:text-rose-500 text-left">Đăng ký sự kiện</button>
                <button onClick={() => navigateTo('/about')} className="hover:text-rose-500 text-left">Báo cáo kiểm toán</button>
                <button onClick={() => navigateTo('/admin')} className="hover:text-rose-500 text-left text-rose-500/80">Quản trị viên (Admin)</button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-200">Liên hệ trụ sở</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                📍 Tầng 12, Keangnam Landmark Tower, Phạm Hùng, Nam Từ Liêm, Hà Nội.<br />
                📞 Hotline 24/7: 1800 6868 (Miễn phí cước cuộc gọi).<br />
                📨 Email: support@traitimvang.org.vn
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-center gap-4 text-xs text-slate-500 font-semibold">
            <p>Được xây dựng nhiệt huyết bởi cộng đồng Công nghệ Nhân văn Việt Nam.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Điều khoản bảo mật</a>
              <span>•</span>
              <a href="#" className="hover:underline">Chính sách minh bạch hóa</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default App;
