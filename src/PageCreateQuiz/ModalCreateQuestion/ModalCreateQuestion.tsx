import { ModalSizeClass, ModelWidthClass } from "@/Utils";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/mydialog/mydialog";
import { useState } from "react";
import { CreateQuestion } from "@/PageCreateQuestion/CreateQuestion";

export function ModalCreateQuestion() {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>Tạo câu hỏi</Button>
                </DialogTrigger>
                <DialogContent className={`${ModelWidthClass} bg-gray-200 overflow-y-auto max-h-[95%]`}>
                    <CreateQuestion is_in_quiz={true} />
                </DialogContent>
            </Dialog>
        </div>
    );
}