"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Consent, CONSENT_COOKIE, CONSENT_MAX_AGE, defaultConsent } from "@/app/[lang]/(landing)/cookies";

type Ctx = {
    consent: Consent;
    setConsent: (c: Consent) => void;
    decided: boolean;
};

const ConsentCtx = createContext<Ctx | null>(null);

// small helper
function hasConsentCookie() {
    if (typeof document === "undefined") return false;
    return document.cookie.split("; ").some((c) => c.startsWith(`${CONSENT_COOKIE}=`));
}

export default function ConsentProvider({
                                            initial,
                                            children,
                                        }: {
    initial: Consent;
    children: React.ReactNode;
}) {
    const [consent, setConsentState] = useState<Consent>(initial);

    // IMPORTANT: decided must be independent of specific values
    const [decided, setDecided] = useState<boolean>(false);

    useEffect(() => {
        // if a consent cookie already exists, consider it decided
        setDecided(hasConsentCookie());
    }, []);

    const setConsent = (next: Consent) => {
        setConsentState(next);
        document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(next))}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax`;
        setDecided(true); // hide banner immediately after any choice
    };

    return (
        <ConsentCtx.Provider value={{ consent, setConsent, decided }}>
            {children}
            {!decided && <CookieBanner />}
        </ConsentCtx.Provider>
    );
}

export function useConsent() {
    const v = useContext(ConsentCtx);
    if (!v) throw new Error("useConsent must be used within ConsentProvider");
    return v;
}

function CookieBanner() {
    const { setConsent } = useConsent();

    const acceptAll = () => setConsent({ necessary: true, analytics: true, marketing: true });
    const rejectNonEssential = () => setConsent({ necessary: true, analytics: false, marketing: false });

    return (
        <div
            style={{
                position: "fixed",
                inset: "auto 0 0 0",
                background: "#15537a",
                padding: "12px 16px",
                display: "flex",
                gap: 12,
                alignItems: "center",
                zIndex: 50,
            }}
        >
      <span>
        This site uses cookies for basic functions and optional analytics/marketing. Choose your
        preference.
      </span>
            <button onClick={rejectNonEssential} style={{ padding: "8px 12px" }}>
                Reject all except necessary
            </button>
            <button onClick={acceptAll} style={{ padding: "8px 12px" }}>
                Accept all
            </button>
        </div>
    );
}
