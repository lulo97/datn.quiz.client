import { MyPage } from "./MyPage";
import { ExamPdfProps } from "../Utils";
import { AnswerPdf } from "../AnswerPdf/AnswerPdf";

export function ExamPdf(props: ExamPdfProps) {
    const { Quizs, componentRefs } = props;

    if (Quizs == null) return <div>Đang tải</div>;
    return (
        <div className="flex flex-col gap-5 w-full items-center">
            <div
                className="w-fit h-fit"
                ref={(el) => el && (componentRefs.current[0] = el)}
            >
                <AnswerPdf {...Quizs[0]} />
            </div>

            {Quizs.map((quiz, idx) => (
                <div
                    key={idx}
                    className="w-fit h-fit"
                    ref={(el) => el && (componentRefs.current[idx + 1] = el)}
                >
                    <MyPage
                        MaxPage={Quizs.length}
                        PageIdx={idx + 1}
                        FirstPage={idx == 0 ? true : false}
                        Quiz={quiz}
                    />
                </div>
            ))}
        </div>
    );
}
