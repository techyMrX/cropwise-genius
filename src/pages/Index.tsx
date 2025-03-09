
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, BarChart2, Cloud, Leaf, Droplets, Database, LineChart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

// Importing framer-motion
<lov-add-dependency>framer-motion@latest</lov-add-dependency>

const Index = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({
    hero: false,
    features: false,
    benefits: false,
    cta: false
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const features = [
    {
      title: 'AI-Powered Analysis',
      description: 'Machine learning algorithms analyze soil, climate, and historical data to provide optimal crop recommendations.',
      icon: <Cpu className="h-10 w-10 text-sky-500" />
    },
    {
      title: 'Data Visualization',
      description: 'Interactive charts and graphs help visualize soil health, climate trends, and crop suitability.',
      icon: <BarChart2 className="h-10 w-10 text-sky-500" />
    },
    {
      title: 'Climate Insights',
      description: 'Receive insights on how climate conditions affect different crops in your region.',
      icon: <Cloud className="h-10 w-10 text-sky-500" />
    },
    {
      title: 'Yield Prediction',
      description: 'Forecast potential yields based on selected crops and environmental conditions.',
      icon: <LineChart className="h-10 w-10 text-sky-500" />
    }
  ];

  const benefits = [
    {
      title: 'Optimize Resource Utilization',
      description: 'Make informed decisions about water, fertilizer, and other resources based on data-driven insights.',
      icon: <Droplets className="h-8 w-8 text-earth-600" />
    },
    {
      title: 'Increase Crop Yield',
      description: 'Select the most suitable crops for your specific conditions to maximize productivity.',
      icon: <Leaf className="h-8 w-8 text-earth-600" />
    },
    {
      title: 'Data-Driven Farming',
      description: 'Transform traditional farming practices with modern data analytics and machine learning.',
      icon: <Database className="h-8 w-8 text-earth-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero" className="pt-28 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate={isVisible.hero ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <motion.div className="inline-block mb-4 px-3 py-1 bg-earth-100 text-earth-800 rounded-full text-sm font-medium">
              Revolutionizing Agriculture with AI
            </motion.div>
            <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              AI-Powered Crop Recommendation System
            </motion.h1>
            <motion.p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Make data-driven farming decisions using machine learning algorithms that analyze soil properties, climate conditions, and historical data.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="btn-primary text-base">
                <Link to="/register">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild variant="outline" className="text-base border-earth-300 text-earth-700 hover:bg-earth-50">
                <Link to="/login">Log In</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate={isVisible.features ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Intelligent Features for Modern Farming</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform combines advanced artificial intelligence with agricultural expertise to provide you with the tools you need for successful farming.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            animate={isVisible.features ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="glass-card rounded-xl p-6 card-hover"
                variants={fadeIn}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 bg-earth-50">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate={isVisible.benefits ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits for Farmers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your agricultural practices with our AI-powered recommendation system and experience these benefits.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial="hidden"
            animate={isVisible.benefits ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-sm card-hover"
                variants={fadeIn}
              >
                <div className="mb-4 p-3 bg-earth-100 inline-block rounded-lg">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section id="cta" className="py-20 px-4">
        <motion.div 
          className="container mx-auto max-w-4xl bg-gradient-to-r from-earth-600 to-earth-700 rounded-2xl shadow-xl overflow-hidden"
          initial="hidden"
          animate={isVisible.cta ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className="p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Start Optimizing Your Crop Selection Today</h2>
            <p className="text-lg text-earth-100 mb-8 max-w-xl mx-auto">
              Join thousands of farmers who are already using our platform to make data-driven decisions and improve their yields.
            </p>
            <Button asChild className="bg-white text-earth-700 hover:bg-earth-100 text-base px-8 py-6">
              <Link to="/register">Create Free Account <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-100">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Leaf className="h-8 w-8 text-earth-600 mr-2" />
              <span className="text-xl font-semibold text-earth-800">CropWise</span>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} CropWise. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
