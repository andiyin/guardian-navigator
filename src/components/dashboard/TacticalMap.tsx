import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Compass, Navigation2, Bike, MapPin, Target, TriangleAlert } from 'lucide-react';

interface CrowdDot {
  id: number;
  x: number;
  y: number;
  delay: number;
}

interface TeamMarker {
  id: string;
  x: number;
  y: number;
  label: string;
}

interface TacticalMapProps {
  userPosition: { x: number; y: number };
  targetPosition: { x: number; y: number };
  onPositionUpdate?: (pos: { x: number; y: number }) => void;
  isNavigating: boolean;
}

const TacticalMap = ({ userPosition, targetPosition, isNavigating }: TacticalMapProps) => {
  const [zoom, setZoom] = useState(1);
  const [isHeadsUp, setIsHeadsUp] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Crowd density dots
  const crowdDots: CrowdDot[] = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: 35 + Math.random() * 50,
    y: 25 + Math.random() * 55,
    delay: Math.random() * 2,
  }));

  // Other team markers
  const teamMarkers: TeamMarker[] = [
    { id: 'team2', x: 70, y: 30, label: 'T2' },
    { id: 'team3', x: 25, y: 60, label: 'T3' },
  ];

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const toggleOrientation = () => setIsHeadsUp(prev => !prev);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Path points for the navigation curve
  const pathD = `M ${userPosition.x}% ${userPosition.y}% 
                 Q ${userPosition.x - 5}% ${userPosition.y - 20}%, ${userPosition.x - 10}% ${userPosition.y - 35}%
                 Q ${userPosition.x - 15}% ${userPosition.y - 50}%, ${targetPosition.x}% ${targetPosition.y}%`;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-secondary/50 border border-border/50">
      {/* Map Container */}
      <div
        ref={mapRef}
        className="relative h-full w-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px) rotate(${isHeadsUp ? 45 : 0}deg)`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        }}
      >
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 grid-pattern opacity-60" />

        {/* Street Labels */}
        <div className="absolute top-[18%] left-[8%] text-muted-foreground/40 text-xs font-medium tracking-wider rotate-[-30deg]">
          Brienner str.
        </div>
        <div className="absolute top-[55%] left-[45%] text-muted-foreground/30 text-lg font-semibold tracking-widest">
          Odeonsplatz
        </div>

        {/* Map Area Overlay */}
        <div className="absolute top-[15%] left-[30%] w-[55%] h-[65%] bg-muted/30 rounded-lg border border-border/30" />

        {/* Crowd Density Dots */}
        {crowdDots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute w-2 h-2 rounded-full bg-destructive pulse-dot"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              animationDelay: `${dot.delay}s`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ delay: dot.delay * 0.1 }}
          />
        ))}

        {/* Navigation Path */}
        {isNavigating && (
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Path Glow Background */}
            <path
              d={`M ${userPosition.x} ${userPosition.y} 
                  C ${userPosition.x - 2} ${userPosition.y - 20}, 
                    ${userPosition.x - 5} ${userPosition.y - 40}, 
                    ${userPosition.x - 10} ${userPosition.y - 55}
                  C ${userPosition.x - 15} ${userPosition.y - 70}, 
                    ${targetPosition.x + 10} ${targetPosition.y + 20}, 
                    ${targetPosition.x} ${targetPosition.y}`}
              fill="none"
              stroke="#00ff00"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#pathGlow)"
              opacity="0.5"
            />
            {/* Main Path with Animation */}
            <path
              d={`M ${userPosition.x} ${userPosition.y} 
                  C ${userPosition.x - 2} ${userPosition.y - 20}, 
                    ${userPosition.x - 5} ${userPosition.y - 40}, 
                    ${userPosition.x - 10} ${userPosition.y - 55}
                  C ${userPosition.x - 15} ${userPosition.y - 70}, 
                    ${targetPosition.x + 10} ${targetPosition.y + 20}, 
                    ${targetPosition.x} ${targetPosition.y}`}
              fill="none"
              stroke="#00ff00"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="3 2"
              style={{ 
                animation: 'flow 0.8s linear infinite',
              }}
            />
          </svg>
        )}

        {/* Obstacle Marker */}
        <motion.div
          className="absolute flex flex-col items-center"
          style={{ left: '32%', top: '28%' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-alert/90 border-2 border-alert">
            <Bike className="w-4 h-4 text-alert-foreground" />
          </div>
          <span className="mt-1 px-1.5 py-0.5 bg-background/80 rounded text-[10px] font-bold text-alert tracking-wider">
            OBSTACLE
          </span>
        </motion.div>

        {/* Target Marker */}
        <motion.div
          className="absolute flex flex-col items-center"
          style={{ left: `${targetPosition.x}%`, top: `${targetPosition.y}%` }}
          initial={{ scale: 0, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <div className="relative">
            <Target className="w-8 h-8 text-primary glow-primary" />
            <motion.div
              className="absolute inset-0 border-2 border-primary rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className="mt-1 px-1.5 py-0.5 bg-background/80 rounded text-[10px] font-bold text-primary tracking-wider">
            TARGET
          </span>
        </motion.div>

        {/* User Position (Self) */}
        <motion.div
          className="absolute"
          style={{ left: `${userPosition.x}%`, top: `${userPosition.y}%` }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          {/* Radar Ping */}
          <motion.div
            className="absolute -inset-4 rounded-full border-2 border-info"
            animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* User Puck */}
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-info glow-info border-2 border-info-foreground">
            <Navigation2 className="w-4 h-4 text-info-foreground" style={{ transform: 'rotate(-45deg)' }} />
          </div>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-background/80 rounded text-[10px] font-bold text-info tracking-wider whitespace-nowrap">
            YOU
          </span>
        </motion.div>

        {/* Team Markers */}
        {teamMarkers.map((team) => (
          <motion.div
            key={team.id}
            className="absolute"
            style={{ left: `${team.x}%`, top: `${team.y}%` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative">
              <div 
                className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-l-transparent border-r-transparent border-b-info/70"
                style={{ transform: 'rotate(180deg)' }}
              />
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-info/70">
                {team.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="glass-card w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted/50 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="glass-card w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted/50 transition-colors"
        >
          <Minus className="w-5 h-5" />
        </button>
      </div>

      {/* Orientation Toggle */}
      <button
        onClick={toggleOrientation}
        className={`absolute top-4 left-4 glass-card w-10 h-10 flex items-center justify-center transition-colors ${
          isHeadsUp ? 'bg-primary/20 text-primary' : 'text-foreground hover:bg-muted/50'
        }`}
      >
        <Navigation2 className="w-5 h-5" style={{ transform: isHeadsUp ? 'rotate(0deg)' : 'rotate(-45deg)' }} />
      </button>

      {/* Compass */}
      <motion.div
        className="absolute top-4 right-4 glass-card w-12 h-12 flex items-center justify-center"
        animate={{ rotate: isHeadsUp ? -45 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <Compass className="w-6 h-6 text-muted-foreground" />
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[8px] font-bold text-primary">N</span>
        </div>
      </motion.div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 glass-card px-3 py-2">
        <div className="flex items-center gap-4 text-[10px]">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-destructive" />
            <span className="text-muted-foreground">Crowd</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-info" />
            <span className="text-muted-foreground">Teams</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TacticalMap;
