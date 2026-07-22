import {
  calculatePlatformRates,
  generateCombinedPitchTemplate,
  generatePitchTemplate,
  sumPlatformRates,
} from '../data/calculator-math';
import type { PitchMode, SavedCalculation } from './types';

export interface ParsedPitchEmail {
  subject: string;
  body: string;
  mailtoUrl: string;
  gmailUrl: string;
}

/**
 * Parses pitch text into a subject line and body content, constructing
 * mailto: and Gmail Web composer URLs.
 */
export function parsePitchEmail(text: string): ParsedPitchEmail {
  const trimmed = text.trim();
  let subject = 'Brand Partnership Outreach';
  let body = trimmed;

  const subjectMatch = trimmed.match(
    /^Subject:\s*(.*?)(\r?\n\r?\n|\r?\n)([\s\S]*)$/i,
  );

  if (subjectMatch) {
    subject = subjectMatch[1].trim() || subject;
    body = subjectMatch[3].trim();
  }

  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  const mailtoUrl = `mailto:?subject=${encodedSubject}&body=${encodedBody}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${encodedSubject}&body=${encodedBody}`;

  return {
    subject,
    body,
    mailtoUrl,
    gmailUrl,
  };
}

/**
 * Resolves or generates the email pitch text for a saved calculation entry.
 */
export function getSavedCalcPitchText(calc: SavedCalculation): string {
  if (calc.version === 2 && calc.platformProfiles) {
    const mode: PitchMode =
      calc.activePitchMode ??
      calc.platformProfiles.find((p) => p.active)?.platform ??
      calc.platform;

    if (calc.pitchTexts && calc.pitchTexts[mode]) {
      return calc.pitchTexts[mode]!;
    }

    const activeProfiles = calc.platformProfiles.filter((p) => p.active);
    const rateLines = activeProfiles.map((profile) => ({
      profile,
      ...calculatePlatformRates(profile, calc.basket),
    }));
    const totals = sumPlatformRates(rateLines);

    if (mode === 'combined') {
      return generateCombinedPitchTemplate({
        profiles: calc.platformProfiles,
        lines: rateLines,
        totalLow: totals.totalLow,
        totalHigh: totals.totalHigh,
      });
    }

    const profile = calc.platformProfiles.find((p) => p.platform === mode);
    if (profile) {
      const line = rateLines.find((l) => l.platform === mode);
      const rates = line ?? calculatePlatformRates(profile, calc.basket);
      return generatePitchTemplate({
        platform: profile.platform,
        followers: profile.followers,
        views: profile.views,
        niche: profile.niche,
        geo: profile.geo,
        packageRateLow: rates.packageRateLow,
        packageRateHigh: rates.packageRateHigh,
      });
    }
  }

  if (calc.pitchText) {
    return calc.pitchText;
  }

  return generatePitchTemplate({
    platform: calc.platform,
    followers: calc.followers,
    views: calc.views,
    niche: calc.niche,
    geo: calc.geo,
    packageRateLow: calc.packageRateLow,
    packageRateHigh: calc.packageRateHigh,
  });
}
