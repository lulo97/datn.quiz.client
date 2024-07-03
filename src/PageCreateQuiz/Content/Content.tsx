import { Label } from "@/components/ui/label";
import { CreateQuizProps } from "../Utils";
import { QC } from "./QC";
import { Reorder } from "framer-motion";
import { ActionType } from "../Action";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";

export function Content(props: CreateQuizProps) {
    const { state, dispatch } = props;

    function handleDragDrop(Questions: QuestionDetail[]) {
        dispatch({ type: ActionType.ReorderQuestions, payload: Questions });
    }

    return (
        <div className="flex flex-col">
            <Label>Danh sách câu hỏi</Label>

            <Reorder.Group
                className="px-3 py-4 mt-1 mb-2 rounded-lg p-1 bg-gray-100 flex flex-col gap-5 min-h-[50vh]"
                axis="y"
                values={state.Questions}
                onReorder={(values) => handleDragDrop(values)}
            >
                {state.Questions.length == 0 && <div>Hãy thêm câu hỏi</div>}
                {state.Questions.map((question, idx) => (
                    <Reorder.Item key={question.QuestionId} value={question}>
                        <QC
                            key={question.QuestionId + "_" + idx}
                            idx={idx + 1}
                            question={question}
                            state={state}
                            dispatch={dispatch}
                        />
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
}
