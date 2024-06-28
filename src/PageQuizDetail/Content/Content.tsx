import { ModalMode } from "../ModalMode/ModalMode";
import { ModalReport } from "../ModalReport/ModalReport";
import { QuizDetailProps } from "../QuizDetail";

export function Content(props: QuizDetailProps) {
    return (
        <div className="flex gap-10">
            <ModalMode {...props} />
            <ModalReport />
        </div>
    );
}
