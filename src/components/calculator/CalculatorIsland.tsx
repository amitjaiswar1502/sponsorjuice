import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import {
  ALL_PLATFORMS,
  calculatePlatformRates,
  createDefaultProfiles,
  formatCurrency,
  generateCombinedPitchTemplate,
  generatePitchTemplate,
  getActiveProfiles,
  sumPlatformRates,
} from '../../data/calculator-math';
import { saveCalculation } from '../../lib/localStorage';
import type {
  DeliverableId,
  PitchMode,
  Platform,
  PlatformProfile,
  SavedCalculation,
} from '../../lib/types';
import CalculationHistory from './CalculationHistory';
import DeliverablesBasket from './DeliverablesBasket';
import PitchTemplate from './PitchTemplate';
import PlatformAccountCard from './PlatformAccountCard';
import RateSummary from './RateSummary';

interface Props {
  initialPlatform?: Platform;
}

type RateLine = ReturnType<typeof calculatePlatformRates> & {
  profile: PlatformProfile;
};

export default function CalculatorIsland({ initialPlatform = 'tiktok' }: Props) {
  const [profiles, setProfiles] = useState<PlatformProfile[]>(() =>
    createDefaultProfiles(initialPlatform),
  );
  const [basket, setBasket] = useState<DeliverableId[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [saveMessage, setSaveMessage] = useState('');
  const [pitchMode, setPitchMode] = useState<PitchMode>(initialPlatform);
  const [pitchTexts, setPitchTexts] = useState<Partial<Record<PitchMode, string>>>(
    {},
  );
  const [pitchDirty, setPitchDirty] = useState<Partial<Record<PitchMode, boolean>>>(
    {},
  );

  const activeProfiles = useMemo(() => getActiveProfiles(profiles), [profiles]);

  const rateLines = useMemo<RateLine[]>(
    () =>
      activeProfiles.map((profile) => ({
        profile,
        ...calculatePlatformRates(profile, basket),
      })),
    [activeProfiles, basket],
  );

  const totals = useMemo(() => sumPlatformRates(rateLines), [rateLines]);

  const availablePitchModes = useMemo(() => {
    const modes: PitchMode[] = activeProfiles.map((p) => p.platform);
    if (activeProfiles.length >= 2) modes.unshift('combined');
    return modes;
  }, [activeProfiles]);

  const generateForMode = useCallback(
    (mode: PitchMode, lines: RateLine[], total: { totalLow: number; totalHigh: number }) => {
      if (mode === 'combined') {
        return generateCombinedPitchTemplate({
          profiles,
          lines,
          totalLow: total.totalLow,
          totalHigh: total.totalHigh,
        });
      }

      const profile = profiles.find((p) => p.platform === mode);
      if (!profile) return '';

      const line = lines.find((l) => l.platform === mode);
      const rates = line ?? calculatePlatformRates(profile, basket);

      return generatePitchTemplate({
        platform: profile.platform,
        followers: profile.followers,
        views: profile.views,
        niche: profile.niche,
        geo: profile.geo,
        packageRateLow: rates.packageRateLow,
        packageRateHigh: rates.packageRateHigh,
      });
    },
    [profiles, basket],
  );

  useEffect(() => {
    if (availablePitchModes.length === 0) return;
    if (!availablePitchModes.includes(pitchMode)) {
      setPitchMode(availablePitchModes[0]);
    }
  }, [availablePitchModes, pitchMode]);

  useEffect(() => {
    if (availablePitchModes.length === 0) return;

    setPitchTexts((prev) => {
      let changed = false;
      const next = { ...prev };

      for (const mode of availablePitchModes) {
        if (!pitchDirty[mode]) {
          const generated = generateForMode(mode, rateLines, totals);
          if (next[mode] !== generated) {
            next[mode] = generated;
            changed = true;
          }
        }
      }

      return changed ? next : prev;
    });
  }, [profiles, basket, rateLines, totals, availablePitchModes, pitchDirty, generateForMode]);

  const handleAddDeliverable = (id: DeliverableId) => {
    setBasket((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const handleRemoveDeliverable = (id: DeliverableId) => {
    setBasket((prev) => prev.filter((item) => item !== id));
  };

  const handleProfileUpdate = (
    platform: Platform,
    updates: Partial<Omit<PlatformProfile, 'platform'>>,
  ) => {
    setProfiles((prev) =>
      prev.map((p) => (p.platform === platform ? { ...p, ...updates } : p)),
    );
  };

  const handleToggle = (platform: Platform, active: boolean) => {
    if (!active && activeProfiles.length <= 1) return;
    setProfiles((prev) =>
      prev.map((p) => (p.platform === platform ? { ...p, active } : p)),
    );
  };

  const handleSave = () => {
    const primary = activeProfiles[0];
    if (!primary) return;

    const primaryRates = calculatePlatformRates(primary, basket);
    const isMulti = activeProfiles.length > 1;

    const entry: SavedCalculation = {
      version: 2,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      platform: primary.platform,
      followers: primary.followers,
      views: primary.views,
      niche: primary.niche,
      geo: primary.geo,
      basket,
      baseRateLow: primaryRates.baseRateLow,
      baseRateHigh: primaryRates.baseRateHigh,
      packageRateLow: isMulti ? totals.totalLow : primaryRates.packageRateLow,
      packageRateHigh: isMulti ? totals.totalHigh : primaryRates.packageRateHigh,
      platformProfiles: profiles,
      activePitchMode: pitchMode,
      pitchTexts,
    };

    const ok = saveCalculation(entry);
    setSaveMessage(ok ? 'Saved!' : 'Could not save — storage unavailable.');
    setRefreshKey((k) => k + 1);
    setTimeout(() => setSaveMessage(''), 2000);
  };

  const handleLoad = (calc: SavedCalculation) => {
    if (calc.version === 2 && calc.platformProfiles) {
      setProfiles(calc.platformProfiles);
      setBasket(calc.basket);
      setPitchMode(
        calc.activePitchMode ??
          calc.platformProfiles.find((p) => p.active)?.platform ??
          'tiktok',
      );
      setPitchTexts(calc.pitchTexts ?? {});
      const dirty: Partial<Record<PitchMode, boolean>> = {};
      for (const key of Object.keys(calc.pitchTexts ?? {})) {
        dirty[key as PitchMode] = true;
      }
      setPitchDirty(dirty);
      return;
    }

    const migrated = createDefaultProfiles(calc.platform).map((p) =>
      p.platform === calc.platform
        ? {
            ...p,
            active: true,
            followers: calc.followers,
            views: calc.views,
            niche: calc.niche,
            geo: calc.geo,
          }
        : { ...p, active: false },
    );

    setProfiles(migrated);
    setBasket(calc.basket);
    setPitchMode(calc.platform);

    if (calc.pitchText) {
      setPitchTexts({ [calc.platform]: calc.pitchText });
      setPitchDirty({ [calc.platform]: true });
    } else {
      setPitchTexts({});
      setPitchDirty({});
    }
  };

  const handlePitchChange = (value: string) => {
    setPitchTexts((prev) => ({ ...prev, [pitchMode]: value }));
    setPitchDirty((prev) => ({ ...prev, [pitchMode]: true }));
  };

  const handlePitchRegenerate = () => {
    const generated = generateForMode(pitchMode, rateLines, totals);
    setPitchTexts((prev) => ({ ...prev, [pitchMode]: generated }));
    setPitchDirty((prev) => ({ ...prev, [pitchMode]: false }));
  };

  const displayLow =
    activeProfiles.length > 1
      ? totals.totalLow
      : (rateLines[0]?.packageRateLow ?? 0);
  const displayHigh =
    activeProfiles.length > 1
      ? totals.totalHigh
      : (rateLines[0]?.packageRateHigh ?? 0);

  const currentPitchText =
    pitchTexts[pitchMode] ??
    generateForMode(pitchMode, rateLines, totals);

  return (
    <>
      <h2 class="sr-only">Configure Your Rate</h2>
      <div class="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div class="space-y-6">
          <div class="space-y-3">
            <h3 class="text-lg font-semibold text-gray-900">Your accounts</h3>
            <p class="text-sm text-gray-500">
              Toggle the platforms you want in your package. Configure metrics for each
              active account.
            </p>
            {ALL_PLATFORMS.map((platform) => {
              const profile = profiles.find((p) => p.platform === platform)!;
              const rates = calculatePlatformRates(profile, basket);
              return (
                <PlatformAccountCard
                  key={platform}
                  profile={profile}
                  packageRateLow={rates.packageRateLow}
                  packageRateHigh={rates.packageRateHigh}
                  isOnlyActive={activeProfiles.length === 1 && profile.active}
                  onToggle={(active) => handleToggle(platform, active)}
                  onUpdate={(updates) => handleProfileUpdate(platform, updates)}
                />
              );
            })}
          </div>

          <DeliverablesBasket
            basket={basket}
            onAdd={handleAddDeliverable}
            onRemove={handleRemoveDeliverable}
          />
        </div>

        <div class="space-y-6">
          <div class="rounded-2xl border border-juice-200 bg-gradient-to-br from-juice-50 to-white p-6">
            <p class="text-sm font-medium uppercase tracking-wide text-juice-600">
              {activeProfiles.length > 1 ? 'Package Total' : 'Estimated Rate'}
            </p>
            <p class="mt-2 break-words text-3xl font-bold text-gray-900 tabular-nums sm:text-4xl">
              {formatCurrency(displayLow)} – {formatCurrency(displayHigh)}
            </p>
            {activeProfiles.length === 1 && rateLines[0] && (
              <p class="mt-2 text-sm text-gray-500">
                Base rate: {formatCurrency(rateLines[0].baseRateLow)} –{' '}
                {formatCurrency(rateLines[0].baseRateHigh)}
                {basket.length > 0 && ' · Package multiplier applied'}
              </p>
            )}
            {activeProfiles.length > 1 && (
              <p class="mt-2 text-sm text-gray-500">
                Sum of {activeProfiles.length} active platform rates
                {basket.length > 0 && ' · Shared deliverables applied to each'}
              </p>
            )}
            <button
              type="button"
              onClick={handleSave}
              class="mt-4 w-full rounded-lg bg-juice-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-juice-700 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-juice-500"
            >
              Save Calculation
            </button>
            {saveMessage && (
              <p class="mt-2 text-center text-sm text-juice-600">{saveMessage}</p>
            )}
          </div>

          <RateSummary
            lines={rateLines}
            totalLow={totals.totalLow}
            totalHigh={totals.totalHigh}
          />

          <PitchTemplate
            pitchMode={pitchMode}
            availableModes={availablePitchModes}
            value={currentPitchText}
            onChange={handlePitchChange}
            onRegenerate={handlePitchRegenerate}
            onModeChange={setPitchMode}
            isDirty={!!pitchDirty[pitchMode]}
          />

          <CalculationHistory refreshKey={refreshKey} onLoad={handleLoad} />
        </div>
      </div>
    </>
  );
}
