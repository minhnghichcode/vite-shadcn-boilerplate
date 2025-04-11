import type React from "react";
import { Link } from "react-router-dom";
// Cập nhật icons phù hợp hơn nếu cần (ví dụ: Activity, Bell, HeartPulse thay vì Database)
import { ArrowUpRight, Check, BarChartIcon, MessageSquare, TrendingUp, Bell, HeartPulse } from "lucide-react";

function HeroSectionCOPD() {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Gradient nền giữ nguyên */}
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="relative hero-container">
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          {/* Badge - Nhấn mạnh giải pháp hoặc cuộc thi */}
          <div className="badge badge-primary mb-6 mx-auto w-fit px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
            Giải pháp AI cho Quản lý COPD
            {/* Hoặc: Hackathon 2025 - Y tế Chất lượng cao */}
          </div>
          <div className="text-center max-w-4xl mx-auto">
            {/* Tiêu đề chính - Tập trung vào lợi ích cốt lõi */}
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Phát hiện Sớm Đợt Cấp COPD bằng{" "}
              <span className="gradient-text">
                AI
              </span>{" "}
            </h1>
            {/* Phụ đề - Mô tả rõ hơn về giải pháp và vấn đề */}
            <p className="hero-subtitle text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              COPDSENSE sử dụng AI và IoT để phân tích dữ liệu sức khỏe liên tục, giúp dự đoán và cảnh báo sớm nguy cơ đợt cấp COPD, giảm tỷ lệ nhập viện và cải thiện chất lượng cuộc sống cho bệnh nhân.
            </p>
            {/* Nút kêu gọi hành động - Điều chỉnh cho phù hợp */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                // Liên kết tới trang chi tiết dự án, demo hoặc form liên hệ
                to="/chi-tiet-du-an"
                className="primary-button inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 py-2"
              >
                Tìm hiểu Thêm
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                // Liên kết tới phần demo hoặc video giới thiệu
                to="#demo"
                className="secondary-button inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-6 py-2"
              >
                Xem Demo Hoạt động
              </Link>
            </div>
            {/* Feature Cards - Nêu bật các tính năng/lợi ích chính của COPDSENSE */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <FeatureCard
                // Icon phù hợp với dự đoán/xu hướng
                icon={<TrendingUp className="w-10 h-10 feature-icon mb-3 text-primary" />}
                title="Dự đoán Sớm Đợt Cấp"
                description="Phân tích dữ liệu IoT & triệu chứng để cảnh báo nguy cơ"
              />
              <FeatureCard
                // Icon phù hợp với cảnh báo/thông báo
                icon={<Bell className="w-10 h-10 feature-icon mb-3 text-primary" />}
                title="Cảnh báo Cá nhân hóa"
                description="Gửi thông báo kịp thời đến bệnh nhân, người nhà & bác sĩ"
              />
              <FeatureCard
                // Icon phù hợp với theo dõi/dashboard
                icon={<BarChartIcon className="w-10 h-10 feature-icon mb-3 text-primary" />}
                title="Theo dõi & Quản lý"
                description="Cung cấp dashboard cho bác sĩ theo dõi diễn biến bệnh hiệu quả"
              />
            </div>
            {/* Phần thông tin bổ sung/cam kết - Điều chỉnh phù hợp với dự án */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                {/* Thay đổi cho phù hợp, ví dụ: */}
                <span>Dễ dàng sử dụng cho người lớn tuổi</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Bảo mật dữ liệu y tế</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Hỗ trợ bởi đội ngũ chuyên môn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component FeatureCard giữ nguyên cấu trúc, chỉ thay đổi nội dung truyền vào
type FeatureCardProps = { icon: React.ReactNode; title: string; description: string };

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center p-5 bg-card rounded-xl shadow-sm text-center">
      {icon}
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default HeroSectionCOPD; // Đổi tên component cho rõ ràng