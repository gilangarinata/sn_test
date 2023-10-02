import * as z from "zod";

export const OurDnaValidation = z.object({
    icon: z
        .string(),
    title: z
        .string(),
});

