import React, { useState } from 'react';
import { useCharity } from '../context/CharityContext';
import { 
  BarChart2, Heart, Calendar, FileText, Plus, Edit, Trash, 
  CheckCircle, XCircle, Clock, Users, ArrowRight, ShieldCheck, Download, Save, PlusCircle, Check, HelpCircle
} from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Single row representing a volunteer registration record with interactive actions
const VolunteerRow = ({ volunteer, eventId, updateVolunteer }) => {
  const [status, setStatus] = useState(volunteer.status || 'pending');
  const [hasPaidDeposit, setHasPaidDeposit] = useState(!!volunteer.hasPaidDeposit);
  const [guaranteedParticipation, setGuaranteedParticipation] = useState(!!volunteer.guaranteedParticipation);
  const [notes, setNotes] = useState(volunteer.notes || 'Chưa có ghi chú');
  const [isSaved, setIsSaved] = useState(false);

  const handleLocalSave = () => {
    updateVolunteer(eventId, volunteer.id, {
      status,
      hasPaidDeposit,
      guaranteedParticipation,
      notes
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  return (
    <tr className="hover:bg-slate-50/70 text-slate-700 transition-colors">
      <td className="py-3 px-4">
        <div className="font-extrabold text-slate-900">{volunteer.name || 'Thành viên ẩn danh'}</div>
        <div className="text-[10px] text-gray-500 font-medium">{volunteer.email}</div>
      </td>
      <td className="py-3 px-4 font-semibold text-slate-600">{volunteer.phone || 'Chưa có'}</td>
      <td className="py-3 px-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={`p-1.5 rounded-lg text-[11px] font-bold border ${
            status === 'Approved' 
              ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
              : status === 'Rejected'
              ? 'bg-rose-50 text-rose-650 border-rose-200'
              : 'bg-amber-50 text-amber-600 border-amber-200'
          }`}
        >
          <option value="Pending">Chờ duyệt</option>
          <option value="Approved">Duyệt tham gia</option>
          <option value="Rejected">Từ chối</option>
        </select>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hasPaidDeposit}
            onChange={(e) => setHasPaidDeposit(e.target.checked)}
            className="w-4 h-4 rounded text-rose-600 focus:ring-0 cursor-pointer"
          />
          <span className={`font-bold text-[10px] uppercase ${hasPaidDeposit ? 'text-emerald-600' : 'text-slate-400'}`}>
            {hasPaidDeposit ? 'Đã Đóng Phí ✓' : 'Chưa Đóng Phí'}
          </span>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={guaranteedParticipation}
            onChange={(e) => setGuaranteedParticipation(e.target.checked)}
            className="w-4 h-4 rounded text-cyan-600 focus:ring-0 cursor-pointer"
          />
          <span className={`font-bold text-[10px] uppercase ${guaranteedParticipation ? 'text-cyan-600' : 'text-slate-400'}`}>
            {guaranteedParticipation ? 'Có Mặt' : 'Chưa đến'}
          </span>
        </div>
      </td>
      <td className="py-3 px-4">
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Thêm ghi chú admin..."
          className="w-full max-w-xs p-1.5 text-[11px] border border-gray-200 rounded-lg text-slate-800 font-medium focus:ring-1 focus:ring-sky-500 focus:border-sky-500 hover:border-gray-300"
        />
      </td>
      <td className="py-3 px-4 text-right">
        <button
          onClick={handleLocalSave}
          className={`p-2 rounded-xl border font-bold text-[10px] uppercase flex items-center gap-1.5 ml-auto transition-all ${
            isSaved 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
              : 'bg-indigo-600 hover:bg-indigo-700 text-white border-transparent shadow-xs'
          }`}
        >
          {isSaved ? (
            <>
              <Check className="w-3.5 h-3.5" /> Đã lưu
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" /> Lưu lại
            </>
          )}
        </button>
      </td>
    </tr>
  );
};

const Admin = () => {
  const { 
    currentUser, campaigns, events, articles, donations,
    addCampaign, updateCampaign, deleteCampaign,
    addEvent, updateEvent, deleteEvent,
    addArticle, updateArticle, deleteArticle,
    updateDonationStatus, updateVolunteer,
    users, adminAddUser, adminUpdateUser, adminDeleteUser
  } = useCharity();

  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, campaigns, events, articles, donations

  // Forms state
  const [showCampForm, setShowCampForm] = useState(false);
  const [editingCampId, setEditingCampId] = useState(null);
  const [campTitle, setCampTitle] = useState('');
  const [campCategory, setCampCategory] = useState('Giáo dục');
  const [campShortDesc, setCampShortDescription] = useState('');
  const [campTarget, setCampTargetAmount] = useState('');
  const [campImage, setCampImage] = useState('');
  const [campStory, setCampStory] = useState('');

  const [showEventForm, setShowEventForm] = useState(false);
  const [evtTitle, setEvtTitle] = useState('');
  const [evtDate, setEvtDate] = useState('');
  const [evtTime, setEvtTime] = useState('');
  const [evtLocation, setEvtLocation] = useState('');
  const [evtImage, setEvtImage] = useState('');
  const [evtDesc, setEvtDescription] = useState('');
  const [evtMax, setEvtMax] = useState('100');

  const [showArticleForm, setShowArticleForm] = useState(false);
  const [artTitle, setArtTitle] = useState('');
  const [artAuthor, setArtAuthor] = useState('');
  const [artCategory, setArtCategory] = useState('Câu chuyện thành công');
  const [artShortContent, setArtShortContent] = useState('');
  const [artContent, setArtContent] = useState('');
  const [artImage, setArtImage] = useState('');

  // View registered volunteers list modal
  const [selectedEvtVolunteers, setSelectedEvtVolunteers] = useState(null);

  // User Management State Variables
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userRole, setUserRole] = useState('User');
  const [userPassword, setUserPassword] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // DASHBOARD CALCULATIONS
  const totalRaised = campaigns.reduce((acc, c) => acc + c.currentAmount, 0);
  const totalCampaigns = campaigns.length;
  const totalEventsCount = events.length;
  const totalVolunteersCount = events.reduce((acc, e) => acc + e.volunteersRegistered, 0);
  const successDonationsCount = donations.filter(d => d.status === 'success').length;
  const pendingDonations = donations.filter(d => d.status === 'pending');

  // Submit functions
  const handleCampSubmit = (e) => {
    e.preventDefault();
    if (!campStory || campStory.replace(/<[^>]*>/g, '').trim() === '') {
      alert('Vui lòng nhập đầy đủ câu chuyện chiến dịch!');
      return;
    }
    const payload = {
      title: campTitle,
      category: campCategory,
      shortDescription: campShortDesc,
      targetAmount: parseFloat(campTarget),
      image: campImage || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
      story: campStory
    };

    if (editingCampId) {
      updateCampaign(editingCampId, payload);
    } else {
      addCampaign(payload);
    }

    // reset and close
    setShowCampForm(false);
    setEditingCampId(null);
    setCampTitle('');
    setCampShortDescription('');
    setCampTargetAmount('');
    setCampImage('');
    setCampStory('');
  };

  const startEditCamp = (camp) => {
    setEditingCampId(camp.id);
    setCampTitle(camp.title);
    setCampCategory(camp.category);
    setCampShortDescription(camp.shortDescription);
    setCampTargetAmount(camp.targetAmount.toString());
    setCampImage(camp.image);
    setCampStory(camp.story);
    setShowCampForm(true);
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    addEvent({
      title: evtTitle,
      date: evtDate,
      time: evtTime,
      location: evtLocation,
      image: evtImage || 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=800',
      description: evtDesc,
      maxVolunteers: parseInt(evtMax) || 100
    });

    setShowEventForm(false);
    setEvtTitle('');
    setEvtDate('');
    setEvtTime('');
    setEvtLocation('');
    setEvtImage('');
    setEvtDescription('');
    setEvtMax('100');
  };

  const handleArticleSubmit = (e) => {
    e.preventDefault();
    if (!artContent || artContent.replace(/<[^>]*>/g, '').trim() === '') {
      alert('Vui lòng soạn thảo nội dung chi tiết bài viết!');
      return;
    }
    addArticle({
      title: artTitle,
      author: artAuthor || 'Quản trị viên',
      category: artCategory,
      shortContent: artShortContent,
      content: artContent,
      image: artImage || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
    });

    setShowArticleForm(false);
    setArtTitle('');
    setArtAuthor('');
    setArtShortContent('');
    setArtContent('');
    setArtImage('');
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim()) {
      alert('Vui lòng điền họ tên và email!');
      return;
    }
    const payload = {
      name: userName.trim(),
      email: userEmail.trim().toLowerCase(),
      phone: userPhone.trim(),
      role: userRole,
      password: userPassword || '123',
      avatar: userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
    };

    if (editingUserId) {
      adminUpdateUser(editingUserId, payload);
    } else {
      adminAddUser(payload);
    }

    setShowUserForm(false);
    setEditingUserId(null);
    setUserName('');
    setUserEmail('');
    setUserPhone('');
    setUserRole('User');
    setUserPassword('');
    setUserAvatar('');
  };

  const startEditUser = (usr) => {
    setEditingUserId(usr.id);
    setUserName(usr.name || '');
    setUserEmail(usr.email || '');
    setUserPhone(usr.phone || '');
    setUserRole(usr.role || 'User');
    setUserPassword(usr.password || '');
    setUserAvatar(usr.avatar || '');
    setShowUserForm(true);
  };

  // Check user roles and permissions
  const isSuperAdmin = currentUser?.role === 'Super Admin';
  const isFinanceManager = currentUser?.role === 'Finance Manager';
  const isEventCoordinator = currentUser?.role === 'Event Coordinator';

  // Helper component to show "No Permission" block
  const renderNoPermission = (allowedRoles = []) => {
    return (
      <div className="bg-white rounded-3xl border border-rose-100 p-8 text-center max-w-xl mx-auto my-12 shadow-xs">
        <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mx-auto mb-4 border border-rose-100 animate-bounce">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-black text-slate-950">Quyền Truy Cập Bị Hạn Chế</h3>
        <p className="text-xs text-slate-500 font-bold mt-2 leading-relaxed">
          Chức năng này chỉ dành cho tài khoản thuộc nhóm quyền: <span className="text-rose-600 font-extrabold">{allowedRoles.join(', ')}</span>.
          Vui lòng đăng nhập với tài khoản có thẩm quyền thích hợp để điều phối.
        </p>
        <div className="bg-slate-50 p-4 border border-slate-100 rounded-2xl text-[10px] text-slate-600 font-semibold text-left mt-6 leading-relaxed">
          🔒 <strong>Vai trò hiện tại của bạn:</strong> {currentUser ? `${currentUser.name} (${currentUser.role})` : 'Chưa đăng nhập'}<br />
          💡 Đăng nhập tài khoản Admin tổng hợp <code>superadmin@traitimvang.vn</code> để mở khóa toàn bộ quyền năng quản trị.
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* ACCESS BLOCK CHECK: User must be signed in & hold admin role */}
      {(!currentUser || currentUser.role === 'User') ? (
        <div className="bg-white rounded-3xl border border-gray-150 p-10 text-center max-w-lg mx-auto shadow-md">
          <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mx-auto mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-900">Yêu Cầu Quyền Quản Trị Viên</h3>
          <p className="text-xs text-slate-500 font-bold mt-2 leading-relaxed">
            Bạn cần đăng nhập vào hệ thống bằng tài khoản Ban tổ chức (Super Admin, Finance Manager, Event Coordinator) để truy cập chức năng này.
          </p>
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl text-[11px] text-amber-800 text-left mt-6 space-y-1.5 leading-relaxed font-semibold">
            <span className="font-extrabold text-amber-900 block mb-1">💡 Sử dụng tài khoản Demo dưới đây để đăng nhập ở góc trên bên phải:</span>
            • Admin Tổng Hợp: <code>superadmin@traitimvang.vn</code> (Mật khẩu: <code>123456</code>)<br />
            • Quản Lý Tài Chính: <code>finance@traitimvang.vn</code> (Mật khẩu: <code>123456</code>)<br />
            • Điều Phối Tình Nguyện: <code>coordinator@traitimvang.vn</code> (Mật khẩu: <code>123456</code>)
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* ADMIN TITLE BAR DESCRIPTION */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 md:px-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-2xl" />
            <div className="space-y-1 relative z-10">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Chế độ dành cho quản trị viên ({currentUser.role})</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Hệ Thống Quản Lý Trái Tim Vàng</h1>
              <p className="text-gray-400 text-xs">Chào mừng trở lại, {currentUser.name}! Thẩm quyền quản trị được áp dụng tự động theo chức vụ của bạn.</p>
            </div>
            <div className="flex gap-2 flex-shrink-0 relative z-10 font-bold text-xs bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
              <span className="px-3.5 py-2 rounded-xl text-emerald-450 bg-emerald-500/10 flex items-center gap-1">Hệ thống: Live ✓</span>
            </div>
          </div>

      {/* ADMIN TAB NAVIGATION BAR */}
      <div className="flex border-b border-gray-200 overflow-x-auto pb-0.5 scrollbar-thin">
        {[
          { id: 'dashboard', label: 'Dashboard Tổng Quan', icon: BarChart2 },
          { id: 'campaigns', label: 'Quản Lý Chiến Dịch', icon: Heart },
          { id: 'events', label: 'Quản Lý Sự Kiện', icon: Calendar },
          { id: 'articles', label: 'Quản Lý Bài Post', icon: FileText },
          { id: 'donations', label: 'Sao Kê & Giao Dịch', icon: CheckCircle },
          { id: 'users', label: 'Quản Lý Thành Viên', icon: Users },
        ].map((tab) => {
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3.5 border-b-2 font-bold text-sm shrink-0 transition-colors ${
                activeTab === tab.id
                  ? 'border-rose-600 text-rose-600'
                  : 'border-transparent text-gray-500 hover:text-rose-600'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DASHBOARD OVERVIEW */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-2xs">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Tổng quỹ gây dựng</p>
              <h4 className="text-2xl font-black text-rose-600 mt-1">{formatVND(totalRaised)}</h4>
              <p className="text-[10px] text-gray-400 font-medium mt-1">Từ {successDonationsCount} giao dịch sao kê ví</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-2xs">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Chiến dịch hoạt động</p>
              <h4 className="text-2xl font-black text-slate-800 mt-1">{totalCampaigns} Dự Án</h4>
              <p className="text-[10px] text-gray-400 font-medium mt-1">Mục tiêu trung bình ~250M</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-2xs">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Lượt tuyển tình nguyện</p>
              <h4 className="text-2xl font-black text-slate-800 mt-1">{totalVolunteersCount} Tình Nguyện</h4>
              <p className="text-[10px] text-gray-400 font-medium mt-1">Trên tổng quy mô {totalEventsCount} sự kiện</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-2xs">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Yêu cầu xét duyệt</p>
              <h4 className={`text-2xl font-black mt-1 ${pendingDonations.length > 0 ? 'text-amber-500 animate-pulse' : 'text-emerald-500'}`}>{pendingDonations.length} Chờ Duyệt</h4>
              <p className="text-[10px] text-gray-400 font-medium mt-1">Cần đối khớp lệnh chuyển khoản</p>
            </div>
          </div>

          {/* Table of pending transactions */}
          <div className="bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-xs">
            <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h3 className="font-extrabold text-slate-900 text-sm">Giao Dịch Chờ Đối Khớp Ngân Hàng (Sử dụng cho thử nghiệm duyệt live)</h3>
              <span className="shrink-0 px-2.5 py-1 bg-amber-100 text-amber-600 rounded text-[10px] font-bold">Mô tả: Nhấn nút duyệt để tự động cộng dòng tiền</span>
            </div>

            <div className="overflow-x-auto">
              {!isSuperAdmin && !isFinanceManager ? (
                <div className="p-10 text-center text-rose-650 font-bold text-xs bg-rose-50/20">
                  ⚠️ Phân hệ xét duyệt giao dịch & tài chính chỉ dành riêng cho Super Admin và Finance Manager (Kế toán).
                </div>
              ) : pendingDonations.length === 0 ? (
                <div className="p-10 text-center text-gray-450 italic text-sm">Hiện không có giao dịch đóng góp nào trong hàng chờ xét duyệt.</div>
              ) : (
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-50 text-[10px] text-gray-400 uppercase tracking-widest font-black border-b border-gray-100">
                    <tr>
                      <th className="py-4 px-6">ID GIAO DỊCH</th>
                      <th className="py-4 px-6">MỤC TIÊU DỰ ÁN</th>
                      <th className="py-4 px-6">NHÀ HẢO TÂM</th>
                      <th className="py-4 px-6">LƯỢNG TRONG QUỸ</th>
                      <th className="py-4 px-6">GỬI GẮM</th>
                      <th className="py-4 px-6">THỜI GIAN</th>
                      <th className="py-4 px-6 text-center">HÀNH ĐỘNG DUYỆT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-slate-700">
                    {pendingDonations.map((don) => (
                      <tr key={don.id} className="hover:bg-gray-50/80">
                        <td className="py-4 px-6 font-mono font-bold text-slate-950">{don.id}</td>
                        <td className="py-4 px-6 font-semibold max-w-xs truncate">{don.campaignTitle}</td>
                        <td className="py-4 px-6 font-bold">{don.donorName}</td>
                        <td className="py-4 px-6 font-black text-rose-500">{formatVND(don.amount)}</td>
                        <td className="py-4 px-6 italic text-xs">"{don.message}"</td>
                        <td className="py-4 px-6 text-xs text-gray-400">{don.timestamp}</td>
                        <td className="py-4 px-6 text-center flex justify-center gap-1.5 pt-4">
                          <button
                            onClick={() => updateDonationStatus(don.id, 'success')}
                            className="p-1.5 px-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg shadow-sm"
                          >
                            Duyệt hợp lệ
                          </button>
                          <button
                            onClick={() => updateDonationStatus(don.id, 'failed')}
                            className="p-1.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-lg"
                          >
                            Bác bỏ
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GENERAL CAMPAIGNS OPERATION */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6 animate-fadeIn">
          {!isSuperAdmin && !isFinanceManager ? (
            renderNoPermission(['Super Admin', 'Finance Manager'])
          ) : (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h3 className="font-extrabold text-slate-900 text-base">Tất Cả Chiến Dịch Gây Quỹ ({campaigns.length})</h3>
                <button
                  onClick={() => {
                    setEditingCampId(null);
                    setShowCampForm(true);
                  }}
                  className="shrink-0 px-4.5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-rose-650/15"
                >
                  <Plus className="w-4 h-4" /> Thêm Chiến Dịch Mới
                </button>
              </div>

              {/* Campaign Form Dialog */}
              {showCampForm && (
                <div className="bg-slate-50 p-6 rounded-2xl border border-gray-150 space-y-4 animate-fadeIn">
                  <h4 className="font-bold text-sm text-slate-900">{editingCampId ? 'Sửa thông tin chiến dịch' : 'Tạo mới chiến dịch nhân đạo'}</h4>
                  <form onSubmit={handleCampSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Tiêu đề dự án chiến dịch</label>
                      <input
                        type="text" required value={campTitle} onChange={(e) => setCampTitle(e.target.value)}
                        placeholder="e.g. Bình Lọc Nước RO Cho Trẻ Em nghèo Điện Biên"
                        className="w-full text-xs px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Phân loại lĩnh vực</label>
                      <select
                        value={campCategory} onChange={(e) => setCampCategory(e.target.value)}
                        className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-200"
                      >
                        <option value="Giáo dục">Giáo dục</option>
                        <option value="Y tế">Y tế</option>
                        <option value="Môi trường">Môi trường</option>
                        <option value="Hoàn cảnh khó khăn">Hoàn cảnh khó khăn</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Mục tiêu tài chính (VNĐ)</label>
                      <input
                        type="number" required value={campTarget} onChange={(e) => setCampTargetAmount(e.target.value)}
                        placeholder="e.g. 150000000"
                        className="w-full text-xs px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Địa chỉ ảnh chụp (URL rực rỡ)</label>
                      <input
                        type="text" value={campImage} onChange={(e) => setCampImage(e.target.value)}
                        placeholder="e.g. https://images.unsplash.com/photo-..."
                        className="w-full text-xs px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Tóm tắt mô tả ngắn (1-2 câu ngắn)</label>
                      <input
                        type="text" required value={campShortDesc} onChange={(e) => setCampShortDescription(e.target.value)}
                        placeholder="Tóm tắt ngắn gọn mục tiêu để hiển thị nhanh dạng thẻ cho chiến dịch..."
                        className="w-full text-xs px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Toàn bộ câu chuyện dự án (Sử dụng RichText Editor chỉnh sửa đa dạng)</label>
                      <div className="bg-white rounded-xl overflow-hidden border border-gray-250">
                        <ReactQuill
                          theme="snow"
                          value={campStory}
                          onChange={setCampStory}
                          placeholder="Viết đầy đủ câu chuyện dạt dào cảm xúc cho nhà hảo tâm tiếp cận dự án, in đậm, đổi màu, canh lề, chèn link..."
                          modules={{
                            toolbar: [
                              [{ 'header': [1, 2, 3, false] }],
                              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                              [{'list': 'ordered'}, {'list': 'bullet'}],
                              [{ 'color': [] }, { 'background': [] }],
                              ['link', 'clean']
                            ]
                          }}
                          className="min-h-[220px]"
                        />
                      </div>
                    </div>

                    <div className="col-span-1 sm:col-span-2 flex justify-end gap-2 pt-2">
                      <button
                        type="button" onClick={() => { setShowCampForm(false); setEditingCampId(null); }}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold rounded-xl"
                      >
                        Huỷ bỏ
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl"
                      >
                        Lưu chiến dịch
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Table display */}
              <div className="bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-gray-50 text-[10px] text-gray-400 uppercase tracking-widest font-black border-b border-gray-100">
                    <tr>
                      <th className="py-4 px-6">DỰ ÁN CHIẾN DỊCH</th>
                      <th className="py-4 px-6">LĨNH VỰC</th>
                      <th className="py-4 px-6">GÂY QUỸ ĐA ĐẠT</th>
                      <th className="py-4 px-6">MỤC TIÊU TIỂU KIỀU</th>
                      <th className="py-4 px-6">LƯỢT ỦNG HỘ</th>
                      <th className="py-4 px-6 text-center">HÀNH ĐỘNG</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-slate-700">
                    {campaigns.map((camp) => (
                      <tr key={camp.id} className="hover:bg-gray-50/50">
                        <td className="py-4 px-6 font-bold text-slate-900 max-w-sm"><p className="truncate">{camp.title}</p></td>
                        <td className="py-4 px-6"><span className="px-2 py-0.5 bg-gray-100 rounded text-gray-600 font-semibold">{camp.category}</span></td>
                        <td className="py-4 px-6 font-black text-rose-600">{formatVND(camp.currentAmount)}</td>
                        <td className="py-4 px-6 font-bold">{formatVND(camp.targetAmount)}</td>
                        <td className="py-4 px-6 font-bold">{camp.donorsCount} lượt</td>
                        <td className="py-4 px-6 text-center flex justify-center gap-1.5 pt-3">
                          <button
                            onClick={() => startEditCamp(camp)}
                            className="p-1 px-2.5 bg-gray-150 hover:bg-gray-200 text-slate-800 rounded font-bold"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => { if(confirm('Bạn có thực sự muốn xoá chiến dịch này và toàn bộ sao kê liên đới?')) deleteCampaign(camp.id); }}
                            className="p-1 px-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded font-bold"
                          >
                            Xoá
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB 3: GENERAL EVENTS MANAGEMENT */}
      {activeTab === 'events' && (
        <div className="space-y-6 animate-fadeIn">
          {!isSuperAdmin && !isEventCoordinator ? (
            renderNoPermission(['Super Admin', 'Event Coordinator'])
          ) : (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h3 className="font-extrabold text-slate-900 text-base">Chiến Dịch Tuyển Tình Nguyện Viên ({events.length})</h3>
                <button
                  onClick={() => setShowEventForm(true)}
                  className="shrink-0 px-4.5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-sky-655/15"
                >
                  <Plus className="w-4 h-4" /> Thêm Sự Kiện Tuyển Quân
                </button>
              </div>

              {/* Event creation form */}
              {showEventForm && (
                <div className="bg-slate-50 p-6 rounded-2xl border border-gray-150 space-y-4 animate-fadeIn">
                  <h4 className="font-bold text-sm text-slate-900">Chiêu mộ sự kiện thiện nguyện mới</h4>
                  <form onSubmit={handleEventSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Tên hoạt động tuyển dụng</label>
                      <input
                        type="text" required value={evtTitle} onChange={(e) => setEvtTitle(e.target.value)}
                        placeholder="e.g. Chiến dịch nhặt rác bảo vệ bãi biển Cà Mau"
                        className="w-full text-xs px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Ngày tổ chức</label>
                      <input
                        type="date" required value={evtDate} onChange={(e) => setEvtDate(e.target.value)}
                        className="w-full text-xs px-4 py-2.5 rounded-xl border border-gray-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Khung giờ thời gian</label>
                      <input
                        type="text" required value={evtTime} onChange={(e) => setEvtTime(e.target.value)}
                        placeholder="e.g. 08:00 - 16:30"
                        className="w-full text-xs px-4 py-2.5 rounded-xl border border-gray-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Vị trí địa điểm cụ thể</label>
                      <input
                        type="text" required value={evtLocation} onChange={(e) => setEvtLocation(e.target.value)}
                        placeholder="Văn phòng dã chiến địa phương..."
                        className="w-full text-xs px-4 py-2.5 rounded-xl border border-gray-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Số lượng TNV mục tiêu (Người tốt)</label>
                      <input
                        type="number" required value={evtMax} onChange={(e) => setEvtMax(e.target.value)}
                        placeholder="e.g. 100"
                        className="w-full text-xs px-4 py-2.5 rounded-xl border border-gray-200"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Hình ảnh banner (URL)</label>
                      <input
                        type="text" value={evtImage} onChange={(e) => setEvtImage(e.target.value)}
                        placeholder="URL ảnh chụp minh hoạ..."
                        className="w-full text-xs px-4 py-2.5 rounded-xl border border-gray-200"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Nhập lời giới thiệu yêu cầu hành động</label>
                      <textarea
                        required rows={3} value={evtDesc} onChange={(e) => setEvtDescription(e.target.value)}
                        placeholder="Nói rõ nhiệm vụ công việc, yêu cầu bảo hộ lao động cá nhân đầy đủ..."
                        className="w-full text-xs px-4 py-2.5 rounded-xl border border-gray-200 resize-none focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>

                    <div className="col-span-1 sm:col-span-2 flex justify-end gap-2 pt-1">
                      <button
                        type="button" onClick={() => setShowEventForm(false)}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold rounded-xl"
                      >
                        Huỷ
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl"
                      >
                        Khởi tạo tuyển quân
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Events table */}
              <div className="bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-gray-50 text-[10px] text-gray-400 uppercase tracking-widest font-black border-b border-gray-100">
                    <tr>
                      <th className="py-4 px-6">TÊN CHIẾN DỊCH HOẠT ĐỘNG</th>
                      <th className="py-4 px-6">NGÀY GIỜ</th>
                      <th className="py-4 px-6">ĐỊA ĐIỂM</th>
                      <th className="py-4 px-6">SỐ LƯỢT ĐĂNG KÍ</th>
                      <th className="py-4 px-6">DANH SÁCH DANH DANH</th>
                      <th className="py-4 px-6 text-center">XOÁ BỎ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-slate-700">
                    {events.map((evt) => {
                      const listLen = (evt.registeredVolunteers || []).length;
                      return (
                        <tr key={evt.id} className="hover:bg-gray-50/50">
                          <td className="py-4 px-6 font-bold text-slate-900 max-w-sm"><p className="truncate">{evt.title}</p></td>
                          <td className="py-4 px-6 text-gray-500">{evt.date} • {evt.time}</td>
                          <td className="py-4 px-6 font-medium max-w-xs truncate">{evt.location}</td>
                          <td className="py-4 px-6 font-bold text-sky-600">{listLen} / {evt.maxVolunteers} người</td>
                          <td className="py-4 px-6">
                            <button
                              onClick={() => setSelectedEvtVolunteers(evt)}
                              className="px-2.5 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-600 font-extrabold rounded text-[10px] border border-sky-150/40"
                            >
                              Xem d.sách ({listLen})
                            </button>
                          </td>
                          <td className="py-4 px-6 text-center pt-3 flex justify-center">
                            <button
                              onClick={() => { if(confirm('Huỷ bỏ hoạt động sự kiện này?')) deleteEvent(evt.id); }}
                              className="p-1 px-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded font-bold"
                            >
                              Huỷ bỏ
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB 4: ARTICLE POSTS MANAGEMENT */}
      {activeTab === 'articles' && (
        <div className="space-y-6 animate-fadeIn">
          {!isSuperAdmin ? (
            renderNoPermission(['Super Admin'])
          ) : (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h3 className="font-extrabold text-slate-900 text-base">Danh Sách Các Bài Viết Đã Đăng ({articles.length})</h3>
                <button
                  onClick={() => setShowArticleForm(true)}
                  className="shrink-0 px-4.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" /> Viết Bài Đăng Mới
                </button>
              </div>

              {/* Article Form fields creation */}
              {showArticleForm && (
                <div className="bg-slate-50 p-6 rounded-2xl border border-gray-150 space-y-4 animate-fadeIn">
                  <h4 className="font-bold text-sm text-slate-900">Soạn thảo bài viết truyền thống</h4>
                  <form onSubmit={handleArticleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Tiêu đề bài báo cáo</label>
                      <input
                        type="text" required value={artTitle} onChange={(e) => setArtTitle(e.target.value)}
                        placeholder="Ví dụ: Nụ cười hạnh phúc rạng ngời ngày đón các em học sinh..."
                        className="w-full text-xs px-4 py-2.5 rounded-xl border border-gray-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Họ tên Tác giả</label>
                      <input
                        type="text" required value={artAuthor} onChange={(e) => setArtAuthor(e.target.value)}
                        placeholder="Quản trị viên"
                        className="w-full text-xs px-4 py-2.5 rounded-xl border border-gray-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Chủ đề bài toán</label>
                      <select
                        value={artCategory} onChange={(e) => setArtCategory(e.target.value)}
                        className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-200"
                      >
                        <option value="Câu chuyện thành công">Câu chuyện thành công</option>
                        <option value="Cẩm nang chia sẻ">Cẩm nang chia sẻ</option>
                        <option value="Hoạt động nổi bật">Hoạt động nổi bật</option>
                      </select>
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Địa chỉ ảnh bìa (URL)</label>
                      <input
                        type="text" value={artImage} onChange={(e) => setArtImage(e.target.value)}
                        placeholder="e.g. https://images.unsplash.com/photo-..."
                        className="w-full text-xs px-4 py-2.5 rounded-xl border border-gray-200"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Tóm tắt mô tả trích yếu</label>
                      <input
                        type="text" required value={artShortContent} onChange={(e) => setArtShortContent(e.target.value)}
                        placeholder="Một đoạn văn trích yếu tóm lược lôi cuốn người đọc..."
                        className="w-full text-xs px-4 py-2.5 rounded-xl border border-gray-200"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Nội dung chi tiết bài viết (Sử dụng RichText Editor chỉnh sửa đa dạng)</label>
                      <div className="bg-white rounded-xl overflow-hidden border border-gray-250">
                        <ReactQuill
                          theme="snow"
                          value={artContent}
                          onChange={setArtContent}
                          placeholder="Viết nội dung bài đăng dạt dào cảm xúc, bôi đậm, in nghiêng, tạo liên kết, danh sách..."
                          modules={{
                            toolbar: [
                              [{ 'header': [1, 2, 3, false] }],
                              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                              [{'list': 'ordered'}, {'list': 'bullet'}],
                              [{ 'color': [] }, { 'background': [] }],
                              ['link', 'clean']
                            ]
                          }}
                          className="min-h-[220px]"
                        />
                      </div>
                    </div>

                    <div className="col-span-1 sm:col-span-2 flex justify-end gap-2 pt-1">
                      <button
                        type="button" onClick={() => setShowArticleForm(false)}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold rounded-xl"
                      >
                        Huỷ
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl"
                      >
                        Đăng tin lên cộng đồng
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Articles list UI display */}
              <div className="bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-gray-50 text-[10px] text-gray-400 uppercase tracking-widest font-black border-b border-gray-100">
                    <tr>
                      <th className="py-4 px-6">TIÊU ĐỀ BÀI POST</th>
                      <th className="py-4 px-6">TÁC GIẢ</th>
                      <th className="py-4 px-6">PHÂN LOẠI</th>
                      <th className="py-4 px-6">NGÀY ĐĂNG TẢI</th>
                      <th className="py-4 px-6 text-center">XOÁ BÀI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-slate-700">
                    {articles.map((art) => (
                      <tr key={art.id} className="hover:bg-gray-50/50">
                        <td className="py-4 px-6 font-bold text-slate-900 max-w-sm"><p className="truncate">{art.title}</p></td>
                        <td className="py-4 px-6 font-semibold text-slate-800">{art.author}</td>
                        <td className="py-4 px-6"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 font-bold rounded">{art.category}</span></td>
                        <td className="py-4 px-6 text-gray-450">{art.publishDate}</td>
                        <td className="py-4 px-6 text-center font-bold pt-3 flex justify-center">
                          <button
                            onClick={() => { if(confirm('Xoá bài viết này vĩnh viễn khỏi mục tin tức?')) deleteArticle(art.id); }}
                            className="p-1 px-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded"
                          >
                            Xoá
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB 5: LEGER AUDITING FOR ALL DONATIONS */}
      {activeTab === 'donations' && (
        <div className="space-y-6 animate-fadeIn">
          {!isSuperAdmin && !isFinanceManager ? (
            renderNoPermission(['Super Admin', 'Finance Manager'])
          ) : (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h3 className="font-extrabold text-slate-900 text-sm">Sổ Cái Quản Lý Sao Kê Quỹ Trái Tim Vàng ({donations.length} Lịch sử giao dịch)</h3>
                <span className="shrink-0 text-[10px] font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded">Đối khớp chuẩn xác 256-bit</span>
              </div>

              <div className="bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-gray-50 text-[10px] text-gray-400 uppercase tracking-widest font-black border-b border-gray-100">
                    <tr>
                      <th className="py-4 px-6">ID GIAO DỊCH</th>
                      <th className="py-4 px-6">DỰ ÁN ỦNG HỘ</th>
                      <th className="py-4 px-6">NHÀ HẢO TÂM</th>
                      <th className="py-4 px-6">SỐ TIỀN VÀO QUỸ</th>
                      <th className="py-4 px-6">HÌNH THỨC</th>
                      <th className="py-4 px-6">THỜI GIAN</th>
                      <th className="py-4 px-6 TRẠNG THÁI SAO KÊ">TRẠNG THÁI SAO KÊ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-slate-700">
                    {donations.map((don) => (
                      <tr key={don.id} className="hover:bg-gray-50/50">
                        <td className="py-4 px-6 font-mono font-bold text-slate-950">{don.id}</td>
                        <td className="py-4 px-6 max-w-xs truncate font-medium">{don.campaignTitle}</td>
                        <td className="py-4 px-6 font-bold">{don.donorName}</td>
                        <td className="py-4 px-6 font-black text-rose-500">{formatVND(don.amount)}</td>
                        <td className="py-4 px-6 uppercase font-semibold text-[10px]">{don.paymentMethod}</td>
                        <td className="py-4 px-6 text-gray-450">{don.timestamp}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3.5 py-1 text-xs font-bold rounded-full uppercase tracking-wider inline-block ${
                            don.status === 'success' 
                              ? 'bg-emerald-100 text-emerald-600' 
                              : don.status === 'pending'
                              ? 'bg-amber-100 text-amber-600 animate-pulse'
                              : 'bg-rose-100 text-rose-600'
                          }`}>
                            {don.status === 'success' ? 'Đã Quyết Toán' : don.status === 'pending' ? 'Chờ Khớp' : 'Thất bại'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* REGISTERED EMAILS LIST PER EVENT MODAL */}
      {selectedEvtVolunteers && (() => {
        // Fetch up-to-date event data from main events state to reflect edits immediately
        const liveEvent = events.find(e => e.id === selectedEvtVolunteers.id) || selectedEvtVolunteers;
        const listVolunteers = liveEvent.registeredVolunteers || [];

        // Export Excel/CSV function
        const handleExportCSV = () => {
          // Add Byte Order Mark for Excel UTF-8 support (\uFEFF)
          let csvContent = "\uFEFF";
          
          // Header row
          csvContent += "STT,Họ và Tên,Email,Số Điện Thoại,Trạng Thái Duyệt,Phí Cam Kết,Tham Gia Thực Tế,Ghi Chú Admin\n";
          
          // Data rows
          listVolunteers.forEach((v, idx) => {
            const statusText = v.status === 'Approved' ? 'Đã duyệt tham gia' : v.status === 'Rejected' ? 'Từ chối' : 'Chờ duyệt';
            const depositText = v.hasPaidDeposit ? 'Đã đóng phí' : 'Chưa đóng phí';
            const attendanceText = v.guaranteedParticipation ? 'Có mặt tham gia' : 'Chưa đến / Vắng mặt';
            const cleanName = (v.name || '').replace(/"/g, '""');
            const cleanEmail = (v.email || '').replace(/"/g, '""');
            const cleanPhone = (v.phone || '').replace(/"/g, '""');
            const cleanNotes = (v.notes || '').replace(/"/g, '""');
            
            csvContent += `"${idx + 1}","${cleanName}","${cleanEmail}","${cleanPhone}","${statusText}","${depositText}","${attendanceText}","${cleanNotes}"\n`;
          });

          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.setAttribute("href", url);
          link.setAttribute("download", `Danh_sach_tinh_nguyen_vien_${liveEvent.id}.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };

        return (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-3xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-gray-150 transform animate-scaleUp flex flex-col max-h-[90vh]">
              <div className="p-6 bg-slate-900 text-white flex justify-between items-center shrink-0">
                <div>
                  <p className="text-[10px] font-bold uppercase text-rose-500 tracking-wider">Bảng điều phối chi tiết</p>
                  <h4 className="font-extrabold text-base line-clamp-1 leading-snug">Chiến dịch: {liveEvent.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] uppercase rounded-xl shadow-md transition-all shadow-emerald-600/10"
                  >
                    <Download className="w-3.5 h-3.5" /> Xuất File Excel (CSV)
                  </button>
                  <button onClick={() => setSelectedEvtVolunteers(null)} className="p-1.5 px-3 rounded-xl hover:bg-white/10 font-bold text-xs">✕ Đóng</button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="text-xs font-semibold text-gray-500 space-y-1">
                    <p>Địa điểm: <span className="text-slate-800 font-bold">{liveEvent.location}</span></p>
                    <p>Ngày giờ: <span className="text-slate-800 font-bold">{liveEvent.date} • {liveEvent.time}</span></p>
                  </div>
                  <div className="text-xs text-right font-semibold text-gray-500 space-y-1">
                     <p>Giới hạn tuyển quân: <span className="text-rose-600 font-black">{liveEvent.maxVolunteers}</span> người</p>
                    <p>Đã ghi danh: <span className="text-sky-600 font-black">{listVolunteers.length}</span> người</p>
                  </div>
                </div>

                <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-slate-100 text-[10px] text-slate-500 uppercase tracking-widest font-black border-b border-gray-200">
                      <tr>
                        <th className="py-3 px-4">Thông tin thành viên</th>
                        <th className="py-3 px-4">SĐT</th>
                        <th className="py-3 px-4">Tham gia</th>
                        <th className="py-3 px-4">Đóng tiền / Phí</th>
                        <th className="py-3 px-4">Ghi chú duyệt</th>
                        <th className="py-3 px-4 text-right">Lưu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {listVolunteers.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="py-8 text-center text-gray-400 italic font-semibold">
                            Chưa có tình nguyện viên nào ghi danh tham gia sự kiện này.
                          </td>
                        </tr>
                      ) : (
                        listVolunteers.map((vol) => (
                          <VolunteerRow 
                            key={vol.id} 
                            volunteer={vol} 
                            eventId={liveEvent.id} 
                            updateVolunteer={updateVolunteer} 
                          />
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
        </div>
      )}

      {/* TAB 6: USER MANAGEMENT WORKFLOWS */}
      {activeTab === 'users' && (
        <div className="space-y-6 animate-fadeIn">
          {!isSuperAdmin ? (
            renderNoPermission(['Super Admin'])
          ) : (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Users className="w-5 h-5 text-rose-500" /> Bảng Quản Lý Nhân Sự & Thành Viên ({users.length} tài khoản)
                  </h3>
                  <p className="text-gray-400 text-[11px] mt-0.5">Thêm, sửa đổi phân quyền hoặc tạm khóa tài khoản người dùng của hệ thống.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingUserId(null);
                    setUserName('');
                    setUserEmail('');
                    setUserPhone('');
                    setUserRole('User');
                    setUserPassword('');
                    setUserAvatar('');
                    setShowUserForm(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs uppercase rounded-xl shadow-md transition-all shadow-rose-600/10"
                >
                  <PlusCircle className="w-4 h-4" /> Thêm Thành Viên Mới
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-gray-50 text-[10px] text-gray-400 uppercase tracking-widest font-black border-b border-gray-100">
                      <tr>
                        <th className="py-4 px-6 text-center w-16">Avatar</th>
                        <th className="py-4 px-6">Họ và Tên</th>
                        <th className="py-4 px-6">Email / Đăng nhập</th>
                        <th className="py-4 px-6">Số điện thoại</th>
                        <th className="py-4 px-6">Mật khẩu</th>
                        <th className="py-4 px-6">Quyền hạn</th>
                        <th className="py-4 px-6 text-right w-32">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-slate-700">
                      {users.map((usr) => (
                        <tr key={usr.id} className="hover:bg-gray-50/50">
                          <td className="py-4 px-6 text-center">
                            <img 
                              src={usr.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'} 
                              alt={usr.name}
                              className="w-10 h-10 rounded-full object-cover border-2 border-rose-50 mx-auto"
                            />
                          </td>
                          <td className="py-4 px-6 font-bold text-slate-900">{usr.name}</td>
                          <td className="py-4 px-6 font-medium text-slate-600">{usr.email}</td>
                          <td className="py-4 px-6 font-mono text-gray-500">{usr.phone || 'Chưa cập nhật'}</td>
                          <td className="py-4 px-6 font-mono font-bold text-gray-400">{usr.password}</td>
                          <td className="py-4 px-6">
                            <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider inline-block ${
                              usr.role === 'Super Admin' 
                                ? 'bg-rose-100 text-rose-600 border border-rose-200' 
                                : usr.role === 'Finance Manager'
                                ? 'bg-amber-100 text-amber-600 border border-amber-200'
                                : usr.role === 'Event Coordinator'
                                ? 'bg-sky-100 text-sky-600 border border-sky-200'
                                : 'bg-gray-100 text-gray-600 border border-gray-200'
                            }`}>
                              {usr.role || 'User'}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right space-x-1.5 shrink-0">
                            <button
                              onClick={() => startEditUser(usr)}
                              className="p-2 text-sky-600 hover:bg-sky-50 rounded-xl transition-all"
                              title="Sửa thành viên"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (usr.email === currentUser.email) {
                                  alert('Không thể tự xóa chính tài khoản đang đăng nhập hiện tại!');
                                  return;
                                }
                                if (window.confirm(`Bạn có chắc muốn xóa thành viên "${usr.name}"?`)) {
                                  adminDeleteUser(usr.id);
                                }
                              }}
                              className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                              title="Xóa thành viên"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* USER CREATE & EDIT DIALOG MODAL */}
      {showUserForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-3xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-150 transform animate-scaleUp">
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <p className="text-[10px] font-bold uppercase text-rose-500 tracking-wider">Trình biên tập thành viên</p>
                <h4 className="font-extrabold text-base">{editingUserId ? 'Cập Nhật Tài Khoản' : 'Thêm Tài Khoản Mới'}</h4>
              </div>
              <button 
                onClick={() => setShowUserForm(false)} 
                className="p-1 px-2.5 rounded-xl hover:bg-white/10 font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUserSubmit} className="p-6 space-y-4 text-xs font-semibold text-slate-700">
              <div className="space-y-1">
                <label className="text-gray-450 block">Họ và tên thành viên <span className="text-rose-500">*</span></label>
                <input 
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A..."
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-250 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl outline-hidden font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-450 block">Email đăng nhập <span className="text-rose-500">*</span></label>
                  <input 
                    type="email"
                    required
                    placeholder="name@gmail.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    disabled={!!editingUserId}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-250 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl outline-hidden font-medium disabled:opacity-60"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-450 block">Mật khẩu đăng nhập <span className="text-rose-500">*</span></label>
                  <input 
                    type="text"
                    required
                    placeholder="Mật khẩu bảo mật"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-250 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl outline-hidden font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-450 block">Số điện thoại liên hệ</label>
                  <input 
                    type="tel"
                    placeholder="Ví dụ: 0987654321"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-250 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl outline-hidden font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-450 block">Phân quyền vai trò <span className="text-rose-500">*</span></label>
                  <select
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-250 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl outline-hidden"
                  >
                    <option value="User">User (Thành viên quyên góp)</option>
                    <option value="Super Admin">Super Admin (Tổng quản trị viên)</option>
                    <option value="Finance Manager font-semibold">Finance Manager (Thủ quỹ tài chính)</option>
                    <option value="Event Coordinator font-semibold">Event Coordinator (Hợp tác sự kiện)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-450 block">Ảnh đại diện (Avatar url)</label>
                <div className="flex gap-3">
                  <input 
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={userAvatar}
                    onChange={(e) => setUserAvatar(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-250 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl outline-hidden font-mono text-[10px]"
                  />
                  <img 
                    src={userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'} 
                    alt="Preview"
                    className="w-10 h-10 rounded-full object-cover border border-gray-250 bg-slate-100"
                  />
                </div>
                <p className="text-[10px] text-gray-400 font-medium">Bấm chọn một ảnh mẫu bên dưới để đổi nhanh:</p>
                <div className="flex gap-2 p-1 bg-gray-50 rounded-xl border border-gray-150 overflow-x-auto scrollbar-none">
                  {[
                    { name: 'Boy 1', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150' },
                    { name: 'Girl 1', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
                    { name: 'Boy 2', url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150' },
                    { name: 'Girl 2', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150' },
                    { name: 'Boy 3', url: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=150' },
                    { name: 'Girl 3', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150' },
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setUserAvatar(preset.url)}
                      className={`flex-shrink-0 w-8 h-8 rounded-full overflow-hidden border-2 ${
                        userAvatar === preset.url ? 'border-rose-500 ring-2 ring-rose-200' : 'border-transparent'
                      }`}
                      title={preset.name}
                    >
                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowUserForm(false)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-slate-800 font-extrabold uppercase rounded-xl"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold uppercase rounded-xl shadow-md transition-all shadow-rose-600/10"
                >
                  {editingUserId ? 'Lưu cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
