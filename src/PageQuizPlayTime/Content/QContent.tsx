import { PlayTimeProps } from "../Utils";

export function QContent(props: PlayTimeProps) {
    const { state, localPlay, dispatchLS } = props;
    const QuestionIdx = localPlay.QuestionIdx;
    const Question = state.Questions[QuestionIdx];
    return (
        <div className="flex">
            <div className="font-semibold">Câu {QuestionIdx + 1}:</div>
            <div
                className="pl-1"
                dangerouslySetInnerHTML={{
                    __html: Question.Content || "",
                }}
            ></div>
        </div>
    );
}
