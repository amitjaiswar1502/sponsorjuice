import type { Geo, Niche, Platform } from '../../lib/types';

interface Props {
  platform: Platform;
  followers: number;
  views: number;
  niche: Niche;
  geo: Geo;
  onPlatformChange: (platform: Platform) => void;
  onFollowersChange: (followers: number) => void;
  onViewsChange: (views: number) => void;
  onNicheChange: (niche: Niche) => void;
  onGeoChange: (geo: Geo) => void;
}

const PLATFORMS: { value: Platform; label: string }[] = [
  { value: 'tiktok', label: 'TikTok' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'facebook', label: 'Facebook' },
];

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

export default function MetricsSliders({
  platform,
  followers,
  views,
  niche,
  geo,
  onPlatformChange,
  onFollowersChange,
  onViewsChange,
  onNicheChange,
  onGeoChange,
}: Props) {
  return (
    <div class="space-y-6">
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-700">Platform</label>
        <div class="flex flex-wrap gap-1.5 sm:gap-2">
          {PLATFORMS.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => onPlatformChange(p.value)}
              class={`rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-juice-500 sm:px-4 ${
                platform === p.value
                  ? 'bg-juice-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label for="followers-slider" class="mb-2 flex justify-between text-sm font-medium text-gray-700">
          <span>Followers</span>
          <span class="font-data text-juice-600">{followers.toLocaleString()}</span>
        </label>
        <input
          id="followers-slider"
          type="range"
          name="followers"
          aria-label="Follower count"
          min={1000}
          max={1000000}
          step={1000}
          value={followers}
          onInput={(e) => onFollowersChange(Number((e.target as HTMLInputElement).value))}
          class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-juice-600"
        />
      </div>

      <div>
        <label for="views-slider" class="mb-2 flex justify-between text-sm font-medium text-gray-700">
          <span>Average Views per Post</span>
          <span class="font-data text-juice-600">{views.toLocaleString()}</span>
        </label>
        <input
          id="views-slider"
          type="range"
          name="views"
          aria-label="Average views per post"
          min={500}
          max={500000}
          step={500}
          value={views}
          onInput={(e) => onViewsChange(Number((e.target as HTMLInputElement).value))}
          class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-juice-600"
        />
      </div>

      <div>
        <label class="mb-2 block text-sm font-medium text-gray-700">Niche</label>
        <div class="flex flex-wrap gap-1.5 sm:gap-2">
          {NICHES.map((n) => (
            <button
              key={n.value}
              type="button"
              onClick={() => onNicheChange(n.value)}
              class={`rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-juice-500 sm:px-4 ${
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
        <label class="mb-2 block text-sm font-medium text-gray-700">Audience Location</label>
        <div class="flex flex-wrap gap-1.5 sm:gap-2">
          {GEOS.map((g) => (
            <button
              key={g.value}
              type="button"
              onClick={() => onGeoChange(g.value)}
              class={`rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-juice-500 sm:px-4 ${
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
  );
}
