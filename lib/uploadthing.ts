import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "@/app/[lang]/api/uploadthing/core";

export const { useUploadThing, uploadFiles  } =
    generateReactHelpers<OurFileRouter>();