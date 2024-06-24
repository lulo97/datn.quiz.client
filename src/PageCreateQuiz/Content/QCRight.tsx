import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { QCRightImg } from "./QCRightImg";
import { QCRightAudio } from "./QCRightAudio";

export function QCRight(question: QuestionDetail) {
    if (!question.AudioUrl && !question.ImageUrl) return;
    return (
        <div className="w-[30%] flex flex-col gap-1">
            <QCRightImg {...question} />
            <QCRightAudio {...question} />
        </div>
    );
}
