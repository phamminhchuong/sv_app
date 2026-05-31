# Golden Heart Charity (Trái Tim Vàng) Memory Notes

- **Vite compilation configuration**: Fully compiled with Vite v4.5.14 under Node v16.14.0.
- **Data Persistence**: Managed through React Context `CharityContext.jsx` paired with `localStorage`.
- **Key Enhancements**:
  - Structured Volunteer Schema: Tracks detailed properties (`id`, `name`, `email`, `phone`, `status`, `paymentStatus`, `notes`).
  - Implemented Excel / CSV export functionality using a dedicated Byte Order Mark (`\uFEFF`) to prevent Vietnamese character encoding issues in Excel.
  - Developed `VolunteerRow` inside [src/views/Admin.jsx](src/views/Admin.jsx) with stateful binding and instant local updates.
  - Leverages React-Quill for Campaign & News WYSIWYG Rich Editor fields.
