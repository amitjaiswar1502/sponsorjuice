import { describe, expect, it } from 'vitest';
import type { SavedCalculation } from './types';
import { getSavedCalcPitchText, parsePitchEmail } from './email';

describe('email helper', () => {
  describe('parsePitchEmail', () => {
    it('extracts subject line and body from standard pitch text', () => {
      const input = `Subject: TikTok Partnership Opportunity — 50K Followers

Hi [Brand Name],

I'm a content creator on TikTok...`;

      const result = parsePitchEmail(input);

      expect(result.subject).toBe('TikTok Partnership Opportunity — 50K Followers');
      expect(result.body).toBe("Hi [Brand Name],\n\nI'm a content creator on TikTok...");
      expect(result.mailtoUrl).toContain('mailto:?subject=TikTok%20Partnership%20Opportunity');
      expect(result.mailtoUrl).toContain('&body=Hi%20%5BBrand%20Name%5D');
      expect(result.gmailUrl).toContain('https://mail.google.com/mail/?view=cm');
      expect(result.gmailUrl).toContain('&su=TikTok%20Partnership%20Opportunity');
    });

    it('handles pitch text without explicit Subject header', () => {
      const input = 'Hi [Brand Name],\n\nCheck out my sponsorship rates.';

      const result = parsePitchEmail(input);

      expect(result.subject).toBe('Brand Partnership Outreach');
      expect(result.body).toBe(input);
      expect(result.mailtoUrl).toContain('mailto:?subject=Brand%20Partnership%20Outreach');
    });

    it('correctly encodes special characters in URLs', () => {
      const input = `Subject: Deal & Pitch for 100% ROI!

Body with & + ? # characters`;

      const result = parsePitchEmail(input);

      expect(result.subject).toBe('Deal & Pitch for 100% ROI!');
      expect(result.mailtoUrl).toContain('Deal%20%26%20Pitch%20for%20100%25%20ROI!');
      expect(result.gmailUrl).toContain('Body%20with%20%26%20%2B%20%3F%20%23%20characters');
    });
  });

  describe('getSavedCalcPitchText', () => {
    it('returns stored pitchTexts for v2 saved calculation', () => {
      const calc: SavedCalculation = {
        version: 2,
        id: 'test-1',
        timestamp: Date.now(),
        platform: 'tiktok',
        followers: 50000,
        views: 10000,
        niche: 'beauty',
        geo: 'us_ca',
        basket: [],
        baseRateLow: 100,
        baseRateHigh: 200,
        packageRateLow: 100,
        packageRateHigh: 200,
        activePitchMode: 'tiktok',
        platformProfiles: [
          { platform: 'tiktok', active: true, followers: 50000, views: 10000, niche: 'beauty', geo: 'us_ca' },
        ],
        pitchTexts: {
          tiktok: 'Custom saved pitch text for TikTok',
        },
      };

      expect(getSavedCalcPitchText(calc)).toBe('Custom saved pitch text for TikTok');
    });

    it('returns legacy pitchText for v1 saved calculation', () => {
      const calc: SavedCalculation = {
        id: 'test-legacy',
        timestamp: Date.now(),
        platform: 'instagram',
        followers: 25000,
        views: 5000,
        niche: 'tech',
        geo: 'us_ca',
        basket: [],
        baseRateLow: 150,
        baseRateHigh: 300,
        packageRateLow: 150,
        packageRateHigh: 300,
        pitchText: 'Legacy saved pitch text',
      };

      expect(getSavedCalcPitchText(calc)).toBe('Legacy saved pitch text');
    });

    it('generates pitch template dynamically if saved calculation pitchText is missing', () => {
      const calc: SavedCalculation = {
        id: 'test-gen',
        timestamp: Date.now(),
        platform: 'youtube',
        followers: 100000,
        views: 20000,
        niche: 'finance',
        geo: 'us_ca',
        basket: [],
        baseRateLow: 500,
        baseRateHigh: 1000,
        packageRateLow: 500,
        packageRateHigh: 1000,
      };

      const result = getSavedCalcPitchText(calc);
      expect(result).toContain('Subject: YouTube Partnership Opportunity');
      expect(result).toContain('finance');
    });
  });
});
