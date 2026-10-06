export interface PlatformConfig {
  id: string;
  name: string;
  code: string;
  status: 'connected' | 'expired' | 'disconnected';
  statusLabel: string;
  description: string;
  lastSync?: string;
  candidateCount?: number;
}

export const PLATFORMS_DATA: PlatformConfig[] = [
  {
    id: 'platform-a',
    name: 'Platform A',
    code: 'PL-A',
    status: 'connected',
    statusLabel: 'Connected',
    description: 'Cross-platform professional profile and credentials registry',
    lastSync: '12m ago',
    candidateCount: 18,
  },
  {
    id: 'platform-b',
    name: 'Platform B',
    code: 'PL-B',
    status: 'connected',
    statusLabel: 'Connected',
    description: 'Open code repositories, modeling scripts, and computational notebooks',
    lastSync: '1h ago',
    candidateCount: 14,
  },
  {
    id: 'platform-c',
    name: 'Platform C',
    code: 'PL-C',
    status: 'connected',
    statusLabel: 'Connected',
    description: 'Academic preprint index, citations, and peer-reviewed journal papers',
    lastSync: '3h ago',
    candidateCount: 9,
  },
  {
    id: 'platform-d',
    name: 'Platform D',
    code: 'PL-D',
    status: 'connected',
    statusLabel: 'Connected',
    description: 'Predictive modeling competitions, open datasets, and shared kernels',
    lastSync: '25m ago',
    candidateCount: 7,
  },
  {
    id: 'platform-e',
    name: 'Platform E',
    code: 'PL-E',
    status: 'expired',
    statusLabel: 'Access expired, reconnect in settings',
    description: 'Specialized scientific working paper network and author index',
    lastSync: '14d ago',
  },
  {
    id: 'platform-f',
    name: 'Platform F',
    code: 'PL-F',
    status: 'disconnected',
    statusLabel: 'Not connected',
    description: 'Early-stage venture talent and boutique research listings',
  },
];
