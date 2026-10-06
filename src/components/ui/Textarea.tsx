import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  helperText,
  error,
  className = '',
  disabled,
  id,
  rows = 4,
  ...props
}, ref) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={textareaId} className="text-[12px] font-medium tracking-normal text-[#505967]">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        disabled={disabled}
        className={`w-full bg-[#ffffff] border border-[#d3d8df] hover:border-[#8f99a8] focus:border-[#407ff2] focus:ring-2 focus:ring-[#94b9ff]/40 text-[#1c1d1f] placeholder-[#b5bdc9] rounded-[8px] p-3.5 text-[14px] leading-relaxed transition-all duration-150 disabled:bg-[#f3f4f6] disabled:text-[#b5bdc9] disabled:cursor-not-allowed outline-none ${
          error ? 'border-[#b91c1c] focus:border-[#b91c1c]' : ''
        } ${className}`}
        {...props}
      />
      {error ? (
        <span className="text-[12px] text-[#b91c1c]">{error}</span>
      ) : helperText ? (
        <span className="text-[12px] text-[#6f7988]">{helperText}</span>
      ) : null}
    </div>
  );
});

Textarea.displayName = 'Textarea';
