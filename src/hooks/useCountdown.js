import { useState, useEffect, useRef } from "react";

// start: time in s to start the countdown at
const useCountdown = (initTime) => {
  const [time, setTime] = useState(initTime);
  const [isPaused, setIsPaused] = useState(true);
  const intervalRef = useRef(null);

  const pauseCountdown = () => {
    setIsPaused(true);
  }

  const startCountdown = () => {
    setIsPaused(false);
  }

  const resetCountdown = () => {
    setTime(initTime);
  }

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => clearInterval(intervalRef.current)
  }, [isPaused])

  useEffect(() => {
    if (time <= 0)
    {
      clearInterval(intervalRef.current);
      setIsPaused(true);
    }
  }, [time])

  return [pauseCountdown, startCountdown, time, resetCountdown];
}

export default useCountdown;