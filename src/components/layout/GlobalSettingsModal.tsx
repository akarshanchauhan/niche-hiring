import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useSearchWorkflow } from '../../context/SearchWorkflowContext';
import { IconCheck } from '../ui/Icons';

export interface GlobalSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSettingsModal: React.FC<GlobalSettingsModalProps> = ({ isOpen, onClose }) => {
  const { platforms } = useSearchWorkflow();
  const [activePlatforms, setActivePlatforms] = useState(platforms);
  const [reconnectingId, setReconnectingId] = useState<string | null>(null);

  const handleReconnect = (id: string) => {
    setReconnectingId(id);
    setTimeout(() => {
      setActivePlatforms(prev =>
        prev.map(p =>
          p.id === id
            ? { ...p, status: 'connected', statusLabel: 'Connected', lastSync: 'Just now' }
            : p
        )
      );
      setReconnectingId(null);
    }, 1000);
  };

  const handleConnect = (id: string) => {
    setReconnectingId(id);
    setTimeout(() => {
      setActivePlatforms(prev =>
        prev.map(p =>
          p.id === id
            ? { ...p, status: 'connected', statusLabel: 'Connected', lastSync: 'Just now' }
            : p
        )
      );
      setReconnectingId(null);
    }, 1000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Global Platform Connections"
      description="Manage API credentials and synchronization health across candidate sourcing platforms."
      maxWidth="lg"
    >
      <div className="space-y-4">
        <div className="divide-y divide-[#e4e7ec]">
          {activePlatforms.map((platform) => {
            const isReconnecting = reconnectingId === platform.id;

            return (
              <div key={platform.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="font-semibold text-[#1c1d1f] text-[15px]">
                      {platform.name}
                    </span>
                    {platform.status === 'connected' && (
                      <Badge variant="success">Connected</Badge>
                    )}
                    {platform.status === 'expired' && (
                      <Badge variant="warning">Access expired</Badge>
                    )}
                    {platform.status === 'disconnected' && (
                      <Badge variant="default">Not connected</Badge>
                    )}
                  </div>
                  <p className="text-[13px] text-[#6f7988] mt-0.5 truncate">
                    {platform.description}
                  </p>
                  {platform.lastSync && (
                    <span className="text-[11px] text-[#8f99a8]">
                      Last synchronized: {platform.lastSync}
                    </span>
                  )}
                </div>

                <div className="shrink-0">
                  {platform.status === 'connected' ? (
                    <Button variant="hairline" size="sm" disabled>
                      <IconCheck size={14} className="text-[#075a39]" />
                      Active
                    </Button>
                  ) : platform.status === 'expired' ? (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleReconnect(platform.id)}
                      disabled={isReconnecting}
                    >
                      {isReconnecting ? 'Renewing...' : 'Reconnect'}
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleConnect(platform.id)}
                      disabled={isReconnecting}
                    >
                      {isReconnecting ? 'Connecting...' : 'Connect'}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 flex justify-end border-t border-[#e4e7ec]">
          <Button variant="primary" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
};
