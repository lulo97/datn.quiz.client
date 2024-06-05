import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuestionTable } from "./QuestionTable";
import { CreateQuizProps } from "../Utils";

export function ModalAddQuestionContent(props: CreateQuizProps) {
    const { state, dispatch } = props;
    return (
        <div className="h-full">
            <div className="flex justify-between gap-3 mb-3">
                <Input
                    className="w-3/4"
                    placeholder="Tìm kiếm tên câu hỏi..."
                />
                <Button>Tìm kiếm</Button>
                <Button>Tìm kiếm nâng cao</Button>
            </div>
            <QuestionTable state={state} dispatch={dispatch} />
        </div>
    );
}
