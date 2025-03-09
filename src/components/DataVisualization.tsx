
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// Mock data for soil composition
const soilData = [
  { name: 'Nitrogen', value: 45 },
  { name: 'Phosphorus', value: 30 },
  { name: 'Potassium', value: 25 },
];

// Mock data for crop suitability
const cropSuitabilityData = [
  { name: 'Wheat', value: 92 },
  { name: 'Rice', value: 78 },
  { name: 'Maize', value: 87 },
  { name: 'Cotton', value: 45 },
  { name: 'Sugarcane', value: 62 },
];

// Mock data for yield prediction
const yieldPredictionData = [
  { name: 'Jan', wheat: 0, rice: 0, maize: 0 },
  { name: 'Feb', wheat: 0, rice: 0, maize: 0 },
  { name: 'Mar', wheat: 0, rice: 0, maize: 0 },
  { name: 'Apr', wheat: 20, rice: 0, maize: 0 },
  { name: 'May', wheat: 40, rice: 0, maize: 10 },
  { name: 'Jun', wheat: 65, rice: 20, maize: 30 },
  { name: 'Jul', wheat: 90, rice: 45, maize: 60 },
  { name: 'Aug', wheat: 95, rice: 70, maize: 85 },
  { name: 'Sep', wheat: 100, rice: 90, maize: 95 },
  { name: 'Oct', wheat: 0, rice: 100, maize: 100 },
  { name: 'Nov', wheat: 0, rice: 0, maize: 0 },
  { name: 'Dec', wheat: 0, rice: 0, maize: 0 },
];

// Colors for charts
const COLORS = ['#4C9E57', '#6BA5DD', '#E8B634', '#D68E3C', '#A5678E'];

const DataVisualization = () => {
  const [activeChart, setActiveChart] = useState('soil');
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Data Visualization</CardTitle>
        <CardDescription>Visual analysis of your farm data</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="soil" onValueChange={setActiveChart}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="soil">Soil Composition</TabsTrigger>
            <TabsTrigger value="suitability">Crop Suitability</TabsTrigger>
            <TabsTrigger value="yield">Yield Prediction</TabsTrigger>
          </TabsList>
          
          <TabsContent value="soil" className="mt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={soilData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {soilData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Percentage']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '0.5rem',
                      border: 'none',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              {soilData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="suitability" className="mt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={cropSuitabilityData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barSize={40}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Suitability']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '0.5rem',
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="value" name="Suitability Score" radius={[4, 4, 0, 0]}>
                    {cropSuitabilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="yield" className="mt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={yieldPredictionData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '0.5rem',
                      border: 'none',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="wheat" stroke="#4C9E57" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="rice" stroke="#6BA5DD" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="maize" stroke="#E8B634" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-2 text-sm text-gray-500">
              Chart shows percentage of expected crop maturity by month
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DataVisualization;
