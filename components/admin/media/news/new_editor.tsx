"use client"

import {
    BlockNoteEditor,
    PartialBlock
} from "@blocknote/core";

import {
    BlockNoteView,
    useBlockNote
} from "@blocknote/react";

import "@blocknote/core/style.css";
import {useTheme} from "@emotion/react";
import {cn} from "@/lib/utils";

interface Props {
    onChange : (value : string) => void;
    initialContent?: string;
    editable?: boolean;
}

export const NewEditor = ({
    onChange,
    initialContent,
    editable = true
}:Props) => {

    function isJsonString(str: string) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    const editor: BlockNoteEditor = useBlockNote({
        editable,
        initialContent: initialContent && isJsonString(initialContent) ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        onEditorContentChange: (content) => {
            onChange(JSON.stringify(content.topLevelBlocks, null,2));
        }
    });

    return (
        <div>
            <BlockNoteView className={cn("text-justify", editable ? "mx-0" : "mx-[-50px]")} editor={editor} theme="light" />
        </div>
    )
}