import React, { useState } from 'react';
import { useComplaints } from '../context/ComplaintContext';
import { COMPLAINT_CATEGORIES, COMPLAINT_PRIORITIES } from '../data/mockBureaus';
import { 
  User, 
  Clock, 
  Building2, 
  ShieldCheck, 
  RotateCcw, 
  Save, 
  Check, 
  Info,
  Server,
  Layers
} from 'lucide-react';
import { isFastApiConnected, getApiBaseUrl } from '../services/api';

export const Settings = () => {
  const { settings, saveSettings, resetAllData, bureaus } = useComplaints();

  const [profile, setProfile] = useState({
    name: settings?.userProfile?.name || 'Dr. Alok K. Mishra',
    role: settings?.userProfile?.role || 'Member Secretary & Chief Monitoring Officer',
    email: settings?.userProfile?.email || 'cmo.resolve360@demo.aicte.gov.in',
    department: settings?.userProfile?.department || 'Central Grievance & Vigilance Bureau',
    adminLevel: settings?.userProfile?.adminLevel || 'National Bureau Administrator (Tier 1)'
  });

  const [slaDays, setSlaDays] = useState({
    'Critical': settings?.slaDays?.['Critical'] || 5,
    'High': settings?.slaDays?.['High'] || 10,
    'Medium': settings?.slaDays?.['Medium'] || 14,
    'Low': settings?.slaDays?.['Low'] || 21
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    saveSettings({
      ...settings,
      userProfile: profile,
      slaDays
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all complaint records, history events, and settings back to default mock data?')) {
      resetAllData();
      alert('Prototype restored to default mock data state.');
    }
  };

  const fastApiConnected = isFastApiConnected();
  const apiBaseUrl = getApiBaseUrl() || 'http://localhost:8000 (Local FastAPI Fallback)';

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          System Administration & Prototype Settings
        </h2>
        <p className="text-xs text-slate-500">
          Configure demo officer identity, target resolution SLA thresholds, and future FastAPI backend parameters.
        </p>
      </div>

      {savedSuccess && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-center gap-2 text-xs text-emerald-800 font-semibold animate-in zoom-in-95">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Settings saved to localStorage successfully!</span>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Section 1: Demo User Profile */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Demo Officer Profile</h3>
              <p className="text-xs text-slate-500">Identity displayed across audit actions, remarks, and review logs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Officer Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Designation</label>
              <input
                type="text"
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Department / Cell</label>
              <input
                type="text"
                value={profile.department}
                onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Configurable Resolution Deadlines by Priority */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Target Resolution SLA Deadlines</h3>
              <p className="text-xs text-slate-500">Configurable turnaround days applied during intake priority evaluation</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            {COMPLAINT_PRIORITIES.map((p) => (
              <div key={p} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">{p} Priority</span>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={slaDays[p]}
                    onChange={(e) => setSlaDays({ ...slaDays, [p]: Number(e.target.value) })}
                    className="w-16 rounded-md border border-slate-300 px-2 py-1 text-xs font-bold text-slate-900 text-center"
                  />
                  <span className="text-slate-500 font-medium">Days</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Registered AICTE Bureaus List */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Configured Bureaus / Operational Units</h3>
              <p className="text-xs text-slate-500">Active divisions for case assignment and grievance routing</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {bureaus.map((b) => (
              <div key={b.name} className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start justify-between">
                <div>
                  <span className="font-bold text-slate-800 text-xs block">{b.name}</span>
                  <span className="text-[11px] text-slate-500">Head: {b.head}</span>
                </div>
                <span className="font-mono text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {b.code}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Future FastAPI Integration Layer Readiness */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Backend API Architecture (FastAPI Ready)</h3>
              <p className="text-xs text-slate-500">Current integration layer configuration status</p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">Integration Mode:</span>
              <span className="rounded bg-blue-100 px-2 py-0.5 text-blue-800 font-bold">
                Frontend Prototype + LocalStorage Cache
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">VITE_API_BASE_URL:</span>
              <span className="font-mono text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                {apiBaseUrl}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">FastAPI Connection Status:</span>
              <span className="text-amber-700 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Standby (Service Layer Ready)
              </span>
            </div>
          </div>
        </div>

        {/* Save & Reset Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-200">
          <button
            type="button"
            onClick={handleResetData}
            className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50/70 hover:bg-red-100 px-4 py-2 text-xs font-bold text-red-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Data to Defaults</span>
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-2 text-xs font-bold text-white shadow-xs transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
