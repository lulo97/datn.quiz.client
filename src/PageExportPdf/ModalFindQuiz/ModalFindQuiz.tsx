import { ModalSizeClass, ModelWidthClass } from "@/Utils";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/mydialog/mydialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreatedQuiz } from "./CreatedQuiz";
import { ExamPdfProps } from "../Utils";
import { QuizDetail } from "@/PageCreateQuiz/Utils";

export function ModalFindQuiz(props: ExamPdfProps) {
    const { fetchData } = props;
    const [open, setOpen] = useState(false);
    function handleFetchData(Quiz: QuizDetail) {
        setOpen(false);
        fetchData(Quiz);
    }
    return (
        <div>
            <div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>Tìm đề thi</Button>
                    </DialogTrigger>
                    <DialogContent
                        className={`${ModelWidthClass} bg-gray-200 overflow-y-scroll h-[95%]`}
                    >
                        <CreatedQuiz handleFetchData={handleFetchData} />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
