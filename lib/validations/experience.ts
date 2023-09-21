import * as z from "zod";

export const ExperienceValidation = z.object({
    total: z
        .string(),
    icon: z
        .string(),

});

