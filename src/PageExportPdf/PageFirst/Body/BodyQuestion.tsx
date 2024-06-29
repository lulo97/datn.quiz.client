import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { VITE_SERVER_PATH } from "@/Utils";
import { AnswerPrefix } from "../../Utils";

interface Props {
    Question: QuestionDetail;
    Idx: number;
}

export function BodyQuestion(props: Props) {
    const { Question, Idx } = props;
    return (
        <div className="flex pr-10">
            <div className="w-full">
                <div className="flex gap-1">
                    <div className="font-semibold ">Câu {Idx + 1}:</div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: Question.Content || "",
                        }}
                    ></div>
                </div>
                <div className="grid grid-cols-2 w-full">
                    {Question.Answers.map((ans, ans_idx) => (
                        <div key={ans.AnswerId}>
                            {AnswerPrefix[ans_idx] + ans.Content}
                        </div>
                    ))}
                </div>
            </div>
            <img
                className="w-1/5"
                src={
                    Question.ImageUrl
                        ? VITE_SERVER_PATH + Question.ImageUrl
                        : ""
                }
            ></img>
        </div>
    );
}
