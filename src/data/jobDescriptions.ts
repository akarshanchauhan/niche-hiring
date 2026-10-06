export interface JobDescriptionSection {
  id: string;
  title: string;
  items: string[];
}

export interface JobDescriptionData {
  version: string;
  versionLabel: string;
  title: string;
  summary: string;
  sections: {
    whatYouWillDo: string[];
    requiredQualifications: string[];
    niceToHave: string[];
  };
  lastEdited: string;
}

export const INITIAL_JOB_DESCRIPTIONS: Record<string, JobDescriptionData[]> = {
  'statistical-economist-weather': [
    {
      version: '1',
      versionLabel: 'Version 1 (Initial AI draft)',
      title: 'Statistical Economist, Weather Patterns',
      summary: 'Model how weather variability shapes regional demand and pricing, and turn the findings into forecasts that planning teams can act on.',
      sections: {
        whatYouWillDo: [
          'Build statistical models that link weather data to economic outcomes.',
          'Test how seasonal and extreme weather change demand and prices by region.',
          'Present results and uncertainty to non-technical planning teams.',
          'Work with climate scientists and economists to choose data and methods.',
        ],
        requiredQualifications: [
          'Graduate degree in economics, statistics or a related field.',
          'Experience with time-series and spatial statistical methods.',
          'Working knowledge of climate or meteorological data.',
          'Experience explaining model results to non-technical audiences.',
        ],
        niceToHave: [
          'Published research linking weather and economic data.',
          'Experience with probabilistic forecasting.',
        ],
      },
      lastEdited: 'Just now',
    },
    {
      version: '2',
      versionLabel: 'Version 2 (More technical precision)',
      title: 'Senior Quantitative Economist, Climate & Weather Dynamics',
      summary: 'Develop econometric and spatio-temporal stochastic models linking mesoscale atmospheric anomalies to commodity spot prices and grid demand.',
      sections: {
        whatYouWillDo: [
          'Formulate Bayesian hierarchical time-series models connecting gridded meteorological inputs (ECMWF, HRRR) to commercial load profiles.',
          'Calibrate extreme-value econometric regressions across regional power pools and retail distribution nodes.',
          'Deliver transparent probability distributions and scenario stress-tests to portfolio risk committees.',
          'Collaborate with atmospheric modelers and quant developers to maintain reproducible data pipelines.',
        ],
        requiredQualifications: [
          'Ph.D. or Master’s in Applied Econometrics, Quantitative Economics, or Atmospheric Statistics.',
          'Demonstrated expertise in spatial econometrics (SAR/SEM) and cointegration analysis.',
          'Proficiency with high-volume gridded climate reanalysis datasets (ERA5, NOAA NARR).',
          'Track record of translating empirical econometric findings for senior executive stakeholders.',
        ],
        niceToHave: [
          'Peer-reviewed publications in environmental economics or energy finance.',
          'Production experience with Stan, PyMC, or high-performance econometric libraries in R/Julia.',
        ],
      },
      lastEdited: '5m ago',
    },
  ],
};
