import React from 'react';
import { 
  Clock, 
  Calendar, 
  FileText, 
  ArrowRight, 
  Trash2, 
  Download, 
  CheckCircle2, 
  Upload, 
  FileCheck2
} from 'lucide-react';
import { ScheduleDocument } from '../types';

interface HistoryPageProps {
  documents: ScheduleDocument[];
  onOpenDocument: (doc: ScheduleDocument) => void;
  onDeleteDocument: (docId: string) => void;
  onNavigateUpload: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  documents,
  onOpenDocument,
  onDeleteDocument,
  onNavigateUpload,
}) => {
  return (
    <div id="history-page-container" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1A365D]">
            <Clock className="w-3.5 h-3.5" />
            <span>Archive / Parsing Activity</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Processed Schedule Documents
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            View, re-edit, or re-export previously digitized timetables and agendas.
          </p>
        </div>

        <button
          id="btn-history-upload-new"
          onClick={onNavigateUpload}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#1A365D] hover:bg-[#2A4365] rounded-[2px] elevation-1 transition-all"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload New Schedule</span>
        </button>
      </div>

      {/* Document List */}
      {documents.length === 0 ? (
        <div className="bg-white border border-slate-200 p-12 text-center rounded-[2px] elevation-1">
          <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No schedules digitized yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Upload your first photo of a paper schedule or timetable to begin.
          </p>
          <button
            onClick={onNavigateUpload}
            className="mt-5 px-4 py-2 text-xs font-semibold text-white bg-[#1A365D] rounded-[2px] elevation-1"
          >
            Upload Schedule Image
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              id={`history-doc-${doc.id}`}
              className="bg-white border border-slate-200 hover:border-[#1A365D] p-4 sm:p-5 rounded-[2px] elevation-1 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-100 text-[#1A365D] rounded-[2px] flex items-center justify-center font-bold shrink-0 mt-0.5 border border-slate-200">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#1A365D] transition-colors">
                      {doc.title}
                    </h3>
                    <span className={`text-[10px] font-mono px-2 py-0.2 rounded-[2px] font-semibold border ${
                      doc.status === 'synced'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-blue-50 text-blue-800 border-blue-200'
                    }`}>
                      {doc.status === 'synced' ? 'Synced to Calendar' : 'Parsed & Ready'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1 font-mono">
                    <span>Source: {doc.sourceImageName}</span>
                    <span>•</span>
                    <span>{doc.entriesCount} Events</span>
                    <span>•</span>
                    <span>Processed on {doc.uploadedAt}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 w-full sm:w-auto justify-end">
                <button
                  id={`btn-open-doc-${doc.id}`}
                  onClick={() => onOpenDocument(doc)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1A365D] bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-[2px] transition-colors"
                >
                  <span>Open Grid View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onDeleteDocument(doc.id)}
                  className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-[2px] transition-colors"
                  title="Remove from history"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
