
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ClipboardList, School, Clock, CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import StudentForm from '@/components/StudentForm';
import TeacherDashboard from '@/components/TeacherDashboard';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [hallPasses, setHallPasses] = useState([]);

  useEffect(() => {
    const savedPasses = localStorage.getItem('hallPasses');
    if (savedPasses) {
      setHallPasses(JSON.parse(savedPasses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hallPasses', JSON.stringify(hallPasses));
  }, [hallPasses]);

  const addHallPass = (passData) => {
    const newPass = {
      id: Date.now(),
      ...passData,
      status: 'pending',
      timestamp: new Date().toISOString(),
      timeOut: null,
      timeIn: null
    };
    setHallPasses(prev => [newPass, ...prev]);
    toast({
      title: "Hall Pass Submitted! 🎉",
      description: "Your request has been sent to your teacher for approval.",
    });
  };

  const updatePassStatus = (id, status, timeOut = null, timeIn = null) => {
    setHallPasses(prev => prev.map(pass => 
      pass.id === id 
        ? { ...pass, status, timeOut, timeIn }
        : pass
    ));
    
    const statusMessages = {
      approved: "Hall pass approved! ✅",
      denied: "Hall pass denied ❌",
      active: "Student is now out of class 🚶‍♂️",
      returned: "Student has returned to class 🏫"
    };
    
    if (statusMessages[status]) {
      toast({
        title: statusMessages[status],
        description: status === 'denied' ? "Please see your teacher for more information." : "Status updated successfully.",
      });
    }
  };

  const renderHome = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <School className="w-20 h-20 text-white floating-animation" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full pulse-glow"></div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Smart Hall Pass
          </h1>
          <p className="text-xl text-white/80 mb-2">Abington Middle School</p>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Streamlined hall pass management for students and teachers. Request passes digitally and track student movement in real-time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-effect rounded-2xl p-8 hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => setCurrentView('student')}
          >
            <div className="flex items-center justify-between mb-6">
              <ClipboardList className="w-12 h-12 text-white" />
              <ArrowRight className="w-6 h-6 text-white/60" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Student Portal</h2>
            <p className="text-white/80 mb-6">
              Request hall passes for bathroom breaks, nurse visits, office trips, and more. Quick and easy digital forms.
            </p>
            <div className="flex items-center space-x-4 text-sm text-white/60">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Instant submission</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4" />
                <span>Real-time status</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="glass-effect rounded-2xl p-8 hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => setCurrentView('teacher')}
          >
            <div className="flex items-center justify-between mb-6">
              <Users className="w-12 h-12 text-white" />
              <ArrowRight className="w-6 h-6 text-white/60" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Teacher Dashboard</h2>
            <p className="text-white/80 mb-6">
              Monitor student requests, approve or deny passes, and track who's currently out of class in real-time.
            </p>
            <div className="flex items-center space-x-4 text-sm text-white/60">
              <div className="flex items-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>Live monitoring</span>
              </div>
              <div className="flex items-center space-x-1">
                <XCircle className="w-4 h-4" />
                <span>Quick approval</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="glass-effect rounded-xl p-6 inline-block">
            <p className="text-white/80 text-sm">
              📚 Enhancing classroom management through digital innovation
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {renderHome()}
          </motion.div>
        )}
        
        {currentView === 'student' && (
          <motion.div
            key="student"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <StudentForm 
              onSubmit={addHallPass}
              onBack={() => setCurrentView('home')}
              hallPasses={hallPasses.filter(pass => pass.studentName)}
            />
          </motion.div>
        )}
        
        {currentView === 'teacher' && (
          <motion.div
            key="teacher"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <TeacherDashboard 
              hallPasses={hallPasses}
              onUpdateStatus={updatePassStatus}
              onBack={() => setCurrentView('home')}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <Toaster />
    </div>
  );
}

export default App;
