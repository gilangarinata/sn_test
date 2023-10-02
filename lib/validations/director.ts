import * as z from "zod";

export const DirectorValidation = z.object({
    companyProfile: z
        .string()
});