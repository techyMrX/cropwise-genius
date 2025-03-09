
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Thermometer, PlusCircle, ArrowRight, Leaf, CloudRain, SunMedium } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, LineChart, Line } from 'recharts';
import Navbar from '@/components/Navbar';
import WeatherWidget from '@/components/WeatherWidget';

// Mock data for visualizations
const soilHealthData = [
  { name: 'Jan', nitrogen: 40, phosphorus: 24, potassium: 60 },
  { name: 'Feb', nitrogen: 30, phosphorus: 13, potassium: 70 },
  { name: 'Mar', nitrogen: 20, phosphorus: 98, potassium: 50 },
  { name: 'Apr', nitrogen: 27, phosphorus: 39, potassium: 40 },
  { name: 'May', nitrogen: 18, phosphorus: 48, potassium: 30 },
  { name: 'Jun', nitrogen: 23, phosphorus: 38, potassium: 45 },
  { name: 'Jul', nitrogen: 34, phosphorus: 43, potassium: 65 },
];

const cropYieldData = [
  {
    name: 'Wheat',
    current: 4200,
    previous: 3800,
    fill: '#4C9E57',
  },
  {
    name: 'Corn',
    current: 5100,
    previous: 4800,
    fill: '#E8B634',
  },
  {
    name: 'Soybeans',
    current: 3600,
    previous: 3900,
    fill: '#6BA5DD',
  },
  {
    name: 'Rice',
    current: 4800,
    previous: 4200,
    fill: '#D68E3C',
  },
];

const rainPrediction = [
  { day: 'Mon', amount: 2.4 },
  { day: 'Tue', amount: 1.3 },
  { day: 'Wed', amount: 0.1 },
  { day: 'Thu', amount: 0 },
  { day: 'Fri', amount: 0.8 },
  { day: 'Sat', amount: 2.3 },
  { day: 'Sun', amount: 3.4 },
];

