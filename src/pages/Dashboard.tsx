import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchWorkflow } from '../context/SearchWorkflowContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { IconPlus, IconArrowRight, IconFileText, IconTrash, IconX } from '../components/ui/Icons';
import { GlobalSettingsModal } from '../components/layout/GlobalSettingsModal';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { searches, drafts, resumeDraft, deleteDraft, backgroundSearchActive } = useSearchWorkflow();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [banner1Dismissed, setBanner1Dismissed] = useState(false);
  const [banner2Dismissed, setBanner2Dismissed] = useState(false);

  const getStepRoute = (stepNum: number) => {
    switch (stepNum) {
      case 1: return '/search/new/requirement';
      case 2: return '/search/new/job-description';
      case 3: return '/search/new/ideal-profile';
      case 4: return '/search/new/skill-ranking';
      case 5: return '/search/new/search-setup';
      default: return '/search/new/requirement';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header section */}
      <div className="space-y-1">
        <h1 className="text-[28px] sm:text-[34px] font-medium text-[#1c1d1f] tracking-tight font-serif">
          Welcome Akarshan
        </h1>
        <p className="text-[15px] text-[#6f7988]">
          Proactive talent intelligence and automated pipelining for specialized roles.
        </p>
      </div>

      {/* Candidate Searches Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] sm:text-[22px] font-medium text-[#1c1d1f] font-serif">
            Candidate searches
          </h2>
          <Button
            variant="primary"
            size="md"
            icon={<IconPlus size={15} />}
            onClick={() => navigate('/search/new/requirement')}
          >
            New search
          </Button>
        </div>

        {/* Background Search Running Banner */}
        {backgroundSearchActive && (
          <div
            onClick={() => navigate('/search/new/searching')}
            className="p-4 rounded-[8px] bg-[#eff6ff] border border-[#bfdbfe] hover:border-[#93c5fd] flex items-center justify-between gap-4 transition-all cursor-pointer shadow-xs"
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#407ff2] animate-ping" />
              <div>
                <h4 className="text-[14px] font-semibold text-[#1c1d1f]">
                  Statistical economist search is active in background
                </h4>
                <p className="text-[12px] text-[#4b5563]">
                  Analyzing 4 sourcing platforms. 12 preliminary candidates identified.
                </p>
              </div>
            </div>
            <Button variant="secondary" size="sm" icon={<IconArrowRight size={14} />}>
              View Live Progress
            </Button>
          </div>
        )}

        {/* Searches Grid */}
        {searches.length === 0 ? (
          <Card variant="graphite" padding="lg" className="text-center py-12">
            <h3 className="text-[18px] font-medium text-[#1c1d1f] font-serif">No active candidate searches</h3>
            <p className="text-[14px] text-[#6f7988] mt-1.5 max-w-md mx-auto">
              Start by describing the cross-disciplinary role requirement in plain language.
            </p>
            <Button
              variant="primary"
              size="md"
              icon={<IconPlus size={15} />}
              onClick={() => navigate('/search/new/requirement')}
              className="mt-5"
            >
              Create first search
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {searches.map((search) => (
              <div
                key={search.id}
                onClick={() => navigate(`/search/${search.id}/candidates`)}
                className="group p-5 rounded-[8px] bg-[#ffffff] border border-[#e4e7ec] hover:border-[#8f99a8] transition-all duration-150 cursor-pointer flex flex-col justify-between shadow-[0_2px_4px_-2px_rgba(28,40,64,0.08)]"
              >
                <div>
                  <div className="flex items-start gap-3 mb-4">
                    {/* Generic humanizing avatar placeholder */}
                    <div className="w-10 h-10 rounded-[8px] bg-[#f3f4f6] border border-[#d3d8df] shrink-0 flex items-center justify-center text-[#1c1d1f] text-[14px] font-semibold group-hover:border-[#8f99a8] transition-colors">
                      {search.title.charAt(0)}
                    </div>
                    <h3 className="text-[14px] font-semibold text-[#1c1d1f] leading-snug group-hover:text-[#407ff2] transition-colors line-clamp-2">
                      {search.title}
                    </h3>
                  </div>

                  {/* Candidates & Shortlisted Metric Blocks */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="p-2.5 rounded-[6px] bg-[#f3f4f6] border border-[#e4e7ec]">
                      <span className="block text-[10px] font-semibold text-[#6f7988] uppercase tracking-wider">
                        Candidates
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-[18px] font-semibold text-[#1c1d1f]">
                          {search.candidateCount}
                        </span>
                        {search.newCount && search.newCount > 0 ? (
                          <Badge variant="new" size="sm">
                            {search.newCount} new
                          </Badge>
                        ) : null}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-[6px] bg-[#f3f4f6] border border-[#e4e7ec]">
                      <span className="block text-[10px] font-semibold text-[#6f7988] uppercase tracking-wider">
                        Shortlisted
                      </span>
                      <div className="mt-1">
                        <span className="text-[18px] font-semibold text-[#1c1d1f]">
                          {search.shortlistedCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#e4e7ec] flex items-center justify-between text-[11px] text-[#8f99a8]">
                  <span>Last updated {search.lastUpdated}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform text-[#6f7988]">
                    <IconArrowRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Saved Drafts Section */}
      {drafts.length > 0 && (
        <section className="space-y-3 pt-2">
          <h2 className="text-[17px] font-medium text-[#1c1d1f] font-serif">
            Draft searches in progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className="p-4 rounded-[8px] bg-[#ffffff] border border-[#e4e7ec] shadow-xs flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <IconFileText size={15} className="text-[#6f7988] shrink-0" />
                    <h4 className="text-[14px] font-semibold text-[#1c1d1f] truncate">
                      {draft.roleTitle}
                    </h4>
                  </div>
                  <p className="text-[12px] text-[#6f7988] mt-0.5">
                    Saved at Step {draft.step}: {draft.stepName} · {draft.updatedAt}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      const step = resumeDraft(draft.id);
                      navigate(getStepRoute(step));
                    }}
                  >
                    Resume draft
                  </Button>
                  <button
                    type="button"
                    onClick={() => deleteDraft(draft.id)}
                    aria-label="Delete draft"
                    className="p-1.5 text-[#8f99a8] hover:text-[#b91c1c] hover:bg-[#fee2e2]/50 rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center shrink-0"
                  >
                    <IconTrash size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Entry points to other sections / CTA banners */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {!banner1Dismissed && (
          <Card variant="graphite" padding="md" className="flex flex-col justify-between">
            <div className="space-y-1.5">
              <h3 className="text-[16px] font-medium text-[#1c1d1f] font-serif">
                Automated weekly pipelines
              </h3>
              <p className="text-[13px] text-[#6f7988] leading-relaxed">
                3 searches running on an automated weekly schedule. 14 new candidates flagged across connected sources.
              </p>
            </div>
            <div className="flex items-center gap-2.5 mt-5">
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/search/statistical-economist-weather/candidates')}
              >
                View latest matches
              </Button>
              <Button
                variant="hairline"
                size="sm"
                onClick={() => setBanner1Dismissed(true)}
              >
                Dismiss
              </Button>
            </div>
          </Card>
        )}

        {!banner2Dismissed && (
          <Card variant="graphite" padding="md" className="flex flex-col justify-between">
            <div className="space-y-1.5">
              <h3 className="text-[16px] font-medium text-[#1c1d1f] font-serif">
                Sourcing platform health
              </h3>
              <p className="text-[13px] text-[#6f7988] leading-relaxed">
                4 of 6 sourcing engines connected and actively synchronized. Platform E token expired 14 days ago.
              </p>
            </div>
            <div className="flex items-center gap-2.5 mt-5">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSettingsOpen(true)}
              >
                Manage platforms
              </Button>
              <Button
                variant="hairline"
                size="sm"
                onClick={() => setBanner2Dismissed(true)}
              >
                Dismiss
              </Button>
            </div>
          </Card>
        )}
      </section>

      <GlobalSettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
};
