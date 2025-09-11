"use client";
import { useEffect } from "react";

declare global {
    interface Window {
        Qismo?: any;
    }
}

export default function QiscusWidget() {
    useEffect(() => {
        // already loaded?
        if (window.Qismo) {
            new window.Qismo("kgfmf-adkt0y6tkxi8p99", {
                options: {
                    channel_id: 133008,
                    mobileBreakPoint: 400,
                    extra_fields: [],
                    baseUrl: "https://omnichannel.qiscus.com",
                    qismoIframeUrl: "https://omnichannel.qiscus.com",
                },
            });
            return;
        }

        const s = document.createElement("script");
        s.src = "https://omnichannel.qiscus.com/js/qismo-v5.js";
        s.async = true;
        s.onload = () => {
            if (window.Qismo) {
                new window.Qismo("kgfmf-adkt0y6tkxi8p99", {
                    options: {
                        channel_id: 133008,
                        mobileBreakPoint: 400,
                        extra_fields: [],
                        baseUrl: "https://omnichannel.qiscus.com",
                        qismoIframeUrl: "https://omnichannel.qiscus.com",
                    },
                });
            }
        };
        document.head.appendChild(s);
        return () => {
            // optional: clean up if your widget supports teardown
        };
    }, []);

    return null;
}
