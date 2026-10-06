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
  IconPlus,
  IconX,
  IconCheck,
} from '../../components/ui/Icons';

export const Step3IdealProfile: React.FC = () => {
  const navigate = useNavigate();
  const { id: routeRoleId } = useParams();
  const isEditRoute = Boolean(routeRoleId);

  const {
    idealProfile,
    currentProfileVersion,
    setCurrentProfileVersion,
    updateIdealProfile,
    addProfileTag,
    removeProfileTag,
    saveCurrentDraft,
    setStaleWarning,
  } = useSearchWorkflow();

  const [shareOpen, setShareOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isCopilotTyping, setIsCopilotTyping] = useState(false);
  const [draftSavedToast, setDraftSavedToast] = useState(false);

  // Adding tag inline states
  const [addingCategory, setAddingCategory] = useState<string | null>(null);
  const [newTagInput, setNewTagInput] = useState('');

  // Editing role title
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(idealProfile.roleTitle);

  // Chat message thread
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'I extracted this ideal profile schema from your approved job description. You can add or prune tags, or ask me to recalibrate seniority or evidence weights.',
    },
  ]);

  const handleSendChat = (textToSend?: string) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

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
          text: `Updated profile criteria based on: "${query}". Added relevant skills and adjusted evidence indicators.`,
        },
      ]);

      if (query.toLowerCase().includes('senior') || query.toLowerCase().includes('academic')) {
        setCurrentProfileVersion('2');
      } else {
        addProfileTag('coreSkills', 'Spatio-temporal analysis');
      }
    }, 800);
  };

  const handleSaveDraft = () => {
    saveCurrentDraft(3, 'Ideal profile criteria');
    setDraftSavedToast(true);
    setTimeout(() => setDraftSavedToast(false), 2500);
  };

  const handleAddTagSubmit = (category: any) => {
    if (newTagInput.trim()) {
      addProfileTag(category, newTagInput.trim());
      setNewTagInput('');
      setAddingCategory(null);
      if (isEditRoute) setStaleWarning(true);
    }
  };

  const handleRemoveTag = (category: any, tag: string) => {
    removeProfileTag(category, tag);
    if (isEditRoute) setStaleWarning(true);
  };

  const handlePrimaryProceed = () => {
    if (isEditRoute) {
      navigate(`/search/${routeRoleId}/candidates`);
    } else {
      navigate('/search/new/skill-ranking');
    }
  };

  return (
    <div className="space-y-6 max-w-[1140px] mx-auto animate-in fade-in duration-200">
      {/* Stepper */}
      {!isEditRoute && <Stepper currentStep={3} />}

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
              navigate('/search/new/job-description');
            }
          }}
        >
          {isEditRoute ? 'Back to candidates' : 'Back'}
        </Button>

        {isEditRoute && (
          <Badge variant="warning">Edit mode · Updates flag re-run</Badge>
        )}
      </div>

      {/* Split layout: Copilot on Left, Profile Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: AI Copilot */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <div className="space-y-1 pb-4 mb-4 border-b border-[#e4e7ec]">
            <h2 className="text-[20px] font-medium text-[#1c1d1f] font-serif">
              Ideal candidate profile
            </h2>
            <p className="text-[13px] text-[#6f7988] leading-relaxed">
              Synthesized from the approved job description. Click tags to remove or add inline, or prompt AI to adjust criteria below.
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
                  </div>
                  <span className="text-[10px] text-[#8f99a8] mt-1 px-1">
                    {msg.sender === 'user' ? 'Hiring Lead' : 'Platform Copilot'}
                  </span>
                </div>
              ))}

              {isCopilotTyping && (
                <div className="flex items-center gap-2 text-[12px] text-[#6f7988] p-2 bg-white rounded-[8px] border border-[#e4e7ec] w-fit shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#407ff2] animate-bounce" />
                  <span>Calibrating candidate criteria...</span>
                </div>
              )}
            </div>

            {/* Suggestions & Input area - flush at bottom */}
            <div className="pt-4 mt-auto space-y-2.5">
              <div>
                <span className="text-[10px] font-semibold text-[#8f99a8] uppercase tracking-wider block mb-1.5">
                  Suggested adjustments
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Prioritize publications', 'More statistical modeling', 'Senior / Lead level', 'Require Python & R'].map((sug) => (
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
                  className="flex-1 bg-transparent text-[13px] text-[#1c1d1f] px-2.5 py-1 focus:outline-none placeholder-[#b5bdc9]"
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

        {/* Right Column: Profile Card */}
        <div className="lg:col-span-7 flex flex-col h-full">
          {/* Top header with Version Dropdown and Share button */}
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#6f7988]">Viewing:</span>
              <select
                value={currentProfileVersion}
                onChange={(e) => {
                  setCurrentProfileVersion(e.target.value);
                  if (isEditRoute) setStaleWarning(true);
                }}
                className="bg-white border border-[#d3d8df] text-[#1c1d1f] text-[13px] rounded-[8px] px-3 py-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#407ff2] shadow-xs"
              >
                <option value="1">Version 1 (Synthesized from JD)</option>
                <option value="2">Version 2 (Expanded academic credentials)</option>
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
            {/* Header: Avatar + Title + Edit */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-[#e4e7ec]">
              <div className="w-12 h-12 rounded-[8px] bg-[#f3f4f6] border border-[#d3d8df] flex items-center justify-center text-[#1c1d1f] text-[16px] font-semibold">
                EP
              </div>
              <div className="flex-1 min-w-0">
                {editingTitle ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={titleValue}
                      onChange={(e) => setTitleValue(e.target.value)}
                      className="bg-white border border-[#407ff2] text-[17px] font-medium text-[#1c1d1f] px-2.5 py-1 rounded-[8px] flex-1"
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        updateIdealProfile({ roleTitle: titleValue }, isEditRoute);
                        setEditingTitle(false);
                      }}
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h3 className="text-[18px] sm:text-[20px] font-medium text-[#1c1d1f] font-serif truncate">
                      {idealProfile.roleTitle}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setTitleValue(idealProfile.roleTitle);
                        setEditingTitle(true);
                      }}
                      className="text-[#8f99a8] hover:text-[#1c1d1f] p-1 rounded transition-colors cursor-pointer"
                    >
                      <IconEdit size={14} />
                    </button>
                  </div>
                )}
                <span className="text-[12px] text-[#6f7988]">Cross-disciplinary synthetic profile</span>
              </div>
            </div>

            {/* 1. Domain Experience */}
            <div className="space-y-2">
              <h4 className="text-[12px] font-semibold text-[#505967] uppercase tracking-wider">
                Domain Experience
              </h4>
              <div className="flex flex-wrap gap-2 items-center">
                {idealProfile.domainExperience.map((domain) => (
                  <span
                    key={domain}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-[#f3f4f6] border border-[#e4e7ec] text-[13px] font-medium text-[#1c1d1f]"
                  >
                    <span>{domain}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag('domainExperience', domain)}
                      aria-label={`Remove ${domain}`}
                      className="text-[#8f99a8] hover:text-[#b91c1c] cursor-pointer"
                    >
                      <IconX size={12} />
                    </button>
                  </span>
                ))}
                {addingCategory === 'domain' ? (
                  <div className="inline-flex items-center gap-1.5">
                    <input
                      type="text"
                      autoFocus
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTagSubmit('domainExperience')}
                      placeholder="Domain name"
                      className="bg-white border border-[#407ff2] text-[12px] px-2.5 py-1 rounded-[6px] text-[#1c1d1f] w-32 focus:outline-none"
                    />
                    <button onClick={() => handleAddTagSubmit('domainExperience')} className="text-white text-[11px] px-2 py-0.5 rounded-[4px] bg-[#1c1d1f]">Add</button>
                    <button type="button" onClick={() => setAddingCategory(null)} className="text-[#8f99a8] hover:text-[#b91c1c] p-0.5 cursor-pointer inline-flex items-center justify-center"><IconX size={12} /></button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setAddingCategory('domain');
                      setNewTagInput('');
                    }}
                    className="text-[12px] px-2.5 py-1 rounded-[6px] border border-dashed border-[#d3d8df] text-[#6f7988] hover:text-[#1c1d1f] hover:border-[#8f99a8] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <IconPlus size={12} /> Add domain
                  </button>
                )}
              </div>
            </div>

            {/* 2. Core Skills */}
            <div className="space-y-2">
              <h4 className="text-[12px] font-semibold text-[#505967] uppercase tracking-wider">
                Core skills
              </h4>
              <div className="flex flex-wrap gap-2 items-center">
                {idealProfile.coreSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-[#f3f4f6] border border-[#e4e7ec] text-[13px] font-medium text-[#1c1d1f]"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag('coreSkills', skill)}
                      aria-label={`Remove ${skill}`}
                      className="text-[#8f99a8] hover:text-[#b91c1c] cursor-pointer"
                    >
                      <IconX size={12} />
                    </button>
                  </span>
                ))}
                {addingCategory === 'skills' ? (
                  <div className="inline-flex items-center gap-1.5">
                    <input
                      type="text"
                      autoFocus
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTagSubmit('coreSkills')}
                      placeholder="Skill name"
                      className="bg-white border border-[#407ff2] text-[12px] px-2.5 py-1 rounded-[6px] text-[#1c1d1f] w-32 focus:outline-none"
                    />
                    <button onClick={() => handleAddTagSubmit('coreSkills')} className="text-white text-[11px] px-2 py-0.5 rounded-[4px] bg-[#1c1d1f]">Add</button>
                    <button type="button" onClick={() => setAddingCategory(null)} className="text-[#8f99a8] hover:text-[#b91c1c] p-0.5 cursor-pointer inline-flex items-center justify-center"><IconX size={12} /></button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setAddingCategory('skills');
                      setNewTagInput('');
                    }}
                    className="text-[12px] px-2.5 py-1 rounded-[6px] border border-dashed border-[#d3d8df] text-[#6f7988] hover:text-[#1c1d1f] hover:border-[#8f99a8] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <IconPlus size={12} /> Add skill
                  </button>
                )}
              </div>
            </div>

            {/* 3. Qualifications */}
            <div className="space-y-2">
              <h4 className="text-[12px] font-semibold text-[#505967] uppercase tracking-wider">
                Qualifications
              </h4>
              <ul className="space-y-2 text-[13px] text-[#505967]">
                {idealProfile.qualifications.map((qual, idx) => (
                  <li key={idx} className="flex items-start justify-between gap-2 group">
                    <div className="flex items-start gap-2">
                      <span className="text-[#8f99a8] mt-1.5 text-[6px]">●</span>
                      <span className="hover:text-[#1c1d1f] transition-colors">{qual}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag('qualifications', qual)}
                      className="opacity-0 group-hover:opacity-100 text-[#8f99a8] hover:text-[#b91c1c] cursor-pointer"
                    >
                      <IconX size={12} />
                    </button>
                  </li>
                ))}
              </ul>
              {addingCategory === 'qual' ? (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    autoFocus
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTagSubmit('qualifications')}
                    placeholder="Enter qualification requirement"
                    className="bg-white border border-[#407ff2] text-[12px] px-3 py-1.5 rounded-[6px] text-[#1c1d1f] flex-1 focus:outline-none"
                  />
                  <button onClick={() => handleAddTagSubmit('qualifications')} className="text-white text-[12px] px-3 py-1 rounded-[6px] bg-[#1c1d1f]">Add</button>
                  <button onClick={() => setAddingCategory(null)} className="text-[#8f99a8] text-[12px]">Cancel</button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setAddingCategory('qual');
                    setNewTagInput('');
                  }}
                  className="text-[12px] text-[#6f7988] hover:text-[#1c1d1f] transition-colors cursor-pointer flex items-center gap-1 pt-1"
                >
                  <IconPlus size={13} /> Add qualification
                </button>
              )}
            </div>

            {/* 4. Profile title(s) */}
            <div className="space-y-2">
              <h4 className="text-[12px] font-semibold text-[#505967] uppercase tracking-wider">
                Profile title(s)
              </h4>
              <div className="flex flex-wrap gap-2 items-center">
                {idealProfile.profileTitles.map((title) => (
                  <span
                    key={title}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-[#f3f4f6] border border-[#e4e7ec] text-[13px] font-medium text-[#1c1d1f]"
                  >
                    <span>{title}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag('profileTitles', title)}
                      aria-label={`Remove ${title}`}
                      className="text-[#8f99a8] hover:text-[#b91c1c] cursor-pointer"
                    >
                      <IconX size={12} />
                    </button>
                  </span>
                ))}
                {addingCategory === 'titles' ? (
                  <div className="inline-flex items-center gap-1.5">
                    <input
                      type="text"
                      autoFocus
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTagSubmit('profileTitles')}
                      placeholder="Title alias"
                      className="bg-white border border-[#407ff2] text-[12px] px-2.5 py-1 rounded-[6px] text-[#1c1d1f] w-32 focus:outline-none"
                    />
                    <button onClick={() => handleAddTagSubmit('profileTitles')} className="text-white text-[11px] px-2 py-0.5 rounded-[4px] bg-[#1c1d1f]">Add</button>
                    <button type="button" onClick={() => setAddingCategory(null)} className="text-[#8f99a8] hover:text-[#b91c1c] p-0.5 cursor-pointer inline-flex items-center justify-center"><IconX size={12} /></button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setAddingCategory('titles');
                      setNewTagInput('');
                    }}
                    className="text-[12px] px-2.5 py-1 rounded-[6px] border border-dashed border-[#d3d8df] text-[#6f7988] hover:text-[#1c1d1f] hover:border-[#8f99a8] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <IconPlus size={12} /> Add title
                  </button>
                )}
              </div>
            </div>

            {/* 5. Evidences */}
            <div className="space-y-2">
              <h4 className="text-[12px] font-semibold text-[#505967] uppercase tracking-wider">
                Evidences
              </h4>
              <div className="flex flex-wrap gap-2 items-center">
                {idealProfile.evidences.map((evidence) => (
                  <span
                    key={evidence}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-[#f3f4f6] border border-[#e4e7ec] text-[13px] font-medium text-[#1c1d1f]"
                  >
                    <span>{evidence}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag('evidences', evidence)}
                      aria-label={`Remove ${evidence}`}
                      className="text-[#8f99a8] hover:text-[#b91c1c] cursor-pointer"
                    >
                      <IconX size={12} />
                    </button>
                  </span>
                ))}
                {addingCategory === 'evidences' ? (
                  <div className="inline-flex items-center gap-1.5">
                    <input
                      type="text"
                      autoFocus
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTagSubmit('evidences')}
                      placeholder="Evidence type"
                      className="bg-white border border-[#407ff2] text-[12px] px-2.5 py-1 rounded-[6px] text-[#1c1d1f] w-32 focus:outline-none"
                    />
                    <button onClick={() => handleAddTagSubmit('evidences')} className="text-white text-[11px] px-2 py-0.5 rounded-[4px] bg-[#1c1d1f]">Add</button>
                    <button type="button" onClick={() => setAddingCategory(null)} className="text-[#8f99a8] hover:text-[#b91c1c] p-0.5 cursor-pointer inline-flex items-center justify-center"><IconX size={12} /></button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setAddingCategory('evidences');
                      setNewTagInput('');
                    }}
                    className="text-[12px] px-2.5 py-1 rounded-[6px] border border-dashed border-[#d3d8df] text-[#6f7988] hover:text-[#1c1d1f] hover:border-[#8f99a8] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <IconPlus size={12} /> Add evidence
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
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
                {isEditRoute ? 'Return to Candidates' : 'Continue to skill ranking'}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={idealProfile.roleTitle}
      />
    </div>
  );
};
