"use client"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { DataPoint } from "../../types/Charts"

interface FloorsChartProps {
  data: DataPoint[]
}

export function FloorsChart({ data }: FloorsChartProps) {
  return (
    <ChartContainer
      config={{
        floors: {
          label: "Floors",
          color: "#3b82f6", // blue-500
        },
      }}
      className="h-[180px] w-full px-2"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
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
            domain={[0, "auto"]}
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={40}
            tickFormatter={(value) => value.toFixed(1)}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="value" fill="#3b82f6" isAnimationActive={true} animationDuration={300} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
