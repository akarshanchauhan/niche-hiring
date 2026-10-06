import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'frosted' | 'graphite' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  variant = 'graphite',
  padding = 'md',
  className = '',
  children,
  ...props
}) => {
  let surfaceStyles = '';
  switch (variant) {
    case 'frosted':
      // Subtle ash panel
      surfaceStyles = 'bg-[#f3f4f6] border border-[#e4e7ec] text-[#1c1d1f]';
      break;
    case 'graphite':
      // Standard UI Frame Card (White with stone border and soft shadow)
      surfaceStyles = 'bg-[#ffffff] border border-[#e4e7ec] shadow-[0_2px_4px_-2px_rgba(28,40,64,0.08),0_4px_6px_-2px_rgba(28,40,64,0.04)] text-[#1c1d1f]';
      break;
    case 'flat':
      surfaceStyles = 'bg-[#fafbfc] border border-[#e4e7ec] text-[#1c1d1f]';
      break;
  }

  let paddingStyles = '';
  switch (padding) {
    case 'none':
      paddingStyles = 'p-0';
      break;
    case 'sm':
      paddingStyles = 'p-4';
      break;
    case 'md':
      paddingStyles = 'p-5 sm:p-6';
      break;
    case 'lg':
      paddingStyles = 'p-6 sm:p-7';
      break;
  }

  return (
    <div
      className={`rounded-[8px] transition-colors ${surfaceStyles} ${paddingStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
