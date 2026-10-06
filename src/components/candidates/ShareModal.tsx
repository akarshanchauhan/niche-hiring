import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { IconCheck, IconShare } from '../ui/Icons';

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  shareUrl?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  shareUrl = window.location.href,
}) => {
  const [copied, setCopied] = useState(false);
  const [role, setRole] = useState<'view' | 'comment' | 'edit'>('view');

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Share: ${title}`}
      description="Collaborate with hiring managers and interview panel members."
      maxWidth="md"
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-[12px] font-semibold text-[#505967] uppercase tracking-wider block">
            Shareable Reviewer Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-[#f3f4f6] border border-[#d3d8df] text-[#1c1d1f] text-[13px] rounded-[8px] px-3.5 py-2 select-all focus-visible:outline-2 focus-visible:outline-[#407ff2]"
            />
            <Button
              variant="primary"
              size="md"
              onClick={handleCopy}
              icon={copied ? <IconCheck size={15} /> : <IconShare size={15} />}
            >
              {copied ? 'Copied' : 'Copy link'}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[12px] font-semibold text-[#505967] uppercase tracking-wider block">
            Reviewer Permission
          </label>
          <div className="grid grid-cols-3 gap-2 text-[13px]">
            <button
              type="button"
              onClick={() => setRole('view')}
              className={`p-3 rounded-[8px] border text-left transition-colors cursor-pointer ${
                role === 'view'
                  ? 'bg-white border-[#1c1d1f] text-[#1c1d1f] shadow-xs ring-1 ring-[#1c1d1f]'
                  : 'bg-[#fafbfc] border-[#e4e7ec] text-[#6f7988] hover:text-[#1c1d1f] hover:border-[#d3d8df]'
              }`}
            >
              <span className="font-semibold block">Can view</span>
              <span className="text-[11px] opacity-75">Read-only link</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('comment')}
              className={`p-3 rounded-[8px] border text-left transition-colors cursor-pointer ${
                role === 'comment'
                  ? 'bg-white border-[#1c1d1f] text-[#1c1d1f] shadow-xs ring-1 ring-[#1c1d1f]'
                  : 'bg-[#fafbfc] border-[#e4e7ec] text-[#6f7988] hover:text-[#1c1d1f] hover:border-[#d3d8df]'
              }`}
            >
              <span className="font-semibold block">Can comment</span>
              <span className="text-[11px] opacity-75">Leave notes</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('edit')}
              className={`p-3 rounded-[8px] border text-left transition-colors cursor-pointer ${
                role === 'edit'
                  ? 'bg-white border-[#1c1d1f] text-[#1c1d1f] shadow-xs ring-1 ring-[#1c1d1f]'
                  : 'bg-[#fafbfc] border-[#e4e7ec] text-[#6f7988] hover:text-[#1c1d1f] hover:border-[#d3d8df]'
              }`}
            >
              <span className="font-semibold block">Can edit</span>
              <span className="text-[11px] opacity-75">Full access</span>
            </button>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
};
