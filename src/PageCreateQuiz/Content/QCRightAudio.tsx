import { QuestionDetail } from "@/PageCreateQuestion/Utils";

export function QCRightAudio(question: QuestionDetail) {
    return (
        <audio controls>
            <source
                src={question.AudioUrl ? question.AudioUrl : ""}
                type="audio/ogg"
            />
        </audio>
    );
}
