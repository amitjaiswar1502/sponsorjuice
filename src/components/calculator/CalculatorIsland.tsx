import { useEffect, useMemo, useState } from 'preact/hooks';
import {
  calculateRates,
  formatCurrency,
  generatePitchTemplate,
} from '../../data/calculator-math';
import { saveCalculation } from '../../lib/localStorage';
import type {
  DeliverableId,
  Geo,
  Niche,
  Platform,
  SavedCalculation,
} from '../../lib/types';
import CalculationHistory from './CalculationHistory';
import DeliverablesBasket from './DeliverablesBasket';
import MetricsSliders from './MetricsSliders';
import PitchTemplate from './PitchTemplate';

interface Props {
  initialPlatform?: Platform;
}

export default function CalculatorIsland({ initialPlatform = 'tiktok' }: Props) {
  const [platform, setPlatform] = useState<Platform>(initialPlatform);
  const [followers, setFollowers] = useState(50_000);
  const [views, setViews] = useState(10_000);
  const [niche, setNiche] = useState<Niche>('beauty');
  const [geo, setGeo] = useState<Geo>('us_ca');
  const [basket, setBasket] = useState<DeliverableId[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [saveMessage, setSaveMessage] = useState('');
  const [isPitchDirty, setIsPitchDirty] = useState(false);
  const [pitchText, setPitchText] = useState(() =>
    generatePitchTemplate({
      platform: initialPlatform,
      followers: 50_000,
      views: 10_000,
      niche: 'beauty',
      geo: 'us_ca',
      packageRateLow: calculateRates(10_000, initialPlatform, 'beauty', 'us_ca', [])
        .packageRateLow,
      packageRateHigh: calculateRates(10_000, initialPlatform, 'beauty', 'us_ca', [])
        .packageRateHigh,
    }),
  );

  const rates = useMemo(
    () => calculateRates(views, platform, niche, geo, basket),
    [views, platform, niche, geo, basket],
  );

  useEffect(() => {
    if (isPitchDirty) return;
    setPitchText(
      generatePitchTemplate({
        platform,
        followers,
        views,
        niche,
        geo,
        packageRateLow: rates.packageRateLow,
        packageRateHigh: rates.packageRateHigh,
      }),
    );
  }, [
    platform,
    followers,
    views,
    niche,
    geo,
    rates.packageRateLow,
    rates.packageRateHigh,
    isPitchDirty,
  ]);

  const handleAddDeliverable = (id: DeliverableId) => {
    setBasket((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const handleRemoveDeliverable = (id: DeliverableId) => {
    setBasket((prev) => prev.filter((item) => item !== id));
  };

  const handleSave = () => {
    const entry: SavedCalculation = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      platform,
      followers,
      views,
      niche,
      geo,
      basket,
      baseRateLow: rates.baseRateLow,
      baseRateHigh: rates.baseRateHigh,
      packageRateLow: rates.packageRateLow,
      packageRateHigh: rates.packageRateHigh,
      pitchText,
    };
    const ok = saveCalculation(entry);
    setSaveMessage(ok ? 'Saved!' : 'Could not save — storage unavailable.');
    setRefreshKey((k) => k + 1);
    setTimeout(() => setSaveMessage(''), 2000);
  };

  const handleLoad = (calc: SavedCalculation) => {
    setPlatform(calc.platform);
    setFollowers(calc.followers);
    setViews(calc.views);
    setNiche(calc.niche);
    setGeo(calc.geo);
    setBasket(calc.basket);

    if (calc.pitchText) {
      setPitchText(calc.pitchText);
      setIsPitchDirty(true);
    } else {
      setIsPitchDirty(false);
      setPitchText(
        generatePitchTemplate({
          platform: calc.platform,
          followers: calc.followers,
          views: calc.views,
          niche: calc.niche,
          geo: calc.geo,
          packageRateLow: calc.packageRateLow,
          packageRateHigh: calc.packageRateHigh,
        }),
      );
    }
  };

  const handlePitchChange = (value: string) => {
    setPitchText(value);
    setIsPitchDirty(true);
  };

  const handlePitchRegenerate = () => {
    setPitchText(
      generatePitchTemplate({
        platform,
        followers,
        views,
        niche,
        geo,
        packageRateLow: rates.packageRateLow,
        packageRateHigh: rates.packageRateHigh,
      }),
    );
    setIsPitchDirty(false);
  };

  return (
    <>
      <h2 class="sr-only">Configure Your Rate</h2>
      <div class="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div class="space-y-8">
        <MetricsSliders
          platform={platform}
          followers={followers}
          views={views}
          niche={niche}
          geo={geo}
          onPlatformChange={setPlatform}
          onFollowersChange={setFollowers}
          onViewsChange={setViews}
          onNicheChange={setNiche}
          onGeoChange={setGeo}
        />
        <DeliverablesBasket
          basket={basket}
          onAdd={handleAddDeliverable}
          onRemove={handleRemoveDeliverable}
        />
      </div>

      <div class="space-y-6">
        <div class="rounded-2xl border border-juice-200 bg-gradient-to-br from-juice-50 to-white p-6">
          <p class="text-sm font-medium uppercase tracking-wide text-juice-600">
            Estimated Rate
          </p>
          <p class="mt-2 break-words text-3xl font-bold text-gray-900 tabular-nums sm:text-4xl">
            {formatCurrency(rates.packageRateLow)} – {formatCurrency(rates.packageRateHigh)}
          </p>
          <p class="mt-2 text-sm text-gray-500">
            Base rate: {formatCurrency(rates.baseRateLow)} –{' '}
            {formatCurrency(rates.baseRateHigh)}
            {basket.length > 0 && ' · Package multiplier applied'}
          </p>
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

        <PitchTemplate
          value={pitchText}
          onChange={handlePitchChange}
          onRegenerate={handlePitchRegenerate}
          isDirty={isPitchDirty}
        />

        <CalculationHistory refreshKey={refreshKey} onLoad={handleLoad} />
      </div>
    </div>
    </>
  );
}
