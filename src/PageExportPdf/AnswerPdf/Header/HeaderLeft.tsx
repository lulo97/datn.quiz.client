import { QuizDetail } from "@/PageCreateQuiz/Utils";

export function HeaderLeft(Quiz: QuizDetail) {
    return (
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
                    <span className="relative z-10 pr-1 bg-white">Mã số: </span>
                    <span className="absolute w-full border-b-2 border-dotted top-[70%] border-black right-0 left-0"></span>
                </div>
            </div>

        </div>
    );
}
