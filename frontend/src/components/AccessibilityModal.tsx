import React from 'react';
import { Accessibility, X, Type, Eye, Check } from 'lucide-react';
import { AccessibilitySettings } from '../types';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-purple-100">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-100 text-purple-700 rounded-2xl">
              <Accessibility className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Accessibility Settings</h3>
              <p className="text-xs text-slate-500">Customize reading comfort and visual clarity</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Text Size Multiplier */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-3">
              <Type className="w-4 h-4 text-purple-600" />
              Text Scale
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Normal (100%)', val: 1.0 },
                { label: 'Large (115%)', val: 1.15 },
                { label: 'Extra (130%)', val: 1.3 },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => onUpdateSettings({ fontSizeMultiplier: opt.val })}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-semibold border transition-all ${
                    settings.fontSizeMultiplier === opt.val
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm font-semibold text-slate-900">High Contrast Mode</p>
                <p className="text-xs text-slate-500">Enhanced visual readability</p>
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ highContrast: !settings.highContrast })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.highContrast ? 'bg-purple-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Dyslexia Friendly Font Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <span className="font-bold text-purple-600 text-base">Aa</span>
              <div>
                <p className="text-sm font-semibold text-slate-900">Dyslexia Friendly Font</p>
                <p className="text-xs text-slate-500">Increases letter spacing & clarity</p>
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ dyslexicFont: !settings.dyslexicFont })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.dyslexicFont ? 'bg-purple-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.dyslexicFont ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl text-sm transition-colors shadow-md shadow-purple-200"
          >
            <Check className="w-4 h-4" />
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};
