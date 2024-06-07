import { QuestionDetail } from "@/PageCreateQuestion/Utils";

export function QCLeftExplain(question: QuestionDetail) {
    return (
        <div className="flex gap-1">
            <div>Giải thích:</div>
            <div
                dangerouslySetInnerHTML={{
                    __html: question.Explanation ? question.Explanation : "",
                }}
            ></div>
        </div>
    );
}
