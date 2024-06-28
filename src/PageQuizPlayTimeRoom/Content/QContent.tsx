import { QuizPlayTimeRoomProps } from "../Utils";

export function QContent(props: QuizPlayTimeRoomProps) {
    const { state, quiz } = props;
    const QuestionIdx = state.QuestionIdx;
    const Question = quiz.Questions[QuestionIdx];
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
