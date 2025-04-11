import type React from "react";
// Giữ lại các icon hoặc thay đổi nếu cần:
// Ví dụ: UserCheck (tương tác), Activity (IoT), Shield (bảo mật), BarChartIcon (phân tích)
import { BarChartIcon, Activity, Shield, UserCheck, MessageSquare } from "lucide-react";

function FeaturesSectionCOPD() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-card"> {/* Có thể đổi màu nền nếu muốn */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          {/* Tiêu đề và mô tả tập trung vào tính năng của COPDSENSE */}
          <h2 className="text-3xl font-bold tracking-tight mb-4">Tính năng Nổi bật của COPDSENSE</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Nền tảng toàn diện của chúng tôi giúp bệnh nhân và cơ sở y tế quản lý COPD hiệu quả hơn thông qua các công nghệ tiên tiến và dễ sử dụng.
          </p>
        </div>
        {/* Grid các tính năng chi tiết */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureDetailCard
            // Icon cho thu thập dữ liệu liên tục
            icon={<Activity className="w-6 h-6 text-primary" />}
            title="Theo dõi Sức khỏe Liên tục"
            description="Thu thập dữ liệu SpO2, nhịp tim tự động qua thiết bị IoT và cập nhật triệu chứng dễ dàng qua form."
          />
          <FeatureDetailCard
            // Icon cho phân tích AI
            icon={<BarChartIcon className="w-6 h-6 text-primary" />} // Hoặc có thể dùng icon khác liên quan đến AI/phân tích
            title="Phân tích & Dự đoán bằng AI"
            description="Áp dụng mô hình AI (LSTM, LLM) để phân tích dữ liệu, phát hiện sớm dấu hiệu và dự báo nguy cơ đợt cấp."
          />
           <FeatureDetailCard
            // Icon cho giao diện/tương tác người dùng
            icon={<UserCheck className="w-6 h-6 text-primary" />} // Hoặc MessageSquare nếu có chatbot
            title="Giao diện Thân thiện"
            description="Ứng dụng dễ sử dụng với form tích chọn đơn giản, phù hợp cho cả người lớn tuổi và người nhà."
          />
          <FeatureDetailCard
            // Icon cho bảo mật
            icon={<Shield className="w-6 h-6 text-primary" />}
            title="Bảo mật Dữ liệu Y tế"
            description="Đảm bảo an toàn thông tin bệnh nhân theo tiêu chuẩn, mã hóa đầu cuối và phân quyền truy cập."
          />
        </div>
      </div>
    </section>
  );
}

// Component FeatureDetailCard giữ nguyên cấu trúc
type FeatureDetailCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function FeatureDetailCard({ icon, title, description }: FeatureDetailCardProps) {
  return (
    <div className="p-6 bg-background border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow"> {/* Đổi nền thành background để nổi bật hơn trên nền card của section */}
      <div className="feature-icon mb-4 p-3 rounded-full bg-primary/10 w-fit">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default FeaturesSectionCOPD; // Đổi tên component