export interface DataPoint {
    date: string
    value: number
  }
  
  export interface ChartData {
    calories: DataPoint[]
    distance: DataPoint[]
    floors: DataPoint[]
    steps: DataPoint[]
    pm25: DataPoint[]
    temperature: DataPoint[]
    humidity: DataPoint[]
    heartRate: DataPoint[]
    sleepTime: DataPoint[]
    spo2: DataPoint[]
  }
