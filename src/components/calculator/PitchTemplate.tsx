import { useState } from 'preact/hooks';
import { parsePitchEmail } from '../../lib/email';
import type { PitchMode, Platform } from '../../lib/types';

const MODE_LABELS: Record<Platform, string> = {
  tiktok: 'TikTok',
  instagram: 'Instagram',
  youtube: 'YouTube',
  facebook: 'Facebook',
};

function labelForMode(mode: PitchMode): string {
  if (mode === 'combined') return 'Combined';
  return MODE_LABELS[mode];
}

interface Props {
  pitchMode: PitchMode;
  availableModes: PitchMode[];
  value: string;
  onChange: (value: string) => void;
  onRegenerate: () => void;
  onModeChange: (mode: PitchMode) => void;
  isDirty?: boolean;
}

export default function PitchTemplate({
  pitchMode,
  availableModes,
  value,
  onChange,
  onRegenerate,
  onModeChange,
  isDirty = false,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const { mailtoUrl, gmailUrl } = parsePitchEmail(value);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div class="space-y-3">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <h3 class="text-lg font-semibold text-gray-900">Outreach Pitch</h3>
        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onRegenerate}
            class="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-juice-500"
          >
            Regenerate
          </button>
          <button
            type="button"
            onClick={handleCopy}
            class="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-juice-500"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>

          <div class="relative inline-flex rounded-lg shadow-sm">
            <a
              href={mailtoUrl}
              class="inline-flex items-center gap-1.5 rounded-l-lg bg-juice-600 px-3 py-1.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-juice-700 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-juice-500"
              title="Send email draft using default mail app"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Send Email</span>
            </a>
            <button
              type="button"
              onClick={() => setShowOptions(!showOptions)}
              class="rounded-r-lg border-l border-juice-700 bg-juice-600 px-2 py-1.5 text-white transition-colors duration-200 hover:bg-juice-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-juice-500"
              aria-label="More email send options"
              aria-expanded={showOptions}
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showOptions && (
              <div class="absolute right-0 top-full z-10 mt-1 w-44 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                <a
                  href={mailtoUrl}
                  onClick={() => setShowOptions(false)}
                  class="block px-4 py-2 text-xs font-medium text-gray-700 hover:bg-juice-50 hover:text-juice-700"
                >
                  Default Mail App
                </a>
                <a
                  href={gmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowOptions(false)}
                  class="block px-4 py-2 text-xs font-medium text-gray-700 hover:bg-juice-50 hover:text-juice-700"
                >
                  Open in Gmail Web
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {availableModes.length > 1 && (
        <div
          class="flex gap-1 overflow-x-auto rounded-lg bg-gray-100 p-1"
          role="tablist"
          aria-label="Pitch type"
        >
          {availableModes.map((mode) => (
            <button
              key={mode}
              type="button"
              role="tab"
              aria-selected={pitchMode === mode}
              onClick={() => onModeChange(mode)}
              class={`shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-juice-500 ${
                pitchMode === mode
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {labelForMode(mode)}
            </button>
          ))}
        </div>
      )}

      {isDirty && (
        <p class="text-xs text-gray-500">
          Your edits are kept when you adjust sliders.
        </p>
      )}
      <textarea
        value={value}
        onInput={(e) => onChange((e.target as HTMLTextAreaElement).value)}
        rows={14}
        class="-mx-1 max-h-80 w-full resize-y rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs leading-relaxed text-gray-700 focus:border-juice-300 focus:outline-none focus:ring-2 focus:ring-juice-200 sm:mx-0 sm:p-4 sm:text-sm"
        aria-label={`Outreach pitch email — ${labelForMode(pitchMode)}`}
      />
    </div>
  );
}
