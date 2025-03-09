
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InfoIcon, ChevronDown, ChevronUp, Thermometer, Droplets, BarChart2 } from 'lucide-react';

interface CropDetail {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface CropCardProps {
  name: string;
  image: string;
  suitability: number;
  description: string;
  details: CropDetail[];
}

const CropCard = ({ name, image, suitability, description, details }: CropCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  // Determine the color based on suitability score
  const getSuitabilityColor = () => {
    if (suitability >= 80) return 'bg-green-500';
    if (suitability >= 60) return 'bg-lime-500';
    if (suitability >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="overflow-hidden card-hover">
        <div className="relative">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-md">
            <span className="text-sm font-semibold">{suitability}%</span>
            <div className={`w-2 h-2 rounded-full ${getSuitabilityColor()}`}></div>
          </div>
        </div>
        
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <motion.div 
            animate={{ height: expanded ? 'auto' : '0' }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-4 space-y-4">
              {details.map((detail, index) => (
                <div key={index} className="flex items-start">
                  <div className="mt-0.5 mr-3">{detail.icon}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{detail.label}</p>
                    <p className="text-sm text-gray-600">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-2">
          <Button variant="outline" size="sm" className="text-sky-600 border-sky-200 hover:bg-sky-50 hover:text-sky-700">
            <InfoIcon className="mr-1 h-4 w-4" />
            Details
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleExpand}
            className="text-gray-600 hover:text-gray-900"
          >
            {expanded ? (
              <>
                <span className="mr-1">Less</span>
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                <span className="mr-1">More</span>
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CropCard;
