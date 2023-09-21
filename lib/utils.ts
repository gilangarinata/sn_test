import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {convertFromHTML} from "draft-js";
import {ContentState, EditorState} from "draft-js";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// created by chatgpt
export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function convertFromValidHtmlStyle(html: string) {
    return html.replaceAll('<b class=\'text-[#199FD6]\'>', "<strong>")
        .replaceAll('</b>', "</strong>")
}

export function convertToValidHtmlStyle(html: string) {
    return html.replaceAll('<p>','')
        .replaceAll('</p>','')
        .replaceAll('<strong>', "<b class='text-[#199FD6]'>")
        .replaceAll('</strong>', "</b>")
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
