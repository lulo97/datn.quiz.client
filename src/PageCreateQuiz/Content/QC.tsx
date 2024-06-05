import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { QCRight } from "./QCRight";
import { QCLeft } from "./QCLeft";
import { PenBox, X } from "lucide-react";

interface QCProps {
    question: QuestionDetail;
    idx: number;
}

export function QC(props: QCProps) {
    const { question, idx } = props;
    return (
        <div className="bg-white rounded-lg py-1 px-2">
            <div className="flex justify-between">
                <div className="font-semibold">Câu {idx}:</div>
                <div className="flex gap-2">
                    <PenBox className="text-green-500 hover:cursor-pointer" />
                    <X className="text-red-500 hover:cursor-pointer" />
                </div>
            </div>
            <div className="flex gap-4">
                <QCLeft {...question} />
                <QCRight {...question} />
            </div>
        </div>
    );
}
