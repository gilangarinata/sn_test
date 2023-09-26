"use client";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {useState} from "react";
import {EditorState} from "react-draft-wysiwyg";
import {convertToRaw} from "draft-js";
import draftToHtml from "draftjs-to-html";
// import {Editor} from "react-draft-wysiwyg";
// @ts-ignore
const Editor = dynamic(() => import("react-draft-wysiwyg")
        .then((module) => module.Editor),
    {
        ssr: false
    }
);

interface EditorChange {
    onEditorChange : ((state : EditorState) => void),
    editorState: EditorState,
    isFull: boolean
}

const RichTextEditor = (
    {onEditorChange, editorState, isFull = false} : EditorChange
) => {
    return (
        <div className="border border-[#9fa6b2]/18 rounded-lg">
            {isFull ?  <Editor
                editorClassName="px-2 font-normal"
                onEditorStateChange={onEditorChange}
                editorState={editorState}
            /> :  <Editor
                toolbar={{
                    options: ['inline'],
                }}
                editorClassName="px-2 font-normal"
                onEditorStateChange={onEditorChange}
                editorState={editorState}
            />}
        </div>
    )
}

export default RichTextEditor;