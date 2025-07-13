import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Brain, Link, Banknote } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TimelineStep = ({ icon: Icon, title, description, index, isLast }: {
  icon: any;
  title: string;
  description: string;
  index: number;
  isLast: boolean;
}) => {
  return (
    <div className="relative flex items-start">
      {/* Timeline Line - Hidden on mobile */}
      {!isLast && (
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          transition={{ duration: 1, delay: index * 0.3 }}
          viewport={{ once: true }}
          className="absolute left-6 sm:left-8 top-16 sm:top-20 w-0.5 bg-gradient-to-b from-deep-blue to-accent-orange hidden sm:block"
          style={{ height: '120px' }}
        />
      )}
      
      {/* Step Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-blue-100 mb-6 sm:mb-8 w-full hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-deep-blue to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-bold text-deep-blue mb-2 sm:mb-3">{title}</h3>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">{description}</p>
        </div>
      </motion.div>
    </div>
  );
};

const HowItWorks = () => {
  const { t } = useTranslation();
  const steps = [
    {
      icon: Smartphone,
      title: t('direct_application'),
      description: t('direct_application_desc')
    },
    {
      icon: Brain,
      title: t('ai_powered_verification'),
      description: t('ai_powered_verification_desc')
    },
    {
      icon: Link,
      title: t('immutable_blockchain_record'),
      description: t('immutable_blockchain_record_desc')
    },
    {
      icon: Banknote,
      title: t('direct_benefit_transfer'),
      description: t('direct_benefit_transfer_desc')
    }
  ];

  return (
    <motion.section
      id="how-it-works"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6 px-4">
            Our Solution: Speed, Trust, and Transparency.
          </h2>
        </motion.div>
        
        <div className="space-y-4">
          {steps.map((step, index) => (
            <TimelineStep
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;