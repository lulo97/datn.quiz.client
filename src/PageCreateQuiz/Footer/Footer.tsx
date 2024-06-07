import { ModalAddQuestion } from "../ModalAddQuestion/ModalAddQuestion";
import { ModalSetting } from "../ModalSetting/ModalSetting";
import { CreateQuizProps } from "../Utils";
import { CreateButton } from "./CreateButton";
import { ModalCreateQuestion } from "@/components/modal_create_question/ModalCreateQuestion";

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
