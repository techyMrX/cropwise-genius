
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Thermometer, Cloud, Droplets, LineChart, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';

const inputSchema = z.object({
  nitrogenLevel: z.number().min(0).max(100),
  phosphorusLevel: z.number().min(0).max(100),
  potassiumLevel: z.number().min(0).max(100),
  temperature: z.number().min(-10).max(60),
  humidity: z.number().min(0).max(100),
  phValue: z.number().min(0).max(14),
  rainfall: z.number().min(0).max(300),
  soilType: z.string().min(1, { message: "Please select a soil type" }),
});

type InputValues = z.infer<typeof inputSchema>;

const InputData = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<InputValues>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      nitrogenLevel: 40,
      phosphorusLevel: 30,
      potassiumLevel: 35,
      temperature: 25,
      humidity: 60,
      phValue: 6.5,
      rainfall: 100,
      soilType: "",
    },
  });

  const onSubmit = (values: InputValues) => {
    console.log('Form submitted with values:', values);
    
    // Store the values in session storage for use on the recommendations page
    sessionStorage.setItem('cropInputData', JSON.stringify(values));
    
    toast({
      title: 'Data submitted successfully',
      description: 'Generating crop recommendations...',
    });
    
    // Navigate to recommendations page
    navigate('/recommendations');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-28 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Input Soil & Environmental Data</h1>
            <p className="text-gray-600 mt-2">
              Provide accurate information about your soil and local climate conditions to receive precise crop recommendations
            </p>
          </div>
          
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-earth-600" />
                Soil Parameters & Climate Conditions
              </CardTitle>
              <CardDescription>
                Enter the values based on your soil test results and local climate data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="soilType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Soil Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select soil type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="clay">Clay</SelectItem>
                                <SelectItem value="sandy">Sandy</SelectItem>
                                <SelectItem value="loamy">Loamy</SelectItem>
                                <SelectItem value="silty">Silty</SelectItem>
                                <SelectItem value="peaty">Peaty</SelectItem>
                                <SelectItem value="chalky">Chalky</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              The primary type of soil in your field
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="nitrogenLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nitrogen Level (N) - {field.value} mg/kg</FormLabel>
                            <FormControl>
                              <Slider
                                min={0}
                                max={100}
                                step={1}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                            </FormControl>
                            <FormDescription>
                              Amount of nitrogen in soil (0-100 mg/kg)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phosphorusLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phosphorus Level (P) - {field.value} mg/kg</FormLabel>
                            <FormControl>
                              <Slider
                                min={0}
                                max={100}
                                step={1}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                            </FormControl>
                            <FormDescription>
                              Amount of phosphorus in soil (0-100 mg/kg)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="potassiumLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Potassium Level (K) - {field.value} mg/kg</FormLabel>
                            <FormControl>
                              <Slider
                                min={0}
                                max={100}
                                step={1}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                            </FormControl>
                            <FormDescription>
                              Amount of potassium in soil (0-100 mg/kg)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="phValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>pH Value - {field.value}</FormLabel>
                            <FormControl>
                              <Slider
                                min={0}
                                max={14}
                                step={0.1}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                            </FormControl>
                            <FormDescription>
                              Soil pH level (0-14)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="temperature"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Temperature - {field.value}°C</FormLabel>
                            <FormControl>
                              <Slider
                                min={-10}
                                max={60}
                                step={0.1}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                            </FormControl>
                            <FormDescription>
                              Average temperature in °C (-10 to 60)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="humidity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Humidity - {field.value}%</FormLabel>
                            <FormControl>
                              <Slider
                                min={0}
                                max={100}
                                step={1}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                            </FormControl>
                            <FormDescription>
                              Relative humidity percentage (0-100%)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="rainfall"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rainfall - {field.value} mm</FormLabel>
                            <FormControl>
                              <Slider
                                min={0}
                                max={300}
                                step={1}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                            </FormControl>
                            <FormDescription>
                              Average rainfall in mm (0-300 mm)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 text-center">
                    <Button type="submit" size="lg" className="gap-2">
                      <Send className="h-4 w-4" />
                      Generate Recommendations
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InputData;
