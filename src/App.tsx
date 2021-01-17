import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {ProgressCircle} from "./Components/ProgressCircle";
import {setInterval} from "timers";
import {PomodoroStatus} from "./PomodoroStatus";
import {Mode, Status} from "./Components/Types";
import {FormatSeconds} from "./Helpers/Time";

function App() {
  const DEFAULT_POMODORO_SECONDS = 25 * 60; // 25 minutes
  const DEFAULT_BREAK_SECONDS = 5 * 60; // 5 minutes

  // Track seconds left in pomodoro/break
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_POMODORO_SECONDS);
  const secondsLeftRef = useRef(secondsLeft);
  secondsLeftRef.current = secondsLeft;

  // Calculate percent and time string when seconds change
  const [percentage, setPercentage] = useState(1);
  const [timeLeft, setTimeLeft] = useState(FormatSeconds(secondsLeft));

  useEffect(() => {
    const newPercent = secondsLeft / DEFAULT_POMODORO_SECONDS;
    setPercentage(newPercent)

    const newTimeLeft = FormatSeconds(secondsLeft);
    setTimeLeft(newTimeLeft);
  }, [secondsLeft]);

  // Track mode and running status
  const [mode, setMode] = useState<Mode>("Pomodoro");
  const [status, setStatus] = useState<Status>("New");
  const statusRef = useRef(status);
  statusRef.current = status;

  const subtractSecond = () => {
    if (statusRef.current === "Running") {
      setSecondsLeft(secondsLeftRef.current - 1);
    }
  }

  const handleStatusChange = (newStatus: Status) => {
    // Start the timer when starting a new session
    if (status === "New" && newStatus === "Running") {
      setInterval(subtractSecond, 1000);
    }

    setStatus(newStatus);
  }

  return (
    <div className="App">
      <ProgressCircle radius={100}
                      percentage={percentage}
                      width={10}
                      colors={{
                        completed: 'darkgray',
                        remainder: 'green'
                      }}/>

      <PomodoroStatus onStatusChanged={handleStatusChange}
                      runningText={timeLeft}
                      status={status}/>
    </div>
  );
}

export default App;
