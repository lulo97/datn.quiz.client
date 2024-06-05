import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { QCLeftOptions } from "./QCLeftOptions";
import { QCLeftContent } from "./QCLeftContent";
import { QCLeftExplain } from "./QCLeftExplain";

export function QCLeft(question: QuestionDetail) {
    return (
        <div className="w-full flex flex-col justify-between">
            <QCLeftContent {...question} />
            <QCLeftOptions {...question} />
            <QCLeftExplain {...question} />
        </div>
    );
}
