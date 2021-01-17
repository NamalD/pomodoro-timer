import React, {CSSProperties} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import {Status} from "./Components/Types";
import {COLOURS} from "./Constants/Style";

interface PomodoroStatusProps {
  onStatusChanged: (status: Status) => void;
  status: Status;
  runningText: string;
}

export const PomodoroStatus = (props: PomodoroStatusProps) => {
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
    fontSize: "90px",
    transform: "translateY(-50%) translateX(-50%)",
    color: COLOURS.gray
  }

  return (
    <React.Fragment>
      {props.status === "New"
        ?
        <FontAwesomeIcon icon={faPlay}
                         size={"10x"}
                         style={playStyle}
                         color={COLOURS.gray}
                         onClick={() => props.onStatusChanged("Running")}/>
        : null
      }

      {props.status === "Running"
        ?
        <label style={countdownStyle}
               onClick={() => props.onStatusChanged("Paused")}>
          {props.runningText}
        </label>
        : null
      }

      {props.status === "Paused"
        ? <FontAwesomeIcon icon={faPause} size={"10x"} style={pauseStyle}
                           color={COLOURS.gray}
                           onClick={() => props.onStatusChanged("Running")}/>
        : null
      }
    </React.Fragment>
  );
}