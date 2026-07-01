import { formatCurrency } from '../../data/calculator-math';
import type { Geo, Niche, Platform, PlatformProfile } from '../../lib/types';

const PLATFORM_LABELS: Record<Platform, string> = {
  tiktok: 'TikTok',
  instagram: 'Instagram',
  youtube: 'YouTube',
};

const NICHES: { value: Niche; label: string }[] = [
  { value: 'finance', label: 'Finance' },
  { value: 'tech', label: 'Tech' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'comedy', label: 'Comedy' },
];

const GEOS: { value: Geo; label: string }[] = [
  { value: 'us_ca', label: 'US / Canada' },
  { value: 'uk_au', label: 'UK / Australia' },
  { value: 'global', label: 'Global' },
];

interface Props {
  profile: PlatformProfile;
  packageRateLow: number;
  packageRateHigh: number;
  isOnlyActive: boolean;
  onToggle: (active: boolean) => void;
  onUpdate: (updates: Partial<Omit<PlatformProfile, 'platform'>>) => void;
}

export default function PlatformAccountCard({
  profile,
  packageRateLow,
  packageRateHigh,
  isOnlyActive,
  onToggle,
  onUpdate,
}: Props) {
  const { platform, active, followers, views, niche, geo } = profile;
  const label = PLATFORM_LABELS[platform];

  return (
    <div
      class={`rounded-xl border transition-colors duration-200 ${
        active
          ? 'border-juice-200 bg-white shadow-sm'
          : 'border-gray-200 bg-gray-50'
      }`}
    >
      <div class="flex items-center justify-between gap-3 px-4 py-3">
        <h3 class={`font-semibold ${active ? 'text-gray-900' : 'text-gray-500'}`}>
          {label}
        </h3>
        <label class="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
          <span class="sr-only">Include {label} in package</span>
          <input
            type="checkbox"
            checked={active}
            disabled={isOnlyActive && active}
            onChange={(e) => onToggle((e.target as HTMLInputElement).checked)}
            class="h-4 w-4 rounded border-gray-300 accent-juice-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-juice-500"
          />
          <span aria-hidden="true">Active</span>
        </label>
      </div>

      {active && (
        <div class="space-y-5 border-t border-gray-100 px-4 py-4">
          <div>
            <label
              for={`${platform}-followers`}
              class="mb-2 flex justify-between text-sm font-medium text-gray-700"
            >
              <span>Followers</span>
              <span class="text-juice-600 tabular-nums">{followers.toLocaleString()}</span>
            </label>
            <input
              id={`${platform}-followers`}
              type="range"
              min={1000}
              max={1000000}
              step={1000}
              value={followers}
              onInput={(e) =>
                onUpdate({ followers: Number((e.target as HTMLInputElement).value) })
              }
              class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-juice-600"
            />
          </div>

          <div>
            <label
              for={`${platform}-views`}
              class="mb-2 flex justify-between text-sm font-medium text-gray-700"
            >
              <span>Average Views per Post</span>
              <span class="text-juice-600 tabular-nums">{views.toLocaleString()}</span>
            </label>
            <input
              id={`${platform}-views`}
              type="range"
              min={500}
              max={500000}
              step={500}
              value={views}
              onInput={(e) =>
                onUpdate({ views: Number((e.target as HTMLInputElement).value) })
              }
              class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-juice-600"
            />
          </div>

          <div>
            <span class="mb-2 block text-sm font-medium text-gray-700">Niche</span>
            <div class="flex flex-wrap gap-1.5">
              {NICHES.map((n) => (
                <button
                  key={n.value}
                  type="button"
                  onClick={() => onUpdate({ niche: n.value })}
                  class={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-juice-500 ${
                    niche === n.value
                      ? 'bg-juice-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span class="mb-2 block text-sm font-medium text-gray-700">Audience Location</span>
            <div class="flex flex-wrap gap-1.5">
              {GEOS.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => onUpdate({ geo: g.value })}
                  class={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-juice-500 ${
                    geo === g.value
                      ? 'bg-juice-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {active && (
        <div class="border-t border-gray-100 px-4 py-2.5 text-sm text-gray-500">
          <span class="font-medium text-gray-700">Platform rate:</span>{' '}
          <span class="tabular-nums text-juice-600">
            {formatCurrency(packageRateLow)} – {formatCurrency(packageRateHigh)}
          </span>
        </div>
      )}
    </div>
  );
}
