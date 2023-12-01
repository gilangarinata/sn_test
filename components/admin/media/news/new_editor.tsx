"use client"

import {
    BlockNoteEditor,
    PartialBlock
} from "@blocknote/core";

import {
    BlockNoteView, lightDefaultTheme, Theme,
    useBlockNote
} from "@blocknote/react";

import "@blocknote/core/style.css";
import {useTheme} from "@emotion/react";
import {cn} from "@/lib/utils";
import "@/app/custom.css";


const lightRedTheme = {
    colors: {
        editor: {
            text: "#222222",
            background: "#ffffff",
        },
        menu: {
            text: "#ffffff",
            background: "#9b0000",
        },
        tooltip: {
            text: "#ffffff",
            background: "#b00000",
        },
        hovered: {
            text: "#ffffff",
            background: "#b00000",
        },
        selected: {
            text: "#ffffff",
            background: "#c50000",
        },
        disabled: {
            text: "#9b0000",
            background: "#7d0000",
        },
        shadow: "#640000",
        border: "#870000",
        sideMenu: "#bababa",
        highlightColors: lightDefaultTheme.colors.highlightColors,
    },
    borderRadius: 4,
    fontFamily: "Helvetica Neue, sans-serif",
} satisfies Theme;

const theme = {
    ...lightRedTheme,
    componentStyles: (theme) => ({
        // Adds basic styling to the editor.
        Editor: {
            // backgroundColor: theme.colors.editor.background,
            // borderRadius: theme.borderRadius,
            // border: `1px solid ${theme.colors.border}`,
            // boxShadow: `0 4px 12px ${theme.colors.shadow}`,
        },
    }),
} satisfies Theme;

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
        },
        domAttributes: {
            // Adds a class to all `blockContainer` elements.
            blockContainer: {
                class: "block-container",
            },
        },
    });

    return (
        <div>
            <BlockNoteView className={cn("text-justify", editable ? "mx-0" : "mx-[-50px]")} editor={editor} theme="light"/>
        </div>
    )
}