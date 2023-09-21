import * as z from "zod";

export const AchievementValidation = z.object({
    icon: z
        .string(),

});

