import * as z from "zod";

export const ZeroCapexBannerValidation = z.object({
    image: z.string().optional(),
    backgroundImage: z.string().optional(),
    headingTitle: z.string().optional(),
    description: z.string().optional(),
});
