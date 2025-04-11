import type React from "react";
// Chọn icons phù hợp với lợi ích y tế
// Ví dụ: TrendingDown (giảm thiểu), Smile (chất lượng sống), Stethoscope (bác sĩ), Wifi (từ xa), Users (gia đình), Hospital (bệnh viện)
import { TrendingDown, Smile, Stethoscope, Wifi, Users, Hospital } from "lucide-react";

function BenefitsApplicationsSectionCOPD() { // Đổi tên section cho phù hợp
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background"> {/* Đổi màu nền nếu muốn khác biệt */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          {/* Tiêu đề và mô tả tập trung vào lợi ích của COPDSENSE */}
          <h2 className="text-3xl font-bold tracking-tight mb-4">Lợi ích Chính & Ứng dụng Thực tế</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            COPDSENSE mang lại giá trị thiết thực cho bệnh nhân, gia đình và hệ thống y tế trong việc quản lý COPD.
          </p>
        </div>
        {/* Grid các lợi ích/ứng dụng */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <UseCaseCard // Giữ tên component UseCaseCard nhưng nội dung thay đổi
            // Icon cho việc giảm nhập viện
            icon={<TrendingDown className="w-6 h-6 text-primary" />}
            title="Giảm Nhập viện & Chi phí"
            description="Phát hiện sớm đợt cấp giúp can thiệp kịp thời, giảm đáng kể số lần nhập viện khẩn cấp và chi phí điều trị tốn kém."
          />
          <UseCaseCard
            // Icon cho cải thiện chất lượng sống
            icon={<Smile className="w-6 h-6 text-primary" />}
            title="Cải thiện Chất lượng Sống"
            description="Bệnh nhân cảm thấy an tâm hơn khi được theo dõi sát sao, chủ động quản lý sức khỏe và giảm bớt lo lắng về bệnh tật."
          />
          <UseCaseCard
            // Icon cho hỗ trợ bác sĩ
            icon={<Stethoscope className="w-6 h-6 text-primary" />}
            title="Hỗ trợ Bác sĩ Điều trị"
            description="Cung cấp dữ liệu sức khỏe liên tục, cá nhân hóa giúp bác sĩ đánh giá chính xác tình trạng và đưa ra phác đồ phù hợp."
          />
          <UseCaseCard
            // Icon cho quản lý từ xa
            icon={<Wifi className="w-6 h-6 text-primary" />}
            title="Quản lý Từ xa Hiệu quả"
            description="Đặc biệt hữu ích cho bệnh nhân ở vùng sâu vùng xa, khó tiếp cận cơ sở y tế, giúp bác sĩ theo dõi mà không cần thăm khám trực tiếp thường xuyên."
          />
          <UseCaseCard
            // Icon cho gia đình/người chăm sóc
            icon={<Users className="w-6 h-6 text-primary" />}
            title="An tâm cho Gia đình"
            description="Người nhà nhận được cảnh báo kịp thời khi có dấu hiệu bất thường, dễ dàng hơn trong việc hỗ trợ và chăm sóc bệnh nhân."
          />
          <UseCaseCard
            // Icon cho lợi ích hệ thống y tế/bệnh viện
            icon={<Hospital className="w-6 h-6 text-primary" />}
            title="Tối ưu Nguồn lực Y tế"
            description="Giảm tải cho bệnh viện nhờ hạn chế các ca cấp cứu, giúp phân bổ nguồn lực hiệu quả hơn cho các hoạt động chăm sóc khác."
          />
        </div>
      </div>
    </section>
  );
}

// Component UseCaseCard giữ nguyên cấu trúc
type UseCaseCardProps = { icon: React.ReactNode; title: string; description: string };

function UseCaseCard({ icon, title, description }: UseCaseCardProps) {
  return (
    <div className="p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow"> {/* Có thể đổi nền nếu section có nền background */}
      <div className="feature-icon mb-4 p-3 rounded-full bg-primary/10 w-fit">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default BenefitsApplicationsSectionCOPD; // Đổi tên component xuất ra