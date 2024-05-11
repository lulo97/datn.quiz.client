import { QuizCardDetail } from "@/components/quiz_card/QuizCardDetailed";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ModalFindQuizContent() {
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
            <div className="bg-gray-200 overflow-y-scroll max-h-[380px] border p-3 flex flex-col gap-5">
                <QuizCardDetail />
                <QuizCardDetail />
                <QuizCardDetail />
                <QuizCardDetail />
            </div>
        </div>
    );
}
