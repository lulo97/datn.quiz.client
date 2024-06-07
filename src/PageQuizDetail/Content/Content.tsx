import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { ModalMode } from "../ModalMode/ModalMode";
import { ModalReport } from "../ModalReport/ModalReport";

export function Content(quiz: QuizDetail) {
    return (
        <div className="flex gap-10">
            <ModalMode {...quiz} />
            <ModalReport />
        </div>
    );
}
