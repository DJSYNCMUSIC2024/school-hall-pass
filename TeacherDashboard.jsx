
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Clock, CheckCircle, XCircle, Eye, RotateCcw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';

const TeacherDashboard = ({ hallPasses, onUpdateStatus, onBack }) => {
  const [activeTab, setActiveTab] = useState('pending');

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'approved': return 'status-approved';
      case 'denied': return 'status-denied';
      case 'active': return 'status-active';
      case 'returned': return 'status-returned';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'denied': return <XCircle className="w-4 h-4" />;
      case 'active': return <Eye className="w-4 h-4" />;
      case 'returned': return <RotateCcw className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filterPasses = (status) => {
    if (status === 'all') return hallPasses;
    return hallPasses.filter(pass => pass.status === status);
  };

  const getTabCounts = () => {
    return {
      pending: hallPasses.filter(p => p.status === 'pending').length,
      active: hallPasses.filter(p => p.status === 'active').length,
      approved: hallPasses.filter(p => p.status === 'approved').length,
      all: hallPasses.length
    };
  };

  const handleApprove = (id) => {
    onUpdateStatus(id, 'approved');
  };

  const handleDeny = (id) => {
    onUpdateStatus(id, 'denied');
  };

  const handleMarkOut = (id) => {
    onUpdateStatus(id, 'active', new Date().toISOString());
  };

  const handleMarkReturned = (id) => {
    onUpdateStatus(id, 'returned', null, new Date().toISOString());
  };

  const counts = getTabCounts();

  const tabs = [
    { id: 'pending', label: 'Pending', count: counts.pending, icon: <Clock className="w-4 h-4" /> },
    { id: 'active', label: 'Currently Out', count: counts.active, icon: <Eye className="w-4 h-4" /> },
    { id: 'approved', label: 'Approved', count: counts.approved, icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'all', label: 'All Requests', count: counts.all, icon: <Users className="w-4 h-4" /> }
  ];

  const renderPassCard = (pass) => (
    <motion.div
      key={pass.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-white">{pass.studentName}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white flex items-center space-x-1 ${getStatusColor(pass.status)}`}>
              {getStatusIcon(pass.status)}
              <span className="capitalize">{pass.status}</span>
            </span>
          </div>
          <p className="text-white/80 mb-1">
            <strong>Teacher:</strong> {pass.teacherName}
          </p>
          <p className="text-white/80 mb-1">
            <strong>Destination:</strong> {pass.destination}
          </p>
          <p className="text-white/80 mb-1">
            <strong>Estimated Time:</strong> {pass.estimatedTime} minutes
          </p>
          {pass.reason && (
            <p className="text-white/70 text-sm mt-2 italic">
              <strong>Notes:</strong> "{pass.reason}"
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-white/60 mb-4">
        <span>Requested: {new Date(pass.timestamp).toLocaleString()}</span>
        {pass.timeOut && (
          <span>Out: {new Date(pass.timeOut).toLocaleTimeString()}</span>
        )}
        {pass.timeIn && (
          <span>Returned: {new Date(pass.timeIn).toLocaleTimeString()}</span>
        )}
      </div>

      <div className="flex space-x-2">
        {pass.status === 'pending' && (
          <>
            <Button
              onClick={() => handleApprove(pass.id)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve
            </Button>
            <Button
              onClick={() => handleDeny(pass.id)}
              variant="destructive"
              className="flex-1"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Deny
            </Button>
          </>
        )}
        
        {pass.status === 'approved' && (
          <Button
            onClick={() => handleMarkOut(pass.id)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Eye className="w-4 h-4 mr-2" />
            Mark as Out
          </Button>
        )}
        
        {pass.status === 'active' && (
          <Button
            onClick={() => handleMarkReturned(pass.id)}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Mark as Returned
          </Button>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-white hover:bg-white/10 mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-3xl font-bold text-white">Teacher Dashboard</h1>
          </div>
          
          <div className="glass-effect rounded-lg px-4 py-2">
            <span className="text-white/80 text-sm">
              Total Active: <span className="font-bold text-white">{counts.active}</span>
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-wrap gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white text-purple-600 font-semibold'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-purple-100 text-purple-600' : 'bg-white/20 text-white'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          {filterPasses(activeTab).length === 0 ? (
            <div className="glass-effect rounded-2xl p-12 text-center">
              <Users className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No requests found</h3>
              <p className="text-white/60">
                {activeTab === 'pending' && "No pending requests at the moment."}
                {activeTab === 'active' && "No students are currently out of class."}
                {activeTab === 'approved' && "No approved requests to display."}
                {activeTab === 'all' && "No hall pass requests have been submitted yet."}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filterPasses(activeTab).map(renderPassCard)}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
