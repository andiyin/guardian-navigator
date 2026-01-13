import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, Shield, RotateCcw } from 'lucide-react';

interface MissionCompleteModalProps {
  isOpen: boolean;
  onNewMission: () => void;
  stats: {
    timeSaved: string;
    patientSecured: boolean;
  };
}

const MissionCompleteModal = ({ isOpen, onNewMission, stats }: MissionCompleteModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="glass-card w-[90%] max-w-md p-6 border-2 border-primary glow-primary"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            {/* Success Header */}
            <div className="flex flex-col items-center text-center mb-6">
              <motion.div
                className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </motion.div>
              <h2 className="text-2xl font-bold text-primary text-glow-primary tracking-wider">
                MISSION COMPLETE
              </h2>
              <p className="text-muted-foreground text-sm mt-1">Patient reached successfully</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <motion.div
                className="glass-card p-4 flex flex-col items-center"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Clock className="w-6 h-6 text-primary mb-2" />
                <span className="text-xs text-muted-foreground">Time Saved</span>
                <span className="text-xl font-bold font-mono-data text-foreground">{stats.timeSaved}</span>
              </motion.div>

              <motion.div
                className="glass-card p-4 flex flex-col items-center"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Shield className="w-6 h-6 text-primary mb-2" />
                <span className="text-xs text-muted-foreground">Status</span>
                <span className="text-lg font-bold text-primary">SECURED</span>
              </motion.div>
            </div>

            {/* New Mission Button */}
            <motion.button
              onClick={onNewMission}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-primary-foreground font-bold tracking-wider uppercase glow-primary"
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px hsl(120 100% 50% / 0.7)' }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <RotateCcw className="w-5 h-5" />
              <span>START NEW MISSION</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MissionCompleteModal;
