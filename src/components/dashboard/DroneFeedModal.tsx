import { motion, AnimatePresence } from 'framer-motion';
import { X, Video, Signal, Battery, Maximize2 } from 'lucide-react';

interface DroneFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DroneFeedModal = ({ isOpen, onClose }: DroneFeedModalProps) => {
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
            className="relative w-[85%] max-w-3xl glass-card border-2 border-primary/50 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-xs font-bold text-primary tracking-wider">LIVE</span>
                </div>
                <span className="text-sm font-semibold text-foreground">DRONE FEED</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Signal className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-medium">STRONG</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Battery className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-medium">82%</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Video Feed Area */}
            <div className="relative aspect-video bg-background/80">
              {/* Simulated drone feed with noise effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-secondary/30">
                {/* Scan lines effect */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
                  }}
                />
                
                {/* Grid overlay */}
                <div className="absolute inset-0 grid-pattern opacity-20" />
                
                {/* Center crosshair */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute w-16 h-[1px] bg-primary/50 left-1/2 -translate-x-1/2 top-1/2" />
                    <div className="absolute h-16 w-[1px] bg-primary/50 top-1/2 -translate-y-1/2 left-1/2" />
                    <motion.div
                      className="w-24 h-24 border border-primary/30 rounded-full"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </div>

                {/* Crowd indicators */}
                <motion.div
                  className="absolute top-[30%] left-[25%] w-16 h-12 border border-destructive/50 rounded"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span className="absolute -top-5 left-0 text-[9px] text-destructive font-medium">CROWD: 15+</span>
                </motion.div>

                <motion.div
                  className="absolute top-[45%] right-[30%] w-12 h-10 border border-destructive/50 rounded"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                >
                  <span className="absolute -top-5 left-0 text-[9px] text-destructive font-medium">CROWD: 8+</span>
                </motion.div>

                {/* Target marker */}
                <motion.div
                  className="absolute bottom-[25%] left-[40%]"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <div className="relative">
                    <div className="w-8 h-8 border-2 border-primary rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-primary font-bold whitespace-nowrap">
                      PATIENT
                    </span>
                  </div>
                </motion.div>

                {/* Altitude & coordinates overlay */}
                <div className="absolute bottom-4 left-4 text-[10px] font-mono text-muted-foreground/70">
                  <div>ALT: 45m</div>
                  <div>48.1419° N, 11.5775° E</div>
                </div>

                {/* Timestamp */}
                <div className="absolute bottom-4 right-4 text-[10px] font-mono text-muted-foreground/70">
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    REC ●
                  </motion.span>
                  {' '}00:02:34
                </div>

                {/* Fullscreen hint */}
                <button className="absolute top-4 right-4 p-2 glass-card hover:bg-muted/50 transition-colors">
                  <Maximize2 className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DroneFeedModal;
