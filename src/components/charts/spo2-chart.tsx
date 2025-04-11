"use client"
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { DataPoint } from "../../types/Charts"

interface SpO2ChartProps {
  data: DataPoint[]
}

export function SpO2Chart({ data }: SpO2ChartProps) {
  return (
    <ChartContainer
      config={{
        spo2: {
          label: "SpO2",
          color: "#3b82f6", // blue-500
        },
      }}
      className="h-[180px] w-full px-2"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => {
              const date = new Date(value)
              return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
            }}
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            height={20}
          />
          <YAxis
            domain={[85, 100]} // SpO2 typically ranges from 85-100%
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={50}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            content={
              <ChartTooltipContent
                formatter={(value) => `${value}%`}
              />
            }
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}