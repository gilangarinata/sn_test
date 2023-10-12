import * as z from "zod";

export const WhySolarValidation = z.object({
    title: z
        .string(),
    description: z.string(),
    icon: z.string(),
});

