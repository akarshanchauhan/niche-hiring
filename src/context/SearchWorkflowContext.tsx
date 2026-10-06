import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_SEARCHES, CandidateSearch, ROLE_TEMPLATES } from '../data/roles';
import { PLATFORMS_DATA, PlatformConfig } from '../data/platforms';
import { INITIAL_JOB_DESCRIPTIONS, JobDescriptionData } from '../data/jobDescriptions';
import { INITIAL_IDEAL_PROFILES, IdealProfileData } from '../data/idealProfiles';
import { INITIAL_RANKABLE_FACTORS, RankableFactor } from '../data/skillRanking';
import { INITIAL_CANDIDATES, NEW_CANDIDATES_ON_RERUN, Candidate } from '../data/candidates';

const STORAGE_VERSION = 'niche_hr_prototype_v1.0';

export interface DraftSearch {
  id: string;
  roleTitle: string;
  step: number;
  stepName: string;
  updatedAt: string;
  requirementPrompt: string;
  expectedDate: string;
}

export interface SearchWorkflowContextType {
  // Global & Dashboard
  searches: CandidateSearch[];
  drafts: DraftSearch[];
  platforms: PlatformConfig[];
  backgroundSearchActive: boolean;
  saveCurrentDraft: (stepNumber: number, stepName: string) => void;
  resumeDraft: (draftId: string) => number;
  deleteDraft: (draftId: string) => void;
  
  // Wizard State (Statistical Economist role flow)
  activeRoleId: string;
  requirementPrompt: string;
  setRequirementPrompt: (val: string) => void;
  attachments: Array<{ id: string; name: string; size: string }>;
  addAttachment: (name: string, size?: string) => void;
  removeAttachment: (id: string) => void;
  expectedOpeningDate: string;
  setExpectedOpeningDate: (val: string) => void;
  applyTemplate: (templateId: string) => void;

  // Step 2: Job Description
  currentJdVersion: string;
  setCurrentJdVersion: (v: string) => void;
  jobDescription: JobDescriptionData;
  updateJobDescription: (updated: Partial<JobDescriptionData>, isEditRoute?: boolean) => void;

  // Step 3: Ideal Profile
  currentProfileVersion: string;
  setCurrentProfileVersion: (v: string) => void;
  idealProfile: IdealProfileData;
  updateIdealProfile: (updated: Partial<IdealProfileData>, isEditRoute?: boolean) => void;
  addProfileTag: (category: 'domainExperience' | 'coreSkills' | 'profileTitles' | 'evidences' | 'qualifications', item: string) => void;
  removeProfileTag: (category: 'domainExperience' | 'coreSkills' | 'profileTitles' | 'evidences' | 'qualifications', item: string) => void;

  // Step 4: Skill Ranking
  rankableFactors: RankableFactor[];
  reorderFactors: (draggedId: string, targetId: string) => void;
  moveFactorUpDown: (id: string, direction: 'up' | 'down') => void;
  addCustomFactor: (name: string, type: 'skill' | 'qualification' | 'evidence', group: 'must-have' | 'nice-to-have') => void;
  resetSkillRanking: () => void;
  isRankingEditedFromRoute: boolean;

  // Step 5: Search Setup
  minFitPercentage: number;
  setMinFitPercentage: (val: number) => void;
  selectedPlatforms: string[];
  togglePlatformSelection: (platformId: string) => void;
  schedule: 'once' | 'daily' | 'weekly';
  setSchedule: (s: 'once' | 'daily' | 'weekly') => void;
  stopCondition: 'role-date' | 'manual';
  setStopCondition: (sc: 'role-date' | 'manual') => void;
  notifyMatches: boolean;
  setNotifyMatches: (val: boolean) => void;

