import { QuizDetail } from "@/PageCreateQuiz/Utils";

export function HeaderLeft(Quiz: QuizDetail) {
    return (
        <div className="flex items-center flex-col">
            <div className="font-semibold uppercase">Hệ thống trắc nghiệm QuizQuest</div>
            <div className="text-sm">Đề thi có 04 trang</div>
        </div>
    );
}
