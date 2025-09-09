"use client";

import { useEffect, useState } from "react";
import { WelcomeVideo } from "./welcome-video";

export function WelcomeWrapper() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasShownVideo = localStorage.getItem('welcome-video-shown');
    if (!hasShownVideo) {
      setShowWelcome(true);
    }
  }, []);
  
  return showWelcome ? (
    <WelcomeVideo onComplete={() => setShowWelcome(false)} />
  ) : null;
}