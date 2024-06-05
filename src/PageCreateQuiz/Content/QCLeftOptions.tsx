import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { Input } from "@/components/ui/input";

export function QCLeftOptions(question: QuestionDetail) {
    return (
        <div className="flex flex-col overflow-x-auto overflow-y-auto w-full h-[150px]">
            {question.Answers.map((ans) => {
                const className =
                    ans.IsCorrect == true ? "bg-green-200" : "bg-red-200";
                return (
                    <div
                        key={ans.AnswerId}
                        className={`${className} px-1 rounded-lg mt-1`}
                        defaultValue={ans.Content}
                    >
                        {ans.Content}
                    </div>
                );
            })}
        </div>
    );
}
