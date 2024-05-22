import { Label } from "@/components/ui/label";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import katex from "katex";
import "katex/dist/katex.min.css";
import { ActionType, CreateQuestionProps } from "../Utils";

const editorOptions = {
    buttonList: [
        ["undo", "redo"],
        ["removeFormat"],
        ["bold", "underline", "italic", "fontSize"],
        ["fontColor", "hiliteColor"],
        ["align", "horizontalRule", "list"],
        ["showBlocks", "codeView"],
        ["math"],
    ],
    katex: katex,
};

export function Header(props: CreateQuestionProps) {
    const { dispatch } = props;
    function handleChangeQuestion(content: string) {
        dispatch({ type: ActionType.ChangeQuestion, payload: content });
    }
    return (
        <div>
            <Label htmlFor="content">Câu hỏi</Label>
            <SunEditor
                setOptions={editorOptions}
                onChange={(content) => handleChangeQuestion(content)}
            />
        </div>
    );
}
