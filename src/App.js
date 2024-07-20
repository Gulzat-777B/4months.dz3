import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function StopwatchApp() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    if (!isRunning) {
      const startTime = Date.now() - elapsedTime;
      timerRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setElapsedTime(0);
  };

  const formatTime = (time) => {
    const padTime = (value) => {
      return String(value).padStart(2, '0');
    };
    const hours = padTime(Math.floor(time / (1000 * 60 * 60)));
    const minutes = padTime(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = padTime(Math.floor((time % (1000 * 60)) / 1000));
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="App">
      <h1>Секундомер</h1>
      <div className="timer">{formatTime(elapsedTime)}</div>
      <div className="buttons">
        <button onClick={startTimer} disabled={isRunning}>Старт</button>
        <button onClick={stopTimer} disabled={!isRunning}>Стоп</button>
        <button onClick={resetTimer}>Сброс</button>
        
      </div>
    </div>
  );
}

export default StopwatchApp;




















// function App() {
//   return (
//     <div className="App">
 
//     </div>
//   );
// }

// export default App;
