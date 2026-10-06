import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-[12px] font-medium tracking-normal text-[#505967]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-[#8f99a8] pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={`w-full bg-[#ffffff] border border-[#d3d8df] hover:border-[#8f99a8] focus:border-[#407ff2] focus:ring-2 focus:ring-[#94b9ff]/40 text-[#1c1d1f] placeholder-[#b5bdc9] rounded-[8px] px-3.5 py-2 text-[14px] transition-all duration-150 disabled:bg-[#f3f4f6] disabled:text-[#b5bdc9] disabled:cursor-not-allowed outline-none ${
            leftIcon ? 'pl-9' : ''
          } ${rightIcon ? 'pr-9' : ''} ${error ? 'border-[#b91c1c] focus:border-[#b91c1c]' : ''} ${className}`}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 text-[#8f99a8] pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>
      {error ? (
        <span className="text-[12px] text-[#b91c1c]">{error}</span>
      ) : helperText ? (
        <span className="text-[12px] text-[#6f7988]">{helperText}</span>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
