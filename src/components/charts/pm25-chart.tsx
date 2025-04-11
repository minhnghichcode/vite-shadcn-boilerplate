"use client"
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { DataPoint } from "../../types/Charts"

interface PM25ChartProps {
  data: DataPoint[]
}

export function PM25Chart({ data }: PM25ChartProps) {
  return (
    <ChartContainer
      config={{
        pm25: {
          label: "PM 2.5",
          color: "#22c55e", // green-500
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
            domain={[0, "auto"]}
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
            stroke="#22c55e"
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
