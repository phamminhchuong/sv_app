import React, { useState } from 'react';
import { useCharity } from '../context/CharityContext';
import { BookOpen, User, Calendar, Eye, Share2, HelpCircle, ArrowRight } from 'lucide-react';

const Articles = () => {
  const { articles } = useCharity();
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = ['Tất cả', 'Câu chuyện thành công', 'Cẩm nang chia sẻ', 'Hoạt động nổi bật'];

  const filteredArticles = selectedCategory === 'Tất cả' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fadeIn">
      {/* HEADER INTRODUCTION */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Bài Viết & Báo Cáo Thực Địa</h1>
        <p className="text-gray-600">
          Cập nhật những tin tức hoạt động mới nhất, đọc những cuốn cẩm nang chia sẻ kỹ năng sinh hoạt cộng đồng, hay lắng nghe những câu chuyện hồi sinh diệu kỳ đầy cảm xúc.
        </p>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedArticle(null);
            }}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
              selectedCategory === cat
                ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20'
                : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-rose-600 border-gray-150'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {selectedArticle ? (
        /* DETAIL ARTICLE READING VIEW */
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 max-w-4xl mx-auto space-y-8 shadow-xl animate-fadeIn">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="text-xs font-bold text-gray-500 hover:text-rose-600 flex items-center gap-1.5 p-1.5 hover:bg-gray-50 rounded-xl"
          >
            ← Quay lại mục tin tức
          </button>

          <div className="space-y-4">
            <span className="px-3.5 py-1.5 bg-rose-50 text-rose-600 text-xs font-bold rounded-full uppercase tracking-wider">
              {selectedArticle.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {selectedArticle.title}
            </h2>

            {/* Author and Date */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 font-semibold pt-2 border-b border-gray-100 pb-4">
              <span className="flex items-center gap-1.5 text-slate-700">
                <User className="w-4 h-4 text-slate-400" /> Tác giả: {selectedArticle.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> Ngày đăng: {selectedArticle.publishDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" /> Lượt xem: {selectedArticle.views + 20}
              </span>
            </div>
          </div>

          <div className="w-full rounded-2xl overflow-hidden aspect-video bg-slate-200 shadow-xs">
            <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
          </div>

          {/* Core Body content */}
          <div className="text-gray-700 leading-relaxed text-base space-y-4">
            {selectedArticle.content && (selectedArticle.content.includes('<p>') || selectedArticle.content.includes('<strong>') || selectedArticle.content.includes('<br') || selectedArticle.content.includes('<ul>')) ? (
              <div 
                className="max-w-none text-slate-800 space-y-3 prose prose-slate" 
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />
            ) : (
              <p className="whitespace-pre-line">{selectedArticle.content}</p>
            )}
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl"
            >
              ← Quay lại xem tin tức khác
            </button>
            <button 
              onClick={() => alert('Đường dẫn bài viết đã sao chép thành công!')}
              className="text-gray-500 hover:text-rose-600 flex items-center gap-1 text-xs font-bold"
            >
              <Share2 className="w-4 h-4" /> Chia sẻ bài viết này
            </button>
          </div>
        </div>
      ) : (
        /* ARTICLES CARDS ARCHITECTURE */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.length === 0 ? (
            <div className="col-span-full py-12 text-center text-gray-400 font-medium italic">Hiện chưa có bài báo cáo nào thuộc lĩnh vực này.</div>
          ) : (
            filteredArticles.map((art) => (
              <div key={art.id} className="bg-white rounded-3xl border border-gray-150/60 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group">
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-3xs rounded-full text-[10px] font-extrabold text-rose-600 uppercase shadow-2xs">
                    {art.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-semibold text-gray-400">
                      <span>{art.publishDate}</span>
                      <span>•</span>
                      <span>Bởi {art.author}</span>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                      {art.shortContent}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedArticle(art);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-3 bg-gray-50 hover:bg-rose-50 text-gray-700 hover:text-rose-600 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    Xem Chi Tiết Bài Đăng <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TRIVIA FAQ OR KNOWLEDGE ACCREDITATION SECTION */}
      <section className="bg-gray-100/70 p-6 md:p-10 rounded-3xl border border-gray-150/80 space-y-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
        <div className="lg:col-span-4 space-y-4">
          <span className="text-rose-600 font-bold text-xs uppercase tracking-wider">Hỏi đáp cùng Trái Tim Vàng</span>
          <h3 className="text-2xl font-black text-slate-900">Giải đáp thắc mắc</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Chúng tôi hiểu bạn cần thông tin rõ ràng trước khi đặt niềm tin vào các hoạt động thiện nguyện xã hội.
          </p>
        </div>

        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 space-y-1.5 shadow-2xs">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2"><HelpCircle className="w-4 h-4 text-rose-500 shrink-0" /> Tiền đóng góp được chuyển giao thế nào?</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Mỗi đồng quyên góp trước hết được tích trú tại tài khoản ngân hàng chuyên biệt công bố cho chiến dịch đó. Sau khi hoàn thành gây quỹ, 100% kinh phí sẽ lập tức thanh toán cho vật tư (hoạt động mua máy RO, sách vở, xây nhà) có xác minh giám sát của tình nguyện địa phương.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 space-y-1.5 shadow-2xs">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2"><HelpCircle className="w-4 h-4 text-rose-500 shrink-0" /> Tôi có được hỗ trợ hoá đơn quyên góp?</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Khi thực hiện chuyển khoản hoặc thanh toán, mã xác thực số hoá sẽ được lưu vĩnh viễn trên cơ sở dữ liệu. Bạn có thể in biên lai điện tử dùng làm chứng từ khấu trừ thuế TNCN hợp lệ tại chi cục Thuế Việt Nam.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Articles;
