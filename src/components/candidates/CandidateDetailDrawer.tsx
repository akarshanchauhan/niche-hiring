import React from 'react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Candidate } from '../../data/candidates';
import { IconExternalLink, IconFileText, IconSparkles, IconPlus, IconX } from '../ui/Icons';

export interface CandidateDetailDrawerProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleShortlist: (id: string) => void;
  isShortlisted: boolean;
  onOpenSourcePreview: (platformId: string) => void;
}

export const CandidateDetailDrawer: React.FC<CandidateDetailDrawerProps> = ({
  candidate,
  isOpen,
  onClose,
  onToggleShortlist,
  isShortlisted,
  onOpenSourcePreview,
}) => {
  if (!candidate) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={candidate.name}
      subtitle={candidate.alias}
      width="lg"
    >
      <div className="space-y-6 text-[13px] text-[#1c1d1f]">
        {/* Top Profile Summary */}
        <div className="p-4 rounded-[8px] bg-[#f3f4f6] border border-[#e4e7ec] space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-[17px] font-medium text-[#1c1d1f] font-serif">{candidate.title}</h3>
              <p className="text-[12px] text-[#6f7988] mt-0.5">{candidate.education} · {candidate.location}</p>
            </div>
            <div className="text-right">
              <span className="text-[22px] font-bold text-[#1c1d1f]">{candidate.fitScore}%</span>
              <span className="block text-[11px] text-[#6f7988]">Match Fit</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-[#e4e7ec]">
            <Button
              variant={isShortlisted ? 'danger' : 'primary'}
              size="sm"
              icon={isShortlisted ? <IconX size={13} /> : <IconPlus size={13} />}
              onClick={() => onToggleShortlist(candidate.id)}
            >
              {isShortlisted ? 'Remove from Shortlist' : 'Add to Shortlist'}
            </Button>
            {candidate.isNew && <Badge variant="new">New match</Badge>}
          </div>
        </div>

        {/* Why it Matched (AI Explanation) */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#505967] uppercase tracking-wider">
            <IconSparkles size={13} className="text-[#407ff2]" />
            <span>Why it matched</span>
          </div>
          <p className="p-3.5 rounded-[8px] bg-[#fafbfc] border border-[#e4e7ec] leading-relaxed text-[#505967]">
            {candidate.whyMatched}
          </p>
        </div>

        {/* Core Competencies */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-[#505967] uppercase tracking-wider block">
            Verified Skills & Methods
          </span>
          <div className="flex flex-wrap gap-1.5">
            {candidate.skills.map((skill) => (
              <Badge key={skill} variant="default" size="md">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Academic Publications */}
        {candidate.papers.length > 0 && (
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-[#505967] uppercase tracking-wider block">
              Academic Publications & Citations
            </span>
            <div className="space-y-2">
              {candidate.papers.map((paper, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-[8px] bg-white border border-[#e4e7ec] shadow-xs flex items-start gap-2.5"
                >
                  <IconFileText size={15} className="text-[#6f7988] shrink-0 mt-0.5" />
                  <span className="text-[13px] text-[#1c1d1f] leading-relaxed">{paper}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Code Repositories */}
        {candidate.repositories.length > 0 && (
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-[#505967] uppercase tracking-wider block">
              Verified Code Repositories
            </span>
            <div className="space-y-1.5">
              {candidate.repositories.map((repo, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-[8px] bg-white border border-[#e4e7ec] shadow-xs flex items-center justify-between text-[12px] font-mono text-[#505967]"
                >
                  <span className="truncate">{repo}</span>
                  <span className="text-[#1c1d1f] font-semibold shrink-0 ml-2">Public code</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Source Platforms */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-[#505967] uppercase tracking-wider block">
            Found on platforms
          </span>
          <div className="flex flex-wrap gap-2">
            {candidate.foundOn.map((platId) => (
              <button
                key={platId}
                type="button"
                onClick={() => onOpenSourcePreview(platId)}
                className="px-3 py-1.5 rounded-[6px] bg-[#f3f4f6] hover:bg-[#e4e7ec] border border-[#e4e7ec] text-[12px] text-[#1c1d1f] transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <span>{platId.replace('platform-', 'Platform ').toUpperCase()}</span>
                <IconExternalLink size={12} className="text-[#6f7988]" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
