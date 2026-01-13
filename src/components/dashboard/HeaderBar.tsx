import { Navigation, Battery, Wifi, Signal } from 'lucide-react';
import { motion } from 'framer-motion';

const HeaderBar = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-background/50 backdrop-blur-sm border-b border-border/30">
      {/* Drone Link Status */}
      <motion.div 
        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-primary/30"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="status-dot status-dot-active" />
        <span className="text-sm font-semibold tracking-wide text-foreground">
          DRONE LINK: <span className="text-primary">ACTIVE</span>
        </span>
      </motion.div>

      {/* Status Icons */}
      <motion.div 
        className="flex items-center gap-4 text-muted-foreground"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center gap-1.5">
          <Navigation className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-foreground">STRONG</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Battery className="w-4 h-4" />
          <span className="text-xs font-medium">78%</span>
        </div>
        <Wifi className="w-4 h-4" />
      </motion.div>
    </header>
  );
};

export default HeaderBar;
