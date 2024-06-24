import { InputAI, QuestionAI } from "../Utils";
import { getAnswerStyle, getUUID } from "@/Utils";
import { Label } from "@/components/ui/label";
import { ModalCreateQuestion } from "./ModalCreateQuestion";
import { Answer, DifficultLevel, Language, Type } from "@/InterfacesDatabase";
import { X } from "lucide-react";

interface Props {
    state: InputAI;
    question_idx: number;
}

export interface IQuestionFromAI {
    DifficultLevel: DifficultLevel | null;
    Language: Language | null;
    Type: Type | null;
    Content: string;
    Explanation: string;
    Answers: Answer[];
}

export function RightQuestion(props: Props) {
    const { state, question_idx } = props;
    if (!state.Output) return <div>Đang tải</div>;
    const QuestionFromAI: IQuestionFromAI = {
        DifficultLevel: state.DifficultLevel,
        Language: state.Language,
        Type: state.Type,
        Content: state.Output[question_idx].Question,
        Explanation: state.Output[question_idx].Explanation,
        Answers: state.Output[question_idx].Answers.map((ele) => ({
            AnswerId: getUUID(),
            QuestionId: "",
            Content: ele.Answer,
            IsCorrect: ele.IsCorrect,
        })),
    };

    function handleDelete() {}

    return (
        <div className="bg-white mb-1 text-sm flex flex-row justify-between border rounded-lg p-2 w-full">
            <div className="w-full">
                <div className="flex justify-between w-full">
                    <ModalCreateQuestion {...QuestionFromAI} />
                    <X
                        onClick={handleDelete}
                        className="text-red-500 hover:text-red-600 hover:cursor-pointer"
                    />
                </div>
                <div className="w-full">
                    <Label className="mr-1">Câu {question_idx + 1}:</Label>
                    {state.Output[question_idx].Question}
                </div>
                <div className="flex flex-col">
                    {state.Output[question_idx].Answers.map((ele, idx) => {
                        return (
                            <li
                                key={idx}
                                className={getAnswerStyle(ele.IsCorrect)}
                            >
                                {ele.Answer}
                            </li>
                        );
                    })}
                </div>
                <div className="w-full">
                    Giải thích: {state.Output[question_idx].Explanation}
                </div>
            </div>
        </div>
    );
}
