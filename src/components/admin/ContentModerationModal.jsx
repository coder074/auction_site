import React, { useState } from 'react';
import { X, Eye, Check, AlertTriangle, Edit, Trash2, Flag, Image } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useAuction } from '../../contexts/AuctionContext.jsx';

export function ContentModerationModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { cars } = useAuction();
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedListing, setSelectedListing] = useState(null);

  if (!isOpen) return null;

  // Mock pending listings and reported content
  const pendingListings = [
    {
      id: 'pending_1',
      title: '2023 Ferrari F8 Tributo',
      seller: 'Luxury Motors',
      submittedDate: '2024-03-15',
      status: 'pending_review',
      images: ['https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=800'],
      description: 'Pristine Ferrari F8 Tributo with only 2,500 miles...',
      startingBid: 275000,
      issues: ['Price verification needed', 'VIN check pending']
    },
    {
      id: 'pending_2',
      title: '2022 Lamborghini Huracán',
      seller: 'Elite Cars',
      submittedDate: '2024-03-14',
      status: 'pending_review',
      images: ['https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=800'],
      description: 'Low mileage Lamborghini Huracán in excellent condition...',
      startingBid: 200000,
      issues: ['Documentation incomplete']
    }
  ];

  const reportedContent = [
    {
      id: 'report_1',
      type: 'listing',
      title: '2021 BMW M4 - Suspicious Pricing',
      reporter: 'John Smith',
      reportDate: '2024-03-14',
      reason: 'Price seems too low for vehicle condition',
      status: 'under_review',
      priority: 'medium'
    },
    {
      id: 'report_2',
      type: 'user',
      title: 'Fake Seller Account - Premium Motors',
      reporter: 'Sarah Johnson',
      reportDate: '2024-03-13',
      reason: 'Suspected fake business credentials',
      status: 'under_review',
      priority: 'high'
    }
  ];

  const tabs = [
    { id: 'pending', label: 'Pending Review', count: pendingListings.length },
    { id: 'reported', label: 'Reported Content', count: reportedContent.length },
    { id: 'approved', label: 'Recently Approved', count: 15 },
    { id: 'rejected', label: 'Rejected', count: 3 }
  ];

  const handleApproveListing = (listingId) => {
    console.log('Approving listing:', listingId);
    // Implementation for approving listing
  };

  const handleRejectListing = (listingId) => {
    console.log('Rejecting listing:', listingId);
    // Implementation for rejecting listing
  };

  const handleEditListing = (listingId) => {
    console.log('Editing listing:', listingId);
    // Implementation for editing listing
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Content Moderation</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 p-4">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{tab.label}</span>
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                      {tab.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'pending' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Pending Listings Review</h3>
                {pendingListings.map((listing) => (
                  <div key={listing.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{listing.title}</h4>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                            Pending Review
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <span className="font-medium">Seller:</span> {listing.seller}
                          </div>
                          <div>
                            <span className="font-medium">Submitted:</span> {listing.submittedDate}
                          </div>
                          <div>
                            <span className="font-medium">Starting Bid:</span> ${listing.startingBid.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Images:</span> {listing.images.length}
                          </div>
                        </div>

                        <p className="text-gray-700 mb-3 line-clamp-2">{listing.description}</p>

                        {listing.issues && listing.issues.length > 0 && (
                          <div className="mb-3">
                            <span className="text-sm font-medium text-red-600">Issues to Review:</span>
                            <ul className="list-disc list-inside text-sm text-red-600 mt-1">
                              {listing.issues.map((issue, index) => (
                                <li key={index}>{issue}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col space-y-2">
                        <button 
                          onClick={() => setSelectedListing(listing)}
                          className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Review</span>
                        </button>
                        <button 
                          onClick={() => handleEditListing(listing.id)}
                          className="flex items-center space-x-1 px-3 py-1 text-gray-600 hover:bg-gray-50 rounded text-sm"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button 
                          onClick={() => handleApproveListing(listing.id)}
                          className="flex items-center space-x-1 px-3 py-1 text-green-600 hover:bg-green-50 rounded text-sm"
                        >
                          <Check className="w-4 h-4" />
                          <span>Approve</span>
                        </button>
                        <button 
                          onClick={() => handleRejectListing(listing.id)}
                          className="flex items-center space-x-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
                        >
                          <X className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reported' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Reported Content</h3>
                {reportedContent.map((report) => (
                  <div key={report.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{report.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            report.priority === 'high' ? 'bg-red-100 text-red-800' :
                            report.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {report.priority} priority
                          </span>
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                            {report.status.replace('_', ' ')}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <span className="font-medium">Reporter:</span> {report.reporter}
                          </div>
                          <div>
                            <span className="font-medium">Report Date:</span> {report.reportDate}
                          </div>
                          <div>
                            <span className="font-medium">Type:</span> {report.type}
                          </div>
                        </div>

                        <div className="mb-3">
                          <span className="text-sm font-medium text-gray-700">Reason:</span>
                          <p className="text-gray-700 mt-1">{report.reason}</p>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        <button className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm">
                          <Eye className="w-4 h-4" />
                          <span>Investigate</span>
                        </button>
                        <button className="flex items-center space-x-1 px-3 py-1 text-green-600 hover:bg-green-50 rounded text-sm">
                          <Check className="w-4 h-4" />
                          <span>Resolve</span>
                        </button>
                        <button className="flex items-center space-x-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm">
                          <Flag className="w-4 h-4" />
                          <span>Take Action</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'approved' && (
              <div className="text-center py-12">
                <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Recently Approved Content</h3>
                <p className="text-gray-600">15 listings approved in the last 7 days</p>
              </div>
            )}

            {activeTab === 'rejected' && (
              <div className="text-center py-12">
                <X className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Rejected Content</h3>
                <p className="text-gray-600">3 listings rejected in the last 7 days</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}