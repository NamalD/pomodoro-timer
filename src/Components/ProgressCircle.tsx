import React from "react";
import {Circle} from "./Circle";

interface CircleProps {
  percentage: number;
  radius: number;
  width: number;
  colors: {
    completed: string,
    remainder: string
  }
}

export const ProgressCircle = (props: CircleProps) => {
  const size = props.radius * 2 + props.width + 1;

  const svgStyle: React.CSSProperties = {
    top: '5%',
    left: '5%',
    position: 'fixed',
    height: '90%',
    width: '90%',
  }

  return (
    <svg viewBox={`-${size / 2} -${size / 2} ${size} ${size}`} xmlns="http://www.w3.org/2000/svg" style={svgStyle}>
      <Circle radius={props.radius}
              width={props.width}
              color={props.colors.remainder}
      />
      <Circle radius={props.radius}
              width={props.width}
              color={props.colors.completed}
              offsetPercentage={props.percentage}
      />
    </svg>
  )
}