"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CaloriesChart } from "./charts/calories-chart"
import { DistanceChart } from "./charts/distance-chart"
import { FloorsChart } from "./charts/floors-chart"
import { StepsChart } from "./charts/steps-chart"
import { PM25Chart } from "./charts/pm25-chart"
import { TemperatureChart } from "./charts/temperature-chart"
import { HumidityChart } from "./charts/humidity-chart"
import { HeartRateChart } from "./charts/heart-rate-chart"
import { SleepTimeChart } from "./charts/sleep-time-chart"
import { SpO2Chart } from "./charts/spo2-chart"
import type { ChartData } from "../types/Charts"

interface DashboardChartsProps {
  data: ChartData
}

export function DashboardCharts({ data }: DashboardChartsProps) {
  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-center">Calories</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-4 pl-2">
          <CaloriesChart data={data.calories} />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-center">Distance</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-4 pl-2">
          <DistanceChart data={data.distance} />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-center">Floors</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-4 pl-2">
          <FloorsChart data={data.floors} />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-center">Step</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-4 pl-2">
          <StepsChart data={data.steps} />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-center">Pm 2.5</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-4 pl-2">
          <PM25Chart data={data.pm25} />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-center">Temperature</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-4 pl-2">
          <TemperatureChart data={data.temperature} />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-center">Humidity</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-4 pl-2">
          <HumidityChart data={data.humidity} />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-center">Daily Mean Heart Rate</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-4 pl-2">
          <HeartRateChart data={data.heartRate} />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-center">Daily Total Sleep Time</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-4 pl-2">
          <SleepTimeChart data={data.sleepTime} />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-center">SpO2 Level</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-4 pl-2">
          <SpO2Chart data={data.spo2} />
        </CardContent>
      </Card>
    </>
  )
}
