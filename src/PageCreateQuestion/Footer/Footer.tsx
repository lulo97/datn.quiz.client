import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "../../components/ui/label";
import { useState } from "react";
import { ModalAI } from "@/PageCreateQuestion/ModalAI/ModalAI";
import { ModalSetting } from "@/PageCreateQuestion/ModalSetting/ModalSetting";
import { ModalMedia } from "@/PageCreateQuestion/ModalMedia/ModalMedia";
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

export function Footer(props: CreateQuestionProps) {
    const { state, dispatch } = props;

    function handleChangeExplain(content: string) {
        dispatch({type: ActionType.ChangeExplain, payload: content})
    }

    function handleToggleExplain() {
        dispatch({type: ActionType.ToggleExplain, payload: null})
    }

    function handleAddAnswer() {
        dispatch({type: ActionType.AddAnswer, payload: null})
    }

    function handlePostCreate() {
        dispatch({type: ActionType.PostCreate, payload: null})
    }

    return (
        <div className="flex flex-col justify-between w-full gap-5">
            {state.Explain.IsVisible && (
                <div>
                    <Label>Giải thích</Label>
                    <SunEditor
                        setOptions={editorOptions}
                        onChange={(content) => handleChangeExplain(content)}
                    />
                </div>
            )}

            <div className="flex justify-between">
                <div className="flex items-center gap-5">
                    <Button onClick={handleAddAnswer}>Thêm</Button>
                    <ModalMedia state={state} dispatch={dispatch} />
                    <ModalSetting state={state} dispatch={dispatch} />
                    <ModalAI />
                    <div className="flex items-center gap-1">
                        <Label>Giải thích</Label>
                        <Switch
                            checked={state.Explain.IsVisible}
                            onCheckedChange={handleToggleExplain}
                            className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-slate-200"
                        />
                    </div>
                </div>
                <Button onClick={handlePostCreate}>Xác nhận tạo</Button>
            </div>
        </div>
    );
}
