import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, Clock, Circle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TrackSearch = () => {
  const { t } = useTranslation();
  const [trackId, setTrackId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);

  const formatTrackId = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '');
    
    // Add spaces every 4 digits
    const formatted = numbers.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limit to 12 digits (3 groups of 4)
    return formatted.substring(0, 14); // 12 digits + 2 spaces
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatTrackId(e.target.value);
    setTrackId(formatted);
  };

  const handleSearch = async () => {
    if (trackId.replace(/\s/g, '').length === 12) {
      setIsSearching(true);
      
      // Simulate API call
      setTimeout(() => {
        setSearchResult({
          id: trackId,
          scheme: 'PM Awas Yojana',
          applicantName: 'Rajesh Kumar',
          status: 'In Progress',
          steps: [
            {
              title: "Application Submitted",
              timestamp: "Dec 15, 2024, 10:30 AM",
              status: "completed"
            },
            {
              title: "Document Verification",
              timestamp: "Dec 16, 2024, 2:15 PM",
              status: "completed"
            },
            {
              title: "AI Fraud Detection",
              timestamp: "Dec 16, 2024, 2:18 PM",
              status: "completed"
            },
            {
              title: "District Officer Review",
              timestamp: "In Progress",
              status: "current"
            },
            {
              title: "State Approval",
              timestamp: "",
              status: "pending"
            },
            {
              title: "Fund Disbursement",
              timestamp: "",
              status: "pending"
            }
          ]
        });
        setIsSearching(false);
      }, 2000);
    }
  };

  // Add clear search handler
  const handleClearSearch = () => {
    setTrackId("");
    setSearchResult(null);
    setIsSearching(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success-green" />;
      case 'current':
        return <Clock className="w-5 h-5 text-blue-500 animate-pulse" />;
      case 'pending':
        return <Circle className="w-5 h-5 text-gray-300" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  // Filter out 'AI Fraud Detection' before rendering steps
  const filteredSteps = searchResult?.steps?.filter((step: any) => step.title !== 'AI Fraud Detection') || [];

  return (
    <motion.section
      id="track-search"
      className="py-16 sm:py-20 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            {t('track_your_application')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('track_enter_tracking_id_desc')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-deep-blue dark:bg-gray-900 text-gray-50 dark:text-gray-100 rounded-2xl shadow-2xl p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-50 dark:text-gray-200 mb-2">
                {t('application_tracking_id')}
              </label>
              <input
                type="text"
                value={trackId}
                onChange={handleInputChange}
                placeholder={t('track_id_placeholder')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-deep-blue dark:focus:ring-accent-orange focus:border-transparent outline-none text-lg font-mono tracking-wider text-black dark:text-white dark:bg-gray-800"
                maxLength={14}
              />
              <p className="text-xs text-gray-200 dark:text-gray-400 mt-1">
                {t('track_id_hint')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                disabled={trackId.replace(/\s/g, '').length !== 12 || isSearching}
                className="bg-yellow-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 w-full sm:w-auto justify-center transition-all duration-200 hover:bg-yellow-500 hover:shadow-lg disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>{t('track_status')}</span>
                  </>
                )}
              </motion.button>
              {/* Clear Search Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearSearch}
                disabled={trackId === "" && !searchResult}
                className="bg-yellow-400 text-white px-4 py-3 rounded-lg font-semibold w-full sm:w-auto transition-all duration-200 hover:bg-yellow-500 hover:shadow dark:disabled:bg-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                {t('clear')}
              </motion.button>
            </div>
          </div>

          {/* Search Results */}
          {searchResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
              className="border-t pt-8"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-50 mb-2">
                  {t('application_details')}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-100">
                  <div>
                    <span className="font-bold text-yellow-400">{t('tracking_id')}:</span>
                    <span className="ml-2 font-mono">{searchResult.id}</span>
                  </div>
                  <div>
                    <span className="font-bold text-yellow-400">{t('scheme')}:</span>
                    <span className="ml-2">{searchResult.scheme}</span>
                  </div>
                  <div>
                    <span className="font-bold text-yellow-400">{t('applicant')}:</span>
                    <span className="ml-2">{searchResult.applicantName}</span>
                  </div>
                  <div>
                    <span className="font-bold text-yellow-400">{t('status')}:</span>
                    <span className="ml-2 text-blue-600 font-semibold">{searchResult.status}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-50 mb-4">
                  {t('application_progress')}
                </h4>
                {/* Journey View: Horizontal Timeline */}
                <div className="flex items-center justify-between w-full overflow-x-auto pb-4">
                  {filteredSteps.map((step: any, index: number) => (
                    <React.Fragment key={index}>
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex flex-col items-center relative min-w-[120px]"
                      >
                        {/* Animated Flame/Glow for current step */}
                        {step.status === 'current' && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                            className="absolute -top-8 left-1/2 -translate-x-1/2 z-10"
                          >
                            {/* Simple Flame SVG */}
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <motion.path
                                d="M16 2C16 2 10 10 14 18C14 18 12 20 12 24C12 27 16 30 16 30C16 30 20 27 20 24C20 20 18 18 18 18C22 10 16 2 16 2Z"
                                fill="#FF9800"
                                initial={{ opacity: 0.7 }}
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse' }}
                              />
                            </svg>
                          </motion.div>
                        )}
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 ${
                          step.status === 'completed' ? 'border-success-green bg-success-green/20' :
                          step.status === 'current' ? 'border-accent-orange bg-accent-orange/20 animate-pulse' :
                          'border-gray-300 bg-gray-100'
                        }`}>
                          {getStatusIcon(step.status)}
                        </div>
                        {/* Step Title Label */}
                        <div className="mt-2 text-center text-xs font-semibold text-gray-100 dark:text-gray-200 whitespace-pre-line">
                          {step.title}
                        </div>
                      </motion.div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TrackSearch;