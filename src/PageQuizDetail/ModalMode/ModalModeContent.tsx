import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { ModalModeContentLeft } from "./ModalModeContentLeft";
import { ModalModeContentRight } from "./ModalModeContentRight";

export function ModalModeContent(quiz: QuizDetail) {
    return (
        <div className="flex gap-5">
            <ModalModeContentLeft {...quiz} />
            <ModalModeContentRight {...quiz} />
        </div>
    );
}
