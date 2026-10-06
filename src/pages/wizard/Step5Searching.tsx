import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchWorkflow } from '../../context/SearchWorkflowContext';
import { Stepper } from '../../components/ui/Stepper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  IconArrowLeft,
  IconCheck,
  IconX,
  IconRotateCcw,
} from '../../components/ui/Icons';

export const Step5Searching: React.FC = () => {
  const navigate = useNavigate();
  const {
    searchProgress,
    platformStatuses,
    retryPlatformD,
    cancelSearchSimulation,
    leaveAndNotifyMe,
    idealProfile,
  } = useSearchWorkflow();

  const [, setActiveStepTimer] = useState<number>(0);
  const [retrying, setRetrying] = useState(false);

  // Progressive simulation: advances platforms every 1.5s unless fast-forwarded
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStepTimer((prev) => prev + 1);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const totalCandidatesFound = Object.values(platformStatuses).reduce(
    (acc, curr) => acc + (curr.count || 0),
    0
  ) || 12;

  const handleRetry = () => {
    setRetrying(true);
    retryPlatformD();
    setTimeout(() => setRetrying(false), 1400);
  };

  const handleLeaveAndNotify = () => {
    leaveAndNotifyMe();
    navigate('/');
  };

  const handleCancel = () => {
    cancelSearchSimulation();
    navigate('/');
  };

  return (
    <div className="space-y-6 max-w-[1140px] mx-auto animate-in fade-in duration-200">
      {/* Stepper */}
      <Stepper currentStep={5} />

      {/* Back to home */}
      <div>
        <Button
          variant="secondary"
          size="sm"
          icon={<IconArrowLeft size={14} />}
          onClick={handleLeaveAndNotify}
        >
          Back to home
        </Button>
      </div>

      {/* Main Header */}
      <div className="space-y-1">
        <h1 className="text-[24px] sm:text-[28px] font-medium text-[#1c1d1f] font-serif">
          Searching for candidates
        </h1>
        <p className="text-[14px] text-[#6f7988]">
          First run of weekly search
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Progress Card & Platforms Status Matrix */}
        <div className="lg:col-span-8 space-y-5">
          {/* Top Progress Card */}
          <Card variant="graphite" padding="md" className="space-y-4 border-[#e4e7ec]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[8px] bg-[#f3f4f6] border border-[#d3d8df] flex items-center justify-center text-[#1c1d1f] font-semibold text-[14px]">
                  EP
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#1c1d1f]">
                    {idealProfile.roleTitle}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="ai" size="sm">
                      AI Searching, analysing and shortlisting
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-[#f3f4f6] rounded-full h-2 overflow-hidden border border-[#e4e7ec]">
                <div
                  className="bg-[#1c1d1f] h-full transition-all duration-700 rounded-full"
                  style={{ width: `${Math.min(100, Math.max(25, searchProgress))}%` }}
                />
              </div>
              <p className="text-[12px] text-[#6f7988]">
                Platforms finish at different speeds. Results appear as each one completes.
              </p>
            </div>
          </Card>

          {/* Platforms Status Table */}
          <Card variant="graphite" padding="none" className="overflow-hidden border-[#e4e7ec]">
            <div className="divide-y divide-[#e4e7ec]">
              {/* Platform A */}
              <div className="p-4 sm:px-6 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h4 className="text-[14px] font-semibold text-[#1c1d1f]">Platform A</h4>
                  <div className="flex items-center gap-3 mt-1.5 text-[12px] text-[#6f7988]">
                    <span className="flex items-center gap-1 text-[#1c1d1f] font-medium">
                      Searched <IconCheck size={13} className="text-[#075a39]" />
                    </span>
                    <span className="flex items-center gap-1 text-[#1c1d1f] font-medium">
                      Analyzed <IconCheck size={13} className="text-[#075a39]" />
                    </span>
                    <span className="flex items-center gap-1 text-[#1c1d1f] font-medium">
                      Candidates listed <IconCheck size={13} className="text-[#075a39]" />
                    </span>
                  </div>
                </div>
                <Badge variant="success" size="md">
                  Done (6 candidates)
                </Badge>
              </div>

              {/* Platform B */}
              <div className="p-4 sm:px-6 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h4 className="text-[14px] font-semibold text-[#1c1d1f]">Platform B</h4>
                  <div className="flex items-center gap-3 mt-1.5 text-[12px] text-[#6f7988]">
                    <span className="flex items-center gap-1 text-[#1c1d1f] font-medium">
                      Searched <IconCheck size={13} className="text-[#075a39]" />
                    </span>
                    <span className="flex items-center gap-1 text-[#407ff2] font-medium">
                      Analyzing <span className="w-2.5 h-2.5 border-2 border-[#407ff2] border-t-transparent rounded-full animate-spin" />
                    </span>
                    <span className="flex items-center gap-1 text-[#8f99a8]">
                      Candidates listed ⏳
                    </span>
                  </div>
                </div>
                <Badge variant="warning" size="md">
                  Working..
                </Badge>
              </div>

              {/* Platform C */}
              <div className="p-4 sm:px-6 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h4 className="text-[14px] font-semibold text-[#1c1d1f]">Platform C</h4>
                  <div className="flex items-center gap-3 mt-1.5 text-[12px] text-[#6f7988]">
                    <span className="flex items-center gap-1 text-[#407ff2] font-medium">
                      Searching <span className="w-2.5 h-2.5 border-2 border-[#407ff2] border-t-transparent rounded-full animate-spin" />
                    </span>
                    <span className="flex items-center gap-1 text-[#8f99a8]">
                      Analyzed ⏳
                    </span>
                    <span className="flex items-center gap-1 text-[#8f99a8]">
                      Candidates listed ⏳
                    </span>
                  </div>
                </div>
                <Badge variant="default" size="md">
                  Working..
                </Badge>
              </div>

              {/* Platform D (Frame 128 Error State) */}
              <div className="p-4 sm:px-6 flex items-center justify-between gap-4 bg-[#fef2f2]/60 border-l-2 border-l-[#b91c1c]">
                <div className="min-w-0">
                  <h4 className="text-[14px] font-semibold text-[#1c1d1f]">Platform D</h4>
                  <div className="flex items-center gap-3 mt-1.5 text-[12px]">
                    <span className="flex items-center gap-1 text-[#b91c1c] font-medium">
                      Searching <IconX size={13} className="text-[#b91c1c]" />
                    </span>
                    <span className="flex items-center gap-1 text-[#8f99a8]">
                      Analyzed ⏳
                    </span>
                    <span className="flex items-center gap-1 text-[#8f99a8]">
                      Candidates listed ⏳
                    </span>
                  </div>
                  <p className="text-[11px] text-[#b91c1c] mt-1">
                    Could not reach this platform. Check for issues or credentials.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <Badge variant="warning">Failed</Badge>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<IconRotateCcw size={12} />}
                    onClick={handleRetry}
                    disabled={retrying}
                  >
                    {retrying ? 'Retrying...' : 'Retry'}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Results & Leave Options */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: Results so far */}
          <Card variant="graphite" padding="md" className="space-y-3 border-[#e4e7ec]">
            <span className="text-[11px] font-semibold text-[#6f7988] uppercase tracking-wider block">
              Results so far
            </span>
            <div className="text-[28px] sm:text-[34px] font-medium text-[#1c1d1f] font-serif">
              {totalCandidatesFound} candidates
            </div>
            <p className="text-[13px] text-[#6f7988] leading-relaxed">
              From the platforms that have finished. The list updates as the rest complete.
            </p>
            <div className="pt-2">
              <Button
                variant="secondary"
                size="md"
                onClick={() => navigate('/search/statistical-economist-weather/candidates')}
                className="w-full"
              >
                View partial list
              </Button>
            </div>
          </Card>

          {/* Card 2: You can leave this page */}
          <Card variant="graphite" padding="md" className="space-y-3 border-[#e4e7ec]">
            <h3 className="text-[15px] font-medium text-[#1c1d1f] font-serif">
              You can leave this page
            </h3>
            <p className="text-[13px] text-[#6f7988] leading-relaxed">
              The search keeps running. We will notify you when the first full results are ready.
            </p>
            <div className="pt-2 space-y-2">
              <Button
                variant="primary"
                size="md"
                onClick={handleLeaveAndNotify}
                className="w-full"
              >
                Leave and notify me
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={handleCancel}
                className="w-full text-[#6f7988]"
              >
                Cancel search
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
