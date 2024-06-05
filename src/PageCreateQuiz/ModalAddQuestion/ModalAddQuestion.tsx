import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ModalSizeClass } from "@/Utils";
import { ModalAddQuestionContent } from "./ModalAddQuestionContent";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { CreateQuizProps } from "../Utils";

export function ModalAddQuestion(props: CreateQuizProps) {
    const { state, dispatch } = props;
    const [open, setOpen] = useState(false);
    return (
        <div>
            <div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>Thêm câu hỏi</Button>
                    </DialogTrigger>
                    <DialogContent className={ModalSizeClass}>
                        <div>
                            <Label className="w-fit h-fit">Thêm câu hỏi</Label>
                            <ModalAddQuestionContent state={state} dispatch={dispatch} />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
