import React, { useEffect, useRef } from 'react';
import { IconX } from './Icons';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  position?: 'right' | 'left';
  width?: 'md' | 'lg' | 'xl';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  position = 'right',
  width = 'lg',
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        drawerRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };

      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  let widthClass = '';
  switch (width) {
    case 'md': widthClass = 'max-w-md'; break;
    case 'lg': widthClass = 'max-w-xl'; break;
    case 'xl': widthClass = 'max-w-2xl'; break;
  }

  const positionClass = position === 'right' ? 'right-0 border-l' : 'left-0 border-r';

  return (
    <div
      className="fixed inset-0 z-50 flex bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={drawerRef}
        tabIndex={-1}
        className={`fixed top-0 bottom-0 ${positionClass} ${widthClass} w-full bg-[#ffffff] border-[#e4e7ec] shadow-[0_12px_32px_-4px_rgba(28,40,64,0.18)] flex flex-col text-[#1c1d1f] focus:outline-none z-50`}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#e4e7ec]">
          <div>
            {title && (
              <h2 className="text-[20px] font-medium text-[#1c1d1f] font-serif">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-[13px] text-[#6f7988] mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close panel"
            className="text-[#6f7988] hover:text-[#1c1d1f] p-1.5 rounded-[8px] hover:bg-[#f3f4f6] transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};
