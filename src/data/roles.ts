export interface CandidateSearch {
  id: string;
  title: string;
  summary: string;
  candidateCount: number;
  newCount?: number;
  shortlistedCount: number;
  lastUpdated: string;
  avatarSeed: string;
  status: 'active' | 'in-progress' | 'draft';
  expectedOpeningDate?: string;
  minFitPercentage: number;
  schedule: 'once' | 'daily' | 'weekly';
  stopCondition: 'role-date' | 'manual';
  connectedPlatforms: string[];
}

export const INITIAL_SEARCHES: CandidateSearch[] = [
  {
    id: 'bioinformatics-crop-genomics',
    title: 'Bioinformatics lead, crop genomics',
    summary: 'Direct sequencing pipelines and genome-wide association studies for drought-resistant crop phenotypes.',
    candidateCount: 48,
    newCount: 4,
    shortlistedCount: 2,
    lastUpdated: '7d ago',
    avatarSeed: 'bio',
    status: 'active',
    expectedOpeningDate: '2026-12-01',
    minFitPercentage: 75,
    schedule: 'weekly',
    stopCondition: 'role-date',
    connectedPlatforms: ['platform-a', 'platform-b', 'platform-c', 'platform-d'],
  },
  {
    id: 'climate-risk-quant',
    title: 'Climate risk quantitative analyst',
    summary: 'Build multivariate climate stress test models for commercial insurance underwriting and portfolio exposure.',
    candidateCount: 16,
    newCount: 0,
    shortlistedCount: 5,
    lastUpdated: '15d ago',
    avatarSeed: 'climate',
    status: 'active',
    expectedOpeningDate: '2026-11-15',
    minFitPercentage: 80,
    schedule: 'weekly',
    stopCondition: 'manual',
    connectedPlatforms: ['platform-a', 'platform-b', 'platform-c'],
  },
  {
    id: 'statistical-economist-weather',
    title: 'Statistical economist, weather patterns',
    summary: 'Model how weather variability affects regional demand and pricing, turning findings into operational forecasts.',
    candidateCount: 12,
    newCount: 0,
    shortlistedCount: 0,
    lastUpdated: '40d ago',
    avatarSeed: 'econ',
    status: 'active',
    expectedOpeningDate: '2027-02-01',
    minFitPercentage: 70,
    schedule: 'weekly',
    stopCondition: 'role-date',
    connectedPlatforms: ['platform-a', 'platform-b', 'platform-c', 'platform-d'],
  },
  {
    id: 'computational-linguist-clinical',
    title: 'Computational linguist, clinical notes',
    summary: 'Extract structured oncological biomarkers and clinical trial criteria from unstructured EHR physician records.',
    candidateCount: 33,
    newCount: 0,
    shortlistedCount: 4,
    lastUpdated: '>100d ago',
    avatarSeed: 'nlp',
    status: 'active',
    expectedOpeningDate: '2026-10-30',
    minFitPercentage: 72,
    schedule: 'weekly',
    stopCondition: 'manual',
    connectedPlatforms: ['platform-a', 'platform-b', 'platform-c', 'platform-d'],
  },
];

export interface RoleTemplate {
  id: string;
  title: string;
  prompt: string;
  expectedDate: string;
}

export const ROLE_TEMPLATES: RoleTemplate[] = [
  {
    id: 'bioinformatics-template',
    title: 'Bioinformatics lead, crop geno...',
    prompt: 'We need a senior bioinformatics lead with deep experience in crop genomics and polyploid sequencing pipelines. The candidate will design algorithms that identify yield-affecting genetic markers under severe thermal and moisture stress.',
    expectedDate: '2026-12-01',
  },
  {
    id: 'statistical-economist-template',
    title: 'Statistical economist, wea...',
    prompt: 'We need a statistical economist who specializes in weather patterns. They will model how weather variability affects regional demand and pricing, and explain the results to planning teams. The role opens in about four months.',
    expectedDate: '2027-02-01',
  },
  {
    id: 'computational-linguist-template',
    title: 'Computational linguist, clinical..',
    prompt: 'We are seeking a computational linguist who works with EHR and unstructured clinical consultation notes. They will build domain-specific biomedical language models to detect disease progression milestones across diverse hospital networks.',
    expectedDate: '2026-11-20',
  },
  {
    id: 'quantum-cryptography-template',
    title: 'Post-quantum cryptographic systems architect',
    prompt: 'Seeking a post-quantum cryptographer with experience in lattice-based key encapsulation and distributed ledger architectures to audit future migration blueprints.',
    expectedDate: '2027-03-15',
  },
  {
    id: 'hydrological-modelling-template',
    title: 'Spatial hydrologist, reservoir dispatch',
    prompt: 'Looking for a computational hydrologist specializing in snowpack melt runoff and reservoir dispatch optimization under extreme seasonal shift scenarios.',
    expectedDate: '2027-01-10',
  },
];
