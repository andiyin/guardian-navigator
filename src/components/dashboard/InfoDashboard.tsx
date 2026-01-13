import { motion } from 'framer-motion';
import { TriangleAlert, Clock, CornerUpLeft, Cross } from 'lucide-react';

interface InfoDashboardProps {
  obstacle: { type: string; name: string };
  eta: string;
  nextTurn: { direction: string; distance: string };
  patient: { gender: string; age: string; condition: string };
}

const InfoDashboard = ({ obstacle, eta, nextTurn, patient }: InfoDashboardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4 }
    })
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Obstacle Alert Card */}
      <motion.div
        className="glass-card p-4 border-l-4 border-l-alert"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-alert/20">
            <TriangleAlert className="w-6 h-6 text-alert" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground tracking-wider">{obstacle.type}</span>
            <h3 className="text-lg font-bold text-foreground">{obstacle.name}</h3>
          </div>
        </div>
      </motion.div>

      {/* Time & Direction Row */}
      <div className="grid grid-cols-2 gap-3">
        {/* ETA Card */}
        <motion.div
          className="glass-card p-4 flex flex-col items-center justify-center"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <Clock className="w-6 h-6 text-muted-foreground mb-2" />
          <span className="text-2xl font-bold font-mono-data text-foreground">{eta}</span>
        </motion.div>

        {/* Next Turn Card */}
        <motion.div
          className="glass-card p-4 flex flex-col items-center justify-center"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <CornerUpLeft className="w-8 h-8 text-primary mb-1" />
          <span className="text-sm font-bold text-primary tracking-wide">{nextTurn.direction}</span>
          <span className="text-lg font-bold font-mono-data text-foreground">{nextTurn.distance}</span>
        </motion.div>
      </div>

      {/* Patient Card */}
      <motion.div
        className="glass-card p-4 border-l-4 border-l-destructive flex-1"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={3}
      >
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-destructive/20">
            <Cross className="w-6 h-6 text-destructive" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground tracking-wider">PATIENT</span>
            <h3 className="text-base font-semibold text-foreground">{patient.gender}, {patient.age}</h3>
            <span className="text-sm font-bold text-destructive text-glow-destructive">{patient.condition}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InfoDashboard;
