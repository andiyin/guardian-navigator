import { motion } from 'framer-motion';
import { Phone, CheckCircle2 } from 'lucide-react';

interface ActionFooterProps {
  arrivalStatus: 'navigating' | 'arriving' | 'arrived';
  onBackup: () => void;
  onArrived: () => void;
}

const ActionFooter = ({ arrivalStatus, onBackup, onArrived }: ActionFooterProps) => {
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

  return (
    <footer className="flex items-center gap-4 px-4 py-3 bg-background/50 backdrop-blur-sm border-t border-border/30">
      {/* Backup Button */}
      <motion.button
        onClick={onBackup}
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
