"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Thermometer, Wind, Droplets, Activity, Pill } from "lucide-react"

// Import the recharts components
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface PatientData {
  id: string
  name: string
  age: number
  heartRate: number
  spo2: number
  mMRC: number
  CAT: number
  exacerbationRate: number
  FEV1: {
    value: number
    predicted: number
    goldStage: string
    decline: number
  }
  [key: string]: number | string | { 
    value: number;
    predicted: number;
    goldStage: string;
    decline: number;
  }
}

interface ExacerbationForecastProps {
  patientData: PatientData
}

export default function ExacerbationForecast({ patientData }: ExacerbationForecastProps) {
  // No need to track activeTab since it's handled internally by Tabs component
  // Generate dates for the next 7 days
  const today = new Date()
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    return date.toLocaleDateString("vi-VN", { weekday: "short", month: "numeric", day: "numeric" })
  })

  // Generate forecast data
  const forecastData = [
    {
      day: "12/4/2025",
      temp: 27,
      humidity: 70,
      pollution: 153,
      risk: 4,
      medication: 100,
    },
    {
      day: "13/4/2025",
      temp: 31,
      humidity: 80,
      pollution: 126,
      risk: 3,
      medication: 100,
    },
    {
      day: "14/4/2025",
      temp: 28,
      humidity: 85,
      pollution: 123,
      risk: 3,
      medication: 100,
    },
    {
      day: "15/4/2025",
      temp: 30,
      humidity: 88,
      pollution: 129,
      risk: 3,
      medication: 100,
    },
    {
      day: "16/4/2025",
      temp: 32,
      humidity: 90,
      pollution: 135,
      risk: 4,
      medication: 100,
    },
    {
      day: "17/4/2025",
      temp: 33,
      humidity: 85,
      pollution: 140,
      risk: 4,
      medication: 100,
    },
    {
      day: "18/4/2025",
      temp: 35,
      humidity: 80,
      pollution: 145,
      risk: 4,
      medication: 100,
    },
  ];
  
  // Risk factors data
  const riskFactors = [
    { factor: "Tuổi cao", impact: 8, description: "Tuổi cao làm tăng nguy cơ đợt cấp" },
    { factor: "FEV1 thấp (<70%)", impact: 7, description: "Chức năng phổi suy giảm" },
    { factor: "Điểm CAT cao (>15)", impact: 6, description: "Triệu chứng COPD ảnh hưởng đáng kể" },
    { factor: "SpO2 thấp (<95%)", impact: 5, description: "Oxy máu thấp" },
    { factor: "Nhiệt độ cao (>30°C)", impact: 4, description: "Thời tiết nóng làm tăng nguy cơ" },
  ]

  // Get risk color based on value
  const getRiskColor = (risk: number) => {
    if (risk <= 2) return "bg-green-500"
    if (risk <= 4) return "bg-yellow-500"
    return "bg-red-500"
  }

  // Get risk label based on value
  const getRiskLabel = (risk: number) => {
    if (risk <= 2) return "Thấp"
    if (risk <= 4) return "Trung bình"
    return "Cao"
  }

  return (
    <div className="space-y-4 py-4">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="daily">Dự báo hàng ngày</TabsTrigger>
          <TabsTrigger value="factors">Yếu tố nguy cơ</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Nguy cơ đợt cấp</CardTitle>
                <CardDescription>Dự báo trong 7 ngày tới</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={forecastData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Area type="monotone" dataKey="risk" stroke="#ff9800" fill="#ffb74d" name="Mức độ nguy cơ" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Phân tích nguy cơ</CardTitle>
                <CardDescription>Dựa trên dữ liệu bệnh nhân</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Nguy cơ trung bình</p>
                      <div className="text-2xl font-bold">{patientData.exacerbationRate}%</div>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRiskColor(3)}`}>
                      <AlertTriangle className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Yếu tố chính</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-muted">
                        FEV1 thấp
                      </Badge>
                      <Badge variant="outline" className="bg-muted">
                        Tuổi cao
                      </Badge>
                      <Badge variant="outline" className="bg-muted">
                        Điểm CAT cao
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Khuyến nghị</p>
                    <p className="text-sm text-muted-foreground">
                      Theo dõi sát triệu chứng và duy trì thuốc điều trị đều đặn. Tránh tiếp xúc với môi trường ô nhiễm.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tóm tắt dự báo</CardTitle>
              <CardDescription>Dựa trên mô hình COPDSense</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  Dựa trên dữ liệu bệnh nhân và các yếu tố môi trường, hệ thống dự báo nguy cơ đợt cấp COPD trong 7 ngày
                  tới ở mức <strong>thấp đến trung bình (3%)</strong>. Tuy nhiên, cần lưu ý các yếu tố sau:
                </p>

                <ul className="space-y-2 list-disc pl-5">
                  <li>Chỉ số FEV1 thấp (60% dự đoán) là yếu tố nguy cơ chính</li>
                  <li>Điểm CAT cao (18) cho thấy triệu chứng COPD đang ảnh hưởng đáng kể</li>
                  <li>Dự báo thời tiết trong những ngày tới có thể làm tăng nguy cơ</li>
                </ul>

                <div className="rounded-lg bg-muted p-3">
                  <p className="font-medium">Khuyến nghị:</p>
                  <p className="text-sm text-muted-foreground">
                    Duy trì thuốc điều trị đều đặn, tránh tiếp xúc với môi trường ô nhiễm, theo dõi các triệu chứng hàng
                    ngày và liên hệ bác sĩ nếu có bất kỳ thay đổi nào.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Dự báo hàng ngày</CardTitle>
                <CardDescription>Nguy cơ đợt cấp theo ngày</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={forecastData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="risk" fill="#ff9800" name="Mức độ nguy cơ" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Yếu tố môi trường</CardTitle>
                <CardDescription>Ảnh hưởng đến nguy cơ đợt cấp</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={forecastData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="temp" stroke="#f44336" fill="#ffcdd2" name="Nhiệt độ (°C)" />
                      <Area type="monotone" dataKey="humidity" stroke="#2196f3" fill="#bbdefb" name="Độ ẩm (%)" />
                      <Area type="monotone" dataKey="pollution" stroke="#9e9e9e" fill="#e0e0e0" name="Ô nhiễm (AQI)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Chi tiết dự báo hàng ngày</CardTitle>
              <CardDescription>Phân tích chi tiết theo ngày</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {forecastData.map((day, index) => (
                  <Card key={index} className="border-0 shadow-sm">
                    <CardHeader className="pb-2 pt-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{day.day}</CardTitle>
                        <div className={`w-6 h-6 rounded-full ${getRiskColor(day.risk)}`}></div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Nguy cơ</span>
                          </div>
                          <span className="font-medium">{getRiskLabel(day.risk)}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Thermometer className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Nhiệt độ</span>
                          </div>
                          <span className="font-medium">{day.temp}°C</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Droplets className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Độ ẩm</span>
                          </div>
                          <span className="font-medium">{day.humidity}%</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Wind className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">AQI</span>
                          </div>
                          <span className="font-medium">{day.pollution}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="factors" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Yếu tố nguy cơ chính</CardTitle>
                <CardDescription>Mức độ ảnh hưởng đến nguy cơ đợt cấp</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={riskFactors}
                      layout="vertical"
                      margin={{ top: 10, right: 30, left: 150, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 10]} />
                      <YAxis type="category" dataKey="factor"  />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="impact" fill="#ff9800" name="Mức độ ảnh hưởng" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tuân thủ điều trị</CardTitle>
                <CardDescription>Ảnh hưởng đến nguy cơ đợt cấp</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={forecastData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="medication"
                        stroke="#4caf50"
                        fill="#c8e6c9"
                        name="Tuân thủ thuốc (%)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Chi tiết yếu tố nguy cơ</CardTitle>
              <CardDescription>Phân tích chi tiết các yếu tố ảnh hưởng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h3 className="font-medium flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-500" />
                      Yếu tố bệnh nhân
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <span className="text-sm">Tuổi (62)</span>
                        <Badge variant="outline" className="bg-yellow-100">
                          Trung bình
                        </Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm">FEV1 (60%)</span>
                        <Badge variant="outline" className="bg-yellow-100">
                          Trung bình
                        </Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm">CAT (18)</span>
                        <Badge variant="outline" className="bg-yellow-100">
                          Trung bình
                        </Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm">mMRC (2)</span>
                        <Badge variant="outline" className="bg-yellow-100">
                          Trung bình
                        </Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm">SpO2 (94%)</span>
                        <Badge variant="outline" className="bg-yellow-100">
                          Trung bình
                        </Badge>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium flex items-center gap-2">
                      <Thermometer className="h-5 w-5 text-red-500" />
                      Yếu tố môi trường
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <span className="text-sm">Nhiệt độ cao ({">"}30°C)</span>
                        <Badge variant="outline" className="bg-red-100">
                          Cao
                        </Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm">Độ ẩm cao ({">"}80%)</span>
                        <Badge variant="outline" className="bg-yellow-100">
                          Trung bình
                        </Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm">Ô nhiễm không khí (AQI{">"}50)</span>
                        <Badge variant="outline" className="bg-yellow-100">
                          Trung bình
                        </Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm">Thay đổi thời tiết</span>
                        <Badge variant="outline" className="bg-yellow-100">
                          Trung bình
                        </Badge>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium flex items-center gap-2">
                    <Pill className="h-5 w-5 text-green-500" />
                    Yếu tố điều trị
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between">
                      <span className="text-sm">Tuân thủ thuốc</span>
                      <Badge variant="outline" className="bg-green-100">
                        Tốt
                      </Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm">Kỹ thuật hít thuốc</span>
                      <Badge variant="outline" className="bg-green-100">
                        Tốt
                      </Badge>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-muted p-3">
                  <p className="font-medium">Khuyến nghị giảm thiểu nguy cơ:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                    <li>Tiếp tục duy trì thuốc điều trị đều đặn</li>
                    <li>Tránh tiếp xúc với môi trường ô nhiễm và nhiệt độ cao</li>
                    <li>Theo dõi các triệu chứng hàng ngày và ghi lại</li>
                    <li>Duy trì độ ẩm trong nhà ở mức phù hợp</li>
                    <li>Liên hệ bác sĩ ngay khi có dấu hiệu đợt cấp</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
