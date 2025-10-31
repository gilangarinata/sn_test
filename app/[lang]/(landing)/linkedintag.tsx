import Script from "next/script";

export default function LinkedInInsightTag() {
    return (
        <>
            {/* LinkedIn Insight Tag */}
        <Script id="linkedin-insight-init" strategy="afterInteractive">
        {`
          _linkedin_partner_id = "8139220";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        `}
    </Script>

    <Script
    id="linkedin-insight-script"
    src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
    strategy="afterInteractive"
    />

    <noscript>
        <img
            height="1"
    width="1"
    style={{ display: "none" }}
    alt=""
    src="https://px.ads.linkedin.com/collect/?pid=8139220&fmt=gif"
        />
        </noscript>
        </>
);
}
