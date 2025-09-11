"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {Consent, CONSENT_COOKIE, CONSENT_MAX_AGE, defaultConsent} from "@/app/[lang]/(landing)/cookies";

type Ctx = {
    consent: Consent;
    setConsent: (c: Consent) => void;
    decided: boolean; // whether user has made a choice
};

const ConsentCtx = createContext<Ctx | null>(null);

export default function ConsentProvider({
                                            initial,
                                            children,
                                        }: {
    initial: Consent;
    children: React.ReactNode;
}) {
    const [consent, setConsentState] = useState<Consent>(initial);
    const decided = useMemo(
        () => initial.analytics !== defaultConsent.analytics || initial.marketing !== defaultConsent.marketing,
        [initial]
    );

    const setConsent = (next: Consent) => {
        setConsentState(next);
        document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(next))}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax`;
    };

    return (
        <ConsentCtx.Provider value={{ consent, setConsent, decided }}>
            {children}
            {/* Banner only if not decided yet */}
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
        <div style={{
            position: "fixed", inset: "auto 0 0 0", background: "rgba(0,0,0,0.9)",
            color: "white", padding: "12px 16px", display: "flex", gap: 12, alignItems: "center", zIndex: 50
        }}>
            <span>This site uses cookies for basic functions and optional analytics/marketing. Choose your preference.</span>
            <button onClick={rejectNonEssential} style={{ padding: "8px 12px" }}>Essential only</button>
            <button onClick={acceptAll} style={{ padding: "8px 12px" }}>Accept all</button>
            {/* Optional: link to a preferences page/modal */}
        </div>
    );
}
