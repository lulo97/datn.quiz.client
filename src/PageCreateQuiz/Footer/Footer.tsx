import { Button } from "@/components/ui/button";
import { ModalAddQuestion } from "../ModalAddQuestion/ModalAddQuestion";
import { ModalSetting } from "../ModalSetting/ModalSetting";
import { ModalCreateQuestion } from "../ModalCreateQuestion/ModalCreateQuestion";
import { CreateQuizProps } from "../Utils";
import { CreateButton } from "./CreateButton";

export function Footer(props: CreateQuizProps) {
    const { state, dispatch } = props;

    return (
        <div className="w-full flex justify-between">
            <div className="flex gap-5">
                <ModalAddQuestion state={state} dispatch={dispatch} />
                <ModalSetting state={state} dispatch={dispatch} />
            </div>

            <div className="flex gap-5">
                <ModalCreateQuestion />
                <CreateButton state={state} dispatch={dispatch} />
            </div>
        </div>
    );
}