// Mock recommendation data
const cropRecommendations = [
  {
    name: 'Wheat',
    suitability: 92,
    icon: '🌾',
    color: 'bg-amber-500',
  },
  {
    name: 'Corn',
    suitability: 87,
    icon: '🌽',
    color: 'bg-yellow-500',
  },
  {
    name: 'Soybeans',
    suitability: 78,
    icon: '🌱',
    color: 'bg-green-500',
  },
];

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h1 className="text-3xl font-bold text-gray-900">Farm Dashboard</h1>
            <p className="text-gray-600">Overview of your farm's data and recommendations</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Weather Widget */}
            <motion.div
              className="md:col-span-1"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <WeatherWidget />
            </motion.div>
            
            {/* Soil Moisture */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-sky-500" />
                    Soil Moisture
                  </CardTitle>
                  <CardDescription>Current soil water content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="10"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#0ea5e9"
                          strokeWidth="10"
                          strokeDasharray="282.7"
                          strokeDashoffset={282.7 - (282.7 * 68) / 100}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-in-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-gray-900">68%</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Optimal Range: 60-80%</p>
                      <p className="text-sm font-medium text-green-600 mt-2">Good condition</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" className="w-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            {/* Temperature */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-red-500" />
                    Soil Temperature
                  </CardTitle>
                  <CardDescription>Current ground temperature</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="10"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#f97316"
                          strokeWidth="10"
                          strokeDasharray="282.7"
                          strokeDashoffset={282.7 - (282.7 * 72) / 100}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-in-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-gray-900">23°C</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Optimal Range: 18-24°C</p>
                      <p className="text-sm font-medium text-green-600 mt-2">Ideal for growth</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" className="w-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Soil Health Chart */}
            <motion.div 
              className="lg:col-span-2"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Soil Nutrients Analysis</CardTitle>
                  <CardDescription>Monthly levels of essential nutrients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={soilHealthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                        <YAxis stroke="#888888" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            borderRadius: '0.5rem',
                            border: 'none',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                          }} 
                        />
                        <Area type="monotone" dataKey="nitrogen" stroke="#4C9E57" fill="#4C9E5733" activeDot={{ r: 6 }} />
                        <Area type="monotone" dataKey="phosphorus" stroke="#6BA5DD" fill="#6BA5DD33" activeDot={{ r: 6 }} />
                        <Area type="monotone" dataKey="potassium" stroke="#E8B634" fill="#E8B63433" activeDot={{ r: 6 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-earth-500 mr-2"></div>
                      <span className="text-sm text-gray-600">Nitrogen</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-sky-500 mr-2"></div>
                      <span className="text-sm text-gray-600">Phosphorus</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                      <span className="text-sm text-gray-600">Potassium</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Crop Recommendations */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Recommended Crops</CardTitle>
                  <CardDescription>Based on your soil and climate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cropRecommendations.map((crop, index) => (
                      <div key={index} className="flex items-center p-3 bg-white border rounded-lg shadow-sm">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${crop.color} mr-4`}>
                          <Leaf className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{crop.name}</h4>
                          <div className="mt-1">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Suitability</span>
                              <span className="font-medium">{crop.suitability}%</span>
                            </div>
                            <Progress value={crop.suitability} className="h-1.5" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/recommendations" className="w-full">
                    <Button variant="outline" className="w-full">
                      View All Recommendations
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Precipitation Forecast */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CloudRain className="h-5 w-5 text-sky-500" />
                    Precipitation Forecast
                  </CardTitle>
                  <CardDescription>Expected rainfall for the next 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={rainPrediction} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="day" stroke="#888888" />
                        <YAxis stroke="#888888" />
                        <Tooltip
                          formatter={(value) => [`${value} mm`, 'Rainfall']}
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            borderRadius: '0.5rem',
                            border: 'none',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Bar dataKey="amount" fill="#60a5fa" radius={[4, 4, 0, 0]}>
                          {rainPrediction.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.amount > 0 ? '#60a5fa' : '#e2e8f0'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Crop Yield Comparison */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SunMedium className="h-5 w-5 text-amber-500" />
                    Crop Yield Comparison
                  </CardTitle>
                  <CardDescription>Current vs Previous Season (kg/hectare)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={cropYieldData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        barGap={8}
                        barCategoryGap={16}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" stroke="#888888" />
                        <YAxis stroke="#888888" />
                        <Tooltip
                          formatter={(value) => [`${value} kg/ha`, '']}
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            borderRadius: '0.5rem',
                            border: 'none',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Bar dataKey="current" name="Current Season" fill="#4C9E57" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="previous" name="Previous Season" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Quick Actions */}
          <motion.div 
            className="mt-8"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2 md:mb-0">Quick Actions</h2>
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link to="/input">
                  <PlusCircle className="h-4 w-4" />
                  <span>New Soil Analysis</span>
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="card-hover">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-earth-100 rounded-full p-3 mb-4">
                    <Leaf className="h-6 w-6 text-earth-600" />
                  </div>
                  <h3 className="font-semibold mb-1">Crop Planner</h3>
                  <p className="text-sm text-gray-500 mb-4">Plan your seasonal crops</p>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link to="/crop-planner">
                      <span>Open</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-sky-100 rounded-full p-3 mb-4">
                    <CloudRain className="h-6 w-6 text-sky-600" />
                  </div>
                  <h3 className="font-semibold mb-1">Weather Forecast</h3>
                  <p className="text-sm text-gray-500 mb-4">10-day detailed forecast</p>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link to="/weather">
                      <span>Open</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-soil-100 rounded-full p-3 mb-4">
                    <Droplets className="h-6 w-6 text-soil-600" />
                  </div>
                  <h3 className="font-semibold mb-1">Soil Health</h3>
                  <p className="text-sm text-gray-500 mb-4">Monitor soil nutrients</p>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link to="/soil-health">
                      <span>Open</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-amber-100 rounded-full p-3 mb-4">
                    <SunMedium className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="font-semibold mb-1">Yield Calculator</h3>
                  <p className="text-sm text-gray-500 mb-4">Estimate crop yields</p>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link to="/yield-calculator">
                      <span>Open</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
