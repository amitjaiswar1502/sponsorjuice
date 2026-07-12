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
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div class="space-y-3">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <h3 class="text-lg font-semibold text-gray-900">Outreach Pitch</h3>
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onRegenerate}
            class="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-juice-500"
          >
            Regenerate from metrics
          </button>
          <button
            type="button"
            onClick={handleCopy}
            class="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-juice-500"
          >
            Copy
          </button>
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
