import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { QCRightImg } from "./QCRightImg";
import { QCRightAudio } from "./QCRightAudio";

export function QCRight(question: QuestionDetail) {
    return (
        <div className="w-[30%]">
            <QCRightImg {...question} />
            <QCRightAudio {...question} />
        </div>
    );
}
