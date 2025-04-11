"use client"
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { DataPoint } from "../../types/Charts"

interface TemperatureChartProps {
  data: DataPoint[]
}

export function TemperatureChart({ data }: TemperatureChartProps) {
  return (
    <ChartContainer
      config={{
        temperature: {
          label: "Temperature",
          color: "#2563eb", // blue-600
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
            width={40}
            tickFormatter={(value) => value.toFixed(1)}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ fill: "#2563eb", r: 2 }}
            isAnimationActive={true}
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
