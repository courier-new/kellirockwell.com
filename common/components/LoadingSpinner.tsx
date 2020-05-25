import React, { FC } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type LoadingSpinnerProps = {
  /** The main color for the spinner icon */
  primaryColor: string;
  /** The size of the spinner icon to show */
  size: 'small' | 'medium' | 'large';
};

/**
 * Returns an integer size for the icon given a size descriptor
 *
 * @param size a string descriptor of the desired size
 */
const getIconSize = (size: 'small' | 'medium' | 'large'): number => {
  switch (size) {
    case 'small':
      return 14;
    case 'medium':
      return 24;
    default:
      return 50;
  }
};

/** A simple loading spinner component */
const LoadingSpinner: FC<LoadingSpinnerProps> = ({ primaryColor, size }) => {
  const iconSize = getIconSize(size);
  const offsetSize = 0.7 * iconSize;
  const maskSize = iconSize / 2 + offsetSize;
  return (
    <>
      <style jsx>
        {`
          .sized {
            border-radius: 50%;
            height: ${iconSize}px;
            width: ${iconSize}px;
          }

          .spinner {
            animation: spin 0.6s linear infinite;
            transform-origin: center center;
          }

          .mask {
            animation: spin-mask 1.5s linear infinite;
            height: ${maskSize}px;
            width: 0;
            left: -${offsetSize}px;
            top: -${offsetSize}px;
            border-style: solid;
            border-left-color: transparent;
            border-left-width: 60px;
            border-right-color: transparent;
            border-right-width: 60px;
            border-bottom-width: 60px;
            transform-origin: center center;
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes spin-mask {
            0% {
              transform: rotate(200deg) scaleY(0.45) scaleX(2);
            }
            40% {
              transform: rotate(400deg) scaleY(2);
            }
            60% {
              transform: rotate(500deg) scaleY(1);
            }
            100% {
              transform: rotate(560deg) scaleY(0.45) scaleX(2);
            }
          }
        `}
      </style>
      <div className="relative non-scrollable sized background-white">
        <div className="absolute spinner sized">
          <AiOutlineLoading3Quarters color={primaryColor} size={iconSize} />
        </div>
        <div className="absolute mask border-color-white" />
      </div>
    </>
  );
};

export default LoadingSpinner;
