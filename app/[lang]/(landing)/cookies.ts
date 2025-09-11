// Small helper to (de)serialize the consent cookie
export type Consent = {
    necessary: true;         // always true
    analytics: boolean;
    marketing: boolean;
};

export const CONSENT_COOKIE = "site_consent";
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 180; // 180 days

export const defaultConsent: Consent = {
    necessary: true,
    analytics: false,
    marketing: false,
};
