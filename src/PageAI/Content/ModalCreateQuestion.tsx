import { ModelWidthClass } from "@/Utils";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/mydialog/mydialog";
import { useState } from "react";
import { CreateQuestion } from "@/PageCreateQuestion/CreateQuestion";
import { PenBox } from "lucide-react";
import { IQuestionFromAI } from "./RightQuestion";

export function ModalCreateQuestion(QuestionFromAI: IQuestionFromAI) {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <PenBox className="text-blue-500 hover:text-blue-600 hover:cursor-pointer" />
                </DialogTrigger>
                <DialogContent
                    className={`${ModelWidthClass} bg-gray-200 overflow-y-auto max-h-[95%]`}
                >
                    <CreateQuestion
                        QuestionFromAI={QuestionFromAI}
                        IsInModal={true}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
