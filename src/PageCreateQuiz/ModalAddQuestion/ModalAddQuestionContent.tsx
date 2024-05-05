import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import QuestionTable from "./QuestionTable";

export default function ModalAddQuestionContent() {
    return (
        <div>
            <div className="flex justify-between gap-3 mb-3">
                <Input
                    className="w-3/4"
                    placeholder="Tìm kiếm tên câu hỏi..."
                />
                <Button>Tìm kiếm</Button>
                <Button>Tìm kiếm nâng cao</Button>
            </div>
            <QuestionTable />
        </div>
    );
}
