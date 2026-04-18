'use client'

import { useEffect, useState } from 'react';

type Settings = {
  font: string;
  arabicSize: string;
  translationSize: string;
};

const STORAGE_KEY = 'quran-reader-settings';

const fontOptions = [
  { value: 'Segoe UI, Tahoma, Geneva, sans-serif', label: 'Modern Arabic' },
  { value: 'Georgia, serif', label: 'Classic Arabic' },
];

const defaultSettings: Settings = {
  font: fontOptions[0].value,
  arabicSize: '26px',
  translationSize: '16px',
};

function applySettings(settings: Settings) {
  document.documentElement.style.setProperty('--arabic-font-family', settings.font);
  document.documentElement.style.setProperty('--arabic-font-size', settings.arabicSize);
  document.documentElement.style.setProperty('--translation-font-size', settings.translationSize);
}

export default function SettingsPanel() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : defaultSettings;
    setSettings(parsed);
    applySettings(parsed);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);

  const handleSave = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 right-4 z-50 rounded-full bg-slate-900 p-3 text-white shadow-lg hover:bg-slate-800"
        title="Show Settings"
      >
        ⚙️
      </button>
    );
  }

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Arabic Font</label>
          <select
            aria-label="Select Arabic font"
            value={settings.font}
            onChange={(event) => setSettings({ ...settings, font: event.target.value })}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2"
          >
            {fontOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Arabic Font Size</label>
          <input
            type="range"
            min="18"
            max="40"
            value={parseInt(settings.arabicSize, 10)}
            onChange={(event) => setSettings({ ...settings, arabicSize: `${event.target.value}px` })}
            className="w-full"
          />
          <p className="mt-2 text-sm text-slate-500">{settings.arabicSize}</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Translation Font Size</label>
          <input
            type="range"
            min="12"
            max="24"
            value={parseInt(settings.translationSize, 10)}
            onChange={(event) => setSettings({ ...settings, translationSize: `${event.target.value}px` })}
            className="w-full"
          />
          <p className="mt-2 text-sm text-slate-500">{settings.translationSize}</p>
        </div>

        <button
          onClick={handleSave}
          className="w-full rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
        >
          Save Settings
        </button>
      </div>
    </aside>
  );
}
