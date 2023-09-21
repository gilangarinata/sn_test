import * as z from "zod";

export const CustomerValidation = z.object({
    title: z
        .string(),
    url: z
        .string(),
    logo: z.string()
});