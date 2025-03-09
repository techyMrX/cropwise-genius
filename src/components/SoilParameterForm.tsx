
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Leaf, Sun, CloudRain, Thermometer } from "lucide-react";

// Create a schema for form validation
const formSchema = z.object({
  nitrogen: z.coerce.number().min(0).max(140),
  phosphorus: z.coerce.number().min(0).max(140),
  potassium: z.coerce.number().min(0).max(140),
  temperature: z.coerce.number().min(-10).max(60),
  humidity: z.coerce.number().min(0).max(100),
  ph: z.coerce.number().min(0).max(14),
  rainfall: z.coerce.number().min(0).max(300),
  location: z.string().min(1, { message: "Location is required" }),
  soilType: z.string().min(1, { message: "Soil type is required" }),
});

type FormData = z.infer<typeof formSchema>;

interface SoilParameterFormProps {
  onSubmit: (data: FormData) => void;
  loading?: boolean;
}

const SoilParameterForm = ({ onSubmit, loading = false }: SoilParameterFormProps) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nitrogen: 50,
      phosphorus: 50,
      potassium: 50,
      temperature: 25,
      humidity: 60,
      ph: 7,
      rainfall: 100,
      location: '',
      soilType: '',
    }
  });
  
  // Watch values for sliders
  const watchedValues = {
    nitrogen: watch('nitrogen'),
    phosphorus: watch('phosphorus'),
    potassium: watch('potassium'),
    temperature: watch('temperature'),
    humidity: watch('humidity'),
    ph: watch('ph'),
    rainfall: watch('rainfall'),
  };
  
  const handleSliderChange = (name: keyof typeof watchedValues, value: number[]) => {
    setValue(name, value[0], { shouldValidate: true });
  };
  
  const soilTypes = [
    'Clay',
    'Sandy',
    'Loamy',
    'Chalky',
    'Peaty',
    'Silty',
  ];
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-earth-600" />
            Soil Nutrients
          </CardTitle>
          <CardDescription>Enter the soil nutrient composition</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="nitrogen">Nitrogen (N)</Label>
              <span className="text-sm font-medium">{watchedValues.nitrogen} mg/kg</span>
            </div>
            <Slider
              id="nitrogen"
              min={0}
              max={140}
              step={1}
              value={[watchedValues.nitrogen]}
              onValueChange={(value) => handleSliderChange('nitrogen', value)}
              className="mb-4"
            />
            {errors.nitrogen && <p className="text-sm text-red-500 mt-1">{errors.nitrogen.message}</p>}
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="phosphorus">Phosphorus (P)</Label>
              <span className="text-sm font-medium">{watchedValues.phosphorus} mg/kg</span>
            </div>
            <Slider
              id="phosphorus"
              min={0}
              max={140}
              step={1}
              value={[watchedValues.phosphorus]}
              onValueChange={(value) => handleSliderChange('phosphorus', value)}
              className="mb-4"
            />
            {errors.phosphorus && <p className="text-sm text-red-500 mt-1">{errors.phosphorus.message}</p>}
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="potassium">Potassium (K)</Label>
              <span className="text-sm font-medium">{watchedValues.potassium} mg/kg</span>
            </div>
            <Slider
              id="potassium"
              min={0}
              max={140}
              step={1}
              value={[watchedValues.potassium]}
              onValueChange={(value) => handleSliderChange('potassium', value)}
              className="mb-4"
            />
            {errors.potassium && <p className="text-sm text-red-500 mt-1">{errors.potassium.message}</p>}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-amber-500" />
            Climate Conditions
          </CardTitle>
          <CardDescription>Enter the climate conditions of your area</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="temperature" className="flex items-center gap-1">
                <Thermometer className="h-4 w-4 text-red-500" />
                Temperature
              </Label>
              <span className="text-sm font-medium">{watchedValues.temperature}°C</span>
            </div>
            <Slider
              id="temperature"
              min={-10}
              max={60}
              step={0.5}
              value={[watchedValues.temperature]}
              onValueChange={(value) => handleSliderChange('temperature', value)}
              className="mb-4"
            />
            {errors.temperature && <p className="text-sm text-red-500 mt-1">{errors.temperature.message}</p>}
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="humidity" className="flex items-center gap-1">
                <Droplets className="h-4 w-4 text-sky-500" />
                Humidity
              </Label>
              <span className="text-sm font-medium">{watchedValues.humidity}%</span>
            </div>
            <Slider
              id="humidity"
              min={0}
              max={100}
              step={1}
              value={[watchedValues.humidity]}
              onValueChange={(value) => handleSliderChange('humidity', value)}
              className="mb-4"
            />
            {errors.humidity && <p className="text-sm text-red-500 mt-1">{errors.humidity.message}</p>}
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="rainfall" className="flex items-center gap-1">
                <CloudRain className="h-4 w-4 text-sky-600" />
                Annual Rainfall
              </Label>
              <span className="text-sm font-medium">{watchedValues.rainfall} mm</span>
            </div>
            <Slider
              id="rainfall"
              min={0}
              max={300}
              step={1}
              value={[watchedValues.rainfall]}
              onValueChange={(value) => handleSliderChange('rainfall', value)}
              className="mb-4"
            />
            {errors.rainfall && <p className="text-sm text-red-500 mt-1">{errors.rainfall.message}</p>}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
          <CardDescription>More details about your farm location</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="location" className="mb-2 block">Farm Location</Label>
            <Input
              id="location"
              placeholder="City, State"
              {...register('location')}
              className="input-field"
            />
            {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="soilType" className="mb-2 block">Soil Type</Label>
            <Select onValueChange={(value) => setValue('soilType', value)} defaultValue="">
              <SelectTrigger id="soilType" className="input-field">
                <SelectValue placeholder="Select soil type" />
              </SelectTrigger>
              <SelectContent>
                {soilTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.soilType && <p className="text-sm text-red-500 mt-1">{errors.soilType.message}</p>}
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="ph">Soil pH Level</Label>
              <span className="text-sm font-medium">{watchedValues.ph.toFixed(1)}</span>
            </div>
            <Slider
              id="ph"
              min={0}
              max={14}
              step={0.1}
              value={[watchedValues.ph]}
              onValueChange={(value) => handleSliderChange('ph', value)}
              className="mb-4"
            />
            {errors.ph && <p className="text-sm text-red-500 mt-1">{errors.ph.message}</p>}
            
            <div className="flex justify-between text-xs text-gray-500 px-1 mt-1">
              <span>Acidic (0)</span>
              <span>Neutral (7)</span>
              <span>Alkaline (14)</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full btn-primary" disabled={loading}>
            {loading ? "Processing..." : "Get Crop Recommendations"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default SoilParameterForm;
