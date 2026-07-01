import { describe, expect, it } from 'vitest';
import {
  calculateBaseRate,
  calculateBasketMultiplier,
  calculatePlatformRates,
  calculateRates,
  createDefaultProfiles,
  formatCurrency,
  formatPitchCurrency,
  generateCombinedPitchTemplate,
  generatePitchTemplate,
  getActiveProfiles,
  sumPlatformRates,
  USD_TO_GBP,
} from './calculator-math';
import type { PlatformProfile } from '../lib/types';

describe('calculateBaseRate', () => {
  it('calculates TikTok beauty US rate correctly', () => {
    const result = calculateBaseRate(10_000, 'tiktok', 'beauty', 'us_ca');
    // 10000 * 0.005 * 1.2 * 1.5 = 90
    expect(result.low).toBe(90);
    // 10000 * 0.012 * 1.2 * 1.5 = 216
    expect(result.high).toBe(216);
  });

  it('calculates YouTube finance US rate correctly', () => {
    const result = calculateBaseRate(50_000, 'youtube', 'finance', 'us_ca');
    // 50000 * 0.015 * 1.8 * 1.5 = 2025
    expect(result.low).toBe(2025);
    // 50000 * 0.035 * 1.8 * 1.5 = 4725
    expect(result.high).toBeCloseTo(4725);
  });

  it('applies global geo weight discount', () => {
    const us = calculateBaseRate(10_000, 'instagram', 'tech', 'us_ca');
    const global = calculateBaseRate(10_000, 'instagram', 'tech', 'global');
    expect(global.low).toBeLessThan(us.low);
  });
});

describe('calculateBasketMultiplier', () => {
  it('returns 1 for empty basket', () => {
    expect(calculateBasketMultiplier([])).toBe(1);
  });

  it('sums deliverable weights', () => {
    expect(
      calculateBasketMultiplier(['dedicated_video', 'bio_link']),
    ).toBe(1.3);
  });
});

describe('calculateRates', () => {
  it('applies basket multiplier to package rates', () => {
    const result = calculateRates(
      10_000,
      'tiktok',
      'beauty',
      'us_ca',
      ['dedicated_video', 'stories'],
    );
    expect(result.packageRateLow).toBe(result.baseRateLow * 1.4);
    expect(result.packageRateHigh).toBe(result.baseRateHigh * 1.4);
  });
});

describe('formatCurrency', () => {
  it('formats USD without decimals', () => {
    expect(formatCurrency(1500)).toBe('$1,500');
  });
});

describe('generatePitchTemplate', () => {
  const baseParams = {
    platform: 'tiktok' as const,
    followers: 50_000,
    views: 10_000,
    niche: 'beauty' as const,
    packageRateLow: 126,
    packageRateHigh: 302,
  };

  it('uses US copy and USD for us_ca', () => {
    const pitch = generatePitchTemplate({ ...baseParams, geo: 'us_ca' });

    expect(pitch).toContain('TikTok Partnership Opportunity — 50K Followers');
    expect(pitch).toContain('50,000 followers');
    expect(pitch).toContain('United States and Canada');
    expect(pitch).toContain('Tier-1 North American markets');
    expect(pitch).toContain('$126 – $302');
  });

  it('uses UK copy, spelling, and GBP for uk_au', () => {
    const pitch = generatePitchTemplate({ ...baseParams, geo: 'uk_au' });

    expect(pitch).toContain('United Kingdom and Australia');
    expect(pitch).toContain('emphasise');
    expect(pitch).toContain('£100 – £239');
  });

  it('uses global reach copy and USD for global', () => {
    const pitch = generatePitchTemplate({ ...baseParams, geo: 'global' });

    expect(pitch).toContain('spans multiple regions globally');
    expect(pitch).toContain('international reach');
    expect(pitch).toContain('$126 – $302');
  });
});

describe('formatPitchCurrency', () => {
  it('converts USD rates to GBP for uk_au', () => {
    expect(formatPitchCurrency(126, 'uk_au')).toBe('£100');
    expect(formatPitchCurrency(302, 'uk_au')).toBe('£239');
    expect(126 * USD_TO_GBP).toBeCloseTo(99.54);
  });

  it('formats USD for us_ca and global', () => {
    expect(formatPitchCurrency(126, 'us_ca')).toBe('$126');
    expect(formatPitchCurrency(126, 'global')).toBe('$126');
  });
});

describe('multi-platform rates', () => {
  const tiktokProfile: PlatformProfile = {
    platform: 'tiktok',
    active: true,
    followers: 50_000,
    views: 10_000,
    niche: 'beauty',
    geo: 'us_ca',
  };

  const instagramProfile: PlatformProfile = {
    platform: 'instagram',
    active: true,
    followers: 30_000,
    views: 8_000,
    niche: 'beauty',
    geo: 'us_ca',
  };

  it('sums platform package rates', () => {
    const tiktokRates = calculatePlatformRates(tiktokProfile, []);
    const instagramRates = calculatePlatformRates(instagramProfile, []);
    const total = sumPlatformRates([tiktokRates, instagramRates]);

    expect(total.totalLow).toBe(
      tiktokRates.packageRateLow + instagramRates.packageRateLow,
    );
    expect(total.totalHigh).toBe(
      tiktokRates.packageRateHigh + instagramRates.packageRateHigh,
    );
  });

  it('returns only active profiles in platform order', () => {
    const profiles = createDefaultProfiles('tiktok').map((p) =>
      p.platform === 'instagram' ? { ...p, active: true } : p,
    );
    const active = getActiveProfiles(profiles);

    expect(active.map((p) => p.platform)).toEqual(['tiktok', 'instagram']);
  });
});

describe('generateCombinedPitchTemplate', () => {
  it('includes line items for active platforms only', () => {
    const profiles = createDefaultProfiles('tiktok').map((p) =>
      p.platform === 'instagram' ? { ...p, active: true } : p,
    );
    const active = getActiveProfiles(profiles);
    const lines = active.map((profile) => ({
      profile,
      ...calculatePlatformRates(profile, []),
    }));
    const total = sumPlatformRates(lines);

    const pitch = generateCombinedPitchTemplate({
      profiles,
      lines,
      totalLow: total.totalLow,
      totalHigh: total.totalHigh,
    });

    expect(pitch).toContain('Multi-Platform Partnership — TikTok & Instagram');
    expect(pitch).toContain('• TikTok —');
    expect(pitch).toContain('• Instagram —');
    expect(pitch).not.toContain('• YouTube —');
    expect(pitch).toContain('Combined package rate');
    expect(pitch).toContain('Total shown in USD');
  });
});
