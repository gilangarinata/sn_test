// components/SolarRentalBenefits.tsx
import React from "react";

type BenefitsDictionary = {
    benefits_title?: string;             // optional heading if you want one
    solar_rental_benefits: string[];     // the bullet list (localized)
};

type Props = {
    dictionary: BenefitsDictionary;      // pass the localized dictionary
    className?: string;
};

// dictionary/id.ts
export const dictionaryID : BenefitsDictionary = {
    benefits_title: "Keunggulan",
    solar_rental_benefits: [
        "Tidak ada (nol) investasi di muka",
        "Kerja sama jangka panjang 15–20 tahun",
        "Kapasitas terpasang minimal 1 MWp",
        "Diskon hingga 40% dari tarif PLN",
        "Garansi & layanan O&M",
        "Pemantauan sistem monitoring",
    ],
} as BenefitsDictionary;

// dictionary/en.ts
export const dictionaryEN : BenefitsDictionary = {
    benefits_title: "Advantages",
    solar_rental_benefits: [
        "No upfront investment",
        "Long-term cooperation 15–20 years",
        "Minimum installed capacity 1 MWp",
        "Discount up to 40% from the PLN tariff",
        "Warranty & O&M service",
        "System performance monitoring",
    ],
} as BenefitsDictionary;


export default function SolarRentalBenefits({ dictionary, className }: Props) {
    return (
        <section className={`bg-[#15537A] rounded-md p-6 md:p-8 ${className ?? ""}`}>
            {dictionary.benefits_title ? (
                <h3 className="text-white text-lg font-semibold mb-4">
                    {dictionary.benefits_title}
                </h3>
            ) : null}

            <ul className="space-y-4">
                {dictionary.solar_rental_benefits.map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-white text-base leading-relaxed">
                        {/* Yellow checkbox with white check */}
                        <span
                            aria-hidden
                            className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-[3px] bg-[#FCBA28] shrink-0"
                        >
              <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>

                        <span>{text}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
