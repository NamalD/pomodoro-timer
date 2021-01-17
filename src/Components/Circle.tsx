import React, {SVGAttributes} from "react";

interface CircleProps {
  radius: number;
  width: number;
  color: string;
  offsetPercentage?: number;
}

export const Circle = (props: CircleProps) => {
  const calculateOffsetProps = (offsetPercentage: number) => {
    const circumference = props.radius * Math.PI * 2;
    const offset = offsetPercentage * circumference;
    const offsetProps: SVGAttributes<SVGCircleElement> = {
      strokeDasharray: circumference,
      strokeDashoffset: offset,
      style: {
        transform: 'rotate(-90deg)',
        transition: 'stroke-dashoffset 200ms ease-in-out'
      }
    };

    return offsetProps;
  };

  const offsetProps = props.offsetPercentage === undefined
    ? {}
    : calculateOffsetProps(props.offsetPercentage);

  return <circle {...offsetProps}
                 r={props.radius}
                 cy={0} cx={0}
                 stroke={props.color}
                 strokeWidth={props.width}
                 fillOpacity={0}
                 shapeRendering="geometricPrecision"
  />;
}