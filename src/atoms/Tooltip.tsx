import React from 'react';
import type { TooltipProps } from '../types';

export default function Tooltip({ content, children, position = 'bottom' }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  const positionClasses = {
    top: '-top-10 left-1/2 transform -translate-x-1/2',
    bottom: '-bottom-10 left-1/2 transform -translate-x-1/2', 
    left: '-left-2 top-1/2 transform -translate-y-1/2 -translate-x-full',
    right: '-right-2 top-1/2 transform -translate-y-1/2 translate-x-full'
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`absolute z-50 ${positionClasses[position]}`}>
          <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg">
            {content}
          </div>
          <div 
            className={`absolute w-0 h-0 ${
              position === 'top' ? 'top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800' :
              position === 'bottom' ? 'bottom-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800' :
              position === 'left' ? 'left-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-800' :
              'right-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-800'
            }`}
          />
        </div>
      )}
    </div>
  );
}
