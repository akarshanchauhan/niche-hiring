import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'hairline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  icon,
  iconPosition = 'left',
  children,
  className = '',
  disabled,
  ...props
}) => {
  // Base styling: Inter font, 10px radius per Attio spec, transitions, strictly horizontal and nowrap
  const baseStyles = 'inline-flex flex-row flex-nowrap items-center justify-center font-medium rounded-[10px] transition-all duration-150 cursor-pointer disabled:cursor-not-allowed select-none whitespace-nowrap shrink-0';

  // Variant mappings strictly from Attio DESIGN.md
  let variantStyles = '';
  switch (variant) {
    case 'primary':
      // Ink background, white text, 10px radius
      variantStyles = 'bg-[#1c1d1f] text-[#ffffff] hover:bg-[#2b2d31] active:bg-[#000000] border border-[#1c1d1f] shadow-xs disabled:bg-[#e4e7ec] disabled:text-[#8f99a8] disabled:border-[#e4e7ec]';
      break;
    case 'secondary':
      // Pure white, ink text, slate border
      variantStyles = 'bg-[#ffffff] text-[#1c1d1f] hover:bg-[#f3f4f6] active:bg-[#e4e7ec] border border-[#d3d8df] shadow-xs disabled:bg-[#f3f4f6] disabled:text-[#b5bdc9] disabled:border-[#e4e7ec]';
      break;
    case 'ghost':
      // Ghost: transparent background, metal text, subtle hover
      variantStyles = 'bg-transparent text-[#6f7988] hover:text-[#1c1d1f] hover:bg-[#f3f4f6] border border-transparent disabled:text-[#b5bdc9]';
      break;
    case 'hairline':
      // Hairline: subtle border, neutral styling
      variantStyles = 'bg-[#ffffff] text-[#505967] hover:text-[#1c1d1f] hover:bg-[#f3f4f6] border border-[#e4e7ec] hover:border-[#d3d8df] disabled:text-[#b5bdc9]';
      break;
    case 'danger':
      variantStyles = 'bg-[#fef2f2] text-[#b91c1c] hover:bg-[#fee2e2] border border-[#fecaca] disabled:opacity-50';
      break;
  }

  // Size padding specifications
  let sizeStyles = '';
  switch (size) {
    case 'sm':
      sizeStyles = 'text-[13px] px-3 py-1.5 gap-1.5 leading-none';
      break;
    case 'md':
      sizeStyles = 'text-[14px] px-4 py-2 gap-2 leading-none';
      break;
    case 'lg':
      sizeStyles = 'text-[15px] px-5 py-2.5 gap-2.5 leading-none';
      break;
  }

  return (
    <button
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="inline-flex items-center justify-center shrink-0">{icon}</span>}
      {children && <span className="inline-flex items-center whitespace-nowrap">{children}</span>}
      {icon && iconPosition === 'right' && <span className="inline-flex items-center justify-center shrink-0">{icon}</span>}
    </button>
  );
};
