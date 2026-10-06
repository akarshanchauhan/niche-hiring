import React, { useEffect, useRef } from 'react';
import { IconX } from './Icons';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'md',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus modal container
      setTimeout(() => {
        modalRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
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
  switch (maxWidth) {
    case 'sm': widthClass = 'max-w-md'; break;
    case 'md': widthClass = 'max-w-lg'; break;
    case 'lg': widthClass = 'max-w-2xl'; break;
    case 'xl': widthClass = 'max-w-3xl'; break;
    case '2xl': widthClass = 'max-w-4xl'; break;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`w-full ${widthClass} bg-[#ffffff] border border-[#e4e7ec] rounded-[12px] shadow-[0_12px_32px_-4px_rgba(28,40,64,0.15)] p-6 sm:p-7 relative text-[#1c1d1f] focus:outline-none`}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#e4e7ec]">
          <div>
            {title && (
              <h2 id="modal-title" className="text-[19px] sm:text-[21px] font-medium text-[#1c1d1f] font-serif">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-[13px] text-[#6f7988] mt-1">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-[#6f7988] hover:text-[#1c1d1f] p-1.5 rounded-[8px] hover:bg-[#f3f4f6] transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="pt-4 max-h-[75vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
