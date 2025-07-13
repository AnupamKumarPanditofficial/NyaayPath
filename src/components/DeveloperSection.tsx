import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Code, Zap, Brain, Shield, User, Heart, CheckCircle, Facebook, Instagram } from 'lucide-react';

const DeveloperCard = ({ developer, index }: { developer: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-end min-h-[420px] border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 group"
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
    >
      {/* Full Background Image */}
      <img
        src={developer.image}
        alt={developer.name}
        className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-transform duration-500 group-hover:scale-105"
        style={{ minHeight: 320 }}
      />
      {/* Blurred Glassmorphic Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-7 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-b-3xl z-10 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 drop-shadow">{developer.name}</span>
          <CheckCircle className="w-5 h-5 text-accent-orange drop-shadow" />
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-200 mb-1 font-medium drop-shadow">{developer.role}</div>
        <div className="text-center text-gray-600 dark:text-gray-300 text-xs mb-3 drop-shadow max-w-xs">{developer.bio}</div>
        <div className="flex items-center gap-4 mt-1">
          <a href={developer.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/70 dark:bg-gray-800/70 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors shadow">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href={developer.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/70 dark:bg-gray-800/70 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition-colors shadow">
            <Facebook className="w-5 h-5" />
          </a>
          <a href={developer.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/70 dark:bg-gray-800/70 hover:bg-pink-500 hover:text-white dark:hover:bg-pink-500 transition-colors shadow">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const DeveloperSection = () => {
  const developers = [
    {
      name: "Anupam Kumar Pandit",
      role: "Full Stack Developer",
      age: 22,
      bio: "Lead developer and architect of the NyaayPath platform, passionate about building scalable, impactful solutions for society.",
      skills: ["Node.js", "React", "MongoDB", "Cloud"],
      icon: Code,
      linkedin: "",
      facebook: "",
      instagram: "",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Ankit Mishra",
      role: "AI/ML & Backend Engineer",
      age: 22,
      bio: "Specializes in AI-powered verification and backend systems, ensuring robust and secure workflows.",
      skills: ["Python", "AI", "Express.js", "APIs"],
      icon: Brain,
      linkedin: "",
      facebook: "",
      instagram: "",
      image: "https://randomuser.me/api/portraits/men/33.jpg"
    },
    {
      name: "Yuvraj Singh",
      role: "Blockchain & Security Specialist",
      age: 22,
      bio: "Focuses on decentralized systems and security, bringing blockchain vision to the project.",
      skills: ["Blockchain", "Security", "Smart Contracts"],
      icon: Shield,
      linkedin: "",
      facebook: "",
      instagram: "",
      image: "https://randomuser.me/api/portraits/men/34.jpg"
    },
    {
      name: "Nishant Singh",
      role: "Frontend & UI/UX Developer",
      age: 21,
      bio: "Designs and develops beautiful, user-friendly interfaces for seamless user experience.",
      skills: ["React", "TypeScript", "UI/UX", "Tailwind"],
      icon: Zap,
      linkedin: "",
      facebook: "",
      instagram: "",
      image: "https://randomuser.me/api/portraits/men/35.jpg"
    }
  ];

  return (
    <section id="developers" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6 px-4">
            Meet Our Young Innovators
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            A passionate team of 21-22 year old developers working tirelessly to transform India's welfare system 
            through cutting-edge technology and innovative solutions.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {developers.map((developer, index) => (
            <DeveloperCard key={index} developer={developer} index={index} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sm:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-deep-blue dark:text-accent-orange mb-4">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              "We believe that technology should serve humanity, especially those who need it most. 
              Our team is committed to building solutions that eliminate corruption, ensure transparency, 
              and deliver justice to every corner of rural India. Age is just a number when passion meets purpose."
            </p>
            <div className="mt-4 sm:mt-6 flex items-center justify-center space-x-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-accent-orange rounded-full"
              />
              <span className="text-deep-blue dark:text-accent-orange font-semibold text-sm sm:text-base">Building the Future of Governance</span>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="w-3 h-3 bg-success-green rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DeveloperSection;