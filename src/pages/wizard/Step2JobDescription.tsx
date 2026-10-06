import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSearchWorkflow } from '../../context/SearchWorkflowContext';
import { Stepper } from '../../components/ui/Stepper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ShareModal } from '../../components/candidates/ShareModal';
import {
  IconArrowLeft,
  IconArrowRight,
  IconShare,
  IconSave,
  IconEdit,
  IconSparkles,
  IconCheck,
  IconFileText,
} from '../../components/ui/Icons';

export const Step2JobDescription: React.FC = () => {
  const navigate = useNavigate();
  const { id: routeRoleId } = useParams();
  const isEditRoute = Boolean(routeRoleId);

  const {
    jobDescription,
    updateJobDescription,
    currentJdVersion,
    setCurrentJdVersion,
    requirementPrompt,
    attachments,
    saveCurrentDraft,
    setStaleWarning,
  } = useSearchWorkflow();

  const [shareOpen, setShareOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isCopilotTyping, setIsCopilotTyping] = useState(false);
  const [draftSavedToast, setDraftSavedToast] = useState(false);

  // Chat message thread
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; files?: string[] }>>([
    {
      sender: 'user',
      text: requirementPrompt,
      files: attachments.map(a => a.name),
    },
    {
      sender: 'ai',
      text: 'I have synthesized the role requirements into a structured job description. The draft highlights econometrics with gridded meteorological modeling.',
    },
  ]);

  // Active inline editing states for sections
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(jobDescription.title);

  const [editingSummary, setEditingSummary] = useState(false);
  const [summaryValue, setSummaryValue] = useState(jobDescription.summary);

  const suggestions = ['Shorter', 'More technical', 'Plainer language', 'Highlight climate data'];

  const handleSendChat = (textToSend?: string) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    // Add user message
    setChatMessages(prev => [...prev, { sender: 'user', text: query }]);
    setChatInput('');
    setIsCopilotTyping(true);

    if (isEditRoute) {
      setStaleWarning(true);
    }

    setTimeout(() => {
      setIsCopilotTyping(false);
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `Applied changes for: "${query}". I have adjusted the qualifications and responsibilities accordingly.`,
        },
      ]);

      // If requested "More technical", switch or update to v2
      if (query.toLowerCase().includes('technical')) {
        setCurrentJdVersion('2');
      } else {
        // Append refinement to summary
        updateJobDescription(
          {
            summary: `${jobDescription.summary} (Refined: ${query})`,
          },
          isEditRoute
        );
      }
    }, 900);
  };

  const handleSaveDraft = () => {
    saveCurrentDraft(2, 'Job description review');
    setDraftSavedToast(true);
    setTimeout(() => setDraftSavedToast(false), 2500);
  };

  const handleSectionPrompt = (sectionName: string) => {
    setChatInput(`Revise the "${sectionName}" section to emphasize: `);
  };

  const handleSaveInline = () => {
    updateJobDescription(
      {
        title: titleValue,
        summary: summaryValue,
      },
      isEditRoute
    );
    setEditingTitle(false);
    setEditingSummary(false);
  };

  const handlePrimaryProceed = () => {
    if (isEditRoute) {
      navigate(`/search/${routeRoleId}/candidates`);
    } else {
      navigate('/search/new/ideal-profile');
    }
  };

  return (
    <div className="space-y-6 max-w-[1140px] mx-auto animate-in fade-in duration-200">
      {/* Stepper */}
      {!isEditRoute && <Stepper currentStep={2} />}

      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          size="sm"
          icon={<IconArrowLeft size={14} />}
          onClick={() => {
            if (isEditRoute) {
              navigate(`/search/${routeRoleId}/candidates`);
            } else {
              navigate('/search/new/requirement');
            }
          }}
        >
          {isEditRoute ? 'Back to candidates' : 'Back'}
        </Button>

        {isEditRoute && (
          <Badge variant="warning">Edit mode · Updates flag re-run</Badge>
        )}
      </div>

      {/* Split layout: Copilot on Left, Document on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: AI Copilot */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <div className="space-y-1 pb-4 mb-4 border-b border-[#e4e7ec]">
            <h2 className="text-[20px] font-medium text-[#1c1d1f] font-serif">
              Job description
            </h2>
            <p className="text-[13px] text-[#6f7988] leading-relaxed">
              Drafted from your input prompt and attached documents. Edit any section inline on the right, or prompt AI to refine it below.
            </p>
          </div>

          {/* Conversation thread & input (not enclosed in a card, stretches down to align bottom) */}
          <div className="flex-1 flex flex-col justify-between min-h-0">
            {/* Scrollable messages container */}
            <div className="space-y-3.5 overflow-y-auto pr-1 flex-1">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[90%] p-3.5 rounded-[10px] text-[13px] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#1c1d1f] text-white shadow-xs'
                        : 'bg-white border border-[#e4e7ec] text-[#1c1d1f] shadow-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    {msg.files && msg.files.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-white/20">
                        {msg.files.map(f => (
                          <span key={f} className="text-[11px] bg-white/10 text-white px-2 py-0.5 rounded-[4px] flex items-center gap-1">
                            <IconFileText size={11} /> {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-[#8f99a8] mt-1 px-1">
                    {msg.sender === 'user' ? 'Hiring Lead' : 'Platform Copilot'}
                  </span>
                </div>
              ))}

              {isCopilotTyping && (
                <div className="flex items-center gap-2 text-[12px] text-[#6f7988] p-2 bg-white rounded-[8px] border border-[#e4e7ec] w-fit shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#407ff2] animate-bounce" />
                  <span>AI is refining the job description...</span>
                </div>
              )}
            </div>

            {/* Suggestions & Input area - flush at bottom */}
            <div className="pt-4 mt-auto space-y-2.5">
              <div>
                <span className="text-[10px] font-semibold text-[#8f99a8] uppercase tracking-wider block mb-1.5">
                  Suggestions
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => handleSendChat(sug)}
                      className="text-[12px] px-2.5 py-1 rounded-[6px] bg-white hover:bg-[#f3f4f6] border border-[#d3d8df] text-[#1c1d1f] hover:border-[#8f99a8] transition-colors cursor-pointer shadow-xs"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white border border-[#d3d8df] rounded-[8px] p-1.5 focus-within:border-[#407ff2] focus-within:ring-2 focus-within:ring-[#94b9ff]/40 shadow-xs">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendChat();
                  }}
                  placeholder="Type your changes .."
                  className="flex-1 bg-transparent text-[13px] text-[#1c1d1f] px-2 py-1 focus:outline-none placeholder-[#b5bdc9]"
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleSendChat()}
                  disabled={!chatInput.trim() || isCopilotTyping}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Artefact Document */}
        <div className="lg:col-span-7 flex flex-col h-full">
          {/* Top header with Version Dropdown and Share button */}
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#6f7988]">Viewing:</span>
              <select
                value={currentJdVersion}
                onChange={(e) => {
                  setCurrentJdVersion(e.target.value);
                  if (isEditRoute) setStaleWarning(true);
                }}
                className="bg-white border border-[#d3d8df] text-[#1c1d1f] text-[13px] rounded-[8px] px-3 py-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#407ff2] shadow-xs"
              >
                <option value="1">Version 1 (Initial AI draft)</option>
                <option value="2">Version 2 (More technical precision)</option>
              </select>
            </div>
            <Button
              variant="secondary"
              size="sm"
              icon={<IconShare size={14} />}
              onClick={() => setShareOpen(true)}
            >
              Share
            </Button>
          </div>

          <Card variant="graphite" padding="lg" className="space-y-6 flex-1 border-[#e4e7ec] flex flex-col justify-between">
            {/* Title Section (Click to edit) */}
            <div className="group relative">
              {editingTitle ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                    className="flex-1 bg-white border border-[#407ff2] text-[20px] font-medium text-[#1c1d1f] px-3 py-1 rounded-[8px]"
                  />
                  <Button variant="primary" size="sm" onClick={handleSaveInline}>Save</Button>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setTitleValue(jobDescription.title);
                    setEditingTitle(true);
                  }}
                  className="cursor-pointer hover:bg-[#f3f4f6] p-1 rounded-[8px] transition-colors flex items-center justify-between"
                >
                  <h3 className="text-[20px] sm:text-[24px] font-medium text-[#1c1d1f] font-serif">
                    {jobDescription.title}
                  </h3>
                  <span className="opacity-0 group-hover:opacity-100 text-[#6f7988] text-[12px] flex items-center gap-1 transition-opacity">
                    <IconEdit size={12} /> Edit
                  </span>
                </div>
              )}
            </div>

            {/* Summary Section */}
            <div className="group relative space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="text-[15px] font-medium text-[#1c1d1f] font-serif">
                  Summary
                </h4>
                <button
                  type="button"
                  onClick={() => handleSectionPrompt('Summary')}
                  className="opacity-0 group-hover:opacity-100 text-[11px] text-[#6f7988] hover:text-[#1c1d1f] transition-opacity cursor-pointer flex items-center gap-1"
                >
                  <IconSparkles size={12} /> Ask AI
                </button>
              </div>

              {editingSummary ? (
                <div className="space-y-2">
                  <textarea
                    rows={3}
                    value={summaryValue}
                    onChange={(e) => setSummaryValue(e.target.value)}
                    className="w-full bg-white border border-[#407ff2] text-[14px] text-[#1c1d1f] p-2.5 rounded-[8px]"
                  />
                  <Button variant="primary" size="sm" onClick={handleSaveInline}>Save</Button>
                </div>
              ) : (
                <p
                  onClick={() => {
                    setSummaryValue(jobDescription.summary);
                    setEditingSummary(true);
                  }}
                  className="text-[14px] text-[#505967] leading-relaxed cursor-pointer hover:bg-[#f3f4f6] p-1.5 rounded-[6px] transition-colors"
                >
                  {jobDescription.summary}
                </p>
              )}
            </div>

            {/* What You Will Do Section */}
            <div className="group relative space-y-2.5 p-3 rounded-[8px] border border-transparent hover:border-[#e4e7ec] transition-all">
              <div className="flex items-center justify-between">
                <h4 className="text-[15px] font-medium text-[#1c1d1f] font-serif">
                  What you will do
                </h4>
                <button
                  type="button"
                  onClick={() => handleSectionPrompt('What you will do')}
                  title="Give inputs on specific section"
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-[6px] bg-[#f3f4f6] hover:bg-[#e4e7ec] text-[#1c1d1f] transition-opacity cursor-pointer flex items-center gap-1.5 text-[12px]"
                >
                  <IconSparkles size={13} />
                  <span>Refine section</span>
                </button>
              </div>
              <ul className="space-y-2 text-[14px] text-[#505967]">
                {jobDescription.sections.whatYouWillDo.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#8f99a8] mt-1.5 text-[6px]">●</span>
                    <span className="leading-relaxed hover:text-[#1c1d1f] transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Qualifications */}
            <div className="group relative space-y-2.5 p-3 rounded-[8px] border border-transparent hover:border-[#e4e7ec] transition-all">
              <div className="flex items-center justify-between">
                <h4 className="text-[15px] font-medium text-[#1c1d1f] font-serif">
                  Required qualifications
                </h4>
                <button
                  type="button"
                  onClick={() => handleSectionPrompt('Required qualifications')}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-[6px] bg-[#f3f4f6] hover:bg-[#e4e7ec] text-[#1c1d1f] transition-opacity cursor-pointer flex items-center gap-1.5 text-[12px]"
                >
                  <IconSparkles size={13} />
                  <span>Refine section</span>
                </button>
              </div>
              <ul className="space-y-2 text-[14px] text-[#505967]">
                {jobDescription.sections.requiredQualifications.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#8f99a8] mt-1.5 text-[6px]">●</span>
                    <span className="leading-relaxed hover:text-[#1c1d1f] transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nice to Have */}
            <div className="group relative space-y-2.5 p-3 rounded-[8px] border border-transparent hover:border-[#e4e7ec] transition-all">
              <div className="flex items-center justify-between">
                <h4 className="text-[15px] font-medium text-[#1c1d1f] font-serif">
                  Nice to have
                </h4>
                <button
                  type="button"
                  onClick={() => handleSectionPrompt('Nice to have')}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-[6px] bg-[#f3f4f6] hover:bg-[#e4e7ec] text-[#1c1d1f] transition-opacity cursor-pointer flex items-center gap-1.5 text-[12px]"
                >
                  <IconSparkles size={13} />
                  <span>Refine section</span>
                </button>
              </div>
              <ul className="space-y-2 text-[14px] text-[#505967]">
                {jobDescription.sections.niceToHave.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#8f99a8] mt-1.5 text-[6px]">●</span>
                    <span className="leading-relaxed hover:text-[#1c1d1f] transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Document Bottom Actions */}
            <div className="pt-6 flex items-center justify-between border-t border-[#e4e7ec]">
              <div className="flex items-center gap-3">
                <Button
                  variant="secondary"
                  size="md"
                  icon={<IconSave size={15} />}
                  onClick={handleSaveDraft}
                >
                  Save draft
                </Button>
                {draftSavedToast && (
                  <span className="text-[12px] text-[#075a39] flex items-center gap-1 animate-in fade-in">
                    <IconCheck size={14} /> Draft saved
                  </span>
                )}
              </div>

              <Button
                variant="primary"
                size="md"
                icon={<IconArrowRight size={15} />}
                iconPosition="right"
                onClick={handlePrimaryProceed}
              >
                {isEditRoute ? 'Return to Candidates' : 'Approve Job Description'}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={jobDescription.title}
      />
    </div>
  );
};
