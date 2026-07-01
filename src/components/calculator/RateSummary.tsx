import { formatCurrency } from '../../data/calculator-math';
import type { Platform, PlatformProfile, PlatformRateLine } from '../../lib/types';

const PLATFORM_LABELS: Record<Platform, string> = {
  tiktok: 'TikTok',
  instagram: 'Instagram',
  youtube: 'YouTube',
};

interface LineItem extends PlatformRateLine {
  profile: PlatformProfile;
}

interface Props {
  lines: LineItem[];
  totalLow: number;
  totalHigh: number;
}

export default function RateSummary({ lines, totalLow, totalHigh }: Props) {
  if (lines.length <= 1) return null;

  return (
    <div class="rounded-xl border border-gray-200 bg-white p-4">
      <h3 class="text-sm font-semibold text-gray-900">Package breakdown</h3>
      <ul class="mt-3 space-y-2">
        {lines.map((line) => (
          <li
            key={line.platform}
            class="flex items-center justify-between gap-2 text-sm text-gray-600"
          >
            <span>{PLATFORM_LABELS[line.platform]}</span>
            <span class="tabular-nums text-gray-900">
              {formatCurrency(line.packageRateLow)} –{' '}
              {formatCurrency(line.packageRateHigh)}
            </span>
          </li>
        ))}
      </ul>
      <div class="mt-3 flex items-center justify-between gap-2 border-t border-gray-100 pt-3 text-sm font-semibold text-gray-900">
        <span>Package total</span>
        <span class="tabular-nums text-juice-600">
          {formatCurrency(totalLow)} – {formatCurrency(totalHigh)}
        </span>
      </div>
    </div>
  );
}
