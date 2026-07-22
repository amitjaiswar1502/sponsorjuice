import { useEffect, useState } from 'preact/hooks';
import { formatCurrency } from '../../data/calculator-math';
import { getSavedCalcPitchText, parsePitchEmail } from '../../lib/email';
import {
  deleteCalculation,
  getCalculations,
  isStorageAvailable,
} from '../../lib/localStorage';
import type { SavedCalculation } from '../../lib/types';

interface Props {
  refreshKey: number;
  onLoad: (calc: SavedCalculation) => void;
}

export default function CalculationHistory({ refreshKey, onLoad }: Props) {
  const [history, setHistory] = useState<SavedCalculation[]>([]);
  const [storageOk, setStorageOk] = useState(true);

  useEffect(() => {
    setStorageOk(isStorageAvailable());
    setHistory(getCalculations());
  }, [refreshKey]);

  const handleDelete = (id: string) => {
    deleteCalculation(id);
    setHistory(getCalculations());
  };

  if (!storageOk) {
    return (
      <div class="min-h-[13rem] rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
        Storage unavailable — saved calculations cannot be stored in this browser.
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div class="min-h-[13rem] rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
        No saved calculations yet. Hit &quot;Save Calculation&quot; to keep a record.
      </div>
    );
  }

  return (
    <div class="min-h-[13rem] space-y-3">
      <h3 class="text-lg font-semibold text-gray-900">Saved Calculations</h3>
      <div class="max-h-48 space-y-2 overflow-auto">
        {history.map((calc) => {
          const activeCount =
            calc.version === 2 && calc.platformProfiles
              ? calc.platformProfiles.filter((p) => p.active).length
              : 1;
          const label =
            activeCount > 1 ? 'Multi-platform' : calc.platform;

          const pitchText = getSavedCalcPitchText(calc);
          const { mailtoUrl } = parsePitchEmail(pitchText);

          return (
            <div
              key={calc.id}
              class="flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
            >
              <button
                type="button"
                onClick={() => onLoad(calc)}
                class="min-w-0 flex-1 truncate text-left hover:text-juice-600"
              >
                <span class="font-medium capitalize">{label}</span>
                <span class="mx-1 text-gray-400">·</span>
                <span class="font-data text-gray-600">
                  {formatCurrency(calc.packageRateLow)} – {formatCurrency(calc.packageRateHigh)}
                </span>
                <span class="ml-2 text-xs text-gray-400">
                  {new Date(calc.timestamp).toLocaleDateString()}
                </span>
              </button>

              <div class="flex shrink-0 items-center gap-1">
                <a
                  href={mailtoUrl}
                  title="Send email draft for this saved calculation with 1 click"
                  class="inline-flex items-center gap-1 rounded-md bg-juice-50 px-2 py-1 text-xs font-semibold text-juice-700 transition-colors duration-200 hover:bg-juice-100 hover:text-juice-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-juice-500"
                >
                  <svg class="h-3.5 w-3.5 text-juice-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Send Email</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleDelete(calc.id)}
                  class="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                  aria-label="Delete calculation"
                >
                  ×
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
