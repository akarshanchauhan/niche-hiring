import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchWorkflow } from '../../context/SearchWorkflowContext';
import { Stepper } from '../../components/ui/Stepper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Textarea } from '../../components/ui/Textarea';
import { Modal } from '../../components/ui/Modal';
import { ROLE_TEMPLATES } from '../../data/roles';
import {
  IconArrowLeft,
  IconArrowRight,
  IconUpload,
  IconFileText,
  IconSave,
  IconCheck,
} from '../../components/ui/Icons';

export const Step1Requirement: React.FC = () => {
  const navigate = useNavigate();
  const {
    requirementPrompt,
    setRequirementPrompt,
    attachments,
    addAttachment,
    removeAttachment,
    expectedOpeningDate,
    setExpectedOpeningDate,
    applyTemplate,
    saveCurrentDraft,
  } = useSearchWorkflow();

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState(0);
  const [viewAllTemplatesOpen, setViewAllTemplatesOpen] = useState(false);
  const [previewDocName, setPreviewDocName] = useState<string | null>(null);
  const [draftSavedToast, setDraftSavedToast] = useState(false);

  const generationStages = [
    'Parsing natural language role intent...',
    'Synthesizing cross-disciplinary domain competencies...',
    'Calibrating responsibilities against weather econometrics benchmarks...',
    'Structuring draft job description and ideal profile...',
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationStage(0);

    const interval = setInterval(() => {
      setGenerationStage((prev) => {
        if (prev < generationStages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            navigate('/search/new/job-description');
          }, 400);
          return prev;
        }
      });
    }, 700);
  };

  const handleSaveDraft = () => {
    saveCurrentDraft(1, 'Role requirement');
    setDraftSavedToast(true);
    setTimeout(() => setDraftSavedToast(false), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const sizeStr = `${(file.size / 1024).toFixed(0)} KB`;
        addAttachment(file.name, sizeStr);
      });
    }
  };

  return (
    <div className="space-y-6 max-w-[920px] mx-auto animate-in fade-in duration-200">
      {/* Stepper */}
      <Stepper currentStep={1} />

      {/* Back button */}
      <div>
        <Button
          variant="secondary"
          size="sm"
          icon={<IconArrowLeft size={14} />}
          onClick={() => navigate('/')}
        >
          Back
        </Button>
      </div>

      {/* Main Requirement Card */}
      <Card variant="graphite" padding="lg" className="space-y-6">
        <div>
          <h2 className="text-[22px] sm:text-[24px] font-medium text-[#1c1d1f] font-serif">
            Tell us about the role
          </h2>
          <p className="text-[14px] text-[#6f7988] mt-1.5 leading-relaxed">
            Describe what the hiring manager asked for, in your own words. Add documents if you have them. The AI-powered system will turn it into a precise job description.
          </p>
        </div>

        {/* Textarea for Role Requirement */}
        <div className="space-y-2">
          <label className="text-[12px] font-semibold text-[#505967] uppercase tracking-wider block">
            Role requirement
          </label>
          <Textarea
            rows={5}
            value={requirementPrompt}
            onChange={(e) => setRequirementPrompt(e.target.value)}
            placeholder="E.g. We need a statistical economist who specializes in weather patterns to model how climate volatility affects regional commodity prices..."
            className="text-[15px]"
          />
          <p className="text-[12px] text-[#6f7988]">
            AI input in vague or natural language. Include any specific domain intersections, methodologies, or timelines.
          </p>
        </div>

        {/* Supporting Documents (Dropzone & Uploaded List) */}
        <div className="space-y-2.5">
          <label className="text-[12px] font-semibold text-[#505967] uppercase tracking-wider block">
            Supporting documents (optional)
          </label>

          <label className="border border-dashed border-[#d3d8df] hover:border-[#8f99a8] rounded-[8px] p-6 flex flex-col sm:flex-row items-center justify-center gap-3 bg-[#fafbfc] hover:bg-[#f3f4f6] transition-colors cursor-pointer text-center sm:text-left">
            <input
              type="file"
              multiple
              accept=".pdf,.docx,.txt,.png"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="w-9 h-9 rounded-full bg-white border border-[#e4e7ec] flex items-center justify-center text-[#1c1d1f] shadow-xs">
              <IconUpload size={16} />
            </div>
            <div className="text-[13px] text-[#6f7988]">
              <span>Drop files here, or </span>
              <span className="text-[#1c1d1f] font-medium underline underline-offset-2">Browse files</span>
              <span className="block sm:inline sm:ml-2 text-[12px] text-[#8f99a8]">PDF, DOCX or TXT</span>
            </div>
          </label>

          {/* Uploaded attachments list */}
          {attachments.length > 0 && (
            <div className="space-y-2 pt-1">
              {attachments.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center justify-between p-3 rounded-[8px] bg-[#f3f4f6] border border-[#e4e7ec] text-[13px]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <IconFileText size={16} className="text-[#6f7988] shrink-0" />
                    <span className="font-medium text-[#1c1d1f] truncate">{att.name}</span>
                    <span className="text-[11px] text-[#8f99a8]">({att.size})</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => setPreviewDocName(att.name)}
                      className="text-[#6f7988] hover:text-[#1c1d1f] transition-colors text-[12px] cursor-pointer"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => removeAttachment(att.id)}
                      className="text-[#6f7988] hover:text-[#b91c1c] transition-colors text-[12px] cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Expected Job Opening Date */}
        <div className="space-y-2">
          <label className="text-[12px] font-semibold text-[#505967] uppercase tracking-wider block">
            Expected job opening date (optional)
          </label>
          <div className="max-w-xs relative flex items-center">
            <input
              type="date"
              value={expectedOpeningDate}
              onChange={(e) => setExpectedOpeningDate(e.target.value)}
              className="w-full bg-[#ffffff] border border-[#d3d8df] hover:border-[#8f99a8] text-[#1c1d1f] rounded-[8px] px-3.5 py-2 text-[14px] focus-visible:outline-2 focus-visible:outline-[#407ff2] focus-visible:outline-offset-2"
            />
          </div>
          <p className="text-[12px] text-[#6f7988]">
            The targeted date for job opening, if it's down the line and not right away. Used to configure automated scheduling.
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 flex items-center justify-between border-t border-[#e4e7ec]">
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
                <IconCheck size={14} /> Draft saved to dashboard
              </span>
            )}
          </div>

          <Button
            variant="primary"
            size="md"
            icon={<IconArrowRight size={15} />}
            iconPosition="right"
            onClick={handleGenerate}
            disabled={!requirementPrompt.trim() || isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate job description'}
          </Button>
        </div>
      </Card>

      {/* Frame 117: Or use an existing Job Description */}
      <section className="space-y-3 pt-2">
        <h3 className="text-[14px] font-medium text-[#505967]">
          Or use an existing Job Description
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {ROLE_TEMPLATES.slice(0, 3).map((tmpl) => (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => applyTemplate(tmpl.id)}
              className="p-3.5 rounded-[8px] bg-[#ffffff] border border-[#e4e7ec] hover:border-[#8f99a8] shadow-xs text-left transition-all duration-150 cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-[6px] bg-[#f3f4f6] border border-[#d3d8df] shrink-0 flex items-center justify-center text-[12px] text-[#6f7988] font-semibold">
                  JD
                </div>
                <span className="text-[13px] font-semibold text-[#1c1d1f] group-hover:text-[#407ff2] truncate">
                  {tmpl.title}
                </span>
              </div>
              <IconArrowRight size={14} className="text-[#8f99a8] group-hover:text-[#1c1d1f] shrink-0 transition-colors" />
            </button>
          ))}
        </div>
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={() => setViewAllTemplatesOpen(true)}
            className="text-[13px] text-[#6f7988] hover:text-[#1c1d1f] underline underline-offset-2 transition-colors cursor-pointer"
          >
            View all
          </button>
        </div>
      </section>

      {/* AI Generation Overlay Dialog */}
      <Modal
        isOpen={isGenerating}
        onClose={() => {}}
        maxWidth="md"
        title="Generating Job Description"
      >
        <div className="space-y-5 py-3">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#407ff2] animate-ping" />
            <span className="text-[14px] text-[#1c1d1f] font-medium">
              {generationStages[generationStage]}
            </span>
          </div>

          <div className="w-full bg-[#f3f4f6] rounded-full h-1.5 overflow-hidden border border-[#e4e7ec]">
            <div
              className="bg-[#1c1d1f] h-full transition-all duration-500 rounded-full"
              style={{ width: `${((generationStage + 1) / generationStages.length) * 100}%` }}
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-[#e4e7ec] text-[12px] text-[#6f7988]">
            {generationStages.map((stage, idx) => (
              <div key={stage} className="flex items-center gap-2">
                {idx < generationStage ? (
                  <IconCheck size={14} className="text-[#075a39]" />
                ) : idx === generationStage ? (
                  <span className="w-3.5 h-3.5 rounded-full border border-[#1c1d1f] border-t-transparent animate-spin" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-[#d3d8df] mx-1" />
                )}
                <span className={idx === generationStage ? 'text-[#1c1d1f] font-medium' : idx < generationStage ? 'text-[#505967]' : 'text-[#8f99a8]'}>
                  {stage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Document Preview Modal */}
      <Modal
        isOpen={!!previewDocName}
        onClose={() => setPreviewDocName(null)}
        maxWidth="md"
        title={`Supporting Document: ${previewDocName}`}
      >
        <div className="p-4 rounded-[8px] bg-[#f3f4f6] border border-[#e4e7ec] text-[13px] text-[#1c1d1f] leading-relaxed space-y-3">
          <p className="font-semibold text-[#1c1d1f]">Attachment Content Summary</p>
          <p className="text-[#505967]">
            Hiring Manager Sync: Target team is looking for a senior econometric modeler with verified competency in mesoscale weather indices. Candidates must be comfortable interfacing with both technical climate dynamicists and business planning executives.
          </p>
          <p className="text-[12px] text-[#6f7988]">
            Key deliverables: Quantitative demand scenario models, time-series anomaly correlation, and communication of probabilistic risk bands.
          </p>
        </div>
      </Modal>

      {/* View All Job Description Templates Modal */}
      <Modal
        isOpen={viewAllTemplatesOpen}
        onClose={() => setViewAllTemplatesOpen(false)}
        maxWidth="lg"
        title="Saved Job Descriptions & Role Templates"
        description="Select an existing job description to pre-populate the role requirement wizard."
      >
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {ROLE_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => {
                applyTemplate(tmpl.id);
                setViewAllTemplatesOpen(false);
              }}
              className="p-4 rounded-[8px] bg-[#ffffff] border border-[#e4e7ec] hover:border-[#8f99a8] transition-colors cursor-pointer space-y-1.5 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-[14px] font-semibold text-[#1c1d1f]">{tmpl.title}</h4>
                <span className="text-[11px] text-[#6f7988]">Target: {tmpl.expectedDate}</span>
              </div>
              <p className="text-[12px] text-[#6f7988] line-clamp-2">{tmpl.prompt}</p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};
