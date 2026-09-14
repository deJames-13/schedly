import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Tag, 
  Trash2, 
  Edit3, 
  Check, 
  CalendarSync, 
  Download, 
  Plus, 
  Search, 
  Filter, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Eye,
  FileSpreadsheet,
  Share2
} from 'lucide-react';
import { ScheduleDocument, ScheduleEntry, DayOfWeek, EventCategory } from '../types';

interface TransformedScheduleViewProps {
  document: ScheduleDocument;
  onSaveSchedule: (updatedDoc: ScheduleDocument) => void;
  onUploadAnother: () => void;
}

export const TransformedScheduleView: React.FC<TransformedScheduleViewProps> = ({
  document,
  onSaveSchedule,
  onUploadAnother,
}) => {
  const [entries, setEntries] = useState<ScheduleEntry[]>(document.entries);
  const [activeView, setActiveView] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [syncStatusToast, setSyncStatusToast] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New event draft form state
  const [newEventDraft, setNewEventDraft] = useState<Partial<ScheduleEntry>>({
    name: '',
    day: 'Monday',
    date: '2026-09-21',
    startTime: '10:00',
    endTime: '11:00',
    location: '',
    category: 'Academic',
    notes: '',
  });

  const categories: EventCategory[] = [
    'Academic',
    'Work Shift',
    'Meeting',
    'Lab / Workshop',
    'Personal',
    'Milestone',
  ];

  const days: DayOfWeek[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  // Inline field editing handler
  const handleFieldChange = (id: string, field: keyof ScheduleEntry, value: any) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry))
    );
    setIsSaved(false);
  };

  // Delete row
  const handleDeleteRow = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
    setIsSaved(false);
  };

  // Sync single row
  const handleToggleRowSync = (id: string) => {
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id === id) {
          const nextState = !entry.isSynced;
          showToast(nextState ? `Synced "${entry.name}" with connected calendars.` : `Removed "${entry.name}" from calendar sync.`);
          return { ...entry, isSynced: nextState };
        }
        return entry;
      })
    );
  };

  // Toast notification helper
  const showToast = (msg: string) => {
    setSyncStatusToast(msg);
    setTimeout(() => {
      setSyncStatusToast(null);
    }, 3500);
  };

  // Save & Sync All Action
  const handleSaveAndSync = () => {
    const updated = entries.map((e) => ({ ...e, isSynced: true }));
    setEntries(updated);
    setIsSaved(true);
    setEditingRowId(null);

    const updatedDoc: ScheduleDocument = {
      ...document,
      entries: updated,
      entriesCount: updated.length,
      status: 'synced',
    };
    onSaveSchedule(updatedDoc);
    showToast(`Successfully saved and synced ${updated.length} events to Google Calendar & Outlook!`);
  };

  // Export to standard RFC 5545 iCalendar (.ics) format
  const handleExportICS = () => {
    const formatDate = (dateStr: string, timeStr: string) => {
      const [year, month, day] = dateStr.split('-');
      const [hour, min] = timeStr.split(':');
      return `${year}${month}${day}T${hour || '09'}${min || '00'}00`;
    };

    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Schedly//Schedule Management System//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
    ];

    entries.forEach((entry) => {
      const dtStart = formatDate(entry.date || '2026-09-21', entry.startTime);
      const dtEnd = formatDate(entry.date || '2026-09-21', entry.endTime);

      icsContent.push('BEGIN:VEVENT');
      icsContent.push(`UID:${entry.id}@schedly.app`);
      icsContent.push(`SUMMARY:${entry.name}`);
      icsContent.push(`DTSTART:${dtStart}`);
      icsContent.push(`DTEND:${dtEnd}`);
      if (entry.location) icsContent.push(`LOCATION:${entry.location}`);
      if (entry.notes) icsContent.push(`DESCRIPTION:${entry.notes}`);
      icsContent.push(`CATEGORIES:${entry.category}`);
      icsContent.push('STATUS:CONFIRMED');
      icsContent.push('END:VEVENT');
    });

    icsContent.push('END:VCALENDAR');

    const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const link = window.document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${document.title.replace(/\s+/g, '_')}_schedule.ics`);
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);

    showToast('Downloaded .ICS calendar file for instant import into Apple/Google/Outlook.');
  };

  // Add new event modal submit
  const handleAddNewEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventDraft.name) return;

    const newEntry: ScheduleEntry = {
      id: `manual-${Date.now()}`,
      name: newEventDraft.name || 'Untitled Event',
      day: (newEventDraft.day as DayOfWeek) || 'Monday',
      date: newEventDraft.date || '2026-09-21',
      startTime: newEventDraft.startTime || '09:00',
      endTime: newEventDraft.endTime || '10:00',
      location: newEventDraft.location || 'TBD',
      category: (newEventDraft.category as EventCategory) || 'Academic',
      notes: newEventDraft.notes || '',
      isSynced: false,
    };

    setEntries([newEntry, ...entries]);
    setShowAddModal(false);
    setNewEventDraft({
      name: '',
      day: 'Monday',
      date: '2026-09-21',
      startTime: '10:00',
      endTime: '11:00',
      location: '',
      category: 'Academic',
      notes: '',
    });
    showToast(`Added "${newEntry.name}" to schedule.`);
  };

  // Filtered entries
  const filteredEntries = entries.filter((item) => {
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.day.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === 'all' || item.category === filterCategory;

    return matchesQuery && matchesCategory;
  });

  const getCategoryBadgeClass = (category: EventCategory) => {
    switch (category) {
      case 'Academic':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Work Shift':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'Meeting':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Lab / Workshop':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Milestone':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div id="transformed-schedule-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Toast Feedback */}
      {syncStatusToast && (
        <div 
          id="sync-status-toast"
          className="fixed bottom-6 right-6 z-50 bg-[#1A365D] text-white px-4 py-3 rounded-[2px] elevation-3 flex items-center gap-2.5 text-xs font-medium border border-slate-700 animate-in fade-in slide-in-from-bottom-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{syncStatusToast}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <button 
              onClick={onUploadAnother}
              className="hover:text-[#1A365D] flex items-center gap-1 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Ingestion</span>
            </button>
            <span>/</span>
            <span className="text-[#1A365D] font-mono">CONFIDENCE: 98.4%</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {document.title}
            </h1>
            <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 border border-slate-300 rounded-[2px] text-slate-700">
              {entries.length} Events Parsed
            </span>
          </div>
        </div>

        {/* Action Controls & Primary "Save & Sync" */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          <button
            id="btn-add-event-modal"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-[2px] hover:bg-slate-50 elevation-1 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Event</span>
          </button>

          <button
            id="btn-export-ics"
            onClick={handleExportICS}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-[2px] hover:bg-slate-50 elevation-1 transition-all"
            title="Download standard .ics file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export .ICS</span>
          </button>

          <button
            id="btn-save-and-sync-primary"
            onClick={handleSaveAndSync}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#1A365D] hover:bg-[#2A4365] rounded-[2px] elevation-2 transition-all cursor-pointer"
          >
            <CalendarSync className="w-4 h-4" />
            <span>Save & Sync</span>
          </button>

        </div>
      </div>

      {/* Toolbar: Search, Category Filter, and View Mode Switcher */}
      <div className="bg-white border border-slate-200 p-3.5 rounded-[2px] elevation-1 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              id="input-search-schedule"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search event, room, or day..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-[2px] focus:bg-white focus:border-[#1A365D] focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              id="select-filter-category"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-white border border-slate-300 rounded-[2px] px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-[#1A365D]"
            >
              <option value="all">All Categories ({entries.length})</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* View Switcher: Table / Grid */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-[2px] border border-slate-200 self-start sm:self-auto">
          <button
            id="btn-view-table"
            onClick={() => setActiveView('table')}
            className={`px-3 py-1 text-xs font-semibold rounded-[2px] transition-colors ${
              activeView === 'table'
                ? 'bg-white text-[#1A365D] elevation-1'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Structured Table
          </button>
          <button
            id="btn-view-grid"
            onClick={() => setActiveView('grid')}
            className={`px-3 py-1 text-xs font-semibold rounded-[2px] transition-colors ${
              activeView === 'grid'
                ? 'bg-white text-[#1A365D] elevation-1'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Weekly Grid
          </button>
        </div>

      </div>

      {/* Helper notice explaining inline editing */}
      <div className="mb-3 text-[11px] text-slate-500 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <Edit3 className="w-3 h-3 text-[#1A365D]" /> Click directly on any cell to edit details inline with Material styling.
        </span>
        <span className="font-mono text-slate-400">Showing {filteredEntries.length} of {entries.length} items</span>
      </div>

      {/* VIEW MODE 1: Structured Table/List View */}
      {activeView === 'table' ? (
        <div className="bg-white border border-slate-200 rounded-[2px] elevation-1 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4 w-32">Day & Date</th>
                <th className="py-3 px-4 w-36">Time Window</th>
                <th className="py-3 px-4 min-w-[240px]">Event Title</th>
                <th className="py-3 px-4 w-44">Location / Room</th>
                <th className="py-3 px-4 w-32">Category</th>
                <th className="py-3 px-4 text-right w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No matching schedule entries found.
                  </td>
                </tr>
              ) : (
                filteredEntries.map((entry) => {
                  const isEditingThis = editingRowId === entry.id;

                  return (
                    <tr
                      key={entry.id}
                      id={`schedule-row-${entry.id}`}
                      className={`hover:bg-[#F8FAFC] transition-colors group ${
                        isEditingThis ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      {/* Day & Date */}
                      <td className="py-3 px-4 align-top">
                        <div className="flex flex-col">
                          <select
                            value={entry.day}
                            onChange={(e) =>
                              handleFieldChange(entry.id, 'day', e.target.value as DayOfWeek)
                            }
                            className="bg-transparent font-semibold text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-[#1A365D] focus:outline-none py-0.5 cursor-pointer"
                          >
                            {days.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                          <input
                            type="date"
                            value={entry.date}
                            onChange={(e) =>
                              handleFieldChange(entry.id, 'date', e.target.value)
                            }
                            className="text-[11px] text-slate-500 font-mono bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#1A365D] focus:outline-none"
                          />
                        </div>
                      </td>

                      {/* Time Window */}
                      <td className="py-3 px-4 align-top font-mono">
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={entry.startTime}
                            onChange={(e) =>
                              handleFieldChange(entry.id, 'startTime', e.target.value)
                            }
                            className="w-14 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#1A365D] focus:outline-none font-semibold text-slate-800"
                            placeholder="09:00"
                          />
                          <span className="text-slate-400">-</span>
                          <input
                            type="text"
                            value={entry.endTime}
                            onChange={(e) =>
                              handleFieldChange(entry.id, 'endTime', e.target.value)
                            }
                            className="w-14 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#1A365D] focus:outline-none font-semibold text-slate-800"
                            placeholder="10:30"
                          />
                        </div>
                      </td>

                      {/* Event Title (Material bottom-border inline edit) */}
                      <td className="py-3 px-4 align-top">
                        <div className="flex flex-col">
                          <input
                            type="text"
                            value={entry.name}
                            onChange={(e) =>
                              handleFieldChange(entry.id, 'name', e.target.value)
                            }
                            className="w-full bg-transparent font-bold text-slate-900 text-xs border-b border-transparent hover:border-slate-300 focus:border-[#1A365D] focus:outline-none py-0.5"
                          />
                          <input
                            type="text"
                            value={entry.notes || ''}
                            onChange={(e) =>
                              handleFieldChange(entry.id, 'notes', e.target.value)
                            }
                            placeholder="Add brief note or instructor name..."
                            className="text-[11px] text-slate-400 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#1A365D] focus:outline-none mt-0.5"
                          />
                        </div>
                      </td>

                      {/* Location / Room */}
                      <td className="py-3 px-4 align-top">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <input
                            type="text"
                            value={entry.location}
                            onChange={(e) =>
                              handleFieldChange(entry.id, 'location', e.target.value)
                            }
                            className="w-full bg-transparent text-slate-700 border-b border-transparent hover:border-slate-300 focus:border-[#1A365D] focus:outline-none py-0.5"
                          />
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="py-3 px-4 align-top">
                        <select
                          value={entry.category}
                          onChange={(e) =>
                            handleFieldChange(
                              entry.id,
                              'category',
                              e.target.value as EventCategory
                            )
                          }
                          className={`text-[11px] font-semibold border px-2 py-0.5 rounded-[2px] cursor-pointer focus:outline-none ${getCategoryBadgeClass(
                            entry.category
                          )}`}
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Actions: Sync, Edit, Delete */}
                      <td className="py-3 px-4 align-top text-right">
                        <div className="inline-flex items-center justify-end gap-1">
                          
                          {/* Sync toggle button */}
                          <button
                            id={`btn-sync-entry-${entry.id}`}
                            onClick={() => handleToggleRowSync(entry.id)}
                            title={entry.isSynced ? 'Synced to Calendar' : 'Sync to Calendar'}
                            className={`p-1.5 rounded-[2px] transition-colors ${
                              entry.isSynced
                                ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                                : 'text-slate-400 hover:text-[#1A365D] hover:bg-slate-100'
                            }`}
                          >
                            <CalendarSync className="w-3.5 h-3.5" />
                          </button>

                          {/* Quick inline edit focus */}
                          <button
                            onClick={() =>
                              setEditingRowId(isEditingThis ? null : entry.id)
                            }
                            title="Highlight row"
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-[2px]"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete row */}
                          <button
                            id={`btn-delete-entry-${entry.id}`}
                            onClick={() => handleDeleteRow(entry.id)}
                            title="Remove event"
                            className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-[2px]"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* VIEW MODE 2: Weekly Calendar Grid */
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {days.map((day) => {
            const dayEntries = filteredEntries.filter((e) => e.day === day);

            return (
              <div
                key={day}
                className="bg-white border border-slate-200 rounded-[2px] elevation-1 flex flex-col min-h-[300px]"
              >
                {/* Day Column Header */}
                <div className="bg-slate-50 border-b border-slate-200 p-2.5 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{day.slice(0, 3)}</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {dayEntries.length} items
                  </span>
                </div>

                {/* Day Events */}
                <div className="p-2 space-y-2 flex-1 overflow-y-auto">
                  {dayEntries.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-[11px] text-slate-300 italic p-4 text-center">
                      No events
                    </div>
                  ) : (
                    dayEntries.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-2 bg-white border border-slate-200 rounded-[2px] elevation-1 hover:border-[#1A365D] transition-all group relative"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-mono font-bold text-[#1A365D]">
                            {entry.startTime}
                          </span>
                          <span
                            className={`text-[9px] font-semibold border px-1 py-0.2 rounded-[1px] ${getCategoryBadgeClass(
                              entry.category
                            )}`}
                          >
                            {entry.category}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">
                          {entry.name}
                        </h4>
                        <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />
                          <span className="truncate">{entry.location}</span>
                        </div>
                        <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between">
                          <button
                            onClick={() => handleToggleRowSync(entry.id)}
                            className={`text-[10px] font-medium flex items-center gap-0.5 ${
                              entry.isSynced ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-700'
                            }`}
                          >
                            <CalendarSync className="w-2.5 h-2.5" />
                            <span>{entry.isSynced ? 'Synced' : 'Sync'}</span>
                          </button>
                          <button
                            onClick={() => handleDeleteRow(entry.id)}
                            className="text-slate-300 hover:text-red-600"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pinned Action Bar at Bottom */}
      <div className="mt-8 bg-[#F8FAFC] border border-slate-200 p-4 rounded-[2px] flex flex-col sm:flex-row items-center justify-between gap-4 elevation-1">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-none" />
          <div className="text-xs text-slate-700">
            <span className="font-semibold">All changes buffered locally.</span> Click "Save & Sync" to commit to Google Calendar, Outlook, and your Schedly cloud repository.
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onUploadAnother}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-[2px] transition-colors"
          >
            Upload Another Document
          </button>
          <button
            id="btn-bottom-save-sync"
            onClick={handleSaveAndSync}
            className="px-5 py-2 text-xs font-bold text-white bg-[#1A365D] hover:bg-[#2A4365] rounded-[2px] elevation-1 transition-colors flex items-center gap-1.5"
          >
            <CalendarSync className="w-4 h-4" />
            <span>Save & Sync Changes</span>
          </button>
        </div>
      </div>

      {/* Add New Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-[2px] elevation-3 w-full max-w-md p-6 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                Add New Schedule Event
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddNewEvent} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                  Event / Course Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Physics 201 Seminar"
                  value={newEventDraft.name}
                  onChange={(e) => setNewEventDraft({ ...newEventDraft, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-[2px] focus:border-[#1A365D] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                    Day of Week
                  </label>
                  <select
                    value={newEventDraft.day}
                    onChange={(e) => setNewEventDraft({ ...newEventDraft, day: e.target.value as DayOfWeek })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-[2px] bg-white focus:border-[#1A365D] focus:outline-none"
                  >
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newEventDraft.date}
                    onChange={(e) => setNewEventDraft({ ...newEventDraft, date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-[2px] focus:border-[#1A365D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                    Start Time
                  </label>
                  <input
                    type="text"
                    placeholder="09:00"
                    value={newEventDraft.startTime}
                    onChange={(e) => setNewEventDraft({ ...newEventDraft, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-[2px] focus:border-[#1A365D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                    End Time
                  </label>
                  <input
                    type="text"
                    placeholder="10:30"
                    value={newEventDraft.endTime}
                    onChange={(e) => setNewEventDraft({ ...newEventDraft, endTime: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-[2px] focus:border-[#1A365D] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                  Location / Room
                </label>
                <input
                  type="text"
                  placeholder="e.g. West Campus - Room 402"
                  value={newEventDraft.location}
                  onChange={(e) => setNewEventDraft({ ...newEventDraft, location: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-[2px] focus:border-[#1A365D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                  Category
                </label>
                <select
                  value={newEventDraft.category}
                  onChange={(e) => setNewEventDraft({ ...newEventDraft, category: e.target.value as EventCategory })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-[2px] bg-white focus:border-[#1A365D] focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 border border-slate-300 rounded-[2px] hover:bg-slate-50 text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1A365D] text-white font-semibold rounded-[2px] hover:bg-[#2A4365] elevation-1"
                >
                  Save Entry
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
