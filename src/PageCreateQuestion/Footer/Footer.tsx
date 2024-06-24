import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "../../components/ui/label";
import { ModalSetting } from "@/PageCreateQuestion/ModalSetting/ModalSetting";
import { ModalMedia } from "@/PageCreateQuestion/ModalMedia/ModalMedia";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import katex from "katex";
import "katex/dist/katex.min.css";
import { ActionType, CreateQuestionProps } from "../Utils";
import { CreateButton } from "./CreateButton";

const editorOptions = {
    buttonList: [
        ["undo", "redo"],
        ["removeFormat"],
        ["bold", "underline", "italic", "fontSize"],
        ["fontColor", "hiliteColor"],
        ["align", "horizontalRule", "list"],
        ["math"],
    ],
    katex: {
        src: katex,
        options: {
            strict: "ignore",
        },
    },
};

export function Footer(props: CreateQuestionProps) {
    const {
        state, 
        dispatch,
        IsUpdate,
        DataFromUpdate,
        IsInModal,
        QuestionFromAI,
        FetchDataAfterUpdate,
    } = props;

    function handleChangeExplain(content: string) {
        dispatch({ type: ActionType.ChangeExplain, payload: content });
    }

    function handleToggleExplain() {
        dispatch({ type: ActionType.ToggleExplain, payload: null });
    }

    function handleAddAnswer() {
        dispatch({ type: ActionType.AddAnswer, payload: null });
    }

    return (
        <div className="flex flex-col justify-between w-full gap-5">
            {state.ExplainAllow && (
                <div>
                    <Label>Giải thích</Label>
                    <SunEditor
                        height="200px"
                        setContents={state.Explanation || ""}
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
                    <div className="flex items-center gap-1">
                        <Label>Giải thích</Label>
                        <Switch
                            checked={state.ExplainAllow}
                            onCheckedChange={handleToggleExplain}
                            className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-slate-200"
                        />
                    </div>
                </div>
                <CreateButton {...props} />
            </div>
        </div>
    );
}
