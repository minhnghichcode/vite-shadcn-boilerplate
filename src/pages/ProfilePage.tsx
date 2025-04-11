"use client"

import { useState } from "react"
import type React from "react"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Heart, TreesIcon as Lungs, Activity, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import profileData from "./profile.json"
import ExacerbationForecast  from "./exacerbation-forecast.tsx"

const ProfilePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Profile" breadcrumbs={[{ title: "Account", href: "/" }, { title: "Profile" }]} />
      <main className="flex-1 p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Thông tin bệnh nhân</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center text-4xl font-bold">
                    {profileData.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">
                    {profileData.name} - {profileData.age} tuổi
                  </h2>
                  <p className="text-muted-foreground">ID: {profileData.id}</p>
                  <p className="text-muted-foreground">Ngày khám gần nhất: {profileData.lastCheckup}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Chỉ số tim mạch
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Nhịp tim trung bình</span>
                  <span className="text-sm font-medium">{profileData.heartRate} nhịp/phút</span>
                </div>
                <Progress value={profileData.heartRate} max={120} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">SpO2 trung bình</span>
                  <span className="text-sm font-medium">{profileData.spo2}%</span>
                </div>
                <Progress value={profileData.spo2} max={100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lungs className="h-5 w-5 text-blue-500" />
                Đánh giá COPD
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-sm font-medium">mMRC</span>
                  <div className="text-2xl font-bold">{profileData.mMRC}</div>
                  <p className="text-xs text-muted-foreground">{profileData.mMRCDescription}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-medium">CAT</span>
                  <div className="text-2xl font-bold">{profileData.CAT}</div>
                  <p className="text-xs text-muted-foreground">{profileData.CATDescription}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-500" />
                Chức năng phổi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <span className="text-sm font-medium">FEV1</span>
                  <div className="text-2xl font-bold">{profileData.FEV1.value} L</div>
                  <p className="text-xs text-muted-foreground">
                    {profileData.FEV1.predicted}% dự đoán (GOLD {profileData.FEV1.goldStage})
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-medium">Tốc độ suy giảm</span>
                  <div className="text-2xl font-bold">{profileData.FEV1.decline} mL/năm</div>
                  <p className="text-xs text-muted-foreground">Nhanh hơn bình thường</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-medium">Tỷ lệ cấp (7 ngày tới)</span>
                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">{profileData.exacerbationRate}%</span>
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        </div>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px]">
                      <DialogHeader>
                        <DialogTitle className="text-xl">Dự báo đợt cấp COPD (7 ngày tới)</DialogTitle>
                        <DialogDescription>
                          Phân tích nguy cơ đợt cấp COPD dựa trên dữ liệu bệnh nhân và các yếu tố môi trường
                        </DialogDescription>
                      </DialogHeader>
                      <ExacerbationForecast patientData={profileData} />
                    </DialogContent>
                  </Dialog>
                  <p className="text-xs text-muted-foreground">Nhấn để xem chi tiết</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default ProfilePage
