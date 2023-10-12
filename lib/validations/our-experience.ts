import * as z from "zod";

export const OurExperienceValidation = z.object({
    title: z
        .string(),
    image: z.string(),
    link: z.string(),
});

