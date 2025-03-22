"use client";
import { ReactNode, CSSProperties } from "react";

interface BlinkingAnimationProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  infinite?: boolean;
  opacitySteps?: number[];
  easing?:
    | "linear"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"
    | "cubic-bezier"
    | "steps";
}

export const BlinkingAnimation: React.FC<BlinkingAnimationProps> = ({
  children,
  duration = 1,
  delay = 0,
  infinite = true,
  opacitySteps = [1, 0.5],
  easing = "ease-in-out",
}) => {
  const keyframes = opacitySteps
    .map(
      (opacity, index) =>
        `${(index / (opacitySteps.length - 1)) * 100}% { opacity: ${opacity}; }`
    )
    .join(" ");

  const styles: CSSProperties = {
    animation: `blink ${duration}s ${infinite ? "infinite" : ""} ${easing}`,
    animationDelay: `${delay}s`,
  };

  return (
    <div style={styles}>
      <style>
        {`
          @keyframes blink { ${keyframes} }
        `}
      </style>
      {children}
    </div>
  );
};
