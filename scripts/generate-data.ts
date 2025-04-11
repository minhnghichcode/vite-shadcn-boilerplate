import { generateSequentialData } from '../src/lib/data-generator'
import * as fs from 'fs'
import * as path from 'path'

// Generate 90 days of data starting from today
const startDate = new Date()
startDate.setDate(startDate.getDate() - 90)

// Generate and save data
try {
  // Generate the data
  const data = generateSequentialData(startDate, 90)
  
  // Create public directory if it doesn't exist
  const publicDir = path.join(__dirname, '../public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  
  // Write data to JSON file
  fs.writeFileSync(
    path.join(publicDir, 'chart_data.json'), 
    JSON.stringify(data, null, 2)
  )
  
  console.log('Generated data file at public/chart_data.json')
} catch (error) {
  console.error('Failed to generate data:', error)
}
