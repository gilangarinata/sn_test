import * as z from "zod";

export const OurBusinessBannerValidation = z.object({
    icon: z
        .string(),
    url: z.string()
});

