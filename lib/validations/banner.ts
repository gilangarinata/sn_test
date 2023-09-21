import * as z from "zod";

export const BannerValidation = z.object({
    url: z
        .string()
        .url({message: "Should be correct url format"}),
    image: z
        .string(),
    logo: z.string()
});