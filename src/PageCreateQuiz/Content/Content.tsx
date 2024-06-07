import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CreateQuizProps } from "../Utils";
import { QC } from "./QC";

export function Content(props: CreateQuizProps) {
    const { state, dispatch } = props;

    return (
        <div>
            <Label>Danh sách câu hỏi</Label>
            <Card className="p-1 bg-gray-100">
                <div className="flex flex-col gap-10 py-5">
                    {state.Questions.length == 0 && (
                        <div>Hãy thêm câu hỏi</div>
                    )}
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
            </Card>
        </div>
    );
}
