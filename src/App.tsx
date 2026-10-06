import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SearchWorkflowProvider } from './context/SearchWorkflowContext';
import { AppShell } from './components/layout/AppShell';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Step1Requirement } from './pages/wizard/Step1Requirement';
import { Step2JobDescription } from './pages/wizard/Step2JobDescription';
import { Step3IdealProfile } from './pages/wizard/Step3IdealProfile';
import { Step4SkillRanking } from './pages/wizard/Step4SkillRanking';
import { Step5SearchSetup } from './pages/wizard/Step5SearchSetup';
import { Step5Searching } from './pages/wizard/Step5Searching';
import { CandidatesView } from './pages/CandidatesView';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SearchWorkflowProvider>
        <AppShell>
          <Routes>
            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Creation Wizard Routes */}
            <Route path="/search/new/requirement" element={<Step1Requirement />} />
            <Route path="/search/new/job-description" element={<Step2JobDescription />} />
            <Route path="/search/new/ideal-profile" element={<Step3IdealProfile />} />
            <Route path="/search/new/skill-ranking" element={<Step4SkillRanking />} />
            <Route path="/search/new/search-setup" element={<Step5SearchSetup />} />
            <Route path="/search/new/searching" element={<Step5Searching />} />

            {/* Candidates Results Hub */}
            <Route path="/search/:id/candidates" element={<CandidatesView />} />

            {/* Dedicated Edit Routes (User Instruction 2) */}
            <Route path="/search/:id/job-description" element={<Step2JobDescription />} />
            <Route path="/search/:id/ideal-profile" element={<Step3IdealProfile />} />
            <Route path="/search/:id/skill-ranking" element={<Step4SkillRanking />} />
            <Route path="/search/:id/search-settings" element={<Step5SearchSetup />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppShell>
      </SearchWorkflowProvider>
    </BrowserRouter>
  );
};

export default App;
