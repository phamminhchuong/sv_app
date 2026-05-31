# 🌟 Trái Tim Vàng - Nền Tảng Thiện Nguyện Số Minh Bạch Trực Quan

Chào mừng bạn đến với **Trái Tim Vàng** (Golden Heart) – cổng thông tin thiện nguyện thế hệ mới được phát triển hoàn toàn trên nền tảng **React (Vite) & Tailwind CSS v3**. Dự án hướng tới sự tôn vinh tính minh bạch tuyệt đối, gắn kết cộng đồng nhà hảo tâm dựa trên dữ liệu thời gian thực và trải nghiệm quyên góp trực quan sống động.

---

## 🖼️ Các Phân Khu Chức Năng Chính

Dự án được xây dựng dưới dạng Single Page Application (SPA), tích hợp điều hướng mượt mà, thân thiện với các phân hệ chính:

### 1. 🏠 Trang Chủ (Home Page)
- **Thống Kê Trực Quan:** Hiển thị tổng số tiền quyên góp, số chiến dịch đang hoạt động, số lượt đóng góp và lượng tình nguyện viên. Dữ liệu này được kết nối trực tiếp với Database Context của ứng dụng, tự động cập nhật ngay khi admin phê duyệt giao dịch mới.
- **Biểu Đồ Sứ Mệnh:** Trực quan hóa tỷ lệ phân bổ tài chính (Y tế, Giáo dục, Cứu trợ, Môi trường) thông qua biểu đồ tròn SVG tự vẽ bắt mắt.
- **Đạt Tiêu Chuẩn Minh Bạch:** Trình bày quy trình hoạt động 3 bước minh bạch (Gieo mầm → Nuôi dưỡng → Lan tỏa).

### 2. 🎗️ Gây Quỹ Thiện Nguyện (Campaigns)
- **Danh Sách Chiến Dịch:** Hỗ trợ lọc theo trạng thái hoạt động (Tất cả, Đang hoạt động, Đang diễn ra, Đã hoàn thành). 
- **Tiến Độ Thực Tế:** Thanh tiến trình phần trăm (%) được tính toán động dựa trên số tiền mục tiêu và số tiền thực nhận đã được duyệt.
- **Chi Tiết & Lịch Sử Giao Dịch:** Xem thông tin mô tả chi tiết từng chiến dịch và xem danh sách lịch sử các nhà hảo tâm vừa quyên góp cùng lời nhắn gửi ấm áp.
- **Quy Trình Quyên Góp 3 Bước (Interactive Wizard):**
  1. *Bước 1: Điền thông tin quyên góp* (Họ tên, số tiền, email, số điện thoại, lời nhắn, hình thức ẩn danh).
  2. *Bước 2: Quét mã QR chuyển khoản* (Tự sinh hình ảnh mã QR Code ngân hàng động tích hợp chính xác ID giao dịch).
  3. *Bước 3: Hoàn thành & Trình duyệt* (Hệ thống ghi nhận giao dịch ở trạng thái "Chờ duyệt" và gửi thông báo cảm ơn).

### 3. 📅 Sự Kiện Thiện Nguyện (Events)
- **Thời Khoá Biểu Sự Kiện:** Danh sách chi tiết các hoạt động như khám bệnh miễn phí, xây trường vùng cao, dọn rác bãi biển.
- **Đăng Ký Tình Nguyện Viên:** Form đăng ký trực tiếp trên popup modal cho phép người dùng đăng ký tham gia sự kiện, lưu trữ thông tin liên hệ và kỹ năng hỗ trợ của họ vào cơ sở dữ liệu.

### 4. 📰 Tin Tức & Bài Viết (Articles)
- **Kho Kiến Thức Cộng Đồng:** Đăng tải các bài viết chia sẻ về các chuyến đi thực tế, câu chuyện đẹp truyền cảm hứng, và cẩm nang hoạt động xã hội lành mạnh.

### 5. 👥 Về Chúng Tôi (About Us)
- **Minh Bạch Hành Chính:** Mô phỏng biểu đồ cơ cấu đầu tư hoạt động quỹ, cam kết 100% dòng tiền quyên góp chuyển thẳng tới đối tượng cần giúp đỡ (hoạt động vận hành được tài trợ bởi các doanh nghiệp bảo trợ độc lập).

