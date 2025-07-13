import React from 'react';
import { Scale, Twitter, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "About Us",
      links: ["Our Mission", "How It Works", "Impact Stories", "Team"]
    }
  ];

  return (
    <footer id="footer" className="bg-deep-blue dark:bg-gray-900 text-white dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {/* Brand Section */}
          <div className="lg:col-span-1 sm:col-span-2">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <Scale className="w-6 h-6 sm:w-8 sm:h-8 text-accent-orange" />
              <span className="text-xl sm:text-2xl font-bold">NyaayPath</span>
            </div>
            <p className="text-blue-200 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Transforming India's welfare system through AI and blockchain technology. 
              Ensuring transparency, eliminating corruption, and delivering justice to every citizen.
            </p>
            <div className="flex space-x-4">
              <Twitter className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300 dark:text-gray-400 hover:text-white dark:hover:text-accent-orange cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300 dark:text-gray-400 hover:text-white dark:hover:text-accent-orange cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300 dark:text-gray-400 hover:text-white dark:hover:text-accent-orange cursor-pointer transition-colors" />
            </div>
          </div>

          {/* About Us shifted right */}
          <div className="lg:col-start-3 sm:col-span-1 flex flex-col items-start sm:items-end">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-accent-orange">About Us</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#" className="text-blue-200 dark:text-gray-300 hover:text-white dark:hover:text-accent-orange transition-colors text-sm sm:text-base">Our Mission</a></li>
              <li><a href="#" className="text-blue-200 dark:text-gray-300 hover:text-white dark:hover:text-accent-orange transition-colors text-sm sm:text-base">How It Works</a></li>
              <li><a href="#" className="text-blue-200 dark:text-gray-300 hover:text-white dark:hover:text-accent-orange transition-colors text-sm sm:text-base">Impact Stories</a></li>
              <li><a href="#" className="text-blue-200 dark:text-gray-300 hover:text-white dark:hover:text-accent-orange transition-colors text-sm sm:text-base">Team</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-blue-700 dark:border-gray-700 mt-6 sm:mt-8 pt-4 sm:pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-accent-orange" />
              <span className="text-blue-200 dark:text-gray-300 text-sm sm:text-base">support@nyaaypath.gov.in</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-accent-orange" />
              <span className="text-blue-200 dark:text-gray-300 text-sm sm:text-base">1800-123-NYAAY (69229)</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent-orange" />
              <span className="text-blue-200 dark:text-gray-300 text-sm sm:text-base">New Delhi, India</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-700 dark:border-gray-700 pt-4 sm:pt-6 flex justify-center items-center">
          <p className="text-blue-100 dark:text-gray-400 text-sm sm:text-base text-center font-bold">
            A 'RogerWithCode' Initiative. © 2025 NyaayPath. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;