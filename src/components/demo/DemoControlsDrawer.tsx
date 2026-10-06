import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useSearchWorkflow } from '../../context/SearchWorkflowContext';
import { IconRotateCcw } from '../ui/Icons';

export const DemoControlsDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    demoDrawerOpen,
    setDemoDrawerOpen,
    resetAllData,
    setPlatformDFailedState,
    setEmptySearchesState,
    fastForwardSearch,
    setStaleWarning,
  } = useSearchWorkflow();

  // Keyboard shortcut listener: Alt+D or Ctrl+Shift+D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'd') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd')) {
        e.preventDefault();
        setDemoDrawerOpen(!demoDrawerOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [demoDrawerOpen, setDemoDrawerOpen]);

  const jumpTo = (path: string) => {
    navigate(path);
    setDemoDrawerOpen(false);
  };

  return (
    <>
      {/* Discreet floating trigger pill */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => setDemoDrawerOpen(true)}
          aria-label="Open reviewer demo controls"
          className="flex items-center gap-2 bg-[#1c1d1f] hover:bg-[#2b2d31] border border-[#1c1d1f] text-white px-3.5 py-2 rounded-full text-[12px] font-medium shadow-lg transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#407ff2] focus-visible:outline-offset-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#407ff2] animate-pulse" />
          <span>Demo Controls</span>
          <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded font-mono">Alt+D</span>
        </button>
      </div>

      {/* Slide-over drawer */}
      <Drawer
        isOpen={demoDrawerOpen}
        onClose={() => setDemoDrawerOpen(false)}
        title="Reviewer Demo Controls"
        subtitle="Instantly jump to any flow screen, edge case, failure state, or toggle simulation timings."
        width="md"
      >
        <div className="space-y-6 text-[13px] text-[#1c1d1f]">
          {/* Quick Actions / Simulations */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-semibold text-[#6f7988] uppercase tracking-wider">
              Search Controls & Edge Cases
            </h4>
            <div className="flex flex-col gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  fastForwardSearch();
                  jumpTo('/search/statistical-economist-weather/candidates');
                }}
                className="w-full justify-between"
              >
                <span>Fast-forward search to 100%</span>
                <span className="text-[11px] opacity-75">Instant Finish</span>
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setPlatformDFailedState();
                  jumpTo('/search/new/searching');
                }}
                className="w-full justify-between"
              >
                <span>Simulate Platform D Error (Frame 128)</span>
                <Badge variant="warning">Fail state</Badge>
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setStaleWarning(true);
                  jumpTo('/search/statistical-economist-weather/candidates');
                }}
                className="w-full justify-between"
              >
                <span>Trigger Stale Ranking Banner (Frame 130)</span>
                <Badge variant="ai">Warning state</Badge>
              </Button>
            </div>
          </div>

          {/* Flow Jump Points */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-semibold text-[#6f7988] uppercase tracking-wider">
              Core Screens in Flow Order
            </h4>
            <div className="grid grid-cols-1 gap-1.5">
              <button
                type="button"
                onClick={() => jumpTo('/')}
                className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#f3f4f6] hover:bg-[#e4e7ec] border border-[#e4e7ec] text-left transition-colors cursor-pointer text-[#1c1d1f]"
              >
                <span className="font-medium">1. Dashboard / Home</span>
                <span className="text-[11px] text-[#6f7988]">4 active searches</span>
              </button>

              <button
                type="button"
                onClick={() => jumpTo('/search/new/requirement')}
                className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#f3f4f6] hover:bg-[#e4e7ec] border border-[#e4e7ec] text-left transition-colors cursor-pointer text-[#1c1d1f]"
              >
                <span className="font-medium">2. Step 1: Role Requirement</span>
                <span className="text-[11px] text-[#6f7988]">Filled & uploads</span>
              </button>

              <button
                type="button"
                onClick={() => jumpTo('/search/new/job-description')}
                className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#f3f4f6] hover:bg-[#e4e7ec] border border-[#e4e7ec] text-left transition-colors cursor-pointer text-[#1c1d1f]"
              >
                <span className="font-medium">3. Step 2: Job Description</span>
                <span className="text-[11px] text-[#6f7988]">AI copilot + edit</span>
              </button>

              <button
                type="button"
                onClick={() => jumpTo('/search/new/ideal-profile')}
                className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#f3f4f6] hover:bg-[#e4e7ec] border border-[#e4e7ec] text-left transition-colors cursor-pointer text-[#1c1d1f]"
              >
                <span className="font-medium">4. Step 3: Ideal Candidate Profile</span>
                <span className="text-[11px] text-[#6f7988]">Interactive tags</span>
              </button>

              <button
                type="button"
                onClick={() => jumpTo('/search/new/skill-ranking')}
                className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#f3f4f6] hover:bg-[#e4e7ec] border border-[#e4e7ec] text-left transition-colors cursor-pointer text-[#1c1d1f]"
              >
                <span className="font-medium">5. Step 4: Skill Ranking</span>
                <span className="text-[11px] text-[#6f7988]">Drag & drop ranks</span>
              </button>

              <button
                type="button"
                onClick={() => jumpTo('/search/new/search-setup')}
                className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#f3f4f6] hover:bg-[#e4e7ec] border border-[#e4e7ec] text-left transition-colors cursor-pointer text-[#1c1d1f]"
              >
                <span className="font-medium">6. Step 5: Search Setup</span>
                <span className="text-[11px] text-[#6f7988]">Fit slider & cadence</span>
              </button>

              <button
                type="button"
                onClick={() => jumpTo('/search/new/searching')}
                className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#f3f4f6] hover:bg-[#e4e7ec] border border-[#e4e7ec] text-left transition-colors cursor-pointer text-[#1c1d1f]"
              >
                <span className="font-medium">7. Step 5.1: Live Searching</span>
                <span className="text-[11px] text-[#6f7988]">Staged platform status</span>
              </button>

              <button
                type="button"
                onClick={() => jumpTo('/search/statistical-economist-weather/candidates')}
                className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#f3f4f6] hover:bg-[#e4e7ec] border border-[#e4e7ec] text-left transition-colors cursor-pointer text-[#1c1d1f]"
              >
                <span className="font-medium">8. Step 6: Candidates Shortlist</span>
                <span className="text-[11px] text-[#6f7988]">48 candidates table</span>
              </button>
            </div>
          </div>

          {/* Edit Routes */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-semibold text-[#6f7988] uppercase tracking-wider">
              Dedicated Edit Routes (/search/:id/...)
            </h4>
            <div className="grid grid-cols-1 gap-1.5">
              <button
                type="button"
                onClick={() => jumpTo('/search/statistical-economist-weather/skill-ranking')}
                className="flex items-center justify-between p-2 rounded-[6px] bg-[#f3f4f6] hover:bg-[#e4e7ec] border border-[#e4e7ec] text-left transition-colors cursor-pointer text-[#1c1d1f]"
              >
                <span className="font-medium">Edit: Skill Ranking</span>
                <span className="text-[11px] text-[#6f7988]">Re-sorts & triggers stale</span>
              </button>
              <button
                type="button"
                onClick={() => jumpTo('/search/statistical-economist-weather/ideal-profile')}
                className="flex items-center justify-between p-2 rounded-[6px] bg-[#f3f4f6] hover:bg-[#e4e7ec] border border-[#e4e7ec] text-left transition-colors cursor-pointer text-[#1c1d1f]"
              >
                <span className="font-medium">Edit: Ideal Profile</span>
                <span className="text-[11px] text-[#6f7988]">Returns to candidates</span>
              </button>
              <button
                type="button"
                onClick={() => jumpTo('/search/statistical-economist-weather/job-description')}
                className="flex items-center justify-between p-2 rounded-[6px] bg-[#f3f4f6] hover:bg-[#e4e7ec] border border-[#e4e7ec] text-left transition-colors cursor-pointer text-[#1c1d1f]"
              >
                <span className="font-medium">Edit: Job Description</span>
                <span className="text-[11px] text-[#6f7988]">Returns to candidates</span>
              </button>
            </div>
          </div>

          {/* Empty & Reset states */}
          <div className="space-y-2.5 pt-2 border-t border-[#e4e7ec]">
            <h4 className="text-[11px] font-semibold text-[#6f7988] uppercase tracking-wider">
              Environment Reset
            </h4>
            <div className="flex gap-2">
              <Button
                variant="hairline"
                size="sm"
                onClick={setEmptySearchesState}
                className="flex-1"
              >
                Test 0 Searches Empty State
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={<IconRotateCcw size={14} />}
                onClick={() => {
                  resetAllData();
                  jumpTo('/');
                }}
                className="flex-1"
              >
                Reset All State
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};
