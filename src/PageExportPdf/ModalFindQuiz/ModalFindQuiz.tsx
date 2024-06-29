import { ModelWidthClass } from "@/Utils";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/mydialog/mydialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { ExamPdfProps } from "../Utils";
import { TableCreatedQuiz } from "./TableCreatedQuiz";

export function ModalFindQuiz(props: ExamPdfProps) {
    const { setQuiz } = props;
    const [open, setOpen] = useState(false);
    function handleSetQuizAndCloseModal(quiz: QuizDetail) {
        setOpen(false);
        setQuiz(quiz);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Tìm đề thi</Button>
            </DialogTrigger>
            <DialogContent
                className={`${ModelWidthClass} bg-gray-200 h-[95%]`}
            >
                <TableCreatedQuiz
                    handleSetQuizAndCloseModal={handleSetQuizAndCloseModal}
                />
            </DialogContent>
        </Dialog>
    );
}
