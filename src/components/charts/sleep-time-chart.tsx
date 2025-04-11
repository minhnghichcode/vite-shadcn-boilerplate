"use client"
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { DataPoint } from "../../types/Charts"

interface SleepTimeChartProps {
  data: DataPoint[]
}

export function SleepTimeChart({ data }: SleepTimeChartProps) {
  return (
    <ChartContainer
      config={{
        sleepTime: {
          label: "Sleep Time",
          color: "#a855f7", // purple-500
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
              // Display hours and minutes to show timeline progression
              return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
            }}
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            height={20}
          />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={50}
            tickFormatter={(value) => {
              // Format as hours:minutes
              const hours = Math.floor(value / 3600)
              const minutes = Math.floor((value % 3600) / 60)
              return `${hours}h${minutes}m`
            }}
          />
          <Tooltip
            content={
              <ChartTooltipContent
                formatter={(value) => {
                  const hours = Math.floor(value / 3600)
                  const minutes = Math.floor((value % 3600) / 60)
                  return `${hours}h ${minutes}m`
                }}
              />
            }
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#a855f7"
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
