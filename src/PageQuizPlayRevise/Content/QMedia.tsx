import { VITE_SERVER_PATH } from "@/Utils";
import { ReviseProps } from "../Utils";
export function QMedia(props: ReviseProps) {
    const { state } = props;
    if (!state.Quiz) return;
    const question = state.Quiz.Questions[state.QuestionIdx];
    
    return (
        <div className="flex flex-col gap-3">
            {question.ImageUrl && (
                <img
                    className="object-contain rounded-xl max-h-[300px] w-[800px]"
                    src={VITE_SERVER_PATH + question.ImageUrl}
                ></img>
            )}
            {question.AudioUrl && (
                <audio className="w-full" controls>
                    <source
                        src={VITE_SERVER_PATH + question?.AudioUrl}
                        type="audio/ogg"
                    />
                </audio>
            )}
        </div>
    );
}
