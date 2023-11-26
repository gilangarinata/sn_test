import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {convertFromHTML} from "draft-js";
import {ContentState, EditorState} from "draft-js";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isBase64PdfDocDocx(fileData: string) {
    const base64Regex = /^data:(application\/pdf|application\/msword|application\/vnd.openxmlformats-officedocument.wordprocessingml.document);base64,/;
    return base64Regex.test(fileData);
}

// created by chatgpt
export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function isBase64Video(videoData: string) {
    const base64VideoRegex = /^data:video\/(mp4|webm|ogg);base64,/;
    return base64VideoRegex.test(videoData);
}
export function convertFromValidHtmlStyle(html: string) {
    return html.replaceAll('<b class=\'text-[#199FD6]\'>', "<strong>")
        .replaceAll('</b>', "</strong>")
}

export function convertFromValidHtmlStyleWhite(html: string) {
    return html.replaceAll('<b class=\'text-[#FFFFFF]\'>', "<strong>")
        .replaceAll('</b>', "</strong>")
}

export function convertToValidHtmlStyle(html: string) {
    return html.replaceAll('<p>','')
        .replaceAll('</p>','')
        .replaceAll('<strong>', "<b class='text-[#199FD6]'>")
        .replaceAll('</strong>', "</b>")
}

export function convertToValidHtmlStyleWhite(html: string) {
    return html.replaceAll('<p>','')
        .replaceAll('</p>','')
        .replaceAll('<strong>', "<b class='text-[#FFFFFF]'>")
        .replaceAll('</strong>', "</b>")
}

export function convertToValidHtmlStyleYellow(html: string) {
    return html.replaceAll('<p>','')
        .replaceAll('</p>','')
        .replaceAll('<strong>', "<b class='text-[#eab30a]'>")
        .replaceAll('</strong>', "</b>")
}

export function convertFromValidHtmlStyleYellow(html: string) {
    return html.replaceAll('<b class=\'text-[#eab30a]\'>', "<strong>")
        .replaceAll('</b>', "</strong>")
}

export function convertHTMLToEditorState(html?: string) {
    const blocksFromHTML = convertFromHTML(html!);
    console.log(`blocksFromHTML ${blocksFromHTML}`)

    const contentState = ContentState?.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
    );

    console.log(`contentBlocks ${blocksFromHTML.contentBlocks}`)
    console.log(`entityMap ${blocksFromHTML.entityMap}`)
    console.log(`contentState ${contentState}`)
    console.log(`ContentState ${ContentState?.name}`)

    const state = EditorState?.createWithContent(contentState);
    console.log(`rsult state ${state}`)
    return state;
}
// created by chatgpt
export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${time} - ${formattedDate}`;
}

export function formatDateString2(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, options);

    const time = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });

    return `${formattedDate}`;
}


