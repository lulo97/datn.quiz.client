import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { AnswerPrefix } from "../../Utils";

interface Props {
    Question: QuestionDetail;
    Idx: number;
}

export function BodyQuestionNoImage(props: Props) {
    const { Question, Idx } = props;
    return (
        <div>
            <div className="flex gap-1">
                <div className="font-semibold ">Câu {Idx + 1}:</div>
                <div
                    dangerouslySetInnerHTML={{
                        __html: Question.Content || "",
                    }}
                ></div>
            </div>
            <div className="grid grid-cols-2">
                {Question.Answers.map((ans, ans_idx) => (
                    <div key={ans.AnswerId}>
                        {AnswerPrefix[ans_idx] + ans.Content}
                    </div>
                ))}
            </div>
        </div>
    );
}
