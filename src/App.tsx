import React, { useState } from 'react';
import { FileText, Search, Plus, BarChart3, Settings, Home, Users, Clock, AlertCircle, CheckCircle, DollarSign, MessageSquare, FileCheck } from 'lucide-react';

// Mock data for demonstration
const mockData = {
  pendingDisposal: {
    lessThan10Days: 12,
    moreThan15Days: 8,
    moreThan20Days: 4
  },
  rtiRequests: {
    new: 4,
    underProcess: 15
  },
  appeals: {
    raised: 32,
    disposed: 8
  },
  additionalPayment: {
    demanded: 5,
    received: 3
  },
  actions: {
    thirdPartyInfo: 2,
    documentsCalled: 6
  },
  comments: {
    sought: 1,
    pioComments: 3
  }
};

const mockRequests = [
  { id: 1, regNo: 'RTI/2024/001', name: 'John Doe', receivedDate: '2024-05-15', status: 'Pending' },
  { id: 2, regNo: 'RTI/2024/002', name: 'Jane Smith', receivedDate: '2024-05-20', status: 'Under Process' },
  { id: 3, regNo: 'RTI/2024/003', name: 'Bob Johnson', receivedDate: '2024-05-25', status: 'New' },
  { id: 4, regNo: 'RTI/2024/004', name: 'Alice Brown', receivedDate: '2024-06-01', status: 'Pending' }
];

const mockAppeals = [
  { id: 1, appealNo: 'APP/2024/001', name: 'John Doe', receivedDate: '2024-05-15', requestNo: 'RTI/2024/001' },
  { id: 2, appealNo: 'APP/2024/002', name: 'Jane Smith', receivedDate: '2024-05-20', requestNo: 'RTI/2024/002' }
];

