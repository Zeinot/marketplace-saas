"use client";

import { useEffect, useRef } from "react";

export function useNotificationSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioContextRef.current = new AudioContext();
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  const playNotificationSound = () => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  };

  return { playNotificationSound };
}
