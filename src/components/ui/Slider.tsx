import React from 'react';

export interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (val: number) => void;
  label?: string;
  onInfoClick?: () => void;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  min = 50,
  max = 95,
  step = 1,
  onChange,
  label,
  onInfoClick,
  className = '',
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`w-full flex flex-col gap-3 ${className}`}>
      <div className="flex items-center justify-between">
        {label && (
          <span className="text-[13px] font-medium text-[#1c1d1f]">
            {label}
          </span>
        )}
        <div className="flex items-center gap-1.5">
          <span className="text-[18px] font-semibold text-[#1c1d1f]">
            {value}%
          </span>
          {onInfoClick && (
            <button
              type="button"
              onClick={onInfoClick}
              aria-label="How percentage fit is calculated"
              className="text-[#6f7988] hover:text-[#1c1d1f] p-1 rounded-full hover:bg-[#f3f4f6] transition-colors cursor-pointer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="relative flex items-center w-full py-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label || 'Fit percentage'}
          className="w-full h-2 bg-[#e4e7ec] rounded-full appearance-none cursor-pointer accent-[#1c1d1f] focus-visible:outline-2 focus-visible:outline-[#407ff2] focus-visible:outline-offset-2"
          style={{
            background: `linear-gradient(to right, #1c1d1f 0%, #1c1d1f ${percentage}%, #e4e7ec ${percentage}%, #e4e7ec 100%)`,
          }}
        />
      </div>
      <div className="flex justify-between text-[11px] text-[#6f7988]">
        <span>{min}% (Broader match)</span>
        <span>{max}% (Strict match)</span>
      </div>
    </div>
  );
};
