"use client"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { DataPoint } from "../../types/Charts"

interface StepsChartProps {
  data: DataPoint[]
}

export function StepsChart({ data }: StepsChartProps) {
  return (
    <ChartContainer
      config={{
        steps: {
          label: "Steps",
          color: "#3b82f6", // blue-500
        },
      }}
      className="h-[180px] w-full px-2"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
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
            width={40}
            tickFormatter={(value) => Math.round(value).toString()}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorSteps)"
            isAnimationActive={true}
            animationDuration={300}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
