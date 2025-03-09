
import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock weather data
const weatherData = {
  location: 'Farmland, CA',
  temperature: 24,
  condition: 'Partly Cloudy',
  humidity: 65,
  windSpeed: 12,
  windDirection: 'NE',
  dailyForecast: [
    { day: 'Mon', temp: 24, condition: 'sun' },
    { day: 'Tue', temp: 26, condition: 'sun' },
    { day: 'Wed', temp: 23, condition: 'cloud' },
    { day: 'Thu', temp: 22, condition: 'rain' },
    { day: 'Fri', temp: 20, condition: 'rain' },
  ]
};

type WeatherCondition = 'sun' | 'cloud' | 'rain';

const WeatherIcon = ({ condition, className }: { condition: WeatherCondition, className?: string }) => {
  switch (condition) {
    case 'sun':
      return <Sun className={className || 'h-6 w-6 text-amber-500'} />;
    case 'cloud':
      return <Cloud className={className || 'h-6 w-6 text-sky-400'} />;
    case 'rain':
      return <CloudRain className={className || 'h-6 w-6 text-sky-600'} />;
    default:
      return <Sun className={className || 'h-6 w-6 text-amber-500'} />;
  }
};

const WeatherWidget = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }));
    };
    
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-sky-400 to-sky-600 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-sky-100">{currentDate}</p>
            <h3 className="text-2xl font-bold mt-1">{weatherData.location}</h3>
            <p className="text-sm text-sky-100">{currentTime}</p>
          </div>
          <div className="flex items-center">
            <Cloud className="h-10 w-10 mr-2 text-white" />
            <span className="text-3xl font-bold">{weatherData.temperature}°C</span>
          </div>
        </div>
        <p className="mt-2 text-sky-100">{weatherData.condition}</p>
        
        <div className="flex justify-between mt-6">
          <div className="flex items-center">
            <Droplets className="h-4 w-4 mr-1 text-sky-100" />
            <span className="text-sm">{weatherData.humidity}%</span>
          </div>
          <div className="flex items-center">
            <Wind className="h-4 w-4 mr-1 text-sky-100" />
            <span className="text-sm">{weatherData.windSpeed} km/h {weatherData.windDirection}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between">
          {weatherData.dailyForecast.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-600">{day.day}</span>
              <WeatherIcon condition={day.condition} className="h-6 w-6 my-2" />
              <span className="text-sm font-semibold">{day.temp}°</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
