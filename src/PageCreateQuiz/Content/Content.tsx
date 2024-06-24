import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CreateQuizProps } from "../Utils";
import { QC } from "./QC";

export function Content(props: CreateQuizProps) {
    const { state, dispatch } = props;
    return (
        <div className="flex flex-col">
            <Label>Danh sách câu hỏi</Label>
            <div className="px-3 py-4 mt-1 mb-2 rounded-lg p-1 bg-gray-100 flex flex-col gap-5 min-h-[50vh]">
                {state.Questions.length == 0 && <div>Hãy thêm câu hỏi</div>}
                {state.Questions.map((question, idx) => (
                    <QC
                        key={question.QuestionId + "_" + idx}
                        idx={idx + 1}
                        question={question}
                        state={state}
                        dispatch={dispatch}
                    />
                ))}
            </div>
        </div>
    );
}
