import { QuizDetail } from "@/PageCreateQuiz/Utils";

export function HeaderLeft(Quiz: QuizDetail) {
    const totalQuestions = Quiz.Questions.length;
    const totalPages = Math.ceil(totalQuestions / 6);
    const formattedPages = totalPages.toString().padStart(2, "0");
    return (
        <div className="flex items-center flex-col">
            <div className="font-semibold uppercase">
                Hệ thống trắc nghiệm QuizQuest
            </div>
            <div className="text-sm">Đề thi có {formattedPages} trang</div>
        </div>
    );
}
