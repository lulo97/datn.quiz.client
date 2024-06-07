import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { getAnswerStyle } from "@/Utils";

export function QCLeftOptions(question: QuestionDetail) {
    return (
        <div className="flex flex-col overflow-x-auto overflow-y-auto w-full h-[150px] px-1 gap-1">
            {question.Answers.map((ans) => {
                return (
                    <div
                        key={ans.AnswerId}
                        className={getAnswerStyle(ans.IsCorrect)}
                        defaultValue={ans.Content}
                    >
                        {ans.Content}
                    </div>
                );
            })}
        </div>
    );
}
