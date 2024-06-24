import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { VITE_SERVER_PATH } from "@/Utils";

export function QCRightAudio(question: QuestionDetail) {
    if (!question.AudioUrl) return
    return (
        <audio controls>
            <source
                src={
                    question.AudioUrl
                        ? VITE_SERVER_PATH + question.AudioUrl
                        : ""
                }
                type="audio/ogg"
            />
        </audio>
    );
}
