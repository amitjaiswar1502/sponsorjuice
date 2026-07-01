export type Platform = 'tiktok' | 'instagram' | 'youtube';
export type Niche = 'finance' | 'tech' | 'beauty' | 'comedy';
export type Geo = 'us_ca' | 'uk_au' | 'global';

export type DeliverableId =
  | 'dedicated_video'
  | 'integrated_ad'
  | 'bio_link'
  | 'stories';

export type PitchMode = 'combined' | Platform;

export interface PlatformProfile {
  platform: Platform;
  active: boolean;
  followers: number;
  views: number;
  niche: Niche;
  geo: Geo;
}

export interface PlatformRateLine {
  platform: Platform;
  packageRateLow: number;
  packageRateHigh: number;
}

export interface Deliverable {
  id: DeliverableId;
  label: string;
  weight: number;
}

export interface SavedCalculation {
  id: string;
  timestamp: number;
  platform: Platform;
  followers: number;
  views: number;
  niche: Niche;
  geo: Geo;
  basket: DeliverableId[];
  baseRateLow: number;
  baseRateHigh: number;
  packageRateLow: number;
  packageRateHigh: number;
  pitchText?: string;
  version?: 2;
  platformProfiles?: PlatformProfile[];
  activePitchMode?: PitchMode;
  pitchTexts?: Partial<Record<PitchMode, string>>;
}

export interface RateResult {
  baseRateLow: number;
  baseRateHigh: number;
  packageRateLow: number;
  packageRateHigh: number;
}
