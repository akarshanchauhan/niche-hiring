import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export interface FitExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FitExplainerModal: React.FC<FitExplainerModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="How Fit Percentage is Calculated"
      description="Transparent explainable AI scoring math combining user-weighted skills and candidate evidence."
      maxWidth="lg"
    >
      <div className="space-y-5 text-[14px] text-[#505967] leading-relaxed">
        <p>
          Candidate fit scores are calculated using a strict, multi-component weighted objective function that directly reflects your ranking order from Step 4.
        </p>

        <div className="space-y-3">
          <div className="p-3.5 rounded-[8px] bg-[#f3f4f6] border border-[#e4e7ec] space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#1c1d1f]">1. Must-Have Factors (70% weight)</span>
              <span className="text-[12px] text-[#075a39] font-medium">Base Qualifier</span>
            </div>
            <p className="text-[13px] text-[#6f7988]">
              Skills ranked 1 through 4 (Econometrics, Time-series modelling, Climate data, Spatial statistics) are weighted inversely by rank. Rank 1 contributes the highest individual multiplier.
            </p>
          </div>

          <div className="p-3.5 rounded-[8px] bg-[#f3f4f6] border border-[#e4e7ec] space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#1c1d1f]">2. Nice-to-Have Tie Breakers (15% weight)</span>
              <span className="text-[12px] text-[#b45309] font-medium">Rank Booster</span>
            </div>
            <p className="text-[13px] text-[#6f7988]">
              Skills ranked in the Nice-to-have tier (Forecasting, Communicating uncertainty) resolve rank ties between candidates with identical core capabilities.
            </p>
          </div>

          <div className="p-3.5 rounded-[8px] bg-[#f3f4f6] border border-[#e4e7ec] space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#1c1d1f]">3. Empirically Verified Evidence (15% weight)</span>
              <span className="text-[12px] text-[#2563eb] font-medium">Evidence Bonus</span>
            </div>
            <p className="text-[13px] text-[#6f7988]">
              Public peer-reviewed citations, open-source repositories, and conference talks provide hard evidence bonuses, preventing keyword-stuffed profiles from ranking above verified practitioners.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-[8px] bg-white border border-[#e4e7ec] shadow-xs text-[12px] text-[#6f7988]">
          <strong className="text-[#1c1d1f]">Cutoff Behavior:</strong> Setting a 70% threshold filters out applicants who lack at least three of your primary Must-Have competencies.
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="primary" onClick={onClose}>
            Understood
          </Button>
        </div>
      </div>
    </Modal>
  );
};
