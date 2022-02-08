import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/worker-json'
import React from "react";

export default function Editor (props: EditorProps) {

    return (
        <AceEditor
            value={props.content}
            mode="json"
            theme="github"
            onChange={props.onChange || (() => {})}
            name="UNIQUE_ID_OF_DIV"
        />
    )
}

interface EditorProps {
    content: string
    onChange?: (args: string) => void
}