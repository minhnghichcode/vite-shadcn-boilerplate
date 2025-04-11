import type React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

// Đổi tên section cho phù hợp
function ServicePackagesSectionCOPD() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-secondary" id="goi-dich-vu"> {/* Đặt ID phù hợp */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          {/* Tiêu đề và mô tả về các gói dịch vụ/chi phí */}
          <h2 className="text-3xl font-bold tracking-tight mb-4">Gói Dịch vụ Linh hoạt & Minh bạch</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Lựa chọn giải pháp phù hợp cho bệnh nhân hoặc gói hợp tác triển khai dành cho cơ sở y tế.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Gói dành cho Bệnh viện (B2B - Giai đoạn 2) */}
          <PricingCard
            title="Gói Triển khai Bệnh viện"
            price="Liên hệ" // Giá B2B thường cần tư vấn riêng
            description="Giải pháp ban đầu để bệnh viện triển khai và đánh giá hiệu quả COPDSENSE."
            features={[
              "Thiết lập hệ thống ban đầu",
              "Cung cấp Dashboard theo dõi cho bác sĩ",
              "Đào tạo nhân viên y tế sử dụng",
              "Số lượng giấy phép bệnh nhân ban đầu (thỏa thuận)",
              "Hỗ trợ kỹ thuật cơ bản",
              "Tùy chọn tích hợp EMR (thảo luận thêm)",
            ]}
            buttonText="Yêu cầu Tư vấn"
            buttonLink="/lien-he" // Đường dẫn đến trang liên hệ
            highlighted={false}
          />
          {/* Gói dành cho Bệnh nhân (B2B2C - Giai đoạn 3 - Có thể làm nổi bật) */}
          <PricingCard
            title="Gói Bệnh nhân COPDSENSE"
            price="200.000 VNĐ" // Phí theo dõi hàng tháng
            priceSuffix="/tháng" // Thêm đơn vị thời gian
            description="Theo dõi sức khỏe tại nhà toàn diện với thiết bị IoT và AI (chưa bao gồm phí thiết bị ban đầu)." // Làm rõ có phí thiết bị
            features={[
              "Cung cấp 01 thiết bị IoT (đồng hồ thông minh - có phí riêng)", // Nêu rõ thiết bị và phí
              "Ứng dụng di động cho bệnh nhân & người nhà",
              "Theo dõi SpO2, nhịp tim liên tục",
              "Phân tích & dự đoán đợt cấp bằng AI",
              "Cảnh báo sớm đến người dùng & bác sĩ",
              "Xem lại lịch sử dữ liệu",
              "Hỗ trợ người dùng qua ứng dụng",
            ]}
            buttonText="Tìm hiểu Chi tiết" // Hoặc "Đăng ký qua Bệnh viện"
            buttonLink="/goi-benh-nhan" // Đường dẫn đến trang chi tiết gói bệnh nhân
            highlighted={true} // Làm nổi bật gói này
          />
          {/* Gói tùy chỉnh/Doanh nghiệp lớn (B2B/B2B2C quy mô lớn) */}
          <PricingCard
            title="Giải pháp Tùy chỉnh"
            price="Tùy chỉnh"
            description="Dành cho bệnh viện quy mô lớn, dự án nghiên cứu hoặc nhu cầu tích hợp chuyên sâu."
            features={[
              "Triển khai không giới hạn số lượng",
              "Tùy chỉnh tính năng theo yêu cầu",
              "Tích hợp hệ thống nâng cao (API, EMR)",
              "Phân tích dữ liệu chuyên sâu",
              "Hỗ trợ kỹ thuật chuyên biệt 24/7",
              "Cam kết chất lượng dịch vụ (SLA)",
              "Hợp tác nghiên cứu & phát triển",
            ]}
            buttonText="Liên hệ Hợp tác"
            buttonLink="/lien-he" // Đường dẫn đến trang liên hệ
            highlighted={false}
          />
        </div>
        {/* Ghi chú thêm về chi phí thiết bị */}
        <p className="text-center text-muted-foreground mt-12">
          * Gói Bệnh nhân COPDSENSE yêu cầu mua thiết bị IoT ban đầu (ước tính 2.500.000 VNĐ/thiết bị). Vui lòng liên hệ để biết chi tiết.
        </p>
      </div>
    </section>
  );
}

// Component PricingCard được cập nhật để hiển thị giá VNĐ và hậu tố giá
type PricingCardProps = {
  title: string;
  price: string;
  priceSuffix?: string; // Thêm hậu tố giá tùy chọn (ví dụ: /tháng)
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  highlighted: boolean;
};

function PricingCard({
  title,
  price,
  priceSuffix,
  description,
  features,
  buttonText,
  buttonLink,
  highlighted,
}: PricingCardProps) {
  const isCustomPrice = price.toLowerCase() === "liên hệ" || price.toLowerCase() === "tùy chỉnh";

  return (
    <div
      className={`p-8 rounded-xl shadow-lg flex flex-col h-full ${
        highlighted
          ? "bg-primary text-primary-foreground border-2 border-primary lg:scale-105" // Chỉ scale lớn hơn trên lg screens
          : "bg-card border border-border"
      }`}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <div className="flex items-baseline mb-2">
          <span className={`text-4xl font-extrabold ${isCustomPrice ? 'text-2xl' : ''}`}>{price}</span>
          {/* Chỉ hiển thị hậu tố nếu giá không phải là tùy chỉnh/liên hệ */}
          {!isCustomPrice && priceSuffix && <span className="ml-1 text-sm">{priceSuffix}</span>}
        </div>
        <p className={`${highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{description}</p>
      </div>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check
              className={`w-5 h-5 mr-2 flex-shrink-0 ${highlighted ? "text-primary-foreground" : "text-green-500"}`}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link to={buttonLink} className="block w-full mt-auto"> {/* Đảm bảo nút ở cuối */}
        <button
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
            highlighted
              ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {buttonText}
        </button>
      </Link>
    </div>
  );
}

export default ServicePackagesSectionCOPD; // Đổi tên component