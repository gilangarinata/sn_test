import * as z from "zod";

export const NewsValidation = z.object({
    title: z
        .string(),
    image: z
        .string(),
    tags: z.string(),
    relatedNews: z.string()
});

