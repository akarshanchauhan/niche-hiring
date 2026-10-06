import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'ai' | 'success' | 'warning' | 'info' | 'new' | 'shortlist';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'sm',
  className = '',
  children,
  ...props
}) => {
  let variantStyles = '';
  switch (variant) {
    case 'default':
      variantStyles = 'bg-[#f3f4f6] text-[#505967] border border-[#e4e7ec]';
      break;
    case 'ai':
      variantStyles = 'bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe] font-medium';
      break;
    case 'success':
      variantStyles = 'bg-[#ecfdf5] text-[#075a39] border border-[#a7f3d0] font-medium';
      break;
    case 'warning':
      variantStyles = 'bg-[#fffbeb] text-[#b45309] border border-[#fde68a] font-medium';
      break;
    case 'info':
      variantStyles = 'bg-[#f0f9ff] text-[#0369a1] border border-[#bae6fd] font-medium';
      break;
    case 'new':
      variantStyles = 'bg-[#1c1d1f] text-[#ffffff] font-medium tracking-wide';
      break;
    case 'shortlist':
      variantStyles = 'bg-[#fef3c7] text-[#b45309] border border-[#fde68a] font-medium';
      break;
  }

  const sizeStyles = size === 'sm' ? 'text-[11px] px-2 py-0.5 leading-tight' : 'text-[12px] px-2.5 py-1 leading-normal';

  return (
    <span
      className={`inline-flex items-center justify-center rounded-[6px] select-none ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
