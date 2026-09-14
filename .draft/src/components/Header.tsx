import React from 'react';
import { Calendar, Upload, Clock, User, ArrowRight, LogOut, CheckCircle2 } from 'lucide-react';
import { ActiveScreen } from '../types';

interface HeaderProps {
  activeScreen: ActiveScreen;
  setActiveScreen: (screen: ActiveScreen) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
  entriesCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  setActiveScreen,
  isAuthenticated,
  onLogout,
}) => {
  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white border-b border-slate-200 elevation-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo - Sharp Corporate Material */}
          <div 
            id="brand-logo"
            onClick={() => setActiveScreen(isAuthenticated ? 'upload' : 'landing')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-8 h-8 bg-[#1A365D] text-white flex items-center justify-center rounded-[2px] font-bold tracking-tight text-base shadow-sm">
              <span className="font-semibold">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#1A365D] leading-none">
                SCHEDLY
              </span>
              <span className="text-[10px] tracking-wider text-slate-500 font-medium uppercase mt-0.5">
                Schedule Management
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav id="header-nav" className="hidden md:flex items-center space-x-1">
            {!isAuthenticated ? (
              <>
                <button
                  id="nav-landing-features"
                  onClick={() => setActiveScreen('landing')}
                  className={`px-3.5 py-2 text-sm font-medium rounded-[2px] transition-colors ${
                    activeScreen === 'landing' 
                      ? 'text-[#1A365D] bg-slate-100' 
                      : 'text-slate-600 hover:text-[#1A365D] hover:bg-slate-50'
                  }`}
                >
                  Features & Workflow
                </button>
                <button
                  id="nav-landing-pricing"
                  onClick={() => setActiveScreen('landing')}
                  className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-[#1A365D] hover:bg-slate-50 rounded-[2px] transition-colors"
                >
                  Pricing
                </button>
                <button
                  id="nav-auth-login"
                  onClick={() => setActiveScreen('auth')}
                  className={`px-3.5 py-2 text-sm font-medium rounded-[2px] transition-colors ${
                    activeScreen === 'auth'
                      ? 'text-[#1A365D] bg-slate-100'
                      : 'text-slate-700 hover:text-[#1A365D] hover:bg-slate-50'
                  }`}
                >
                  Log In / Sign Up
                </button>
                <button
                  id="nav-cta-get-started"
                  onClick={() => setActiveScreen('upload')}
                  className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#1A365D] hover:bg-[#2A4365] rounded-[2px] elevation-1 transition-all"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  id="nav-upload"
                  onClick={() => setActiveScreen('upload')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-[2px] transition-colors ${
                    activeScreen === 'upload'
                      ? 'text-[#1A365D] bg-slate-100 font-semibold'
                      : 'text-slate-600 hover:text-[#1A365D] hover:bg-slate-50'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Schedule</span>
                </button>

                <button
                  id="nav-schedule-view"
                  onClick={() => setActiveScreen('schedule_view')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-[2px] transition-colors ${
                    activeScreen === 'schedule_view'
                      ? 'text-[#1A365D] bg-slate-100 font-semibold'
                      : 'text-slate-600 hover:text-[#1A365D] hover:bg-slate-50'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Active Schedule</span>
                </button>

                <button
                  id="nav-history"
                  onClick={() => setActiveScreen('history')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-[2px] transition-colors ${
                    activeScreen === 'history'
                      ? 'text-[#1A365D] bg-slate-100 font-semibold'
                      : 'text-slate-600 hover:text-[#1A365D] hover:bg-slate-50'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>History</span>
                </button>

                <button
                  id="nav-profile"
                  onClick={() => setActiveScreen('profile')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-[2px] transition-colors ${
                    activeScreen === 'profile'
                      ? 'text-[#1A365D] bg-slate-100 font-semibold'
                      : 'text-slate-600 hover:text-[#1A365D] hover:bg-slate-50'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>

                <div className="h-5 w-[1px] bg-slate-200 mx-2" />

                <button
                  id="nav-logout-btn"
                  onClick={onLogout}
                  title="Sign out of current session"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-[2px] transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">Sign Out</span>
                </button>
              </>
            )}
          </nav>

          {/* Mobile screen quick switchers */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              id="mobile-upload-btn"
              onClick={() => setActiveScreen('upload')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-[2px] ${
                activeScreen === 'upload' ? 'bg-[#1A365D] text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Upload
            </button>
            <button
              id="mobile-schedule-btn"
              onClick={() => setActiveScreen('schedule_view')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-[2px] ${
                activeScreen === 'schedule_view' ? 'bg-[#1A365D] text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Schedule
            </button>
            <button
              id="mobile-profile-btn"
              onClick={() => setActiveScreen('profile')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-[2px] ${
                activeScreen === 'profile' ? 'bg-[#1A365D] text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Profile
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
