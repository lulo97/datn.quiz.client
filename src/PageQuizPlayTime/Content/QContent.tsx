import { PlayTimeProps } from "../Utils";

export function QContent(props: PlayTimeProps) {
    const { state, localPlay } = props;
    const QuestionIdx = localPlay.QuestionIdx;
    const Question = state.Questions[QuestionIdx];
    return (
        <div className="flex flex-col">
            <div className="font-semibold">Câu {QuestionIdx + 1}:</div>
            <div
                dangerouslySetInnerHTML={{
                    __html: Question.Content || "",
                }}
            ></div>
        </div>
    );
}
