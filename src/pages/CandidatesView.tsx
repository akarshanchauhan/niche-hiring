import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSearchWorkflow } from '../context/SearchWorkflowContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CandidateDetailDrawer } from '../components/candidates/CandidateDetailDrawer';
import { GenericPlatformPreview } from '../components/candidates/GenericPlatformPreview';
import { SearchSettingsDrawer } from '../components/candidates/SearchSettingsDrawer';
import { ShareModal } from '../components/candidates/ShareModal';
import { Candidate } from '../data/candidates';
import {
  IconArrowLeft,
  IconSearch,
  IconSettings,
  IconShare,
  IconExternalLink,
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
  IconX,
} from '../components/ui/Icons';

export const CandidatesView: React.FC = () => {
  const navigate = useNavigate();
  const { id: roleId = 'statistical-economist-weather' } = useParams();

  const {
    candidates,
    shortlistedIds,
    toggleShortlist,
    rejectCandidate,
    staleWarning,
    setStaleWarning,
    reRunSearch,
    isReRunning,
    runFilter,
    setRunFilter,
    runChips,
    idealProfile,
    searches,
  } = useSearchWorkflow();

  // Active view tab: 'all' | 'shortlisted'
  const [activeTab, setActiveTab] = useState<'all' | 'shortlisted'>('all');

  // Filters
  const [minFitFilter, setMinFitFilter] = useState<number>(70);
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<'best' | 'recent' | 'lowest'>('best');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

  // Modals & Drawers
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [previewPlatformId, setPreviewPlatformId] = useState<string | null>(null);
  const [platformPreviewCandidate, setPlatformPreviewCandidate] = useState<Candidate | null>(null);
  const [settingsDrawerOpen, setSettingsDrawerOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Filter and sort candidates
  const filteredCandidates = useMemo(() => {
    let list = candidates.filter(c => !c.isRejected);

    // Tab filter
    if (activeTab === 'shortlisted') {
      list = list.filter(c => shortlistedIds.includes(c.id));
    }

    // Min fit cutoff
    list = list.filter(c => c.fitScore >= minFitFilter);

    // Platform filter
    if (platformFilter !== 'all') {
      list = list.filter(c => c.foundOn.includes(platformFilter));
    }

    // Run filter
    if (runFilter === 'new') {
      list = list.filter(c => c.isNew);
    } else if (runFilter !== 'all') {
      list = list.filter(c => c.runTag === runFilter);
    }

    // Sorting
    if (sortOption === 'best') {
      list.sort((a, b) => b.fitScore - a.fitScore);
    } else if (sortOption === 'recent') {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortOption === 'lowest') {
      list.sort((a, b) => a.fitScore - b.fitScore);
    }

    return list;
  }, [candidates, activeTab, shortlistedIds, minFitFilter, platformFilter, runFilter, sortOption]);

  // Pagination calculation
  const totalItems = filteredCandidates.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const newSinceLastRunCount = candidates.filter(c => c.isNew).length;

  const currentRole = searches.find(s => s.id === roleId);
  const roleDisplayTitle = currentRole?.title || idealProfile.roleTitle;

  return (
    <div className="space-y-6 max-w-[1180px] mx-auto animate-in fade-in duration-200">
      {/* Back to Home & Role Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Button
            variant="secondary"
            size="sm"
            icon={<IconArrowLeft size={14} />}
            onClick={() => navigate('/')}
          >
            Back to home
          </Button>
        </div>
      </div>

      {/* Role Summary Bar & Quick Edit Links */}
      <div className="p-4 sm:p-5 rounded-[8px] bg-white border border-[#e4e7ec] shadow-[0_2px_4px_-2px_rgba(28,40,64,0.08)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-[8px] bg-[#f3f4f6] border border-[#d3d8df] flex items-center justify-center text-[#1c1d1f] font-semibold text-[15px]">
            EP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[17px] sm:text-[18px] font-medium text-[#1c1d1f] font-serif">
                {roleDisplayTitle}
              </h2>
              <button
                type="button"
                onClick={() => setSettingsDrawerOpen(true)}
                title="Search Settings"
                aria-label="Open search settings"
                className="p-1 text-[#6f7988] hover:text-[#1c1d1f] transition-colors cursor-pointer"
              >
                <IconSettings size={15} />
              </button>
            </div>
            <p className="text-[12px] text-[#6f7988]">
              Proactive search pipeline · Weekly cadence · 4 connected sources
            </p>
          </div>
        </div>

        {/* Quick Links to Edit Inputs */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="hairline"
            size="sm"
            onClick={() => navigate(`/search/${roleId}/skill-ranking`)}
          >
            Skill ranking
          </Button>
          <Button
            variant="hairline"
            size="sm"
            onClick={() => navigate(`/search/${roleId}/ideal-profile`)}
          >
            Ideal candidate profile
          </Button>
          <Button
            variant="hairline"
            size="sm"
            onClick={() => navigate(`/search/${roleId}/job-description`)}
          >
            Job description
          </Button>
        </div>
      </div>

      {/* Stale-Data / Settings Changed Warning Banner */}
      {staleWarning && (
        <div className="p-4 rounded-[8px] bg-[#fffbeb] border border-[#fde68a] flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-200">
          <div>
            <h4 className="text-[14px] font-semibold text-[#92400e] font-serif flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#b45309]" />
              Skill ranking changed
            </h4>
            <p className="text-[13px] text-[#78350f] mt-0.5">
              The list is re-sorted, but the pool has not been refreshed. New matches under the new ranking need a re-run.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Button
              variant="primary"
              size="sm"
              icon={<IconSearch size={14} />}
              onClick={reRunSearch}
              disabled={isReRunning}
            >
              {isReRunning ? 'Re-running search...' : 'Re-run search'}
            </Button>
            <button
              type="button"
              onClick={() => setStaleWarning(false)}
              className="text-[13px] text-[#92400e] hover:text-[#78350f] px-2 py-1 transition-colors cursor-pointer font-medium inline-flex items-center gap-1 shrink-0"
            >
              <IconX size={13} /> Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Heading & Share Action */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-[24px] sm:text-[28px] font-medium text-[#1c1d1f] font-serif">
            Candidates
          </h1>

          <Button
            variant="secondary"
            size="sm"
            icon={<IconShare size={14} />}
            onClick={() => setShareModalOpen(true)}
          >
            Share candidate list
          </Button>
        </div>

        {/* View Tabs: Feature Tab Bar per Attio spec */}
        <div className="flex items-center gap-6 border-b border-[#e4e7ec]">
          <button
            type="button"
            onClick={() => {
              setActiveTab('all');
              setCurrentPage(1);
            }}
            className={`pb-3 text-[14px] font-medium transition-all cursor-pointer relative ${
              activeTab === 'all'
                ? 'text-[#1c1d1f] border-b-2 border-[#1c1d1f] -mb-[1px]'
                : 'text-[#6f7988] hover:text-[#1c1d1f]'
            }`}
          >
            Candidates list ({candidates.filter(c => !c.isRejected).length})
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('shortlisted');
              setCurrentPage(1);
            }}
            className={`pb-3 text-[14px] font-medium transition-all cursor-pointer relative ${
              activeTab === 'shortlisted'
                ? 'text-[#1c1d1f] border-b-2 border-[#1c1d1f] -mb-[1px]'
                : 'text-[#6f7988] hover:text-[#1c1d1f]'
            }`}
          >
            Shortlisted ({shortlistedIds.length})
          </button>
        </div>

        {/* Filters and Search Runs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-[8px] bg-[#f3f4f6] border border-[#e4e7ec]">
          {/* Run pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setRunFilter('all');
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-[6px] text-[12px] transition-colors cursor-pointer ${
                runFilter === 'all'
                  ? 'bg-[#1c1d1f] text-white font-medium shadow-xs'
                  : 'bg-white text-[#505967] hover:bg-[#e4e7ec] border border-[#e4e7ec]'
              }`}
            >
              All candidates
            </button>

            <button
              type="button"
              onClick={() => {
                setRunFilter('new');
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-[6px] text-[12px] transition-colors cursor-pointer ${
                runFilter === 'new'
                  ? 'bg-[#1c1d1f] text-white font-medium shadow-xs'
                  : 'bg-white text-[#505967] hover:bg-[#e4e7ec] border border-[#e4e7ec]'
              }`}
            >
              New since last run ({newSinceLastRunCount})
            </button>

            {runChips.filter(r => r !== 'all' && r !== 'new').map((run) => (
              <button
                key={run}
                type="button"
                onClick={() => {
                  setRunFilter(run);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 rounded-[6px] text-[12px] transition-colors cursor-pointer capitalize ${
                  runFilter === run
                    ? 'bg-[#1c1d1f] text-white font-medium shadow-xs'
                    : 'bg-white text-[#505967] hover:bg-[#e4e7ec] border border-[#e4e7ec]'
                }`}
              >
                {run === 'run-4' ? 'Run 4, today' : run === 'run-3' ? 'Run 3, today' : run === 'run-2' ? 'Run 2' : 'Run 1'}
              </button>
            ))}
          </div>

          {/* Controls: Min Fit, Platform, Sort */}
          <div className="flex flex-wrap items-center gap-3 text-[12px]">
            {/* Min Fit Input */}
            <div className="flex items-center gap-1.5 text-[#6f7988]">
              <span>Min fit</span>
              <input
                type="number"
                min={50}
                max={99}
                value={minFitFilter}
                onChange={(e) => {
                  setMinFitFilter(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-14 bg-white border border-[#d3d8df] rounded-[6px] px-2 py-1 text-[#1c1d1f] text-center font-medium focus-visible:outline-2 focus-visible:outline-[#407ff2]"
              />
              <span>%</span>
            </div>

            {/* Platform Dropdown */}
            <select
              value={platformFilter}
              onChange={(e) => {
                setPlatformFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-white border border-[#d3d8df] text-[#1c1d1f] rounded-[6px] px-2.5 py-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#407ff2]"
            >
              <option value="all">All platforms</option>
              <option value="platform-a">Platform A</option>
              <option value="platform-b">Platform B</option>
              <option value="platform-c">Platform C</option>
              <option value="platform-d">Platform D</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="bg-white border border-[#d3d8df] text-[#1c1d1f] rounded-[6px] px-2.5 py-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#407ff2]"
            >
              <option value="best">Best fit</option>
              <option value="recent">Most recent</option>
              <option value="lowest">Lowest fit</option>
            </select>
          </div>
        </div>

        {/* Candidates Table / Empty State */}
        {paginatedCandidates.length === 0 ? (
          <Card variant="graphite" padding="lg" className="text-center py-12">
            <h3 className="text-[17px] font-medium text-[#1c1d1f] font-serif">
              {activeTab === 'shortlisted' ? 'No candidates shortlisted yet' : 'No matching candidates found'}
            </h3>
            <p className="text-[13px] text-[#6f7988] mt-1">
              {activeTab === 'shortlisted'
                ? 'Review candidates in the full list and click "+ Shortlist" to add them here.'
                : 'Try lowering the minimum fit cutoff or clearing active run filters.'}
            </p>
            {activeTab === 'shortlisted' ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setActiveTab('all')}
                className="mt-4"
              >
                Back to all candidates
              </Button>
            ) : (
              <Button
                variant="hairline"
                size="sm"
                onClick={() => {
                  setMinFitFilter(70);
                  setPlatformFilter('all');
                  setRunFilter('all');
                }}
                className="mt-4"
              >
                Reset filters
              </Button>
            )}
          </Card>
        ) : (
          <div className="rounded-[8px] bg-white border border-[#e4e7ec] shadow-[0_2px_4px_-2px_rgba(28,40,64,0.08)] overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-3 px-6 py-3.5 bg-[#f9fafb] border-b border-[#e4e7ec] text-[11px] font-semibold text-[#6f7988] uppercase tracking-wider">
              <div className="col-span-3">Candidate</div>
              <div className="col-span-2 text-center">% Fit</div>
              <div className="col-span-3">Why It Matched</div>
              <div className="col-span-2">Found On</div>
              <div className="col-span-2 text-right">Shortlist</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-[#e4e7ec]">
              {paginatedCandidates.map((candidate) => {
                const isShortlisted = shortlistedIds.includes(candidate.id);

                return (
                  <div
                    key={candidate.id}
                    className="grid grid-cols-12 gap-3 px-6 py-4 items-center hover:bg-[#f9fafb] transition-colors"
                  >
                    {/* Candidate Name & Title */}
                    <div
                      onClick={() => setSelectedCandidate(candidate)}
                      className="col-span-3 cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[14px] text-[#1c1d1f] group-hover:text-[#407ff2] group-hover:underline">
                          {candidate.name}
                        </span>
                        {isShortlisted && (
                          <Badge variant="shortlist" size="sm">Shortlisted</Badge>
                        )}
                        {candidate.isNew && !isShortlisted && (
                          <Badge variant="new" size="sm">New</Badge>
                        )}
                      </div>
                      <p className="text-[12px] text-[#6f7988] mt-0.5 line-clamp-1">
                        {candidate.title}
                      </p>
                    </div>

                    {/* % Fit Meter */}
                    <div className="col-span-2 flex flex-col items-center justify-center">
                      <span className="text-[15px] font-semibold text-[#1c1d1f]">
                        {candidate.fitScore}%
                      </span>
                      <div className="w-20 bg-[#e4e7ec] rounded-full h-1.5 mt-1 overflow-hidden">
                        <div
                          className="bg-[#1c1d1f] h-full rounded-full"
                          style={{ width: `${candidate.fitScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Why It Matched */}
                    <div
                      onClick={() => setSelectedCandidate(candidate)}
                      className="col-span-3 text-[13px] text-[#505967] leading-relaxed cursor-pointer"
                    >
                      <p className="line-clamp-2">{candidate.whyMatched}</p>
                    </div>

                    {/* Found On */}
                    <div className="col-span-2 flex flex-wrap gap-1.5">
                      {candidate.foundOn.map((platId) => (
                        <button
                          key={platId}
                          type="button"
                          onClick={() => {
                            setPreviewPlatformId(platId);
                            setPlatformPreviewCandidate(candidate);
                          }}
                          className="text-[11px] px-2 py-0.5 rounded-[6px] bg-[#f3f4f6] hover:bg-[#e4e7ec] text-[#505967] hover:text-[#1c1d1f] border border-[#e4e7ec] hover:border-[#d3d8df] transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <span>{platId.replace('platform-', 'Platform ').toUpperCase()}</span>
                          <IconExternalLink size={10} className="text-[#8f99a8]" />
                        </button>
                      ))}
                    </div>

                    {/* Shortlist & Reject Actions */}
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      {isShortlisted ? (
                        <Button
                          variant="hairline"
                          size="sm"
                          icon={<IconX size={13} />}
                          onClick={() => toggleShortlist(candidate.id)}
                          className="text-[12px] text-[#b91c1c] hover:bg-[#fef2f2] border-[#fecaca]"
                        >
                          Remove
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="secondary"
                            size="sm"
                            icon={<IconPlus size={13} />}
                            onClick={() => toggleShortlist(candidate.id)}
                            className="text-[12px]"
                          >
                            Shortlist
                          </Button>
                          <button
                            type="button"
                            onClick={() => rejectCandidate(candidate.id)}
                            title="Reject candidate"
                            className="p-1.5 text-[#8f99a8] hover:text-[#b91c1c] hover:bg-[#fee2e2]/50 rounded-[6px] transition-colors cursor-pointer shrink-0 inline-flex items-center justify-center"
                          >
                            <IconX size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Footer */}
            <div className="px-6 py-4 bg-[#f9fafb] border-t border-[#e4e7ec] flex items-center justify-between text-[13px] text-[#6f7988]">
              <div>
                Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, totalItems)} of {totalItems}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="p-1 rounded text-[#6f7988] hover:text-[#1c1d1f] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <IconChevronLeft size={16} />
                </button>
                <span className="font-semibold text-[#1c1d1f] text-[13px]">
                  {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="p-1 rounded text-[#6f7988] hover:text-[#1c1d1f] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <IconChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Candidate Deep-Dive Drawer */}
      <CandidateDetailDrawer
        candidate={selectedCandidate}
        isOpen={!!selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onToggleShortlist={toggleShortlist}
        isShortlisted={selectedCandidate ? shortlistedIds.includes(selectedCandidate.id) : false}
        onOpenSourcePreview={(platformId) => {
          setPreviewPlatformId(platformId);
          setPlatformPreviewCandidate(selectedCandidate);
        }}
      />

      {/* Generic Platform Source Preview Modal */}
      <GenericPlatformPreview
        isOpen={!!previewPlatformId}
        onClose={() => {
          setPreviewPlatformId(null);
          setPlatformPreviewCandidate(null);
        }}
        platformId={previewPlatformId}
        candidate={platformPreviewCandidate}
      />

      {/* Search Settings Drawer */}
      <SearchSettingsDrawer
        isOpen={settingsDrawerOpen}
        onClose={() => setSettingsDrawerOpen(false)}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title="Candidate Shortlist"
      />
    </div>
  );
};
