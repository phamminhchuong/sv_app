import React, { useState, useEffect } from 'react';
import { useCharity } from '../context/CharityContext';
import { Heart, Plus, Users, Award, Shield, Check, QrCode } from 'lucide-react';

const Campaigns = ({ initialSelectedCampaignId }) => {
  const { campaigns, donations, addDonation, currentUser } = useCharity();
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  
  // Modals
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donateAmount, setDonateAmount] = useState(200000);
  const [customAmount, setDonateCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [hideName, setHideName] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('chuyển khoản');
  const [donationStep, setDonationStep] = useState(1); // 1 = Form, 2 = Pay/QR, 3 = Success
  const [generatedTxnId, setGeneratedTxnId] = useState('');

  // Handle parameter passing from home page
  useEffect(() => {
    if (initialSelectedCampaignId) {
      const camp = campaigns.find(c => c.id === initialSelectedCampaignId);
      if (camp) {
        setSelectedCampaign(camp);
        // Scroll to top of content
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [initialSelectedCampaignId, campaigns]);

  const categories = ['Tất cả', 'Giáo dục', 'Môi trường', 'Y tế', 'Hoàn cảnh khó khăn'];

  const filteredCampaigns = selectedCategory === 'Tất cả' 
    ? campaigns 
    : campaigns.filter(c => c.category === selectedCategory);

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getCampaignProgress = (camp) => {
    return Math.min(100, Math.round((camp.currentAmount / camp.targetAmount) * 100));
  };

  const handleOpenDonate = (camp) => {
    setSelectedCampaign(camp);
    setDonationStep(1);
    setDonateAmount(200000);
    setDonateCustomAmount('');
    setDonorName(currentUser ? currentUser.name : '');
    setDonorEmail(currentUser ? currentUser.email : '');
    setDonorMessage('');
    setHideName(false);
    setPaymentMethod('chuyển khoản');
    setShowDonateModal(true);
  };

  const handleSelectAmount = (amount) => {
    setDonateAmount(amount);
    setDonateCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    setDonateCustomAmount(val);
    setDonateAmount(val ? parseInt(val) : 0);
  };

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    if (!donateAmount || donateAmount < 10000) {
      alert('Vui lòng quyên góp tối thiểu 10,000 VND.');
      return;
    }
    setDonationStep(2);
  };

  const handleConfirmPayment = () => {
    // Process donation registration standard in context
    const finalAmount = donateAmount;
    const finalName = hideName ? 'Ẩn danh' : (donorName.trim() || 'Nhà hảo tâm ẩn danh');
    
    const txnId = addDonation({
      campaignId: selectedCampaign.id,
      campaignTitle: selectedCampaign.title,
      donorName: finalName,
      donorEmail: donorEmail.trim().toLowerCase(),
      amount: finalAmount,
      message: donorMessage.trim() || 'Ủng hộ chiến dịch ý nghĩa này.',
      paymentMethod: paymentMethod,
      status: paymentMethod === 'chuyển khoản' ? 'success' : 'success' // Immediately activate success for mock demo!
    });

    setGeneratedTxnId(txnId);
    setDonationStep(3);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* HEADER INTRODUCTION */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Chiến Dịch Gây Quỹ Thiện Nguyện</h1>
        <p className="text-gray-600">
          Hãy cùng chúng tôi chung tay thắp sáng lại hy vọng sống, sửa trường lớp vùng cao và mang dòng nước mát lành đến khắp mọi miền Tổ quốc phong cảnh nên thơ.
        </p>
      </div>

      {/* FILTER BUTTONS AND SIDEBAR GENERAL VIEW */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedCampaign(null);
            }}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
                : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-rose-600 border border-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* DETAIL STORY IN FOCUS VIEW */}
      {selectedCampaign ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 animate-fadeIn">
          {/* Main Story Content - 7 cols */}
          <div className="lg:col-span-8 p-6 sm:p-10 space-y-8 border-b lg:border-b-0 lg:border-r border-gray-100">
            <button 
              onClick={() => setSelectedCampaign(null)}
              className="text-xs font-bold text-gray-500 hover:text-rose-600 flex items-center gap-1.5 p-1.5 hover:bg-gray-50 rounded-xl"
            >
              ← Quay lại danh sách chiến dịch
            </button>

            <div className="space-y-4">
              <span className="px-3.5 py-1.5 bg-rose-50 text-rose-600 text-xs font-bold rounded-full uppercase tracking-wider">
                {selectedCampaign.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {selectedCampaign.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                <span>Ngày bắt đầu: {selectedCampaign.startDate}</span>
                <span>•</span>
                <span>Hạn kết thúc: {selectedCampaign.endDate}</span>
              </div>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100">
              <img src={selectedCampaign.image} alt={selectedCampaign.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                <Heart className="w-5 h-5 text-rose-600 fill-current" /> Câu Chuyện Dự Án
              </h3>
              <div className="text-gray-700 leading-relaxed text-base space-y-4">
                {selectedCampaign.story && (selectedCampaign.story.includes('<p>') || selectedCampaign.story.includes('<strong>') || selectedCampaign.story.includes('<br') || selectedCampaign.story.includes('<ul>')) ? (
                  <div 
                    className="max-w-none text-slate-800 space-y-3 prose prose-slate" 
                    dangerouslySetInnerHTML={{ __html: selectedCampaign.story }}
                  />
                ) : (
                  <p className="whitespace-pre-line">{selectedCampaign.story}</p>
                )}
              </div>
            </div>

            {/* Campaign transparent standard disclaimer */}
            <div className="p-5 bg-sky-50/50 rounded-2xl border border-sky-100/40 flex items-start gap-4">
              <Shield className="w-8 h-8 text-sky-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-sm">
                <p className="font-extrabold text-sky-950">Cam kết minh bạch 100%</p>
                <p className="text-gray-500 leading-relaxed text-xs">
                  Mọi khoản quyên góp được bảo chứng an toàn và giám sát dòng tiền minh bạch bởi Hội tình nguyện nhân văn. Toàn bộ sao kê giao dịch ngân hàng liên quan được công khai.
                </p>
              </div>
            </div>
          </div>

          {/* Real-time Tracking and Actions Panel - 4 cols */}
          <div className="lg:col-span-4 p-6 sm:p-8 bg-gray-50/50 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-bold text-gray-500 text-xs tracking-widest uppercase">TIẾN ĐỘ HIỆN TẠI</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-3xl font-black text-rose-600">{formatVND(selectedCampaign.currentAmount)}</span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Mục tiêu chiến dịch: <span className="font-bold text-slate-900">{formatVND(selectedCampaign.targetAmount)}</span></p>
                </div>

                {/* Big visual progress */}
                <div className="space-y-1.5">
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full"
                      style={{ width: `${getCampaignProgress(selectedCampaign)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs font-bold text-gray-500">
                    <span>Đã đạt {getCampaignProgress(selectedCampaign)}%</span>
                    <span>{selectedCampaign.donorsCount} lượt quyên góp</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              {selectedCampaign.currentAmount >= selectedCampaign.targetAmount ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                  <p className="font-extrabold text-emerald-800 text-sm">Chiến dịch hoàn thành gây quỹ!</p>
                  <p className="text-xs text-gray-500">Xin chân thành cám ơn tấm lòng hảo tâm vô lượng của toàn thể cộng đồng.</p>
                </div>
              ) : (
                <button
                  onClick={() => handleOpenDonate(selectedCampaign)}
                  className="w-full py-4 bg-rose-600 hover:bg-rose-700 active:scale-98 transition-all text-white font-bold rounded-2xl shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 text-base"
                >
                  Quyên Góp Cho Chiến Dịch <Heart className="w-5 h-5 fill-current" />
                </button>
              )}

              {/* Recent Campaign Contributors list */}
              <div className="space-y-4 pt-4 border-t border-gray-150">
                <h4 className="font-bold text-slate-950 text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" /> Nhà Hảo Tâm Đã Góp Sức
                </h4>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {donations.filter(d => d.campaignId === selectedCampaign.id && d.status === 'success').length === 0 ? (
                    <p className="text-xs text-gray-400 italic">Hãy là người đầu tiên tiếp sức cho chiến dịch ý nghĩa này!</p>
                  ) : (
                    donations
                      .filter(d => d.campaignId === selectedCampaign.id && d.status === 'success')
                      .slice(0, 5)
                      .map((don, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-lg border border-gray-100 flex justify-between items-start gap-4 shadow-2xs">
                          <div className="space-y-1">
                            <p className="font-bold text-xs text-slate-800">{don.donorName}</p>
                            <p className="text-[10px] text-gray-500 leading-normal italic">"{don.message}"</p>
                            <p className="text-[9px] text-gray-400">{don.timestamp}</p>
                          </div>
                          <span className="text-xs font-black text-rose-600 shrink-0">+{formatVND(don.amount)}</span>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setSelectedCampaign(null)}
              className="w-full text-center py-2.5 text-xs font-bold text-gray-500 hover:underline"
            >
              ← Trở về danh sách dự án
            </button>
          </div>
        </div>
      ) : (
        /* CAMPAIGNS GRID CARDS */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn">
          {filteredCampaigns.map((camp) => {
            const percent = getCampaignProgress(camp);
            return (
              <div key={camp.id} className="bg-white rounded-3xl overflow-hidden border border-gray-150/60 shadow-sm hover:shadow-xl hover:-translate-y-1 duration-300 transition-all flex flex-col group">
                <div className="relative h-56 overflow-hidden bg-slate-200">
                  <img src={camp.image} alt={camp.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-3xs rounded-full text-xs font-extrabold text-rose-600 uppercase shadow-xs">
                    {camp.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-slate-900 text-lg hover:text-rose-600 transition-colors line-clamp-2 leading-snug">
                      {camp.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                      {camp.shortDescription}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Progress details */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-extrabold text-gray-500">
                        <span>Quyên góp {percent}%</span>
                        <span className="text-rose-600">{camp.donorsCount} lượt đóng góp</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-2 border-t border-b border-gray-100 text-xs">
                      <div>
                        <p className="text-gray-400 font-semibold tracking-wider">ĐÃ QUYÊN GÓP</p>
                        <p className="text-sm font-extrabold text-slate-800 mt-0.5">{formatVND(camp.currentAmount)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 font-semibold tracking-wider">MỤC TIÊU</p>
                        <p className="text-sm font-extrabold text-rose-600 mt-0.5">{formatVND(camp.targetAmount)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <button
                        onClick={() => setSelectedCampaign(camp)}
                        className="py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all text-center"
                      >
                        Chi tiết câu chuyện
                      </button>
                      
                      {camp.currentAmount >= camp.targetAmount ? (
                        <div className="py-2 flex items-center justify-center bg-emerald-50 text-emerald-600 text-xs font-bold rounded-xl md:truncate">
                          Hoàn thành ✓
                        </div>
                      ) : (
                        <button
                          onClick={() => handleOpenDonate(camp)}
                          className="py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md shadow-rose-600/10 transition-all flex items-center justify-center gap-1"
                        >
                          Góp Sức <Heart className="w-3.5 h-3.5 fill-current" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}


      {/* INTERACTIVE DONATION MODAL ARCHITECTURE */}
      {showDonateModal && selectedCampaign && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-gray-150 transform transition-all duration-300 animate-scaleUp">
            
            {/* Header of Modal */}
            <div className="relative p-6 bg-slate-9 w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-rose-100 opacity-90">Ủng hộ nhân đạo</span>
                <h3 className="font-extrabold text-lg leading-snug line-clamp-1 mt-0.5">{selectedCampaign.title}</h3>
              </div>
              <button 
                onClick={() => setShowDonateModal(false)}
                className="p-1 px-2.5 rounded-full hover:bg-white/10 text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Steps */}
            {donationStep === 1 && (
              /* STEP 1: INPUT INFORMATION */
              <form onSubmit={handleDonationSubmit} className="p-6 space-y-6">
                {/* SELECT AMOUNT */}
                <div className="space-y-3">
                  <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider">CỌT MỐC ĐÓNG GÓP (VNĐ)</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[100000, 200000, 500000, 1000000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleSelectAmount(amt)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                          donateAmount === amt && !customAmount
                            ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {formatVND(amt).replace(',00 ₫', '').replace(' ₫', '')}
                      </button>
                    ))}
                  </div>

                  {/* CUSTOM AMOUNT */}
                  <div className="relative mt-2">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-sm font-extrabold text-gray-400">VNĐ</span>
                    <input
                      type="text"
                      placeholder="Hoặc điền số tiền tự chọn khác..."
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="w-full pl-14 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm font-bold"
                    />
                  </div>
                </div>

                {/* DONOR INFO Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 col-span-1">
                    <label className="text-[10px] font-bold text-gray-500 tracking-wider">HỌ VÀ TÊN</label>
                    <input
                      type="text"
                      required={!hideName}
                      disabled={hideName}
                      placeholder={hideName ? 'Nhà hảo tâm ẩn danh' : 'Nguyễn Văn A'}
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div className="space-y-1.5 col-span-1">
                    <label className="text-[10px] font-bold text-gray-500 tracking-wider">EMAIL NHẬN BÁO CÁO</label>
                    <input
                      type="email"
                      required
                      placeholder="nva@gmail.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  {/* Toggle anonymous */}
                  <div className="sm:col-span-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="hideName"
                      checked={hideName}
                      onChange={(e) => setHideName(e.target.checked)}
                      className="w-4 h-4 rounded text-rose-500 border-gray-300 focus:ring-rose-500"
                    />
                    <label htmlFor="hideName" className="text-xs text-gray-500 font-semibold select-none cursor-pointer">
                      Quyên góp ẩn danh (Tên bạn sẽ hiển thị thành "Ẩn danh" trên cộng đồng)
                    </label>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 tracking-wider">LỜI CHÚC / LỜI NHẮN NHỦ GỬI KÈM</label>
                    <input
                      type="text"
                      placeholder="Chúc chiến dịch diễn ra thành công tốt đẹp!"
                      value={donorMessage}
                      onChange={(e) => setDonorMessage(e.target.value)}
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                {/* Submitting button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-2xl shadow-lg shadow-rose-600/20 text-sm uppercase transition-all"
                >
                  Tiến hành thanh toán ({formatVND(donateAmount)})
                </button>
              </form>
            )}

            {donationStep === 2 && (
              /* STEP 2: PAYMENT METHOD AND QR DEMODULATION */
              <div className="p-6 space-y-6 text-center">
                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-900 text-base">Lựa Chọn Phương Thức Thanh Toán</h4>
                  <p className="text-xs text-gray-500">Toàn bộ ngân hàng nội địa và ví điện tử được hỗ trợ chuyển khoản an toàn.</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {['chuyển khoản', 'momo', 'vnpay'].map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`p-3 rounded-2xl border text-center font-bold text-xs uppercase flex flex-col items-center gap-2 transition-all ${
                        paymentMethod === method
                          ? 'bg-rose-50 border-rose-500 text-rose-600 shadow-2xs'
                          : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-500'
                      }`}
                    >
                      <span className="text-lg">
                        {method === 'chuyển khoản' && '🏦'}
                        {method === 'momo' && '📱'}
                        {method === 'vnpay' && '💳'}
                      </span>
                      <span>{method}</span>
                    </button>
                  ))}
                </div>

                {/* Mock QR details based on method */}
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-150 space-y-4 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-[10px] font-bold text-gray-500 shadow-2xs">
                    <Shield className="w-3.5 h-3.5 text-emerald-500" /> Hệ thống bảo mật ngân hàng VietQR
                  </div>

                  <div className="relative p-2.5 bg-white border border-gray-100 rounded-xl shadow-xs">
                    {/* Generates standard mock QR image placeholder with Lucide */}
                    <QrCode className="w-36 h-36 stroke-[1.2] text-slate-800" />
                    <div className="absolute inset-0 bg-transparent" />
                  </div>

                  <div className="space-y-1 text-xs text-slate-700">
                    <p>Ủng hộ: <span className="font-bold text-rose-600">{formatVND(donateAmount)}</span></p>
                    <p className="text-[10px] font-semibold text-gray-400 tracking-wider">Nội dung CK: <span className="font-mono text-slate-900 bg-white px-2 py-0.5 border border-gray-200 rounded">{`GOLDEN HEART ${Date.now().toString().slice(-6)}`}</span></p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setDonationStep(1)}
                    className="py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs rounded-xl"
                  >
                    Quay lại điền thông tin
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1"
                  >
                    Đã chuyển khoản thành công <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {donationStep === 3 && (
              /* STEP 3: CONGRATULATIONS / RECEIPT SCREEN */
              <div className="p-10 space-y-6 text-center animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-100 shadow-md shadow-emerald-50/10">
                  <Check className="w-8 h-8 stroke-[3.5]" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900">Món Quà Vô Giá Đã Được Ghi Nhận!</h3>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                    Hội Từ Thiện Trái Tim Vàng chân thành cảm ơn nghĩa cử cao đẹp vô vị lợi của bạn.
                  </p>
                </div>

                <div className="bg-gray-50/70 py-4 px-6 rounded-2xl border border-gray-100 text-left space-y-2 text-xs font-semibold text-slate-700 max-w-xs mx-auto">
                  <p className="flex justify-between">Mã giao dịch:<span className="font-mono font-bold text-slate-950">{generatedTxnId}</span></p>
                  <p className="flex justify-between">Người ủng hộ:<span>{hideName ? 'Ẩn danh' : donorName || 'Ẩn danh'}</span></p>
                  <p className="flex justify-between">Số tiền quyên góp:<span className="font-bold text-rose-600">{formatVND(donateAmount)}</span></p>
                  <p className="flex justify-between text-gray-400">Hình thức:<span>{paymentMethod}</span></p>
                </div>

                <p className="text-[10px] text-gray-400 italic">Thư cảm ơn và báo cáo quyết toán quỹ kiểm toán sẽ được gửi tự động tới email: {donorEmail}</p>

                <button
                  onClick={() => {
                    setShowDonateModal(false);
                    // Reload campaign list state to display updated values right away
                    setSelectedCampaign(null);
                  }}
                  className="px-8 py-3 bg-slate-900 hover:bg-slate-950 text-white font-extrabold text-xs uppercase rounded-xl shadow-md"
                >
                  Xác nhận & Hoàn tất
                </button>
              </div>
            )}

          </div>
        </div>
      )}


    </div>
  );
};

export default Campaigns;
