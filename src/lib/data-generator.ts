import type { ChartData } from "../types/Charts"

const STORAGE_KEY = 'dashboard_chart_data';

// Helper to create smoother transitions in data
function smoothRandomValue(min: number, max: number, previousValue: number | null = null, volatility = 0.3): number {
  if (previousValue === null) {
    return min + Math.random() * (max - min)
  }
  
  // Calculate a new random value that's influenced by the previous value
  const randomChange = (Math.random() - 0.5) * 2 * volatility * (max - min)
  let newValue = previousValue + randomChange
  
  // Ensure the value stays within bounds
  newValue = Math.max(min, Math.min(max, newValue))
  
  return newValue
}

// Add occasional outliers
function addOutlier(value: number, min: number, max: number, outlierChance = 0.05): number {
  if (Math.random() < outlierChance) {
    return Math.random() < 0.5 
      ? min + Math.random() * (min * 0.5) 
      : max + Math.random() * (max * 0.3)
  }
  return value
}

// Weekly patterns helper
function getWeekdayFactor(date: Date): number {
  const day = date.getDay()
  return (day === 0 || day === 6) ? 1.2 : 1.0
}

// Generate one day's data based on previous day
function generateNextDayData(prevData: ChartData | null, currentDate: Date): ChartData {
  const dateStr = currentDate.toISOString()
  
  // If no previous data, initialize with base values
  if (!prevData) {
    return {
      calories: [{ date: dateStr, value: 1600 + Math.random() * 200 }],
      distance: [{ date: dateStr, value: 2 + Math.random() }],
      floors: [{ date: dateStr, value: Math.random() < 0.7 ? 0.8 + Math.random() * 0.4 : 0 }],
      steps: [{ date: dateStr, value: 3500 + Math.random() * 1000 }],
      pm25: [{ date: dateStr, value: 10 + Math.random() * 5 }],
      temperature: [{ date: dateStr, value: 28 + Math.random() * 2 }],
      humidity: [{ date: dateStr, value: 60 + Math.random() * 5 }],
      heartRate: [{ date: dateStr, value: 75 + Math.random() * 5 }],
      sleepTime: [{ date: dateStr, value: 25000 + Math.random() * 5000 }],
      spo2: [{ date: dateStr, value: 96 + Math.random() * 2 }] // Initial SpO2 value (typically 96-98%)
    }
  }

  // Get the last values
  const lastValues = {
    calories: prevData.calories[prevData.calories.length - 1].value,
    distance: prevData.distance[prevData.distance.length - 1].value,
    floors: prevData.floors[prevData.floors.length - 1].value,
    steps: prevData.steps[prevData.steps.length - 1].value,
    pm25: prevData.pm25[prevData.pm25.length - 1].value,
    temperature: prevData.temperature[prevData.temperature.length - 1].value,
    humidity: prevData.humidity[prevData.humidity.length - 1].value,
    heartRate: prevData.heartRate[prevData.heartRate.length - 1].value,
    sleepTime: prevData.sleepTime[prevData.sleepTime.length - 1].value,
    spo2: prevData.spo2[prevData.spo2.length - 1].value
  }

  // Generate next day's data based on previous values
  const weekdayFactor = getWeekdayFactor(currentDate)
  
  return {
    calories: [{ 
      date: dateStr, 
      value: addOutlier(smoothRandomValue(1400, 1900, lastValues.calories, 0.15) * (1/weekdayFactor), 1200, 2200, 0.08)
    }],
    distance: [{
      date: dateStr,
      value: addOutlier(smoothRandomValue(1.3, 3.8, lastValues.distance, 0.25) * (1/weekdayFactor), 0.8, 5, 0.1)
    }],
    floors: [{
      date: dateStr,
      value: Math.random() < 0.7 ? smoothRandomValue(0.5, 1.5, lastValues.floors, 0.3) * (currentDate.getDay() >= 1 && currentDate.getDay() <= 5 ? 1.2 : 0.7) : 0
    }],
    steps: [{
      date: dateStr,
      value: addOutlier(smoothRandomValue(2000, 6000, lastValues.steps, 0.2) * (1/weekdayFactor), 500, 8000, 0.1)
    }],
    pm25: [{
      date: dateStr,
      value: addOutlier(smoothRandomValue(5, 20, lastValues.pm25, 0.15), 3, 40, 0.15)
    }],
    temperature: [{
      date: dateStr,
      value: addOutlier(smoothRandomValue(22, 33, lastValues.temperature, 0.2), 20, 38, 0.05)
    }],
    humidity: [{
      date: dateStr,
      value: addOutlier(smoothRandomValue(40, 75, lastValues.humidity, 0.15), 30, 85, 0.08)
    }],
    heartRate: [{
      date: dateStr,
      value: addOutlier(smoothRandomValue(68, 82, lastValues.heartRate, 0.1), 55, 100, 0.07)
    }],
    sleepTime: [{
      date: dateStr,
      value: addOutlier(smoothRandomValue(18000, 28500, lastValues.sleepTime, 0.2) * weekdayFactor, 7200, 36000, 0.15)
    }],
    spo2: [{
      date: dateStr,
      value: addOutlier(smoothRandomValue(94, 98, lastValues.spo2, 0.1), 88, 100, 0.07) // SpO2 normally 94-99%, with outliers 88-100%
    }]
  }
}

// Generate sequential data and save to localStorage
export function generateSequentialData(startDate: Date, numDays: number): ChartData {
  const allData: ChartData = {
    calories: [],
    distance: [],
    floors: [],
    steps: [],
    pm25: [],
    temperature: [],
    humidity: [],
    heartRate: [],
    sleepTime: [],
    spo2: [] // Added SpO2 array
  }

  let currentData: ChartData | null = null
  const currentDate = new Date(startDate)

  for (let i = 0; i < numDays; i++) {
    currentData = generateNextDayData(currentData, currentDate)

    // Append new day's data
    Object.keys(allData).forEach(key => {
      allData[key as keyof ChartData].push(currentData![key as keyof ChartData][0])
    })

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1)
  }

  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allData))
  return allData
}

// Load data from localStorage
export function loadChartData(): ChartData | null {
  const storedData = localStorage.getItem(STORAGE_KEY)
  if (!storedData) return null
  return JSON.parse(storedData) as ChartData
}
