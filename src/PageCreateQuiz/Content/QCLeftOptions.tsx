import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { getAnswerStyle } from "@/Utils";

const prefixs = ["A) ", "B) ", "C) ", "D) ", "E) ", "G) ", "H) ", "I) "];

export function QCLeftOptions(question: QuestionDetail) {
    return (
        <div className="flex flex-col overflow-x-auto overflow-y-auto w-full h-[130px] gap-1">
            {question.Answers.map((ans, idx) => {
                return (
                    <div
                        key={ans.AnswerId}
                        className={getAnswerStyle(ans.IsCorrect)}
                        defaultValue={ans.Content}
                    >
                        {prefixs[idx] + ans.Content}
                    </div>
                );
            })}
        </div>
    );
}
