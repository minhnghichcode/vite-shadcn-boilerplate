import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper to create smoother transitions in data
function smoothRandomValue(min, max, previousValue = null, volatility = 0.3) {
  if (previousValue === null) {
    return min + Math.random() * (max - min);
  }
  
  const randomChange = (Math.random() - 0.5) * 2 * volatility * (max - min);
  let newValue = previousValue + randomChange;
  newValue = Math.max(min, Math.min(max, newValue));
  
  return newValue;
}

// Generate one day's data
function generateNextDayData(prevData, currentDate) {
  const dateStr = currentDate.toISOString();
  
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
      sleepTime: [{ date: dateStr, value: 25000 + Math.random() * 5000 }]
    };
  }

  // Get last values
  const lastValues = {
    calories: prevData.calories[prevData.calories.length - 1].value,
    distance: prevData.distance[prevData.distance.length - 1].value,
    floors: prevData.floors[prevData.floors.length - 1].value,
    steps: prevData.steps[prevData.steps.length - 1].value,
    pm25: prevData.pm25[prevData.pm25.length - 1].value,
    temperature: prevData.temperature[prevData.temperature.length - 1].value,
    humidity: prevData.humidity[prevData.humidity.length - 1].value,
    heartRate: prevData.heartRate[prevData.heartRate.length - 1].value,
    sleepTime: prevData.sleepTime[prevData.sleepTime.length - 1].value
  };

  // Generate next values
  return {
    calories: [{ date: dateStr, value: smoothRandomValue(1400, 1900, lastValues.calories, 0.15) }],
    distance: [{ date: dateStr, value: smoothRandomValue(1.3, 3.8, lastValues.distance, 0.25) }],
    floors: [{ date: dateStr, value: Math.random() < 0.7 ? smoothRandomValue(0.5, 1.5, lastValues.floors, 0.3) : 0 }],
    steps: [{ date: dateStr, value: smoothRandomValue(2000, 6000, lastValues.steps, 0.2) }],
    pm25: [{ date: dateStr, value: smoothRandomValue(5, 20, lastValues.pm25, 0.15) }],
    temperature: [{ date: dateStr, value: smoothRandomValue(22, 33, lastValues.temperature, 0.2) }],
    humidity: [{ date: dateStr, value: smoothRandomValue(40, 75, lastValues.humidity, 0.15) }],
    heartRate: [{ date: dateStr, value: smoothRandomValue(68, 82, lastValues.heartRate, 0.1) }],
    sleepTime: [{ date: dateStr, value: smoothRandomValue(18000, 28800, lastValues.sleepTime, 0.2) }]
  };
}

// Generate sequential data
function generateSequentialData(startDate, numDays) {
  const allData = {
    calories: [],
    distance: [],
    floors: [],
    steps: [],
    pm25: [],
    temperature: [],
    humidity: [],
    heartRate: [],
    sleepTime: []
  };

  let currentData = null;
  const currentDate = new Date(startDate);

  for (let i = 0; i < numDays; i++) {
    currentData = generateNextDayData(currentData, currentDate);

    // After 10 days, force sleep time to be below 5 hours (18000 seconds)
    if (i > 10 && currentData.sleepTime[0]) {
      currentData.sleepTime[0].value = 4 * 3600; // 4 hours in seconds
    }

    // Append new day's data
    Object.keys(allData).forEach(key => {
      allData[key].push(currentData[key][0]);
    });

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return allData;
}

// Generate the data
const startDate = new Date();
startDate.setDate(startDate.getDate() - 90);

const data = generateSequentialData(startDate, 90);

// Create public directory if it doesn't exist
const publicDir = join(dirname(__dirname), 'public');
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

// Write data to file
writeFileSync(
  join(publicDir, 'chart_data.json'),
  JSON.stringify(data, null, 2)
);

console.log('Generated data file at public/chart_data.json');
