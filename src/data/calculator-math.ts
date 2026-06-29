import type { DeliverableId, Geo, Niche, Platform, RateResult } from '../lib/types';

export const PLATFORM_COEFF: Record<
  Platform,
  { low: number; high: number }
> = {
  tiktok: { low: 0.005, high: 0.012 },
  instagram: { low: 0.007, high: 0.015 },
  youtube: { low: 0.015, high: 0.035 },
};

export const NICHE_MULTIPLIER: Record<Niche, number> = {
  finance: 1.8,
  tech: 1.5,
  beauty: 1.2,
  comedy: 0.8,
};

export const GEO_WEIGHT: Record<Geo, number> = {
  us_ca: 1.5,
  uk_au: 1.3,
  global: 0.7,
};

export const DELIVERABLES: Record<
  DeliverableId,
  { label: string; weight: number }
> = {
  dedicated_video: { label: 'Dedicated Video', weight: 1.0 },
  integrated_ad: { label: 'Integrated Ad', weight: 0.6 },
  bio_link: { label: 'Bio Link', weight: 0.3 },
  stories: { label: 'Stories', weight: 0.4 },
};

export function calculateBaseRate(
  views: number,
  platform: Platform,
  niche: Niche,
  geo: Geo,
): { low: number; high: number } {
  const coeff = PLATFORM_COEFF[platform];
  const nicheMult = NICHE_MULTIPLIER[niche];
  const geoWeight = GEO_WEIGHT[geo];

  return {
    low: views * coeff.low * nicheMult * geoWeight,
    high: views * coeff.high * nicheMult * geoWeight,
  };
}

export function calculateBasketMultiplier(basket: DeliverableId[]): number {
  if (basket.length === 0) return 1;
  return basket.reduce((sum, id) => sum + DELIVERABLES[id].weight, 0);
}

export function calculateRates(
  views: number,
  platform: Platform,
  niche: Niche,
  geo: Geo,
  basket: DeliverableId[],
): RateResult {
  const base = calculateBaseRate(views, platform, niche, geo);
  const multiplier = calculateBasketMultiplier(basket);

  return {
    baseRateLow: base.low,
    baseRateHigh: base.high,
    packageRateLow: base.low * multiplier,
    packageRateHigh: base.high * multiplier,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return num.toString();
}

const PITCH_PLATFORM_LABELS: Record<Platform, string> = {
  tiktok: 'TikTok',
  instagram: 'Instagram',
  youtube: 'YouTube',
};

const PITCH_NICHE_LABELS: Record<Niche, string> = {
  finance: 'finance',
  tech: 'tech',
  beauty: 'beauty',
  comedy: 'comedy',
};

const PITCH_GEO_CONFIG: Record<
  Geo,
  {
    currency: 'USD' | 'GBP';
    locale: string;
    audienceLine: string;
    marketValueLine: string;
  }
> = {
  us_ca: {
    currency: 'USD',
    locale: 'en-US',
    audienceLine:
      'My audience is concentrated in the United States and Canada',
    marketValueLine:
      'These Tier-1 North American markets offer strong brand ROI and high purchase intent among engaged viewers.',
  },
  uk_au: {
    currency: 'GBP',
    locale: 'en-GB',
    audienceLine:
      'My audience is concentrated in the United Kingdom and Australia',
    marketValueLine:
      'These English-speaking markets emphasise authentic creator partnerships and deliver strong engagement for premium brand campaigns.',
  },
  global: {
    currency: 'USD',
    locale: 'en-US',
    audienceLine: 'My audience spans multiple regions globally',
    marketValueLine:
      'This international reach gives brands diverse demographic exposure and scalable campaign potential across markets.',
  },
};

/** Static USD→GBP estimate for pitch display only; not used in rate math. */
export const USD_TO_GBP = 0.79;

export function formatPitchCurrency(amount: number, geo: Geo): string {
  const { currency, locale } = PITCH_GEO_CONFIG[geo];
  const value = currency === 'GBP' ? amount * USD_TO_GBP : amount;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function generatePitchTemplate(params: {
  platform: Platform;
  followers: number;
  views: number;
  niche: Niche;
  geo: Geo;
  packageRateLow: number;
  packageRateHigh: number;
}): string {
  const {
    platform,
    followers,
    views,
    niche,
    geo,
    packageRateLow,
    packageRateHigh,
  } = params;
  const platformLabel = PITCH_PLATFORM_LABELS[platform];
  const { locale, audienceLine, marketValueLine } = PITCH_GEO_CONFIG[geo];
  const rateRange = `${formatPitchCurrency(packageRateLow, geo)} – ${formatPitchCurrency(packageRateHigh, geo)}`;
  const followersFormatted = followers.toLocaleString(locale);
  const viewsFormatted = views.toLocaleString(locale);

  return `Subject: ${platformLabel} Partnership Opportunity — ${formatNumber(followers)} Followers

Hi [Brand Name],

I'm a ${PITCH_NICHE_LABELS[niche]} content creator on ${platformLabel} with ${followersFormatted} followers and an average of ${viewsFormatted} views per post. ${audienceLine}. ${marketValueLine}

I'd love to discuss a brand partnership. Based on my metrics and the deliverables involved, my rate for this collaboration would be in the ${rateRange} range.

I'm happy to share my media kit and discuss custom packages that align with your campaign goals.

Looking forward to connecting!

Best,
[Your Name]`;
}
