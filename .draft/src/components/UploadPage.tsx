import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  FileCheck
} from 'lucide-react';
import { ScheduleDocument, ScheduleEntry } from '../types';
import { PRESET_SAMPLE_TEMPLATES } from '../data/mockData';

interface UploadPageProps {
  onScheduleParsed: (doc: ScheduleDocument) => void;
  onNavigateHistory: () => void;
}

export const UploadPage: React.FC<UploadPageProps> = ({
  onScheduleParsed,
  onNavigateHistory,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    'Scanning document geometry & contrast...',
    'Optical Character Recognition (OCR) running...',
    'Classifying days, time intervals & rooms...',
    'Synthesizing calendar agenda data structure...',
  ];

  const handleStartAnalysis = (
    fileName: string, 
    previewUrl?: string, 
    customEntries?: ScheduleEntry[]
  ) => {
    setIsProcessing(true);
    setProgressPercent(10);
    setProgressStep(0);

    const timer1 = setTimeout(() => {
      setProgressPercent(35);
      setProgressStep(1);
    }, 600);

    const timer2 = setTimeout(() => {
      setProgressPercent(70);
      setProgressStep(2);
    }, 1300);

    const timer3 = setTimeout(() => {
      setProgressPercent(95);
      setProgressStep(3);
    }, 2000);

    const timer4 = setTimeout(() => {
      setProgressPercent(100);
      
      const newDoc: ScheduleDocument = {
        id: `doc-${Date.now()}`,
        title: fileName.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '),
        uploadedAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
        sourceImageName: fileName,
        sourceImageUrl: previewUrl || 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
        entriesCount: customEntries ? customEntries.length : PRESET_SAMPLE_TEMPLATES[0].entries.length,
        entries: customEntries || PRESET_SAMPLE_TEMPLATES[0].entries,
        status: 'processed',
      };

      setIsProcessing(false);
      onScheduleParsed(newDoc);
    }, 2600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };

  const handleFile = (file: File) => {
    setSelectedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setFilePreviewUrl(url);
      handleStartAnalysis(file.name, url);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handlePresetSelect = (presetId: string) => {
    const preset = PRESET_SAMPLE_TEMPLATES.find((p) => p.id === presetId);
    if (preset) {
      setSelectedFileName(preset.previewName);
      setFilePreviewUrl(preset.sampleFilePreview);
      handleStartAnalysis(preset.previewName, preset.sampleFilePreview, preset.entries);
    }
  };

  return (
    <div id="upload-page-container" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Top Banner / Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1A365D]">
            <Layers className="w-3.5 h-3.5" />
            <span>Workspace / Ingestion Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Upload Schedule Image
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Digitize handwritten timetables, weekly shift sheets, or printed syllabi.
          </p>
        </div>

        <button
          id="btn-goto-history"
          onClick={onNavigateHistory}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-[2px] hover:bg-slate-50 elevation-1 transition-all"
        >
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>View Previous Parses</span>
        </button>
      </div>

      {/* Main Upload Area & Status */}
      <div className="space-y-8">
        
        {/* Central Drag & Drop Zone */}
        <div
          id="dropzone-area"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !isProcessing && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-[2px] transition-all cursor-pointer p-8 sm:p-14 text-center select-none ${
            isDragging
              ? 'border-[#1A365D] bg-slate-50 elevation-2 scale-[1.005]'
              : 'border-slate-300 bg-white hover:border-[#1A365D] hover:bg-[#F8FAFC] elevation-1'
          } ${isProcessing ? 'pointer-events-none opacity-90' : ''}`}
        >
          <input
            id="hidden-file-input"
            ref={fileInputRef}
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />

          {!isProcessing ? (
            <div className="max-w-md mx-auto flex flex-col items-center">
              
              <div className={`w-14 h-14 rounded-[2px] flex items-center justify-center mb-4 transition-colors ${
                isDragging ? 'bg-[#1A365D] text-white' : 'bg-slate-100 text-[#1A365D]'
              }`}>
                <UploadCloud className="w-7 h-7" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Drag & Drop your schedule image here, or click to browse
              </h3>

              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                Supports camera snapshots, PNG, JPG, scanned PDFs, and screenshots. Optimal for tables, handwritten grids, and syllabus agendas.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#1A365D] hover:bg-[#2A4365] text-white text-xs font-semibold rounded-[2px] elevation-1">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Select Image from Computer</span>
              </div>

              <div className="mt-4 text-[11px] text-slate-400 font-mono">
                Auto-deskew • Contrast Equalization • Multi-column Detection
              </div>

            </div>
          ) : (
            /* Minimalist Progress Bar for Analyzing State */
            <div id="upload-progress-container" className="max-w-lg mx-auto py-4">
              
              <div className="w-12 h-12 bg-[#1A365D] text-white rounded-[2px] flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Sparkles className="w-6 h-6" />
              </div>

              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Analyzing Schedule Image
              </h3>

              <p className="text-xs text-slate-500 font-mono mt-1">
                {selectedFileName || 'Schedule_Document.jpg'}
              </p>

              {/* Progress Bar with Sharp Corners (MUI Minimalist) */}
              <div className="mt-6 w-full bg-slate-200 h-2 rounded-[1px] overflow-hidden">
                <div
                  className="bg-[#1A365D] h-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-600">
                <span className="font-medium text-slate-800">{steps[progressStep]}</span>
                <span className="font-bold text-[#1A365D]">{progressPercent}%</span>
              </div>

              {/* Progress Steps Checklist */}
              <div className="mt-6 grid grid-cols-2 gap-2 text-left">
                {steps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-2 border rounded-[2px] text-[11px] flex items-center gap-2 ${
                      idx <= progressStep
                        ? 'border-[#1A365D] bg-slate-50 text-slate-900 font-medium'
                        : 'border-slate-200 bg-white text-slate-400'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-none flex items-center justify-center text-[9px] font-bold ${
                      idx < progressStep
                        ? 'bg-[#1A365D] text-white'
                        : idx === progressStep
                        ? 'border border-[#1A365D] text-[#1A365D]'
                        : 'border border-slate-300 text-slate-400'
                    }`}>
                      {idx < progressStep ? '✓' : idx + 1}
                    </div>
                    <span className="truncate">{step.split('...')[0]}</span>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

        {/* Preset Sample Quick-Loads (No image on hand? Try these in 1 click) */}
        {!isProcessing && (
          <div id="presets-quick-selection" className="bg-white border border-slate-200 p-6 rounded-[2px] elevation-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Or Test with a Preset Schedule Sample
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any verified schedule pattern to evaluate instant extraction and editing.
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#1A365D] bg-slate-100 px-2 py-1 rounded-[2px]">
                3 Test Samples Ready
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PRESET_SAMPLE_TEMPLATES.map((preset) => (
                <div
                  key={preset.id}
                  id={`btn-preset-${preset.id}`}
                  onClick={() => handlePresetSelect(preset.id)}
                  className="border border-slate-200 hover:border-[#1A365D] p-3.5 rounded-[2px] bg-[#F8FAFC] hover:bg-white transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span className="group-hover:text-[#1A365D] transition-colors">{preset.title.split('(')[0]}</span>
                    <span className="text-[10px] font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded-[2px]">
                      {preset.entriesCount} slots
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {preset.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-[#1A365D] pt-2 border-t border-slate-200">
                    <span>Parse this sample</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
