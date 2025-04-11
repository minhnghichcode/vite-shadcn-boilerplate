import type React from "react";

// Đổi tên section để phản ánh đúng nội dung hơn
function ImpactStatsSectionCOPD() {
  return (
    <section className="py-16 md:py-24 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        {/* Có thể thêm tiêu đề nhỏ ở đây nếu muốn, ví dụ: "Thực trạng & Tiềm năng" */}
        {/* <h3 className="text-center text-2xl font-semibold text-muted-foreground mb-12">Thực trạng & Tiềm năng</h3> */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {/* Số liệu 1: Tỷ lệ mắc bệnh */}
          <StatCard
            value="6,7%"
            label="Tỷ lệ mắc COPD (>40 tuổi tại VN)" // Nguồn: Đề án
          />
          {/* Số liệu 2: Mức độ nguy hiểm/nhập viện muộn */}
          <StatCard
            value="80%"
            label="Bệnh nhân nhập viện muộn" // Nguồn: Đề án
          />
          {/* Số liệu 3: Mục tiêu giảm nhập viện (Impact) */}
          <StatCard
            value="Giảm 30%" // Hoặc "Mục tiêu 30%"
            label="Mục tiêu giảm tỷ lệ nhập viện" // Nguồn: Đề án
          />
          {/* Số liệu 4: Tiết kiệm chi phí (Impact) */}
          <StatCard
            value="1-2 Triệu" // Thêm VNĐ nếu cần
            label="Tiết kiệm chi phí/năm/bệnh nhân" // Nguồn: Đề án
          />
        </div>
      </div>
    </section>
  );
}

// Component StatCard giữ nguyên cấu trúc
type StatCardProps = { value: string; label: string };

function StatCard({ value, label }: StatCardProps) {
  return (
    <div>
      <div className="text-4xl font-bold text-primary mb-2">{value}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
}

export default ImpactStatsSectionCOPD; // Đổi tên component