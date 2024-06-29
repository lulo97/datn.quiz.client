import { PageAnswer } from "../PageAnswer/PageAnswer";
import { PageFirst } from "../PageFirst/PageFirst";
import { PageOther } from "../PageOther/PageOther";
import { ExamPdfProps } from "../Utils";

export function Content(props: ExamPdfProps) {
    const { quiz, pagesRef } = props;

    if (!quiz) return <div>Hãy thêm đề thi!</div>;

    let MaxPage = 1
    const questionsForFirstPage = quiz.Questions.slice(0, 6);
    const questionsForOtherPage = quiz.Questions.slice(6);
    let QFOP_Partition = [];
    for (let i = 0; i < questionsForOtherPage.length; i += 6) {
        QFOP_Partition.push(questionsForOtherPage.slice(i, i + 6));
        MaxPage += 1
    }

    return (
        <div className="border p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-center">
                <div className="flex flex-col gap-5 w-full items-center">
                    <div
                        className="w-fit h-fit"
                        ref={(el) => el && (pagesRef.current[0] = el)}
                    >
                        <PageAnswer {...quiz} />
                    </div>

                    <div
                        className="w-fit h-fit"
                        ref={(el) => el && (pagesRef.current[1] = el)}
                    >
                        <PageFirst
                            MaxPage={MaxPage}
                            PageIdx={1}
                            quiz={quiz}
                            questions={questionsForFirstPage}
                        />
                    </div>

                    {QFOP_Partition.map((questions, idx) => (
                        <div
                            className="w-fit h-fit"
                            ref={(el) => el && (pagesRef.current[1] = el)}
                        >
                            <PageOther
                                MaxPage={MaxPage}
                                PageIdx={idx + 2}
                                questions={questions}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
