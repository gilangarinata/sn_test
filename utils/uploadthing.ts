import { generateComponents } from "@uploadthing/react";

import type { OurFileRouter } from "@/app/[lang]/api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } =
    generateComponents<OurFileRouter>();