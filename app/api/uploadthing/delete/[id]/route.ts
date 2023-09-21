import {NextResponse} from "next/server";
import { utapi } from "uploadthing/server";

export const DELETE = async (request: Request) => {
    const id = request.url.substring(request.url.lastIndexOf('/') + 1)
    const isSuccess = await utapi.deleteFiles(id)
    console.log("isSuccess : " + isSuccess)
    return NextResponse.json(
        { isSuccess: isSuccess },
    );
};