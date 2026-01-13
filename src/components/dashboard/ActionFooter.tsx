import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, CheckCircle2, Radio } from 'lucide-react';

interface ActionFooterProps {
  arrivalStatus: 'navigating' | 'arriving' | 'arrived';
  onBackup: () => void;
  onArrived: () => void;
}

const ActionFooter = ({ arrivalStatus, onBackup, onArrived }: ActionFooterProps) => {
  const [showBackupAnimation, setShowBackupAnimation] = useState(false);

  const getButtonText = () => {
    switch (arrivalStatus) {
      case 'navigating':
        return 'ARRIVED AT SCENE';
      case 'arriving':
        return 'CONFIRM ARRIVAL';
      case 'arrived':
        return 'MISSION COMPLETE';
    }
  };

  const getButtonStyle = () => {
    switch (arrivalStatus) {
      case 'arriving':
        return 'animate-pulse';
      case 'arrived':
        return 'bg-primary/50';
      default:
        return '';
    }
  };

  const handleBackupClick = () => {
    setShowBackupAnimation(true);
    onBackup();
    // Hide animation after 3 seconds
    setTimeout(() => setShowBackupAnimation(false), 3000);
  };

  return (
    <footer className="relative flex items-center gap-4 px-4 py-3 bg-background/50 backdrop-blur-sm border-t border-border/30">
      {/* Backup Called Animation Overlay */}
      <AnimatePresence>
        {showBackupAnimation && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-destructive/10 backdrop-blur-sm z-10 rounded-t-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="flex items-center gap-3 px-6 py-3 bg-destructive/90 rounded-xl border-2 border-destructive"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, -10, 10, -10, 0]
                }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.5 }}
              >
                <Radio className="w-6 h-6 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-white font-bold tracking-wider text-sm">BACKUP REQUESTED</span>
                <span className="text-white/80 text-xs">Dispatch notified</span>
              </div>
              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 border-2 border-destructive rounded-xl"
                animate={{ scale: [1, 1.15], opacity: [0.8, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 border-2 border-destructive rounded-xl"
                animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backup Button */}
      <motion.button
        onClick={handleBackupClick}
        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-destructive text-destructive font-bold tracking-wider uppercase transition-all hover:bg-destructive/10"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Phone className="w-5 h-5" />
        <span>BACKUP</span>
      </motion.button>

      {/* Arrived Button */}
      <motion.button
        onClick={onArrived}
        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-bold tracking-wider uppercase transition-all glow-primary ${getButtonStyle()}`}
        whileHover={{ scale: 1.02, boxShadow: '0 0 30px hsl(120 100% 50% / 0.6)' }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {arrivalStatus === 'arrived' && <CheckCircle2 className="w-5 h-5" />}
        <span>{getButtonText()}</span>
      </motion.button>
    </footer>
  );
};

export default ActionFooter;
