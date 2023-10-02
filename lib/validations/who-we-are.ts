import * as z from "zod";

export const WhoWeAreValidation = z.object({
    image: z
        .string()
});