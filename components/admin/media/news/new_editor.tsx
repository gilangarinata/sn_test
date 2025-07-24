"use client"


import {
    useCreateBlockNote
} from "@blocknote/react";

import {BlockNoteView, lightDefaultTheme, Theme} from "@blocknote/mantine";

import "@blocknote/core/style.css";
import {cn} from "@/lib/utils";
import "@/app/[lang]/custom.css";
import "@blocknote/mantine/style.css";
import {BlockNoteEditor, defaultBlockSpecs, PartialBlock} from "@blocknote/core";


interface Props {
    onChange : (value : string) => void;
    initialContent?: string;
    editable?: boolean;
    bgColor?: string;
}

export const NewEditor = ({
    onChange,
    initialContent,
    editable = true,
    bgColor = ""
}:Props) => {

    function isJsonString(str: string) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    const editor: BlockNoteEditor = useCreateBlockNote({
        // editable,
        initialContent: initialContent && isJsonString(initialContent) ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        // onEditorContentChange: (content) => {
        //     onChange(JSON.stringify(content.topLevelBlocks, null,2));
        // },
        domAttributes: {
            // Adds a class to all `blockContainer` elements.
            block: {
                class: "block-container",
            },

        },
    });

    editor.onChange((content) => {
        if(editable) {
            onChange(JSON.stringify(content.document, null,2));
        }
    })


    const lightRedTheme = {
        colors: {
            editor: {
                text: "#222222",
                background: bgColor,
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
            // highlightColors: lightDefaultTheme.colors.highlightColors,
        },
        borderRadius: 4,
        fontFamily: "Helvetica Neue, sans-serif",
    } satisfies Theme;

    const darkRedTheme = {
        ...lightRedTheme,
        colors: {
            ...lightRedTheme.colors,
            editor: {
                text: "#ffffff",
                background: bgColor,
            },
            sideMenu: "#ffffff",
            // TODO: Update
            // highlightColors: darkDefaultTheme.colors.highlightColors,
        },
    } satisfies Theme;

    const redTheme = {
        dark: darkRedTheme,
        light: lightDefaultTheme
    };

    const ed = useCreateBlockNote()

    return (
        <div>
            <BlockNoteView editable={editable} className={cn(`text-justify ${bgColor}`, editable ? "mx-0" : "mx-[-50px]")} editor={editor} theme={bgColor === "" ? "light" : redTheme}/>
        </div>
    )
}
