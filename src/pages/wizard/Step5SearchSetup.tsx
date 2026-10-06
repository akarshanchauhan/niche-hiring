import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSearchWorkflow } from '../../context/SearchWorkflowContext';
import { Stepper } from '../../components/ui/Stepper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Slider } from '../../components/ui/Slider';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { FitExplainerModal } from '../../components/candidates/FitExplainerModal';
import { GlobalSettingsModal } from '../../components/layout/GlobalSettingsModal';
import {
  IconArrowLeft,
  IconArrowRight,
  IconSearch,
  IconSave,
  IconCheck,
} from '../../components/ui/Icons';

export const Step5SearchSetup: React.FC = () => {
  const navigate = useNavigate();
  const { id: routeRoleId } = useParams();
  const isEditRoute = Boolean(routeRoleId);

  const {
    minFitPercentage,
    setMinFitPercentage,
    selectedPlatforms,
    togglePlatformSelection,
    schedule,
    setSchedule,
    stopCondition,
    setStopCondition,
    notifyMatches,
    setNotifyMatches,
    platforms,
    jobDescription,
    idealProfile,
    rankableFactors,
    startSearchSimulation,
    saveCurrentDraft,
    setStaleWarning,
  } = useSearchWorkflow();

  const [fitModalOpen, setFitModalOpen] = useState(false);
  const [globalSettingsOpen, setGlobalSettingsOpen] = useState(false);
  const [viewJdModalOpen, setViewJdModalOpen] = useState(false);
  const [viewProfileModalOpen, setViewProfileModalOpen] = useState(false);
  const [draftSavedToast, setDraftSavedToast] = useState(false);

  const topSkillsSummary = rankableFactors
    .filter(f => f.group === 'must-have')
    .slice(0, 3)
    .map(f => f.name.toLowerCase())
    .join(', ');

  const handleSaveDraft = () => {
    saveCurrentDraft(5, 'Search setup & platform filters');
    setDraftSavedToast(true);
    setTimeout(() => setDraftSavedToast(false), 2500);
  };

  const handleStartSearch = () => {
    if (isEditRoute) {
      setStaleWarning(true);
      navigate(`/search/${routeRoleId}/candidates`);
    } else {
      startSearchSimulation();
      navigate('/search/new/searching');
    }
  };

  return (
    <div className="space-y-6 max-w-[1140px] mx-auto animate-in fade-in duration-200">
      {/* Stepper */}
      {!isEditRoute && <Stepper currentStep={5} />}

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
              navigate('/search/new/skill-ranking');
            }
          }}
        >
          {isEditRoute ? 'Back to candidates' : 'Back'}
        </Button>

        {isEditRoute && (
          <Badge variant="warning">Edit mode · Platform and cadence update</Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Configuration */}
        <div className="lg:col-span-8 space-y-5">
          <div>
            <h2 className="text-[22px] sm:text-[24px] font-medium text-[#1c1d1f] font-serif">
              Set up the search
            </h2>
            <p className="text-[14px] text-[#6f7988] mt-1.5 leading-relaxed">
              Choose how strict the match should be, where to look and how often to run.
            </p>
          </div>

          {/* Section 1: Minimum % Fit */}
          <Card variant="graphite" padding="md" className="space-y-3">
            <Slider
              value={minFitPercentage}
              onChange={(val) => {
                setMinFitPercentage(val);
                if (isEditRoute) setStaleWarning(true);
              }}
              label="Minimum % fit"
              onInfoClick={() => setFitModalOpen(true)}
            />
          </Card>

          {/* Section 2: Platforms to Search */}
          <Card variant="graphite" padding="md" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[15px] font-medium text-[#1c1d1f] font-serif">
                  Platforms to search
                </h3>
                <p className="text-[13px] text-[#6f7988] mt-0.5">
                  All connected platforms are on by default. Switch off any you want to leave out of this search.
                </p>
              </div>
              <span className="text-[12px] text-[#1c1d1f] bg-[#f3f4f6] border border-[#e4e7ec] px-2.5 py-1 rounded-[6px] shrink-0 font-medium">
                {selectedPlatforms.length} of {platforms.length} platforms selected
              </span>
            </div>

            <div className="divide-y divide-[#e4e7ec]">
              {platforms.map((platform) => {
                const isConnected = platform.status === 'connected';
                const isSelected = selectedPlatforms.includes(platform.id);

                return (
                  <div key={platform.id} className="py-3 flex items-center justify-between">
                    <label className={`flex items-center gap-3 cursor-pointer ${!isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      <input
                        type="checkbox"
                        checked={isSelected && isConnected}
                        disabled={!isConnected}
                        onChange={() => {
                          togglePlatformSelection(platform.id);
                          if (isEditRoute) setStaleWarning(true);
                        }}
                        className="w-4 h-4 rounded bg-white border-[#d3d8df] text-[#1c1d1f] accent-[#1c1d1f] focus-visible:outline-2 focus-visible:outline-[#407ff2] focus-visible:outline-offset-2"
                      />
                      <div>
                        <span className="text-[14px] font-semibold text-[#1c1d1f]">
                          {platform.name}
                        </span>
                        <p className="text-[12px] text-[#6f7988]">
                          {platform.description}
                        </p>
                      </div>
                    </label>

                    <span className="text-[12px] text-[#8f99a8] shrink-0">
                      {platform.statusLabel}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setGlobalSettingsOpen(true)}
                className="text-[12px] text-[#6f7988] hover:text-[#1c1d1f] underline underline-offset-2 transition-colors cursor-pointer"
              >
                Manage connections in global settings
              </button>
            </div>
          </Card>

          {/* Section 3: How Often to Run */}
          <Card variant="graphite" padding="md" className="space-y-4">
            <h3 className="text-[15px] font-medium text-[#1c1d1f] font-serif">
              How often to run
            </h3>

            <div className="space-y-2.5">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="schedule"
                  value="once"
                  checked={schedule === 'once'}
                  onChange={() => setSchedule('once')}
                  className="w-4 h-4 accent-[#1c1d1f] focus-visible:outline-2 focus-visible:outline-[#407ff2]"
                />
                <span className="text-[14px] text-[#1c1d1f]">Run once now</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="schedule"
                  value="daily"
                  checked={schedule === 'daily'}
                  onChange={() => setSchedule('daily')}
                  className="w-4 h-4 accent-[#1c1d1f] focus-visible:outline-2 focus-visible:outline-[#407ff2]"
                />
                <span className="text-[14px] text-[#1c1d1f]">Run daily</span>
              </label>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="schedule"
                    value="weekly"
                    checked={schedule === 'weekly'}
                    onChange={() => setSchedule('weekly')}
                    className="w-4 h-4 accent-[#1c1d1f] focus-visible:outline-2 focus-visible:outline-[#407ff2]"
                  />
                  <span className="text-[14px] text-[#1c1d1f]">Run weekly</span>
                </label>

                {schedule !== 'once' && (
                  <div className="ml-7 p-3.5 rounded-[8px] bg-[#f3f4f6] border border-[#e4e7ec] space-y-3">
                    <span className="text-[12px] font-semibold text-[#505967] uppercase tracking-wider block">
                      Stop running when
                    </span>
                    <div className="space-y-2 text-[13px]">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="stopCondition"
                          value="role-date"
                          checked={stopCondition === 'role-date'}
                          onChange={() => setStopCondition('role-date')}
                          className="w-3.5 h-3.5 accent-[#1c1d1f]"
                        />
                        <span className="text-[#1c1d1f]">On the role opening date</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="stopCondition"
                          value="manual"
                          checked={stopCondition === 'manual'}
                          onChange={() => setStopCondition('manual')}
                          className="w-3.5 h-3.5 accent-[#1c1d1f]"
                        />
                        <span className="text-[#1c1d1f]">When I stop it</span>
                      </label>
                    </div>
                    <p className="text-[11px] text-[#6f7988] pt-1">
                      (Later runs only add new candidates. Your approved job description, profile and ranking stay as they are.)
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyMatches}
                    onChange={(e) => setNotifyMatches(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#1c1d1f]"
                  />
                  <span className="text-[13px] text-[#505967]">
                    Notify me when new matches arrive
                  </span>
                </label>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Search Summary Panel */}
        <div className="lg:col-span-4 space-y-4">
          <Card variant="graphite" padding="md" className="space-y-5 border-[#e4e7ec]">
            <h3 className="text-[16px] font-medium text-[#1c1d1f] font-serif pb-2 border-b border-[#e4e7ec]">
              Search summary
            </h3>

            <div className="space-y-4 text-[13px]">
              {/* Ideal candidate profile link */}
              <div>
                <span className="text-[11px] font-semibold text-[#6f7988] uppercase tracking-wider block mb-1">
                  Ideal candidate profile
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-[6px] bg-[#f3f4f6] border border-[#d3d8df] shrink-0 flex items-center justify-center text-[10px] text-[#1c1d1f] font-semibold">
                      EP
                    </div>
                    <span className="text-[#1c1d1f] font-semibold truncate">
                      {idealProfile.roleTitle}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setViewProfileModalOpen(true)}
                    className="text-[#6f7988] hover:text-[#1c1d1f] text-[12px] inline-flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    View <IconArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* Job Description link */}
              <div>
                <span className="text-[11px] font-semibold text-[#6f7988] uppercase tracking-wider block mb-1">
                  Job description
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-[#1c1d1f] font-medium">Approved draft</span>
                  <button
                    type="button"
                    onClick={() => setViewJdModalOpen(true)}
                    className="text-[#6f7988] hover:text-[#1c1d1f] text-[12px] inline-flex items-center gap-1 cursor-pointer"
                  >
                    View <IconArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* Role Title */}
              <div>
                <span className="text-[11px] font-semibold text-[#6f7988] uppercase tracking-wider block mb-0.5">
                  Role
                </span>
                <p className="text-[#1c1d1f] font-medium">{jobDescription.title}</p>
              </div>

              {/* Top Skills */}
              <div>
                <span className="text-[11px] font-semibold text-[#6f7988] uppercase tracking-wider block mb-0.5">
                  Top skills
                </span>
                <p className="text-[#1c1d1f] capitalize">{topSkillsSummary}</p>
              </div>

              {/* Minimum Fit */}
              <div>
                <span className="text-[11px] font-semibold text-[#6f7988] uppercase tracking-wider block mb-0.5">
                  Minimum fit
                </span>
                <p className="text-[#1c1d1f] font-bold text-[16px]">{minFitPercentage}%</p>
              </div>

              {/* Platforms */}
              <div>
                <span className="text-[11px] font-semibold text-[#6f7988] uppercase tracking-wider block mb-0.5">
                  Platforms
                </span>
                <p className="text-[#1c1d1f]">
                  {selectedPlatforms.length} of {platforms.length}
                </p>
              </div>

              {/* Cadence */}
              <div>
                <span className="text-[11px] font-semibold text-[#6f7988] uppercase tracking-wider block mb-0.5">
                  Runs
                </span>
                <p className="text-[#1c1d1f]">
                  {schedule === 'once'
                    ? 'One-time immediate search'
                    : `${schedule.charAt(0).toUpperCase() + schedule.slice(1)}, until ${
                        stopCondition === 'role-date' ? 'the role opens' : 'stopped'
                      }`}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#e4e7ec] flex flex-col gap-2">
              <Button
                variant="primary"
                size="md"
                icon={<IconSearch size={15} />}
                onClick={handleStartSearch}
                className="w-full"
              >
                {isEditRoute ? 'Save & Return to Candidates' : 'Start searching'}
              </Button>

              <Button
                variant="secondary"
                size="md"
                icon={<IconSave size={15} />}
                onClick={handleSaveDraft}
                className="w-full"
              >
                Save draft
              </Button>

              {draftSavedToast && (
                <span className="text-[12px] text-[#075a39] text-center flex items-center justify-center gap-1 animate-in fade-in">
                  <IconCheck size={14} /> Draft saved
                </span>
              )}
            </div>
          </Card>
        </div>
      </div>

      <FitExplainerModal
        isOpen={fitModalOpen}
        onClose={() => setFitModalOpen(false)}
      />

      <GlobalSettingsModal
        isOpen={globalSettingsOpen}
        onClose={() => setGlobalSettingsOpen(false)}
      />

      {/* Quick View Modals for Summary sidebar */}
      <Modal
        isOpen={viewJdModalOpen}
        onClose={() => setViewJdModalOpen(false)}
        maxWidth="lg"
        title={jobDescription.title}
        description="Approved Job Description Artifact"
      >
        <div className="space-y-4 text-[13px] text-[#505967]">
          <p className="text-[14px] text-[#1c1d1f] font-medium">{jobDescription.summary}</p>
          <div className="space-y-1.5">
            <h5 className="font-semibold text-[#1c1d1f]">What you will do:</h5>
            <ul className="list-disc pl-5 space-y-1">
              {jobDescription.sections.whatYouWillDo.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={viewProfileModalOpen}
        onClose={() => setViewProfileModalOpen(false)}
        maxWidth="lg"
        title={idealProfile.roleTitle}
        description="Approved Ideal Candidate Profile"
      >
        <div className="space-y-4 text-[13px] text-[#505967]">
          <div className="space-y-1.5">
            <h5 className="font-semibold text-[#1c1d1f]">Core Skills:</h5>
            <div className="flex flex-wrap gap-1.5">
              {idealProfile.coreSkills.map((s) => (
                <Badge key={s} variant="default">{s}</Badge>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <h5 className="font-semibold text-[#1c1d1f]">Domain Experience:</h5>
            <div className="flex flex-wrap gap-1.5">
              {idealProfile.domainExperience.map((d) => (
                <Badge key={d} variant="default">{d}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
