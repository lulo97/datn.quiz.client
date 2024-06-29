import { QuizDetail } from "@/PageCreateQuiz/Utils";

export function HeaderTop(quiz: QuizDetail) {
    return (
        <div className="flex justify-between px-4 mb-5">
            <div className="flex justify-between items-center flex-col">
                <div className="font-semibold uppercase">
                    Hệ thống trắc nghiệm QuizQuest
                </div>
                <div>
                    <div className="relative w-[400px]">
                        <span className="relative z-10 pr-1 bg-white">
                            Họ và tên:{" "}
                        </span>
                        <span className="absolute w-full border-b-2 border-dotted top-[70%] border-black right-0 left-0"></span>
                    </div>
                    <div className="relative w-[400px]">
                        <span className="relative z-10 pr-1 bg-white">
                            Mã số:{" "}
                        </span>
                        <span className="absolute w-full border-b-2 border-dotted top-[70%] border-black right-0 left-0"></span>
                    </div>
                </div>
            </div>
            <div className="flex items-center flex-col">
                <div className="font-semibold">{quiz.Name}</div>
                <div className="flex items-center flex-col text-sm">
                    <div className="uppercase">
                        Môn học: {quiz.Subject?.Name}
                    </div>
                    <div>Trình độ: {quiz.EducationLevel?.Name}</div>
                    <div className="italic">
                        Thời gian làm bài {quiz.Time?.Value} phút
                    </div>
                </div>
            </div>
        </div>
    );
}
