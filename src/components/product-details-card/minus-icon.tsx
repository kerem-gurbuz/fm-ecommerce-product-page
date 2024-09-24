'use client';

import { useState } from 'react';

type MinusIconProps = {
  width: number;
  height: number;
  color?: string;
  hoverColor?: string;
};

export function MinusIcon({
  width,
  height,
  color = '#FF7E1B',
  hoverColor = '#FFAB6A',
}: MinusIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <defs>
        <path
          id="minus-icon-path"
          d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z"
        />
      </defs>
      <use
        fill={isHovered ? hoverColor : color}
        fillRule="nonzero"
        xlinkHref="#minus-icon-path"
      />
    </svg>
  );
}
