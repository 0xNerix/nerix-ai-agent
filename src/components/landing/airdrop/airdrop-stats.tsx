"use client";

import { Card } from "@/components/ui/card";
import { Users, Timer, Coins, Lock, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface AirdropStatsProps {
  totalParticipants: number;
  totalTokensDistributed: number;
  airdropEndDate: string; // ISO string date for airdrop end
  prelaunchEndDate: string; // ISO string date for prelaunch end
}

export function AirdropStats({
  totalParticipants,
  totalTokensDistributed,
  airdropEndDate,
  prelaunchEndDate
}: AirdropStatsProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isPrelaunch, setIsPrelaunch] = useState(true);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const prelaunchEnd = new Date(prelaunchEndDate).getTime();
      const airdropEnd = new Date(airdropEndDate).getTime();
      
      let targetTime;
      let isPrelaunchPhase = now < prelaunchEnd;
      
      if (isPrelaunchPhase) {
        targetTime = prelaunchEnd;
        setIsPrelaunch(true);
      } else if (now < airdropEnd) {
        targetTime = airdropEnd;
        setIsPrelaunch(false);
      } else {
        setIsExpired(true);
        return;
      }

      const difference = targetTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setIsExpired(true);
      }
    };

    // Calculate initial time
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [airdropEndDate, prelaunchEndDate]);

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num.toString();
  };

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds }
  ];

  const getTimerTitle = () => {
    if (isExpired) return "Airdrop Ended";
    if (isPrelaunch) return "Launch Countdown";
    return "Airdrop Ends In";
  };

  const getTimerIcon = () => {
    if (isExpired) return <Timer className="w-4 h-4" />;
    if (isPrelaunch) return <Rocket className="w-4 h-4" />;
    return <Timer className="w-4 h-4" />;
  };

  const getTimerGradient = () => {
    if (isExpired) return "from-gray-500 to-gray-600";
    if (isPrelaunch) return "from-orange-500 to-red-500";
    return "from-secondary to-accent";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
      {/* Participants Box */}
      <Card className={`relative p-6 overflow-hidden backdrop-blur-sm bg-background/20 border-primary/20 group transition-all duration-500 ${
        isPrelaunch ? 'opacity-60' : 'hover:bg-background/30 hover:border-primary/30'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="text-sm">
              {isPrelaunch ? "Pre-registered" : "Participants"}
            </span>
            {isPrelaunch && <Lock className="w-3 h-3 text-orange-500" />}
          </div>
          <p className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
            isPrelaunch ? 'from-orange-500 to-red-500' : 'from-primary to-secondary'
          }`}>
            {totalParticipants.toLocaleString()}
          </p>
          {isPrelaunch && (
            <p className="text-xs text-orange-400 font-medium">
              Waiting for launch
            </p>
          )}
        </div>
      </Card>

      {/* Floating Particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${
            isPrelaunch ? 'bg-orange-500/50' : 'bg-primary/50'
          }`}
          animate={{
            y: [-20, -40],
            x: i * 10,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: 9999,
            delay: i * 0.2
          }}
          style={{
            left: `${20 + i * 20}%`,
            bottom: "0%"
          }}
        />
      ))}

      {/* Countdown Timer Box */}
      <Card className={`relative p-6 overflow-hidden backdrop-blur-sm bg-background/20 transition-all duration-500 sm:col-span-2 lg:col-span-1 ${
        isExpired 
          ? 'border-gray-500/20' 
          : isPrelaunch 
            ? 'border-orange-500/20 hover:bg-background/30 hover:border-orange-500/30' 
            : 'border-secondary/20 hover:bg-background/30 hover:border-secondary/30'
      } group`}>
        <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          isExpired 
            ? 'from-gray-500/5 via-transparent to-gray-500/5'
            : isPrelaunch 
              ? 'from-orange-500/5 via-transparent to-red-500/5'
              : 'from-secondary/5 via-transparent to-accent/5'
        }`} />
        <div className="relative space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            {getTimerIcon()}
            <span className="text-sm">{getTimerTitle()}</span>
            {isPrelaunch && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: 9999 }}
              >
                <div className="w-2 h-2 rounded-full bg-orange-500" />
              </motion.div>
            )}
          </div>
          
          {!isExpired ? (
            <div className="flex items-center justify-between gap-2">
              {timeUnits.map((unit, index) => (
                <div key={unit.label} className="text-center flex-1">
                  <div className={`relative w-full h-12 bg-background/20 rounded-lg backdrop-blur-sm border overflow-hidden ${
                    isPrelaunch ? 'border-orange-500/20' : 'border-white/10'
                  }`}>
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={unit.value}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <span className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${getTimerGradient()}`}>
                          {formatNumber(unit.value)}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                    <motion.div
                      className={`absolute inset-0 border rounded-lg ${
                        isPrelaunch ? 'border-orange-500/30' : 'border-secondary/30'
                      }`}
                      animate={{
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{ duration: 2, repeat: 9999 }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-2xl font-bold text-gray-500">
                Event Ended
              </p>
            </div>
          )}
          
          {isPrelaunch && (
            <div className="mt-3 p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <p className="text-xs text-orange-400 text-center">
                Airdrop registration will begin when countdown reaches zero
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Distributed Box */}
      <Card className={`relative p-6 overflow-hidden backdrop-blur-sm bg-background/20 border-accent/20 group transition-all duration-500 ${
        isPrelaunch ? 'opacity-60' : 'hover:bg-background/30 hover:border-accent/30'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Coins className="w-4 h-4" />
            <span className="text-sm">Distributed</span>
            {isPrelaunch && <Lock className="w-3 h-3 text-orange-500" />}
          </div>
          <p className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
            isPrelaunch ? 'from-orange-500 to-red-500' : 'from-accent to-primary'
          }`}>
            {isPrelaunch ? '0' : totalTokensDistributed.toLocaleString()} NRX
          </p>
          {isPrelaunch && (
            <p className="text-xs text-orange-400 font-medium">
              Distribution starts at launch
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}