import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { IconSettings } from '../ui/Icons';

export interface UserMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
}

export const UserMenuModal: React.FC<UserMenuModalProps> = ({ isOpen, onClose, onOpenSettings }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm" title="User Profile">
      <div className="space-y-5">
        <div className="flex items-center gap-3.5 p-3.5 rounded-[10px] bg-[#f3f4f6] border border-[#e4e7ec]">
          <div className="w-12 h-12 rounded-full bg-[#ffffff] border border-[#d3d8df] flex items-center justify-center text-[#1c1d1f] font-semibold text-[16px] shadow-xs">
            AK
          </div>
          <div>
            <h4 className="text-[15px] font-semibold text-[#1c1d1f]">Akarshan</h4>
            <p className="text-[13px] text-[#6f7988]">Lead Talent Partner · Deep Tech & Niche Markets</p>
            <span className="inline-block mt-1 text-[11px] text-[#505967] bg-white border border-[#e4e7ec] px-2 py-0.5 rounded-[6px]">
              Enterprise North America
            </span>
          </div>
        </div>

        <div className="space-y-2 text-[14px]">
          <div className="flex items-center justify-between py-2 border-b border-[#e4e7ec]">
            <span className="text-[#6f7988]">Organization</span>
            <span className="text-[#1c1d1f] font-medium">Meridian Strategic Research</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-[#e4e7ec]">
            <span className="text-[#6f7988]">Active Pipelines</span>
            <span className="text-[#1c1d1f] font-medium">4 Proactive Searches</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-[#e4e7ec]">
            <span className="text-[#6f7988]">Connected Sourcing Engines</span>
            <span className="text-[#1c1d1f] font-medium">4 Active (Platform A–D)</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <Button
            variant="secondary"
            size="md"
            icon={<IconSettings size={15} />}
            onClick={() => {
              onClose();
              onOpenSettings();
            }}
            className="w-full justify-start"
          >
            Manage Platform Connections
          </Button>
          <Button
            variant="ghost"
            size="md"
            onClick={onClose}
            className="w-full justify-start text-[#6f7988]"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
