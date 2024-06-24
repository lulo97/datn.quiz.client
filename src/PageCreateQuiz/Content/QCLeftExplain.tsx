import { QuestionDetail } from "@/PageCreateQuestion/Utils";

export function QCLeftExplain(question: QuestionDetail) {
    return (
        <div className="flex flex-col gap-1">
            <div className="font-semibold">Giải thích:</div>
            <div
                dangerouslySetInnerHTML={{
                    __html: question.Explanation ? question.Explanation : "",
                }}
            ></div>
        </div>
    );
}
