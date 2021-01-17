import React, {CSSProperties, useEffect, useRef, useState} from 'react';
import './App.css';
import {ProgressCircle} from "./Components/ProgressCircle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import {setInterval} from "timers";

type Mode = "Pomodoro" | "Break";
type Status = "New" | "Running" | "Paused";

function App() {
  const DEFAULT_POMODORO_SECONDS = 25 * 60; // 25 minutes
  const DEFAULT_BREAK_SECONDS = 5 * 60; // 5 minutes

  // Track seconds left in pomodoro/break
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_POMODORO_SECONDS);
  const secondsLeftRef = useRef(secondsLeft);
  secondsLeftRef.current = secondsLeft;

  // Calculate percent when seconds change
  const [percentage, setPercentage] = useState(1);
  useEffect(() => {
    const newPercent = secondsLeft / DEFAULT_POMODORO_SECONDS;
    setPercentage(newPercent)
  }, [secondsLeft]);

  // Calculate time string when seconds change
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs}`;
  }

  const [timeLeft, setTimeLeft] = useState(formatTime(secondsLeft));
  useEffect(() => {
    setTimeLeft(formatTime(secondsLeft))
  }, [secondsLeft]);

  // TODO: Move to mode button component
  const playStyle: CSSProperties = {
    position: "absolute",
    top: '50%',
    transform: "translateY(-50%) translateX(-50%)"
  }

  const pauseStyle: CSSProperties = {
    position: "absolute",
    top: '50%',
    transform: "translateY(-50%) translateX(-50%)"
  }

  const countdownStyle: CSSProperties = {
    position: "absolute",
    top: '50%',
    fontSize: "xxx-large",
    transform: "translateY(-50%) translateX(-50%)"
  }

  // Track mode and running status
  const [mode, setMode] = useState<Mode>("Pomodoro");
  const [status, setStatus] = useState<Status>("New");
  const statusRef = useRef(status);
  statusRef.current = status;

  const startTimer = () => {
    const subtractSecond = () => {
      if (statusRef.current === "Running") {
        setSecondsLeft(secondsLeftRef.current - 1);
      }
    }

    setStatus("Running");
    setInterval(subtractSecond, 1000);
  }

  const pauseTimer = () => {
    setStatus("Paused");
  }

  const resumeTimer = () => {
    setStatus("Running");
  }

  return (
    <div className="App">
      <ProgressCircle radius={100}
                      percentage={percentage}
                      width={10}
                      colors={{
                        completed: 'darkgray',
                        remainder: 'green'
                      }}
      />
      {status === "New"
        ? <FontAwesomeIcon icon={faPlay} size={"10x"} style={playStyle} onClick={startTimer}/>
        : null
      }

      {status === "Running"
        ? <label style={countdownStyle} onClick={pauseTimer}>{timeLeft}</label>
        : null
      }

      {status === "Paused"
        ? <FontAwesomeIcon icon={faPause} size={"10x"} style={pauseStyle} onClick={resumeTimer}/>
        : null
      }
    </div>
  );
}

export default App;
