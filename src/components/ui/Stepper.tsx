import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface StepItem {
  number: number;
  label: string;
  route: string;
}

export const WIZARD_STEPS: StepItem[] = [
  { number: 1, label: 'Requirement', route: '/search/new/requirement' },
  { number: 2, label: 'Job description', route: '/search/new/job-description' },
  { number: 3, label: 'Ideal profile', route: '/search/new/ideal-profile' },
  { number: 4, label: 'Skill ranking', route: '/search/new/skill-ranking' },
  { number: 5, label: 'Search', route: '/search/new/search-setup' },
  { number: 6, label: 'Candidates', route: '/search/statistical-economist-weather/candidates' },
];

export interface StepperProps {
  currentStep: number;
  roleId?: string;
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, roleId = 'statistical-economist-weather' }) => {
  const navigate = useNavigate();

  const handleStepClick = (step: StepItem) => {
    // If navigating to candidates, use current roleId
    if (step.number === 6) {
      navigate(`/search/${roleId}/candidates`);
    } else {
      navigate(step.route);
    }
  };

  return (
    <nav aria-label="Creation progress" className="w-full flex items-center justify-center py-2 overflow-x-auto">
      <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-[#f3f4f6] border border-[#e4e7ec]">
        {WIZARD_STEPS.map((step) => {
          const isActive = currentStep === step.number;
          const isPast = currentStep > step.number;

          return (
            <button
              key={step.number}
              type="button"
              onClick={() => handleStepClick(step)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] transition-all duration-150 cursor-pointer select-none ${
                isActive
                  ? 'bg-[#1c1d1f] text-[#ffffff] font-medium shadow-xs'
                  : isPast
                  ? 'text-[#1c1d1f] hover:bg-white border border-transparent hover:border-[#e4e7ec]'
                  : 'text-[#6f7988] hover:text-[#1c1d1f] hover:bg-white/60 border border-transparent'
              }`}
            >
              <span className={`text-[12px] ${isActive ? 'font-semibold text-white' : 'text-[#8f99a8]'}`}>
                {step.number}
              </span>
              <span>{step.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
