import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Wifi, Globe, Users, Zap, Shield } from 'lucide-react';

interface DigitalIndiaSectionProps {
  onOpenApplicationForm: () => void;
}

const DigitalIndiaSection: React.FC<DigitalIndiaSectionProps> = ({ onOpenApplicationForm }) => {
  const features = [
    {
      icon: Smartphone,
      title: "Mobile First Approach",
      description: "Accessible on any smartphone, bringing government services to rural areas"
    },
    {
      icon: Wifi,
      title: "Works Offline",
      description: "Applications can be saved and submitted when connectivity is available"
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Available in 12+ Indian languages for better accessibility"
    },
    {
      icon: Users,
      title: "Community Centers",
      description: "Partnered with local centers to help citizens who need assistance"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "AI-powered instant verification and processing of applications"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Bank-level security with blockchain-based transparency"
    }
  ];

  return (
    <section id="digital-india" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-deep-blue to-blue-800 dark:from-gray-900 dark:to-gray-800 text-white dark:text-gray-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/90 to-blue-800/90" />
        {/* India Map Silhouette */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path
              d="M200 50 L180 80 L160 70 L140 90 L120 85 L100 110 L90 130 L85 150 L80 170 L85 190 L90 210 L100 230 L120 250 L140 270 L160 280 L180 290 L200 300 L220 290 L240 280 L260 270 L280 250 L300 230 L310 210 L315 190 L320 170 L315 150 L310 130 L300 110 L280 85 L260 90 L240 70 L220 80 Z"
              fill="currentColor"
              className="text-accent-orange"
            />
          </svg>
        </motion.div>
        
        {/* Floating Digital Elements */}
        <div className="floating-nodes">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent-orange rounded-full opacity-30"
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-3 mb-4 sm:mb-6"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-orange rounded-full flex items-center justify-center">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Powering Digital India
            </h2>
          </motion.div>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed px-4">
            NyaayPath is built for India's digital transformation, ensuring every citizen can access 
            government welfare schemes regardless of their location or technical expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-orange rounded-full flex items-center justify-center mb-3 sm:mb-4"
              >
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-blue-100 leading-relaxed text-sm sm:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl font-bold text-accent-orange mb-2"
              >
                1.4B+
              </motion.div>
              <p className="text-blue-100 text-sm sm:text-base">Citizens Served</p>
            </div>
            <div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl font-bold text-accent-orange mb-2"
              >
                28
              </motion.div>
              <p className="text-blue-100 text-sm sm:text-base">States & UTs</p>
            </div>
            <div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl font-bold text-accent-orange mb-2"
              >
                12+
              </motion.div>
              <p className="text-blue-100 text-sm sm:text-base">Languages</p>
            </div>
            <div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl font-bold text-accent-orange mb-2"
              >
                24/7
              </motion.div>
              <p className="text-blue-100 text-sm sm:text-base">Availability</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Join the Digital Revolution</h3>
          <p className="text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Be part of India's transformation towards a transparent, efficient, and corruption-free welfare system.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(249, 115, 22, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent-orange text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold glow-button"
            onClick={onOpenApplicationForm}
          >
            Start Your Application Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalIndiaSection;