import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, CheckCircle, FileText, Eye, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

// Family member structure
interface FamilyMember {
  name: string;
  age: string;
  occupation: string;
  aadharNo: string;
  aadharImage: File | null;
  panNo: string;
  panImage: File | null;
  landOwner: string;
  incomeCertificate: File | null;
  residentialCertificate: File | null;
  maritalStatus: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [previewFile, setPreviewFile] = useState<{ file: File; field: string } | null>(null);
  const [formData, setFormData] = useState({
    schemeType: '',
    name: '',
    age: '',
    occupation: '',
    state: '',
    district: '',
    pinCode: '',
    wardNo: '',
    address: '',
    aadharNo: '',
    aadharImage: null as File | null,
    panNo: '',
    panImage: null as File | null,
    landOwner: '',
    incomeCertificate: null as File | null,
    residentialCertificate: null as File | null,
    maritalStatus: '',
    familyImage: null as File | null,
    mobileNo: ''
  });

  // Family member state
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([{
    name: '', age: '', occupation: '', aadharNo: '', aadharImage: null, panNo: '', panImage: null, landOwner: '', incomeCertificate: null, residentialCertificate: null, maritalStatus: ''
  }]);
  const [familyPhoto, setFamilyPhoto] = useState<File | null>(null);
  const [familyError, setFamilyError] = useState<string | null>(null);

  const schemeTypes = [
    t('flood_relief_fund'),
    t('drought_relief_fund'),
    t('pm_awas_yojana'),
    t('swachh_bharat_mission'),
    t('agriculture_support_scheme')
  ];