### 6. ⚙️ Hệ Thống Quản Trị (Admin Panel - Quản trị viên)
Toàn bộ dữ liệu của hệ thống được quản lý thông qua **CharityContext (bản đồ lưu trữ localStorage)** giúp lưu trữ trạng thái khi làm mới trang:
- **Duyệt Quyên Góp:** Xem toàn bộ lịch sử các giao dịch gửi tiền chuyển khoản, nhấn **"Phê duyệt"** để xác nhận tiền đã vào tài khoản, lập tức cộng dồn vào quỹ chiến dịch tương ứng và tăng số liệu thống kê chung của trang chủ!
- **Quản Lý Tình Nguyện Viên:** Xem danh sách đầy đủ tất cả các thành viên đã đăng ký tham gia các sự kiện khác nhau kèm số điện thoại, kỹ năng để liên lạc.
- **Quản Lý Chiến Dịch:** Thêm mới, cập nhật chiến dịch thiện nguyện (Tên, mục tiêu, ảnh bìa, danh mục, câu chuyện).
- **Quản Lý Sự Kiện / Tin Tức:** Thêm sự kiện hoặc bài viết mới mượt mà, ngay lập tức xuất hiện ngoài giao diện người dùng.

---

## 🛠️ Công Nghệ Sử Dụng & Sắp Đặt

- **Framework Core:** React v18 (Sử dụng Vite làm Bundler siêu tốc).
- **Styling Engine:** Tailwind CSS v3 (Chạy Layout Flexbox, Grid, hiệu ứng Glassmorphic, chuyển động mượt mà).
- **Icon Set:** Lucide React (Thiết kế đồng bộ nét thanh mảnh hiện đại).
- **Engine State Persistence:** React Context + `localStorage` đồng bộ hóa tự động trạng thái dữ liệu mẫu và các thay đổi do admin điều hành.

---

## 🚀 Hướng Dẫn Kích Hoạt Dự Án

### Sẵn sàng cài đặt
Chắc chắn bạn đã cài đặt Node.js trên máy tính:
```bash
# 1. Cài đặt các thư viện phụ thuộc (dependencies)
npm install

# 2. Khởi chạy máy chủ phát triển cục bộ (Local Development Server)
npm run dev

# 3. Biên dịch đóng gói dự án chính thức (Production build)
npm run build
```

Máy chủ cục bộ thường mặc định khởi chạy tại địa chỉ: `http://localhost:5173`. Mở trình duyệt và trải nghiệm dự án của bạn!

---

## 📂 Sơ Đồ Cấu Trúc File Dự Án

- `package.json`: Chứa kịch bản chạy và danh sách thư viện (React, Lucide, Tailwind).
- `tailwind.config.js` & `postcss.config.js`: Cấu hình TailwindCSS màu sắc chủ đạo Rose/Slate.
- `src/main.jsx` & `src/index.css`: Điểm kích hoạt React và nạp Tailwind CSS.
- `src/context/CharityContext.jsx`: Trái tim quản lý cơ sở dữ liệu, ghi log, thanh toán và sự kiện.
- `src/App.jsx`: Khung sườn tổng quan, thanh Navbar kính mờ mượt mà và chuyển đổi các trang.
- `src/views/`:
  - `Home.jsx`: Trang chủ hiển thị thành tựu, tiêu chí chất lượng, dự án nổi bật và đối tác bảo trợ.
  - `Campaigns.jsx`: Nơi quản lý bộ lọc, modal ủng hộ, thanh toán QR động.
  - `Events.jsx`: Hiển thị danh sách các đợt tuyển quân cứu hộ và form đăng ký.
  - `Articles.jsx`: Blog chia sẻ cẩm nang thiện nguyện.
  - `AboutUs.jsx`: Giới thiệu tinh thần sáng lập và biểu đồ tròn tài chính.
  - `Admin.jsx`: Bảng điều khiển quản lý toàn bộ CRUD và lịch sử phê duyệt.
