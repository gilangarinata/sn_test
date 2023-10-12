import * as z from "zod";

export const ScopeOfWorkValidation = z.object({
    title: z
        .string(),
    description: z.string(),
    icon: z.string(),
});