  // Step 5.1: Live Searching Simulation
  isSearching: boolean;
  searchProgress: number;
  platformStatuses: Record<string, { searched: boolean; analyzed: boolean; listed: boolean; status: 'done' | 'working' | 'failed'; count: number }>;
  startSearchSimulation: () => void;
  cancelSearchSimulation: () => void;
  retryPlatformD: () => void;
  fastForwardSearch: () => void;
  leaveAndNotifyMe: () => void;

  // Step 6 & 8: Candidates List & Stale Banner
  candidates: Candidate[];
  shortlistedIds: string[];
  toggleShortlist: (id: string) => void;
  rejectCandidate: (id: string) => void;
  staleWarning: boolean;
  setStaleWarning: (val: boolean) => void;
  reRunSearch: () => Promise<void>;
  isReRunning: boolean;
  runFilter: string;
  setRunFilter: (run: string) => void;
  runChips: string[];

  // Demo Controls
  demoDrawerOpen: boolean;
  setDemoDrawerOpen: (val: boolean) => void;
  resetAllData: () => void;
  setPlatformDFailedState: () => void;
  setEmptySearchesState: () => void;
}

const SearchWorkflowContext = createContext<SearchWorkflowContextType | null>(null);

export const SearchWorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Searches and Drafts
  const [searches, setSearches] = useState<CandidateSearch[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_VERSION}_searches`);
    return saved ? JSON.parse(saved) : INITIAL_SEARCHES;
  });

  const [drafts, setDrafts] = useState<DraftSearch[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_VERSION}_drafts`);
    return saved ? JSON.parse(saved) : [
      {
        id: 'draft-quant-climate',
        roleTitle: 'Statistical economist, weather patterns',
        step: 2,
        stepName: 'Job description review',
        updatedAt: '2 hours ago',
        requirementPrompt: 'We need a statistical economist who specializes in weather patterns...',
        expectedDate: '2027-02-01',
      },
    ];
  });

  const [platforms, setPlatforms] = useState<PlatformConfig[]>(PLATFORMS_DATA);
  const [backgroundSearchActive, setBackgroundSearchActive] = useState<boolean>(false);

  // 2. Wizard Input State
  const activeRoleId = 'statistical-economist-weather';
  const [requirementPrompt, setRequirementPrompt] = useState<string>(
    'We need a statistical economist who specializes in weather patterns. They will model how weather variability affects regional demand and pricing, and explain the results to planning teams. The role opens in about four months.'
  );
  const [attachments, setAttachments] = useState<Array<{ id: string; name: string; size: string }>>([
    { id: 'att-1', name: 'Hiring_request.pdf', size: '240 KB' },
    { id: 'att-2', name: 'meeting_notes.png', size: '1.2 MB' },
  ]);
  const [expectedOpeningDate, setExpectedOpeningDate] = useState<string>('2027-02-01');

  // 3. Job Description State
  const [currentJdVersion, setCurrentJdVersion] = useState<string>('1');
  const [allJds, setAllJds] = useState(INITIAL_JOB_DESCRIPTIONS['statistical-economist-weather']);
  const jobDescription = allJds.find(j => j.version === currentJdVersion) || allJds[0];

  // 4. Ideal Profile State
  const [currentProfileVersion, setCurrentProfileVersion] = useState<string>('1');
  const [allProfiles, setAllProfiles] = useState(INITIAL_IDEAL_PROFILES['statistical-economist-weather']);
  const idealProfile = allProfiles.find(p => p.version === currentProfileVersion) || allProfiles[0];

  // 5. Skill Ranking State
  const [rankableFactors, setRankableFactors] = useState<RankableFactor[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_VERSION}_factors`);
    return saved ? JSON.parse(saved) : INITIAL_RANKABLE_FACTORS;
  });
  const [isRankingEditedFromRoute, setIsRankingEditedFromRoute] = useState(false);

  // 6. Search Setup State
  const [minFitPercentage, setMinFitPercentage] = useState<number>(70);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    'platform-a',
    'platform-b',
    'platform-c',
    'platform-d',
  ]);
  const [schedule, setSchedule] = useState<'once' | 'daily' | 'weekly'>('weekly');
  const [stopCondition, setStopCondition] = useState<'role-date' | 'manual'>('role-date');
  const [notifyMatches, setNotifyMatches] = useState<boolean>(true);

  // 7. Searching Progress Simulation
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchProgress, setSearchProgress] = useState<number>(45);
  const [platformStatuses, setPlatformStatuses] = useState<Record<string, { searched: boolean; analyzed: boolean; listed: boolean; status: 'done' | 'working' | 'failed'; count: number }>>({
    'platform-a': { searched: true, analyzed: true, listed: true, status: 'done', count: 6 },
    'platform-b': { searched: true, analyzed: false, listed: false, status: 'working', count: 4 },
    'platform-c': { searched: false, analyzed: false, listed: false, status: 'working', count: 2 },
    'platform-d': { searched: false, analyzed: false, listed: false, status: 'failed', count: 0 },
  });

  // 8. Candidates State & Stale Banner
  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_VERSION}_candidates`);
    return saved ? JSON.parse(saved) : INITIAL_CANDIDATES;
  });
  const [shortlistedIds, setShortlistedIds] = useState<string[]>(['cand-a']);
  const [staleWarning, setStaleWarning] = useState<boolean>(false);
  const [isReRunning, setIsReRunning] = useState<boolean>(false);
  const [runFilter, setRunFilter] = useState<string>('all');
  const [runChips, setRunChips] = useState<string[]>(['all', 'new', 'run-3', 'run-2', 'run-1']);

  // Demo Controls
  const [demoDrawerOpen, setDemoDrawerOpen] = useState<boolean>(false);

  // Save to localStorage whenever core state changes
  useEffect(() => {
    localStorage.setItem(`${STORAGE_VERSION}_searches`, JSON.stringify(searches));
  }, [searches]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_VERSION}_drafts`, JSON.stringify(drafts));
  }, [drafts]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_VERSION}_factors`, JSON.stringify(rankableFactors));
  }, [rankableFactors]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_VERSION}_candidates`, JSON.stringify(candidates));
  }, [candidates]);

  // Recalculate candidates ranking order and fitScores based on current rankable factors
  const recalculateAndResortCandidates = (factors: RankableFactor[]) => {
    const mustHaves = factors.filter(f => f.group === 'must-have').map(f => f.name.toLowerCase());
    const niceToHaves = factors.filter(f => f.group === 'nice-to-have').map(f => f.name.toLowerCase());

    setCandidates(prev => {
      const updated = prev.map(c => {
        let scoreBonus = 0;
        const candidateSkillsLower = c.skills.map(s => s.toLowerCase());
        
        mustHaves.forEach((mh, idx) => {
          if (candidateSkillsLower.some(cs => cs.includes(mh) || mh.includes(cs))) {
            scoreBonus += Math.max(1, 4 - idx);
          }
        });
        niceToHaves.forEach(nth => {
          if (candidateSkillsLower.some(cs => cs.includes(nth) || nth.includes(cs))) {
            scoreBonus += 1;
          }
        });

        // Scale lightly around original score
        const adjustedScore = Math.min(99, Math.max(68, c.fitScore + (scoreBonus % 5) - 2));
        return {
          ...c,
          fitScore: adjustedScore,
        };
      });

      // Re-sort immediately descending by fitScore
      return [...updated].sort((a, b) => b.fitScore - a.fitScore);
    });
  };

  // Draft saving from any step
  const saveCurrentDraft = (stepNumber: number, stepName: string) => {
    const draftTitle = jobDescription.title || 'Statistical economist, weather patterns';
    const newDraft: DraftSearch = {
      id: `draft-${Date.now()}`,
      roleTitle: draftTitle,
      step: stepNumber,
      stepName: stepName,
      updatedAt: 'Just now',
      requirementPrompt: requirementPrompt,
      expectedDate: expectedOpeningDate,
    };

    setDrafts(prev => [newDraft, ...prev.filter(d => d.roleTitle !== draftTitle)]);
  };

  const resumeDraft = (draftId: string): number => {
    const draft = drafts.find(d => d.id === draftId);
    if (draft) {
      setRequirementPrompt(draft.requirementPrompt);
      setExpectedOpeningDate(draft.expectedDate);
      return draft.step;
    }
    return 1;
  };

  const deleteDraft = (draftId: string) => {
    setDrafts(prev => prev.filter(d => d.id !== draftId));
  };

  // Attachment controls
  const addAttachment = (name: string, size: string = '450 KB') => {
    setAttachments(prev => [...prev, { id: `att-${Date.now()}`, name, size }]);
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  // Apply Role Template (Frame 117)
  const applyTemplate = (templateId: string) => {
    const template = ROLE_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setRequirementPrompt(template.prompt);
      setExpectedOpeningDate(template.expectedDate);
    }
  };

  // Job Description Updates
  const updateJobDescription = (updated: Partial<JobDescriptionData>, isEditRoute: boolean = false) => {
    setAllJds(prev =>
      prev.map(item =>
        item.version === currentJdVersion
          ? { ...item, ...updated, lastEdited: 'Just now' }
          : item
      )
    );
    if (isEditRoute) {
      setStaleWarning(true);
    }
  };

  // Ideal Profile Updates
  const updateIdealProfile = (updated: Partial<IdealProfileData>, isEditRoute: boolean = false) => {
    setAllProfiles(prev =>
      prev.map(item =>
        item.version === currentProfileVersion
          ? { ...item, ...updated, lastEdited: 'Just now' }
          : item
      )
    );
    if (isEditRoute) {
      setStaleWarning(true);
    }
  };

  const addProfileTag = (category: 'domainExperience' | 'coreSkills' | 'profileTitles' | 'evidences' | 'qualifications', item: string) => {
    setAllProfiles(prev =>
      prev.map(prof => {
        if (prof.version === currentProfileVersion) {
          const currentArr = prof[category];
          if (!currentArr.includes(item)) {
            return {
              ...prof,
              [category]: [...currentArr, item],
              lastEdited: 'Just now',
            };
          }
        }
        return prof;
      })
    );
  };

  const removeProfileTag = (category: 'domainExperience' | 'coreSkills' | 'profileTitles' | 'evidences' | 'qualifications', item: string) => {
    setAllProfiles(prev =>
      prev.map(prof => {
        if (prof.version === currentProfileVersion) {
          return {
            ...prof,
            [category]: prof[category].filter(t => t !== item),
            lastEdited: 'Just now',
          };
        }
        return prof;
      })
    );
  };

  // Skill Ranking Reordering & Promotion
  const reorderFactors = (draggedId: string, targetId: string) => {
    setRankableFactors(prev => {
      const draggedIndex = prev.findIndex(f => f.id === draggedId);
      const targetIndex = prev.findIndex(f => f.id === targetId);
      if (draggedIndex === -1 || targetIndex === -1) return prev;

      const items = [...prev];
      const [draggedItem] = items.splice(draggedIndex, 1);
      
      // Preserve target group if moved across groups
      const targetItem = prev[targetIndex];
      draggedItem.group = targetItem.group;

      items.splice(targetIndex, 0, draggedItem);

      // Re-assign ranks 1..N
      const updated = items.map((f, idx) => ({ ...f, rank: idx + 1 }));
      recalculateAndResortCandidates(updated);
      setIsRankingEditedFromRoute(true);
      return updated;
    });
  };

  const moveFactorUpDown = (id: string, direction: 'up' | 'down') => {
    setRankableFactors(prev => {
      const index = prev.findIndex(f => f.id === id);
      if (index === -1) return prev;
      if (direction === 'up' && index === 0) return prev;
      if (direction === 'down' && index === prev.length - 1) return prev;

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      const items = [...prev];
      const temp = items[index];
      items[index] = items[newIndex];
      items[newIndex] = temp;

      const updated = items.map((f, idx) => ({ ...f, rank: idx + 1 }));
      recalculateAndResortCandidates(updated);
      setIsRankingEditedFromRoute(true);
      return updated;
    });
  };

  const addCustomFactor = (name: string, type: 'skill' | 'qualification' | 'evidence', group: 'must-have' | 'nice-to-have') => {
    const newFactor: RankableFactor = {
      id: `f-${Date.now()}`,
      name,
      type,
      group,
      rank: rankableFactors.length + 1,
      isAiSuggested: false,
      weightBonus: group === 'must-have' ? 14 : 6,
    };
    const updated = [...rankableFactors, newFactor];
    setRankableFactors(updated);
    recalculateAndResortCandidates(updated);
    setIsRankingEditedFromRoute(true);
  };

  const resetSkillRanking = () => {
    setRankableFactors(INITIAL_RANKABLE_FACTORS);
    recalculateAndResortCandidates(INITIAL_RANKABLE_FACTORS);
    setIsRankingEditedFromRoute(false);
  };

  // Platform selection toggles
  const togglePlatformSelection = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  // Searching Simulation
  const startSearchSimulation = () => {
    setIsSearching(true);
    setSearchProgress(20);
    setPlatformStatuses({
      'platform-a': { searched: true, analyzed: false, listed: false, status: 'working', count: 0 },
      'platform-b': { searched: false, analyzed: false, listed: false, status: 'working', count: 0 },
      'platform-c': { searched: false, analyzed: false, listed: false, status: 'working', count: 0 },
      'platform-d': { searched: false, analyzed: false, listed: false, status: 'working', count: 0 },
    });
  };

  const fastForwardSearch = () => {
    setSearchProgress(100);
    setPlatformStatuses({
      'platform-a': { searched: true, analyzed: true, listed: true, status: 'done', count: 18 },
      'platform-b': { searched: true, analyzed: true, listed: true, status: 'done', count: 14 },
      'platform-c': { searched: true, analyzed: true, listed: true, status: 'done', count: 9 },
      'platform-d': { searched: true, analyzed: true, listed: true, status: 'done', count: 7 },
    });
    setIsSearching(false);
    setBackgroundSearchActive(false);
  };

  const retryPlatformD = () => {
    setPlatformStatuses(prev => ({
      ...prev,
      'platform-d': { searched: true, analyzed: false, listed: false, status: 'working', count: 0 },
    }));
    setTimeout(() => {
      setPlatformStatuses(prev => ({
        ...prev,
        'platform-d': { searched: true, analyzed: true, listed: true, status: 'done', count: 7 },
      }));
    }, 1200);
  };

  const cancelSearchSimulation = () => {
    setIsSearching(false);
    setBackgroundSearchActive(false);
  };

  const leaveAndNotifyMe = () => {
    setIsSearching(false);
    setBackgroundSearchActive(true);
  };

  // Candidates & Shortlist
  const toggleShortlist = (candidateId: string) => {
    setShortlistedIds(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
    setCandidates(prev =>
      prev.map(c =>
        c.id === candidateId ? { ...c, isShortlisted: !c.isShortlisted } : c
      )
    );
  };

  const rejectCandidate = (candidateId: string) => {
    setCandidates(prev =>
      prev.map(c =>
        c.id === candidateId ? { ...c, isRejected: true } : c
      )
    );
  };

  // Re-run Search Action (User requirement 2)
  // "Re-run only adds new candidates, tags them New, adds a run chip, and updates the 'New since last run' count."
  const reRunSearch = async () => {
    setIsReRunning(true);
    // Simulate swift AI search
    await new Promise(res => setTimeout(res, 1200));

    // Add new candidates from rerun pool
    setCandidates(prev => {
      const existingIds = new Set(prev.map(c => c.id));
      const freshToAdd = NEW_CANDIDATES_POOL.filter(c => !existingIds.has(c.id));
      const combined = [...freshToAdd, ...prev];
      return combined.sort((a, b) => b.fitScore - a.fitScore);
    });

    // Add run-4 chip if not already present
    setRunChips(prev => {
      if (!prev.includes('run-4')) {
        return ['all', 'new', 'run-4', ...prev.filter(r => r !== 'all' && r !== 'new')];
      }
      return prev;
    });

    // Update the search card in Dashboard
    setSearches(prev =>
      prev.map(s =>
        s.id === 'statistical-economist-weather'
          ? { ...s, candidateCount: s.candidateCount + 3, newCount: 3, lastUpdated: 'Just now' }
          : s
      )
    );

    setStaleWarning(false);
    setIsReRunning(false);
  };

  // Reset State to Default
  const resetAllData = () => {
    localStorage.removeItem(`${STORAGE_VERSION}_searches`);
    localStorage.removeItem(`${STORAGE_VERSION}_drafts`);
    localStorage.removeItem(`${STORAGE_VERSION}_factors`);
    localStorage.removeItem(`${STORAGE_VERSION}_candidates`);

    setSearches(INITIAL_SEARCHES);
    setDrafts([]);
    setRankableFactors(INITIAL_RANKABLE_FACTORS);
    setCandidates(INITIAL_CANDIDATES);
    setShortlistedIds(['cand-a']);
    setStaleWarning(false);
    setBackgroundSearchActive(false);
    setIsSearching(false);
    setRunChips(['all', 'new', 'run-3', 'run-2', 'run-1']);
  };

  const setPlatformDFailedState = () => {
    setIsSearching(true);
    setSearchProgress(65);
    setPlatformStatuses({
      'platform-a': { searched: true, analyzed: true, listed: true, status: 'done', count: 6 },
      'platform-b': { searched: true, analyzed: true, listed: false, status: 'working', count: 4 },
      'platform-c': { searched: true, analyzed: false, listed: false, status: 'working', count: 2 },
      'platform-d': { searched: false, analyzed: false, listed: false, status: 'failed', count: 0 },
    });
  };

  const setEmptySearchesState = () => {
    setSearches([]);
    setDrafts([]);
  };

  return (
    <SearchWorkflowContext.Provider
      value={{
        searches,
        drafts,
        platforms,
        backgroundSearchActive,
        saveCurrentDraft,
        resumeDraft,
        deleteDraft,
        activeRoleId,
        requirementPrompt,
        setRequirementPrompt,
        attachments,
        addAttachment,
        removeAttachment,
        expectedOpeningDate,
        setExpectedOpeningDate,
        applyTemplate,
        currentJdVersion,
        setCurrentJdVersion,
        jobDescription,
        updateJobDescription,
        currentProfileVersion,
        setCurrentProfileVersion,
        idealProfile,
        updateIdealProfile,
        addProfileTag,
        removeProfileTag,
        rankableFactors,
        reorderFactors,
        moveFactorUpDown,
        addCustomFactor,
        resetSkillRanking,
        isRankingEditedFromRoute,
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
        isSearching,
        searchProgress,
        platformStatuses,
        startSearchSimulation,
        cancelSearchSimulation,
        retryPlatformD,
        fastForwardSearch,
        leaveAndNotifyMe,
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
        demoDrawerOpen,
        setDemoDrawerOpen,
        resetAllData,
        setPlatformDFailedState,
        setEmptySearchesState,
      }}
    >
      {children}
    </SearchWorkflowContext.Provider>
  );
};

export const useSearchWorkflow = () => {
  const context = useContext(SearchWorkflowContext);
  if (!context) {
    throw new Error('useSearchWorkflow must be used within a SearchWorkflowProvider');
  }
  return context;
};

const NEW_CANDIDATES_POOL = NEW_CANDIDATES_ON_RERUN;
