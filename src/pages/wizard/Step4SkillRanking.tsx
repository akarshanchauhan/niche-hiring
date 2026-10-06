import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSearchWorkflow } from '../../context/SearchWorkflowContext';
import { Stepper } from '../../components/ui/Stepper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { FactorType } from '../../data/skillRanking';
import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconArrowDown,
  IconGripVertical,
  IconRotateCcw,
  IconPlus,
  IconSave,
  IconCheck,
} from '../../components/ui/Icons';

export const Step4SkillRanking: React.FC = () => {
  const navigate = useNavigate();
  const { id: routeRoleId } = useParams();
  const isEditRoute = Boolean(routeRoleId);

  const {
    rankableFactors,
    moveFactorUpDown,
    addCustomFactor,
    resetSkillRanking,
    saveCurrentDraft,
    setStaleWarning,
  } = useSearchWorkflow();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newFactorName, setNewFactorName] = useState('');
  const [newFactorType, setNewFactorType] = useState<FactorType>('skill');
  const [newFactorGroup, setNewFactorGroup] = useState<'must-have' | 'nice-to-have'>('must-have');
  const [draftSavedToast, setDraftSavedToast] = useState(false);

  const mustHaves = rankableFactors.filter(f => f.group === 'must-have');
  const niceToHaves = rankableFactors.filter(f => f.group === 'nice-to-have');

  const handleSaveDraft = () => {
    saveCurrentDraft(4, 'Skill ranking prioritization');
    setDraftSavedToast(true);
    setTimeout(() => setDraftSavedToast(false), 2500);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFactorName.trim()) {
      addCustomFactor(newFactorName.trim(), newFactorType, newFactorGroup);
      setNewFactorName('');
      setAddModalOpen(false);
      if (isEditRoute) setStaleWarning(true);
    }
  };

  const handleMove = (id: string, dir: 'up' | 'down') => {
    moveFactorUpDown(id, dir);
    if (isEditRoute) setStaleWarning(true);
  };

  const handlePrimaryProceed = () => {
    if (isEditRoute) {
      navigate(`/search/${routeRoleId}/candidates`);
    } else {
      navigate('/search/new/search-setup');
    }
  };

  return (
    <div className="space-y-6 max-w-[940px] mx-auto animate-in fade-in duration-200">
      {/* Stepper */}
      {!isEditRoute && <Stepper currentStep={4} />}

      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          size="sm"
          icon={<IconArrowLeft size={14} />}
          onClick={() => {
            if (isEditRoute) {
              navigate(`/search/${routeRoleId}/candidates`);
            } else {
              navigate('/search/new/ideal-profile');
            }
          }}
        >
          {isEditRoute ? 'Back to candidates' : 'Back'}
        </Button>

        <div className="flex items-center gap-3">
          {isEditRoute && (
            <Badge variant="warning">Edit mode · Re-sorts candidates immediately</Badge>
          )}
          <button
            type="button"
            onClick={resetSkillRanking}
            className="text-[13px] text-[#6f7988] hover:text-[#1c1d1f] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <IconRotateCcw size={13} />
            <span>Reset changes</span>
          </button>
        </div>
      </div>

      {/* Main Ranking Container */}
      <Card variant="graphite" padding="lg" className="space-y-6">
        <div>
          <h2 className="text-[22px] sm:text-[24px] font-medium text-[#1c1d1f] font-serif">
            Rank the skills that matter most
          </h2>
          <p className="text-[14px] text-[#6f7988] mt-1.5 leading-relaxed">
            The AI proposed this order from the approved profile. Reorder to steer who rises to the top of your list.
          </p>
        </div>

        {/* Group 1: Must have */}
        <div className="rounded-[8px] border border-[#e4e7ec] bg-white overflow-hidden shadow-xs">
          <div className="p-3.5 sm:px-5 flex items-center justify-between bg-[#f3f4f6] border-b border-[#e4e7ec]">
            <span className="text-[13px] font-semibold text-[#1c1d1f]">
              Must have
            </span>
            <span className="text-[12px] text-[#6f7988]">
              Candidates are scored mostly on these
            </span>
          </div>

          <div className="divide-y divide-[#e4e7ec]">
            {mustHaves.map((factor, index) => (
              <div
                key={factor.id}
                className="p-3 sm:px-5 flex items-center justify-between gap-3 hover:bg-[#f9fafb] transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="text-[#8f99a8] cursor-grab">
                    <IconGripVertical size={16} />
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#1c1d1f] text-white text-[11px] font-semibold flex items-center justify-center shrink-0">
                    {factor.rank}
                  </div>
                  <span className="text-[14px] font-medium text-[#1c1d1f] truncate">
                    {factor.name}
                  </span>
                  {factor.type !== 'skill' && (
                    <Badge variant="default" size="sm">
                      {factor.type}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {factor.isAiSuggested && (
                    <Badge variant="ai" size="sm">
                      AI suggested
                    </Badge>
                  )}
                  <div className="flex items-center gap-1 border-l border-[#e4e7ec] pl-2">
                    <button
                      type="button"
                      onClick={() => handleMove(factor.id, 'up')}
                      aria-label="Move factor up"
                      disabled={index === 0}
                      className="p-1 rounded-[6px] text-[#6f7988] hover:text-[#1c1d1f] hover:bg-[#f3f4f6] disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                    >
                      <IconArrowUp size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMove(factor.id, 'down')}
                      aria-label="Move factor down"
                      className="p-1 rounded-[6px] text-[#6f7988] hover:text-[#1c1d1f] hover:bg-[#f3f4f6] transition-colors cursor-pointer"
                    >
                      <IconArrowDown size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Group 2: Nice to have */}
        <div className="rounded-[8px] border border-[#e4e7ec] bg-white overflow-hidden shadow-xs">
          <div className="p-3.5 sm:px-5 flex items-center justify-between bg-[#f3f4f6] border-b border-[#e4e7ec]">
            <span className="text-[13px] font-semibold text-[#1c1d1f]">
              Nice to have
            </span>
            <span className="text-[12px] text-[#6f7988]">
              Used to break ties
            </span>
          </div>

          <div className="divide-y divide-[#e4e7ec]">
            {niceToHaves.map((factor, index) => (
              <div
                key={factor.id}
                className="p-3 sm:px-5 flex items-center justify-between gap-3 hover:bg-[#f9fafb] transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="text-[#8f99a8] cursor-grab">
                    <IconGripVertical size={16} />
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#e4e7ec] text-[#1c1d1f] text-[11px] font-semibold flex items-center justify-center shrink-0">
                    {factor.rank}
                  </div>
                  <span className="text-[14px] font-medium text-[#1c1d1f] truncate">
                    {factor.name}
                  </span>
                  {factor.type !== 'skill' && (
                    <Badge variant="default" size="sm">
                      {factor.type}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {factor.isAiSuggested && (
                    <Badge variant="ai" size="sm">
                      AI suggested
                    </Badge>
                  )}
                  <div className="flex items-center gap-1 border-l border-[#e4e7ec] pl-2">
                    <button
                      type="button"
                      onClick={() => handleMove(factor.id, 'up')}
                      aria-label="Move factor up"
                      className="p-1 rounded-[6px] text-[#6f7988] hover:text-[#1c1d1f] hover:bg-[#f3f4f6] transition-colors cursor-pointer"
                    >
                      <IconArrowUp size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMove(factor.id, 'down')}
                      aria-label="Move factor down"
                      disabled={index === niceToHaves.length - 1}
                      className="p-1 rounded-[6px] text-[#6f7988] hover:text-[#1c1d1f] hover:bg-[#f3f4f6] disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                    >
                      <IconArrowDown size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add a skill button */}
        <div className="pt-1">
          <Button
            variant="secondary"
            size="sm"
            icon={<IconPlus size={14} />}
            onClick={() => setAddModalOpen(true)}
          >
            Add a skill or criteria
          </Button>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 flex items-center justify-between border-t border-[#e4e7ec]">
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="md"
              icon={<IconSave size={15} />}
              onClick={handleSaveDraft}
            >
              Save draft
            </Button>
            {draftSavedToast && (
              <span className="text-[12px] text-[#075a39] flex items-center gap-1 animate-in fade-in">
                <IconCheck size={14} /> Draft saved
              </span>
            )}
          </div>

          <Button
            variant="primary"
            size="md"
            icon={<IconArrowRight size={15} />}
            iconPosition="right"
            onClick={handlePrimaryProceed}
          >
            {isEditRoute ? 'Return to Candidates' : 'Continue to search setup'}
          </Button>
        </div>
      </Card>

      {/* Add Factor Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        maxWidth="md"
        title="Add Ranking Factor"
        description="Add a specific skill, qualification credential, or piece of evidence to the candidate ranking formula."
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[12px] font-semibold text-[#505967] uppercase tracking-wider block">
              Factor Name
            </label>
            <input
              type="text"
              autoFocus
              value={newFactorName}
              onChange={(e) => setNewFactorName(e.target.value)}
              placeholder="E.g. Bayesian spatial inference, ERA5 reanalysis proficiency..."
              className="w-full bg-white border border-[#d3d8df] hover:border-[#8f99a8] rounded-[8px] p-2.5 text-[14px] text-[#1c1d1f] focus-visible:outline-2 focus-visible:outline-[#407ff2] focus-visible:outline-offset-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[12px] font-semibold text-[#505967] uppercase tracking-wider block">
                Factor Type
              </label>
              <select
                value={newFactorType}
                onChange={(e) => setNewFactorType(e.target.value as FactorType)}
                className="w-full bg-white border border-[#d3d8df] rounded-[8px] p-2.5 text-[13px] text-[#1c1d1f] focus-visible:outline-2 focus-visible:outline-[#407ff2]"
              >
                <option value="skill">Technical Skill</option>
                <option value="qualification">Academic / Qualification</option>
                <option value="evidence">Evidence / Repository</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-semibold text-[#505967] uppercase tracking-wider block">
                Importance Tier
              </label>
              <select
                value={newFactorGroup}
                onChange={(e) => setNewFactorGroup(e.target.value as any)}
                className="w-full bg-white border border-[#d3d8df] rounded-[8px] p-2.5 text-[13px] text-[#1c1d1f] focus-visible:outline-2 focus-visible:outline-[#407ff2]"
              >
                <option value="must-have">Must have (Primary score)</option>
                <option value="nice-to-have">Nice to have (Tie breaker)</option>
              </select>
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-[#e4e7ec]">
            <Button variant="ghost" type="button" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={!newFactorName.trim()}>
              Add to Ranking
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
