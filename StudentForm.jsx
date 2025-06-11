
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, User, MapPin, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';

const StudentForm = ({ onSubmit, onBack, hallPasses }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    teacherName: '',
    destination: '',
    reason: '',
    estimatedTime: '5'
  });

  const destinations = [
    'Bathroom',
    'Nurse\'s Office',
    'Main Office',
    'Library',
    'Guidance Counselor',
    'Another Classroom',
    'Water Fountain',
    'Locker',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.teacherName || !formData.destination) {
      return;
    }
    onSubmit(formData);
    setFormData({
      studentName: '',
      teacherName: '',
      destination: '',
      reason: '',
      estimatedTime: '5'
    });
  };

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

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending Approval';
      case 'approved': return 'Approved';
      case 'denied': return 'Denied';
      case 'active': return 'Currently Out';
      case 'returned': return 'Returned';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center mb-8"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white hover:bg-white/10 mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-white">Student Hall Pass Request</h1>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-2xl p-8"
          >
            <div className="flex items-center mb-6">
              <Send className="w-6 h-6 text-white mr-3" />
              <h2 className="text-2xl font-bold text-white">Request New Pass</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="studentName" className="text-white font-medium">
                  <User className="w-4 h-4 inline mr-2" />
                  Student Name
                </Label>
                <Input
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
                  placeholder="Enter your full name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teacherName" className="text-white font-medium">
                  <User className="w-4 h-4 inline mr-2" />
                  Teacher Name
                </Label>
                <Input
                  id="teacherName"
                  value={formData.teacherName}
                  onChange={(e) => setFormData(prev => ({ ...prev, teacherName: e.target.value }))}
                  placeholder="Enter your teacher's name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination" className="text-white font-medium">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Destination
                </Label>
                <select
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                  className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white"
                  required
                >
                  <option value="" className="text-gray-800">Select destination</option>
                  {destinations.map(dest => (
                    <option key={dest} value={dest} className="text-gray-800">{dest}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedTime" className="text-white font-medium">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Estimated Time (minutes)
                </Label>
                <select
                  id="estimatedTime"
                  value={formData.estimatedTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, estimatedTime: e.target.value }))}
                  className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white"
                >
                  <option value="5" className="text-gray-800">5 minutes</option>
                  <option value="10" className="text-gray-800">10 minutes</option>
                  <option value="15" className="text-gray-800">15 minutes</option>
                  <option value="20" className="text-gray-800">20 minutes</option>
                  <option value="30" className="text-gray-800">30 minutes</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason" className="text-white font-medium">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Additional Notes (Optional)
                </Label>
                <Textarea
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder="Any additional information..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-purple-600 hover:bg-white/90 font-semibold py-3 text-lg"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Hall Pass Request
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-effect rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Your Recent Requests</h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {hallPasses.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-white/40 mx-auto mb-4" />
                  <p className="text-white/60">No hall pass requests yet</p>
                </div>
              ) : (
                hallPasses.map((pass) => (
                  <motion.div
                    key={pass.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 rounded-lg p-4 border border-white/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">{pass.destination}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(pass.status)}`}>
                        {getStatusText(pass.status)}
                      </span>
                    </div>
                    <p className="text-white/80 text-sm mb-1">Teacher: {pass.teacherName}</p>
                    <p className="text-white/60 text-xs">
                      {new Date(pass.timestamp).toLocaleString()}
                    </p>
                    {pass.reason && (
                      <p className="text-white/70 text-sm mt-2 italic">"{pass.reason}"</p>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
