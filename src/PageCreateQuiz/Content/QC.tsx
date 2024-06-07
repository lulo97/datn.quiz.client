import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { QCRight } from "./QCRight";
import { QCLeft } from "./QCLeft";
import { QCHeader } from "./QCHeader";
import { CreateQuizProps } from "../Utils";

interface QCProps extends CreateQuizProps {
    question: QuestionDetail;
    idx: number;
}

export function QC(props: QCProps) {
    const { state, dispatch, question, idx } = props;
    return (
        <div className="bg-white rounded-lg py-1 px-2">
            <QCHeader
                idx={idx}
                question={question}
                state={state}
                dispatch={dispatch}
            />
            <div className="flex gap-4">
                <QCLeft {...question} />
                <QCRight {...question} />
            </div>
        </div>
    );
}
