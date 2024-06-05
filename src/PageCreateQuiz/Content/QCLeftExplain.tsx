import { QuestionDetail } from "@/PageCreateQuestion/Utils";

export function QCLeftExplain(question: QuestionDetail) {
    return (
        <div className="flex gap-1">
            <div>Giải thích:</div>
            <div
                dangerouslySetInnerHTML={{
                    __html: question.ExplainContent
                        ? question.ExplainContent
                        : "",
                }}
            ></div>
        </div>
    );
}
