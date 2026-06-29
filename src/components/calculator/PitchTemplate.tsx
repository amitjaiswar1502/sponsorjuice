interface Props {
  value: string;
  onChange: (value: string) => void;
  onRegenerate: () => void;
  isDirty?: boolean;
}

export default function PitchTemplate({
  value,
  onChange,
  onRegenerate,
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
      {isDirty && (
        <p class="text-xs text-gray-500">
          Your edits are kept when you adjust sliders.
        </p>
      )}
      <textarea
        value={value}
        onInput={(e) => onChange((e.target as HTMLTextAreaElement).value)}
        rows={12}
        class="-mx-1 max-h-64 w-full resize-y rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs leading-relaxed text-gray-700 focus:border-juice-300 focus:outline-none focus:ring-2 focus:ring-juice-200 sm:mx-0 sm:p-4 sm:text-sm"
        aria-label="Outreach pitch email"
      />
    </div>
  );
}
