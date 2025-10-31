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

    const acceptAll = () =>
        setConsent({ necessary: true, analytics: true, marketing: true });
    const rejectNonEssential = () =>
        setConsent({ necessary: true, analytics: false, marketing: false });

    return (
        <div
            style={{
                position: "fixed",
                bottom: 30,
                left: 0,
                right: 0,
                background: "#15537a",
                color: "white",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "12px",
                zIndex: 1000,
            }}
        >
      <span style={{ maxWidth: "600px", fontSize: "14px", lineHeight: "1.4" }}>
        This site uses cookies for basic functions and optional
        analytics/marketing. Choose your preference.
      </span>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    width: "100%",
                    maxWidth: "320px",
                }}
            >
                <button
                    onClick={acceptAll}
                    style={{
                        padding: "10px",
                        border: "1px solid white",
                        borderRadius: "8px",
                        background: "transparent",
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    Accept all
                </button>

                <button
                    onClick={rejectNonEssential}
                    style={{
                        padding: "10px",
                        border: "1px solid white",
                        borderRadius: "8px",
                        background: "transparent",
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    Only allow essential
                </button>
            </div>

            <style jsx>{`
        @media (min-width: 600px) {
          div[style] {
            flex-direction: row !important;
            justify-content: center;
            text-align: left;
          }
          span {
            flex: 1;
            text-align: left;
            margin-right: 20px;
          }
          div > div {
            flex-direction: row !important;
            width: auto !important;
          }
          button {
            min-width: 180px;
          }
        }
      `}</style>
        </div>
    );
}