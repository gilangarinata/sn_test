import * as z from "zod";

export const CategoryValidation = z.object({
    name: z
        .string(),
    banner: z
        .string(),
    description: z
        .string(),
});

