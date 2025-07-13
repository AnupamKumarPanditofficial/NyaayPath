import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ApplicationForm from './ApplicationForm';
import { useTranslation } from 'react-i18next';
import floodImg from '../assets/flood.jpg';
import pmAwasImg from '../assets/pm-awas-yojana.jpg';
import swachhBharatImg from '../assets/swachh-bharat.png';
import droughtImg from '../assets/Drought aid.png';
import middlemenImg from '../assets/middlemen.jpg';

const Hero = () => {
  const { t } = useTranslation();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: floodImg,
      title: t('hero_slide_flood_title'),
      description: t('hero_slide_flood_desc')
    },
    {
      id: 2,
      image: pmAwasImg,
      title: t('hero_slide_awas_title'),
      description: t('hero_slide_awas_desc')
    },
    {
      id: 3,
      image: swachhBharatImg,
      title: t('hero_slide_swachh_title'),
      description: t('hero_slide_swachh_desc')
    },
    {
      id: 4,
      image: droughtImg,
      title: t('hero_slide_drought_title'),
      description: t('hero_slide_drought_desc')
    },
    {
      id: 5,
      image: middlemenImg,
      title: t('hero_slide_justice_title'),
      description: t('hero_slide_justice_desc')
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.section
        id="hero"
        className="relative min-h-screen overflow-hidden pt-16 sm:pt-20 bg-white dark:bg-gray-900"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* Image Carousel Background */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover object-center bg-gray-100 dark:bg-gray-900"
                style={{ minHeight: '100%', minWidth: '100%' }}
                onError={e => { e.currentTarget.style.background = '#e5e7eb'; e.currentTarget.src = ''; }}
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/60 dark:bg-black/80" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation */}
        <div className="absolute inset-y-0 left-4 flex items-center z-20">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
        </div>

        <div className="absolute inset-y-0 right-4 flex items-center z-20">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-accent-orange' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center text-white dark:text-gray-100">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6 sm:mb-8"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2">
                  <span className="block text-white dark:text-gray-100">{t('hero_heading_1')}</span>
                  <span className="block text-accent-orange">{t('hero_heading_2')}</span>
                  <span className="block text-white dark:text-gray-100">{t('hero_heading_3')}</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-gray-200 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4"
              >
                {t('hero_subheading')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(249, 115, 22, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFormOpen(true)}
                  className="bg-accent-orange text-white px-8 py-4 rounded-xl text-lg font-semibold glow-button w-full sm:w-auto hover:bg-orange-600 dark:bg-accent-orange dark:text-white dark:hover:bg-orange-500"
                >
                  {t('apply_for_scheme')}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('track-search')}
                  className="border-2 border-white dark:border-gray-300 text-white dark:text-gray-100 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-deep-blue dark:hover:bg-gray-100 dark:hover:text-deep-blue transition-all duration-300 w-full sm:w-auto"
                >
                  {t('track_your_application')}
                </motion.button>
              </motion.div>

              {/* Current Slide Info */}
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-12 sm:mt-16"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 max-w-md mx-auto">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">{slides[currentSlide].title}</h3>
                  <p className="text-gray-200 text-sm sm:text-base">{slides[currentSlide].description}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Floating Animation Elements */}
        <div className="floating-nodes">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent-orange rounded-full opacity-30"
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 40 - 20, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </motion.section>

      <ApplicationForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
};

export default Hero;