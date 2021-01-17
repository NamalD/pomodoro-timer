import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {ProgressCircle} from "./Components/ProgressCircle";
import {setInterval} from "timers";
import {PomodoroStatus} from "./PomodoroStatus";
import {Mode, Status} from "./Components/Types";
import {FormatSeconds} from "./Helpers/Time";
import {COLOURS} from "./Constants/Style";

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
    const percentDivisor = mode === "Pomodoro" ? DEFAULT_POMODORO_SECONDS : DEFAULT_BREAK_SECONDS;
    const newPercent = secondsLeft / percentDivisor;
    setPercentage(newPercent)

    const newTimeLeft = FormatSeconds(secondsLeft);
    setTimeLeft(newTimeLeft);
  }, [secondsLeft]);

  // Track mode and running status
  const [timeout, setTimeout] = useState<NodeJS.Timeout | undefined>(undefined);
  const [mode, setMode] = useState<Mode>("Pomodoro");
  const [status, setStatus] = useState<Status>("New");
  const statusRef = useRef(status);
  statusRef.current = status;

  const changeMode = () => {
    if (mode === "Pomodoro") {
      setMode("Break");
      setSecondsLeft(DEFAULT_BREAK_SECONDS);
    } else {
      setMode("Pomodoro");
      setSecondsLeft(DEFAULT_POMODORO_SECONDS);
    }

    setStatus("New");
    if (timeout !== undefined) {
      clearInterval(timeout);
    }
  }

  // TODO: Change to use target time instead of relying on event to subtract time
  const subtractSecond = () => {
    if (statusRef.current === "Running") {
      const newSecondsLeft = secondsLeftRef.current - 1;
      setSecondsLeft(newSecondsLeft);

      console.log("Mode:", mode, "Seconds left:", newSecondsLeft);

      if (newSecondsLeft <= 0) {
        changeMode();
      }
    }
  }

  const handleStatusChange = (newStatus: Status) => {
    // Start the timer when starting a new session
    if (status === "New" && newStatus === "Running") {
      setTimeout(setInterval(subtractSecond, 1000));
    }

    setStatus(newStatus);
  }

  return (
    <div className="App">
      <ProgressCircle radius={100}
                      percentage={percentage}
                      width={8}
                      colors={{
                        completed: COLOURS.gray,
                        remainder: status === "Paused"
                          ? COLOURS.red
                          : mode === "Pomodoro"
                            ? COLOURS.green
                            : COLOURS.yellow
                      }}/>

      <PomodoroStatus onStatusChanged={handleStatusChange}
                      runningText={timeLeft}
                      status={status}/>
    </div>
  );
}

export default App;