  const indianStates = [
    t('andhra_pradesh'), t('arunachal_pradesh'), t('assam'), t('bihar'), t('chhattisgarh'),
    t('goa'), t('gujarat'), t('haryana'), t('himachal_pradesh'), t('jharkhand'), t('karnataka'),
    t('kerala'), t('madhya_pradesh'), t('maharashtra'), t('manipur'), t('meghalaya'), t('mizoram'),
    t('nagaland'), t('odisha'), t('punjab'), t('rajasthan'), t('sikkim'), t('tamil_nadu'),
    t('telangana'), t('tripura'), t('uttar_pradesh'), t('uttarakhand'), t('west_bengal')
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleFileDelete = (field: string) => {
    setFormData(prev => ({ ...prev, [field]: null }));
  };

  const handleFilePreview = (field: string) => {
    const file = formData[field as keyof typeof formData] as File;
    if (file) {
      setPreviewFile({ file, field });
    }
  };

  // Helper to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Helper to check missing fields for each member
  const getMissingFields = (member: FamilyMember, idx: number) => {
    const missing = [];
    if (!member.name) missing.push(`Member ${idx + 1}: Name`);
    if (!member.age) missing.push(`Member ${idx + 1}: Age`);
    if (!member.occupation) missing.push(`Member ${idx + 1}: Occupation`);
    if (!member.aadharNo) missing.push(`Member ${idx + 1}: Aadhar No`);
    if (!member.aadharImage) missing.push(`Member ${idx + 1}: Aadhar Image`);
    if (!member.landOwner) missing.push(`Member ${idx + 1}: Land Owner`);
    if (!member.incomeCertificate) missing.push(`Member ${idx + 1}: Income Certificate`);
    if (!member.residentialCertificate) missing.push(`Member ${idx + 1}: Residential Certificate`);
    if (parseInt(member.age) >= 18) {
      if (!member.panNo) missing.push(`Member ${idx + 1}: PAN No`);
      if (!member.panImage) missing.push(`Member ${idx + 1}: PAN Image`);
      if (!member.maritalStatus) missing.push(`Member ${idx + 1}: Marital Status`);
    }
    return missing;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let missing: string[] = [];
    familyMembers.forEach((m, idx) => {
      missing = missing.concat(getMissingFields(m, idx));
    });
    if (!familyPhoto) missing.push('Family Photo');
    if (!formData.mobileNo || formData.mobileNo.length !== 10) missing.push('Mobile Number (10 digits)');
    if (missing.length > 0) {
      setFamilyError('Please fill or upload the following fields: ' + missing.join(', '));
      return;
    }
    setFamilyError(null);

    // Prepare data for localStorage
    const data: any = { ...formData };
    // File fields: store { name, data } (base64)
    const fileFields = ['aadharImage', 'panImage', 'incomeCertificate', 'residentialCertificate', 'familyPhoto'];
    for (const field of fileFields) {
      let file: File | null = null;
      if (field === 'familyPhoto') {
        file = familyPhoto;
      } else {
        file = formData[field as keyof typeof formData] as File | null;
      }
      if (file && file.name) {
        data[field] = {
          name: file.name,
          data: await fileToBase64(file)
        };
      } else {
        data[field] = null;
      }
    }
    // Add family members (for demo, just first member, but convert their files too)
    data.familyMembers = await Promise.all(familyMembers.map(async (member) => {
      const memberCopy: any = { ...member };
      if (member.aadharImage && member.aadharImage.name) {
        memberCopy.aadharImage = {
          name: member.aadharImage.name,
          data: await fileToBase64(member.aadharImage)
        };
      }
      if (member.panImage && member.panImage.name) {
        memberCopy.panImage = {
          name: member.panImage.name,
          data: await fileToBase64(member.panImage)
        };
      }
      if (member.incomeCertificate && member.incomeCertificate.name) {
        memberCopy.incomeCertificate = {
          name: member.incomeCertificate.name,
          data: await fileToBase64(member.incomeCertificate)
        };
      }
      if (member.residentialCertificate && member.residentialCertificate.name) {
        memberCopy.residentialCertificate = {
          name: member.residentialCertificate.name,
          data: await fileToBase64(member.residentialCertificate)
        };
      }
      return memberCopy;
    }));
    // Tracking ID logic
    const namePart = (data.name || 'XXXX').replace(/[^A-Z]/g, '').padEnd(4, 'X').slice(0, 4);
    const aadhaarDigits = (data.aadharNo || '').replace(/\D/g, '');
    const aadhaarPart = aadhaarDigits.slice(-4).padStart(4, '0');
    const panPart = (data.panNo || 'XXXX').replace(/[^A-Z0-9]/g, '').padEnd(4, 'X').slice(0, 4);
    data.trackingId = `${namePart} ${aadhaarPart} ${panPart}`;
    data.createdAt = new Date().toISOString();

    try {
      const requests = JSON.parse(localStorage.getItem('user_requests') || '[]');
      requests.unshift(data);
      localStorage.setItem('user_requests', JSON.stringify(requests));
      setTrackingId(data.trackingId);
      setIsSubmitted(true);
    } catch (err) {
      setFamilyError('Failed to submit request. Please try again.');
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setIsSubmitted(false);
    setTrackingId('');
    setPreviewFile(null);
    setFormData({
      schemeType: '',
      name: '',
      age: '',
      occupation: '',
      state: '',
      district: '',
      pinCode: '',
      wardNo: '',
      address: '',
      aadharNo: '',
      aadharImage: null,
      panNo: '',
      panImage: null,
      landOwner: '',
      incomeCertificate: null,
      residentialCertificate: null,
      maritalStatus: '',
      familyImage: null,
      mobileNo: ''
    });
  };

  const FileUploadField = ({ label, field, accept, required = false }: { 
    label: string; 
    field: string; 
    accept: string; 
    required?: boolean;
  }) => {
    const file = formData[field as keyof typeof formData] as File | null;
    
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t(label)} {required && <span className="text-red-500">*</span>}
        </label>
        
        {!file ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-deep-blue transition-colors">
            <input
              type="file"
              accept={accept}
              onChange={(e) => handleFileUpload(field, e.target.files?.[0] || null)}
              className="hidden"
              id={field}
              required={required}
            />
            <label htmlFor={field} className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                {t('click_to_upload')}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {accept.includes('image') ? t('jpg_png') : t('jpg_png_pdf')} (Max 5MB)
              </p>
            </label>
          </div>
        ) : (
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-deep-blue" />
                <div>
                  <p className="font-medium text-gray-800">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => handleFilePreview(field)}
                  className="p-2 text-deep-blue hover:bg-blue-100 rounded-full transition-colors"
                  title={t('preview')}
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleFileDelete(field)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                  title={t('delete')}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const canProceedToStep2 = formData.schemeType !== '';
  const canProceedToStep3 = formData.name && formData.state && formData.district && 
                            formData.pinCode && formData.wardNo && formData.address;
  const canSubmit = formData.aadharNo && formData.panNo && formData.aadharImage && 
                   formData.panImage && formData.familyImage;

  // Family member logic
  const handleMemberChange = (idx: number, field: keyof FamilyMember, value: any) => {
    setFamilyMembers(members => members.map((m, i) => i === idx ? { ...m, [field]: value } : m));
  };
  const addMember = () => setFamilyMembers([...familyMembers, { name: '', age: '', occupation: '', aadharNo: '', aadharImage: null, panNo: '', panImage: null, landOwner: '', incomeCertificate: null, residentialCertificate: null, maritalStatus: '' }]);
  const removeMember = (idx: number) => setFamilyMembers(members => members.length > 1 ? members.filter((_, i) => i !== idx) : members);

  const canSubmitFamilyDetails = familyMembers.every(m => m.name && m.age && m.occupation && m.aadharNo && m.aadharImage && (parseInt(m.age) < 18 || (m.panNo && m.panImage && m.maritalStatus)) && m.landOwner && m.incomeCertificate && m.residentialCertificate) && familyPhoto;

  // When moving from step 2 to step 3, sync formData to familyMembers[0]
  const goToStep3 = () => {
    setFamilyMembers(members => {
      const updated = [...members];
      updated[0] = {
        ...updated[0],
        name: formData.name,
        age: formData.age,
        occupation: formData.occupation,
        aadharNo: formData.aadharNo,
        aadharImage: formData.aadharImage,
        panNo: formData.panNo,
        panImage: formData.panImage,
        landOwner: formData.landOwner,
        incomeCertificate: formData.incomeCertificate,
        residentialCertificate: formData.residentialCertificate,
        maritalStatus: formData.maritalStatus
      };
      return updated;
    });
    setCurrentStep(3);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
            <div>
              <h2 className="text-2xl font-bold text-deep-blue">
                {isSubmitted ? t('application_submitted_success') : t('apply_for_scheme')}
              </h2>
              {!isSubmitted && (
                <div className="flex items-center mt-2 space-x-2">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        currentStep >= step ? 'bg-deep-blue text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step}
                      </div>
                      {step < 3 && (
                        <div className={`w-12 h-1 mx-2 ${
                          currentStep > step ? 'bg-deep-blue' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Success Message */}
          {isSubmitted ? (
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
              >
                <CheckCircle className="w-20 h-20 text-success-green mx-auto mb-6" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {t('your_application_submitted')}
              </h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <p className="text-lg font-semibold text-deep-blue mb-2">{t('your_tracking_id')}:</p>
                <p className="text-2xl font-bold text-deep-blue font-mono bg-white px-4 py-2 rounded border tracking-wider">
                  {trackingId}
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-medium">
                  📱 {t('receive_updates_15_days')}
                </p>
              </div>
              
              <p className="text-gray-600 mb-6">
                {t('save_tracking_id')}
              </p>
              
              <button
                onClick={resetForm}
                className="bg-deep-blue text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                {t('close')}
              </button>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} className="p-6">
              {/* Step 1: Scheme Selection */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('step1_select_scheme')}</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {t('choose_scheme')} <span className="text-red-500">*</span>
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {schemeTypes.map((scheme) => (
                        <motion.label
                          key={scheme}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.schemeType === scheme
                              ? 'border-deep-blue bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="schemeType"
                            value={scheme}
                            checked={formData.schemeType === scheme}
                            onChange={(e) => handleInputChange('schemeType', e.target.value)}
                            className="sr-only"
                            required
                          />
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                              formData.schemeType === scheme
                                ? 'border-deep-blue bg-deep-blue'
                                : 'border-gray-300'
                            }`}>
                              {formData.schemeType === scheme && (
                                <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                              )}
                            </div>
                            <span className="font-medium text-gray-800">{scheme}</span>
                          </div>
                        </motion.label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <motion.button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      disabled={!canProceedToStep2}
                      whileHover={{ scale: canProceedToStep2 ? 1.05 : 1 }}
                      whileTap={{ scale: canProceedToStep2 ? 0.95 : 1 }}
                      className="bg-deep-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {t('next')}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Personal Information */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('step2_personal_info')}</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('full_name')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value.toUpperCase())}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-blue focus:border-transparent outline-none"
                        placeholder={t('enter_full_name')}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('state')} <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-blue focus:border-transparent outline-none"
                      >
                        <option value="">{t('select_state')}</option>
                        {indianStates.map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('district')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.district}
                        onChange={e => handleInputChange('district', e.target.value.toUpperCase())}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-blue focus:border-transparent outline-none"
                        placeholder={t('enter_district')}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('pin_code')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        pattern="[0-9]{6}"
                        value={formData.pinCode}
                        onChange={(e) => {
                          let val = e.target.value.replace(/[^0-9]/g, '');
                          if (val.length > 6) val = val.slice(0, 6);
                          handleInputChange('pinCode', val);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-blue focus:border-transparent outline-none"
                        placeholder={t('enter_pin_code')}
                        maxLength={6}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ward Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.wardNo}
                        onChange={e => {
                          let val = e.target.value.replace(/[^0-9]/g, '');
                          handleInputChange('wardNo', val);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-blue focus:border-transparent outline-none"
                        placeholder="Enter ward number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.mobileNo || ''}
                        onChange={(e) => {
                          let val = e.target.value.replace(/[^0-9]/g, '');
                          if (val.length > 10) val = val.slice(0, 10);
                          handleInputChange('mobileNo', val);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-blue focus:border-transparent outline-none"
                        placeholder="Enter 10-digit mobile number"
                        maxLength={10}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Complete Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-blue focus:border-transparent outline-none"
                      placeholder="Enter your complete residential address"
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <motion.button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={goToStep3}
                      disabled={!canProceedToStep3}
                      whileHover={{ scale: canProceedToStep3 ? 1.05 : 1 }}
                      whileTap={{ scale: canProceedToStep3 ? 0.95 : 1 }}
                      className="bg-deep-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Next
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Complete Family Details */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 3: Complete Family Details</h3>
                  <FamilyDetailsSection 
                    familyMembers={familyMembers} 
                    setFamilyMembers={setFamilyMembers} 
                    familyPhoto={familyPhoto}
                    setFamilyPhoto={setFamilyPhoto}
                    familyError={familyError}
                    setFamilyError={setFamilyError}
                  />
                  <div className="flex justify-between">
                    <motion.button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-success-green text-white px-8 py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed mt-4"
                    >
                      Submit Application
                    </motion.button>
                  </div>
                  {familyError && (
                    <div className="text-red-600 mt-2 text-sm font-semibold">{familyError}</div>
                  )}
                </motion.div>
              )}
            </form>
          )}
        </motion.div>

        {/* File Preview Modal */}
        {previewFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-60 flex items-center justify-center p-4"
            onClick={() => setPreviewFile(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold">Document Preview</h3>
                <button
                  onClick={() => setPreviewFile(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                {previewFile.file.type.startsWith('image/') ? (
                  <img
                    src={URL.createObjectURL(previewFile.file)}
                    alt="Document preview"
                    className="max-w-full h-auto"
                  />
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">PDF preview not available</p>
                    <p className="text-sm text-gray-500 mt-2">{previewFile.file.name}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

function FamilyDetailsSection({ familyMembers, setFamilyMembers, familyPhoto, setFamilyPhoto, familyError, setFamilyError }: {
  familyMembers: FamilyMember[];
  setFamilyMembers: React.Dispatch<React.SetStateAction<FamilyMember[]>>;
  familyPhoto: File | null;
  setFamilyPhoto: React.Dispatch<React.SetStateAction<File | null>>;
  familyError: string | null;
  setFamilyError: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const { t } = useTranslation();
  const [previewFile, setPreviewFile] = useState<{ file: File; field: string } | null>(null);

  // Family member logic
  const handleMemberChange = (idx: number, field: keyof FamilyMember, value: any) => {
    setFamilyMembers(members => members.map((m, i) => i === idx ? { ...m, [field]: value } : m));
  };
  const addMember = () => setFamilyMembers([...familyMembers, { name: '', age: '', occupation: '', aadharNo: '', aadharImage: null, panNo: '', panImage: null, landOwner: '', incomeCertificate: null, residentialCertificate: null, maritalStatus: '' }]);
  const removeMember = (idx: number) => setFamilyMembers(members => members.length > 1 ? members.filter((_, i) => i !== idx) : members);

  // Helper to check missing fields for each member
  const getMissingFields = (member: FamilyMember, idx: number) => {
    const missing = [];
    if (!member.name) missing.push(`Member ${idx + 1}: Name`);
    if (!member.age) missing.push(`Member ${idx + 1}: Age`);
    if (!member.occupation) missing.push(`Member ${idx + 1}: Occupation`);
    if (!member.aadharNo) missing.push(`Member ${idx + 1}: Aadhar No`);
    if (!member.aadharImage) missing.push(`Member ${idx + 1}: Aadhar Image`);
    if (!member.landOwner) missing.push(`Member ${idx + 1}: Land Owner`);
    if (!member.incomeCertificate) missing.push(`Member ${idx + 1}: Income Certificate`);
    if (!member.residentialCertificate) missing.push(`Member ${idx + 1}: Residential Certificate`);
    if (parseInt(member.age) >= 18) {
      if (!member.panNo) missing.push(`Member ${idx + 1}: PAN No`);
      if (!member.panImage) missing.push(`Member ${idx + 1}: PAN Image`);
      if (!member.maritalStatus) missing.push(`Member ${idx + 1}: Marital Status`);
    }
    return missing;
  };

  return (
    <div className="space-y-8">
      {familyMembers.map((member, idx) => {
        const isMinor = parseInt(member.age) < 18;
        return (
          <div key={idx} className="border rounded-lg p-4 bg-gray-50 relative">
            <button type="button" onClick={() => removeMember(idx)} className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-100 rounded-full" disabled={familyMembers.length === 1}><X className="w-4 h-4" /></button>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                <input type="text" value={member.name} onChange={e => handleMemberChange(idx, 'name', e.target.value.toUpperCase())} required className={`w-full px-3 py-2 border rounded ${!member.name && familyError ? 'border-red-500' : ''}`} />
                {!member.name && familyError && <div className="text-red-500 text-xs mt-1">Name is required</div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age <span className="text-red-500">*</span></label>
                <input type="number" min="0" value={member.age} onChange={e => handleMemberChange(idx, 'age', e.target.value)} required className={`w-full px-3 py-2 border rounded ${!member.age && familyError ? 'border-red-500' : ''}`} />
                {!member.age && familyError && <div className="text-red-500 text-xs mt-1">Age is required</div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Occupation <span className="text-red-500">*</span></label>
                <input type="text" value={member.occupation} onChange={e => handleMemberChange(idx, 'occupation', e.target.value.toUpperCase())} required className={`w-full px-3 py-2 border rounded ${!member.occupation && familyError ? 'border-red-500' : ''}`} />
                {!member.occupation && familyError && <div className="text-red-500 text-xs mt-1">Occupation is required</div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar No. <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={member.aadharNo}
                  onChange={e => {
                    let val = e.target.value.replace(/[^0-9]/g, '');
                    if (val.length > 12) val = val.slice(0, 12);
                    val = val.replace(/(.{4})/g, '$1 ').trim();
                    handleMemberChange(idx, 'aadharNo', val);
                  }}
                  required
                  pattern="^(\d{4} \d{4} \d{4})$"
                  placeholder="1234 5678 9012"
                  className={`w-full px-3 py-2 border rounded ${(!member.aadharNo || !/^\d{4} \d{4} \d{4}$/.test(member.aadharNo)) && familyError ? 'border-red-500' : ''}`}
                  maxLength={14}
                />
                {(!member.aadharNo || !/^\d{4} \d{4} \d{4}$/.test(member.aadharNo)) && familyError && <div className="text-red-500 text-xs mt-1">Aadhaar No. must be 12 digits in XXXX XXXX XXXX format</div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Image <span className="text-red-500">*</span></label>
                <input type="file" accept="image/*,.pdf" onChange={e => handleMemberChange(idx, 'aadharImage', e.target.files?.[0] || null)} required className={`w-full ${!member.aadharImage && familyError ? 'border-red-500 border' : ''}`} />
                {!member.aadharImage && familyError && <div className="text-red-500 text-xs mt-1">Aadhaar Image is required</div>}
              </div>
              {!isMinor && <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PAN No. <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={member.panNo}
                    onChange={e => {
                      let val = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
                      if (val.length > 8) val = val.slice(0, 8);
                      handleMemberChange(idx, 'panNo', val);
                    }}
                    required
                    pattern="^[A-Z0-9]{8}$"
                    placeholder="ABCD1234"
                    className={`w-full px-3 py-2 border rounded ${(!member.panNo || !/^[A-Z0-9]{8}$/.test(member.panNo)) && familyError ? 'border-red-500' : ''}`}
                    maxLength={8}
                  />
                  {(!member.panNo || !/^[A-Z0-9]{8}$/.test(member.panNo)) && familyError && <div className="text-red-500 text-xs mt-1">PAN No. must be 8 alphanumeric characters</div>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PAN Image <span className="text-red-500">*</span></label>
                  <input type="file" accept="image/*,.pdf" onChange={e => handleMemberChange(idx, 'panImage', e.target.files?.[0] || null)} required className={`w-full ${!member.panImage && familyError ? 'border-red-500 border' : ''}`} />
                  {!member.panImage && familyError && <div className="text-red-500 text-xs mt-1">PAN Image is required</div>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status <span className="text-red-500">*</span></label>
                  <select value={member.maritalStatus} onChange={e => handleMemberChange(idx, 'maritalStatus', e.target.value)} required className={`w-full px-3 py-2 border rounded ${!member.maritalStatus && familyError ? 'border-red-500' : ''}`}>
                    <option value="">Select</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                  {!member.maritalStatus && familyError && <div className="text-red-500 text-xs mt-1">Marital Status is required</div>}
                </div>
              </>}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Land Owner <span className="text-red-500">*</span></label>
                <select value={member.landOwner} onChange={e => handleMemberChange(idx, 'landOwner', e.target.value)} required className={`w-full px-3 py-2 border rounded ${!member.landOwner && familyError ? 'border-red-500' : ''}`}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {!member.landOwner && familyError && <div className="text-red-500 text-xs mt-1">Land Owner is required</div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Income Certificate <span className="text-red-500">*</span></label>
                <input type="file" accept="image/*,.pdf" onChange={e => handleMemberChange(idx, 'incomeCertificate', e.target.files?.[0] || null)} required className={`w-full ${!member.incomeCertificate && familyError ? 'border-red-500 border' : ''}`} />
                {!member.incomeCertificate && familyError && <div className="text-red-500 text-xs mt-1">Income Certificate is required</div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Residential Certificate <span className="text-red-500">*</span></label>
                <input type="file" accept="image/*,.pdf" onChange={e => handleMemberChange(idx, 'residentialCertificate', e.target.files?.[0] || null)} required className={`w-full ${!member.residentialCertificate && familyError ? 'border-red-500 border' : ''}`} />
                {!member.residentialCertificate && familyError && <div className="text-red-500 text-xs mt-1">Residential Certificate is required</div>}
              </div>
            </div>
          </div>
        );
      })}
      <button type="button" onClick={addMember} className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">+ Add Family Member</button>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 mt-6">Family Photo <span className="text-red-500">*</span></label>
        <input type="file" accept="image/*" onChange={e => setFamilyPhoto(e.target.files?.[0] || null)} required className={`w-full ${!familyPhoto && familyError ? 'border-red-500 border' : ''}`} />
        {!familyPhoto && familyError && <div className="text-red-500 text-xs mt-1">Family photo is required</div>}
      </div>
    </div>
  );
}

export default ApplicationForm;