// components/StructuredData.tsx
import Script from "next/script";

export default function StructuredData({ id, data }:{ id: string; data: any }) {
    return (
        <Script
            id={id}
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
