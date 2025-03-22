"use client";
import { ReactNode, CSSProperties, useState } from "react";

interface ButtonAnimationWrapperProps {
  children: ReactNode;
  additionalClassName?: string;
  bgColorCSS?: string;
  hoverBgColorCSS?: string;
  activeBgColorCSS?: string;
  hoverDuration?: number;
  activeDuration?: number;
  scale?: number;
  childrenColor?: string;
  hoverChildrenColor?: string;
  activeChildrenColor?: string;
  radius?: number;
}

export const ButtonAnimationWrapper: React.FC<ButtonAnimationWrapperProps> = ({
  children,
  bgColorCSS = "",
  hoverBgColorCSS = "",
  activeBgColorCSS = "",
  hoverDuration = 0.2,
  activeDuration = 0.1,
  scale = 1.05,
  childrenColor = "",
  hoverChildrenColor = "",
  activeChildrenColor = "",
  radius = 0,
  additionalClassName,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const backgroundColor = isActive
    ? activeBgColorCSS
    : isHovered
    ? hoverBgColorCSS
    : bgColorCSS;

  const color = isActive
    ? activeChildrenColor
    : isHovered
    ? hoverChildrenColor
    : childrenColor;

  const transform = `scale(${isActive ? scale - 0.05 : isHovered ? scale : 1})`;

  const transitionDuration = isActive ? activeDuration : hoverDuration;

  const styles: CSSProperties = {
    backgroundColor,
    color,
    transform,
    transition: `all ${transitionDuration}s ease-in-out`,
    borderRadius: `${radius}px`,
  };

  return (
    <div
      className={`${additionalClassName} button-animation-wrapper`}
      style={styles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      {children}
    </div>
  );
};
