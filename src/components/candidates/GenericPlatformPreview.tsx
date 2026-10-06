import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Candidate } from '../../data/candidates';

export interface GenericPlatformPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  platformId: string | null;
  candidate: Candidate | null;
}

export const GenericPlatformPreview: React.FC<GenericPlatformPreviewProps> = ({
  isOpen,
  onClose,
  platformId,
  candidate,
}) => {
  if (!platformId || !candidate) return null;

  const platformName = platformId.replace('platform-', 'Platform ').toUpperCase();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${candidate.name} on ${platformName}`}
      description="Verified source profile extract from connected platform"
      maxWidth="lg"
    >
      <div className="space-y-5 text-[13px] text-[#1c1d1f]">
        {/* Platform Verification Banner */}
        <div className="p-3.5 rounded-[8px] bg-[#ecfdf5] border border-[#a7f3d0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#075a39]" />
            <span className="text-[14px] font-semibold text-[#075a39]">{platformName} Source Record</span>
          </div>
          <Badge variant="success">API Verified · Real-time Sync</Badge>
        </div>

        {/* Source Profile Content */}
        <div className="space-y-4 p-4 rounded-[8px] bg-[#f9fafb] border border-[#e4e7ec]">
          <div>
            <h4 className="text-[17px] font-medium text-[#1c1d1f] font-serif">{candidate.alias}</h4>
            <p className="text-[13px] text-[#6f7988]">{candidate.title}</p>
            <span className="text-[12px] text-[#8f99a8]">{candidate.location}</span>
          </div>

          <div className="pt-2 border-t border-[#e4e7ec] space-y-2">
            <span className="text-[11px] font-semibold text-[#6f7988] uppercase tracking-wider block">
              Extracted Raw Profile Highlights
            </span>
            <p className="text-[#505967] leading-relaxed">
              {candidate.whyMatched}
            </p>
          </div>

          {candidate.papers.length > 0 && (
            <div className="pt-2 border-t border-[#e4e7ec] space-y-2">
              <span className="text-[11px] font-semibold text-[#6f7988] uppercase tracking-wider block">
                Source Document Citations
              </span>
              <ul className="space-y-1 text-[12px] text-[#6f7988]">
                {candidate.papers.map((p, i) => (
                  <li key={i}>• {p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            Close Preview
          </Button>
        </div>
      </div>
    </Modal>
  );
};
