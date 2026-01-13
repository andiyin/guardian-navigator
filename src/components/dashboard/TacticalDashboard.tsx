import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import HeaderBar from './HeaderBar';
import TacticalMap from './TacticalMap';
import InfoDashboard from './InfoDashboard';
import ActionFooter from './ActionFooter';
import MissionCompleteModal from './MissionCompleteModal';

const TacticalDashboard = () => {
  const [arrivalStatus, setArrivalStatus] = useState<'navigating' | 'arriving' | 'arrived'>('navigating');
  const [showMissionComplete, setShowMissionComplete] = useState(false);
  const [userPosition, setUserPosition] = useState({ x: 40, y: 85 });
  const [isNavigating, setIsNavigating] = useState(true);

  const targetPosition = { x: 18, y: 12 };

  // Dummy data
  const dashboardData = {
    obstacle: { type: 'OBSTACLE', name: 'FENCE' },
    eta: '7 min',
    nextTurn: { direction: 'TURN LEFT', distance: '150m' },
    patient: { gender: 'Male', age: '30y', condition: 'Head Injury' },
  };

  const handleBackup = () => {
    // Simulate calling for backup
    console.log('Backup requested!');
  };

  const handleArrived = () => {
    if (arrivalStatus === 'navigating') {
      setArrivalStatus('arriving');
    } else if (arrivalStatus === 'arriving') {
      setArrivalStatus('arrived');
      setShowMissionComplete(true);
    }
  };

  const handleNewMission = useCallback(() => {
    setShowMissionComplete(false);
    setArrivalStatus('navigating');
    setUserPosition({ x: 40, y: 85 });
    setIsNavigating(true);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <HeaderBar />

      {/* Main Content */}
      <main className="flex-1 flex gap-4 p-4 min-h-0">
        {/* Map Section - 60% */}
        <motion.div
          className="w-[60%] h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TacticalMap
            userPosition={userPosition}
            targetPosition={targetPosition}
            isNavigating={isNavigating}
          />
        </motion.div>

        {/* Info Dashboard - 40% */}
        <motion.div
          className="w-[40%] h-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <InfoDashboard {...dashboardData} />
        </motion.div>
      </main>

      {/* Footer Actions */}
      <ActionFooter
        arrivalStatus={arrivalStatus}
        onBackup={handleBackup}
        onArrived={handleArrived}
      />

      {/* Mission Complete Modal */}
      <MissionCompleteModal
        isOpen={showMissionComplete}
        onNewMission={handleNewMission}
        stats={{ timeSaved: '2m', patientSecured: true }}
      />
    </div>
  );
};

export default TacticalDashboard;
