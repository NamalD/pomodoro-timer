import React, {CSSProperties, useEffect, useRef, useState} from 'react';
import './App.css';
import {ProgressCircle} from "./Components/ProgressCircle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {setInterval} from "timers";

function App() {
  const DEFAULT_POMODORO_SECONDS = 25 * 60; // 25 minutes
  const DEFAULT_BREAK_SECONDS = 5 * 60; // 5 minutes

  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_POMODORO_SECONDS);
  const secondsLeftRef = useRef(secondsLeft);
  secondsLeftRef.current = secondsLeft;

  const [percentage, setPercentage] = useState(1);

  useEffect(() => {
    const newPercent = secondsLeft / DEFAULT_POMODORO_SECONDS;
    setPercentage(newPercent)
  }, [secondsLeft]);

  // TODO: Move to mode button component
  const buttonStyle : CSSProperties = {
    position: "absolute",
    top: '50%',
    transform: "translateY(-50%) translateX(-30%)"
  }

  const startTimer = () => {
    const subtractSecond = () => {
      setSecondsLeft(secondsLeftRef.current - 1);
    }

    const timeout = setInterval(subtractSecond, 1000);
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
      <FontAwesomeIcon icon={faPlay} size={"10x"} style={buttonStyle} onClick={startTimer} />
    </div>
  );
}

export default App;
