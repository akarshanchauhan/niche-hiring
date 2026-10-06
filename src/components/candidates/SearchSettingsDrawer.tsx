import React, { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useSearchWorkflow } from '../../context/SearchWorkflowContext';

export interface SearchSettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchSettingsDrawer: React.FC<SearchSettingsDrawerProps> = ({ isOpen, onClose }) => {
  const {
    schedule,
    setSchedule,
    stopCondition,
    platforms,
    selectedPlatforms,
    togglePlatformSelection,
    setStaleWarning,
  } = useSearchWorkflow();

  const [isPaused, setIsPaused] = useState(false);

  const handleTogglePlatform = (id: string) => {
    togglePlatformSelection(id);
    setStaleWarning(true);
  };

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
    setStaleWarning(true);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Candidate Search Settings"
      subtitle="Manage recurring cadence, active platforms, or pause search pipeline."
      width="md"
    >
      <div className="space-y-6 text-[13px] text-[#1c1d1f]">
        {/* Pipeline Status */}
        <div className="p-4 rounded-[8px] bg-[#f3f4f6] border border-[#e4e7ec] space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#1c1d1f]">Pipeline Cadence</span>
            <Badge variant={isPaused ? 'warning' : 'success'}>
              {isPaused ? 'Paused' : `${schedule.charAt(0).toUpperCase() + schedule.slice(1)} Active`}
            </Badge>
          </div>
          <p className="text-[12px] text-[#6f7988]">
            {isPaused
              ? 'This search is currently paused. No scheduled runs will execute.'
              : `Automatically searching connected sources ${schedule} until ${
                  stopCondition === 'role-date' ? 'role opening date' : 'manually stopped'
                }.`}
          </p>
          <div className="pt-2">
            <Button
              variant={isPaused ? 'primary' : 'secondary'}
              size="sm"
              onClick={handleTogglePause}
              className="w-full"
            >
              {isPaused ? 'Resume Scheduled Pipeline' : 'Pause Pipeline'}
            </Button>
          </div>
        </div>

        {/* Cadence Selection */}
        <div className="space-y-3">
          <h4 className="text-[12px] font-semibold text-[#505967] uppercase tracking-wider">
            Execution Frequency
          </h4>
          <div className="space-y-2">
            {['once', 'daily', 'weekly'].map((cad) => (
              <label key={cad} className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="drawer-schedule"
                  value={cad}
                  checked={schedule === cad}
                  onChange={() => {
                    setSchedule(cad as any);
                    setStaleWarning(true);
                  }}
                  className="w-4 h-4 accent-[#1c1d1f]"
                />
                <span className="text-[#1c1d1f] capitalize">{cad === 'once' ? 'Run once' : `Run ${cad}`}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Connected Platforms Toggle */}
        <div className="space-y-3">
          <h4 className="text-[12px] font-semibold text-[#505967] uppercase tracking-wider">
            Connected Sourcing Engines
          </h4>
          <div className="divide-y divide-[#e4e7ec]">
            {platforms.map((platform) => {
              const isConnected = platform.status === 'connected';
              const isSelected = selectedPlatforms.includes(platform.id);

              return (
                <div key={platform.id} className="py-2.5 flex items-center justify-between">
                  <label className={`flex items-center gap-2.5 cursor-pointer ${!isConnected ? 'opacity-50' : ''}`}>
                    <input
                      type="checkbox"
                      checked={isSelected && isConnected}
                      disabled={!isConnected}
                      onChange={() => handleTogglePlatform(platform.id)}
                      className="w-4 h-4 rounded accent-[#1c1d1f]"
                    />
                    <div>
                      <span className="text-[#1c1d1f] font-semibold">{platform.name}</span>
                      <span className="block text-[11px] text-[#8f99a8]">{platform.statusLabel}</span>
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-[#e4e7ec] flex justify-end">
          <Button variant="primary" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
