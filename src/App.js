import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function StopwatchApp() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [results, setResults] = useState([]);
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
      // Add the current elapsed time to results
      setResults([...results, elapsedTime]);
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
      <h1>Stopwatch</h1>
      <div className="timer">{formatTime(elapsedTime)}</div>
      <div className="buttons">
        <button onClick={startTimer} disabled={isRunning}>Start</button>
        <button onClick={stopTimer} disabled={!isRunning}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div className="results">
        <h2>Results</h2>
        
        <ul>
          {results.map((result, index) => (
            <li key={index}>{formatTime(result)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StopwatchApp;
