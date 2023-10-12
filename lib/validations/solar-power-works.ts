import * as z from "zod";

export const SolarPowerWorksValidation = z.object({
    title: z
        .string(),
    subtitle: z.string(),
    image: z.string(),
});

