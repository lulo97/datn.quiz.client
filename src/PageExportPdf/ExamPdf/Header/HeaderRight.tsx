import { QuizDetail } from "@/PageCreateQuiz/Utils";

export function HeaderRight(Quiz: QuizDetail) {
    return (
        <div className="flex items-center flex-col">
            <div className="font-semibold">{Quiz.Name}</div>
            <div className="flex items-center flex-col text-sm">
                <div className="uppercase">Môn học: {Quiz.Subject?.Name}</div>
                <div>Trình độ: {Quiz.EducationLevel?.Name}</div>
                <div>Thời gian làm bài {Quiz.Time?.Value} phút</div>
            </div>
        </div>
    );
}
