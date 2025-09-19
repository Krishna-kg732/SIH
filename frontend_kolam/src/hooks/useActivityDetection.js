import { useEffect, useRef } from 'react';

const useActivityDetection = (timeoutMs = 12000) => {
  const isActive = useRef(true);
  const inactivityTimer = useRef(null);
  const onInactivity = useRef(() => {});

  const resetTimer = () => {
    if (!isActive.current) {
      isActive.current = true;
    }
    
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    inactivityTimer.current = setTimeout(() => {
      isActive.current = false;
      onInactivity.current();
    }, timeoutMs);
  };

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const handleActivity = () => {
      resetTimer();
    };

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Start initial timer
    resetTimer();

    return () => {
      // Cleanup
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [timeoutMs]);

  const setInactivityCallback = (callback) => {
    onInactivity.current = callback;
  };

  return { 
    isActive: isActive.current, 
    setInactivityCallback,
    resetTimer 
  };
};

export default useActivityDetection;