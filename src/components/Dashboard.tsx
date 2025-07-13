import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Shield, MapPin } from 'lucide-react';

const MetricCard = ({ icon: Icon, title, value, index }: {
  icon: any;
  title: string;
  value: string;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-deep-blue" />
        <span className="text-xl sm:text-2xl font-bold text-deep-blue">{value}</span>
      </div>
      <h3 className="text-gray-600 font-medium text-sm sm:text-base">{title}</h3>
    </motion.div>
  );
};

const Dashboard = () => {
  const metrics = [
    {
      icon: Users,
      title: "Total Applications Processed",
      value: "1,45,678"
    },
    {
      icon: TrendingUp,
      title: "Funds Disbursed via NyaayPath",
      value: "₹87 Crores"
    },
    {
      icon: Clock,
      title: "Average Approval Time",
      value: "11 Days"
    },
    {
      icon: Shield,
      title: "Fraudulent Applications Prevented",
      value: "4,210"
    }
  ];

  const activeStates = ["Bihar", "Assam", "Uttar Pradesh", "West Bengal"];

  return (
    <section id="dashboard" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6 px-4">
            Public Accountability by Default
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12 items-start">
          {/* Metrics */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {metrics.map((metric, index) => (
                <MetricCard
                  key={index}
                  icon={metric.icon}
                  title={metric.title}
                  value={metric.value}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-deep-blue to-blue-700 p-6 sm:p-8 rounded-2xl text-white"
          >
            <div className="flex items-center mb-4 sm:mb-6">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 mr-3" />
              <h3 className="text-xl sm:text-2xl font-bold">Active States</h3>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {activeStates.map((state, index) => (
                <motion.div
                  key={state}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm"
                >
                  <span className="font-medium text-sm sm:text-base">{state}</span>
                  <div className="w-3 h-3 bg-success-green rounded-full animate-pulse"></div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <p className="text-xs sm:text-sm text-blue-100">
                More states joining every quarter. Building a transparent India, one state at a time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

export default Dashboard;