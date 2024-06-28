import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { ModalModeContentLeft } from "./ModalModeContentLeft";
import { ModalModeContentRight } from "./ModalModeContentRight";
import { QuizDetailProps } from "../QuizDetail";

export function ModalModeContent(props: QuizDetailProps) {
    return (
        <div className="flex gap-5">
            <ModalModeContentLeft {...props} />
            <ModalModeContentRight {...props} />
        </div>
    );
}
