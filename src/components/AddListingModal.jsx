import React, { useState } from 'react';
import { X, Upload, Plus, Minus, Save, FileText, Camera } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useAuction } from '../contexts/AuctionContext.jsx';

export function AddListingModal({ isOpen, onClose }) {
  const { t, currentLanguage } = useLanguage();
  const { user } = useAuth();
  const { addCar } = useAuction();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    title: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    registrationNumber: '',
    
    // Vehicle Details
    mileage: '',
    numberOfKeys: 2,
    numberOfOwners: 1,
    condition: 'excellent',
    fuelType: '',
    transmission: '',
    drivetrain: '',
    exteriorColor: '',
    interiorColor: '',
    category: '',
    
    // Technical Details
    vin: '',
    engine: '',
    engineSize: '',
    power: '',
    torque: '',
    
    // Auction Settings
    startingBid: '',
    reservePrice: '',
    auctionDuration: 7,
    startTime: 'immediate',
    scheduledStart: '',
    
    // Description & Condition
    description: '',
    knownIssues: '',
    serviceHistory: '',
    modifications: '',
    
    // Location
    location: '',
    
    // Features & Equipment
    features: [''],
    
    // Documents & Reports
    hasServiceHistory: false,
    hasInspectionReport: false,
    hasWarranty: false,
    warrantyDetails: '',
    
    // Save as draft option
    saveAsDraft: false
  });

  const [images, setImages] = useState(['']);
  const [documents, setDocuments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const steps = [
    { id: 1, title: 'Basic Information', description: 'Vehicle basics and registration' },
    { id: 2, title: 'Technical Details', description: 'Engine, transmission, and specifications' },
    { id: 3, title: 'Condition & History', description: 'Service history and known issues' },
    { id: 4, title: 'Photos & Documents', description: 'Upload images and inspection reports' },
    { id: 5, title: 'Auction Settings', description: 'Pricing and auction duration' },
    { id: 6, title: 'Review & Submit', description: 'Final review before listing' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => {
    setImages([...images, '']);
  };

  const removeImageField = (index) => {
    if (images.length > 1) {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    if (formData.features.length > 1) {
      setFormData(prev => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index)
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (isDraft = false) => {
    setIsSubmitting(true);

    try {
      const validImages = images.filter(img => img.trim() !== '');
      const validFeatures = formData.features.filter(feature => feature.trim() !== '');
      
      let auctionStartTime, auctionEndTime;
      
      if (formData.startTime === 'immediate') {
        auctionStartTime = new Date();
      } else {
        auctionStartTime = new Date(formData.scheduledStart);
      }
      
      auctionEndTime = new Date(auctionStartTime.getTime() + formData.auctionDuration * 24 * 60 * 60 * 1000);

      const newCar = {
        id: `car_${Date.now()}`,
        ...formData,
        images: validImages.length > 0 ? validImages : ['https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=800'],
        features: validFeatures,
        sellerId: user.id,
        sellerName: user.name,
        currentBid: parseInt(formData.startingBid),
        startingBid: parseInt(formData.startingBid),
        reservePrice: formData.reservePrice ? parseInt(formData.reservePrice) : null,
        mileage: parseInt(formData.mileage),
        auctionStartTime: auctionStartTime.toISOString(),
        auctionEndTime: auctionEndTime.toISOString(),
        status: isDraft ? 'draft' : 'active',
        bids: [],
        inspectionReport: {
          overall: 'Excellent',
          engine: 'Excellent',
          transmission: 'Excellent',
          brakes: 'Good',
          tires: 'Good',
          interior: 'Excellent',
          exterior: 'Excellent'
        }
      };

      addCar(newCar);
      onClose();
      
      // Reset form
      setFormData({
        title: '',
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        registrationNumber: '',
        mileage: '',
        numberOfKeys: 2,
        numberOfOwners: 1,
        condition: 'excellent',
        fuelType: '',
        transmission: '',
        drivetrain: '',
        exteriorColor: '',
        interiorColor: '',
        category: '',
        vin: '',
        engine: '',
        engineSize: '',
        power: '',
        torque: '',
        startingBid: '',
        reservePrice: '',
        auctionDuration: 7,
        startTime: 'immediate',
        scheduledStart: '',
        description: '',
        knownIssues: '',
        serviceHistory: '',
        modifications: '',
        location: '',
        features: [''],
        hasServiceHistory: false,
        hasInspectionReport: false,
        hasWarranty: false,
        warrantyDetails: '',
        saveAsDraft: false
      });
      setImages(['']);
      setCurrentStep(1);
    } catch (error) {
      console.error('Error adding listing:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPlaceholder = (key) => {
    const placeholders = {
      en: {
        title: 'e.g., 2022 BMW M4 Competition',
        brand: 'e.g., BMW',
        model: 'e.g., M4 Competition',
        registrationNumber: 'e.g., ABC123',
        description: 'Describe your vehicle in detail...',
        location: 'e.g., Stockholm, Sweden',
        vin: 'e.g., WBA3B1C50DF123456',
        engine: 'e.g., 3.0L Twin-Turbo I6',
        transmission: 'e.g., 8-Speed Automatic',
        exteriorColor: 'e.g., Alpine White',
        interiorColor: 'e.g., Black Leather',
        feature: 'e.g., Carbon Fiber Package',
        knownIssues: 'List any known issues or defects...',
        serviceHistory: 'Describe the service history...',
        modifications: 'List any modifications or upgrades...'
      },
      sv: {
        title: 't.ex., 2022 BMW M4 Competition',
        brand: 't.ex., BMW',
        model: 't.ex., M4 Competition',
        registrationNumber: 't.ex., ABC123',
        description: 'Beskriv ditt fordon i detalj...',
        location: 't.ex., Stockholm, Sverige',
        vin: 't.ex., WBA3B1C50DF123456',
        engine: 't.ex., 3.0L Twin-Turbo I6',
        transmission: 't.ex., 8-växlad Automat',
        exteriorColor: 't.ex., Alpinvit',
        interiorColor: 't.ex., Svart Läder',
        feature: 't.ex., Kolfiber Paket',
        knownIssues: 'Lista eventuella kända problem...',
        serviceHistory: 'Beskriv servicehistoriken...',
        modifications: 'Lista eventuella modifieringar...'
      }
    };
    return placeholders[currentLanguage.code]?.[key] || '';
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder={getPlaceholder('title')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number *
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  placeholder={getPlaceholder('registrationNumber')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand *
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder={getPlaceholder('brand')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model *
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder={getPlaceholder('model')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year *
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mileage *
                </label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Keys
                </label>
                <select
                  name="numberOfKeys"
                  value={formData.numberOfKeys}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value={1}>1 Key</option>
                  <option value={2}>2 Keys</option>
                  <option value={3}>3+ Keys</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Previous Owners
                </label>
                <select
                  name="numberOfOwners"
                  value={formData.numberOfOwners}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value={1}>1 Owner</option>
                  <option value={2}>2 Owners</option>
                  <option value={3}>3 Owners</option>
                  <option value={4}>4+ Owners</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Technical Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  VIN Number
                </label>
                <input
                  type="text"
                  name="vin"
                  value={formData.vin}
                  onChange={handleInputChange}
                  placeholder={getPlaceholder('vin')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Engine
                </label>
                <input
                  type="text"
                  name="engine"
                  value={formData.engine}
                  onChange={handleInputChange}
                  placeholder={getPlaceholder('engine')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Engine Size (L)
                </label>
                <input
                  type="text"
                  name="engineSize"
                  value={formData.engineSize}
                  onChange={handleInputChange}
                  placeholder="e.g., 3.0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Power (HP)
                </label>
                <input
                  type="text"
                  name="power"
                  value={formData.power}
                  onChange={handleInputChange}
                  placeholder="e.g., 473"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transmission
                </label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select transmission</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                  <option value="CVT">CVT</option>
                  <option value="DCT">DCT</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Drivetrain
                </label>
                <select
                  name="drivetrain"
                  value={formData.drivetrain}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select drivetrain</option>
                  <option value="FWD">FWD</option>
                  <option value="RWD">RWD</option>
                  <option value="AWD">AWD</option>
                  <option value="4WD">4WD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuel Type
                </label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select fuel type</option>
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Plug-in Hybrid">Plug-in Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select category</option>
                  <option value="Sports Car">Sports Car</option>
                  <option value="Supercar">Supercar</option>
                  <option value="Luxury">Luxury</option>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Convertible">Convertible</option>
                  <option value="Classic">Classic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exterior Color
                </label>
                <input
                  type="text"
                  name="exteriorColor"
                  value={formData.exteriorColor}
                  onChange={handleInputChange}
                  placeholder={getPlaceholder('exteriorColor')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interior Color
                </label>
                <input
                  type="text"
                  name="interiorColor"
                  value={formData.interiorColor}
                  onChange={handleInputChange}
                  placeholder={getPlaceholder('interiorColor')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Condition & History</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overall Condition *
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder={getPlaceholder('description')}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service History
              </label>
              <textarea
                name="serviceHistory"
                value={formData.serviceHistory}
                onChange={handleInputChange}
                placeholder={getPlaceholder('serviceHistory')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Known Issues or Defects
              </label>
              <textarea
                name="knownIssues"
                value={formData.knownIssues}
                onChange={handleInputChange}
                placeholder={getPlaceholder('knownIssues')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modifications or Upgrades
              </label>
              <textarea
                name="modifications"
                value={formData.modifications}
                onChange={handleInputChange}
                placeholder={getPlaceholder('modifications')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Document Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="hasServiceHistory"
                  checked={formData.hasServiceHistory}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Complete service history available
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="hasInspectionReport"
                  checked={formData.hasInspectionReport}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Professional inspection report available
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="hasWarranty"
                  checked={formData.hasWarranty}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Warranty remaining
                </label>
              </div>
            </div>

            {formData.hasWarranty && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Warranty Details
                </label>
                <textarea
                  name="warrantyDetails"
                  value={formData.warrantyDetails}
                  onChange={handleInputChange}
                  placeholder="Describe the warranty coverage and expiration..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder={getPlaceholder('location')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Photos & Documents</h3>
            
            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Photos (URLs) *
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Add high-quality photos of your vehicle. Include exterior, interior, engine bay, and any special features.
              </p>
              {images.map((image, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
              >
                <Plus className="w-4 h-4" />
                <span>Add another photo</span>
              </button>
            </div>

            {/* Document Upload Placeholder */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h4 className="font-medium text-gray-900 mb-2">Upload Documents</h4>
              <p className="text-sm text-gray-600 mb-4">
                Upload service records, inspection reports, or other relevant documents
              </p>
              <button
                type="button"
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 mx-auto"
              >
                <Upload className="w-4 h-4" />
                <span>Choose Files</span>
              </button>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Features & Equipment
              </label>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={getPlaceholder('feature')}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
              >
                <Plus className="w-4 h-4" />
                <span>Add another feature</span>
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Auction Settings</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Starting Bid ($) *
                </label>
                <input
                  type="number"
                  name="startingBid"
                  value={formData.startingBid}
                  onChange={handleInputChange}
                  placeholder="10000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reserve Price ($)
                </label>
                <input
                  type="number"
                  name="reservePrice"
                  value={formData.reservePrice}
                  onChange={handleInputChange}
                  placeholder="15000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-xs text-gray-500 mt-1">Optional - minimum price you'll accept</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auction Duration *
              </label>
              <select
                name="auctionDuration"
                value={formData.auctionDuration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option value={3}>3 days</option>
                <option value={5}>5 days</option>
                <option value={7}>7 days</option>
                <option value={10}>10 days</option>
                <option value={14}>14 days</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auction Start Time *
              </label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="startTime"
                    value="immediate"
                    checked={formData.startTime === 'immediate'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Start immediately after approval
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="startTime"
                    value="scheduled"
                    checked={formData.startTime === 'scheduled'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Schedule for later
                  </label>
                </div>
              </div>
              
              {formData.startTime === 'scheduled' && (
                <div className="mt-3">
                  <input
                    type="datetime-local"
                    name="scheduledStart"
                    value={formData.scheduledStart}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Review & Submit</h3>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-4">Listing Summary</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Vehicle:</span>
                  <p>{formData.title || 'Not specified'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Registration:</span>
                  <p>{formData.registrationNumber || 'Not specified'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Year:</span>
                  <p>{formData.year}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Mileage:</span>
                  <p>{formData.mileage ? `${parseInt(formData.mileage).toLocaleString()} miles` : 'Not specified'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Starting Bid:</span>
                  <p>{formData.startingBid ? `$${parseInt(formData.startingBid).toLocaleString()}` : 'Not specified'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Reserve Price:</span>
                  <p>{formData.reservePrice ? `$${parseInt(formData.reservePrice).toLocaleString()}` : 'No reserve'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Duration:</span>
                  <p>{formData.auctionDuration} days</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Location:</span>
                  <p>{formData.location || 'Not specified'}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Before You Submit</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Ensure all information is accurate and complete</li>
                <li>• Photos should be high-quality and show all aspects of the vehicle</li>
                <li>• Your listing will be reviewed before going live</li>
                <li>• You'll be notified once your auction is approved and active</li>
              </ul>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="saveAsDraft"
                checked={formData.saveAsDraft}
                onChange={handleInputChange}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Save as draft (you can complete and submit later)
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{t('seller.add.listing')}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-2 overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep === step.id 
                    ? 'bg-emerald-600 text-white' 
                    : currentStep > step.id 
                    ? 'bg-emerald-100 text-emerald-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {step.id}
                </div>
                <div className="ml-2 min-w-0">
                  <p className={`text-sm font-medium ${
                    currentStep === step.id ? 'text-emerald-600' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 hidden sm:block">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-8 h-px bg-gray-300 mx-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex space-x-3">
              {currentStep === steps.length ? (
                <>
                  {formData.saveAsDraft && (
                    <button
                      onClick={() => handleSubmit(true)}
                      disabled={isSubmitting}
                      className="px-6 py-2 border border-emerald-300 text-emerald-600 rounded-lg hover:bg-emerald-50 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4 inline mr-2" />
                      {isSubmitting ? 'Saving...' : 'Save Draft'}
                    </button>
                  )}
                  <button
                    onClick={() => handleSubmit(false)}
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
                  >
                    {isSubmitting ? t('common.loading') : 'Submit for Review'}
                  </button>
                </>
              ) : (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}