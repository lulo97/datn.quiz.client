import { PlayDetail } from "@/PageQuizResultTime/Utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { getMaxScore, getTime } from "./Utils";
import { QuestionCards } from "@/components/question_card/QuestionCard";
import { formatMySQLDatetime } from "@/Utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function ModalRead(record: PlayDetail) {
    return (
        <Dialog>
            <DialogTrigger>
                <Eye className="text-yellow-500 hover:text-yellow-600" />
            </DialogTrigger>
            <DialogContent
                className={`h-[90vh] min-w-[95vw] overflow-y-auto flex flex-col`}
            >
                <DialogHeader>
                    <DialogTitle>Bảng chi tiết làm đề</DialogTitle>
                </DialogHeader>
                <div className="flex-1 flex flex-col">
                    <Left {...record} />
                    <Right {...record} />
                </div>
            </DialogContent>
        </Dialog>
    );
}

function Left(record: PlayDetail) {
    const navigate = useNavigate();
    return (
        <div className="mt-5 mb-3">
            <div>
                <span className="font-semibold">Tên đề:</span>{" "}
                {record.Quiz.Name}
            </div>
            <div>
                <span className="font-semibold">Đường dẫn đề thi:</span>{" "}
                <Button
                    className="p-0 m-0 h-fit text-base font-normal"
                    onClick={() => navigate(`/de-thi/${record.QuizId}`)}
                    variant="link"
                >
                    Link
                </Button>
            </div>

            <div className="text-green-500">
                <span className="font-semibold text-black">Điểm số: </span>
                {record.Score} / {getMaxScore(record)}
            </div>
            <div>
                <span className="font-semibold">Giờ làm bài:</span>{" "}
                {formatMySQLDatetime(record.StartTime.toString())}
            </div>
            <div>
                <span className="font-semibold">Giờ nộp bài: </span>
                {formatMySQLDatetime(record.SubmitTime.toString())}
            </div>
            <div>
                <span className="font-semibold">Thời gian làm:</span>{" "}
                {getTime(record.StartTime, record.SubmitTime)} /{" "}
                {record.Quiz.Time ? record.Quiz.Time.Value * 60 : 0} giây
            </div>
        </div>
    );
}

function Right(record: PlayDetail) {
    return (
        <div>
            <QuestionCards {...record} />
        </div>
    );
}
