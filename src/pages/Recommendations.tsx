import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Leaf, BarChart2, Sprout, AlertCircle, Download, RefreshCw } from 'lucide-react';
import Navbar from '@/components/Navbar';

const cropRecommendations = [
  {
    id: 1,
    name: 'Rice',
    suitabilityScore: 98,
    expectedYield: '5.8 tons/hectare',
    waterRequirement: 'High',
    growthDuration: '120-150 days',
    profitPotential: 'High',
    description: 'Rice thrives in your soil conditions with high nitrogen levels and adequate rainfall. The temperature and humidity levels are optimal for rice cultivation.',
    soilCompatibility: 95,
    climateCompatibility: 90,
    waterCompatibility: 85,
    marketPotential: 80,
    image: 'https://images.unsplash.com/photo-1568742644656-35c47898e051?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  },
  {
    id: 2,
    name: 'Wheat',
    suitabilityScore: 87,
    expectedYield: '4.2 tons/hectare',
    waterRequirement: 'Medium',
    growthDuration: '100-130 days',
    profitPotential: 'Medium',
    description: "Wheat is well-suited to your soil's pH and phosphorus levels. The slightly lower humidity is actually beneficial for wheat growth and disease prevention.",
    soilCompatibility: 85,
    climateCompatibility: 80,
    waterCompatibility: 90,
    marketPotential: 85,
    image: 'https://images.unsplash.com/photo-1467123081588-708a82393dc4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  },
  {
    id: 3,
    name: 'Maize',
    suitabilityScore: 82,
    expectedYield: '7.5 tons/hectare',
    waterRequirement: 'Medium-Low',
    growthDuration: '80-110 days',
    profitPotential: 'Medium-High',
    description: "Maize would perform well with your soil's potassium content and temperature range. Consider additional phosphorus for optimal yield.",
    soilCompatibility: 75,
    climateCompatibility: 85,
    waterCompatibility: 70,
    marketPotential: 90,
    image: 'https://images.unsplash.com/photo-1455181488662-35c1abba2a33?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  }
];

const CropCard = ({ crop }: { crop: any }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden">
        <img src={crop.image} alt={crop.name} className="h-full w-full object-cover transition-transform hover:scale-105" />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">{crop.name}</CardTitle>
          <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            <Leaf className="h-4 w-4" />
            {crop.suitabilityScore}% Match
          </div>
        </div>
        <CardDescription>Expected yield: {crop.expectedYield}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <div className="flex flex-col">
            <span className="text-gray-500">Water Needs</span>
            <span className="font-medium">{crop.waterRequirement}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Growth Period</span>
            <span className="font-medium">{crop.growthDuration}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Profit Potential</span>
            <span className="font-medium">{crop.profitPotential}</span>
          </div>
        </div>
        <p className="text-gray-700 text-sm">{crop.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">Details</Button>
        <Button variant="default" size="sm">Select Crop</Button>
      </CardFooter>
    </Card>
  );
};

const Recommendations = () => {
  const [inputData, setInputData] = useState<any>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedData = sessionStorage.getItem('cropInputData');
    if (storedData) {
      setInputData(JSON.parse(storedData));
    } else {
      navigate('/input');
    }
  }, [navigate]);
  
  const compatibilityData = cropRecommendations.map((crop) => ({
    crop: crop.name,
    'Soil Compatibility': crop.soilCompatibility,
    'Climate Compatibility': crop.climateCompatibility,
    'Water Compatibility': crop.waterCompatibility,
    'Market Potential': crop.marketPotential,
  }));
  
  const radarData = cropRecommendations.map((crop) => ({
    subject: crop.name,
    'Suitability Score': crop.suitabilityScore,
    fullMark: 100,
  }));
  
  if (!inputData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Input Data Found</h2>
          <p className="text-gray-600 mb-6">Please provide soil and climate data first.</p>
          <Button onClick={() => navigate('/input')}>
            Go to Input Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-28 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Crop Recommendations</h1>
              <p className="text-gray-600 mt-2">
                Based on your soil parameters and environmental conditions
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2" onClick={() => navigate('/input')}>
                <RefreshCw className="h-4 w-4" />
                New Analysis
              </Button>
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                Export Results
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="recommendations" className="w-full">
            <TabsList className="mb-6 w-full justify-start">
              <TabsTrigger value="recommendations" className="gap-2">
                <Sprout className="h-4 w-4" />
                Recommendations
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <BarChart2 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommendations" className="space-y-6">
              <Card className="bg-green-50 border-green-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">AI Recommendation Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Based on your soil analysis with nitrogen level of {inputData.nitrogenLevel}mg/kg, 
                    phosphorus level of {inputData.phosphorusLevel}mg/kg, and potassium level of {inputData.potassiumLevel}mg/kg, 
                    combined with a pH value of {inputData.phValue} and {inputData.rainfall}mm rainfall, 
                    our AI model has identified the following optimal crops for your land.
                  </p>
                </CardContent>
              </Card>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cropRecommendations.map((crop) => (
                  <CropCard key={crop.id} crop={crop} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Crop Compatibility Factors</CardTitle>
                    <CardDescription>
                      Comparison of different compatibility factors for each recommended crop
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={compatibilityData}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis dataKey="crop" type="category" />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="Soil Compatibility" fill="#8884d8" />
                          <Bar dataKey="Climate Compatibility" fill="#82ca9d" />
                          <Bar dataKey="Water Compatibility" fill="#ffc658" />
                          <Bar dataKey="Market Potential" fill="#ff8042" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Overall Crop Suitability</CardTitle>
                    <CardDescription>
                      Radar chart showing overall suitability score for each crop
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart outerRadius={90} data={cropRecommendations}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="name" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar
                            name="Suitability Score"
                            dataKey="suitabilityScore"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.6}
                          />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
