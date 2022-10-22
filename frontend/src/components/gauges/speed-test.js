import React, { useState } from "react";
import cc from "classcat";
import { useGauge } from "use-gauge";
import { motion, MotionConfig, useAnimationFrame } from "framer-motion";

const useSpeedTest = () => {
  const [value, setValue] = useState(0);

  useAnimationFrame((t) => {
    if (value >= 100) return;
    setValue((t / 5500) * 100);
  });

  return {
    value: 0
  };
};

function Speed(props) {
  const { value } = props;
  const gauge = useGauge({
    domain: [0, 100],
    startAngle: 90,
    endAngle: 270,
    numTicks: 21,
    diameter: 400
  });

  const needle = gauge.getNeedleProps({
    value,
    baseRadius: 8,
    tipRadius: 2
  });

  return (
    <div>
      <svg className="w-full overflow-visible p-4" {...gauge.getSVGProps()}>
        <g id="ticks">
          {gauge.ticks.map((angle) => {
            const asValue = gauge.angleToValue(angle);
            const showText = asValue % 20 === 0;

            return (
              <React.Fragment key={`tick-group-${angle}`}>
                <line
                  className={cc([
                    "stroke-gray-300",
                    {
                      "stroke-green-300": asValue <= 20,
                      "stroke-yellow-300": asValue >= 60 && asValue <= 80,
                      "stroke-red-400": asValue >= 80
                    }
                  ])}
                  strokeWidth={2}
                  {...gauge.getTickProps({
                    angle,
                    length: 8
                  })}
                />
                {showText && (
                  <text
                    className="fill-gray-400 font-medium"
                    {...gauge.getLabelProps({ angle, offset: 20 })}
                  >
                    {asValue}
                  </text>
                )}
              </React.Fragment>
            );
          })}
        </g>
        <g id="needle">
          <motion.circle
            className="fill-gray-200"
            animate={{
              cx: needle.base.cx,
              cy: needle.base.cy
            }}
            r={12}
          />
          <motion.circle
            className="fill-orange-400"
            animate={{
              cx: needle.base.cx,
              cy: needle.base.cy
            }}
            r={12}
          />
          <motion.line
            className="stroke-orange-400"
            strokeLinecap="round"
            strokeWidth={8}
            animate={{
              x1: needle.base.cx,
              x2: needle.tip.cx,
              y1: needle.base.cy,
              y2: needle.tip.cy
            }}
          />
          <circle className="fill-white" {...needle.base} r={4} />
        </g>
      </svg>
    </div>
  );
}

export function SpeedTest() {
  const { value } = useSpeedTest();
  return (
    <MotionConfig transition={{ type: "tween", ease: "linear" }}>
      <Speed value={value} />
    </MotionConfig>
  );
}
