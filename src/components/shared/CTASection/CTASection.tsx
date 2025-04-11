import type React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

function CTASectionCOPD() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-card border-t border-border"> {/* Giữ lại style hoặc thay đổi */}
      <div className="container mx-auto px-4 md:px-6 text-center">
        {/* Tiêu đề kêu gọi hành động liên quan đến COPD */}
        <h2 className="text-3xl font-bold tracking-tight mb-4">Sẵn sàng Nâng cao Chất lượng Quản lý COPD?</h2>
        {/* Mô tả kêu gọi hành động */}
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Khám phá cách COPDSENSE giúp phát hiện sớm đợt cấp, giảm gánh nặng y tế và mang lại cuộc sống tốt đẹp hơn cho bệnh nhân và cộng đồng.
        </p>
        {/* Các nút kêu gọi hành động */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Nút chính - thường là liên hệ hoặc tìm hiểu thêm */}
          <Link
            to="/lien-he" // Thay đổi đường dẫn đến trang liên hệ
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 py-2"
          >
            Liên hệ Tư vấn {/* Thay đổi văn bản nút */}
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
          {/* Nút phụ - có thể là xem gói dịch vụ hoặc demo */}
          <Link
            to="#goi-dich-vu" // Thay đổi đường dẫn đến section gói dịch vụ đã tạo trước đó
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-6 py-2"
          >
            Xem Gói Dịch vụ {/* Thay đổi văn bản nút */}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTASectionCOPD; // Đổi tên component