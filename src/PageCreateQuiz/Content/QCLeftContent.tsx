import { QuestionDetail } from "@/PageCreateQuestion/Utils";

export function QCLeftContent(question: QuestionDetail) {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: question.Content ? question.Content : "",
            }}
        ></div>
    );
}
