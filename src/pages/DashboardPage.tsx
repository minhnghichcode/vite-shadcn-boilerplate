"use client"

import React, { useEffect, useState, useCallback } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { DashboardCharts } from "@/components/dashboard-charts"
import { generateSequentialData, loadChartData } from "@/lib/data-generator"
import { DashboardChatBot } from "@/components/dashboard-chatbot"
import type { ChartData } from "@/types/Charts"

const WINDOW_SIZE = 30; // Show 30 days at a time
const LOW_SLEEP_THRESHOLD = 10; // Force low sleep after 10 seconds

function useChartDataDisplay() {
  const [fullData, setFullData] = useState<ChartData | null>(null)
  const [displayData, setDisplayData] = useState<ChartData | null>(null)
  const [currentStartIndex, setCurrentStartIndex] = useState(0)
  const [isMockingPaused, setIsMockingPaused] = useState(false)
  const [sleepAlert, setSleepAlert] = useState<string | null>(null)
  const [startTime] = useState(Date.now())
  const [forceLowSleep, setForceLowSleep] = useState(false)

  const getDataWindow = useCallback((data: ChartData, startIdx: number, size: number): ChartData => {
    return {
      calories: data.calories.slice(startIdx, startIdx + size),
      distance: data.distance.slice(startIdx, startIdx + size),
      floors: data.floors.slice(startIdx, startIdx + size),
      steps: data.steps.slice(startIdx, startIdx + size),
      pm25: data.pm25.slice(startIdx, startIdx + size),
      temperature: data.temperature.slice(startIdx, startIdx + size),
      humidity: data.humidity.slice(startIdx, startIdx + size),
      heartRate: data.heartRate.slice(startIdx, startIdx + size),
      sleepTime: data.sleepTime.slice(startIdx, startIdx + size),
      spo2: data.spo2.slice(startIdx, startIdx + size),
    }
  }, [])

  // Check time elapsed and set force low sleep
  useEffect(() => {
    const timer = setInterval(() => {
      if (!forceLowSleep && Date.now() - startTime >= LOW_SLEEP_THRESHOLD * 1000) {
        setForceLowSleep(true);
        console.log('Forcing low sleep time');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, forceLowSleep]);

  // Initial data load from JSON file or localStorage fallback
  useEffect(() => {
    const loadData = async () => {
      try {
        // First try to fetch from the static JSON file
        const response = await fetch('/chart_data.json')
        if (response.ok) {
          const data = await response.json()
          console.log('Loaded data from JSON file')
          setFullData(data)
          const initialWindow = getDataWindow(data, 0, WINDOW_SIZE)
          setDisplayData(initialWindow)
          return
        }

        // If JSON file not found, try localStorage
        let data = loadChartData()
        if (!data) {
          // Generate new data if nothing exists
          const startDate = new Date()
          startDate.setDate(startDate.getDate() - 90)
          data = generateSequentialData(startDate, 90)
          console.log('Generated new data')
        }
        
        console.log('Data loaded from localStorage')
        setFullData(data)
        const initialWindow = getDataWindow(data, 0, WINDOW_SIZE)
        setDisplayData(initialWindow)
      } catch (error) {
        console.error('Error in data loading:', error)
        
        // Final fallback: generate new data
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - 90)
        const data = generateSequentialData(startDate, 90)
        console.log('Generated fallback data')
        setFullData(data)
        const initialWindow = getDataWindow(data, 0, WINDOW_SIZE)
        setDisplayData(initialWindow)
      }
    }

    loadData()
  }, [getDataWindow])

  // Update displayed data window
  const updateDisplay = useCallback(() => {
    if (!fullData || isMockingPaused) return;

    // Get the current sleep time
    const lastSleepTime = fullData.sleepTime[currentStartIndex + WINDOW_SIZE - 1];
    const sleepTimeInHours = lastSleepTime.value / 3600;

    // If force low sleep is active, modify the sleep time
    if (forceLowSleep) {
      const lowSleepTime = 4 * 3600; // 4 hours in seconds
      const updatedData = {
        ...fullData,
        sleepTime: fullData.sleepTime.map((item, index) => {
          if (index === currentStartIndex + WINDOW_SIZE - 1) {
            return { ...item, value: lowSleepTime };
          }
          return item;
        })
      };
      setFullData(updatedData);
      const newWindow = getDataWindow(updatedData, currentStartIndex, WINDOW_SIZE);
      setDisplayData(newWindow);
      setSleepAlert(`Cảnh báo: Thời gian ngủ chỉ ${(lowSleepTime/3600).toFixed(1)} giờ, dưới ngưỡng đề xuất 5 giờ!`);
      setIsMockingPaused(true);
      setForceLowSleep(false);
      return;
    }

    // Normal sleep time check
    if (sleepTimeInHours < 5) {
      setSleepAlert(`Cảnh báo: Thời gian ngủ chỉ ${sleepTimeInHours.toFixed(1)} giờ, dưới ngưỡng đề xuất 5 giờ!`);
      setIsMockingPaused(true);
      return;
    }

    // Move window forward if we haven't reached the end
    if (currentStartIndex + WINDOW_SIZE < fullData.calories.length) {
      setCurrentStartIndex(prev => prev + 1);
      setDisplayData(getDataWindow(fullData, currentStartIndex + 1, WINDOW_SIZE));
    }
  }, [currentStartIndex, fullData, isMockingPaused, getDataWindow, forceLowSleep])

  const resetMocking = useCallback(() => {
    setIsMockingPaused(false)
    setSleepAlert(null)
  }, [])

  return {
    displayData,
    isMockingPaused,
    sleepAlert,
    updateDisplay,
    resetMocking,
  }
}

export default function DashboardPage() {
  const {
    displayData,
    isMockingPaused,
    sleepAlert,
    updateDisplay,
    resetMocking,
  } = useChartDataDisplay()

  // Update display every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updateDisplay()
    }, 2000)

    return () => clearInterval(interval)
  }, [updateDisplay])

  if (!displayData) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader
        title="dashboard"
        breadcrumbs={[{ title: "Report", href: "/" }, { title: "dashboard" }]}
      />

      <div className="flex-1 p-6 overflow-x-hidden">
        <div className="flex justify-between items-center mb-6">
          {isMockingPaused && (
            <div className="flex items-center">
              <span className="text-red-500 mr-2 font-medium">⚠️ {sleepAlert}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCharts data={displayData} />
        </div>
      </div>
      
      <DashboardChatBot 
        sleepAlert={sleepAlert}
        isMockingPaused={isMockingPaused}
        onResetMocking={resetMocking}
      />
    </div>
  )
}
