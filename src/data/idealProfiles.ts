export interface IdealProfileData {
  version: string;
  versionLabel: string;
  roleTitle: string;
  domainExperience: string[];
  coreSkills: string[];
  qualifications: string[];
  profileTitles: string[];
  evidences: string[];
  lastEdited: string;
}

export const INITIAL_IDEAL_PROFILES: Record<string, IdealProfileData[]> = {
  'statistical-economist-weather': [
    {
      version: '1',
      versionLabel: 'Version 1 (Synthesized from JD)',
      roleTitle: 'Statistical economist, weather patterns',
      domainExperience: ['Statistics', 'Meteorology', 'Economics'],
      coreSkills: [
        'Forecasting',
        'Time-series modelling',
        'Spatial statistics',
        'Econometrics',
        'Climate and weather data',
        'Communicating uncertainty',
      ],
      qualifications: [
        'Graduate degree in economics, statistics, atmospheric science or a related field.',
        'Applied work where weather or climate data fed an economic or business model.',
        'Experience presenting to planning or policy teams.',
      ],
      profileTitles: [
        'Econometrician',
        'Climate risk analyst',
        'Agricultural economist',
        'Actuarial analyst, catastrophe',
      ],
      evidences: [
        'Publications',
        'Datasets and code',
        'Conference talks',
        'Project history',
      ],
      lastEdited: 'Just now',
    },
    {
      version: '2',
      versionLabel: 'Version 2 (Expanded academic credentials)',
      roleTitle: 'Statistical economist & climate dynamicist',
      domainExperience: ['Econometrics', 'Mesoscale Meteorology', 'Stochastic Systems', 'Energy Markets'],
      coreSkills: [
        'Bayesian time-series',
        'Spatial econometrics',
        'ERA5 reanalysis pipelines',
        'Extreme value theory',
        'Communicating uncertainty',
        'Probabilistic power load modeling',
      ],
      qualifications: [
        'Ph.D. or Master’s in Applied Econometrics or Climate Risk Analytics.',
        'Minimum 4 years of applied empirical research linking atmospheric data to market indices.',
        'Proven history of publishing reproducible notebooks or computational code.',
      ],
      profileTitles: [
        'Econometrician',
        'Climate risk quantitative analyst',
        'Power load forecasting lead',
        'Catastrophe modeling researcher',
      ],
      evidences: [
        'Peer-reviewed publications',
        'Open-source modeling repositories',
        'Invited symposium talks',
        'Grid operator whitepapers',
      ],
      lastEdited: '3m ago',
    },
  ],
};