// Header Component
const Header = ({ currentView, setCurrentView }: { currentView: string; setCurrentView: (view: string) => void }) => {
  return (
    <header className="bg-white shadow-lg border-b-4 border-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <FileText className="mr-2 h-8 w-8 text-blue-600" />
                RTI-MIS
              </h1>
            </div>
            <div className="text-sm text-gray-600">
              <p><strong>Public Authority:</strong> Ministry of Information & Broadcasting</p>
              <p><strong>Role:</strong> PIO | <strong>User:</strong> SHRI D. DAM</p>
            </div>
          </div>
          <nav className="flex space-x-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                currentView === 'dashboard' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="mr-1 h-4 w-4" />
              HOME
            </button>
            <button
              onClick={() => setCurrentView('search')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                currentView === 'search' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Search className="mr-1 h-4 w-4" />
              SEARCH
            </button>
            <button
              onClick={() => setCurrentView('lodge')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                currentView === 'lodge' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Plus className="mr-1 h-4 w-4" />
              LODGE REQUEST
            </button>
            <div className="relative group">
              <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center">
                <BarChart3 className="mr-1 h-4 w-4" />
                REPORTS
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div className="py-1">
                  <button 
                    onClick={() => setCurrentView('reports-pending')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    PENDING REQUESTS
                  </button>
                  <button 
                    onClick={() => setCurrentView('reports-age')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    AGE WISE PENDENCY
                  </button>
                  <button 
                    onClick={() => setCurrentView('reports-designer')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    DESIGNER REPORT
                  </button>
                  <button 
                    onClick={() => setCurrentView('reports-nil-fee')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    NIL FEE REGISTRATION
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('change-password')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                currentView === 'change-password' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Settings className="mr-1 h-4 w-4" />
              UTILITY
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Dashboard Component
const Dashboard = ({ setCurrentView, setSelectedData }: { setCurrentView: (view: string) => void; setSelectedData: (data: any) => void }) => {
  const handleCardClick = (type: string, data: any) => {
    setSelectedData({ type, data });
    setCurrentView('list');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to PIO Module of RTI-MIS</h2>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <p className="text-blue-800">
            <strong>Public Authority:</strong> Ministry of Information & Broadcasting | 
            <strong> Role:</strong> PIO | 
            <strong> User:</strong> SHRI D. DAM
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Pending for Disposal */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="mr-2 h-5 w-5 text-red-500" />
            PENDING FOR DISPOSED OFF
          </h3>
          <div className="space-y-3">
            <div 
              className="flex justify-between items-center p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors"
              onClick={() => handleCardClick('pending-disposal', { type: 'lessThan10Days', count: mockData.pendingDisposal.lessThan10Days })}
            >
              <span className="text-sm font-medium text-red-800">≤10 Days</span>
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {mockData.pendingDisposal.lessThan10Days}
              </span>
            </div>
            <div 
              className="flex justify-between items-center p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
              onClick={() => handleCardClick('pending-disposal', { type: 'moreThan15Days', count: mockData.pendingDisposal.moreThan15Days })}
            >
              <span className="text-sm font-medium text-orange-800">&gt;15 Days</span>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {mockData.pendingDisposal.moreThan15Days}
              </span>
            </div>
          </div>
        </div>

        {/* RTI Requests */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="mr-2 h-5 w-5 text-blue-500" />
            RTI REQUESTS
          </h3>
          <div className="space-y-3">
            <div 
              className="flex justify-between items-center p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
              onClick={() => handleCardClick('rti-requests', { type: 'new', count: mockData.rtiRequests.new })}
            >
              <span className="text-sm font-medium text-blue-800">New</span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {mockData.rtiRequests.new}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-green-800">Under Process</span>
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {mockData.rtiRequests.underProcess}
              </span>
            </div>
          </div>
        </div>

        {/* Appeals */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertCircle className="mr-2 h-5 w-5 text-purple-500" />
            APPEALS
          </h3>
          <div className="space-y-3">
            <div 
              className="flex justify-between items-center p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors"
              onClick={() => handleCardClick('appeals', { type: 'raised', count: mockData.appeals.raised })}
            >
              <span className="text-sm font-medium text-purple-800">Raised</span>
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {mockData.appeals.raised}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
              <span className="text-sm font-medium text-indigo-800">Disposed</span>
              <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {mockData.appeals.disposed}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Payment */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-yellow-500" />
            ADDITIONAL PAYMENT
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm font-medium text-yellow-800">Demanded</span>
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {mockData.additionalPayment.demanded}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-green-800">Received</span>
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {mockData.additionalPayment.received}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileCheck className="mr-2 h-5 w-5 text-teal-500" />
            ACTIONS
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
              <span className="text-sm font-medium text-teal-800">3rd Party Info Req.</span>
              <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {mockData.actions.thirdPartyInfo}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-cyan-50 rounded-lg">
              <span className="text-sm font-medium text-cyan-800">Documents Called</span>
              <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {mockData.actions.documentsCalled}
              </span>
            </div>
          </div>
        </div>

        {/* Comments by AA */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-pink-500" />
            COMMENTS BY AA
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
              <span className="text-sm font-medium text-pink-800">Sought</span>
              <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {mockData.comments.sought}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-rose-50 rounded-lg">
              <span className="text-sm font-medium text-rose-800">PIO Comments</span>
              <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {mockData.comments.pioComments}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* What's New Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">What's New</h3>
        <div className="space-y-2">
          <p className="text-blue-100">• New RTI online portal features have been implemented</p>
          <p className="text-blue-100">• Enhanced security measures for user authentication</p>
          <p className="text-blue-100">• Improved reporting and analytics dashboard</p>
        </div>
      </div>
    </div>
  );
};

// List View Component
const ListView = ({ selectedData, setCurrentView, setAssessmentData }: { selectedData: any; setCurrentView: (view: string) => void; setAssessmentData: (data: any) => void }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleAssessment = (item: any) => {
    setAssessmentData(item);
    setCurrentView('assessment');
  };

  const getListTitle = () => {
    if (selectedData.type === 'pending-disposal') {
      return 'RECORDS OF REQUEST PENDING FOR MORE THAN 20 DAYS';
    } else if (selectedData.type === 'rti-requests') {
      return 'RECORDS OF NEW REQUEST';
    } else if (selectedData.type === 'appeals') {
      return 'LIST OF APPEALS FILED AGAINST THE REQUESTS DEALT BY CONCERNED PIO';
    }
    return 'Records List';
  };

  const renderTable = () => {
    if (selectedData.type === 'appeals') {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-900">Select</th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-900">Appeal Number</th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-900">Name</th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-900">Received Date</th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-900">Request Number</th>
              </tr>
            </thead>
            <tbody>
              {mockAppeals.map((appeal) => (
                <tr key={appeal.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">
                    <input 
                      type="radio" 
                      name="selectedAppeal" 
                      value={appeal.id}
                      onChange={() => setSelectedItem(appeal)}
                      className="w-4 h-4 text-blue-600"
                    />
                  </td>
                  <td className="px-4 py-2 border-b text-sm text-gray-900">{appeal.appealNo}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-900">{appeal.name}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-900">{appeal.receivedDate}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-900">{appeal.requestNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-900">Select</th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-900">Registration Number</th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-900">Name</th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-900">Received Date</th>
                {selectedData.type === 'rti-requests' && (
                  <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-900">Document</th>
                )}
              </tr>
            </thead>
            <tbody>
              {mockRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">
                    <input 
                      type="radio" 
                      name="selectedRequest" 
                      value={request.id}
                      onChange={() => setSelectedItem(request)}
                      className="w-4 h-4 text-blue-600"
                    />
                  </td>
                  <td className="px-4 py-2 border-b text-sm text-gray-900">{request.regNo}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-900">{request.name}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-900">{request.receivedDate}</td>
                  {selectedData.type === 'rti-requests' && (
                    <td className="px-4 py-2 border-b text-sm text-gray-900">
                      <button className="text-blue-600 hover:text-blue-800 flex items-center">
                        <FileText className="mr-1 h-4 w-4" />
                        PDF
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{getListTitle()}</h2>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-700">All items per page:</label>
            <select 
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="text-sm text-gray-700">
            Page {currentPage} of 1 | 0-{Math.min(itemsPerPage, mockRequests.length)} of total {mockRequests.length}
          </div>
        </div>

        {renderTable()}

        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing {Math.min(itemsPerPage, mockRequests.length)} of {mockRequests.length} entries
          </div>
          {selectedItem && (
            <button
              onClick={() => handleAssessment(selectedItem)}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Assess Selected Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Assessment Component
const AssessmentForm = ({ assessmentData, setCurrentView }: { assessmentData: any; setCurrentView: (view: string) => void }) => {
  const [formData, setFormData] = useState({
    category: '',
    decision: '',
    remarks: '',
    additionalFields: {}
  });
  const [showAlert, setShowAlert] = useState(false);

  const decisionOptions = [
    '-- PLEASE SELECT YOUR NEW ACTION / DECISION --',
    'ADDITIONAL PAYMENT REQUIRED FOR INFORMATION',
    'SUPPORTING DOCUMENT REQUIRED FROM APPLICANT',
    'THIRD PARTY INFORMATION INVOLVED',
    'REQUEST UNDER PROCESS AT OUR OFFICE',
    'TRANSFER REQUEST TO OTHER PIO',
    'PARTIALLY TRANSFER REQUEST TO OTHER PUBLIC AUTHORITY',
    'TRANSFER REQUEST TO OTHER PUBLIC AUTHORITY',
    'FINAL REPLY',
    'REQUEST DISPOSE OF',
    'REJECT RTI REQUEST',
    'PARTIALLY REJECT/ACCEPT RTI REQUEST'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.decision || formData.decision === '-- PLEASE SELECT YOUR NEW ACTION / DECISION --') {
      alert('Please select a decision.');
      return;
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setCurrentView('dashboard');
    }, 2000);
  };

  const renderAdditionalFields = () => {
    switch (formData.decision) {
      case 'ADDITIONAL PAYMENT REQUIRED FOR INFORMATION':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Mode(s) of Information Supply *
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2" required>
                <option value="">Select Mode</option>
                <option value="hard-copy">Hard Copy</option>
                <option value="electronic">Electronic Media</option>
                <option value="both">Both</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Payment Amount (₹) *
              </label>
              <input 
                type="number" 
                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                placeholder="Enter amount"
                required
              />
            </div>
          </div>
        );
      case 'SUPPORTING DOCUMENT REQUIRED FROM APPLICANT':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specify Required Documents *
            </label>
            <textarea 
              className="w-full border border-gray-300 rounded-md px-3 py-2" 
              rows={3}
              placeholder="List the required documents..."
              required
            />
          </div>
        );
      case 'TRANSFER REQUEST TO OTHER PIO':
      case 'TRANSFER REQUEST TO OTHER PUBLIC AUTHORITY':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transfer To *
              </label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                placeholder="Enter PIO/Authority name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for Transfer *
              </label>
              <textarea 
                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                rows={3}
                placeholder="Explain reason for transfer..."
                required
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {showAlert && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <CheckCircle className="inline mr-2 h-5 w-5" />
          Assessment submitted successfully!
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Assessment Form</h2>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Request Details</h3>
          <p><strong>Registration No:</strong> {assessmentData?.regNo || assessmentData?.appealNo}</p>
          <p><strong>Name:</strong> {assessmentData?.name}</p>
          <p><strong>Received Date:</strong> {assessmentData?.receivedDate}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            >
              <option value="">Select Category</option>
              <option value="general">General</option>
              <option value="urgent">Urgent</option>
              <option value="complex">Complex</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Decision/Action *
            </label>
            <select 
              value={formData.decision}
              onChange={(e) => setFormData({...formData, decision: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            >
              {decisionOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {renderAdditionalFields()}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remarks
            </label>
            <textarea 
              value={formData.remarks}
              onChange={(e) => setFormData({...formData, remarks: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2" 
              rows={4}
              placeholder="Enter any additional remarks..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setCurrentView('list')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Assessment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Search Component
const SearchComponent = ({ setCurrentView }: { setCurrentView: (view: string) => void }) => {
  const [searchType, setSearchType] = useState('registration');
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Search RTI Requests</h2>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search By
            </label>
            <select 
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="registration">Registration Number</option>
              <option value="name">Applicant Name</option>
              <option value="date">Date Range</option>
              <option value="status">Status</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Value
            </label>
            <input 
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder={`Enter ${searchType}...`}
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
            <Search className="mr-2 h-5 w-5" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

// Lodge Request Component
const LodgeRequest = ({ setCurrentView }: { setCurrentView: (view: string) => void }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Lodge New RTI Request</h2>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Applicant Name *
              </label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input 
                type="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Information Sought *
            </label>
            <textarea 
              className="w-full border border-gray-300 rounded-md px-3 py-2" 
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setCurrentView('dashboard')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Lodge Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedData, setSelectedData] = useState<any>(null);
  const [assessmentData, setAssessmentData] = useState<any>(null);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard setCurrentView={setCurrentView} setSelectedData={setSelectedData} />;
      case 'list':
        return <ListView selectedData={selectedData} setCurrentView={setCurrentView} setAssessmentData={setAssessmentData} />;
      case 'assessment':
        return <AssessmentForm assessmentData={assessmentData} setCurrentView={setCurrentView} />;
      case 'search':
        return <SearchComponent setCurrentView={setCurrentView} />;
      case 'lodge':
        return <LodgeRequest setCurrentView={setCurrentView} />;
      default:
        return <Dashboard setCurrentView={setCurrentView} setSelectedData={setSelectedData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      {renderCurrentView()}
    </div>
  );
}

export default App;