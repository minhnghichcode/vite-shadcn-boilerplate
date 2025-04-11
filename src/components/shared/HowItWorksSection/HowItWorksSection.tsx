import type React from "react";
// Chọn icons phù hợp với quy trình của COPDSENSE
// Ví dụ: ClipboardList (thu thập), BrainCircuit (AI xử lý), BellRing (cảnh báo)
import { ClipboardList, BrainCircuit, BellRing } from "lucide-react";

function HowItWorksSectionCOPD() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-secondary"> {/* Giữ màu nền hoặc thay đổi */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          {/* Tiêu đề và mô tả về cách COPDSENSE hoạt động */}
          <h2 className="text-3xl font-bold tracking-tight mb-4">COPDSENSE Hoạt động Như thế nào?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Quy trình đơn giản giúp theo dõi sức khỏe, phát hiện sớm nguy cơ và nhận cảnh báo kịp thời.
          </p>
        </div>
        {/* Grid các bước hoạt động */}
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <StepCard
            // Icon cho bước thu thập dữ liệu
            icon={<ClipboardList className="w-8 h-8 text-primary" />}
            title="1. Thu thập Dữ liệu"
            description="Bệnh nhân đeo thiết bị IoT theo dõi SpO2, nhịp tim và cập nhật các triệu chứng bất thường qua ứng dụng đơn giản."
          />
          <StepCard
            // Icon cho bước AI phân tích
            icon={<BrainCircuit className="w-8 h-8 text-primary" />}
            title="2. AI Phân tích & Dự đoán"
            description="Hệ thống AI thông minh xử lý dữ liệu theo thời gian thực, so sánh với chỉ số nền và dự đoán nguy cơ xảy ra đợt cấp."
          />
          <StepCard
            // Icon cho bước cảnh báo và theo dõi
            icon={<BellRing className="w-8 h-8 text-primary" />}
            title="3. Cảnh báo & Theo dõi"
            description="Gửi cảnh báo tức thì đến bệnh nhân, người thân và bác sĩ khi phát hiện dấu hiệu nguy hiểm. Bác sĩ theo dõi diễn biến qua dashboard trực quan."
          />
        </div>
      </div>
    </section>
  );
}

// Component StepCard giữ nguyên cấu trúc
type StepCardProps = { icon: React.ReactNode; title: string; description: string };

function StepCard({ icon, title, description }: StepCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default HowItWorksSectionCOPD; // Đổi tên component