import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Calendar, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ProblemCard = ({ icon: Icon, title, description, index }: {
  icon: any;
  title: string;
  description: string;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{description}</p>
    </motion.div>
  );
};

const ProblemSection = () => {
  const { t } = useTranslation();
  const problems = [
    {
      icon: DollarSign,
      title: t('problem_middlemen_title'),
      description: t('problem_middlemen_desc')
    },
    {
      icon: Calendar,
      title: t('problem_delays_title'),
      description: t('problem_delays_desc')
    },
    {
      icon: Search,
      title: t('problem_verification_title'),
      description: t('problem_verification_desc')
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6 px-4">
            {t('problem_section_heading')}
          </h2>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {problems.map((problem, index) => (
            <ProblemCard
              key={index}
              icon={problem.icon}
              title={problem.title}
              description={problem.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;